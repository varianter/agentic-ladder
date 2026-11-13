// Entry point: loads state, wires the actions to it and renders the page with lit-html.
import { render } from "lit-html";
import { discName, isDisc, levelByK } from "./model.js";
import { decode, ladderText, merge, promptText } from "./share.js";
import { loadState, saveState } from "./store.js";
import { initTheme } from "./theme.js";
import * as view from "./views.js";

/** @param {string} id */
const $ = (id) => /** @type {HTMLElement} */ (document.getElementById(id));
const state = loadState(isDisc);
/** @type {view.ImportState} */
const imp = { open: false, text: "", error: "", preview: null, from: "paste" };

/** @type {view.Actions} */
const act = {
  pickDisc: (disc) =>
    update(
      () => {
        state.disc = disc;
        state.view = null;
      },
      () => `${discName(state.disc)}. ${view.verdictText(state)}`,
    ),
  answer: (level, answer) =>
    update(
      () => {
        state.quiz[state.disc] = { ...state.quiz[state.disc], [level]: answer };
        state.view = null;
      },
      () => view.verdictText(state),
    ),
  rate: (id, rating) =>
    update(() => {
      state.rate[id] = rating;
    }),
  showLevel: (level) =>
    update(
      () => {
        state.view = level;
      },
      () => `Showing level ${level}, ${levelByK(level).name}.`,
      { animate: true },
    ),
  previewImport: (text) => {
    imp.text = text;
    imp.preview = decode(text);
    imp.from = "paste";
    imp.error = imp.preview
      ? ""
      : "No ratings found. Paste a ratings link or the JSON from the AI.";
    draw();
    if (imp.preview) focusLater("import-title");
    else {
      focusLater("import-text");
      announce(imp.error);
    }
  },
  confirmImport: () => {
    const blob = imp.preview;
    if (!blob) return;
    const n = Object.keys(blob.rate).length;
    closeImport();
    update(
      () => merge(state, blob),
      `Imported. ${discName(state.disc)}. ${view.verdictText(state)}`,
    );
    $("sharemsg").textContent = `Imported ${n} ${n === 1 ? "rating" : "ratings"}.`;
    $("import-open").focus();
  },
  cancelImport: () => {
    closeImport();
    draw();
    $("sharemsg").textContent = "";
    announce("Import cancelled.");
    $("import-open").focus();
  },
};

/** Closes the import box and drops a #ratings= link from the address. */
function closeImport() {
  Object.assign(imp, { open: false, text: "", error: "", preview: null });
  if (location.hash.startsWith("#ratings="))
    history.replaceState(null, "", location.pathname + location.search);
}

/**
 * Moves focus after lit-html has drawn the element.
 * @param {string} id
 */
function focusLater(id) {
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

function draw() {
  render(view.disciplines(state, act), $("disc"));
  render(view.quiz(state, act), $("quiz"));
  render(view.verdictText(state), $("verdict"));
  render(view.ladder(state, act), $("ladder"));
  render(view.panel(state, act), $("panel"));
  render(view.summary(state), $("summary"));
  render(view.plan(state), $("plan"));
  render(view.planMeta(state), $("plan-meta"));
  render(view.importBox(state, imp, act), $("import"));
  $("import-open").setAttribute("aria-expanded", String(imp.open || !!imp.preview));
  ladderText(state.disc);
}

/**
 * Animates a redraw where the browser supports view transitions and the viewer allows motion.
 * Elsewhere it just redraws. Clicks do not reach the page while a transition runs, so use this
 * only where the viewer stops to read, not between quick answers.
 * @param {() => void} redraw
 */
function transition(redraw) {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches)
    return redraw();
  // A transition started before this one finishes skips it and rejects `ready`. The redraw
  // still runs, so there is nothing to handle.
  document.startViewTransition(redraw).ready.catch(() => {});
}

/**
 * @param {() => void} change
 * @param {string | (() => string)} [message]
 * @param {{ animate?: boolean }} [options] Animate the redraw with a view transition.
 */
function update(change, message, { animate = false } = {}) {
  change();
  saveState(state);
  if (animate) transition(draw);
  else draw();
  if (message) announce(typeof message === "function" ? message() : message);
}

/**
 * Clears the live region first, so a message the same as the last one is read again.
 * @param {string} message
 */
function announce(message) {
  const status = $("status");
  status.textContent = "";
  setTimeout(() => {
    status.textContent = message;
  }, 50);
}

// Clearing takes two presses. The first arms the button and colors it as a warning.
$("reset").addEventListener("click", (e) => {
  const button = /** @type {HTMLButtonElement} */ (e.currentTarget);
  const mode = $("reset-mode");
  if (button.dataset.armed) {
    update(() => {
      state.rate = {};
      state.quiz = {};
      state.view = null;
    }, "All answers cleared.");
    delete button.dataset.armed;
    button.dataset.variant = "outlined";
    button.textContent = "Clear my answers";
    mode.setAttribute("palette", "grey");
    $("resetmsg").textContent = "Cleared.";
  } else {
    button.dataset.armed = "1";
    button.dataset.variant = "filled";
    button.textContent = "Press again to clear";
    mode.setAttribute("palette", "coral");
    $("resetmsg").textContent = "This removes all your answers.";
    announce("Press again to clear all your answers.");
  }
});

// Save as PDF goes through the print dialog. The print is always light, and the title
// becomes the suggested file name.
$("save").addEventListener("click", () => print());
const page = { title: document.title, scheme: document.documentElement.dataset.colorScheme };
addEventListener("beforeprint", () => {
  page.title = document.title;
  page.scheme = document.documentElement.dataset.colorScheme;
  document.title = `Agentic training plan - ${discName(state.disc)}`;
  render(view.planMeta(state), $("plan-meta"));
  document.documentElement.dataset.colorScheme = "light";
});
addEventListener("afterprint", () => {
  document.title = page.title;
  if (page.scheme) document.documentElement.dataset.colorScheme = page.scheme;
  else delete document.documentElement.dataset.colorScheme;
});

// Copy for AI: a starter prompt, the ladder for the discipline and the viewer's answers. draw()
// fetches the ladder ahead, so the copy runs while the click still counts as the viewer's.
$("copy-ai").addEventListener("click", async () => {
  const msg = $("sharemsg");
  try {
    await navigator.clipboard.writeText(promptText(state, await ladderText(state.disc)));
    msg.textContent = "Copied. Paste it into an AI chat.";
  } catch {
    msg.textContent = "Could not copy. Your browser blocked the clipboard.";
  }
  announce(msg.textContent);
});

$("import-open").addEventListener("click", () => {
  if (imp.open || imp.preview) {
    act.cancelImport();
    return;
  }
  imp.open = true;
  $("sharemsg").textContent = "";
  draw();
  focusLater("import-text");
});

/** Shows what a #ratings= link in the address would change. */
function readHash() {
  if (!location.hash.startsWith("#ratings=")) return;
  imp.text = location.href;
  imp.preview = decode(location.hash);
  imp.from = "link";
  imp.open = !imp.preview;
  imp.error = imp.preview ? "" : "This link has no ratings the page can read.";
  $("sharemsg").textContent = "";
  draw();
  focusLater(imp.preview ? "import-title" : "import-text");
}
addEventListener("hashchange", readHash);

initTheme(/** @type {HTMLSelectElement} */ ($("theme")));
draw();
readHash();
