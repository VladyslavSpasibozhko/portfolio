---
name: utils-creation-global
description: Use when adding or changing a root-level helper in utils/, shared between the server and the client (reached from the client via the @global-utils alias). Trigger on "add a global util", "shared helper between client and server", "where does this cross-cutting function go", "add to utils/ at the root".
---

# Global utils (`utils/` at repo root)

Root-level helpers not tied to the server or the client specifically — shared by both. The client reaches them via the `@global-utils` alias (`@global-utils/*` → `utils/*`; see `client/tsconfig.json` / `client/vite.config.ts`).

Existing examples: message factories (construct typed chat messages per role), transport factories (build the success/error/stream response envelopes from the shared transport type, so server and client agree on one shape without duplicating it).

## When code belongs here

Put a function here only if **both** are true:
- It's pure: no framework (no React, no Fastify), no vendor SDK, no I/O.
- It's genuinely needed by both the server and the client — not just "might be useful someday" on the other side. If only one side needs it today, put it in that side's own `utils/` (client: `client/src/utils/`) and promote it here only when a second, real consumer on the other side shows up (CLAUDE.md Rule 7 — extract on second use, applied across the server/client boundary too).

## Rules

- No framework-specific code — this folder is imported directly by relative path on the server and by alias on the client, so it must work in both runtimes.
- No hidden globals/time/env/random reads — pass everything in as arguments (CLAUDE.md Rule 8).
- Keep each helper's responsibility narrow and typed; this is shared code, so a mistake here affects both apps.

## Checklist

1. Is the function pure (no I/O, no framework, no vendor SDK)?
2. Does it have a real consumer on both the server and the client, not just one?
3. Does it avoid hidden global/env/time reads?
4. Run `npm run typecheck` at the root **and** in `client/`, since both consume this folder.
