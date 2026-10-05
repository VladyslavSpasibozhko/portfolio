---
description: Plan, get approval, then implement a feature/fix/refactor in an isolated worktree — tests, lint/typecheck, optional browser verification, and code review before committing.
---

Run the implementation workflow below for: $ARGUMENTS

Before anything else, read `CLAUDE.md` and `AGENTS.md` at the repo root — they define the engineering rules and layer conventions this workflow must follow.

## Steps

1. **Plan**
   Analyze the task. Produce:
   - an implementation plan,
   - a test plan (what gets covered by automated tests),
   - a decision on whether this change needs browser verification, and if so, a manual browser test plan to follow later.

2. **Review the plan — STOP here**
   Present the plan to the user. Do not proceed past this point until the user explicitly approves it. If they request changes, revise and re-present. Treat silence or an unrelated reply as "not approved yet."

3. **Worktree + branch**
   Once approved: fetch/pull the default branch locally first, then create a git worktree with a new branch named `<type>/<short-description>`, where `<type>` is `feat`, `fix`, or `refactor` (match the task type — see the `commit` skill for the type taxonomy). Branch off the local default branch, not the remote-tracking ref (e.g. not `origin/main`) — branching directly off a remote ref makes Git auto-track it as upstream.

4. **Implement**
   Implement the approved plan inside the worktree, following `AGENTS.md` layer/convention rules and the engineering rules in `CLAUDE.md`.

5. **Tests**
   Write the tests called for in the approved test plan. Run the test suite.

6. **Lint + typecheck**
   Run lint and `npm run typecheck` (root for the server, `client/` for the client — per `CLAUDE.md`). Fix failures and re-run. Stop and report if two consecutive fix rounds make no progress.

7. **Browser verification (conditional)**
   If step 1 decided this needs browser verification: start the app, follow the browser test plan, and report what was observed (pass/fail per step, screenshots/notes as relevant). Skip entirely otherwise.

8. **Review**
   If the diff only touches docs (`*.md`), types, or tests, skip code review entirely — go straight to step 9.
   Otherwise, invoke the `code-review` skill against the diff. If it reports issues, fix them, then check what the fix touched:
   - Only docs/types/tests changed → re-run tests, lint, and typecheck (not another code review).
   - Any other code changed → re-run tests, lint, typecheck, and code review.
     Repeat until the review is clean, up to 2 code-review rounds. If still not clean after 2 rounds, stop and report the remaining findings instead of looping further.

9. **Commit**
   Commit the work using Conventional Commits (see the `commit` skill for type/scope/format rules). Then return a summary: branch name, worktree path, what changed, test results, lint/typecheck status, and (if applicable) browser verification results.

## Explicit non-goals

- Do not push the branch.
- Do not create a PR.
- Do not remove the worktree — leave it for the user to inspect.
