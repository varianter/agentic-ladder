// Viewer state, kept in this browser only. Topic ids are stable slugs, so ratings survive
// reordering. v2 started with the three-level model; v1 ratings point at old topics.
const KEY = "agentic-ladder-v2";
const THEME_KEY = "agentic-ladder-theme";

/**
 * @typedef {object} State
 * @property {import("./model.js").Disc} disc The chosen discipline.
 * @property {number | null} view The level (1 to 3) the viewer clicked, or null to follow the tests.
 * @property {Partial<Record<string, Record<string, "yes" | "no">>>} quiz Test answers per discipline, by level.
 * @property {Record<string, "do" | "know" | "new">} rate Ratings by topic id.
 */

/** @returns {State} */
const defaults = () => ({ disc: "general", view: null, quiz: {}, rate: {} });

/** @param {(k: string) => k is import("./model.js").Disc} isDisc */
export function loadState(isDisc) {
  const state = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (saved && typeof saved === "object") Object.assign(state, saved);
  } catch {}
  if (!isDisc(state.disc)) state.disc = "general";
  return state;
}

/** @param {State} state */
export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "dark" || t === "system" ? t : "light";
  } catch {
    return "light";
  }
}

/** @param {string} theme */
export function saveTheme(theme) {
  try {
    if (theme === "light") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
