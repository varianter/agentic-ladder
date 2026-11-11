// Pure views: each takes the state and returns markup. Color comes from <color-mode> palettes,
// so a state change is a palette or surface change, never a new color.
import { html } from "./html.js";
import { DISC, discName, GAPS, LEVELS, PATH, ROWS, topicById, topicCount } from "./model.js";

/** Palettes for each rating. */
const RATING = {
  do: { label: "I do this", palette: "green" },
  know: { label: "Know of it", palette: "blue" },
  new: { label: "Never heard of it", palette: "yellow" },
};

// ---- Level logic -------------------------------------------------------------------------

/** The first level whose test is not answered "yes", or 4 when all pass. */
export function currentLevel(state) {
  const answers = state.quiz[state.disc] ?? {};
  const first = [0, 1, 2, 3].find((i) => answers[i] !== "yes");
  return first ?? 4;
}

export const viewLevel = (state) => state.view ?? Math.min(currentLevel(state), 3);

export function verdictText(state) {
  const answers = state.quiz[state.disc] ?? {};
  const level = currentLevel(state);
  if (!Object.keys(answers).length)
    return "Answer from the top. Until you do, the page shows level 0.";
  if (level === 4) return "You pass all four tests. Help your team climb next.";
  return `Work on level ${level}: ${LEVELS[level].name}.`;
}

/** Topics shown for a level: the discipline's own, plus the shared core when it is switched on. */
function topicsFor(state, level) {
  const own = (ROWS[state.disc]?.[level] ?? []).map((row, i) => ({
    row,
    id: `${state.disc}-${level}-${i}`,
    core: state.disc === "all",
  }));
  const withCore = state.disc !== "all" && state.disc !== "org" && state.core;
  if (!withCore) return own;
  const core = (ROWS.all?.[level] ?? []).map((row, i) => ({
    row,
    id: `all-${level}-${i}`,
    core: true,
  }));
  return own.concat(core);
}

// ---- Building blocks ---------------------------------------------------------------------

const dataAttrs = (data) => Object.entries(data).map(([k, v]) => html` data-${k}="${v}"`);

/**
 * A native radio drawn as a pill. The input stays in the page for keyboard and screen readers
 * but is hidden visually. Checked pills take `palette`, the strongest surface and a prominent
 * border, so the state does not rest on color alone.
 *
 * With `segment`, the pill sits inside a shared outline (see `segmented`), so it has no border
 * of its own, unchecked ones show the row behind them, and a checked one turns bold.
 */
function option({ name, id, value, checked, label, palette = "blue", data = {}, segment }) {
  const look = segment
    ? `px-xs py-4xs fs-s ${checked ? "fw-bold" : "fw-medium"}`
    : `px-s py-3xs b-all fw-medium ${checked ? "bc-prominent" : "bc-default"}`;
  return html`<color-mode
    palette="${checked ? palette : "grey"}"
    class="d-inline-block br-pill ${checked ? "surface-dyed" : segment ? "" : "surface-base"}"
    ><label
      class="option stack-h flex-nowrap justify-center ta-center br-inherit bg-wash:hover ${look}"
      for="${id}"
      ><input
        class="option-input"
        type="radio"
        name="${name}"
        id="${id}"
        value="${value}"
        ${dataAttrs(data)}
        ${checked ? "checked" : ""}
      />${label}</label
    ></color-mode
  >`;
}

/** Joined radio pills in one outline, like a segmented control. */
const segmented = (labelledBy, options) =>
  html`<div
    class="segmented stack-h flex-nowrap gap-4xs p-4xs b-all bc-default br-pill"
    role="radiogroup"
    aria-labelledby="${labelledBy}"
  >
    ${options.map((o) => option({ ...o, segment: true }))}
  </div>`;

const pill = (text, palette = "grey") =>
  html`<color-mode palette="${palette}" class="d-inline-block surface-dyed px-2xs py-4xs br-pill fs-xs fw-medium"
    >${text}</color-mode
  >`;

const bullets = (items) =>
  html`<div class="v-typeset fs-s"><ul>${items.map((x) => html`<li>${x}</li>`)}</ul></div>`;

// ---- Sections ----------------------------------------------------------------------------

