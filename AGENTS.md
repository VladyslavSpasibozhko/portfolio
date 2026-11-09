# AGENTS.md

Reference notes for agents working in this repo.

## Repo layout

An npm workspace with three packages:

- `shared/` (`@portfolio/shared`) — code and content used by both the server and the client (see Shared).
- `server/` (`@portfolio/server`) — Fastify server. `index.ts` is the entry: registers plugins (CORS, rate limit, multipart) and routes. `src/` holds `config/`, `lib/`, `services/`, `storage/`, `routes/`, `plugins/`.
- `client/` (`@portfolio/client`) — Vite + React + Tailwind v4 app.

Package dependencies go one way: server and client may import shared; shared imports neither; server and client never import each other. ESLint enforces this in every package, both for the package name and for relative paths that climb into another package.

### Configs

- `tsconfig.base.json` (root) — compiler options common to all packages. Each package's `tsconfig.json` extends it and adds only what differs (output dir, client's DOM libs/JSX/bundler resolution and path aliases).
- Each package has its own self-contained `eslint.config.js` (no shared ESLint base): base rules, its layer rules (boundaries), and the rules that block imports of other workspace packages.
- Tools common to all packages (TypeScript, ESLint and its plugins, `@types/node`) are root dev dependencies. A package lists only what it uses alone.
- One lockfile, at the root. Always run `npm install` from the root; use `-w <package>` to add a dependency to one package.

## Commands

Root (runs in every package):

- `npm run typecheck` / `npm run lint` / `npm test`.
- `npm run build` — builds shared, then server, then client.
- `npm run dev:server` / `npm run dev:client` / `npm start`.

Inside a package (or from the root with `-w @portfolio/<name>`):

- shared: `build` (emits `dist/` for the compiled server), `typecheck`, `lint`.
- server: `dev` (`tsx watch`), `build`, `start`, `test` (`src/**/*.test.ts` with the Node test runner), `typecheck`, `lint`.
- client: `dev`, `build`, `preview`, `typecheck`, `lint` (adds react-hooks and react-refresh rules).

Run `typecheck` and `lint` in the affected package(s) after changes.

## Commits

Commit messages follow Conventional Commits (`type(scope): description`), matching existing history. See the `commit` skill for the type/scope rules.

## Environment

