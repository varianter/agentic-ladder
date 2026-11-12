// Views: each takes the state and the actions and returns a lit-html template. lit-html escapes
// every value and updates the page in place, so focus stays where the user acted. Color comes
// from <color-mode> palettes, so a state change is a palette or surface change, never a new color.
import { html, nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat.js";
import {
  DISC,
  discName,
  LEVELS,
  levelByK,
  PATH,
  SCOPES,
  STEPS,
  topicById,
  topicsOf,
} from "./model.js";

/** @typedef {import("./store.js").State} State */
/** @typedef {import("./model.js").Disc} Disc */
/** @typedef {import("./model.js").Topic} Topic */
/** @typedef {import("./model.js").Resource} Resource */
/** @typedef {keyof typeof RATING} Rating */

/**
 * What the controls do. main.js supplies these.
 * @typedef {object} Actions
 * @property {(disc: Disc) => void} pickDisc
 * @property {(level: number, answer: "yes" | "no") => void} answer
 * @property {(id: string, rating: Rating) => void} rate
 * @property {(level: number) => void} showLevel
 */

/** Palettes for each rating. */
const RATING = {
  do: { label: "I do this", palette: "green" },
  know: { label: "Know of it", palette: "blue" },
  new: { label: "Never heard of it", palette: "yellow" },
};

// ---- Level logic -------------------------------------------------------------------------

/**
 * The first level (1 to 3) whose test is not answered "yes", or 4 when all pass.
 * @param {State} state
 */
export function currentLevel(state) {
  const answers = state.quiz[state.disc] ?? {};
  const first = LEVELS.find((l) => answers[l.k] !== "yes");
  return first?.k ?? 4;
}

/** @param {State} state */
export const viewLevel = (state) => state.view ?? Math.min(currentLevel(state), 3);

/** @param {State} state */
export function verdictText(state) {
  const answers = state.quiz[state.disc] ?? {};
  const level = currentLevel(state);
  if (!Object.keys(answers).length)
    return "Answer from the top. Until you do, the page shows level 1.";
  if (level === 4) return "You pass all three tests. Help your team and the client climb next.";
  return `Work on level ${level}: ${levelByK(level).name}.`;
}

/**
 * Topics for a level and scope in the chosen discipline, core first.
 * @param {State} state
 * @param {number} level
 * @param {string} scope
 */
const topicsFor = (state, level, scope) =>
  topicsOf(state.disc)
    .filter((t) => t.level === level && t.scope === scope)
    .sort((a, b) => Number(b.core) - Number(a.core));

// ---- Building blocks ---------------------------------------------------------------------

/**
 * A native radio drawn as a pill. The input stays in the page for keyboard and screen readers
 * but is hidden visually. Checked pills take `palette`, the strongest surface and a prominent
 * border, so the state does not rest on color alone.
 *
 * With `segment`, the pill sits inside a shared outline (see `segmented`), so it has no border
 * of its own, unchecked ones show the row behind them, and a checked one turns bold.
 *
 * @typedef {object} Option
 * @property {string} name
 * @property {string} id
 * @property {string} value
 * @property {boolean} checked
 * @property {string} label
 * @property {string} [palette]
 * @property {() => void} onPick Runs when the viewer picks this option.
 * @property {boolean} [segment]
 *
 * @param {Option} option
 */
function option({ name, id, value, checked, label, palette = "blue", onPick, segment }) {
  const look = segment
    ? `px-xs py-4xs fs-s ${checked ? "fw-bold" : "fw-medium"}`
    : `px-s py-3xs b-all fw-medium ${checked ? "bc-prominent" : "bc-default"}`;
  return html`<color-mode
    palette=${checked ? palette : "grey"}
    class="d-inline-block br-pill ${checked ? "surface-dyed" : segment ? "" : "surface-base"}"
    ><label
      class="option stack-h flex-nowrap justify-center ta-center br-inherit bg-wash:hover ${look}"
      for=${id}
      ><input
        class="option-input"
        type="radio"
        name=${name}
        id=${id}
        value=${value}
        .checked=${checked}
        @change=${onPick}
      />${label}</label
    ></color-mode
  >`;
}

/**
 * Joined radio pills in one outline, like a segmented control.
 * @param {string} labelledBy
 * @param {Option[]} options
 */
const segmented = (labelledBy, options) =>
  html`<div
    class="segmented stack-h flex-nowrap gap-4xs p-4xs b-all bc-default br-pill"
    role="radiogroup"
    aria-labelledby=${labelledBy}
  >
    ${options.map((o) => option({ ...o, segment: true }))}
  </div>`;

/** @param {string} text */
const pill = (text, palette = "grey") =>
  html`<color-mode palette=${palette} class="d-inline-block surface-dyed px-2xs py-4xs br-pill fs-xs fw-medium"
    >${text}</color-mode
  >`;

/**
 * How to train on a topic: links where we have them, a yellow "missing" marker where not.
 * @param {Resource[]} how
 */
const resources = (how) =>
  how.length
    ? html`<ul class="stack-v gap-4xs" role="list">
        ${how.map(
          (r) =>
            html`<li>${r.url ? html`<a class="v-link" href=${r.url} rel="noopener">${r.text}</a>` : r.text}</li>`,
        )}
      </ul>`
    : pill("Missing: no resource yet", "yellow");

// ---- Sections ---------------------------------------------------------------------------

/** @param {State} state @param {Actions} act */
export const disciplines = (state, act) =>
  DISC.map((d) => {
    const k = /** @type {Disc} */ (d.k);
    return option({
      name: "disc",
      id: `disc-${k}`,
      value: k,
      checked: state.disc === k,
      label: d.name,
      onPick: () => act.pickDisc(k),
    });
  });

/** @param {State} state @param {Actions} act */
export function quiz(state, act) {
  const answers = state.quiz[state.disc] ?? {};
  return PATH[state.disc].tests.map((test, i) => {
    const k = LEVELS[i].k;
    return html`<div class="test-row b-all bc-subtle br-l">
      <div class="px-s py-xs">
        <div class="stack-v gap-4xs">
          <span class="fs-xs fw-medium ink-subtle" id="q${k}-lvl">Level ${k} · ${LEVELS[i].name}</span>
          <p id="q${k}-txt">${test}</p>
        </div>
        <div class="stack-h gap-2xs" role="radiogroup" aria-labelledby="q${k}-lvl q${k}-txt">
          ${option({ name: `q${k}`, id: `q${k}-yes`, value: "yes", checked: answers[k] === "yes", label: "Yes", palette: "green", onPick: () => act.answer(k, "yes") })}
          ${option({ name: `q${k}`, id: `q${k}-no`, value: "no", checked: answers[k] === "no", label: "Not yet", palette: "grey", onPick: () => act.answer(k, "no") })}
        </div>
      </div>
    </div>`;
  });
}

/** @param {State} state @param {Actions} act */
export function ladder(state, act) {
  const current = currentLevel(state);
  const shown = viewLevel(state);
  return LEVELS.map((l) => {
    const passed = l.k < current;
    const now = l.k === current;
    const palette = passed ? "green" : now ? "blue" : "grey";
    const tag = passed ? "Done" : now ? "Now" : "";
    const srTag = passed ? ", passed" : now ? ", your level" : "";
    return html`<li>
      <color-mode palette=${palette} class="d-block br-l ${passed || now ? "surface-tinted" : "surface-base"}">
        <button
          type="button"
          id="rung-${l.k}"
          class="rung stack-v items-start gap-3xs p-xs br-inherit b-all bc-default bg-wash:hover ta-left"
          style="--step: ${l.k - 1}"
          aria-pressed=${l.k === shown ? "true" : "false"}
          aria-current=${now ? "step" : nothing}
          @click=${() => act.showLevel(l.k)}
        >
          <span class="fs-xs ink-subtle">Level ${l.k}</span>
          <span class="name fs-l fw-bold lh-snug">${l.name}</span>
          <span class="idea fs-s ink-subtle">${l.idea}</span>
          <span class="tag fs-xs fw-medium tt-uppercase">${tag}${srTag ? html`<span class="sr-only">${srTag}</span>` : nothing}</span>
        </button>
      </color-mode>
    </li>`;
  });
}

/**
 * @param {State} state
 * @param {Actions} act
 * @param {Topic} t
 */
function topic(state, act, t) {
  const rating = RATING[state.rate[t.id]];
  return html`<li>
    <color-mode
      palette=${rating?.palette ?? "grey"}
      class="d-block br-l b-all bc-subtle ${rating ? "surface-tinted" : "surface-base"}"
    >
      <div class="topic p-s">
        <div class="stack-v gap-3xs w-min-0">
          <h5 class="fw-bold" id="t-${t.id}">${t.what}</h5>
          ${t.detail ? html`<p class="fs-s">${t.detail}</p>` : nothing}
          <p class="fs-s"><strong>Why:</strong> ${t.why}</p>
          <p class="fs-s"><strong>Ask yourself:</strong> ${t.ask}</p>
          <div class="stack-v gap-4xs fs-s">
            <strong>How to learn it</strong>
            ${resources(t.how)}
          </div>
        </div>
        ${segmented(
          `t-${t.id}`,
          Object.entries(RATING).map(([value, r]) => ({
            name: `rate-${t.id}`,
            id: `r-${t.id}-${value}`,
            value,
            checked: state.rate[t.id] === value,
            label: r.label,
            palette: r.palette,
            onPick: () => act.rate(t.id, /** @type {Rating} */ (value)),
          })),
        )}
      </div>
    </color-mode>
  </li>`;
}

/**
 * @param {State} state
 * @param {Actions} act
 * @param {Topic[]} list
 */
const topicList = (state, act, list) =>
  html`<ul class="stack-v gap-2xs" role="list">
    ${repeat(
      list,
      (t) => t.id,
      (t) => topic(state, act, t),
    )}
  </ul>`;

/**
 * One scope at one level: core topics, then the rest folded away.
 * @param {State} state
 * @param {Actions} act
 * @param {number} level
 * @param {{ k: string, name: string, lede: string }} scope
 */
function scopeSection(state, act, level, scope) {
  const all = topicsFor(state, level, scope.k);
  const core = all.filter((t) => t.core);
  const more = all.filter((t) => !t.core);
  return html`<section class="stack-v gap-s" aria-labelledby="s-${scope.k}">
    <div class="stack-v gap-4xs">
      <h4 class="fs-l fw-bold" id="s-${scope.k}">${scope.name}</h4>
      <p class="fs-s ink-subtle">${scope.lede}</p>
    </div>
    ${core.length ? topicList(state, act, core) : nothing}
    ${
      more.length
        ? html`<details class="b-all bc-subtle br-l">
            <summary class="fw-medium px-s py-xs">
              ${core.length ? `${more.length} more at this level` : `${more.length} topics at this level`}
            </summary>
            <div class="px-xs pb-xs">${topicList(state, act, more)}</div>
          </details>`
        : nothing
    }
  </section>`;
}

/** @param {State} state @param {Actions} act */
export function panel(state, act) {
  const level = viewLevel(state);
  const L = levelByK(level);
  const i = LEVELS.indexOf(L);
  const path = PATH[state.disc];
  const steps = [
    { scope: SCOPES[0].name, text: path.self[i] },
    { scope: SCOPES[1].name, text: STEPS.team[i] },
    { scope: SCOPES[2].name, text: STEPS.org[i] },
  ];

  return html`
    <div class="stack-v gap-3xs">
      <p class="eyebrow fs-xs fw-medium tt-uppercase ink-subtle">${discName(state.disc)} · ${L.lvl}</p>
      <h2 class="fs-3xl fw-bold lh-snug" id="panel-title" tabindex="-1">${L.name}</h2>
      <p class="lede ink-subtle">${L.idea}</p>
    </div>

    <div class="stack-v gap-s">
      <h3 class="fs-l fw-bold">Start here</h3>
      <color-mode palette="blue">
        <ol class="steps" role="list">
          ${steps.map(
            (s) => html`<li class="stack-v gap-3xs b-t bw-thick bc-prominent pt-2xs">
              <span class="fs-xs fw-medium ink-subtle">${s.scope}</span>
              <span>${s.text}</span>
            </li>`,
          )}
        </ol>
      </color-mode>
    </div>

    <color-mode palette="blue" class="d-block surface-tinted br-l">
      <p class="stack-v gap-4xs px-s py-xs">
        <span class="eyebrow fs-xs fw-medium tt-uppercase ink-subtle">You are there when</span>
        <span>${path.tests[i]}</span>
      </p>
    </color-mode>

    <div class="stack-v gap-l">
      <div class="stack-v gap-4xs">
        <h3 class="fs-l fw-bold">What to train on</h3>
        <p class="fs-s ink-subtle">
          Rate each topic. What you do not do yet goes into your training plan below.
        </p>
      </div>
      ${SCOPES.map((scope) => scopeSection(state, act, level, scope))}
    </div>`;
}

/** @param {State} state */
export function summary(state) {
  const ids = new Set(topicsOf(state.disc).map((t) => t.id));
  const ratings = Object.entries(state.rate)
    .filter(([id]) => ids.has(id))
    .map(([, r]) => r);
  const count = Object.groupBy(ratings, (r) => r);
  const stats = [
    [`${ratings.length} of ${ids.size}`, "topics rated"],
    [count.do?.length ?? 0, RATING.do.label],
    [count.know?.length ?? 0, RATING.know.label],
    [count.new?.length ?? 0, RATING.new.label],
  ];
  return stats.map(
    ([n, label]) => html`<li class="stack-v gap-4xs surface-tinted br-l px-s py-xs">
      <span class="fs-2xl fw-bold t-tabular lh-tight">${n}</span>
      <span class="fs-s ink-subtle">${label}</span>
    </li>`,
  );
}

/**
 * The line under the plan heading in the PDF: discipline, level and date.
 * @param {State} state
 */
export function planMeta(state) {
  const level = currentLevel(state);
  const where = level === 4 ? "Passed all three tests" : `Level ${level} ${levelByK(level).name}`;
  const date = new Date().toLocaleDateString("en-GB", { dateStyle: "long" });
  return `Variant Agentic Ladder · ${discName(state.disc)} · ${where} · ${date}`;
}

/**
 * The training plan: topics never heard of first, then those known but not practised, each
 * sorted by level and scope, with why and how to train.
 * @param {State} state
 */
export function plan(state) {
  const order = SCOPES.map((s) => s.k);
  /** @param {"new" | "know"} rating */
  const pick = (rating) =>
    Object.entries(state.rate)
      .filter(([, v]) => v === rating)
      .map(([id]) => topicById(id))
      .filter((t) => t !== null)
      .sort((a, b) => a.level - b.level || order.indexOf(a.scope) - order.indexOf(b.scope));
  const items = [...pick("new"), ...pick("know")];
  if (!items.length)
    return html`<li class="ink-subtle">Nothing yet. Rate topics in the panel above.</li>`;
  return items.map((t) => {
    const rating = RATING[state.rate[t.id]];
    const scope = SCOPES.find((s) => s.k === t.scope)?.name ?? "";
    return html`<li>
      <color-mode palette=${rating.palette} class="d-block surface-tinted br-l px-s py-xs">
        <div class="stack-v gap-3xs">
          <span class="fs-xs ink-subtle"
            >Level ${t.level} ${levelByK(t.level).name} · ${scope} · ${rating.label}</span
          >
          <h3 class="fw-bold">${t.what}</h3>
          <p class="fs-s"><strong>Why:</strong> ${t.why}</p>
          <div class="stack-v gap-4xs fs-s">
            <strong>How to learn it</strong>
            ${resources(t.how)}
          </div>
        </div>
      </color-mode>
    </li>`;
  });
}
