// The model, fetched from src/model.json when the module loads, with each topic's learning
// resources from src/resources/<id>.json. No build step.

/** @typedef {typeof import("../model.json")} Model */
/** @typedef {keyof Model["PATH"]} Disc */
/** @typedef {"self" | "team" | "org"} Scope */
/**
 * One way to learn a topic. `kind` and `lang` are optional labels, `lang` defaults to "en".
 * `disc` limits it to one discipline of the topic; without it, every discipline sees it.
 * @typedef {object} Resource
 * @property {string} text
 * @property {string} [url]
 * @property {keyof typeof KINDS} [kind]
 * @property {string} [lang]
 * @property {string} [disc]
 */

/**
 * One thing to train on. `disc` holds discipline keys, or "all" for every discipline.
 * `core` topics show first; the rest fold away under "More at this level". `src` is the
 * interview numbers behind the topic, kept for review and never shown. `how` is loaded from the
 * topic's resource file, and is empty when that file fails to load.
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

/** Where people propose resources: GitHub's editor on the topic's file, which opens a PR. */
const REPO = "https://github.com/varianter/agentic-ladder";
const BRANCH = "main";

/** @param {string} id */
export const editUrl = (id) => `${REPO}/edit/${BRANCH}/src/resources/${id}.json`;

/** Resource kinds and how they read on the page. */
export const KINDS = {
  course: "Course",
  article: "Article",
  video: "Video",
  book: "Book",
  tool: "Tool",
  talk: "Talk",
  podcast: "Podcast",
  example: "Example",
};

/** @type {Model} */
const model = await (await fetch(new URL("../model.json", import.meta.url))).json();

/**
 * @param {string} id
 * @returns {Promise<Resource[]>}
 */
async function loadResources(id) {
  try {
    const res = await fetch(new URL(`../resources/${id}.json`, import.meta.url));
    if (!res.ok) return [];
    return (await res.json()).resources ?? [];
  } catch {
    return [];
  }
}

export const { LEVELS, DISC, PATH, STEPS } = model;

/** @type {{ k: Scope, name: string, lede: string }[]} */
export const SCOPES = /** @type {any} */ (model.SCOPES);

/** @type {Topic[]} */
export const TOPICS = await Promise.all(
  /** @type {any[]} */ (model.TOPICS).map(async (t) => ({ ...t, how: await loadResources(t.id) })),
);

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
