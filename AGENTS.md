# AGENTS.md

Reference notes for agents working in this repo.

## Types (`types/`)

- `message.ts` — WebSocket contract for communication between the user and the LLM (single WS path). Defines `WsMessage`, `WsRequestPayload`, `WsSuccessResponse`, `WsErrorResponse`, `WsResponsePayload`.
- `profile.ts` — describes the structure of the profile JSON file (`ProfileData`, tech stack, work experience, education, etc.).
- `index.ts` — re-exports the above.

Follow DRY: don't create new types/interfaces on your own. Ask for approval first — once approved, feel free to create the new type.

## Data (`data/`)

- `profile.json` — source of truth for profile data, used by both BE and client. Mostly consumed by the client (FE) for easy structured access.
- `profile.md` — a Markdown copy of `profile.json`, kept for the LLM to have clear, readable context.

## Libs (`src/lib/`)

A layer of adapters and utility sets, each scoped to one specific area (e.g. dates, localization, AI, validation). Currently:

- `ai/` — adapter around the Anthropic SDK.
- `validation/` — adapter around a validation library (e.g. zod).

Rules for adapters:

- Every adapter must expose its own interface/contract (see each lib's `types.ts`) — consumers code against that contract, not the underlying library.
- Inputs and outputs must be strictly typed using the adapter's own types. Never expose the external library's or service's types/instances directly.
- A lib can't use another lib. Each lib depends only on the platform and the external service/library it wraps.
- Never return the raw external instance. Wrap only what's needed:

  ```ts
  // prohibited
  const zod = createZod();
  return zod;

  // correct
  const zod = createZod();
  return { validate: zod.validate };
  ```

## Services (`src/services/`)

An additional layer built on top of libs. Services act as a facade, hiding business logic behind a simple interface.

- A service can't use another service — prohibited.
- A service can use libs, global types, and schemas — allowed.
- Every service must have strictly typed input/output params — a contract to work with it.

## Routes (`src/routes/`)

Tied to the HTTP/WS framework being used (Fastify). A route accepts the incoming param, prepares it for a service, receives the output from the service, and sends it to the client.

- Can use: services, libs.
- Every route must have a schema for request/response with validation.