# Agentic Ladder

A roadmap for Variant consultants who want to get good at working with AI agents, over three levels, from no experience to leading. It is built from agentic mapping interviews and comes in two forms:

- **The ladder page**, an interactive model. Pick your discipline, answer three tests to find your level, do the three steps, and rate topics to find your unknown unknowns.
- **The roadmap doc**, the long-form version with every topic and its sources, how disagreements were settled, which topics were placed by judgment, open questions, vocabulary and where we need more material or learning resources. A snapshot is in `docs/roadmap.md`.

## Getting started

Needs Node 22 or newer and pnpm through corepack (`corepack enable`).

```sh
pnpm install
pnpm dev      # serve src/ at http://127.0.0.1:4173/, reload to see edits
pnpm check    # Biome lint and format check, type check, model check, accessibility check
pnpm format   # apply Biome fixes and formatting
```

The page is plain HTML, CSS and native ES modules styled with [Varde](https://varde.variant.dev/docs/), loaded from Varde's CDN. Markup is rendered with [lit-html](https://lit.dev/docs/libraries/standalone-templates/), loaded from jsDelivr through an import map. There is no bundler and no build step: `src/` is the site. The accessibility check needs Chrome or Chromium (set `CHROME_PATH` if it is not found) and network access for the CDN.

## Changing the model

All content lives in `src/model.json`. Edit it and run `pnpm check`. Pushing to `main` publishes `src/` to GitHub Pages; any other static host can serve `src/` as is. See `CLAUDE.md` for the structure and rules.

## Adding an interview

Open the project in Claude Code, type `/add-interview` and paste or attach the interview. Pasting it without the command works too. The skill saves the raw text, then asks you about each change one at a time: new topics, wording, topics to combine, and topics an answer could improve. Nothing changes in the model until you say yes. It then updates the page and the roadmap doc and runs the checks.

## Data

| Source | Interviews |
| --- | --- |
| `2026-11-10-no-group-insights.md` | 1 to 12 |
| `2026-11-10-variant-insights.md` | Self-submitted map (S) |
| `2026-11-11-interview-13.md` | 13 |

Names, interviewers and private notes were removed in the export. Free text may still mention clients and companies, so keep the repository private.
