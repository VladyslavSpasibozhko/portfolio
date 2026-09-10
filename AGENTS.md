# AGENTS.md

Reference notes for agents working in this repo.

## Types (`types/`)

- `message.ts` — WebSocket contract for communication between the user and the LLM (single WS path). Defines `WsMessage`, `WsRequestPayload`, `WsSuccessResponse`, `WsErrorResponse`, `WsResponsePayload`.
- `profile.ts` — describes the structure of the profile JSON file (`ProfileData`, tech stack, work experience, education, etc.).
- `journey.ts` — describes the structure of the journey JSON file (`JourneyData`).
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

## Client (`client/`)

### Components (`client/src/components/`)

- `atoms/` — single, smallest components (button, input, etc.). Can't reuse other atoms.
- `molecules/` — more complex components, built by composing atoms into a ready-to-use component.
- `features/` — components tied to a specific feature (e.g. `chat`, `profile`). May include hooks and utils scoped to that feature (e.g. `features/chat/hooks`, `features/chat/utils`).

Rules:

- A component should have a separate type/interface for its props, if props exist.
- Keep components clean and simple — decompose to keep each one clear and maintainable.
- Always use the existing atoms instead of raw HTML elements — e.g. `Button` instead of `button`, `Typography` instead of `span`/`p`/`h1`/`h2`/etc.

### Styling

- Theme tokens (colors, fonts, sizes, etc.) are defined via `@theme` in `client/src/index.css`, not `tailwind.config.ts`. Components must use those tokens — don't make up ad hoc styles/values.
- Before creating a custom class or one-off style, check whether it's worth adding to `@theme` in `index.css` instead.

### Imports

- Use path aliases instead of relative or absolute traversal like `../../`. Before importing, check `client/tsconfig.json` and `client/vite.config.ts` for the current set of configured aliases — don't assume or hardcode a list, as it changes over time.
- Exception: a component under a `features/*` folder may import other components local to that same feature folder using relative paths.

### Hooks (`client/src/hooks/`)

Common, reusable hooks — not tied to a specific feature. Place a hook here if it might be reused later in other components (e.g. `useClickOutside`). A hook tied to one feature belongs under that feature's own `hooks/` folder instead (e.g. `features/chat/hooks`).

### Utils (`client/src/utils/`)

Common, reusable utility functions (e.g. `hexToRgb`) not tied to React or a specific component.

### Types

Function parameters and component props must use a separate, named interface — not an inline object type.

### Config (`client/src/config.ts`)

Single place holding all env vars (`import.meta.env.VITE_*`). Don't read `import.meta.env` directly elsewhere — import and use vars from `config` instead.
