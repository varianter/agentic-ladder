// A tagged template for building markup. Interpolated values are escaped unless wrapped in
// safe(), arrays are joined, and null, undefined and false render as nothing.

class Safe {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Marks a string as already safe markup. */
export const safe = (value) => new Safe(String(value));

const toMarkup = (value) => {
  if (value == null || value === false) return "";
  if (value instanceof Safe) return value.value;
  if (Array.isArray(value)) return value.map(toMarkup).join("");
  return String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);
};

/** html`<p>${text}</p>` returns safe markup with every value escaped. */
export const html = (strings, ...values) =>
  safe(strings.reduce((out, part, i) => out + toMarkup(values[i - 1]) + part));

/** Renders markup into an element. */
export const mount = (el, markup) => {
  el.innerHTML = toMarkup(markup);
};
