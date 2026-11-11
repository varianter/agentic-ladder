// The model, fetched from src/model.json when the module loads. No build step.

/** @typedef {typeof import("../model.json")} Model */
/** @typedef {keyof Model["PATH"]} Disc */
/** Topic rows exist for levels 1 to 3. @typedef {"1" | "2" | "3"} TopicLevel */
/** `[topic, what goes wrong without it, ask yourself, sources]` @typedef {string[]} Row */

/** @type {Model} */
const model = await (await fetch(new URL("../model.json", import.meta.url))).json();

export const { LEVELS, DISC, PATH, GAPS } = model;

/** @type {Partial<Record<Disc, Partial<Record<TopicLevel, Row[]>>>>} */
export const ROWS = model.ROWS;

/** @param {string} k @returns {k is Disc} */
export const isDisc = (k) => Object.hasOwn(PATH, k);

/** @param {Disc} k */
export const discName = (k) => DISC.find((d) => d.k === k)?.name ?? k;

export const topicCount = Object.values(ROWS)
  .flatMap((byLevel) => Object.values(byLevel))
  .reduce((n, rows) => n + rows.length, 0);

/**
 * Looks up a topic by its saved id, `${disc}-${level}-${index}`.
 * @param {string} id
 */
export const topicById = (id) => {
  const [disc, level, index] = id.split("-");
  if (!isDisc(disc)) return null;
  const row = ROWS[disc]?.[/** @type {TopicLevel} */ (level)]?.[Number(index)];
  return row ? { topic: row[0], disc, level: Number(level) } : null;
};
