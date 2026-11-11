# Agentic Ladder

Variant's roadmap for getting good at agentic AI, per product development discipline. It is built from agentic mapping interviews with Variant consultants and published as an interactive static page, the Variant Agentic Ladder.

## Layout

| Path | What it is |
| --- | --- |
| `data/interviews/` | Raw interview exports, one file per export or new interview. Never edit these, only add. |
| `src/` | The site, deployed exactly as it is. No build step. |
| `src/model.json` | The model: levels, scopes, disciplines, steps, tests and topics. The single source for the page. |
| `src/index.html` | The page: full HTML document and static text. |
| `src/app.css` | Imports Varde into a cascade layer and adds the little layout Varde has no utility for. |
| `src/js/` | Native ES modules, no bundler. `main.js` (entry, actions and rendering), `views.js` (lit-html templates per section), `model.js` (fetches `../model.json`, model types), `store.js` (localStorage, state type), `theme.js`. |
| `scripts/check-model.mjs` | Checks the shape of `src/model.json`. |
| `tsconfig.json` | Type checks `src/js/` from JSDoc comments with `tsc`. Nothing is emitted. |
| `.github/workflows/pages.yml` | Runs `pnpm check` on every push and pull request, and publishes `src/` to GitHub Pages from `main`. |
| `scripts/a11y.mjs` | Serves `src/` with sirv, then runs an axe-core WCAG 2.1 AA check at 1200px light and 390px dark, plus sideways-scroll, script error and Varde-loaded checks. |
| `biome.json` | Biome lint and format config. Markdown is not formatted. |
| `docs/roadmap.md` | Snapshot of the long-form roadmap doc. The editable doc lives in Claude Docs. |

Package manager is pnpm (version pinned in `packageManager`, run through corepack). Commands: `pnpm dev` (serve `src/` with sirv on port 4173, reload to see edits), `pnpm check:model`, `pnpm check:types` (tsc), `pnpm a11y`, `pnpm lint` (Biome), `pnpm format` (Biome fixes and formatting), `pnpm check` (Biome, types, model check and a11y). Run `pnpm format` then `pnpm check` after every change to `src/` or `scripts/`.

## The model

- Three levels: 1 Beginner (no experience), 2 Experienced, 3 Leading (self-sufficient and leading). They match the interview sheet's getting started, getting good and next level, but a topic may sit on another level by our judgment. Experts review the placement.
- Three scopes per level, in `SCOPES`: `self` (yourself), `team` (initiative for an AI-empowered team that keeps quality), `org` (what you advise the client). Organization means the client, not Variant.
- Disciplines in `DISC`: `general` (shared topics only), `dev`, `des`, `sales` (sales and management), `adv` (advisory).
- `PATH[disc].self[i]` is the level's step for yourself and `PATH[disc].tests[i]` its "you are there when" test. `STEPS.team[i]` and `STEPS.org[i]` are shared by all disciplines.
- `TOPICS` is a flat list. Each topic is `{ id, level, scope, disc, core, what, detail?, why, ask, how, src }`. `disc` is a list of discipline keys, or `["all"]`. `core` topics show first, the rest fold under "more at this level". `how` is a list of `{ text, url? }`. An empty list shows "Missing: no resource yet".
- `src` is the interview numbers as a string, with `S` for the self-submitted map: `"4, 6, 13"`. It is kept for review and never shown on the page. The page shows no interview numbers or counts.
- Ratings are saved under the topic `id` in each viewer's browser. Never change or reuse an id. Order in the list does not matter.
- Disagreements between interviews are settled in the model: each topic gives one answer. Ask the user before settling a new one.

## Interview data

- Interviews are numbered by when the sheet was made. 1 to 12 are in `2026-11-10-no-group-insights.md`, the self-submitted map (S) is in `2026-11-10-variant-insights.md`, and 13 onward get their own file.
- Interviews 8, 9, 10 and 12 have no discipline recorded. 8 and 12 are in sales and management, 9 and 10 in advisory. 5 has none either and is placed as a developer. 2 (developer, UX, UI) feeds only the developer track. Research analysis is shared between designer and advisory.
- Most answers are in Norwegian. The model and page are in English.
- Never invent sources, numbers or quotes. A row cites only interviews that said it.

## Writing style

- Plain, direct English. Short sentences. No em dashes. No AI-sounding phrasing.
- Write from the consultant's side: what to do, what goes wrong, a question to ask yourself.

## Page rules

- Design system is Varde: https://varde.variant.dev/docs/. Link it from the CDN pinned to a version (now 2.0.1, imported at the top of `src/app.css`). Never copy Varde's CSS or font into the repo.
- Use Varde 2.x names: `v-` components (`v-button`, `v-radio`, `v-checkbox`, `v-select`, `v-table`, `v-typeset`), `stack-v`/`stack-h`, `ink-*`, `surface-*`, `bc-*`, `fw-*`, `ta-*`. Older names like `stack`, `fg-muted` or `t-bold` are gone.
- Color only through `<color-mode palette="...">` and Varde's surface, ink and border classes. A `<color-mode>` needs `d-block` or `d-inline-block` to paint a background. State changes swap the palette (blue for the accent, current level and "Know of it", green for passed or "I do this", yellow for missing resources and "Never heard of it", coral for the armed clear button). No hex values, no Varde variables in page CSS.
- Light mode is the default for everyone (`data-color-scheme="light"` on `<html>`). The theme picker lets a viewer choose Dark or System, saved in their browser. Both themes must still pass the checks.
- Page CSS lives in `@layer app`, above `@layer varde`. Add a rule there only when no Varde class does the job.
- Markup is built with lit-html, loaded from jsDelivr through the import map in `index.html` and pinned to a version (now 3.3.3). The `lit-html` dev dependency is only there for types, so keep both versions the same. lit-html escapes every value and updates the page in place, so focus stays put. Bind events with `@change`/`@click` and input state with `.checked`. Render lists of inputs whose identity can change, like topics, with `repeat()` keyed by id.
- Type everything with JSDoc. `pnpm check` runs `tsc` in strict mode over `src/js/`.
- Browser features must be Baseline Widely available. Newer features are fine only as progressive enhancement, where the page works the same without them. View transitions are one: they run only on ladder clicks, since clicks during a transition are lost.
- Must pass WCAG 2.1 AA. Use native controls (radio groups, checkboxes, buttons), keep focus where the user acted after a re-render, keep touch targets at least 44px on phones, and keep text contrast at least 4.5:1 in both themes.
- No horizontal scroll at 390px wide.
- Varde's `.stack-v` is `flex-flow: column wrap`, which leaves large empty gaps in Chrome. `app.css` sets it to `nowrap`; keep that. Use media queries, not container queries, for narrow layouts. `pnpm a11y` fails if a `stack-v` has empty space below its last child.
- Radio choices are pills with the native input hidden visually (`.option-input`). Topic ratings use the `segmented` control. A checked choice shows by palette plus a border or bold text, not color alone.

## Published

- Roadmap doc (Claude Docs): https://claude.ai/artifact/GaFzf6b98sFvGV8rHK7NMm
- The ladder page is a static site with no build step. GitHub Pages publishes `src/` on every push to `main` (Pages source must be set to "GitHub Actions"). Any other static host can serve `src/` as is. The old artifact version is at https://claude.ai/artifact/SCahu9fP3wSCSdBtwF76L4 and is no longer updated.

To add a new interview, use the `add-interview` skill.
