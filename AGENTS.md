# AGENTS.md

Reference notes for agents working in this repo.

## Repo layout

- `index.ts` — Fastify server entry: registers plugins (CORS, rate limit, websocket, multipart) and routes.
- `src/` — server code: `lib/`, `services/`, `routes/`, `plugins/`.
- `types/` — shared types, used by both the server and the client (`@types` alias on the client).
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

## Environment

- Server env lives in `.env` at the root (see `.env.example`): `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `PORT`, `CLIENT_ORIGIN`. Missing vars throw at startup.
- Client env lives in `client/src/.env` (`envDir: './src'` in `vite.config.ts`) and is exposed only through `client/src/config.ts`.

## Types (`types/`)

- `message.ts` — WebSocket contract for communication between the user and the LLM (single WS path). Defines `WsMessage`, `WsRequestPayload`, `WsSuccessResponse`, `WsErrorResponse`, `WsResponsePayload`.
- `journey.ts` — describes the structure of `data/journey.json` (`JourneyData` = `JourneySection[]`). Each section is made of `blocks`, a discriminated union on `type` (`text`, `list`, `badges`, `cards`, `timeline`, `flow`, `icons`, `callout`, `steps`, `branch`).
- `index.ts` — re-exports the above.

Follow DRY: don't create new types/interfaces on your own. Ask for approval first — once approved, feel free to create the new type.

Icon fields in the data types are plain `string`s on purpose — available icons are a client concern; the client narrows them with `isIconName` before rendering.

## Data (`data/`)

Two files, each with one consumer:

- `journey.json` — source of truth for the main page: every slide, its copy, background and blocks. The page is fully data-driven from this file, and only the client reads it.
- `profile.md` — the profile prose (background, work history, use cases, interview answer bank) loaded into the AI system prompt (`src/services/ai.ts`) so the LLM has clear, readable context. Only the server reads it.

Rules:

- Keep the split: rendered content goes in `journey.json`, AI context goes in `profile.md`. There are no Markdown/JSON copies of either — don't reintroduce a mirror file that has to be synced by hand.
- The two files overlap in subject matter but not in form, so a factual change (a new role, a corrected date) usually belongs in both — check the other file when you edit one.
- `data/` is also Vite's `publicDir`, so everything in it is shipped publicly with the client build — `profile.md` included. Never put secrets or private info there.

## Libs (`src/lib/`)

A layer of adapters and utility sets, each scoped to one specific area (e.g. dates, localization, AI, validation). Currently:

- `ai/` — adapter around the Anthropic SDK.
- `validation/` — adapter around AJV (JSON Schema).

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

- Tests live next to the lib in `__tests__/` (see `validation/__tests__`).

## Services (`src/services/`)

An additional layer built on top of libs. Services act as a facade, hiding business logic behind a simple interface.

- A service can't use another service — prohibited.
- A service can use libs, global types, and schemas — allowed.
- Every service must have strictly typed input/output params — a contract to work with it.

## Routes (`src/routes/`)

Tied to the HTTP/WS framework being used (Fastify). A route accepts the incoming param, prepares it for a service, receives the output from the service, and sends it to the client.

- Can use: services, libs.
- Every route must have a schema for request/response with validation.
- Current routes: `chat.ts` — `GET /ws/chat` (websocket), rate limited per route via `config.rateLimit`.

## Plugins (`src/plugins/`)

Thin wrappers that register Fastify plugins with project config (`cors.ts`, `rateLimit.ts`). Each exports a `register*` function called from `index.ts`.

## Client (`client/`)

### App structure

- `main.tsx` → `App.tsx` renders the `StarField` background and `MainPage`.
- `pages/MainPage.tsx` — maps `data/journey.json` sections to `JourneySlide`s.
- `pages/LibraryPage.tsx` — a showcase of atoms/molecules for visual checks while developing. It isn't mounted in `App.tsx`; swap it in locally when needed.

### Components (`client/src/components/`)

- `atoms/` — single, smallest components (button, typography, icon, etc.). Can't reuse other atoms.
- `molecules/` — more complex components, built by composing atoms into a ready-to-use component (e.g. `Timeline`, `Markdown`, `IconButton`).
- `features/` — components tied to a specific feature. May include hooks and utils scoped to that feature (e.g. `features/chat/hooks`, `features/chat/utils`). Current features:
  - `journey/` — the slides of the main page (see below).
  - `chat/` — the AI chat window over WebSocket (`ChatWrapper` is the entry point; currently not mounted).

Rules:

- A component should have a separate type/interface for its props, if props exist.
- Keep components clean and simple — decompose to keep each one clear and maintainable.
- Always use the existing atoms instead of raw HTML elements — e.g. `Button` instead of `button`, `Typography` instead of `span`/`p`/`h1`/`h2`/etc.
- Naming convention for any component's `size` prop: `sm`, `md`, `xl`, `2xl`, `3xl` (no numeric or ad hoc size names). Apply this consistently across every component that supports sizing.
- A component that outgrows one file becomes a folder with an `index.ts` barrel exporting its public API (e.g. `atoms/Icon/`, `atoms/Badge/`, `atoms/StarField/`). Import it through the barrel (`@components/atoms/StarField`); files inside the folder import each other relatively.

### Journey feature (`features/journey/`)

Slides are rendered from `data/journey.json`:

- `JourneySlide` — renders one `JourneySection` (eyebrow, headline, tagline, subtitle, blocks, links, transition quote).
- `JourneySection` — the slide shell: header with `NN/NN` counter, landmark `aria-label`, anchor `id`, responsive background image.
- `blocks/JourneyBlock.tsx` — switch over `block.type`, delegating to one component per block type (`TextBlock`, `CardsBlock`, …).
- `diagram/` — building pieces for the `steps` and `branch` diagrams.
- `backgrounds.ts` — background image registry built with `import.meta.glob` over `client/static/backgrounds/`.

To add a new block type:

1. Get approval for the new type (see Types), then add it to the `JourneyBlock` union in `types/journey.ts`.
2. Create `blocks/<Name>Block.tsx` and add a `case` to `JourneyBlock.tsx`.
3. Use it in `data/journey.json`.

### Icons (`atoms/Icon/`)

- SVGs live in `atoms/Icon/icons/` and are imported as React components via `vite-plugin-svgr`.
- To add an icon: drop the `.svg` in that folder and add its filename (without `.svg`) to the `IconName` union in `Icon.tsx`.
- Icon names coming from data are strings — guard them with `isIconName` before passing to `Icon`.

### Static assets

- `client/static/backgrounds/` — slide backgrounds, three sizes × two formats per image: `<name>-<mobile|tablet|laptop>.<avif|webp>`. `background` in `journey.json` holds `<name>`; a missing `-laptop.avif` file means no background is rendered.
- The `mobile`/`tablet`/`laptop` breakpoints in `JourneySection.tsx` mirror `md`/`xl` in `index.css` — keep them in sync.
- Don't commit original, uncompressed source images — only the optimized variants.
- `client/src/assets/icons/` — favicon and apple-touch icon referenced from `client/index.html`.

### StarField (`atoms/StarField/`)

A fixed, decorative canvas background (constellations, dust, nebulas, shooting stars). It's performance-sensitive — keep these properties intact when editing:

- Split by responsibility: `scene.ts` (seeding), `render.ts` (per-frame drawing), `offscreen.ts` (cached sprites/layers), `useStarField.ts` (lifecycle/loop), `constants.ts` (all tunables), `types.ts`, `random.ts`.
- Tunables go in `constants.ts`, not inline.
- Static layers (nebulas) render once per resize into their own canvas; glow halos are pre-rasterized sprites stamped with `drawImage` — no per-frame `shadowBlur` or full-screen gradients.
- The loop is frame-capped, capped DPR, starts only after load + idle, stops when the tab is hidden, respects `prefers-reduced-motion`, and permanently falls back to a static frame on slow devices.

### Styling

- Theme tokens (colors, fonts, sizes, breakpoints, etc.) are defined via `@theme` in `client/src/index.css`, not `tailwind.config.ts`. Components must use those tokens — don't make up ad hoc styles/values.
- Before creating a custom class or one-off style, check whether it's worth adding to `@theme` in `index.css` instead.
- **Every number in a class name is a px value.** Sizes are in `px`, never `rem` — that goes for the `@theme` tokens and for any raw CSS written elsewhere (keyframes included). `p-16` is 16px of padding, `gap-24` is a 24px gap, `text-44` is a 44px font.
  - This works because `@theme` sets `--spacing: 1px`, replacing Tailwind's default `0.25rem` step. So Tailwind's own docs are off by 4× for this repo: their `p-4` (16px) is our `p-16`. Don't copy spacing numbers out of Tailwind examples or from other projects — read them as px.
  - `--spacing` covers padding, margin, gap, `space-x/y`, `width`/`height`, `min-*`/`max-*`, `inset`/`top`/`right`/`bottom`/`left`, `translate`, `size` and `basis`. There are deliberately no `--space-*`, `--width-*` or `--height-*` tokens: a named token per step would just be a second, partial copy of the same scale, and any value missing from it would silently fall back to a different unit.
  - Font sizes are the one namespace that still needs tokens (`--text-8` … `--text-100`), since `--spacing` doesn't feed `text-*`. Use the `text-<n>` utilities they generate (`text-12`, `xl:text-20`). Tailwind's default names (`text-sm`, `text-xl`, …) and arbitrary values (`text-[15px]`) are prohibited; if a size is genuinely missing, add a `--text-*` token for it.
- Keep spacing numbers **even, in steps of 2 — prefer steps of 4** (`gap-4`, `p-8`, `mt-12`, `space-y-16`). Odd or fractional values (`p-3`, `gap-7.5`) are prohibited: the scale is unbounded now, so a typo no longer fails loudly, it just renders slightly wrong. Fraction utilities (`w-1/2`, `h-1/4`) are unaffected by all of this — they're percentages, not lengths.
- Animations are defined in `index.css` as `@keyframes` plus a matching `@utility animate-*` class (e.g. `animate-badge-sheen`, `animate-timeline-*`, `animate-line-sweep`). Every new animation must be covered by the `prefers-reduced-motion: reduce` block there.
- Color tokens are grouped by the CSS property they're meant for — use each group only for that property:
  - `--color-text-*` — text color only (e.g. `text-text-200`).
  - `--color-background-*` — backgrounds only (e.g. `bg-background-900`).
  - `--color-border-*` — borders only (e.g. `border-border-subtle`).
  - `--color-accent-*` — the exception: not tied to one property, reusable anywhere (text, background, border, shadow, etc.).
  - Shadows use the `--shadow-*` size tokens (`shadow-sm`/`md`/`lg`) for spread, colored via an accent token, e.g. `shadow-accent-cyan`.
- Layouts must be responsive across `sm` → `3xl` (`3xl` = 1920px, for wide desktops); follow the existing per-breakpoint spacing/type scales used by the journey slides.

### Accessibility

- Decorative elements (StarField, slide backgrounds) are hidden from assistive tech (`aria-hidden`, `alt=""`).
- Each slide is a `section` landmark with a unique `aria-label` and `tabIndex={-1}` so hash navigation can move focus to it.
- External `http` links open in a new tab with `rel="noreferrer"`; `mailto:` links don't.

### Imports

- Use path aliases instead of relative or absolute traversal like `../../`. Before importing, check `client/tsconfig.json` and `client/vite.config.ts` for the current set of configured aliases — don't assume or hardcode a list, as it changes over time.
- Exceptions: a component under a `features/*` folder may import other components local to that same feature folder using relative paths; files inside a component folder (e.g. `atoms/StarField/`) import each other relatively.

### Hooks (`client/src/hooks/`)

Common, reusable hooks — not tied to a specific feature. Place a hook here if it might be reused later in other components (e.g. `useIntersectionObserver`). A hook tied to one feature belongs under that feature's own `hooks/` folder instead (e.g. `features/chat/hooks`). A hook owned by a single component folder lives in that folder (e.g. `atoms/StarField/useStarField.ts`).

### Utils (`client/src/utils/`)

Common, reusable utility functions (e.g. `hexToRgb`, `padNumber`, `interval`, `timeout`) not tied to React or a specific component.

### Libs (`client/src/lib/`)

Client-side access layers: `ws.ts` (`ChatWebSocket` wrapper).

### Types

Function parameters and component props must use a separate, named interface — not an inline object type.

### Config (`client/src/config.ts`)

Single place holding all env vars (`import.meta.env.VITE_*`). Don't read `import.meta.env` directly elsewhere — import and use vars from `config` instead.

## Docs upkeep

- Keep this file in sync when you change structure, conventions, or add a new layer/feature.
- Record known shortcuts, gaps and follow-ups in `TECH_DEBT.md` instead of leaving TODOs in code; remove entries once resolved.
