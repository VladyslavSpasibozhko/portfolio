---
name: api-creation-client
description: Use when adding or changing an endpoint descriptor in client/src/api/ (one file per feature, describing a request to the server). Trigger on "add an api endpoint", "new api descriptor", "call a new backend route from the client", "where does this endpoint config go".
---

# API descriptors (`client/src/api/`)

Endpoint descriptors, one file per feature. Each function represents one endpoint and returns a config object for the matching lib to execute — it does not call `fetch`/`WebSocket` itself.

Existing example: `client/src/api/chat.ts`.

## When code belongs here

Any time the client needs to call a new server route or WS/SSE stream, describe it as a function here rather than calling `fetch`/`EventSource` inline in a component or hook.

## Rules

- **One file per feature** — group related endpoints by the feature they serve, not by HTTP verb or by resource name alone.
- **The api file never calls `fetch` itself.** It builds and returns a config object (URL, method, body, headers, etc. — whatever shape the target lib expects) and hands it to the matching `lib/`:
  - JSON request/response endpoint → config consumed by the request lib.
  - Streaming endpoint → config consumed by the SSE lib.
- Add a new lib (see `lib-creation-client`) only if the endpoint needs a transport mechanism that doesn't exist yet — don't duplicate transport logic inside the api file.
- The response type returned to callers should be the shared transport envelope type (see `utils-creation-global`'s transport factories) so server and client agree on shape.

## Checklist

1. Does the new endpoint function live in the right feature's api file (or a new one if the feature has none yet)?
2. Does it avoid calling `fetch`/`WebSocket`/`EventSource` directly, delegating to a lib instead?
3. Is the consumer-facing type the shared envelope type, not an ad hoc shape?
4. Run `npm run typecheck` in `client/`.
