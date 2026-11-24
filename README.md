# portfolio

Personal portfolio of Vladyslav Spasibozhko, Frontend Engineer — a single page with experience, stack and contacts. It also includes an AI assistant (Claude) that answers questions about the profile.

## Tech stack

- **Client:** React 18, TypeScript, Vite 5, Tailwind CSS v4, `react-markdown`
- **Server:** Node.js, Fastify 5 (`@fastify/cors`, `@fastify/rate-limit`, `@fastify/multipart`), zod, Upstash Redis, Anthropic SDK
- **Shared:** TypeScript types and content in `shared/`

## Project structure

An npm workspace with three packages. Server and client may import `shared`; `shared` imports neither, and server and client never import each other (enforced by ESLint).

```
.
├── package.json        # workspace root: scripts that run in every package
├── shared/             # @portfolio/shared
│   ├── schemas/ types/ utils/ errors/ config/
│   └── data/           # home.json (page content), profile.md (AI context)
├── server/             # @portfolio/server
│   ├── index.ts        # Fastify server entry
│   └── src/            # config, lib, services, storage, routes, plugins
└── client/             # @portfolio/client
    └── src/
        ├── components/       # atoms, features (chat, sections)
        ├── pages/            # HomePage
        ├── hooks/ utils/ lib/ api/
        ├── config.ts         # client env vars
        └── index.css         # Tailwind @theme tokens and animations
```

## Getting started

Requirements: Node.js 22+ and an Anthropic API key (only needed for the chat server).

```bash
# install (all packages, from the root)
npm install

# configure
cp server/.env.example server/.env   # ANTHROPIC_API_KEY, ANTHROPIC_MODEL, PORT, CLIENT_ORIGIN, UPSTASH_*
echo "VITE_API_URL=http://localhost:3001" > client/.env

# run (two terminals)
npm run dev:server
npm run dev:client              # client on http://localhost:5173
```

## Scripts

Run from the root.

| Command              | What it does                                         |
| -------------------- | ---------------------------------------------------- |
| `npm run dev:server` | Server in watch mode                                 |
| `npm run dev:client` | Vite dev server                                      |
| `npm run build`      | Build shared, server (`server/dist`), client (`client/dist`) |
| `npm start`          | Run the compiled server                              |
| `npm test`           | Tests in every package                               |
| `npm run typecheck`  | Type-check every package                             |
| `npm run lint`       | Lint every package                                   |

To run one package's script: `npm run <script> -w @portfolio/<shared|server|client>`.

## Docs

- [AGENTS.md](AGENTS.md) — architecture rules and conventions (read before contributing)
- [TECH_DEBT.md](TECH_DEBT.md) — known gaps and planned follow-ups

## License

See [LICENSE](LICENSE).
