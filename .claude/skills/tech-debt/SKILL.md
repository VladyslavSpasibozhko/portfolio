---
name: tech-debt
description: Add, update, or remove entries in TECH_DEBT.md. Use whenever the user wants to log a known issue, shortcut, gap, follow-up, or open question as tech debt, or asks to review/clean up TECH_DEBT.md. Also use when you (Claude) notice during other work that something is a deliberate shortcut worth recording, or that an existing entry has since been fixed. Trigger on phrases like "add this to tech debt", "log this as a known issue", "is this still tech debt?", "clean up TECH_DEBT.md", not just the literal words "tech debt".
---

# Tech debt records

TECH_DEBT.md exists so an agent reading it later understands *why* something is unfinished and *whether it's safe to leave alone*. It is not a design doc and not a backlog of implementation plans — keep every entry to that purpose.

## Writing an entry

Each entry is two parts, nothing more:

```markdown
## <Short, clear title naming the gap>

<One or two sentences: what's missing or wrong, and why it matters — the
actual consequence (a bug users hit, a cost, a risk, a thing that will
break if ignored), not just a description of the current code.>

**Open questions:** <only if something must be decided or researched before
a fix could even be attempted — e.g. a product decision, a tradeoff only
the user can make, something to verify first.>
```

Rules, and the reasoning behind each:

- **No implementation plan.** Don't write "What to update" / "How" / numbered fix steps. A plan written today describes code that may not exist by the time anyone acts on it, and a stale plan is worse than no plan — it actively misleads whoever picks this up. State the problem and its impact; let whoever fixes it figure out the how, with the codebase as it is *then*.
- **No links to current modules, files, functions, or types.** Describe the gap in terms of behavior and impact ("sessions never expire, so memory grows without bound") rather than pointers into today's code ("`src/storage/sessions.ts`'s `Map` never evicts"). File paths and function names drift; the problem description shouldn't have to.
- **Open questions belong in the entry, not in your head.** If writing the entry surfaces something that needs a decision or research before any fix makes sense, write it down as a question. Don't silently pick an answer and don't start implementing — an entry with an unresolved open question is a signal to whoever reads it (including future-you) that discussion comes before code.
- **No priority/severity scale.** If urgency matters, say so in plain language in the description itself ("this will silently corrupt data under concurrent requests") rather than a label that needs its own calibration.

## Updating or removing an entry

Before adding a new entry, skim the existing ones for overlap — extend a close match instead of creating a near-duplicate.

When you learn that something described in TECH_DEBT.md has already been fixed, or is no longer relevant (the feature was removed, the decision was made elsewhere, the risk no longer applies) — **delete the entry outright.** Don't mark it "resolved," don't strike it through, don't leave a note. A file of mostly-dead entries trains readers to stop trusting it; deleting keeps every remaining entry meaningful. If you're not sure whether something is actually fixed, check the current code/behavior before touching the entry either way — don't take the entry's own wording as still true.

## When you're the one who notices the gap

If you're in the middle of other work and spot a deliberate shortcut (something you chose not to fix because it was out of scope, or a limitation you're knowingly leaving behind), add the entry as part of wrapping up that work — this is also what `CLAUDE.md` asks for. But stop at the entry. Don't start fixing the gap unless the user asked you to; recording it and moving on is the point.
