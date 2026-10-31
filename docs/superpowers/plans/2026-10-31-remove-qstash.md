# Remove QStash Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** Not started. Branch: `refactor/remove-qstash` (same as `main` at `e1af8d8`).

**Goal:** Expire chat sessions with the Redis TTL alone. Remove `@upstash/qstash`, the scheduler lib, the cleanup route and their env vars.

**Why it's safe:** Since `c51e2d1` / `2bb4dd7`, `session.create()` writes `chat:<id>` and sets `EXPIRE` (`config.sessionLifeTime / 1000` = 86400s) in one `MULTI`. Messages are added with `JSON.ARRAPPEND`, which keeps the TTL and fails on a missing key, so an expired session is never recreated. The QStash callback only calls `session.remove(sessionId)`, which the TTL already does.

**Trade-off:** A TTL can't run code when a key expires. If session-scoped side effects are added later (for example, deleting Claude Files API uploads, see TECH_DEBT "AI Should Accept Files as Context"), they will need their own cleanup. This is recorded in TECH_DEBT in Task 3.

**Tech Stack:** TypeScript, Fastify 5, `@upstash/redis` (unchanged), Node test runner via `tsx`.

## Global Constraints

- Read `process.env` only in `src/config/index.ts`.
- Don't change the session TTL logic in `src/lib/redis/` or `src/storage/sessions.ts`. It already works.
- Keep the `POST /chat/create` response shape (`createResponse(session)` with `sessionId` and `expiresAt`). The client depends on it.
- Run `npm run typecheck`, `npm run lint` and `npm test` at the repo root after each task.

## Review Focus

1. **Nothing still imports the scheduler.** `grep -rni "qstash\|scheduler\|cleanup" src index.ts` should return nothing after Task 1.
2. **`createChat` error path.** It used to remove the session when scheduling failed. That failure mode is gone. A `create()` failure must still return the 500 envelope.
3. **`SERVER_URL` removal.** It's only used by `src/lib/scheduler/index.ts`. Confirm nothing else reads `config.serverUrl` before deleting the getter.
4. **QStash messages already in flight.** Sessions created before the deploy have callbacks scheduled for up to 24h. They will hit a route that no longer exists (404). QStash retries, then moves them to its DLQ. That's harmless because the TTL deletes the key anyway. Handled in Task 4.

---

### Task 1: Remove QStash from the code

**Files:**
- Delete: `src/lib/scheduler/` (`index.ts`, `qstashAdapter.ts`, `types.ts`)
- Delete: `src/routes/cleanupChat.ts`
- Modify: `index.ts`: drop the `cleanupChatRoute` import and `app.register(cleanupChatRoute)`
- Modify: `src/services/session.ts`: drop `setSessionCleanup`, `verifyCleanup` and the `scheduler` import
- Modify: `src/routes/createChat.ts`
- Modify: `src/config/index.ts`: drop `qstashToken`, `qstashCurrentSigningKey`, `qstashNextSigningKey`, `serverUrl`

- [ ] **Step 1:** Delete the scheduler lib and the cleanup route, and remove the route registration from `index.ts`.
- [ ] **Step 2:** Remove `setSessionCleanup`, `verifyCleanup` and `import { scheduler } ...` from `src/services/session.ts`.
- [ ] **Step 3:** Simplify `src/routes/createChat.ts` to:
  ```ts
  import type { FastifyInstance } from "fastify";
  import { create } from "../services/session.js";
  import { createErrorDetails, createErrorResponse, createResponse } from "../../utils/transport.js";

  const ROUTE_CONFIG = { rateLimit: { max: 20, timeWindow: "1 minute" } };

  export async function createChatRoute(app: FastifyInstance): Promise<void> {
    app.post("/chat/create", { config: ROUTE_CONFIG }, async (_, reply) => {
      try {
        return createResponse(await create());
      } catch (e) {
        return reply.status(500).send(createErrorResponse(createErrorDetails("server_error", (e as Error).message, 500)));
      }
    });
  }
  ```
- [ ] **Step 4:** Remove the four getters from `src/config/index.ts`.
- [ ] **Step 5:** Verify:
  ```bash
  grep -rni "qstash\|scheduler\|cleanup\|serverUrl" src index.ts   # expect no output
  npm run typecheck && npm run lint && npm test
  ```
- [ ] **Step 6:** Commit: `refactor(server): expire sessions via Redis TTL only`

### Task 2: Remove the dependency and env vars

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm)
- Modify: `.env.example`: drop `SERVER_URL`, `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`

- [ ] **Step 1:** `npm uninstall @upstash/qstash`
- [ ] **Step 2:** Remove the four vars from `.env.example`. Remove them from your local `.env` too (optional, since they're no longer read).
- [ ] **Step 3:** Verify that `npm test` runs without the QStash vars and `SERVER_URL`:
  ```bash
  PORT=1 CLIENT_ORIGIN=x \
  UPSTASH_REDIS_REST_URL=https://example.test UPSTASH_REDIS_REST_TOKEN=x \
  npm test
  npm run build
  ```
- [ ] **Step 4:** Commit: `chore(deps): remove @upstash/qstash`

### Task 3: Update docs

**Files:**
- Modify: `AGENTS.md` ("Environment" section): drop the QStash vars and `SERVER_URL` from the env list
- Modify: `TECH_DEBT.md` ("AI Should Accept Files as Context"): add a note that sessions now expire through the Redis TTL only, so uploaded files will need their own cleanup (for example, a scheduled job, or deleting the files when the session is next read after `expiresAt`)

- [ ] **Step 1:** Update `AGENTS.md`.
- [ ] **Step 2:** Update `TECH_DEBT.md` (use the `tech-debt` skill).
- [ ] **Step 3:** `grep -rni "qstash\|SERVER_URL" AGENTS.md TECH_DEBT.md README.md .env.example`: expect no output. Older files in `docs/superpowers/plans/` record past work and stay unchanged.
- [ ] **Step 4:** Commit: `docs: drop QStash from env and tech debt`

### Task 4: Deploy and clean up (manual, user)

- [ ] **Step 1:** Merge and deploy to Render.
- [ ] **Step 2:** Smoke test against prod:
  - `POST /chat/create` → 200 with `sessionId` and `expiresAt`.
  - In the Upstash Redis console: `TTL chat:<id>` ≈ 86400.
  - Send a message, then run `TTL chat:<id>` again: it should be lower, not reset.
- [ ] **Step 3:** Remove `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY` and `SERVER_URL` from the Render env settings.
- [ ] **Step 4:** After 24h, all callbacks scheduled before the deploy have fired. In the QStash console, purge the DLQ, then revoke the token or delete the QStash project.
