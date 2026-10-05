---
name: service-creation-server
description: Use when adding or changing a server-side service in src/services/ (business logic/orchestration, e.g. the ai service, the session service). Trigger on "create a service", "add business logic on the server", "where does this orchestration go", "new service on the backend".
---

# Server services (`src/services/`)

A service is a facade: it hides business logic behind a simple, typed interface. Built on top of libs and storage — never a layer that talks to HTTP or SQL/vendor APIs directly.

Existing examples: the `ai` service (orchestrates response generation using the `ai` lib; stateless with respect to sessions), the `session` service (owns chat session lifecycle — create, read, update, remove — delegating persistence to the storage layer).

## When code belongs here

Code belongs in `src/services/<capability>/` when it's business logic or orchestration — coordinating one or more libs and/or the storage layer to fulfill one capability. It doesn't belong here if it only wraps an external SDK with no business logic (that's a `lib/`, see `lib-creation-server`) or if it only persists/reads data with no logic beyond that (that's `storage/`).

## Naming

Name a service after the **capability it owns** (`session`, `ai`), not an implementation detail (not `sessionMapService` or `inMemoryStore`).

## Rules

- **A service can't use another service.** If two services seem to need each other, either the shared logic belongs in a lib/pure function both can call, or the orchestration belongs one level up (the route calling both).
- **A service can use:** libs, global `types/`, and the storage layer.
- **A service must not use:** a route's request/response schema — those are the route's own contract, not the service's. The service's input/output types are its own, defined by the service (or in `types/` if shared — see `types-creation`).
- **Strictly typed input/output.** Every service exposes a clear contract to call it with — no loosely-typed `any` params.
- **No `req`/`res`.** A service never touches the HTTP layer; it has no knowledge it's being called from a route, a job, or a test.
- **No hidden env/time/random reads.** Pass `now`, config values, etc. in as arguments (CLAUDE.md Rule 8); env itself is only read in `config/`.
- **Idempotency for retried/payment-like operations** — take an idempotency key as input when the operation could be retried.

## Checklist

1. Is this genuinely business logic/orchestration, not a thin SDK wrap (lib) or plain persistence (storage)?
2. Named after the capability, not an implementation detail?
3. Does it avoid importing another service, and avoid using a route's schema types?
4. Typed input/output contract defined?
5. No `req`/`res`, no hidden env/time/random reads?
6. Run `npm run typecheck` at the repo root.
