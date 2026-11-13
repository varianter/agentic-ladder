# Agentic Ladder plugin

A coach for Variant's Agentic Ladder. Ask it where you are, what to learn next, or how to help your team or client. It reads the live ladder from https://agentic-ladder.raa.academy/, so it stays current without a new release.

What it does:

- Finds your level with a few questions from the ladder's tests and topics.
- Makes a training plan: the next two or three topics, an exercise for each, and resources.
- Explains topics and levels, and plans for your team or the client.
- With your yes, reads your Flowcase CV through the Variant MCP. It suggests a level from the CV and lists gaps: what you do that the CV does not show, and what to learn next. It never writes to Flowcase.
- With your yes, saves your level and plan to Claude's memory for next time.
- Gives you a link that opens the ladder page with your ratings.

## Install

Claude Code:

```sh
/plugin marketplace add varianter/agentic-ladder
/plugin install agentic-ladder@agentic-ladder
```

Claude.ai: zip the `skills/agentic-ladder/` folder and upload it as a skill in your Claude.ai settings. Web fetch must be on. Connect the Variant MCP for the CV step.

## Try it

- "Where am I on the agentic ladder? I'm a developer."
- "Make me a training plan for the next month."
- "What should I advise my client about agents?"
