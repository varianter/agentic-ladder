---
name: add-interview
description: Add a new agentic mapping interview to the model, the ladder page and the roadmap. Use when the user pastes or attaches a new interview or survey export.
---

# Add an interview

1. **Save the raw text.** Write it to `data/interviews/YYYY-MM-DD-interview-N.md` exactly as given, with a one-line header. Use the next free interview number. Do not translate or tidy it.

2. **Read it against the model.** For each answer, decide whether it:
   - matches an existing row: add the interview number to that row's sources;
   - is new: write a new row `[topic, what goes wrong without it, ask yourself, sources]` in plain English and append it at the end of the right `ROWS[disc][level]`;
   - changes a path step, a test or a gap: update `PATH` or `GAPS`;
   - contradicts another interview: add it to the disagreements table in `src/index.html`.
   Map dimensions to disciplines: Individual goes to the interviewee's discipline (`dev`, `des`, `biz`), or to `all` when it applies to every discipline. Team and Organization go to `org`, prefixed "Team:" or "Org:".
   Map levels: getting started is 1, getting good is 2, next level is 3.

3. **Look up unknown names.** Search for tools, skills or terms you do not recognize. If you cannot confirm one, leave it out of the model and list it for the user.

4. **Update the counts.** Change interview totals, dates and coverage numbers in `src/index.html` (eyebrow and "What this model rests on") and in `GAPS` notes that cite counts.

5. **Build and check.** Run `pnpm check`. Fix any model check or accessibility failure.

6. **Update the roadmap doc** in Claude Docs (link in CLAUDE.md) with the same changes, then refresh `docs/roadmap.md` from an export.

7. **Report back** in a few lines: what the interview added, which rows changed, and anything you could not place or confirm.

Keep row order stable. Ratings are stored per row index, so never insert a row in the middle of a level.
