// Writes the files LLMs read: src/llms.txt, src/ladder.md and src/ladder/<disc>.md, made from
// src/model.json and src/resources/. The output is committed, since src/ is deployed as is.
// With --check it writes nothing and fails when a committed file is stale.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://agentic-ladder.raa.academy/";
const REPO = "https://github.com/varianter/agentic-ladder";
const NOTE = `Made from ${REPO}/blob/main/src/model.json by scripts/build-llm.mjs. Do not edit by hand.`;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const model = JSON.parse(readFileSync(join(src, "model.json"), "utf8"));
const { LEVELS, SCOPES, DISC, STEPS, PATH, TOPICS } = model;

/** @type {Record<string, { text: string, url?: string, kind?: string, lang?: string, disc?: string }[]>} */
const resources = Object.fromEntries(
  TOPICS.map((t) => [
    t.id,
    JSON.parse(readFileSync(join(src, "resources", `${t.id}.json`), "utf8")).resources ?? [],
  ]),
);

const discName = (k) => DISC.find((d) => d.k === k)?.name ?? k;
const topicsOf = (disc) => TOPICS.filter((t) => t.disc.includes("all") || t.disc.includes(disc));
const discsOf = (t) =>
  t.disc.includes("all") ? "all disciplines" : t.disc.map(discName).join(", ");

// The rating format the page imports and exports. Keep in step with src/js/share.js.
const RATINGS = `## Ratings

The page saves answers in the viewer's browser. They move to and from an AI as JSON:

\`\`\`json
{ "v": 1, "disc": "dev", "quiz": { "dev": { "1": "yes", "2": "no" } }, "rate": { "start-small": "do" } }
\`\`\`

- \`disc\`: the discipline key: ${DISC.map((d) => `\`${d.k}\` (${d.name})`).join(", ")}.
- \`quiz\`: the "You are there when" tests per discipline, by level. \`"yes"\` or \`"no"\`. The level to work on is the first one not answered \`"yes"\`.
- \`rate\`: topic ratings by topic id. \`"do"\` is "I do this", \`"know"\` is "Know of it", \`"new"\` is "Never heard of it".
- Leave out what is not known. Never invent topic ids.
- To hand ratings back, link to \`${SITE}#ratings=<encoded>\`. Encode the JSON as UTF-8 base64url without padding if you can run code. Otherwise percent-encode the JSON (\`encodeURIComponent\`). The page also takes the raw JSON pasted into "Import ratings". It shows what will change before it saves.`;

/** @param {string} id @param {string} disc */
function resourceLines(id, disc) {
  const list = resources[id].filter((r) => disc === "general" || !r.disc || r.disc === disc);
  if (!list.length) return ["- Resources: none yet."];
  return [
    "- Resources:",
    ...list.map((r) => {
      const label = [
        r.kind,
        r.lang && r.lang !== "en" ? `lang ${r.lang}` : "",
        disc === "general" && r.disc ? `${discName(r.disc)} track` : "",
      ]
        .filter(Boolean)
        .join(", ");
      const text = r.url ? `[${r.text}](${r.url})` : r.text;
      return `  - ${text}${label ? ` (${label})` : ""}`;
    }),
  ];
}

/** @param {object} t @param {string} disc */
function topicBlock(t, disc) {
  return [
    `#### ${t.what}`,
    "",
    `- id: \`${t.id}\`${t.core ? ", core" : ""}. For ${discsOf(t)}.`,
    ...(t.detail ? [`- What: ${t.detail}`] : []),
    `- Why: ${t.why}`,
    `- Ask yourself: ${t.ask}`,
    ...resourceLines(t.id, disc),
    "",
  ];
}

/**
 * The ladder for one discipline, or for all of them when `disc` is null.
 * @param {string | null} disc
 */
