# Tech Debt

## Validation Error Messages

**Priority:** Medium

**Reason:**  
Validation failures return AJV's technical error messages ("must be string", "must have required property") instead of user-friendly messages. Users can't understand what went wrong with their input.

**What to update:**
Define custom error mappings in `ErrorsDictionary` for common validation failures in chat requests.

**How:**
1. Identify exact error paths AJV generates for missing/invalid fields
2. Map those paths to user-friendly messages
3. Pass `ErrorsDictionary` to `validate()` function
4. Test that error messages are helpful and accurate

## AI Response Format Is an Untyped String

**Priority:** Medium

**Reason:**  
`AIAdapter.sendMessage`/`streamMessage` and `services/ai.ts` `chat()`/`chatStream()` all resolve to a plain `string`, with no indication of whether it's Markdown or plain text. The client can't reliably decide how to render it (e.g. run it through a Markdown renderer vs. display as-is). The streamed `delta` events (`StreamResponse`) carry the same untyped text.

**What to update:**
Narrow and type the AI response shape so the format is explicit and part of the contract (e.g. `{ format: 'markdown' | 'text'; content: string }`), threaded through the lib, service, and `Message`/`StreamResponse` types.

**How:**
1. Decide the response format(s) the assistant should support
2. Update `AIAdapter` contract and `Message`/`StreamResponse` types to carry the format alongside the content
3. Update the client to render based on the declared format

## Chat UI Is Built but Not Mounted

**Priority:** Medium

**Reason:**  
`features/chat` (`ChatWrapper`, `ChatWindow`, `useChatConnection`) is implemented against the old `/ws/chat` WebSocket route, but `App.tsx` only renders `StarField` and `MainPage` — the chat isn't reachable on the site. The server has since dropped `/ws/chat` for SSE endpoints (see `CHAT_MIGRATION.md`), so the client feature no longer just needs mounting — it needs rebuilding against the new `/chat`, `/chat/create`, `/chat/:id` endpoints before it can be mounted at all.

**What to update:**
Decide whether the chat ships with the journey page. If so, do the client phase of `CHAT_MIGRATION.md` first (rewrite `useChatConnection`/`ws.ts` against the SSE endpoints), then mount it and restyle it to match.

