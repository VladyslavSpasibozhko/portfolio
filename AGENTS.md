# AGENTS.md

Reference notes for agents working in this repo.

## Repo layout

- `index.ts` — Fastify server entry: registers plugins (CORS, rate limit, multipart) and routes.
- `src/` — server code: `lib/`, `services/`, `storage/`, `routes/`, `plugins/`, `utils/`.
- `utils/` — global utils shared across the repo (see Global utils).
- `types/` — shared types, used by both the server and the client. No barrel file — import each file directly (`@global-types/<file-name>` alias on the client).
- `data/` — content: `journey.json` (rendered by the client) and `profile.md` (AI context).
- `client/` — Vite + React + Tailwind v4 app.

## Commands

Server (repo root):

- `npm run dev` — run the server with `tsx watch`.
- `npm run typecheck` / `npm run build` / `npm start`.
- `npm test` — runs `src/**/*.test.ts` with the Node test runner.

Client (`client/`):

- `npm run dev` / `npm run build` / `npm run preview` / `npm run typecheck`.

Run `typecheck` in the affected package(s) after changes.

## Commits

Commit messages follow Conventional Commits (`type(scope): description`), matching existing history. See the `commit` skill for the type/scope rules.

## Environment

- Server env lives in `.env` at the root (see `.env.example`): `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `PORT`, `CLIENT_ORIGIN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, `APP_BASE_URL` (public base URL QStash calls back). Missing vars throw at startup. Dev and prod use separate Upstash databases: dev values in local `.env`, prod values in the host's env settings (never committed).
- Client env lives in `client/src/.env` (`envDir: './src'` in `vite.config.ts`) and is exposed only through `client/src/config.ts`.

## Types (`types/`)

No barrel file — there is no `types/index.ts`. Each file is imported directly: the server uses relative paths, the client uses `@global-types/<file-name>` (see Imports).

Each file owns one conceptual contract:

- Session identity — the shape used to address a chat session.
- Chat message — the contract between the user and the LLM.
- Transport/wire envelope — success/error/stream response shapes shared by every route.
- Page content — the schema the main page's content data must conform to.
- API request/response — one pair of contracts per route; a route with no meaningful input has no request type.

See the `types-creation` skill for the rules on adding, approving, and scoping new types.

## Data (`data/`)

Two files, each with one consumer:

- `profile.md` — the source of truth: profile prose (background, work history, use cases, interview answer bank) loaded into the AI system prompt so the LLM has clear, readable context. Only the server reads it.
- `journey.json` — the main page's slide content, derived from `profile.md` but reshaped for presentation (structured into slides/blocks, trimmed, reworded for a reader instead of an LLM). Only the client reads it.

Rules:

- Keep the split: rendered content goes in `journey.json`, AI context goes in `profile.md`. There are no Markdown/JSON copies of either — don't reintroduce a mirror file that has to be synced by hand.
- A factual change (a new role, a corrected date) starts in `profile.md`, then must be carried into `journey.json`'s derived content — the two can differ in wording and structure, but never in meaning.
- `data/` is also Vite's `publicDir`, so everything in it is shipped publicly with the client build — `profile.md` included. Never put secrets or private info there.

## Libs (`src/lib/`)

A layer of adapters and utility sets, each scoped to one specific area. Responsibility of each lib is one line — the adapter wraps one external SDK/library and exposes its own contract:

- `ai` lib — adapter for the AI provider's SDK, used to generate responses.
- `validation` lib — adapter for the schema-validation library, used to validate input against a schema.

See the `lib-creation-server` skill for the rules on adding or changing a lib (contract boundaries, typing, testing).

## Services (`src/services/`)

An additional layer built on top of libs. Services act as a facade, hiding business logic behind a simple interface. Each service is named after the capability it owns, not an implementation detail:

- `ai` service — orchestrates response generation using the `ai` lib; stateless with respect to sessions.
- `session` service — owns chat session lifecycle (create, read, update, remove), delegating persistence to the storage layer.

See the `service-creation-server` skill for the rules on adding or changing a service (what it may depend on, naming, typing).

## Storage (`src/storage/`)

Persistence, kept behind a plain function interface so the backing store can change without touching callers.

- Can use: libs, global types.
- Can't use: services, routes.
- Used only by the session service — routes and other services never import from `src/storage/` directly.
- Current responsibility: session storage — holds chat messages per session in memory.

## Routes (`src/routes/`)

Tied to the HTTP/WS framework being used (Fastify). A route accepts the incoming param, prepares it for a service, receives the output from the service, and sends it to the client.

- Current responsibilities: create a chat session, delete a chat session, fetch a session's messages, stream a chat reply over SSE.

See the `route-creation-server` skill for the rules on adding or changing a route (validation, thin-controller boundary, transport envelopes).

## Global utils (`utils/`)

Root-level helpers not tied to the server or client layers. Shared between both — the client reaches them via the `@global-utils` alias (`@global-utils/*` → `utils/*`; see `client/tsconfig.json` and `client/vite.config.ts`).

- Message factories — construct typed chat messages for each role.
- Transport factories — build the success/error/stream response envelopes defined in the shared transport type, so server and client agree on one shape without duplicating it.

See the `utils-creation-global` skill for the rules on what belongs in this shared folder.

## Plugins (`src/plugins/`)

Thin wrappers that register Fastify plugins with project config (CORS, rate limiting). Each plugin module exposes one registration function called from `index.ts`.

