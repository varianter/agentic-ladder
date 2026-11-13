// Ratings that go to and from an AI: a small JSON blob, carried in a link as
// #ratings=<base64url of the UTF-8 JSON>. Decoding never throws; bad input gives null, and
// unknown disciplines, levels, topic ids and values are dropped.
import { discName, isDisc, LEVELS, topicById } from "./model.js";

/** Where the ladder lives. Links handed to and from an AI point here. */
export const SITE = "https://agentic-ladder.raa.academy/";

/** @typedef {import("./model.js").Disc} Disc */
/** @typedef {import("./store.js").State} State */

/**
 * The ratings blob. It mirrors `State` without the view. `disc` is null when the blob named
 * no discipline the page knows.
 * @typedef {object} Ratings
 * @property {1} v
 * @property {Disc | null} disc
 * @property {State["quiz"]} quiz
 * @property {State["rate"]} rate
 */

const RATES = new Set(["do", "know", "new"]);
const ANSWERS = new Set(["yes", "no"]);
const LEVEL_KEYS = new Set(LEVELS.map((l) => String(l.k)));

/** @param {unknown} x @returns {x is Record<string, unknown>} */
const isObject = (x) => typeof x === "object" && x !== null && !Array.isArray(x);

/**
 * The viewer's ratings as a blob.
 * @param {State} state
 * @returns {Ratings}
 */
export const fromState = (state) => ({
  v: 1,
  disc: state.disc,
  quiz: state.quiz,
  rate: state.rate,
});

/**
 * Keeps only what the page knows. Returns null when nothing usable is left.
 * @param {unknown} raw
 * @returns {Ratings | null}
 */
export function validate(raw) {
  if (!isObject(raw) || (raw.v !== undefined && raw.v !== 1)) return null;
  const disc = typeof raw.disc === "string" && isDisc(raw.disc) ? raw.disc : null;
  /** @type {Ratings["quiz"]} */
  const quiz = {};
  if (isObject(raw.quiz))
    for (const [d, answers] of Object.entries(raw.quiz)) {
      if (!isDisc(d) || !isObject(answers)) continue;
      /** @type {Record<string, "yes" | "no">} */
      const kept = {};
      for (const [level, a] of Object.entries(answers))
        if (LEVEL_KEYS.has(level) && typeof a === "string" && ANSWERS.has(a))
          kept[level] = /** @type {"yes" | "no"} */ (a);
      if (Object.keys(kept).length) quiz[d] = kept;
    }
  /** @type {Ratings["rate"]} */
  const rate = {};
  if (isObject(raw.rate))
    for (const [id, r] of Object.entries(raw.rate))
      if (topicById(id) && typeof r === "string" && RATES.has(r))
        rate[id] = /** @type {"do" | "know" | "new"} */ (r);
  if (!disc && !Object.keys(quiz).length && !Object.keys(rate).length) return null;
  return { v: 1, disc, quiz, rate };
}

/** @param {Ratings} blob */
export function encode(blob) {
  const bytes = new TextEncoder().encode(JSON.stringify(blob));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

/** @param {Ratings} blob */
export const link = (blob) => `${SITE}#ratings=${encode(blob)}`;

/**
 * Reads a base64url string as UTF-8 JSON, or returns undefined.
 * @param {string} text
 * @returns {unknown}
 */
function fromBase64url(text) {
  try {
    const b64 = text.replaceAll("-", "+").replaceAll("_", "/");
    const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return undefined;
  }
}

/**
 * Reads JSON from text that holds it, also inside a Markdown code block, or returns undefined.
 * @param {string} text
 * @returns {unknown}
 */
function fromJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end < start) return undefined;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return undefined;
  }
}

/**
 * Reads what a viewer pasted or a link carried: a link or hash with #ratings=, the encoded
 * string alone, or the JSON itself. In a link the value is base64url, or percent-encoded JSON,
 * since an AI without code cannot base64-encode reliably.
 * @param {string} text
 * @returns {Ratings | null}
 */
