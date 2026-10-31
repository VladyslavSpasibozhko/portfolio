# Redis JSON Sessions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** Tasks 1–2 are applied uncommitted on `feat/upstash-migration` (same changes as `95e0632` on `feat/remove-qstash`), and the smoke test passed. Task 3 waits for the deploy.

**Goal:** Store each chat session as a Redis JSON document and append new messages to it instead of rewriting the whole session. The key gets a TTL when it is created.

**Architecture:** The redis lib (`src/lib/redis/`) uses Upstash JSON commands and has an `append` method. `create` writes the document and sets the TTL in one `MULTI` transaction. A chat turn appends `[userMessage, assistantMessage]` with `JSON.ARRAPPEND`. Modifying commands keep the TTL, and `ARRAPPEND` on a missing key fails, so an expired session is never recreated.

The QStash cleanup stays as it is (`src/lib/scheduler/`, `setSessionCleanup`, `/internal/cleanup/:sessionId`). Sessions now expire through both the TTL and the QStash callback. That's redundant but harmless. Removing QStash is out of scope.

**Tech Stack:** TypeScript, Fastify 5, `@upstash/redis` ^1.39 (`json.set`, `json.get`, `json.arrappend`, `multi`), `@upstash/qstash` (unchanged), Node test runner via `tsx`.

**Spec:** Agreed in conversation (2026-10-30): use the JSON layout, append instead of rewrite, set a TTL on create, never recreate an expired session. Apply this to the current codebase; leave QStash as it is.

## Global Constraints

- Read `process.env` only in `src/config/index.ts`.
- The lib must not leak Upstash types: consumers see only the `Storage` interface from `src/lib/redis/types.ts`.
- Lib tests go in `src/lib/redis/__tests__/` with a fake client. No network calls.
- The key prefix changes from `session:` to `chat:`, so old string keys are never read with JSON commands (that would throw `WRONGTYPE`).
- Old `session:*` keys were stored **without a TTL** (cleanup was QStash only), and QStash now deletes `chat:<id>`. Old keys never go away on their own. See Task 3.
- `session.create()` keeps its no-argument signature and reads `Date.now()` for `expiresAt`. TTL = `SESSION_LIFETIME_MS / 1000` (86400).
- Run `npm run typecheck`, `npm run lint` and `npm test` at the repo root after each task.
- `npm test` needs every env var from `src/config/index.ts`, because the route tests import modules that build the Redis and QStash clients at load time. Without a `.env` that has all of them, run:
  ```bash
  PORT=1 CLIENT_ORIGIN=x SERVER_URL=https://example.test \
  UPSTASH_REDIS_REST_URL=https://example.test UPSTASH_REDIS_REST_TOKEN=x \
  QSTASH_TOKEN=x QSTASH_CURRENT_SIGNING_KEY=x QSTASH_NEXT_SIGNING_KEY=x \
  npm test
  ```
  No network calls are made.

## Review Focus

1. **Session expires while the AI is streaming.** `append` throws, the route logs the error and closes the stream without `done`. No key without a TTL is created. Covered by the adapter test `append throws when json.arrappend fails`.
2. **Old `session:*` keys.** They are never read (new `chat:` prefix), but they have no TTL and QStash no longer deletes them. Handled manually in Task 3.
3. **`ARRAPPEND` fails for any reason** (missing key, wrong path). The adapter doesn't tell the cases apart; every failure throws. Covered by the same test.
4. **`create` succeeds but `expire` fails.** `MULTI` runs both commands or neither. Covered by the adapter test `set uses one transaction with json.set and expire`.
5. **Messages with quotes or newlines.** The Upstash client serializes the values, so the adapter passes objects, not strings. Checked in the Task 2 manual smoke test.
6. **QStash cleanup after the TTL has already expired.** `remove` deletes a missing `chat:<id>` and returns `false`. The cleanup route already returns 200 in that case (`src/routes/cleanupChat.ts`).

---

### Task 1: Redis lib JSON contract — done (`95e0632`)

**Files:**
- Modify: `src/lib/redis/types.ts`
- Modify: `src/lib/redis/storageAdapter.ts`
- Modify: `src/lib/redis/index.ts` (also re-export `SetOptions`)
- Test: `src/lib/redis/__tests__/storageAdapter.test.ts` (create)

**Interfaces:**
- Produces (`src/lib/redis/types.ts`):
  ```ts
  export interface SetOptions { ttlSeconds: number }
  export interface Storage {
    get<T>(key: string): Promise<T | null>;
    set<T extends Record<string, unknown>>(key: string, value: T, options: SetOptions): Promise<void>;
    /** Appends to the array at `path`. Throws if the key doesn't exist; never creates it. */
    append<T>(key: string, path: string, values: T[]): Promise<void>;
    del(key: string): Promise<boolean>;
  }
  ```
  `ttlSeconds` is required: every write that creates a key must expire.

