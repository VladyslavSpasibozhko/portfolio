---
name: utils-creation-client
description: Use when adding or changing a client-only pure helper in client/src/utils/. Trigger on "add a client util", "where does this helper function go in the frontend", "pure function not tied to React".
---

# Client utils (`client/src/utils/`)

Common, reusable utility functions that are specific to the client but not tied to React or to any one component/feature.

## When code belongs here

- Pure function, no React (no hooks, no JSX), no network call, no vendor SDK.
- Only makes sense in a browser/client context (otherwise it belongs in the shared root `utils/` — see `utils-creation-global`) — or it's simply not yet proven to be needed server-side; don't promote it to the global folder preemptively.
- Used by more than one place in the client, or clearly general-purpose (per CLAUDE.md Rule 7, extract on second use — a helper used by exactly one file can stay inline until a second caller appears).

## Rules

- No React imports here — if the logic needs `useState`/`useEffect`/context, it's a hook, not a util (see `hook-creation`).
- No `fetch`, WebSocket, or SSE calls — that's a `lib/` concern (see `lib-creation-client`).
- No reading `import.meta.env` directly — env values come through `client/src/config.ts` only.
- Keep each function doing one thing with typed input/output (CLAUDE.md Rule 2).

## Checklist

1. Is it pure and React-free?
2. Does it avoid network calls and direct env reads?
3. Does it have (or will it imminently have) more than one caller, justifying extraction out of the calling file?
4. Run `npm run typecheck` in `client/`.
