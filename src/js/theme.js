// Light by default, or dark, or follow the system. Varde reads data-color-scheme on <html>.
import { loadTheme, saveTheme } from "./store.js";

/** @param {HTMLSelectElement} select */
export function initTheme(select) {
  /** @param {string} theme */
  const apply = (theme) => {
    if (theme === "system") delete document.documentElement.dataset.colorScheme;
    else document.documentElement.dataset.colorScheme = theme;
  };
  select.value = loadTheme();
  apply(select.value);
  select.addEventListener("change", () => {
    apply(select.value);
    saveTheme(select.value);
  });
}
