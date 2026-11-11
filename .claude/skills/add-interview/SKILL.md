---
name: add-interview
description: Add a new agentic mapping interview to the model, the ladder page and the roadmap. Use when the user pastes or attaches a new interview or survey export.
---

# Add an interview

1. **Save the raw text.** Write it to `data/interviews/YYYY-MM-DD-interview-N.md` exactly as given, with a one-line header. Use the next free interview number. Do not translate or tidy it.

2. **Read it against the model.** For each answer, decide whether it:
   - matches an existing topic: add the interview number to that topic's `src`;
   - is new: add a topic to `TOPICS` with a new lowercase slug `id`, `level`, `scope`, `disc`, `core`, `what`, `why`, `ask`, `how` and `src`, in plain English;
   - names a learning resource: add it to that topic's `how` (verify the link resolves);
   - changes a step or a test: update `PATH` or `STEPS`;
   - contradicts the model: do not change the topic. List the conflict for the user and ask how to settle it. The page has no disagreements table; each topic gives one answer.
   Map dimensions to scopes: Individual is `self`, Team is `team`, Organization is `org` (written as advice to the client). Map disciplines: `dev`, `des`, `sales` (sales and management), `adv` (advisory), or `"all"` when it applies to everyone.
   Map levels: getting started is 1, getting good is 2, next level is 3. A topic may go on another level when that fits better. Say so in the report, so the expert review can check it.

3. **Look up unknown names.** Search for tools, skills or terms you do not recognize. If you cannot confirm one, leave it out of the model and list it for the user.

4. **Check.** Run `pnpm format` then `pnpm check`. Fix any model check or accessibility failure.

5. **Update the roadmap doc** in Claude Docs (link in CLAUDE.md) with the same changes, then refresh `docs/roadmap.md` from an export.

6. **Report back** in a few lines: what the interview added, which topics changed, which moved level, and anything you could not place, confirm or settle.

Never change or reuse a topic `id`. Ratings are saved under it in viewers' browsers. The page never shows interview numbers or counts.
