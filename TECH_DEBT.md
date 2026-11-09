# Tech Debt

## Full Chat History Is Sent to the Model Unbounded

The entire session history is sent to the model on every turn with no trimming. A long-running conversation's token cost — and latency — grows without bound.

**Open questions:** decide the trim window, and whether the full untrimmed history should still be kept in storage even once trimmed for the model call.

## Chat Errors Don't Roll Back the User's Message

When generating a reply fails, the error is logged and the response ends, but the user's message that was already added to the in-memory conversation is never persisted. The failed turn is silently dropped — there's no explicit record that it happened, and no rollback either.

**Open questions:** decide whether the user's message should be persisted immediately and rolled back on failure, or whether "only persist on success" is the intended behavior — right now it's accidental, not a decision.

## Layout Doesn't Follow the Browser's Font Size

Text and spacing sizes are fixed in pixels, so neither scales when a user raises their browser's default font size. The accessibility affordance a relative unit would normally give is gone.

**Open questions:** decide whether font-size scaling matters for this site before changing the sizing approach — it has a real cost to the current px-based naming convention.

## Nothing Enforces the Even-Step Spacing Rule

Spacing values are effectively unbounded, so an odd or fractional value compiles and renders without any warning. The "even numbers, steps of 2–4" convention exists only as a written rule — nothing catches a violation before review.

## No Pipeline for Background Image Variants

Slide background images exist only as manually produced variants, with no documented or repeatable process for generating them. Adding or re-cropping a background is a manual, unrepeatable task today.

## Single-File Atoms Can Import Each Other Unchecked

Atoms written as one file directly in the atoms folder (not in their own subfolder) are treated by the boundary lint as one shared element. Their imports to other layers are checked, but one such atom importing another passes silently, so the "atoms can't reuse other atoms" rule isn't enforced for them. Atoms in their own folder are checked fully.

## No Client Tests

There's no automated test coverage on the client. A malformed content entry or a regression in data-driven rendering is only caught by looking at the page.

## AI Should Accept Files as Context

There's no way to pass files into the assistant's context — only the static profile text and chat history are used.

**Open questions:** needs a decision on transport (a chat message vs. a dedicated upload endpoint), which file types to support, and how file content should be merged into the assistant's context. Sessions expire through a storage TTL only, which can't run any code, so uploaded files would outlive their session unless something else deletes them — how should they be cleaned up?

## ESLint Warnings Left

`npm run lint` passes in both packages, but the client still has warnings: `react-hooks/exhaustive-deps` in `useChatMessages` and `useIntersectionObserver`, and `react-refresh/only-export-components` in `Icon.tsx` and `ChatWindowContext.tsx`.

## No Tests for the Session Service and Storage

`src/services/session.ts` and `src/storage/sessions.ts` import the Redis singleton directly, so they can't be tested without module mocks. Only the Redis lib adapter (`src/lib/redis/`) has tests.

**Open questions:** inject the `Storage` into the storage layer (e.g. a factory) so it can be faked in tests.

## HTTP Requests Can't Be Cancelled

Client HTTP requests have no way to be aborted. When a component unmounts or a newer request supersedes an older one, the stale request still runs to completion and its response is only ignored, wasting bandwidth and server work, and any code that forgets to ignore it can apply outdated data.
