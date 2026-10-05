---
name: hook-creation
description: Use when creating a new React hook, or deciding whether a hook should be global (client/src/hooks), feature-scoped (features/<feature>/hooks), or component-local. Trigger on "create a hook", "new useX hook", "where does this hook belong", "global or feature hook", "should this hook be shared".
---

# Creating a hook

A hook's home is decided by **how many places actually need it right now** — not by how reusable it might theoretically be. Don't pre-promote a hook to a wider scope "just in case"; that's the opposite of CLAUDE.md's "extract on the second use" rule (Rule 7) and leads to premature abstraction.

## Decision order

Walk these in order and stop at the first match:

1. **Used by exactly one component, nowhere else.** → The hook lives inside that component's own folder (next to the component file). It is not reusable yet, so don't move it out.
2. **Used by more than one component, but all of them belong to the same feature.** → `client/src/components/features/<feature>/hooks/`. This is a feature-scoped hook: it may read feature-local context, call feature-scoped `utils/`, or call `services/` — but it stays private to that feature. Don't import a feature hook from outside that feature's folder; if another feature needs the same logic, that's the trigger to generalize it (next step), not to import across feature boundaries.
3. **Used (or clearly about to be used) by components in more than one feature, or isn't tied to any specific feature's data/business logic.** → `client/src/hooks/`. This is the global/common hook location — generic concerns like `useDebounce`, `useMediaQuery`, `useLocalStorage`.

If you're unsure between (2) and (3), default to (2) — scope it to the feature until a second feature actually needs it. Promoting early just means more code to keep decoupled for no current benefit.

## What a hook may depend on, regardless of scope

- A hook holds state/effect logic only — no rendering. Input comes from its own arguments/params; output is its return value (CLAUDE.md Rule 2).
- A hook may call `services/` to fetch/transform data, but a hook itself is not a service — don't inline `fetch` or a vendor SDK call directly in a hook; that belongs in `lib/`/`services/`/`api/` (see the `libs-utils-api` skill).
- No hidden reads of `window`, `Date.now()`, env, or randomness inside a hook's logic — pass them in or source them through `config`/injected params (CLAUDE.md Rule 8).
- Every hook gets its own test, with the service it calls mocked — never hit the real network or a real vendor in a hook test (CLAUDE.md Rule 13).

## Checklist

1. Does this hook already have a second consumer, or is it genuinely feature-independent? If not, keep it local to the one component.
2. If it moved from component-local to feature-scoped (or feature-scoped to global), did you actually relocate the file rather than leaving a stale copy behind?
3. Does the hook avoid hidden globals/time/env reads?
4. Is there a test with the service dependency mocked?
5. Run `npm run typecheck` in `client/` after the change.
