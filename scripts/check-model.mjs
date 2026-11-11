// Checks src/model.json, the model the page imports as is. There is no build: src/ is the site.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const model = JSON.parse(read("src/model.json"));
const required = ["LEVELS", "DISC", "PATH", "ROWS", "GAPS"];
for (const key of required) {
  if (!model[key]) throw new Error(`src/model.json is missing ${key}`);
}

// Every discipline needs steps, tests and gaps for all four levels, and rows for levels 1 to 3.
const problems = [];
for (const { k } of model.DISC) {
  const path = model.PATH[k];
  if (!path) {
    problems.push(`PATH.${k} missing`);
    continue;
  }
  if (path.steps.length !== 4) problems.push(`PATH.${k}.steps needs 4 levels`);
  if (path.tests.length !== 4) problems.push(`PATH.${k}.tests needs 4 levels`);
  path.steps.forEach((s, i) => {
    if (s.length !== 3) problems.push(`PATH.${k}.steps[${i}] needs 3 steps`);
  });
  for (const lvl of [0, 1, 2, 3])
    if (!model.GAPS[k]?.[lvl]) problems.push(`GAPS.${k}.${lvl} missing`);
  for (const lvl of [1, 2, 3]) {
    (model.ROWS[k]?.[lvl] ?? []).forEach((row, i) => {
      if (row.length !== 4)
        problems.push(`ROWS.${k}.${lvl}[${i}] needs [topic, without it, ask yourself, sources]`);
    });
  }
}
if (problems.length) {
  console.error(`Model check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

const rows = Object.values(model.ROWS).reduce(
  (a, o) => a + Object.values(o).reduce((b, x) => b + x.length, 0),
  0,
);
console.log(`Model OK (${rows} topics).`);
