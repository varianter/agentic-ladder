# Agentic Ladder

Variant's roadmap for getting good at agentic AI, per product development discipline. It is built from agentic mapping interviews with Variant consultants and published as an interactive page, the Variant Agentic Ladder.

## Layout

| Path | What it is |
| --- | --- |
| `data/interviews/` | Raw interview exports, one file per export or new interview. Never edit these, only add. |
| `data/model.json` | The model: levels, disciplines, paths, topic rows and gaps. The single source for the page. |
| `src/` | Page source: `head.html` (title, fonts), `styles.css`, `body.html`, `app.js`. |
| `scripts/build.mjs` | Checks the model and builds `dist/agentic-ladder.html`, one self-contained file. |
| `scripts/a11y.mjs` | axe-core WCAG 2.1 AA check at 1200px light and 390px dark, plus a sideways-scroll check. |
| `biome.json` | Biome lint and format config. Markdown is not formatted. |
| `docs/roadmap.md` | Snapshot of the long-form roadmap doc. The editable doc lives in Claude Docs. |

Package manager is pnpm (version pinned in `packageManager`, run through corepack). Commands: `pnpm build`, `pnpm a11y`, `pnpm lint` (Biome), `pnpm format` (Biome fixes and formatting), `pnpm check` (Biome, build and a11y). Run `pnpm format` then `pnpm check` after every change to `src/`, `scripts/` or `data/model.json`.

## The model

- Four levels: 0 Start, 1 Use, 2 Shape, 3 Scale. Use, Shape and Scale match the interview sheet's getting started, getting good and next level. Start and the pass tests are our synthesis, since nobody interviewed is a beginner.
- Disciplines in `DISC`: `all` (everyone), `dev`, `des`, `biz`, `org` (team and organization).
- `PATH[disc].steps[level]` is exactly 3 steps. `PATH[disc].tests[level]` is one "you are there when" test.
- `ROWS[disc][level]` exists for levels 1 to 3. Each row is `[topic, what goes wrong without it, ask yourself, sources]`. Sources are interview numbers as a string, with `S` for the self-submitted map: `"4, 6, 13"`.
- `GAPS[disc][level]` is `{ m: [needs more material], r: [needs learning resources], n: "sources interviewees named" }`.
- Topic ids in the page are `${disc}-${level}-${index}` and ratings are saved under them in each viewer's browser. Append new rows at the end of a level so existing ratings keep pointing at the right topic. Do not reorder or delete rows unless asked.

## Interview data

- Interviews are numbered by when the sheet was made. 1 to 12 are in `2026-11-10-no-group-insights.md`, the self-submitted map (S) is in `2026-11-10-variant-insights.md`, and 13 onward get their own file.
- Interviews 8, 9, 10 and 12 have no discipline recorded. We placed them in the business and advisory track based on content. 5 has none either and reads as a developer or tech lead.
- Most answers are in Norwegian. The model and page are in English.
- Never invent sources, numbers or quotes. A row cites only interviews that said it.

## Writing style

- Plain, direct English. Short sentences. No em dashes. No AI-sounding phrasing.
- Write from the consultant's side: what to do, what goes wrong, a question to ask yourself.

## Page rules

- Variant brand: Britti Sans with a system fallback, Variant colors and radii, the tech/AI blue as accent, the logo inline as SVG using `currentColor`.
- Light and dark themes through tokens in `:root`, redefined under `prefers-color-scheme: dark` and `[data-theme="dark"]`.
- Must pass WCAG 2.1 AA. Use native controls (radio groups, checkboxes, buttons), keep focus where the user acted after a re-render, keep touch targets at least 44px on phones, and keep text contrast at least 4.5:1 in both themes.
- No horizontal scroll at 390px wide.
- The page is published as a claude.ai artifact from `dist/agentic-ladder.html`. The host adds the doctype, head and body, so the source has none.

## Published artifacts

- Ladder page: https://claude.ai/artifact/SCahu9fP3wSCSdBtwF76L4
- Roadmap doc (Claude Docs): https://claude.ai/artifact/GaFzf6b98sFvGV8rHK7NMm

To add a new interview, use the `add-interview` skill.
