// Checks src/model.json and src/resources/, which the page loads as is. There is no build:
// src/ is the site.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const model = JSON.parse(readFileSync(join(root, "src/model.json"), "utf8"));

// src/model.schema.json describes the shape for people and LLMs. The checks below it cover what
// a schema cannot: links between fields, one step per level, and a file per topic.
const ajv = new Ajv({ allErrors: true });
ajv.addSchema(JSON.parse(readFileSync(join(root, "src/model.schema.json"), "utf8")), "model");
const validateModel = ajv.getSchema("model");
const validateResources = ajv.compile({ $ref: "model#/$defs/resourceFile" });
/** @param {import("ajv").ErrorObject[] | null | undefined} errors @param {string} at */
const schemaProblems = (errors, at) =>
  (errors ?? []).map((e) => `${at}${e.instancePath || "/"} ${e.message}`);

const problems = [];
if (!validateModel?.(model)) problems.push(...schemaProblems(validateModel?.errors, "model.json"));
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
  if ("how" in t) problems.push(`${at}: resources belong in src/resources/${t.id}.json`);
}

// Every topic has exactly one resource file, src/resources/<id>.json. The page links GitHub's
// editor straight to it, so a missing file is a broken link.
const KINDS = ["course", "article", "video", "book", "tool", "talk", "podcast", "example"];
const CONTRIBUTING = "https://github.com/varianter/agentic-ladder/blob/main/CONTRIBUTING.md";
const resourceDir = join(root, "src/resources");
const files = new Set(readdirSync(resourceDir).filter((f) => f.endsWith(".json")));
let missing = 0;
for (const t of model.TOPICS) {
  const file = `${t.id}.json`;
  const at = `src/resources/${file}`;
  if (!files.delete(file)) {
    problems.push(`${at}: missing, every topic needs a resource file`);
    continue;
  }
  let data;
  try {
    data = JSON.parse(readFileSync(join(resourceDir, file), "utf8"));
  } catch (e) {
    problems.push(`${at}: not valid JSON (${e.message})`);
    continue;
  }
  if (!validateResources(data)) problems.push(...schemaProblems(validateResources.errors, at));
  const about = `Learning resources for the topic "${t.what}" (${t.id}). Rules: ${CONTRIBUTING}`;
  if (data.about !== about) problems.push(`${at}: about must be ${JSON.stringify(about)}`);
  if (!Array.isArray(data.resources)) {
    problems.push(`${at}: resources must be a list`);
    continue;
  }
  if (!data.resources.length) missing++;
  for (const [i, r] of data.resources.entries()) {
    const rat = `${at} resource ${i + 1}`;
    for (const k of Object.keys(r))
      if (!["text", "url", "kind", "lang", "disc"].includes(k))
        problems.push(`${rat}: unknown field ${k}`);
    if (typeof r.text !== "string" || !r.text) problems.push(`${rat}: needs text`);
    if (r.url !== undefined && !/^https:\/\/\S+$/.test(r.url))
      problems.push(`${rat}: url must be https`);
    if (r.kind !== undefined && !KINDS.includes(r.kind))
      problems.push(`${rat}: kind must be one of ${KINDS.join(", ")}`);
    if (r.lang !== undefined && !/^[a-z]{2}$/.test(r.lang))
      problems.push(`${rat}: lang must be a two-letter code like en, no or sv`);
    if (r.disc !== undefined) {
      const allowed = t.disc.includes("all") ? discs.filter((d) => d !== "general") : t.disc;
      if (!allowed.includes(r.disc))
        problems.push(`${rat}: disc must be one of the topic's disciplines: ${allowed.join(", ")}`);
    }
  }
}
for (const f of files) problems.push(`src/resources/${f}: no topic has the id ${f.slice(0, -5)}`);

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

console.log(`Model OK (${model.TOPICS.length} topics, ${missing} without a resource).`);

function fail() {
  console.error(`Model check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
