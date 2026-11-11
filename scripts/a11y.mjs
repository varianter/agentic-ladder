// Runs axe-core (WCAG 2.1 A and AA, plus best practice) on the page in headless Chrome,
// at desktop width in light mode and phone width in dark mode, after answering a few questions.
// Also fails if the page scrolls sideways.
//
// Needs Chrome or Chromium (set CHROME_PATH if it is not at a standard location), and network
// access, since the page loads Varde from its CDN.

import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import sirv from "sirv";

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

// Serve src/, the site as deployed, on a free port.
const server = createServer(sirv(fileURLToPath(new URL("../src", import.meta.url)), { dev: true }));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await puppeteer.launch({ executablePath, args: ["--no-sandbox"] });
let failed = false;

for (const [width, scheme] of [
  [1200, "light"],
  [390, "dark"],
]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("requestfailed", (req) => errors.push(`failed to load ${req.url()}`));
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("#disc-dev");
  // The page defaults to light. Pick the theme the way a viewer would, so dark stays covered.
  await page.select("#theme", scheme);

  // Put the page in a realistic state: developer at level 2 with one topic rated.
  await page.click("#disc-dev");
  await page.click("#q1-yes");
  await page.click("#q2-no");
  await page.click("#r-healthy-codebase-new");
  await page.click("#r-model-per-job-know");
  // Open the folded topics, so they are checked too.
  await page.evaluate(() => {
    for (const d of document.querySelectorAll("details")) d.open = true;
  });

  await page.addScriptTag({ path: fileURLToPath(import.meta.resolve("axe-core")) });
  const result = await page.evaluate(() =>
    axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] }),
  );
  // Catch layout gaps: a flex column should end close to where its last child ends. Skip
  // columns that a grid or flex row stretches on purpose to match their neighbours.
  const gaps = await page.evaluate(() =>
    [...document.querySelectorAll(".stack-v")]
      .map((el) => {
        // A display: contents child has no box of its own, so measure its last child instead.
        let last = el.lastElementChild;
        while (last && getComputedStyle(last).display === "contents") last = last.lastElementChild;
        const parent = getComputedStyle(el.parentElement);
        const stretched =
          parent.display.includes("grid") ||
          (parent.display.includes("flex") && parent.flexDirection.startsWith("row"));
        if (!last || stretched) return null;
        const pad = Number.parseFloat(getComputedStyle(el).paddingBottom) || 0;
        const empty = el.getBoundingClientRect().bottom - pad - last.getBoundingClientRect().bottom;
        return empty > 8
          ? `#${el.id || el.className.split(" ")[0]} has ${Math.round(empty)}px empty`
          : null;
      })
      .filter(Boolean),
  );
  errors.push(...gaps.map((g) => `layout gap: ${g}`));
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);

  const label = `${width}px ${scheme}`;
  const vardeLoaded = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--surface-base").trim(),
  );
  if (!vardeLoaded) errors.push("Varde stylesheet did not load");
  if (errors.length) {
    failed = true;
    for (const e of errors) console.log(`${label}: ${e}`);
  }
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
server.close();
process.exit(failed ? 1 : 0);
