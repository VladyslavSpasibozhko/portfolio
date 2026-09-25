# Chat Migration: WebSocket → SSE (server)

Status: in progress. Scope: server only; the client is handled separately.

## Goal

Replace `GET /ws/chat` (WebSocket) with plain HTTP endpoints and an SSE-style streamed response. This is simpler to deploy and cheaper to run, and it makes rate limiting work per request.

## Current state

- `GET /ws/chat` upgrades to a WebSocket (`@fastify/websocket`).
- Each socket message carries `{ message, history[] }`. The client owns the history.
- `chat()` → `AIAdapter.sendMessage` → Anthropic `messages.create` (non-streaming) → one JSON reply `{ success, message }`.
- The route rate limit (20/min) only counts the handshake, so messages over an open socket are not limited.
- There are no size limits on `history` or `content`.
- `validate()` recompiles the AJV schema on every call. `profile.md` is read from disk on every chat.

## Target design

### Endpoints

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| `POST` | `/chat/create` | none | `{ sessionId }` (server-generated UUID) |
| `POST` | `/chat` | `{ sessionId, role, content, fileIds? }` | SSE stream. 404 unknown session, 409 stream already running, 429 rate limited |
| `DELETE` | `/chat/:id` | none | 204. Clears messages (and files later) |

The server owns the history. The client sends only the new message.

### Stream events

Discriminated union on `type`. Each SSE frame is `data: <json>\n\n`.

```ts
type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };
  // later, additive: | { type: "block"; block: ChatBlock }
```

- Clients ignore unknown `type`s, so new event types don't break old clients.
- Errors before streaming starts are normal HTTP errors (4xx/429). Errors after it starts are `error` events.

### Session store

In-memory `Map` behind an interface, so it can be swapped for Redis/Mongo later.

- TTL: 1 hour from last activity. Swept every minute (`setInterval`, `.unref()`).
- Caps: 1,000 sessions total, 100 messages per session, ~5 active sessions per IP.
- A busy flag per session rejects concurrent streams (409).
- Only the last ~20 messages are sent to the model, to bound token cost. Open question: confirm this number. **Not implemented yet** — `session.get` currently returns the full history and `chat.ts` sends it all to `ai.chatStream` untrimmed; needs investigation before implementing (unbounded token cost as sessions grow).
- On error or abort, the user message is rolled back. On success, the assistant reply is appended.

### Limits

- Message `content`: max 2,000 characters. Fastify `bodyLimit`: ~32 KB. `sessionId`: UUID.
- Proposed values. Adjust if needed.

### Rate limits (per IP and per sessionId; exceeding either gives 429)

| Endpoint | Per sessionId | Per IP |
| --- | --- | --- |
| Create session | none | 5/min |
| Send message | 20/min | 60/min (backstop) |
| Delete | 10/min | none |

- Lower the global default (currently the plugin default of 1000/min).
- Set `trustProxy` if deployed behind a proxy, so the IP is correct.

### SSE mechanics (Fastify)

- `reply.hijack()`, then `reply.raw.writeHead(200, { ...reply.getHeaders(), ... })` so the CORS headers are kept.
- Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
- An `AbortController` is tied to `request.raw` `close`, and its signal goes to the Anthropic stream so a disconnect stops upstream billing.

## Changes by layer

