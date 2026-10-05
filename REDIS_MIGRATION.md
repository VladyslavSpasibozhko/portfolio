# Redis Migration & AI Chat Infra Plan

Plan for moving chat sessions off the in-memory `Map`, scheduling file cleanup, deploying to Render, and adding Claude Files API support.

## 1. Migration to Redis (from in-memory Map)

1. Add `@upstash/redis` dependency; add `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` to `.env.example`.
2. Create `src/lib/redis/` adapter (`types.ts`, `upstashAdapter.ts`, `index.ts`) — mirrors `src/lib/ai/index.ts`: construct client at module load, throw if env vars missing, expose only `get`/`set`/`del` wrapped methods (never leak the raw Upstash client).
3. Add `expiresAt` to `types/session.ts` (`Session` = `{ sessionId, expiresAt }`).
4. Rewrite `src/storage/sessions.ts`: swap `Map` for the Redis lib, key pattern `session:${id}`, JSON-serialize `Message[]`, **no TTL** on the key (manual deletion only, driven by QStash — see below). Functions become async.
5. Update `src/services/session.ts`: make `create`/`get`/`set`/`remove` async; `create` sets `expiresAt = now + 24h` on the session record.
6. Update all four routes (`chat.ts`, `createChat.ts`, `deleteChat.ts`, `getChatMessages.ts`) to `await` the now-async service calls.
7. Update `AGENTS.md` (Storage section, new lib, `Session.expiresAt`) and `TECH_DEBT.md` (resolve TTL-sweep portion of "Chat Sessions Have No TTL..."; note caps/concurrency-guard still open).
8. `npm run typecheck` at repo root.
9. User creates the Upstash Redis DB manually, supplies URL/token as env vars (local `.env`, later Render env).

## 2. QStash + message scheduling (architecture)

**Why a new route is needed:** QStash is a push scheduler, not an in-process timer — it fires by making an outbound HTTP request to the app at the scheduled time, it doesn't run app code directly. Instead of the process holding a `setTimeout`/interval that must stay alive for 24h (breaks on a free host that sleeps), QStash holds the delay externally and wakes the app with an HTTP POST when it's due. The new route is the receiving end of that POST — without it, QStash has nothing to call.

1. Add `@upstash/qstash` dependency; add `QSTASH_TOKEN` (+ signing keys if verifying callbacks) to `.env.example`.
2. Create `src/lib/qstash/` adapter — same pattern: wraps `publishJSON`/schedule call, typed input (`sessionId`, delay, target URL), throws on missing env.
3. New route: `POST /internal/cleanup/:sessionId` — the QStash callback target. Verify the request is genuinely from QStash (signature verification via QStash's signing keys) before acting.
4. Cleanup flow in that route: `session.get(sessionId)` → collect all `fileIds` from message history → delete each via Claude Files API (see section 4) → `session.remove(sessionId)`.
5. Wire scheduling into `session.create()` (or the createChat route): after creating the session, call the QStash adapter to schedule a 24h-delayed POST to the cleanup route with `sessionId`.
6. Failure handling: QStash retries on non-2xx — make the cleanup route idempotent (missing session = no-op 200, not an error) and log partial `files.delete` failures without blocking `session.remove`.
7. Update `AGENTS.md` (new lib, new route, scheduling trigger point) and `TECH_DEBT.md` if this resolves/changes any existing entry.
8. `npm run typecheck`.
9. User creates the QStash project/token manually.

## 3. Deployment to Render

1. Add `render.yaml` — free tier web service, Node build/start commands (`npm run build` / `npm start`), health check path.
2. Confirm `.env.example` is current (all required vars: `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `PORT`, `CLIENT_ORIGIN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `QSTASH_TOKEN`, QStash signing keys) — Redis migration and QStash setup should land first so Render env vars are complete in one pass.
3. User creates the Render service (connect repo), sets env vars in the Render dashboard (never committed).
4. Point the QStash cleanup callback URL at the deployed Render URL (only known after first deploy) — update the adapter's target base URL via an env var (`APP_BASE_URL` or similar), not hardcoded.
5. Verify CORS (`CLIENT_ORIGIN`) matches the deployed frontend origin.
6. Smoke-test end-to-end on Render: create session → chat SSE stream → confirm Redis persists across a manual restart.

## 4. Adding Claude Files API

1. Extend `src/lib/ai/` adapter (existing lib, stays self-contained) with `uploadFile`/`deleteFile` methods wrapping `client.files.upload`/`client.files.delete` (Files API is out of beta — no beta header).
2. New route: `POST /chat/:id/files` — accepts multipart upload (`@fastify/multipart` already registered), resolves the session (404 if missing, confirms/sets `expiresAt`), calls the ai lib to upload, returns `{ fileId }`.
3. Update `types/api.ts` and `types/message.ts`: request/response types for the upload route; confirm `Message.fileIds` is populated end-to-end.
4. Update `src/routes/chat.ts` / `ChatRequest` handling to pass `fileIds` through to `ai.chatStream` as `document`/`file` content blocks referencing `{ type: "file", file_id }`.
5. Update `TECH_DEBT.md` — resolves "AI Should Accept Files as Context".
6. Update `AGENTS.md` — new route, ai lib additions, upload flow.
7. `npm run typecheck`.

---

## Execution order

Redis (1) → QStash (2) → Render (3) → Files API (4). Redis must land before QStash (cleanup reads sessions from Redis) and before Files API (upload route needs `expiresAt`/session resolution); Render deploy should come after both since it needs their env vars finalized. Files API can technically land independently of QStash/Render, but its cleanup depends on QStash existing.
