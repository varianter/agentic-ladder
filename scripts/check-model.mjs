// Checks src/model.json, the model the page imports as is. There is no build: src/ is the site.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const model = JSON.parse(readFileSync(join(root, "src/model.json"), "utf8"));

const problems = [];
for (const key of ["LEVELS", "SCOPES", "DISC", "STEPS", "PATH", "TOPICS"]) {
  if (!model[key]) problems.push(`missing ${key}`);
}
if (problems.length) fail();

const levels = model.LEVELS.map((l) => l.k);
const scopes = model.SCOPES.map((s) => s.k);
const discs = model.DISC.map((d) => d.k);
const n = levels.length;

// Every discipline has one self step and one test per level. Team and client steps are shared.
for (const scope of ["team", "org"])
  if (model.STEPS[scope]?.length !== n) problems.push(`STEPS.${scope} needs ${n} steps`);
for (const k of discs) {
  const path = model.PATH[k];
  if (!path) {
    problems.push(`PATH.${k} missing`);
    continue;
  }
  if (path.self?.length !== n) problems.push(`PATH.${k}.self needs ${n} steps`);
  if (path.tests?.length !== n) problems.push(`PATH.${k}.tests needs ${n} tests`);
}

// Topic ids are saved in viewers' browsers, so they must be unique and never reused.
const ids = new Set();
for (const t of model.TOPICS) {
  const at = `topic ${t.id ?? "(no id)"}`;
  if (!/^[a-z0-9-]+$/.test(t.id ?? "")) problems.push(`${at}: id must be a lowercase slug`);
  if (ids.has(t.id)) problems.push(`${at}: duplicate id`);
  ids.add(t.id);
  if (!levels.includes(t.level)) problems.push(`${at}: unknown level ${t.level}`);
  if (!scopes.includes(t.scope)) problems.push(`${at}: unknown scope ${t.scope}`);
  if (!Array.isArray(t.disc) || !t.disc.length) problems.push(`${at}: disc must be a list`);
  for (const d of t.disc ?? [])
    if (d !== "all" && !discs.includes(d)) problems.push(`${at}: unknown discipline ${d}`);
  for (const f of ["what", "why", "ask", "src"])
    if (typeof t[f] !== "string" || !t[f]) problems.push(`${at}: needs ${f}`);
  if (typeof t.core !== "boolean") problems.push(`${at}: core must be true or false`);
  if (!Array.isArray(t.how)) problems.push(`${at}: how must be a list`);
  for (const r of t.how ?? []) {
    if (!r.text) problems.push(`${at}: every resource needs text`);
    if (r.url && !r.url.startsWith("https://")) problems.push(`${at}: resource url must be https`);
  }
}

// Every discipline should see something at every level and scope.
for (const d of discs)
  for (const l of levels)
    for (const s of scopes) {
      const seen = model.TOPICS.some(
        (t) => t.level === l && t.scope === s && (t.disc.includes("all") || t.disc.includes(d)),
      );
      if (!seen) problems.push(`${d} has no topics at level ${l}, ${s}`);
    }

if (problems.length) fail();

const missing = model.TOPICS.filter((t) => !t.how.length).length;
console.log(`Model OK (${model.TOPICS.length} topics, ${missing} without a resource).`);

function fail() {
  console.error(`Model check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
