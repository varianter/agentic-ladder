// The model, imported as a JSON module. The build copies data/model.json next to the page.
import model from "../model.json" with { type: "json" };

export const { LEVELS, DISC, PATH, ROWS, GAPS } = model;

export const discName = (k) => DISC.find((d) => d.k === k).name;

export const topicCount = Object.values(ROWS)
  .flatMap((byLevel) => Object.values(byLevel))
  .reduce((n, rows) => n + rows.length, 0);

/** Looks up a topic by its saved id, `${disc}-${level}-${index}`. */
export const topicById = (id) => {
  const [disc, level, index] = id.split("-");
  const row = ROWS[disc]?.[level]?.[Number(index)];
  return row ? { topic: row[0], disc, level: Number(level) } : null;
};
