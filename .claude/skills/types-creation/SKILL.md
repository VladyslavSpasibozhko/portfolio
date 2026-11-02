---
name: types-creation
description: Use when adding or changing a shared type, interface, or schema in shared/types/ or shared/schemas/, consumed by the server and/or the client. Trigger on "add a new type", "create a shared interface", "where does this type go", "new API request/response type", "new schema", "global type".
---

# Shared types (`shared/types/` and `shared/schemas/`)

Everything typed and shared between the server and the client lives in `shared/`. There's no separate server-only or client-only shared types folder.

- `shared/schemas/` — zod schemas plus the types inferred from them (`z.infer`). Use this for any shape that is validated at runtime: API request/response pairs, chat messages, sessions, the transport/wire envelope.
- `shared/types/` — plain TS types with no runtime validation (e.g. the page content/journey types).

## Imports

Each folder has an `index.ts` barrel that re-exports every file as a namespace (`export * as httpSchemas from './http.js'`). Always import through the index:

- Server: relative path to `shared/<folder>/index.js` (deep imports are an ESLint error).
- Client: `@shared/<folder>` alias.

A new file must be added to its folder's `index.ts` under a `<name><Folder>` namespace (e.g. `sessionSchemas`, `journeyTypes`).

## When code belongs here

A type belongs here when it describes a contract crossing (or potentially crossing) the server/client boundary, or shared conceptually by both.

A type that's purely internal to one component/service and never crosses the boundary stays local to that file/module until something else needs it too.

## Rules

- **One file = one conceptual area.** Don't let a single file grow into a grab-bag of unrelated shapes.
- **Validated shape → schema first.** Write the zod schema in `shared/schemas/` and infer the type from it; don't hand-write a TS type that duplicates a schema.
- **A route with no meaningful input skips a request schema entirely** — don't invent an empty one for consistency's sake.
- **DRY — don't create new types/interfaces unilaterally.** Ask for approval first. Once approved, it's fine to add the new type.
- **Presentation-only fields stay primitive.** A field like an icon name is kept as a plain string, not a union/enum, when the concrete set of allowed values is a concern of a different layer (e.g. the icon registry) rather than this type's own contract.
- **No framework or I/O** — `shared/` must run in both Node and the browser.

## Checklist

1. Does this need to be shared/cross a boundary, or is it local to one module?
2. Did you get approval before adding a brand-new type (not just extending an existing, approved one)?
3. Is a runtime-validated shape a schema with an inferred type, not a hand-written duplicate?
4. Is the new file exported from its folder's `index.ts`, and imported only through it?
5. Run `npm run typecheck` at the root **and** in `client/`, since both consume this folder.
