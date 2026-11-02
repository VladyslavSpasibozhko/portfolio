---
name: lib-creation-client
description: Use when adding or changing a client-side lib in client/src/lib/ (reusable functionality scoped to one concern, e.g. a fetch/WebSocket/SSE transport wrapper or i18n translations). Trigger on "create a client lib", "add a transport adapter", "wrap this connection/fetch client-side", "add i18n/translations", "where does this reusable module go in the frontend".
---

# Client libs (`client/src/lib/`)

Client libs are reusable functionality, each scoped to one concern (a transport, translations, etc.).

Existing examples: the WebSocket lib (wraps the chat WS connection), the request lib (thin `fetch` adapter for JSON endpoints, returns the shared response envelope type, builds its own error envelope only for transport-level failures), the SSE lib (generic `text/event-stream` client that decodes/splits frames — parsing a frame's payload into a typed event is the caller's job, not the lib's), the i18n lib (per-language JSON translations, `loadTranslations` and `translate` with key fallback).

## When code belongs here

Code belongs in `client/src/lib/<name>/` when it's a self-contained module for one concern, used from several places — e.g. it talks to a transport directly (raw `fetch`, `WebSocket`, SSE parsing) or owns its own data/registry (translation files). It does not belong here if it's a single standalone pure helper (`utils/`) or if it describes a specific endpoint (`api/`, see `api-creation-client`) — the api layer hands config objects to a lib; it doesn't replace one.

## Rules

- **One concern per lib.** Don't let a lib grow into a general module that does several unrelated things.
- **No cross-lib imports.** A lib can't depend on another lib — if two libs need the same shape, duplicate it rather than import across.
- **No React.** Libs never import React or any component/hook.
- **Stay generic.** A lib isn't tied to one consumer — e.g. the SSE lib decodes frames generically; it doesn't know what any particular endpoint's payload means.
- **Typed boundary**, same as server libs: never leak a vendor type/instance across the boundary — expose the lib's own return shape.
- **Extend by registration.** A new case (a new language, a new transport option) is a new file or map entry, not an edit to the lib's logic.

## Checklist

1. Does the lib own exactly one concern?
2. Does it avoid importing another lib or any React/component/hook code?
3. Is it generic enough that a new consumer needs zero changes to the lib itself?
4. Run `npm run typecheck` in `client/`.
