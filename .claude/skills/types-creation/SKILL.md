---
name: types-creation
description: Use when adding or changing a shared type/interface in the root types/ folder, consumed by the server and/or the client. Trigger on "add a new type", "create a shared interface", "where does this type go", "new API request/response type", "global type".
---

# Types (`types/` at repo root)

There is exactly one types layer in this repo: the root `types/` folder. There's no separate server-only or client-only types folder — everything shared between the two apps lives here, and each app imports it its own way:

- Server imports files by relative path.
- Client imports via the `@global-types/<file-name>` alias.
- **No barrel file** — there is no `types/index.ts`. Always import the specific file directly, on both sides.

## When code belongs here

A type belongs here when it describes a contract crossing (or potentially crossing) the server/client boundary, or shared conceptually by both: session identity, chat message shape, the transport/wire envelope, page content schema, and API request/response pairs.

A type that's purely internal to one component/service and never crosses the boundary doesn't need to live here — keep it local to that file/module until something else needs it too.

## Rules

- **One file = one conceptual contract.** Don't let a single file grow into a grab-bag of unrelated shapes.
- **Validation schemas stay in the route file**, not here — `types/` holds only the plain TS shape for API request/response pairs; a route with no meaningful input has no request type.
- **A route with no meaningful input skips a request type entirely** — don't invent an empty one for consistency's sake.
- **DRY — don't create new types/interfaces unilaterally.** Ask for approval first. Once approved, it's fine to add the new type.
- **Presentation-only fields stay primitive.** A field like an icon name is kept as a plain string, not a union/enum, when the concrete set of allowed values is actually a concern of a different layer (e.g. the icon registry) rather than this type's own contract.

## Checklist

1. Does this genuinely need to be shared/cross a boundary, or is it local to one module?
2. Did you get approval before adding a brand-new type (not just extending an existing, approved one)?
3. Is it one file per contract, imported directly (no barrel)?
4. Does validation logic stay out of `types/` (in the route file instead)?
5. Run `npm run typecheck` at the root **and** in `client/` after the change, since both consume this folder.
