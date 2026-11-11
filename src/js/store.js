// Viewer state, kept in this browser only. The key and shape match earlier versions of the
// page so saved ratings keep working.
const KEY = "agentic-ladder-v1";
const THEME_KEY = "agentic-ladder-theme";

const defaults = () => ({ disc: "all", view: null, quiz: {}, rate: {}, core: true });

export function loadState(isDisc) {
  const state = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (saved && typeof saved === "object") Object.assign(state, saved);
  } catch {}
  if (!isDisc(state.disc)) state.disc = "all";
  return state;
}

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

export function saveTheme(theme) {
  try {
    if (theme === "light") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