**How:**
1. Finish the client migration in `CHAT_MIGRATION.md` (fetch-stream client, session create/delete flow)
2. Mount `ChatWrapper` in `App.tsx` (or remove the feature if it's out of scope)
3. Align its styles with the current tokens and responsive layout
4. Verify the full flow end-to-end against a running server

## Dev Proxy Still Points at the Removed WebSocket Route

**Priority:** Medium

**Reason:**  
`client/vite.config.ts` proxies `/ws/chat` to `ws://localhost:3000`, but the server no longer has a `/ws/chat` route at all (replaced by `POST /chat`, `POST /chat/create`, `DELETE /chat/:id`, see `CHAT_MIGRATION.md`). The proxy target's port was also out of sync with `.env.example`'s `PORT=3001`. The dev proxy can't reach anything in its current form regardless of port.

**What to update:**
Replace the `/ws/chat` WS proxy entry with a plain HTTP proxy for `/chat`, once the client is migrated, and keep its target port in sync with the server's default.

**How:**
1. Do the client phase of `CHAT_MIGRATION.md` first (client can't use the new endpoints until then)
2. Replace the proxy entry: `/chat` → `http://localhost:<port>`, no `ws: true`
3. Pick one default port and either hardcode it consistently in both places or read it from env in `vite.config.ts`

## Chat Sessions Have No TTL, Caps, or Concurrency Guard

**Priority:** Medium

**Reason:**  
`src/storage/sessions.ts` is a plain in-memory `Map` with no expiry and no limits: sessions never get swept, and nothing caps total sessions, messages per session, or sessions per IP. Nothing stops two concurrent `POST /chat` calls against the same session either (no busy flag), so overlapping streams can race on the same history array. `CHAT_MIGRATION.md` planned all of this (1h TTL swept every minute, 1,000/100/~5 caps, a 409 on concurrent streams) but it isn't implemented.

**What to update:**
Add TTL sweeping, size caps, and a per-session busy flag to the storage/session layer.

**How:**
1. Add `lastActivity` to stored sessions and sweep expired ones on an unref'd interval
2. Add and enforce the caps (total sessions, messages/session, sessions/IP)
3. Add a busy flag per session; `POST /chat` returns 409 if a stream is already running for that session

## Full Chat History Is Sent to the Model, Unbounded

**Priority:** Medium

**Reason:**  
`src/routes/chat.ts` sends `session.get(sessionId)` untrimmed to `ai.chatStream`. `CHAT_MIGRATION.md` planned trimming to roughly the last 20 messages before calling the model, but that was never built — a long session grows token cost (and latency) without bound.

**What to update:**
Trim history to a fixed window before it reaches the AI service, while still storing the full history for the session (or cap that too — needs a decision, see the caps entry above).

**How:**
1. Decide the message window (the migration plan proposes ~20; confirm before implementing)
2. Apply the trim in `services/session.ts` (its `get`) or at the call site in `chat.ts` — pick one, don't duplicate the rule
3. Keep the untrimmed history in storage unless the caps entry above says otherwise

## Chat Errors Don't Roll Back the User's Message

**Priority:** Low

**Reason:**  
In `src/routes/chat.ts`, if `ai.chatStream` throws (not from client abort), the route logs the error and ends the response, but `session.set` is never called — the user's message that was already appended to the local `messages` array in memory is simply dropped, not persisted. That's harmless today only because the session in storage was never mutated with the failed turn, but it also means a failed turn is silently invisible to the session (the user sees an error frame, but there's no explicit "rollback" - it's an accidental no-op). `CHAT_MIGRATION.md` calls for an explicit rollback step.

**What to update:**
Make the error path explicit: either persist the user message immediately and roll it back on failure, or confirm the current "append only on success" behavior is intentional and drop the rollback requirement from `CHAT_MIGRATION.md`.

**How:**
1. Decide which model to use (append-then-rollback vs. append-only-on-success)
2. Implement it in `src/routes/chat.ts` / `services/session.ts`
3. Update `CHAT_MIGRATION.md`'s "Session store" bullet to match what's actually built

## Layout Doesn't Follow the Browser's Font Size

**Priority:** Low

**Reason:**  
The `--text-*` tokens and `--spacing` in `client/src/index.css` are in `px` (see the sizing rule in `AGENTS.md`), so neither text nor spacing scales when a user raises their browser's default font size. Rendered sizes are unchanged at the default 16px root, but the accessibility affordance that `rem` gave us is gone.

**What to update:**
Decide whether user font-size scaling matters for this site; if it does, restore it without giving up px-numbered class names.

**How:**
1. Keep the numbering as it is (`text-44` = 44px, `p-16` = 16px at the default root)
2. Express the values as a `calc()` off the root font size — e.g. `--spacing: calc(1rem / 16)` — rather than going back to hand-written `rem` values
3. Verify the slides at 125%/150% browser font size before and after

## Nothing Enforces the Even-Step Spacing Rule

**Priority:** Low

**Reason:**  
With `--spacing: 1px` the scale is unbounded, so `p-15` or `gap-7.5` compile happily and just render slightly off. The old `--space-*`/`--width-*` token lists at least failed loudly on a value they didn't define (by falling back to a different unit) — that early warning is gone, and the "even numbers, steps of 2–4" convention now lives only in `AGENTS.md`.

**What to update:**
Make an off-scale spacing value fail in CI rather than in review.

**How:**
1. Add an ESLint rule (e.g. `eslint-plugin-tailwindcss` with a custom pattern) or a small lint script that greps class strings for odd/fractional spacing numbers
2. Wire it into the client's lint step

## No Pipeline for Background Image Variants

**Priority:** Low

**Reason:**  
Slide backgrounds are committed as pre-generated `<name>-<mobile|tablet|laptop>.<avif|webp>` files. The original source images were removed from the repo and there's no script documenting how the variants were produced, so adding or re-cropping a background is a manual, unrepeatable process. `backgrounds.ts` still mentions the removed `client/static/source/` folder.

**What to update:**
Make the variant generation reproducible.

**How:**
1. Add a script (e.g. with `sharp`) that takes an original and outputs the three sizes in AVIF and WebP with the current quality settings
2. Document where originals are kept (outside the repo) and how to run the script
3. Update the comment in `backgrounds.ts`

## Journey Content Isn't Part of the AI Context

**Priority:** Low

**Reason:**  
`data/journey.json` (the page content) and `data/profile.md` (the AI context) are now separate files with no duplication, but the assistant only sees `profile.md`. It can't answer questions about anything that exists only on the page, and the two files can still drift on shared facts since both are edited by hand.

**What to update:**
Decide whether the journey content should feed the AI too, and add a check that flags factual drift between the two files.

**How:**
1. Render `journey.json` to Markdown at runtime and include it in `systemPrompt()` in `src/services/ai.ts`, or accept the gap and document it
2. If useful, add a check (build or pre-commit) that flags facts present in one file and missing from the other

## Stale `@icons` Alias

**Priority:** Low

**Reason:**  
`@icons` in `client/tsconfig.json` and `client/vite.config.ts` points to `client/src/icons`, which no longer exists — icons moved to `components/atoms/Icon/icons/`. The comment in `Icon.tsx` still refers to `src/icons/`.

**What to update:**
Remove the alias (or repoint it) and fix the comment.

## `data/` Is Served as the Client's Public Directory

**Priority:** Low

**Reason:**  
`publicDir: '../data'` copies every data file (JSON and Markdown) into `client/dist` as public assets, even though the JSON is already bundled via imports. Anything added to `data/` becomes publicly downloadable.

**What to update:**
Stop exposing `data/` wholesale; publish only what the client actually fetches at runtime.

## No Client Tests

**Priority:** Low

**Reason:**  
Only the server validation lib has tests. Data-driven rendering (`JourneyBlock` switch, `getBackground`, `isIconName` narrowing) and utils have no coverage, so a malformed `journey.json` entry is only caught visually.

**What to update:**
Add a test runner for the client (e.g. Vitest) and cover utils plus a smoke render of every block type from `journey.json`.

## AI Should Accept Files as Context

**Priority:** Low

**Reason:**  
There's currently no way to pass files (e.g. attachments, documents) into the AI's context — only the static `profile.md` and the chat history are used. `@fastify/multipart` is already registered but unused for this purpose.

**What to update:**
Design and implement a way for the chat flow to accept file input and incorporate it into the AI context.

**How:**
To be discussed — needs a decision on transport (WS message vs. HTTP upload endpoint), file types supported, and how file content is merged into the system prompt/context.
