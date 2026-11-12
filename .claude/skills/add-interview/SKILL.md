---
name: add-interview
description: Add a new agentic mapping interview to the model, the ladder page and the roadmap. Use when the user pastes or attaches a new interview or survey export.
---

# Add an interview

The model rules live in `CLAUDE.md` (levels, scopes, disciplines, topic fields, `src`, writing style). This skill is the order of work. Nothing goes into `src/model.json` until the user has said yes to it in step 4.

## 1. Save the raw text

Write it to `data/interviews/YYYY-MM-DD-interview-N.md` exactly as given, with the same header as `2026-11-11-interview-13.md`. Use the next free interview number. Do not translate or tidy it.

Done when the file exists and its body matches the input.

## 2. Map every answer

Read every answer in every dimension and level. For each one, find the closest existing topics in `TOPICS` (search by meaning, across all levels, scopes and disciplines, not only the cell it was asked in). Sort each answer into one kind:

- **Covered**: an existing topic already says it. Only `src` changes.
- **Enhance**: an existing topic covers it, but the answer adds something it lacks: a sharper `detail`, a better `ask`, a stronger `why`, a resource for `how`, or another discipline in `disc`.
- **New**: no topic covers it.
- **Combine**: the answer shows that two or more existing topics are one idea. Also look for this when a New candidate sits close to an existing topic: often the right move is one broader topic, not a new one.
- **Step or test**: it changes a `PATH` step or test, or `STEPS.team` / `STEPS.org`.
- **Conflict**: it contradicts a topic. The model gives one answer per topic.
- **Unknown**: a tool, skill or term you cannot confirm by searching. It stays out of the model.

Map the interview's level to a ladder level, but place by judgment when another level fits better (getting started is 1, getting good is 2, next level is 3). Map dimensions: Individual is `self`, Team is `team`, Organization is `org`, written as advice to the client.

Done when every answer in the interview has a kind, and every Enhance, New and Combine names the topic ids it touches.

## 3. Draft the wording

For every New, Enhance and Combine candidate, write the full proposed text in the model's voice: `what`, `detail`, `why`, `ask`, `how`, plus `level`, `scope`, `disc`, `core` and the new `src`. For Enhance and Combine, show the current text next to the proposed text, field by field.

Hold each draft to these tests before you show it:

- It says something the interview said. Nothing invented, and `src` cites only interviews that said it.
- `what` is a short label a consultant would recognize. `ask` is a question they can answer about their own week.
- It reads like the topics around it: same length, plain words, no em dashes.

## 4. Grill the user, one candidate at a time

Go through the candidates in this order: Combine, Enhance, New, Step or test, Conflict. Ask about one candidate per question with `AskUserQuestion` and wait for the answer before the next. Each question shows:

- the interview text it comes from, quoted in the original language, with a short English gloss;
- the draft from step 3, in the option preview;
- your recommendation and why: add, enhance topic X, combine X and Y, or skip. Recommend skip when the point is too vague, too narrow for one person's practice, or already said well enough.

Offer options like "Yes, as drafted", "Yes, with this wording", "Fold into X instead" and "Skip". When the user picks a wording, grill the wording itself: push on vague verbs, labels that two people would read differently, and an `ask` nobody could answer no to. Settle the exact text before moving on.

For a Conflict, lay out both answers and the interviews behind each, and let the user settle it.

List all Covered answers in one question at the end, as "add interview N to `src` of these topics", so the user can pull any out.

Done when every candidate has a yes, a no or a changed wording from the user.

## 5. Apply what was agreed

- New topic: a new lowercase slug `id`. Check it was never used: `git log -S '"id": "<slug>"' -- src/model.json` must return nothing.
- Combine: keep the id of the topic most people would have rated, merge the `src` lists and `how` resources into it, and delete the others. Ratings on deleted ids are lost, so say which ids were removed. A deleted id is never used again.
- Enhance and Covered: edit in place. Never change an id.
- Resources: open every new `how` link and check it resolves.

Then run `pnpm format` and `pnpm check`. Fix any model check or accessibility failure. Done when `pnpm check` passes.

## 6. Update the roadmap doc

The roadmap doc in Claude Docs (link in `CLAUDE.md`) mirrors `src/model.json`. Apply the same changes to it:

- the topic tables for each level and scope, with core topics in bold and first;
- the paths, if a step or test changed;
- the count of topics without a resource;
- "Placed by judgment", for every topic you placed on another level or built from your own framing;
- "Where interviewees disagreed", for every conflict the user settled;
- the interview counts in the lead and in "What the data covers".

Then export the tab as Markdown and write it to `docs/roadmap.md` under its one-line snapshot header.

## 7. Report back

A few lines: which topics are new, enhanced, combined (and which ids were removed), which moved level, which steps or tests changed, and what you could not place, confirm or settle.
