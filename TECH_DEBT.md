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

## Stale `@icons` Alias

A path alias configured for icons points at a folder that no longer exists — icons moved elsewhere after it was set up. Anything still written against that alias leads nowhere.

## `data/` Is Served as the Client's Public Directory

Every file in the content data folder is copied into the client build and becomes publicly downloadable, including files only meant to be read server-side. Anything added to that folder is exposed by default, whether or not that's intended.

## No Client Tests

There's no automated test coverage on the client. A malformed content entry or a regression in data-driven rendering is only caught by looking at the page.

## AI Should Accept Files as Context

There's no way to pass files into the assistant's context — only the static profile text and chat history are used.

**Open questions:** needs a decision on transport (a chat message vs. a dedicated upload endpoint), which file types to support, and how file content should be merged into the assistant's context.

## ESLint Warnings Left

`npm run lint` passes in both packages, but the client still has warnings: `react-hooks/exhaustive-deps` in `useChatMessages` and `useIntersectionObserver`, and `react-refresh/only-export-components` in `Icon.tsx` and `ChatWindowContext.tsx`.