function ladder(disc) {
  const name = disc ? discName(disc) : "All disciplines";
  const out = [
    `# Variant Agentic Ladder: ${name}`,
    "",
    "> Variant's roadmap for getting good at agentic AI in product development. Three levels, and at each level what to do for yourself, your team and the client. Built from interviews with Variant consultants.",
    "",
    `Interactive page: ${SITE}. Index: ${SITE}llms.txt. ${NOTE}`,
    "",
    "## How it works",
    "",
    `- Levels: ${LEVELS.map((l) => `${l.k} ${l.name} (${l.idea})`).join(" ")}`,
    `- Scopes at every level: ${SCOPES.map((s) => `${s.name} (\`${s.k}\`): ${s.lede}`).join(" ")} "The client" means the client's organization.`,
    '- Each level has a step for yourself and a "You are there when" test per discipline, and shared steps for the team and the client.',
    "- Topics are what to train on. Core topics come first. Each has a stable id, why it matters and a question to ask yourself.",
    "- To find a level: answer the tests from level 1 up. The first one that is not yet true is the level to work on. Passing all three means: lift your team and the client.",
    "- A training plan: topics at the person's level they have never heard of first, then ones they know of but do not do yet. Pick two and try them this week.",
    "",
    RATINGS,
    "",
  ];
  const discs = disc ? [disc] : DISC.map((d) => d.k);
  for (const [i, l] of LEVELS.entries()) {
    out.push(`## Level ${l.k}: ${l.name}`, "", `${l.lvl}. ${l.idea}`, "");
    for (const d of discs) {
      const prefix = disc ? "" : `${discName(d)}: `;
      out.push(`- ${prefix}Step for yourself: ${PATH[d].self[i]}`);
      out.push(`- ${prefix}You are there when: ${PATH[d].tests[i]}.`);
    }
    out.push(
      `- Step for your team: ${STEPS.team[i]}`,
      `- Step for the client: ${STEPS.org[i]}`,
      "",
    );
    for (const s of SCOPES) {
      const list = (disc ? topicsOf(disc) : TOPICS)
        .filter((t) => t.level === l.k && t.scope === s.k)
        .sort((a, b) => Number(b.core) - Number(a.core));
      out.push(`### Level ${l.k}, ${s.name}`, "", s.lede, "");
      for (const t of list) out.push(...topicBlock(t, disc ?? "general"));
    }
  }
  return `${out.join("\n").trimEnd()}\n`;
}

function llmsTxt() {
  return `# Variant Agentic Ladder

> Variant's roadmap for getting good at agentic AI in product development, per discipline. Three levels (${LEVELS.map((l) => l.name).join(", ")}), and at each level what to do for yourself, your team and the client. Built from interviews with Variant consultants.

Use it to find someone's level, make a training plan, answer questions about a topic, or plan for a team or a client. Read the file for the person's discipline. If you do not know it, ask. Answer in the user's language. Topic ids stay in English.

## Ladder

${DISC.map((d) => `- [${d.name}](${SITE}ladder/${d.k}.md): ${d.k === "general" ? "only the topics shared by every discipline" : `shared topics plus ${d.name.toLowerCase()} topics`}`).join("\n")}
- [Everything](${SITE}ladder.md): all disciplines in one file

## Data

- [model.json](${SITE}model.json): the model as JSON
- [model.schema.json](${SITE}model.schema.json): what every field in model.json means
- [resources/<id>.json](${REPO}/tree/main/src/resources): learning resources per topic

## Ratings

The page imports and exports a person's answers. Format and hand-back link are under "Ratings" in every ladder file. Link back with \`${SITE}#ratings=<base64url JSON>\`.

## Optional

- [Interactive page](${SITE})
- [Source and contributing](${REPO})
`;
}

/** @type {Record<string, string>} */
const files = {
  "llms.txt": llmsTxt(),
  "ladder.md": ladder(null),
  ...Object.fromEntries(DISC.map((d) => [`ladder/${d.k}.md`, ladder(d.k)])),
};

const check = process.argv.includes("--check");
const stale = [];
for (const [path, text] of Object.entries(files)) {
  const file = join(src, path);
  let old = null;
  try {
    old = readFileSync(file, "utf8");
  } catch {}
  if (old === text) continue;
  if (check) stale.push(`src/${path}`);
  else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
  }
}
// A file in src/ladder/ for a discipline that no longer exists is stale too.
let ladderFiles = [];
try {
  ladderFiles = readdirSync(join(src, "ladder"));
} catch {}
for (const f of ladderFiles)
  if (!(`ladder/${f}` in files)) stale.push(`src/ladder/${f} (remove it)`);

if (stale.length) {
  if (check) {
    console.error(`LLM files are stale. Run pnpm build:llm.\n- ${stale.join("\n- ")}`);
    process.exit(1);
  }
  console.error(`Remove by hand:\n- ${stale.join("\n- ")}`);
  process.exit(1);
}
console.log(check ? "LLM files OK." : `LLM files written (${Object.keys(files).length}).`);
