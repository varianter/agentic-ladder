# Agentic Ladder

Variant's roadmap for getting good at agentic AI, per product development discipline. It is built from agentic mapping interviews with Variant consultants and published as an interactive static page, the Variant Agentic Ladder.

## Layout

| Path | What it is |
| --- | --- |
| `data/interviews/` | Raw interview exports, one file per export or new interview. Never edit these, only add. |
| `data/model.json` | The model: levels, disciplines, paths, topic rows and gaps. The single source for the page. |
| `src/index.html` | The page: full HTML document, static text and the disagreements table. |
| `src/app.css` | Imports Varde into a cascade layer and adds the little layout Varde has no utility for. |
| `src/js/` | Native ES modules, no bundler. `main.js` (entry and events), `views.js` (markup per section), `model.js` (imports `model.json` as a JSON module), `store.js` (localStorage), `theme.js`, `html.js` (escaping tagged template). |
| `scripts/build.mjs` | Checks the model, then copies `src/` and the model to `dist/`. |
| `scripts/serve.mjs` | Static server for `dist/`. Modules need `http://`, not `file://`. |
| `scripts/a11y.mjs` | axe-core WCAG 2.1 AA check at 1200px light and 390px dark, plus sideways-scroll, script error and Varde-loaded checks. |
| `biome.json` | Biome lint and format config. Markdown is not formatted. |
| `docs/roadmap.md` | Snapshot of the long-form roadmap doc. The editable doc lives in Claude Docs. |

Package manager is pnpm (version pinned in `packageManager`, run through corepack). Commands: `pnpm dev` (build and serve on port 4173), `pnpm build`, `pnpm a11y`, `pnpm lint` (Biome), `pnpm format` (Biome fixes and formatting), `pnpm check` (Biome, build and a11y). Run `pnpm format` then `pnpm check` after every change to `src/`, `scripts/` or `data/model.json`.

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

- Design system is Varde: https://varde.variant.dev/docs/. Link it from the CDN pinned to a version (now 2.0.1, imported at the top of `src/app.css`). Never copy Varde's CSS or font into the repo.
- Use Varde 2.x names: `v-` components (`v-button`, `v-radio`, `v-checkbox`, `v-select`, `v-table`, `v-typeset`), `stack-v`/`stack-h`, `ink-*`, `surface-*`, `bc-*`, `fw-*`, `ta-*`. Older names like `stack`, `fg-muted` or `t-bold` are gone.
- Color only through `<color-mode palette="...">` and Varde's surface, ink and border classes. A `<color-mode>` needs `d-block` or `d-inline-block` to paint a background. State changes swap the palette (blue for the accent and current level, green for passed or "I do this", yellow for gaps and "Never heard of it", coral for the armed clear button). No hex values, no Varde variables in page CSS.
- Light mode is the default for everyone (`data-color-scheme="light"` on `<html>`). The theme picker lets a viewer choose Dark or System, saved in their browser. Both themes must still pass the checks.
- Page CSS lives in `@layer app`, above `@layer varde`. Add a rule there only when no Varde class does the job.
- Markup is built with the `html` tagged template, which escapes every value. Use `safe()` only for markup you built yourself.
- Must pass WCAG 2.1 AA. Use native controls (radio groups, checkboxes, buttons), keep focus where the user acted after a re-render, keep touch targets at least 44px on phones, and keep text contrast at least 4.5:1 in both themes.
- No horizontal scroll at 390px wide.
- Varde's `.stack-v` is `flex-flow: column wrap`, which leaves large empty gaps in Chrome. `app.css` sets it to `nowrap`; keep that. Use media queries, not container queries, for narrow layouts. `pnpm a11y` fails if a `stack-v` has empty space below its last child.
- Radio choices are pills with the native input hidden visually (`.option-input`). Topic ratings use the `segmented` control. A checked choice shows by palette plus a border or bold text, not color alone.

## Published

- Roadmap doc (Claude Docs): https://claude.ai/artifact/GaFzf6b98sFvGV8rHK7NMm
- The ladder page is a static site: deploy the contents of `dist/` to any static host. The old artifact version is at https://claude.ai/artifact/SCahu9fP3wSCSdBtwF76L4 and is no longer updated.

To add a new interview, use the `add-interview` skill.
