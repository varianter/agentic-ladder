# Agentic Ladder

A roadmap for Variant consultants who want to get good at working with AI agents, from total beginner to expert. It is built from agentic mapping interviews and comes in two forms:

- **The ladder page**, an interactive model. Pick your discipline, answer four tests to find your level, do the three steps, and rate topics to find your unknown unknowns.
- **The roadmap doc**, the long-form version with every topic, the disagreements, open questions, vocabulary and where we need more material or learning resources. A snapshot is in `docs/roadmap.md`.

## Getting started

Needs Node 22 or newer and pnpm through corepack (`corepack enable`).

```sh
pnpm install
pnpm dev      # build and serve the page at http://127.0.0.1:4173/
pnpm check    # Biome lint and format check, builds dist/, runs the accessibility check
pnpm format   # apply Biome fixes and formatting
```

The page is plain HTML, CSS and native ES modules styled with [Varde](https://varde.variant.dev/docs/), loaded from Varde's CDN. There is no bundler. The accessibility check needs Chrome or Chromium (set `CHROME_PATH` if it is not found) and network access for the CDN.

## Changing the model

All content lives in `data/model.json`. Edit it, run `pnpm check`, and deploy the contents of `dist/` to any static host. See `CLAUDE.md` for the structure and rules.

## Adding an interview

Open the project in Claude Code and paste the interview. The `add-interview` skill saves it, updates the model, the page and the doc, and runs the checks.

## Data

| Source | Interviews |
| --- | --- |
| `2026-11-10-no-group-insights.md` | 1 to 12 |
| `2026-11-10-variant-insights.md` | Self-submitted map (S) |
| `2026-11-11-interview-13.md` | 13 |

Names, interviewers and private notes were removed in the export. Free text may still mention clients and companies, so keep the repository private.
