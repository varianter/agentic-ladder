// Runs axe-core (WCAG 2.1 A and AA, plus best practice) on the built page in headless Chrome,
// at desktop width in light mode and phone width in dark mode, after answering a few questions.
// Also fails if the page scrolls sideways.
//
// Needs Chrome or Chromium. Set CHROME_PATH if it is not at a standard location.
import puppeteer from "puppeteer-core";
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const built = join(root, "dist/agentic-ladder.html");
if (!existsSync(built)) {
  console.error("Run `npm run build` first.");
  process.exit(1);
}

const candidates = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome found. Set CHROME_PATH to your Chrome or Chromium binary.");
  process.exit(1);
}

// Wrap the page the way the artifact host does.
mkdirSync(join(root, ".cache"), { recursive: true });
const wrapped = join(root, ".cache/a11y-page.html");
writeFileSync(
  wrapped,
  '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' +
    readFileSync(built, "utf8") +
    "</body></html>"
);

const browser = await puppeteer.launch({ executablePath, args: ["--no-sandbox"] });
let failed = false;

for (const [width, scheme] of [[1200, "light"], [390, "dark"]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
  await page.goto(pathToFileURL(wrapped).href, { waitUntil: "load" });

  // Put the page in a realistic state: developer at level 2 with one topic rated.
  await page.click("#disc-dev");
  await page.click("#q0-yes");
  await page.click("#q1-yes");
  await page.click("#q2-no");
  await page.click("#r-dev-2-0-new");

  await page.addScriptTag({ path: require.resolve("axe-core") });
  const result = await page.evaluate(() =>
    axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] })
  );
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);

  const label = `${width}px ${scheme}`;
  if (result.violations.length) {
    failed = true;
    console.log(`${label}: ${result.violations.length} violation types`);
    for (const v of result.violations) {
      console.log(`  ${v.id} (${v.impact}): ${v.help}`);
      for (const n of v.nodes.slice(0, 3)) console.log(`    ${n.target.join(" ")}`);
    }
  } else {
    console.log(`${label}: no violations`);
  }
  if (scrollWidth > width) {
    failed = true;
    console.log(`${label}: page scrolls sideways (${scrollWidth}px wide)`);
  }
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
