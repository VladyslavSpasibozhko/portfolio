---
name: commit
description: Use when writing a git commit message in this repo. Trigger whenever you are about to run `git commit`, or when the user asks to commit staged/working changes. Formats the message using Conventional Commits (type(scope): description) matching this repo's existing history.
---

# Commit messages

This repo's git history already follows [Conventional Commits](https://www.conventionalcommits.org/). Match it — don't invent a different style.

## Format

```
<type>(<scope>): <description>

[optional body]
```

- `type` — required, lowercase, one of the list below.
- `scope` — optional, lowercase, the area touched (see Scopes). Omit it only when a change doesn't map to one area (e.g. a repo-wide docs pass).
- `description` — imperative, present tense ("add", not "added"/"adds"), no capital letter, no trailing period.
- Body — only when the "why" isn't obvious from the diff or description alone. Don't restate what the diff already shows.

## Types

- `feat` — a new capability for the end user or API consumer.
- `fix` — a bug fix.
- `refactor` — code change that doesn't change behavior (restructuring, renaming, moving).
- `style` — visual/CSS/formatting change with no logic change.
- `docs` — documentation only (`AGENTS.md`, `TECH_DEBT.md`, `README`, comments, `CLAUDE.md`).
- `test` — adding or changing tests only.
- `chore` — tooling, dependencies, config, build scripts — nothing that ships to users.

If a change doesn't fit one type, split it into separate commits rather than picking the closest type — don't bundle a `feat` and a `refactor` into one commit just to avoid a second one.

## Scopes

Scope is the directory/area the change lives in, matching how this repo's history already scopes commits:

- `client` — anything under `client/`.
- `server` — server-only code under `src/` (routes, services, lib, storage, plugins).
- `data` — `data/journey.json`, `data/profile.md`.
- `types` — `types/`.

For a change confined to one layer inside client or server, a more specific scope is fine if the history already uses one (e.g. `client` is preferred over inventing `client-hooks`) — check `git log --oneline` for precedent before introducing a new scope.

## Checklist before writing the message

1. Does the diff touch exactly one type of change? If not, consider splitting into multiple commits.
2. Does the description read naturally after "This commit will …"?
3. Is the scope the one this repo's history already uses for that area (check `git log --oneline -20` if unsure)?
4. Only add a body if the reviewer would otherwise ask "why" — not to describe what changed.