export const disciplines = (state) =>
  DISC.map((d) =>
    option({
      name: "disc",
      id: `disc-${d.k}`,
      value: d.k,
      checked: state.disc === d.k,
      label: d.name,
      data: { kind: "disc" },
    }),
  );

export function quiz(state) {
  const answers = state.quiz[state.disc] ?? {};
  return PATH[state.disc].tests.map(
    (test, i) => html`<div class="test-row b-all bc-subtle br-l">
      <div class="px-s py-xs">
        <div class="stack-v gap-4xs">
          <span class="fs-xs fw-medium ink-subtle" id="q${i}-lvl">Level ${i} · ${LEVELS[i].name}</span>
          <p id="q${i}-txt">${test}</p>
        </div>
        <div class="stack-h gap-2xs" role="radiogroup" aria-labelledby="q${i}-lvl q${i}-txt">
          ${option({ name: `q${i}`, id: `q${i}-yes`, value: "yes", checked: answers[i] === "yes", label: "Yes", palette: "green", data: { kind: "quiz", i } })}
          ${option({ name: `q${i}`, id: `q${i}-no`, value: "no", checked: answers[i] === "no", label: "Not yet", palette: "grey", data: { kind: "quiz", i } })}
        </div>
      </div>
    </div>`,
  );
}

export function ladder(state) {
  const current = currentLevel(state);
  const shown = viewLevel(state);
  return LEVELS.map((l) => {
    const passed = l.k < current;
    const now = l.k === current;
    const palette = passed ? "green" : now ? "blue" : "grey";
    const tag = passed ? "Done" : now ? "Now" : "";
    const srTag = passed ? ", passed" : now ? ", your level" : "";
    return html`<li>
      <color-mode palette="${palette}" class="d-block br-l ${passed || now ? "surface-tinted" : "surface-base"}">
        <button
          type="button"
          id="rung-${l.k}"
          class="rung stack-v items-start gap-3xs p-xs br-inherit b-all bc-default bg-wash:hover ta-left"
          style="--step: ${l.k}"
          data-l="${l.k}"
          aria-pressed="${l.k === shown}"
          ${now ? html`aria-current="step"` : ""}
        >
          <span class="fs-xs ink-subtle">Level ${l.k}</span>
          <span class="name fs-l fw-bold lh-snug">${l.name}</span>
          <span class="idea fs-s ink-subtle">${l.idea}</span>
          <span class="tag fs-xs fw-medium tt-uppercase">${tag}${srTag ? html`<span class="sr-only">${srTag}</span>` : ""}</span>
        </button>
      </color-mode>
    </li>`;
  });
}

function gapBoxes(gaps) {
  const material = gaps.m.length
    ? html`<color-mode palette="yellow" class="d-block surface-tinted br-l">
        <div class="stack-v gap-2xs px-s py-xs">
          <h3 class="fs-s fw-bold">Needs more material</h3>
          ${bullets(gaps.m)}
        </div>
      </color-mode>`
    : html`<div class="stack-v gap-2xs px-s py-xs b-all bc-default br-l">
        <h3 class="fs-s fw-bold">Material is enough for now</h3>
        <p class="fs-s ink-subtle">Several interviewees described this level.</p>
      </div>`;
  const resources = html`<color-mode palette="yellow" class="d-block surface-tinted br-l">
    <div class="stack-v gap-2xs px-s py-xs">
      <h3 class="fs-s fw-bold">Needs learning resources</h3>
      ${bullets(gaps.r)}
      ${gaps.n ? html`<p class="fs-s ink-subtle">${gaps.n}</p>` : ""}
    </div>
  </color-mode>`;
  return html`<div class="gaps">${material}${resources}</div>`;
}

function topic(state, { row, id, core }) {
  const [name, without, ask, sources] = row;
  const rating = RATING[state.rate[id]];
  return html`<li>
    <color-mode
      palette="${rating?.palette ?? "grey"}"
      class="d-block br-l b-all bc-subtle ${rating ? "surface-tinted" : "surface-base"}"
    >
      <div class="topic p-s">
        <div class="stack-v gap-3xs w-min-0">
          <h4 class="fw-bold" id="t-${id}">${name}</h4>
          <p class="fs-s ink-subtle">Without it: ${without}</p>
          <p class="fs-s"><strong>Ask yourself:</strong> ${ask}</p>
          <p class="stack-h gap-3xs mt-3xs">
            ${core && state.disc !== "all" ? pill("Shared core", "periwinkle") : ""}${pill(`Interviews ${sources}`)}
          </p>
        </div>
        ${segmented(
          `t-${id}`,
          Object.entries(RATING).map(([value, r]) => ({
            name: `rate-${id}`,
            id: `r-${id}-${value}`,
            value,
            checked: state.rate[id] === value,
            label: r.label,
            palette: r.palette,
            data: { kind: "rate", id },
          })),
        )}
      </div>
    </color-mode>
  </li>`;
}

