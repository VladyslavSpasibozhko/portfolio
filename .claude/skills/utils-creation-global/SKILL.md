---
name: utils-creation-global
description: Use when adding or changing a helper in shared/utils/, shared between the server and the client (reached from the client via the @shared alias). Trigger on "add a global util", "add a shared util", "shared helper between client and server", "where does this cross-cutting function go", "add to shared/utils".
---

# Shared utils (`shared/utils/`)

Helpers not tied to the server or the client specifically — shared by both.

Existing examples: `commonUtils` (construct typed chat messages per role), `httpUtils` (build the success/error/stream response envelopes from the shared transport schemas, so server and client agree on one shape without duplicating it).

## Imports

`shared/utils/index.ts` re-exports each file as a namespace (`export * as httpUtils from './http.js'`). Import only through the index: the server uses a relative path to `shared/utils/index.js` (deep imports are an ESLint error), the client uses `@shared/utils`. A new file must be added to the index under a `<name>Utils` namespace.

## When code belongs here

Put a function here only if **both** are true:
- It's pure: no framework (no React, no Fastify), no vendor SDK, no I/O.
- It's needed by both the server and the client — not just "might be useful someday" on the other side. If only one side needs it today, keep it on that side (client: `client/src/utils/`) and promote it here only when a second, real consumer on the other side shows up (CLAUDE.md Rule 7 — extract on second use, applied across the server/client boundary too).

## Rules

- No framework-specific code — this folder runs in both Node and the browser.
- May import from other `shared/` folders (schemas, errors, types), never from `src/` or `client/`.
- No hidden globals/time/env/random reads — pass everything in as arguments (CLAUDE.md Rule 8).
- Keep each helper's responsibility narrow and typed; this is shared code, so a mistake here affects both apps.

## Checklist

1. Is the function pure (no I/O, no framework, no vendor SDK)?
2. Does it have a real consumer on both the server and the client, not just one?
3. Does it avoid hidden global/env/time reads?
4. Is it exported from `shared/utils/index.ts`?
5. Run `npm run typecheck` at the root **and** in `client/`, since both consume this folder.
