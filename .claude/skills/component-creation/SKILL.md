---
name: component-creation
description: Use when creating a new React component, or deciding whether something is an atom, molecule, or feature component. Covers where the file goes, what it may import, when to split into a folder, and the project's styling/sizing/accessibility conventions. Trigger on "create a component", "add a button/card/etc", "where does this component belong", "atom or molecule", "new feature component".
---

# Creating a component

The client has three component layers (`client/src/components/`): `atoms/`, `molecules/`, `features/`. There is no generic `organisms/` folder in this repo — a feature's top-level components fill that role, scoped under `features/<feature>/`. Pages (if/when added) compose features.

Import direction is one-way and must never be skipped or reversed: `atoms → molecules → features → pages`. An atom never imports a molecule; a molecule never imports a feature. Don't put business logic in an atom/molecule to dodge this — fix the direction instead.

## 1. Decide the layer

Ask in this order:

1. **Is it the smallest indivisible UI piece** (button, typography, icon, input)? → `atoms/`.
   - Atoms can't reuse other atoms.
   - Atoms are purely presentational: data and callbacks arrive via props only. No hooks that fetch data, no services.
2. **Is it a small, reusable composition of atoms with one clear purpose** (a labeled input, a search field)? → `molecules/`.
   - May import atoms only. May not import features or call services directly.
   - Still presentational: props in, render out.
3. **Is it tied to one specific feature/section of the app**? → `features/<feature>/components/`.
   - May use atoms, molecules, and hooks (including feature-scoped hooks — see the `hook-creation` skill).
   - May include its own `utils/` and `hooks/` scoped to that feature.
   - Needs a `context/` subfolder only when a hook's state must reach several components in that feature's tree without prop drilling — don't add context preemptively.

If a component doesn't fit any of these (truly generic, feature-independent, but too complex for an atom) it's a molecule — don't invent a new top-level layer.

## 2. Rules that apply at every layer

- Give the component a separate named `Props` interface if it takes props — never an inline object type (CLAUDE.md Rule 11: small, consumer-specific interfaces; AGENTS.md Types rule).
- Always use existing atoms instead of raw HTML elements: a `Button` atom instead of `<button>`, a `Typography` atom instead of `<span>/<p>/<h1>` etc.
- Keep components small and single-purpose (CLAUDE.md Rule 1/2). If you're reaching for a comment to explain a branch, decompose instead.
- `size` props use the fixed scale `sm`, `md`, `xl`, `2xl`, `3xl` — never numeric or ad hoc names. Apply consistently.
- A component that outgrows one file becomes a folder with an `index.ts` barrel exporting its public API. Files inside the folder import each other relatively; outside consumers import only through the barrel.
- Imports use path aliases, not `../../` traversal — check `client/tsconfig.json` / `client/vite.config.ts` for the current alias set. Exception: components inside the same `features/*` folder, and files inside one component's own folder, may import each other relatively.

## 3. Styling

- Theme tokens (colors, fonts, sizes, breakpoints, etc.) are defined via `@theme` in `client/src/index.css`, not `tailwind.config.ts`. Use those tokens — don't make up ad hoc styles/values. Before reaching for a custom class or one-off style, check whether it's worth adding to `@theme` instead.
- **Every number in a class name is a px value.** Sizes are in `px`, never `rem` — that goes for the `@theme` tokens and for any raw CSS written elsewhere (keyframes included). `p-16` is 16px of padding, `gap-24` is a 24px gap, `text-44` is a 44px font.
  - This works because `@theme` sets `--spacing: 1px`, replacing Tailwind's default `0.25rem` step. Tailwind's own docs are off by 4× for this repo: their `p-4` (16px) is our `p-16`. Don't copy spacing numbers out of Tailwind examples or other projects — read them as px.
  - `--spacing` covers padding, margin, gap, `space-x/y`, `width`/`height`, `min-*`/`max-*`, `inset`/`top`/`right`/`bottom`/`left`, `translate`, `size` and `basis`. There are deliberately no `--space-*`, `--width-*` or `--height-*` tokens — a named token per step would just duplicate the same scale, and any value missing from it would silently fall back to a different unit.
  - Font sizes are the one namespace that still needs tokens, since `--spacing` doesn't feed `text-*`. Use the generated `text-<n>` utilities. Tailwind's default names (`text-sm`, `text-xl`, …) and arbitrary values (`text-[15px]`) are prohibited; if a size is genuinely missing, add a font-size token for it.
- Keep spacing numbers **even, in steps of 2 — prefer steps of 4** (`gap-4`, `p-8`, `mt-12`, `space-y-16`). Odd or fractional values (`p-3`, `gap-7.5`) are prohibited — the scale is unbounded, so a typo no longer fails loudly, it just renders slightly wrong. Fraction utilities (`w-1/2`, `h-1/4`) are unaffected — they're percentages, not lengths.
- Animations are defined in `index.css` as keyframes plus a matching utility class. Every new animation must be covered by a `prefers-reduced-motion: reduce` block there.
- Color tokens are grouped by the CSS property they're meant for — use each group only for that property:
  - Text tokens — text color only.
  - Background tokens — backgrounds only.
  - Border tokens — borders only.
  - Accent tokens — the exception: not tied to one property, reusable anywhere (text, background, border, shadow, etc.).
  - Shadows use size tokens for spread, colored via an accent token.
- Layouts must be responsive across `sm` → `3xl` (`3xl` = 1920px, for wide desktops); follow the existing per-breakpoint spacing/type scales used by the journey slides.

## 4. Accessibility

- Decorative elements (canvas background, slide backgrounds) are hidden from assistive tech (`aria-hidden`, `alt=""`).
- Each landmark section gets a unique `aria-label` and a focus target so hash navigation can move focus to it.
- External `http` links open in a new tab with `rel="noreferrer"`; `mailto:` links don't.

## 5. Checklist before finishing

1. Correct layer chosen, and it only imports layers below it?
2. Props typed via a named interface (if any props exist)?
3. Atoms used instead of raw HTML?
4. Styling uses `@theme` tokens, px values, and step-of-4 spacing — no ad hoc values?
5. New animations have a `prefers-reduced-motion: reduce` override?
6. File-per-component until it outgrows one file, then folder + barrel?
7. Accessibility attributes present where applicable (aria-hidden, aria-label, focus target, rel="noreferrer")?
8. Run `npm run typecheck` in `client/` after the change.