export function decode(text) {
  const s = text.trim();
  const at = s.search(/(?:^|[#&?\s])ratings=/);
  if (at !== -1) {
    let value = s.slice(s.indexOf("ratings=", at) + "ratings=".length);
    try {
      value = decodeURIComponent(value);
    } catch {}
    value = value.trim();
    if (value.startsWith("{")) return validate(fromJson(value));
    const b64 = value.match(/^[A-Za-z0-9_-]+/);
    return b64 ? validate(fromBase64url(b64[0])) : null;
  }
  if (s.includes("{")) return validate(fromJson(s));
  return /^[A-Za-z0-9_-]+$/.test(s) ? validate(fromBase64url(s)) : null;
}

/**
 * What an import would do to the viewer's answers.
 * @typedef {object} Changes
 * @property {number} rateNew Ratings for topics not rated yet.
 * @property {number} rateChanged Ratings that differ from the saved ones.
 * @property {number} quizNew Test answers not given yet.
 * @property {number} quizChanged Test answers that differ from the saved ones.
 * @property {Disc | null} disc The discipline to switch to, or null to stay.
 */

/**
 * @param {State} state
 * @param {Ratings} blob
 * @returns {Changes}
 */
export function changes(state, blob) {
  const c = { rateNew: 0, rateChanged: 0, quizNew: 0, quizChanged: 0 };
  for (const [id, r] of Object.entries(blob.rate)) {
    if (!(id in state.rate)) c.rateNew++;
    else if (state.rate[id] !== r) c.rateChanged++;
  }
  for (const [d, answers] of Object.entries(blob.quiz)) {
    const saved = state.quiz[d] ?? {};
    for (const [level, a] of Object.entries(answers ?? {})) {
      if (!(level in saved)) c.quizNew++;
      else if (saved[level] !== a) c.quizChanged++;
    }
  }
  return { ...c, disc: blob.disc && blob.disc !== state.disc ? blob.disc : null };
}

/**
 * Merges a blob over the viewer's answers. Imported values win; the rest stay.
 * @param {State} state
 * @param {Ratings} blob
 */
export function merge(state, blob) {
  if (blob.disc) state.disc = blob.disc;
  for (const [d, answers] of Object.entries(blob.quiz))
    state.quiz[d] = { ...state.quiz[d], ...answers };
  Object.assign(state.rate, blob.rate);
  state.view = null;
}

/**
 * The text "Copy for AI" puts on the clipboard: a starter prompt, the ladder for the
 * discipline in Markdown when it loaded, and the viewer's ratings as JSON and as a link.
 * @param {State} state
 * @param {string | null} ladder
 */
export function promptText(state, ladder) {
  const blob = fromState(state);
  const name = discName(state.disc);
  const md = `${SITE}ladder/${state.disc}.md`;
  return [
    `I use Variant's Agentic Ladder (${SITE}), a roadmap for getting good at agentic AI in product development. My discipline is ${name}. Help me find my level and make a training plan.`,
    "",
    `Below is the ladder for my discipline in Markdown, then my current answers as JSON. In the JSON, "quiz" holds my answers to the level tests per discipline and level ("yes" or "no"), and "rate" my topic ratings by topic id ("do" is I do this, "know" is know of it, "new" is never heard of it).`,
    "",
    "Ask me questions where my answers are missing or unclear. Answer in the language I write to you in. When we are done, give me an updated link in the same format, so I can import it on the page:",
    `${SITE}#ratings=<the JSON, percent-encoded>`,
    "If you can run code, base64url of the UTF-8 JSON without padding also works. I can also paste the JSON on the page.",
    "Keep the topic ids exactly as they are, and leave out what you do not know.",
    "",
    "---",
    "",
    ladder?.trim() || `(The ladder could not be loaded here. Read it at ${md})`,
    "",
    "---",
    "",
    "## My answers",
    "",
    "```json",
    JSON.stringify(blob, null, 2),
    "```",
    "",
    `As a link: ${link(blob)}`,
    "",
  ].join("\n");
}

const ladders = new Map();

/**
 * The ladder for a discipline in Markdown, fetched once. Null when it fails to load.
 * @param {Disc} disc
 * @returns {Promise<string | null>}
 */
export function ladderText(disc) {
  if (!ladders.has(disc))
    ladders.set(
      disc,
      fetch(new URL(`../ladder/${disc}.md`, import.meta.url))
        .then((res) => (res.ok ? res.text() : null))
        .catch(() => null)
        .then((text) => {
          if (text === null) ladders.delete(disc);
          return text;
        }),
    );
  return ladders.get(disc);
}
