# LLM access

Status: built. Next: list the plugin on Mimir.

Make the ladder easy to use from an LLM: in a consultant's own Claude chat, in coding agents and in internal tooling. The goal is a full training plan inside tools like Claude.ai, as easy to use as the page.

Two parts. This repo publishes the model in a form LLMs read well. A separate `agentic-ladder` plugin, with its source in this repo, gives the coaching experience.

## 1. Data layer

All files live in `src/` and deploy as is, like the rest of the site.

- `llms.txt`: the entry point. What the ladder is, how levels, scopes and disciplines fit together, and which file to read for which task.
- `ladder.md`: the whole ladder as Markdown. Per level: the scopes, the steps, the "you are there when" tests, and every topic with its id, `what`, `detail`, `why`, `ask` and resources.
- `ladder/<disc>.md`: the same, but one discipline per file (`dev`, `des`, `sales`, `adv`). General topics are included in each. Smaller, so they fit a chat.
- `model.schema.json`: JSON Schema for `model.json` and the resource files, with a description on every field. `scripts/check-model.mjs` validates against it.
- The Markdown files are made by `scripts/build-llm.mjs` from `model.json` and `src/resources/`. They are committed. `pnpm check` fails if they are stale, so `src/` stays exactly what is deployed.
- Interview numbers (`src`) are left out, as on the page.

## 2. Ratings that go both ways

- Format: `{ "v": 1, "disc": "dev", "ratings": { "<topic-id>": "do" | "know" | "never" } }`. Topic ids never change, so the format stays stable.
- Carried in a link as `#ratings=<base64url>`.
- On the page:
  - "Copy for AI" copies the current discipline's Markdown, the viewer's ratings and a starter prompt.
  - "Import ratings" reads a `#ratings=` link or a pasted blob, shows what will change, and only saves after the viewer confirms.

## 3. The `agentic-ladder` plugin

- Its own plugin, installed by choice. Listed on Mimir with the other Variant plugins and skills.
- Source in this repo (for example `plugin/`), so the prompts are reviewed together with the model.
- The skill fetches `llms.txt` and the discipline files from the live site (`https://agentic-ladder.raa.academy/`). Model changes reach users without a plugin release.

### Flows

- Assess: a short interview built from the "you are there when" tests and the topic `ask` questions. Result: level per scope, and ratings.
- Plan: a training plan with the next two or three topics, a concrete exercise for each, and resources.
- Answer: explain a topic, or what separates two levels.
- Team or client: use the `team` and `org` scopes to plan for a team or advise a client.
- Hand back: a link to the page with `#ratings=`, so the page shows the same state.

### CV (opt-in)

- The skill asks explicitly before it reads the CV. Nothing happens without a yes.
- Uses `get-cv-for-consultant` when the Variant MCP is connected. Without it, the step is skipped.
- Two ways:
  - CV to ladder: suggest discipline and a likely level from projects and tools. The person confirms.
  - Ladder to CV: list gaps and suggestions. What you already do that the CV does not show, and what you need to learn to show it. Used both to improve the CV and to see what to learn next.
- Suggestions only. The skill never writes to Flowcase.

### Memory

- Saves discipline, level per scope, ratings and the current plan to Claude memory.
- Asks every time before saving.
- Next session starts from what was saved: "Last time you were working on X. How did it go?"

### Language

- Follows the user's language and translates ladder content on the fly.
- Topic ids and English names stay as they are, so they can be referenced and linked.

## Out of scope for now

- Team leads assessing a team from several people's ratings.
- A central store of progress.
- A `get-agentic-ladder` tool in variant-mcp. Possible later, for internal tooling.

## To start

1. `scripts/build-llm.mjs`, `llms.txt`, the Markdown files and the stale check in `pnpm check`.
2. `model.schema.json` and validation in `check-model.mjs`.
3. Ratings format, "Copy for AI" and "Import ratings" on the page.
4. The plugin and skill in `plugin/`, then list it on Mimir.
5. Run `pnpm format` and `pnpm check`, and update `CLAUDE.md` (layout table and commands).
