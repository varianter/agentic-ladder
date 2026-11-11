// Entry point: loads state, renders the page and handles input through delegated listeners.
import { mount } from "./html.js";
import { discName, LEVELS, PATH } from "./model.js";
import { loadState, saveState } from "./store.js";
import { initTheme } from "./theme.js";
import * as view from "./views.js";

const $ = (id) => document.getElementById(id);
const state = loadState((k) => Boolean(PATH[k]));

function render() {
  // Re-rendering replaces the controls, so put focus back on the one the user acted on.
  const active = document.activeElement?.id;
  mount($("disc"), view.disciplines(state));
  mount($("quiz"), view.quiz(state));
  $("verdict").textContent = view.verdictText(state);
  mount($("ladder"), view.ladder(state));
  mount($("panel"), view.panel(state));
  mount($("summary"), view.summary(state));
  mount($("unk"), view.unknowns(state));
  if (active) {
    const el = $(active);
    if (el && el !== document.activeElement) el.focus({ preventScroll: true });
  }
}

function update(change, message) {
  change();
  saveState(state);
  render();
  if (message) announce(typeof message === "function" ? message() : message);
}

function announce(message) {
  const status = $("status");
  status.textContent = "";
  setTimeout(() => {
    status.textContent = message;
  }, 50);
}

document.addEventListener("change", (e) => {
  const t = e.target;
  switch (t.dataset?.kind) {
    case "disc":
      return update(
        () => {
          state.disc = t.value;
          state.view = null;
        },
        () => `${discName(state.disc)}. ${view.verdictText(state)}`,
      );
    case "quiz":
      return update(
        () => {
          state.quiz[state.disc] ??= {};
          state.quiz[state.disc][t.dataset.i] = t.value;
          state.view = null;
        },
        () => view.verdictText(state),
      );
    case "rate":
      return update(() => {
        state.rate[t.dataset.id] = t.value;
      });
  }
  if (t.id === "coretoggle") {
    update(
      () => {
        state.core = t.checked;
      },
      t.checked ? "Shared core topics shown." : "Shared core topics hidden.",
    );
  }
});

document.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  if (button.dataset.l != null) {
    update(
      () => {
        state.view = Number(button.dataset.l);
      },
      () => `Showing level ${state.view}, ${LEVELS[state.view].name}.`,
    );
  } else if (button.id === "reset") {
    reset(button);
  }
});

// Clearing takes two presses. The first arms the button and colors it as a warning.
function reset(button) {
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
}

initTheme($("theme"));
render();
