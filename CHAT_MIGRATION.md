# Chat Migration: WebSocket → SSE (server)

Status: planned, not implemented. Scope: server only; the client is handled separately.

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
| `POST` | `/api/chat/sessions` | none | `{ sessionId }` (server-generated UUID) |
| `POST` | `/api/chat` | `{ sessionId, message }` (`fileIds` reserved for later) | SSE stream. 404 unknown session, 409 stream already running, 429 rate limited |
| `DELETE` | `/api/chat/:sessionId` | none | 204. Clears messages (and files later) |

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
- Only the last ~20 messages are sent to the model, to bound token cost. Open question: confirm this number.
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
5. **Stream util** (new `src/utils/streamedMessage.ts`): `StreamedMessage` collects a streamed reply so the route doesn't accumulate text by hand. `pipe(stream)` is a pass-through async generator: it yields every `ChatStreamEvent` unchanged and collects `delta` text on the side. `toMessage()` returns a plain `ChatMessage`. It depends on nothing (no services, no storage); later it can also collect `block` events. Add tests. Add the `src/utils/` folder to `AGENTS.md`.
6. **Routes** (`src/routes/chat.ts`): the three endpoints with request/response schemas, SSE hijack, abort handling, and per-route rate limits. Add a framing helper with tests. The route orchestrates the two services: load history from the session service, stream from the AI service, then append the reply (or roll back on error/abort). Flow:

```ts
const message = new StreamedMessage("assistant");
try {
  for await (const event of message.pipe(streamReply(history, signal))) write(event);
  write({ type: "done" });
  sessions.append(id, message.toMessage());
} catch {
  write({ type: "error", message: "..." });
  sessions.rollback(id); // remove the user message; partial replies are never saved
} finally {
  sessions.release(id); // clear the busy flag
}
```

7. **Plugins / entry** (`rateLimit.ts`, `index.ts`): lower the global limit, add `trustProxy` if needed, and remove `@fastify/websocket`. Remove `@fastify/multipart` only if files won't use it.
8. **Docs**: update `AGENTS.md` (routes, types, plugins) and `TECH_DEBT.md`. Add an entry for the leftover `Ws*` types and the client. Revisit the WS-specific entries: validation messages, response format, dev proxy port, chat mount.
9. **Verify**: `npm run typecheck` and `npm test` at the repo root.

## Removing the WebSocket code

Nothing WS-related stays behind. Everything below is deleted, renamed or rewritten as part of the migration.

**Server**
- `src/routes/chat.ts`: delete the `/ws/chat` route, `parseIncomingMessage`, `serializeResponse`, `createResponse`, `createErrorResponse`, `receiveMessage`, and the `WsMessageSchema` / `WsRequestSchema` / `WsResponseSchema` schemas. Replace them with the new endpoints and schemas.
- `index.ts`: remove the `@fastify/websocket` import and registration.
- `package.json` / lockfile: uninstall `@fastify/websocket`.
- `src/lib/ai/`: `sendMessage` (non-streaming, returns `string`) is replaced by `streamMessage`. Delete `sendMessage` unless something else still needs it.
- `src/services/ai.ts`: `chat(): Promise<string>` is replaced by `streamReply`, and it stays session-free.
- `types/message.ts`: delete `WsSuccessResponse`, `WsErrorResponse` and `WsResponsePayload`. Rename or replace `WsMessage`, `WsMessageRole` and `WsRequestPayload` with `Chat*` equivalents (`ChatMessage`, `ChatMessageRole`, `ChatSendRequest`). Update the `types/index.ts` re-exports.
- Docs: remove WS wording from `AGENTS.md` (`message.ts` description, `chat.ts` route entry, "WS message" transport note, `ws.ts` client lib) and from `TECH_DEBT.md` (validation-messages, response-format, chat-mount and dev-proxy entries).

**Client** (done in the client phase, but it depends on the type rename above)
- `client/src/lib/ws.ts` (`ChatWebSocket`): delete, replace with a fetch-stream client.
- `client/src/components/features/chat/*` (including `useChatConnection`): update to the new types and the session flow.
- `client/vite.config.ts`: replace the `/ws/chat` proxy with `/api/chat`.
- Until then, the client won't typecheck against the renamed types. Do the type rename and the client update together, or keep temporary aliases and remove them in the client phase.

## Client impact (later)

- `EventSource` is GET-only, so the client uses `fetch` POST and reads `response.body` as a stream, parsing `data:` frames.
- The client creates a session first and sends `sessionId` with each message.
- UI: an info tooltip that messages are stored for 1 hour, and a button that calls `DELETE /api/chat/:sessionId`.
- The dev proxy in `client/vite.config.ts` must move from `/ws/chat` to `/api/chat`.

## Future

- Rich content: a `block` event, produced via Anthropic tool use, rendered by client components. Send data, not model-written HTML/SVG.
- Files: separate storage tied to the session, referenced by `fileIds`, deleted along with the session.
- Persistence: swap the in-memory store for Redis/Mongo behind the same interface.

## Open questions

- Send only the last ~20 messages to the model, or all (up to 100)?
- Confirm the limit values (2,000 characters, ~32 KB, ~5 sessions per IP).