1. **Types** (`types/message.ts`): add `ChatSendRequest { sessionId, message }`, `ChatSessionResponse { sessionId }` and `ChatStreamEvent`, and remove/rename the `Ws*` types (see "Removing the WebSocket code").
2. **AI lib** (`src/lib/ai/`): add `streamMessage(messages, system, signal?): AsyncIterable<ChatStreamEvent>` to `AIAdapter`. The Anthropic implementation uses `client.messages.stream` and yields `delta` events. Later, tool use can yield `block` events.
3. **Session storage layer** (new `src/storage/`, not a lib): the interface plus the in-memory implementation (`src/storage/sessions/`). The session service uses it through the interface, so Redis/Mongo can replace it later. Add tests. Add the new layer and its rules to `AGENTS.md` (proposed: storage can use libs and global types, can't use services or routes, and is used by the session service only).
4. **Services** (two, independent, since a service can't use another service):
   - `src/services/ai.ts`: only talks to the AI. `streamReply(messages, signal?): AsyncIterable<ChatStreamEvent>`. Builds the system prompt (cache `profile.md` at load) and calls the AI lib. Exposes only our own types, never Anthropic's. No sessions.
   - `src/services/session.ts` (uses the storage layer): create, delete, get history (trimmed to the last ~20 for the model), append, busy flag, rollback. No AI.
5. **Routes** (`src/routes/chat.ts`, `src/routes/createChat.ts`, `src/routes/deleteChat.ts`): the three endpoints with request/response schemas, SSE hijack, abort handling, and per-route rate limits. The route orchestrates the two services: load history from the session service, stream from the AI service, then append the reply. Current flow (rollback-on-error/abort and the busy flag are not yet implemented, see "Session store" above):

```ts
try {
  const text = await ai.chatStream(messages, {
    signal: controller.signal,
    onmessage: (delta) => send(createDeltaResponse(delta)),
    onerror: (message) => send(createErrorStreamResponse(message)),
  });
  session.set(sessionId, [...messages, createAssistantMessage(text)]);
  send(createDoneResponse());
} catch (e) {
  if (!controller.signal.aborted) request.log.error(e);
} finally {
  res.end();
}
```

6. **Plugins / entry** (`rateLimit.ts`, `index.ts`): lower the global limit, add `trustProxy` if needed. `@fastify/websocket` is already removed (done). Remove `@fastify/multipart` only if files won't use it.
7. **Docs**: update `AGENTS.md` (routes, types, plugins) and `TECH_DEBT.md`. Add an entry for the leftover `Ws*` types and the client. Revisit the WS-specific entries: validation messages, response format, dev proxy port, chat mount.
8. **Verify**: `npm run typecheck` and `npm test` at the repo root.

## Removing the WebSocket code

Nothing WS-related stays behind. Everything below is deleted, renamed or rewritten as part of the migration.

**Server**
- ✅ `src/routes/chat.ts`: the old `/ws/chat` route and its WS helpers/schemas are gone, replaced by the new SSE route.
- ✅ `index.ts`: the `@fastify/websocket` import and registration are gone.
- ✅ `package.json` / lockfile: `@fastify/websocket` is uninstalled.
- ✅ `src/lib/ai/`: `streamMessage` exists on `AIAdapter`; `chatStream` is the entry point used by the route.
- ✅ `src/services/ai.ts`: `chatStream` is session-free, as planned.
- `types/message.ts`: still needs checking — confirm no `Ws*` types remain and that `Message`/`StreamResponse` fully cover the old `WsMessage`/`WsResponsePayload` shapes.
- Docs: still needs doing — remove WS wording from `AGENTS.md` and `TECH_DEBT.md` (see item 7 above).

**Client** (done in the client phase, but it depends on the type rename above)
- `client/src/lib/ws.ts` (`ChatWebSocket`): delete, replace with a fetch-stream client.
- `client/src/components/features/chat/*` (including `useChatConnection`): update to the new types and the session flow.
- `client/vite.config.ts`: replace the `/ws/chat` proxy with `/chat`.
- Until then, the client won't typecheck against the renamed types. Do the type rename and the client update together, or keep temporary aliases and remove them in the client phase.

## Client impact (later)

- `EventSource` is GET-only, so the client uses `fetch` POST and reads `response.body` as a stream, parsing `data:` frames.
- The client creates a session first and sends `sessionId` with each message.
- UI: an info tooltip that messages are stored for 1 hour, and a button that calls `DELETE /chat/:id`.
- The dev proxy in `client/vite.config.ts` must move from `/ws/chat` to `/chat`.

## Future

- Rich content: a `block` event, produced via Anthropic tool use, rendered by client components. Send data, not model-written HTML/SVG.
- Files: separate storage tied to the session, referenced by `fileIds`, deleted along with the session.
- Persistence: swap the in-memory store for Redis/Mongo behind the same interface.

## Open questions

- Send only the last ~20 messages to the model, or all (up to 100)?
- Confirm the limit values (2,000 characters, ~32 KB, ~5 sessions per IP).
