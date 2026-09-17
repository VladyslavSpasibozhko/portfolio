# Tech Debt

## Validation Error Messages

**Priority:** Medium

**Reason:**  
Validation failures return AJV's technical error messages ("must be string", "must have required property") instead of user-friendly messages. Users can't understand what went wrong with their input.

**What to update:**
Define custom error mappings in `ErrorsDictionary` for common validation failures in WebSocket messages.

**How:**
1. Identify exact error paths AJV generates for missing/invalid fields
2. Map those paths to user-friendly messages
3. Pass `ErrorsDictionary` to `validate()` function
4. Test that error messages are helpful and accurate

## AI Response Format Is an Untyped String

**Priority:** Medium

**Reason:**  
`AIAdapter.sendMessage` and `services/ai.ts` `chat()` both return a plain `string`, with no indication of whether it's Markdown or plain text. The client can't reliably decide how to render it (e.g. run it through a Markdown renderer vs. display as-is).

**What to update:**
Narrow and type the AI response shape so the format is explicit and part of the contract (e.g. `{ format: 'markdown' | 'text'; content: string }`), threaded through the lib, service, and `WsMessage`/`WsSuccessResponse` types.

**How:**
1. Decide the response format(s) the assistant should support
2. Update `AIAdapter` contract and `Message`/`WsMessage` types to carry the format alongside the content
3. Update the client to render based on the declared format

## Chat UI Is Built but Not Mounted

**Priority:** Medium

**Reason:**  
`features/chat` (`ChatWrapper`, `ChatWindow`, `useChatConnection`) and the `/ws/chat` route are implemented, but `App.tsx` only renders `StarField` and `MainPage`. The chat isn't reachable on the site, so it isn't exercised and may drift from the current design (it predates the journey redesign).

**What to update:**
Decide whether the chat ships with the journey page and, if so, mount it and restyle it to match.

**How:**
1. Mount `ChatWrapper` in `App.tsx` (or remove the feature if it's out of scope)
2. Align its styles with the current tokens and responsive layout
3. Verify the full flow end-to-end against a running server

## Dev WebSocket Proxy Points to the Wrong Port

**Priority:** Medium

**Reason:**  
`client/vite.config.ts` proxies `/ws/chat` to `ws://localhost:3000`, while `.env.example` sets `PORT=3001`. With the default env, the dev proxy can't reach the server.

**What to update:**
Keep the proxy target and the server port in sync.

**How:**
1. Pick one default port
2. Either hardcode it consistently in both places or read it from env in `vite.config.ts`

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

## JSON and Markdown Data Copies Are Synced by Hand

**Priority:** Low

**Reason:**  
`profile.json`/`profile.md` and `journey.json`/`journey.md` hold the same content twice and are kept in sync manually. `profile.md` feeds the AI prompt and `journey.json` feeds the UI, so drift means the assistant and the page can say different things. `journey.md` isn't used by the AI at all yet.

**What to update:**
Generate the Markdown copies from the JSON (or add a check that flags drift), and decide whether the journey content should be part of the AI context.

**How:**
1. Write a small script that renders `*.md` from `*.json`
2. Run it as part of the build or a pre-commit check
3. If useful, include `journey.md` in `systemPrompt()` in `src/services/ai.ts`

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
