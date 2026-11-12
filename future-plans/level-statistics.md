# Level statistics

Status: idea, not started.

Collect anonymous statistics on what level people are on, per discipline. Viewers can opt out.

## Approach: GoatCounter custom events

- Free for non-commercial and small use, no cookies, no personal data. Fits a static site on GitHub Pages with no backend and no consent banner.
- No `count.js` script. Send each hit as a plain request with `navigator.sendBeacon` or `fetch` to `https://<code>.goatcounter.com/count?p=level/<disc>/<n>&e=true`. This keeps the "only pinned CDN scripts" rule.
- The dashboard counts per path, so paths like `level/dev/2` give the breakdown by discipline and level.

## What to send

- Send `level/<disc>/<n>` when the computed level for a discipline changes after the tests are answered. Not on every page view, or the counts measure visits instead of people.
- Keep the last sent value per discipline in `localStorage` and skip repeats.
- A person who moves up is counted again at the new level. Totals mean "people who reached level N", not "people currently at N".
- Optional: send topic ratings too (`topic/<id>/do`) to see which topics people already practise.

## Opt-out

- Checkbox in the footer, "Share anonymous level stats", on by default.
- Saved as `stats: false` in the existing state in `src/js/store.js`. The send function returns early when it is off.
- One line next to it that says exactly what is sent: discipline and level, nothing else.

## Alternatives

- Plausible: custom events with properties and a nicer dashboard, about €9 a month.
- Google Form or Sheet endpoint: data stays in Variant's Google Workspace, more fiddly and harder to read.
- Own small endpoint: full control, but something has to run.

## To start

1. Create a site code at goatcounter.com.
2. Add the send function, the deduplication and the opt-out checkbox.
3. Run `pnpm format` and `pnpm check`.
