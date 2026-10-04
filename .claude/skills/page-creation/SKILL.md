---
name: page-creation
description: Use when adding or changing a page in client/src/pages/ (e.g. the main page, the component-library/showcase page). Trigger on "add a new page", "create a page", "where does this page go", "new route-level view".
---

# Pages (`client/src/pages/`)

A page composes features (and molecules/atoms directly, when something is simple enough not to need a feature wrapper) into a full screen. Pages sit at the top of the client's component hierarchy: `atoms → molecules → features → pages`. Nothing imports a page.

Existing examples: `MainPage.tsx` (maps the content data in `data/journey.json` into the sequence of feature slide components), `LibraryPage.tsx` (a dev-only showcase for visually checking atoms and molecules — not mounted in the app; swapped in locally when needed).

## When code belongs here

A new top-level screen/view belongs in `client/src/pages/` when it represents a distinct, composed screen of the app — not a reusable piece (that's a feature/molecule/atom) and not app-wide chrome (the entry point in `App.tsx` composes the decorative background with the page content; that composition itself isn't a page).

## Rules

- **Pages compose; they don't implement.** Business logic, data fetching, and rendering details live in the features/hooks/services a page assembles — the page's own code should mostly be composition and layout, not new logic (CLAUDE.md Rule 2/6).
- **Import direction:** a page may import features, molecules, and atoms. A page must never be imported by anything below it (features/molecules/atoms).
- **No direct `fetch`/vendor SDK calls** in a page — that logic belongs in `services`/`api`/`lib`, consumed through a hook or a feature.
- A dev-only page (like `LibraryPage.tsx`) that isn't mounted in the real app is fine for internal tooling, but don't let app-visible routes depend on it.
- If routing is introduced later (multiple real pages, not just a showcase), keep each page's own file naming/structure consistent with the existing ones rather than inventing a new convention per page.

## Checklist

1. Does this represent a whole composed screen, not a reusable piece?
2. Does it only import features/molecules/atoms — no direct network/vendor calls?
3. Is nothing below it (feature/molecule/atom) importing this page?
4. Run `npm run typecheck` in `client/`.
