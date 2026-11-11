// The model, fetched from src/model.json when the module loads. No build step.

/** @typedef {typeof import("../model.json")} Model */
/** @typedef {keyof Model["PATH"]} Disc */
/** @typedef {"self" | "team" | "org"} Scope */
/** @typedef {{ text: string, url?: string }} Resource */

/**
 * One thing to train on. `disc` holds discipline keys, or "all" for every discipline.
 * `core` topics show first; the rest fold away under "More at this level". `src` is the
 * interview numbers behind the topic, kept for review and never shown.
 * @typedef {object} Topic
 * @property {string} id
 * @property {number} level
 * @property {Scope} scope
 * @property {string[]} disc
 * @property {boolean} core
 * @property {string} what
 * @property {string} [detail]
 * @property {string} why
 * @property {string} ask
 * @property {Resource[]} how
 * @property {string} src
 */

/** @type {Model} */
const model = await (await fetch(new URL("../model.json", import.meta.url))).json();

export const { LEVELS, DISC, PATH, STEPS } = model;

/** @type {{ k: Scope, name: string, lede: string }[]} */
export const SCOPES = /** @type {any} */ (model.SCOPES);

/** @type {Topic[]} */
export const TOPICS = /** @type {any} */ (model.TOPICS);

/** @param {string} k @returns {k is Disc} */
export const isDisc = (k) => Object.hasOwn(PATH, k);

/** @param {Disc} k */
export const discName = (k) => DISC.find((d) => d.k === k)?.name ?? k;

/** @param {number} k */
export const levelByK = (k) => LEVELS.find((l) => l.k === k) ?? LEVELS[0];

/**
 * Topics a discipline sees: the shared ones plus its own. General sees only the shared ones.
 * @param {Disc} disc
 */
export const topicsOf = (disc) =>
  TOPICS.filter((t) => t.disc.includes("all") || t.disc.includes(disc));

/** @param {string} id */
export const topicById = (id) => TOPICS.find((t) => t.id === id) ?? null;
