#!/usr/bin/env node
import { launch } from "./lib/browser.mjs";
import { resolveTarget } from "./lib/target.mjs";

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith("--"));
const flag = (name) => args.includes(name);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
const number = (name, fallback, minimum = 0) => {
  const raw = value(name, String(fallback));
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < minimum) throw new Error(`${name} must be a number >= ${minimum}`);
  return parsed;
};

if (!targetArg || args.includes("--help")) {
  console.log("Usage: node scripts/qa/density.mjs <target> [--floor] [--min-sections-ratio n] [--min-gradients n] [--min-big-media n] [--json]");
  process.exit(targetArg ? 0 : 2);
}

let thresholds;
try {
  thresholds = {
    minSectionsRatio: number("--min-sections-ratio", 1),
    minGradients: number("--min-gradients", 3),
    minBigMedia: number("--min-big-media", 3),
  };
  if (thresholds.minSectionsRatio > 1) throw new Error("--min-sections-ratio must be <= 1");
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

let target;
try {
  target = await resolveTarget(targetArg);
} catch (error) {
  console.error(`Unable to prepare target: ${error.message.split("\n")[0]}`);
  process.exit(2);
}

const { browser, label: browserLabel } = await launch("chromium");
const failures = [];
let result;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(target.url, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(async () => { try { await document.fonts.ready; } catch {} });
    await page.waitForTimeout(500);

    const before = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll("body *")];
      window.__densityNodes = nodes;
      window.__densityIds = new Map(nodes.map((node, index) => [node, index]));
      return nodes.map((node, id) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return { id, state: `${style.transform}|${style.opacity}|${style.clipPath}`, area: rect.width * rect.height };
      });
    });
    const tracked = new Map(before.map((item) => [item.id, { changed: false, area: item.area }]));
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const steps = Math.min(40, Math.ceil(height / 450));
    let previous = before;
    for (let step = 1; step <= steps; step++) {
      await page.evaluate((y) => scrollTo(0, y), step * 450);
      await page.waitForTimeout(350);
      const current = await page.evaluate(() => window.__densityNodes.map((node, id) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return { id, state: `${style.transform}|${style.opacity}|${style.clipPath}`, area: rect.width * rect.height };
      }));
      const currentById = new Map(current.map((item) => [item.id, item]));
      for (const item of current) {
        const record = tracked.get(item.id);
        if (!record) continue;
        record.area = Math.max(record.area, item.area);
        if (previous[item.id]?.state !== item.state) record.changed = true;
      }
      previous = current;
    }

    result = await page.evaluate((trackedRows) => {
      const nodes = window.__densityNodes;
      const reactive = new Set(trackedRows.filter((row) => row.changed && row.area >= 2000).map((row) => row.id));
      const sections = [...document.querySelectorAll("section, header, footer")].filter((node) => node.getBoundingClientRect().height > 200);
      const movingSections = sections.filter((section) => [...nodes].some((node) => section.contains(node) && reactive.has(window.__densityIds.get(node)))).length;
      const gradients = nodes.filter((node) => {
        const style = getComputedStyle(node), rect = node.getBoundingClientRect();
        return Number(style.opacity) > 0.05 && rect.width * rect.height >= 2000 && /gradient/i.test(style.backgroundImage);
      }).length;
      const shadowLayers = nodes.map((node) => getComputedStyle(node).boxShadow).filter((shadow) => shadow !== "none")
        .map((shadow) => shadow.split(/,(?![^()]*(?:\([^()]*\)[^()]*)*\))/).length);
      const mediaNodes = [...document.querySelectorAll("img, picture, video, canvas, svg")];
      const media = mediaNodes.filter((node) => { const r = node.getBoundingClientRect(); return r.width * r.height >= 400; }).length;
      const bigMedia = mediaNodes.filter((node) => { const r = node.getBoundingClientRect(); return r.width * r.height > 40000; }).length;
      const backdrop = nodes.filter((node) => {
        const style = getComputedStyle(node);
        return (style.backdropFilter && style.backdropFilter !== "none") || (style.webkitBackdropFilter && style.webkitBackdropFilter !== "none");
      }).length;
      return {
        scrollReactive: reactive.size,
        sectionsWithMotion: movingSections,
        sectionsTotal: sections.length,
        gradients,
        media,
        bigMedia,
        maxShadowLayers: Math.max(0, ...shadowLayers),
        backdrop,
      };
    }, [...tracked].map(([id, row]) => ({ id, ...row })));
    await page.close();
  } catch (error) {
    await page.close().catch(() => {});
    failures.push(`FAIL runtime: ${error.message.split("\n")[0]}`);
  }
} finally {
  await browser.close();
  await target.close();
}

if (result && flag("--floor")) {
  const ratio = result.sectionsTotal ? result.sectionsWithMotion / result.sectionsTotal : 0;
  if (ratio < thresholds.minSectionsRatio) failures.push(`FAIL sections-with-motion: ${result.sectionsWithMotion}/${result.sectionsTotal} ratio=${ratio.toFixed(2)} required=${thresholds.minSectionsRatio}`);
  if (result.gradients < thresholds.minGradients) failures.push(`FAIL gradients: ${result.gradients} required=${thresholds.minGradients}`);
  if (result.bigMedia < thresholds.minBigMedia) failures.push(`FAIL big-media: ${result.bigMedia} required=${thresholds.minBigMedia}`);
}

if (flag("--json")) {
  console.log(JSON.stringify({ target: targetArg, browser: browserLabel, ...result, thresholds: flag("--floor") ? thresholds : null, failures }, null, 2));
} else {
  console.log(`Density ${targetArg} with ${browserLabel}`);
  if (result) {
    console.log(`scrollReactive: ${result.scrollReactive}`);
    console.log(`secciones con movimiento: ${result.sectionsWithMotion}/${result.sectionsTotal}`);
    console.log(`gradients: ${result.gradients}`);
    console.log(`media: ${result.media}; bigMedia: ${result.bigMedia}`);
    console.log(`maxShadowLayers: ${result.maxShadowLayers}; backdrop: ${result.backdrop}`);
  }
  if (failures.length) {
    for (const failure of failures) console.log(`  ${failure}`);
    console.log(`\n${failures.length} FAIL(s).`);
  } else console.log("No FAILs.");
}
if (failures.length) process.exitCode = 1;
