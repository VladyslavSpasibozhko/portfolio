---
name: lib-creation-client
description: Use when adding or changing a client-side lib in client/src/lib/ (e.g. a fetch/WebSocket/SSE transport wrapper). Trigger on "create a client lib", "add a transport adapter", "wrap this connection/fetch client-side", "where does this transport wrapper go in the frontend".
---

# Client libs (`client/src/lib/`)

Client libs are access layers, each scoped to one transport concern — not general utility code.

Existing examples: the WebSocket lib (wraps the chat WS connection), the request lib (thin `fetch` adapter for JSON endpoints, returns the shared response envelope type, builds its own error envelope only for transport-level failures), the SSE lib (generic `text/event-stream` client that decodes/splits frames — parsing a frame's payload into a typed event is the caller's job, not the lib's).

## When code belongs here

Code belongs in `client/src/lib/<name>/` when it talks to the network/a transport mechanism directly (raw `fetch`, `WebSocket`, `EventSource`/SSE parsing). It does not belong here if it's pure logic with no I/O (`utils/`) or if it describes a specific endpoint (`api/`, see `api-creation-client`) — the api layer hands config objects to a lib; it doesn't replace one.

## Rules

- **One transport concern per lib.** Don't let a lib grow into a general "client" that does several unrelated things.
- **No cross-lib imports.** A lib can't depend on another lib — if two libs need the same shape, duplicate it rather than import across.
- **No React.** Libs never import React or any component/hook.
- **Stay generic.** A lib isn't tied to one endpoint's shape — e.g. the SSE lib decodes frames generically; it doesn't know what any particular endpoint's payload means.
- **Typed boundary**, same as server libs: never leak a vendor type/instance across the boundary — expose the lib's own return shape.

## Checklist

1. Does the lib own exactly one transport concern?
2. Does it avoid importing another lib or any React/component/hook code?
3. Is it generic enough that a new endpoint using the same transport needs zero changes to the lib itself?
4. Run `npm run typecheck` in `client/`.