## Client (`client/`)

### App structure

- Entry point composes the decorative background with the main page content.
- Main page maps the content data (`data/journey.json`) into a sequence of slide components.
- A library/showcase page exists for visually checking atoms and molecules while developing; it isn't mounted in the app — swap it in locally when needed.

See the `page-creation` skill for the rules on adding or changing a page.

### Components (`client/src/components/`)

- `atoms/` — single, smallest components (button, typography, icon, etc.). Can't reuse other atoms.
- `molecules/` — more complex components, built by composing atoms into a ready-to-use component.
- `features/` — components tied to a specific feature. May include hooks and utils scoped to that feature. A feature gets its own `context/` folder when a hook's state needs to reach several components in that feature's tree without prop drilling.

See the `component-creation` skill for the rules on choosing a layer and writing a component (props typing, sizing, styling, folder structure, a11y).

### Journey feature (`features/journey/`)

Renders the main page's slides from the content data:

- A slide-shell component owns the per-section chrome (header, counter, landmark, anchor, background).
- A slide component composes the shell with its copy and blocks.
- Block rendering is a switch over block type, delegating to one component per block type.
- A background registry maps a background name to its responsive image set.

To add a new block type:

1. Get approval for the new type (see Types), then add it to the content schema's block union.
2. Create the new block component and wire it into the block-type switch.
3. Use it in `data/journey.json`.

### Icons

- Icon SVGs are imported as React components via an SVG-to-component build step.
- To add an icon: drop the `.svg` in the icon source folder and add it to the set of known icon names.
- Icon names coming from data are strings — guard them with a type-narrowing check before rendering.

### Static assets

- `client/static/backgrounds/` — slide backgrounds, three sizes × two formats per image: `<name>-<mobile|tablet|laptop>.<avif|webp>`. `background` in `journey.json` holds `<name>`; a missing `-laptop.avif` file means no background is rendered.
- The responsive breakpoints used for background art must mirror the CSS breakpoints — keep them in sync.
- Don't commit original, uncompressed source images — only the optimized variants.
- `client/src/assets/icons/` — favicon and apple-touch icon referenced from `client/index.html`.

### Decorative canvas background

A fixed, performance-sensitive canvas background (constellations, dust, nebulas, shooting stars). Keep these properties intact when editing:

- Split by responsibility: seeding, per-frame drawing, cached sprites/layers, lifecycle/loop, tunables, and shared types each live in their own module.
- Tunables belong in the constants module, not inline.
- Static layers render once per resize into their own canvas; glow effects are pre-rasterized sprites, not per-frame shadow/gradient effects.
- The loop is frame-capped, capped DPR, starts only after load + idle, stops when the tab is hidden, respects `prefers-reduced-motion`, and permanently falls back to a static frame on slow devices.

### Styling and accessibility

See the `component-creation` skill for the styling conventions (theme tokens, px-based spacing scale, color-token grouping, responsive breakpoints) and accessibility rules (decorative elements, landmarks, link behavior) that apply to every component.

### Imports

- Use path aliases instead of relative or absolute traversal like `../../`. Before importing, check `client/tsconfig.json` and `client/vite.config.ts` for the current set of configured aliases — don't assume or hardcode a list, as it changes over time.
- Exceptions: a component under a `features/*` folder may import other components local to that same feature folder using relative paths; files inside a component folder import each other relatively.

### Hooks (`client/src/hooks/`)

Common, reusable hooks — not tied to a specific feature. A hook tied to one feature belongs under that feature's own `hooks/` folder instead. A hook owned by a single component folder lives in that folder.

See the `hook-creation` skill for the rules on deciding component-local vs. feature-scoped vs. global.

### Utils (`client/src/utils/`)

Common, reusable utility functions not tied to React or a specific component.

See the `utils-creation-client` skill for the rules on what belongs here.

### Libs (`client/src/lib/`)

Client-side access layers, each scoped to one transport concern:

- WebSocket lib — wraps the chat WebSocket connection.
- Request lib — thin `fetch` adapter for JSON endpoints; returns the shared response envelope type, building its own error envelope only for transport-level failures (network error, bad JSON). Doesn't handle streaming.
- SSE lib — generic `text/event-stream` client, not tied to any one endpoint's event shape; decodes/splits frames and hands each one to the caller. Parsing a frame's payload into a typed event is the caller's job, not this lib's.

See the `lib-creation-client` skill for the rules on adding or changing a client lib.

### API (`client/src/api/`)

Endpoint descriptors, one file per feature. Each function represents one endpoint and returns a config object for the matching lib to execute (the request lib for JSON endpoints, the SSE lib for streaming endpoints). The api file doesn't call `fetch` itself.

See the `api-creation-client` skill for the rules on adding or changing an endpoint descriptor.

### Types

Function parameters and component props must use a separate, named interface — not an inline object type.

### Config (`client/src/config.ts`)

Single place holding all env vars (`import.meta.env.VITE_*`). Don't read `import.meta.env` directly elsewhere — import and use vars from `config` instead.

## Docs upkeep

- Never edit this file without the user's explicit approval first. Propose the change and wait for a yes before writing it.
- Keep this file in sync when you change structure, conventions, or add a new layer/feature. Describe modules by their responsibility, not by pointing to the current function/type/component names inside them — those drift; the responsibility doesn't.
- Record known shortcuts, gaps and follow-ups in `TECH_DEBT.md` instead of leaving TODOs in code; remove entries once resolved.
