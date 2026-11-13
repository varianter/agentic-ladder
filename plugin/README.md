# Agentic Ladder plugin

A coach for Variant's Agentic Ladder. Ask it where you are, what to learn next, or how to help your team or client. It reads the live ladder from https://agentic-ladder.raa.academy/, so it stays current without a new release.

What it does, as one journey that repeats until you lead:

1. Maps where you are on the ladder with a few questions from its tests and topics.
2. With your yes, reads your Flowcase CV through the Variant MCP. It checks the mapping against the CV and lists gaps: what you do that the CV does not show, and what to learn next. It never writes to Flowcase.
3. Makes a training plan: two or three topics, a concrete exercise for each, how you know it worked, and resources.
4. Works through the exercises with you, in your own repo or files.
5. Checks in next time: what you tried, what changed, and new ratings.
6. Retests your level when you are ready, and maps the next one.

With your yes, it saves your level and plan to Claude's memory, so the next session picks up where you left off. It also explains topics, plans for your team or client, and gives you a link that opens the ladder page with your ratings.

## Install

Claude Code:

```sh
/plugin marketplace add varianter/agentic-ladder
/plugin install agentic-ladder@agentic-ladder
```

Claude.ai at Variant: the plugin is already in Variant's organization. Turn it on in your settings. Connect the Variant MCP for the CV step.

Claude.ai elsewhere: zip the `skills/agentic-ladder/` folder and upload it as a skill in your settings. Web fetch must be on.

## Try it

- "Where am I on the agentic ladder? I'm a developer."
- "Make me a training plan for the next month."
- "Check in on my ladder plan."
- "What should I advise my client about agents?"