- [x] **Step 1: Write the failing tests** in `storageAdapter.test.ts`, using a hand-built fake client cast with `as unknown as Redis`. The fake records calls.
  - `get reads the root document`
  - `get returns null for a missing key`
  - `set uses one transaction with json.set and expire`: `multi`, `json.set("k", "$", { a: 1 })`, `expire("k", 60)`, `exec`, in that order.
  - `append passes values to json.arrappend`: called with `("k", "$.messages", m1, m2)`.
  - `append throws when json.arrappend fails`: `arrappend` throws `Error("boom")`, the call rejects with `/boom/`.
  - `del returns true when a key was removed` (`1` gives `true`, `0` gives `false`).

- [x] **Step 2: Run the tests and confirm they fail**
  Run: `ANTHROPIC_API_KEY=test-key ANTHROPIC_MODEL=test-model node --import=tsx --test src/lib/redis/__tests__/storageAdapter.test.ts`
  Expected: 6 fail (`client.get`/`client.set` missing on the fake, `append` not a function). `del` passes because it's unchanged.

- [x] **Step 3: Implement the contract.**
  - `get`: `client.json.get<T>(key)`.
  - `set`: `client.multi().json.set(key, "$", value).expire(key, ttlSeconds).exec()`.
  - `append`: `client.json.arrappend(key, path, ...values)`. Errors propagate.
  - `del`: unchanged.

- [x] **Step 4: Run the tests and confirm they pass.** Expected: 6/6. Typecheck fails in `src/storage/sessions.ts` until Task 2, so both tasks are committed together.

---

### Task 2: Storage, service and chat route use append — done (`95e0632`), except Step 4

**Files:**
- Modify: `src/storage/sessions.ts`
- Modify: `src/services/session.ts`
- Modify: `src/routes/chat.ts`
- Modify: `AGENTS.md` (Storage section), `REDIS_MIGRATION.md` (note before section 2), `TECH_DEBT.md`

**Interfaces:**
- Consumes: `Storage` from Task 1.
- Produces:
  - `src/storage/sessions.ts`:
    `key = (id) => \`chat:${id}\``
    `set(history: History, ttlSeconds: number): Promise<void>`
    `get(id: string): Promise<History | undefined>`
    `appendMessages(id: string, messages: Message[]): Promise<void>`, which calls `storage.append(key(id), "$.messages", messages)`
    `remove(id: string): Promise<boolean>`
  - `src/services/session.ts`:
    `create(): Promise<Session>`, which calls `sessions.set({ session, messages: [] }, SESSION_LIFETIME_MS / 1000)`
    `addMessages(sessionId: string, messages: Message[]): Promise<void>`, which replaces `set`. It doesn't read the session first.
    `setSessionCleanup`, `verifyCleanup`, `get` and `remove` are unchanged.

- [x] **Step 1: Update `sessions.ts` and `session.ts`** to the interfaces above. Delete the service's `set`.

- [x] **Step 2: Update `routes/chat.ts`.**
  - Keep the user message in a `const userMessage = createUserMessage(body.message)` and build `messages` from it.
  - After streaming: `await session.addMessages(body.sessionId, [userMessage, createAssistantMessage(text)]);`
  - Then `send(createDoneResponse())`. If the append throws, the existing `catch` logs it and the stream ends without `done`.

- [x] **Step 3: Verify**
  Run: `npm run typecheck && npm run lint` and the `npm test` command from Global Constraints.
  Expected: all pass (36/36). `grep -n "session.set" src/routes/chat.ts` returns nothing.

- [x] **Step 4: Manual smoke test against the dev Upstash DB** (`npm run dev`)
  Side effects: writes to the dev Redis, calls the Anthropic API, and schedules a QStash callback to `SERVER_URL`.
  Result (2026-10-30): all three steps passed. Upstash reports `TYPE` as `json`.
  1. `POST /chat/create`. In the Upstash console, `TYPE chat:<id>` shows `json` and `TTL chat:<id>` shows about 86400.
  2. `POST /chat` with a message containing `"quotes"` and a newline. `GET /chat/<id>/messages` returns both messages intact, and `TTL` keeps counting down from step 1 (not reset).
  3. `DEL chat:<id>` in the console, then `POST /chat`. The response is 404 (the session is missing before streaming).

- [x] **Step 5: Update the docs**
  - `AGENTS.md` Storage: "stores each session as a Redis JSON document (`chat:<id>`) with a TTL; chat turns append messages instead of rewriting".
  - `REDIS_MIGRATION.md`: note before section 2 that storage moved to the JSON layout and the `chat:` prefix.
  - `TECH_DEBT.md`: "No Tests for the Session Service and Storage" (they import the Redis singleton directly).

- [x] **Step 6: Commit**
  `refactor(server): store sessions as Redis JSON and append messages` (`95e0632`)

---

### Task 3: Delete old `session:*` keys (manual, one-time)

Old keys have no TTL and nothing deletes them now.

**Run only after this change is deployed.** `.env` points to the same Upstash DB as production, and production still runs the old code, which stores live chats under `session:*`. Deleting them before the deploy wipes active users' chats.

- [ ] **Step 1:** In the Upstash console, list them: `SCAN 0 MATCH session:* COUNT 1000` (repeat with the returned cursor until it is `0`).
- [ ] **Step 2:** Delete them: `DEL session:<id> ...`.
- [ ] **Step 3:** Run the scan again. Expected: no keys.