- Server env lives in `server/.env` (see `server/.env.example`): `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `PORT`, `CLIENT_ORIGIN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Read them only through `config` in `server/src/config/index.ts` (enforced by ESLint); each getter throws when its var is missing. Dev and prod use separate Upstash databases: dev values in local `.env`, prod values in the host's env settings (never committed).
- Client env lives in `client/.env` (Vite's default `envDir`) and is exposed only through `client/src/config.ts`.

## Shared (`shared/`)

Code and content used by both the server and the client. Each folder has an `index.ts` barrel that re-exports its files as namespaces (e.g. `httpSchemas`, `commonUtils`). Server and client import a folder as `@portfolio/shared/<folder>`. The package `exports` map lists only the folder indexes (plus `data/*`), so deep imports don't resolve. Inside `shared/`, folders import each other only through their index (enforced by ESLint). A new folder needs a new entry in `shared/package.json` `exports`.

Each `exports` entry has a `types` condition pointing at the TS file (used by typecheck) and a `default` pointing at `dist/`. At runtime the server, its tests and Vite all read `dist/`, so build shared first (`npm run build -w @portfolio/shared`), and rebuild it after changes or keep `npm run dev -w @portfolio/shared` (`tsc --watch`) running alongside.

- `schemas/` — zod schemas and the types inferred from them: chat message, session, and the transport/wire envelope (success/error/stream responses).
- `types/` — plain TS types with no schema: the page content (journey) types.
- `utils/` — pure factories: chat messages per role, and the transport envelopes, so server and client build one shape without duplicating it.
- `errors/` — error codes and user-facing error messages.
- `config/` — feature flags.
- `data/` — content (see below), exported as `@portfolio/shared/data/*`. On the client only pages may use it.

Code here is pure: no framework, no vendor SDK besides the schema library, no I/O, no hidden env/time/random reads. Add something only when both the server and the client need it.

See the `types-creation` and `utils-creation-global` skills for the rules on adding shared types and helpers.

### Data (`shared/data/`)

Two files, each with one consumer:

- `profile.md` — the source of truth: profile prose (background, work history, use cases, interview answer bank) loaded into the AI system prompt so the LLM has clear, readable context. Only the server reads it.
- `journey.json` — the main page's slide content, derived from `profile.md` but reshaped for presentation (structured into slides/blocks, trimmed, reworded for a reader instead of an LLM). Only the client reads it.

Rules:

- Keep the split: rendered content goes in `journey.json`, AI context goes in `profile.md`. There are no Markdown/JSON copies of either — don't reintroduce a mirror file that has to be synced by hand.
- A factual change (a new role, a corrected date) starts in `profile.md`, then must be carried into `journey.json`'s derived content — the two can differ in wording and structure, but never in meaning.
- The client bundles `journey.json` through its import; nothing in `shared/data/` is served as a public file.
- The server finds `profile.md` by resolving it through the shared package (not a relative path), so the same lookup works in dev and in the compiled server.

## Libs (`server/src/lib/`)

A layer of adapters and utility sets, each scoped to one specific area. Responsibility of each lib is one line — the adapter wraps one external SDK/library and exposes its own contract:

- `ai` lib — adapter for the AI provider's SDK, used to generate responses.
- `validation` lib — adapter for the schema-validation library, used to validate input against a schema.
- `http` lib — HTTP error response factories and `ERROR_STATUSES`, shared by routes and the error handler plugin. It wraps no vendor; it's a utility set.

See the `lib-creation-server` skill for the rules on adding or changing a lib (contract boundaries, typing, testing).

## Services (`server/src/services/`)

An additional layer built on top of libs. Services act as a facade, hiding business logic behind a simple interface. Each service is named after the capability it owns, not an implementation detail:

- `ai` service — orchestrates response generation using the `ai` lib; stateless with respect to sessions.
- `session` service — owns chat session lifecycle (create, read, update, remove), delegating persistence to the storage layer.

A service is either a single file (`services/session.ts`) or a folder (`services/ai/`). Import a folder service only through its `index.ts` (enforced by ESLint).

See the `service-creation-server` skill for the rules on adding or changing a service (what it may depend on, naming, typing).

## Storage (`server/src/storage/`)

Persistence, kept behind a plain function interface so the backing store can change without touching callers.

- Can use: libs, `shared/`.
- Can't use: services, routes.
- Used only by the session service — routes and other services never import from `server/src/storage/` directly.
- Current responsibility: session storage — stores each session as a Redis JSON document (`chat:<id>`) with a TTL.

## Routes (`server/src/routes/`)

Tied to the HTTP/WS framework being used (Fastify). A route accepts the incoming param, prepares it for a service, receives the output from the service, and sends it to the client.

- Current responsibilities: create a chat session, delete a chat session, fetch a session's messages, stream a chat reply over SSE.
- Shared error response factories (`badRequest`, `chatNotFound`, `payloadTooLarge`, `tooManyRequests`, `serverError`) and `ERROR_STATUSES` live in the `http` lib (`server/src/lib/http/`). Routes and the error handler plugin import from there instead of defining their own; routes send them with `return reply.status(status).send(...)`.
- Routes don't catch unexpected errors. They let them propagate to the global error handler (`server/src/plugins/errorHandler.ts`), which logs the error and sends the 5xx response. On success, a route just returns the data.

See the `route-creation-server` skill for the rules on adding or changing a route (validation, thin-controller boundary, transport envelopes).

## Plugins (`server/src/plugins/`)

Thin wrappers that register Fastify plugins with project config (CORS, rate limiting, global error handler). Each plugin module exposes one registration function called from `index.ts`. The error handler is registered first, so every route inherits it. It maps the error's status code to an error code and message (`ERRORS_BY_STATUS`). Any status not in the map becomes a 500.

## Client (`client/`)

### App structure

- Entry point composes the decorative background with the main page content.
- Main page maps the content data (`shared/data/journey.json`) into a sequence of slide components.
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

1. Get approval for the new type (see Shared), then add it to the content schema's block union.
2. Create the new block component and wire it into the block-type switch.
3. Use it in `shared/data/journey.json`.

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

Reusable client-side functionality, each lib scoped to one concern (e.g. a transport, translations):

- WebSocket lib — wraps the chat WebSocket connection.
- Request lib — thin `fetch` adapter for JSON endpoints; returns the shared response envelope type, building its own error envelope only for transport-level failures (network error, bad JSON). Doesn't handle streaming.
- SSE lib — generic `text/event-stream` client, not tied to any one endpoint's event shape; decodes/splits frames and hands each one to the caller. Parsing a frame's payload into a typed event is the caller's job, not this lib's.
- i18n lib — UI translations. One JSON file per language in `languages/` (only `en` for now), registered in `languages/index.ts`. `loadTranslations(language)` returns a language's translations (default `en`); `translate(key, { params, language })` returns the text for a key (or the key itself when it's missing), with `{name}` placeholders replaced by `params` via `interpolate(template, params)`; placeholders without a matching param are left as-is. To add a language: add `<lang>.json` and register it in the `LANGUAGES` map.

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
