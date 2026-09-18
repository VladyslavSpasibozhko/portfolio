# portfolio

Personal portfolio of Vladyslav Spasibozhko, Frontend Engineer — a single-page "journey" through the problems solved, systems built, and lessons learned, told as a sequence of data-driven slides over an animated star field. It also includes an AI assistant (Claude) that answers questions about the profile over WebSocket.

## Tech stack

- **Client:** React 18, TypeScript, Vite 5, Tailwind CSS v4, `vite-plugin-svgr`, `react-markdown`
- **Server:** Node.js, Fastify 5 (`@fastify/websocket`, `@fastify/cors`, `@fastify/rate-limit`), AJV, Anthropic SDK
- **Shared:** TypeScript types in `types/`, content in `data/`

## Project structure

```
.
├── index.ts            # Fastify server entry
├── src/
│   ├── lib/            # adapters: ai (Anthropic), validation (AJV)
│   ├── services/       # business logic facades (ai chat)
│   ├── routes/         # Fastify routes (/ws/chat)
│   └── plugins/        # CORS, rate limit
├── types/              # shared types: message, journey
├── data/               # journey.json (page content), profile.md (AI context)
└── client/
    ├── static/backgrounds/   # optimized slide backgrounds (avif/webp × 3 sizes)
    └── src/
        ├── components/       # atoms, molecules, features (journey, chat)
        ├── pages/            # MainPage, LibraryPage
        ├── hooks/ utils/ lib/
        ├── config.ts         # client env vars
        └── index.css         # Tailwind @theme tokens and animations
```

## Getting started

Requirements: Node.js 22+ and an Anthropic API key (only needed for the chat server).

```bash
# install
npm install
npm install --prefix client

# configure
cp .env.example .env            # ANTHROPIC_API_KEY, ANTHROPIC_MODEL, PORT, CLIENT_ORIGIN
echo "VITE_WS_URL=ws://localhost:3001/ws/chat" > client/src/.env

# run (two terminals)
npm run dev                     # server
npm run dev --prefix client     # client on http://localhost:5173
```

## Scripts

| Where    | Command             | What it does                        |
| -------- | ------------------- | ----------------------------------- |
| root     | `npm run dev`       | Server in watch mode                |
| root     | `npm run build`     | Compile server to `dist/`           |
| root     | `npm start`         | Run compiled server                 |
| root     | `npm test`          | Server unit tests (Node test runner)|
| root     | `npm run typecheck` | Type-check server                   |
| `client` | `npm run dev`       | Vite dev server                     |
| `client` | `npm run build`     | Type-check and build to `client/dist` |
| `client` | `npm run preview`   | Preview the production build        |
| `client` | `npm run typecheck` | Type-check client                   |

## Editing content

There are two content files, one per consumer:

- [data/journey.json](data/journey.json) renders the main page. Each section is a slide made of typed blocks (`text`, `cards`, `timeline`, `steps`, `branch`, …) described in [types/journey.ts](types/journey.ts).
- [data/profile.md](data/profile.md) is prose read only by the AI assistant — it's loaded into the system prompt in [src/services/ai.ts](src/services/ai.ts).

Neither file is a copy of the other, so there's nothing to keep in sync mechanically — but a factual change usually belongs in both.

## Docs

- [AGENTS.md](AGENTS.md) — architecture rules and conventions (read before contributing)
- [TECH_DEBT.md](TECH_DEBT.md) — known gaps and planned follow-ups

## License

See [LICENSE](LICENSE).
