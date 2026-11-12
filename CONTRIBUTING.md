# Suggesting a learning resource

Every topic on the Variant Agentic Ladder has a "How to learn it" list. Each list lives in its own file, `src/resources/<topic-id>.json`. The "Suggest a resource" link under a topic opens that file in GitHub's editor. Save your change and GitHub opens a pull request for you. You need a GitHub account, nothing else.

## What we take

- You have used it yourself and would point a colleague to it.
- Free and paid are both fine. Say it in the text if it costs money: "Prompt engineering course (paid)".
- Any language is fine. Set `lang` when it is not English.
- No affiliate or tracking links.
- Links must start with `https://`.

## The file

```json
{
  "about": "Learning resources for the topic \"...\" (topic-id). Rules: ...",
  "resources": [
    { "text": "Short title, and when it helps", "url": "https://example.com", "kind": "course", "lang": "no", "disc": "dev" }
  ]
}
```

Leave `about` as it is. Each resource has:

| Field | Required | What it is |
| --- | --- | --- |
| `text` | Yes | What shows on the page. Plain and short. |
| `url` | No | Where it lives. Leave it out for something like "Ask the team at Variant". |
| `kind` | No | One of `course`, `article`, `video`, `book`, `tool`, `talk`, `podcast`, `example`. |
| `lang` | No | Two-letter language code, like `no` or `sv`. English is assumed when it is left out. |
| `disc` | No | Show it only on one discipline's track: `dev`, `des`, `sales` or `adv`. Must be one of the topic's disciplines. Leave it out to show it to everyone. |

Order in the list is the order on the page. Put the best one first.

## Review

Every pull request is checked automatically and reviewed before it goes live. If the check fails, the message says what to fix.