export function panel(state) {
  const level = viewLevel(state);
  const L = LEVELS[level];
  const path = PATH[state.disc];
  const topics = topicsFor(state, level);
  const showCoreToggle = state.disc !== "all" && state.disc !== "org" && level > 0;

  return html`
    <div class="stack-h justify-between items-end gap-s">
      <div class="stack-v gap-3xs">
        <p class="eyebrow fs-xs fw-medium tt-uppercase ink-subtle">${discName(state.disc)} · ${L.lvl}</p>
        <h2 class="fs-3xl fw-bold lh-snug" id="panel-title" tabindex="-1">${L.name}</h2>
      </div>
      <p class="fs-s ink-subtle">${level > 0 ? `${topics.length} topics to rate` : "First steps only"}</p>
    </div>

    <div class="stack-v gap-s">
      <h3 class="fs-l fw-bold">Three steps</h3>
      <color-mode palette="blue">
        <ol class="steps" role="list">
          ${path.steps[level].map(
            (step, i) => html`<li class="stack-v gap-3xs b-t bw-thick bc-prominent pt-2xs">
              <span class="fs-xs fw-medium ink-subtle" aria-hidden="true">Step ${i + 1}</span>
              <span>${step}</span>
            </li>`,
          )}
        </ol>
      </color-mode>
    </div>

    <color-mode palette="blue" class="d-block surface-tinted br-l">
      <p class="stack-v gap-4xs px-s py-xs">
        <span class="eyebrow fs-xs fw-medium tt-uppercase ink-subtle">You are there when</span>
        <span>${path.tests[level]}</span>
      </p>
    </color-mode>

    ${gapBoxes(GAPS[state.disc][level])}

    <div class="stack-v gap-s">
      <div class="stack-h justify-between gap-s">
        <h3 class="fs-l fw-bold">Topics at this level</h3>
        ${
          showCoreToggle
            ? html`<label class="option stack-h gap-2xs fs-s" for="coretoggle">
                <input class="v-checkbox" type="checkbox" id="coretoggle" ${state.core ? "checked" : ""} />
                Include the shared core
              </label>`
            : ""
        }
      </div>
      ${
        level === 0
          ? html`<p class="ink-subtle">
              Level 0 has no detailed topics. Do the three steps, pass the test, and the topics start
              at level 1.
            </p>`
          : html`<ul class="stack-v gap-2xs" role="list">${topics.map((t) => topic(state, t))}</ul>`
      }
    </div>`;
}

export function summary(state) {
  const ratings = Object.values(state.rate);
  const count = (v) => ratings.filter((r) => r === v).length;
  const stats = [
    [`${ratings.length} of ${topicCount}`, "topics rated"],
    [count("do"), RATING.do.label],
    [count("know"), RATING.know.label],
    [count("new"), RATING.new.label],
  ];
  return stats.map(
    ([n, label]) => html`<li class="stack-v gap-4xs surface-tinted br-l px-s py-xs">
      <span class="fs-2xl fw-bold t-tabular lh-tight">${n}</span>
      <span class="fs-s ink-subtle">${label}</span>
    </li>`,
  );
}

export function unknowns(state) {
  const items = Object.entries(state.rate)
    .filter(([, v]) => v === "new")
    .map(([id]) => topicById(id))
    .filter(Boolean)
    .sort((a, b) => a.level - b.level);
  if (!items.length)
    return html`<li class="ink-subtle">Nothing yet. Rate topics in the panel above.</li>`;
  return items.map(
    (u) => html`<li>
      <color-mode palette="yellow" class="d-block surface-tinted br-m px-s py-2xs">
        <span class="d-block fs-xs ink-subtle">Level ${u.level} ${LEVELS[u.level].name} · ${discName(u.disc)}</span>
        ${u.topic}
      </color-mode>
    </li>`,
  );
}
