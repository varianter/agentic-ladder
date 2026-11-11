// Entry point: loads state, wires the actions to it and renders the page with lit-html.
import { render } from "lit-html";
import { discName, isDisc, LEVELS } from "./model.js";
import { loadState, saveState } from "./store.js";
import { initTheme } from "./theme.js";
import * as view from "./views.js";

/** @param {string} id */
const $ = (id) => /** @type {HTMLElement} */ (document.getElementById(id));
const state = loadState(isDisc);

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
      () => `Showing level ${level}, ${LEVELS[level].name}.`,
      { animate: true },
    ),
  showCore: (on) =>
    update(
      () => {
        state.core = on;
      },
      on ? "Shared core topics shown." : "Shared core topics hidden.",
    ),
};

function draw() {
  render(view.disciplines(state, act), $("disc"));
  render(view.quiz(state, act), $("quiz"));
  render(view.verdictText(state), $("verdict"));
  render(view.ladder(state, act), $("ladder"));
  render(view.panel(state, act), $("panel"));
  render(view.summary(state), $("summary"));
  render(view.unknowns(state), $("unk"));
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

initTheme(/** @type {HTMLSelectElement} */ ($("theme")));
draw();
