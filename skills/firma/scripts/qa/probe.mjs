#!/usr/bin/env node
/**
 * Measure a page's labeled content at selected animation frames and viewports.
 *
 *   node probe.mjs page.html [--widths 1440x900,375x812]
 *   node probe.mjs https://example.test/page --frames 0,0.3,0.55,0.75,1 --out shots/probe
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { launch } from "./lib/browser.mjs";
import { resolveTarget } from "./lib/target.mjs";

const args = process.argv.slice(2);
const usage = "usage: node scripts/qa/probe.mjs <file.html | url> [--widths 1440x900,375x812] [--frames 0,0.3,0.55,0.75,1] [--param p] [--out dir]";
const option = (name, fallback) => {
  const i = args.indexOf(name);
  if (i < 0) return fallback;
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`${name} needs a value`);
  return args[i + 1];
};
const knownOptions = new Set(["--widths", "--frames", "--param", "--out"]);
const targetArg = args.find((value) => !value.startsWith("--") && args.indexOf(value) === 0);
if (!targetArg || args.some((value) => value.startsWith("--") && !knownOptions.has(value))) {
  console.error(usage);
  process.exit(2);
}

const parseList = (value, parse, name) => {
  const parts = value.split(",");
  const items = parts.map((part) => parse(part.trim()));
  if (!items.length || parts.some((part) => !part.trim()) || items.some((item) => item == null || (typeof item === "number" && !Number.isFinite(item)))) {
    throw new Error(`Invalid ${name}: ${value}`);
  }
  return items;
};
const widths = parseList(option("--widths", "1440x900,375x812"), (item) => {
  const match = item.match(/^(\d+)x(\d+)$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}, "widths");
const frames = parseList(option("--frames", "0,0.3,0.55,0.75,1"), Number, "frames");
if (widths.some(({ width, height }) => width < 1 || height < 1)) throw new Error("Viewport dimensions must be positive");
const param = option("--param", "p");
const isUrl = /^https?:\/\//i.test(targetArg);
const output = path.resolve(option("--out", isUrl ? path.join("shots", "probe") : path.join(path.dirname(path.resolve(targetArg)), "shots", "probe")));
fs.mkdirSync(output, { recursive: true });

function rectOverlap(a, b) {
  const width = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const height = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return { width, height, area: width * height };
}

function decodePixel(buffer) {
  let offset = 8, data, width, height, colorType, bitDepth;
  const chunks = [];
  while (offset < buffer.length) {
    const size = buffer.readUInt32BE(offset); offset += 4;
    const type = buffer.toString("ascii", offset, offset + 4); offset += 4;
    const chunk = buffer.subarray(offset, offset + size); offset += size + 4;
    if (type === "IHDR") {
      width = chunk.readUInt32BE(0); height = chunk.readUInt32BE(4);
      bitDepth = chunk[8]; colorType = chunk[9];
    }
    if (type === "IDAT") chunks.push(chunk);
    if (type === "IEND") break;
  }
  if (width !== 1 || height !== 1 || bitDepth !== 8 || ![2, 6].includes(colorType)) throw new Error("Unsupported screenshot pixel format");
  data = zlib.inflateSync(Buffer.concat(chunks));
  const channels = colorType === 6 ? 4 : 3;
  const filter = data[0], raw = [...data.subarray(1)];
  const paeth = (a, b, c) => {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let i = 0; i < raw.length; i++) {
    const left = i >= channels ? raw[i - channels] : 0;
    const above = 0, upperLeft = 0;
    if (filter === 1) raw[i] = (raw[i] + left) & 255;
    else if (filter === 2) raw[i] = raw[i] & 255;
    else if (filter === 3) raw[i] = (raw[i] + Math.floor(left / 2)) & 255;
    else if (filter === 4) raw[i] = (raw[i] + paeth(left, above, upperLeft)) & 255;
    else if (filter !== 0) throw new Error(`Unsupported PNG filter ${filter}`);
  }
  return { r: raw[0], g: raw[1], b: raw[2] };
}

function luminance({ r, g, b }) {
  const linear = (value) => { const v = value / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function rgb(value) {
  const match = value?.match(/rgba?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)/i);
  return match ? { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) } : null;
}

function contrast(foreground, background) {
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
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
let screenshotCount = 0;
try {
  for (const viewport of widths) {
    for (const frame of frames) {
      const page = await browser.newPage({ viewport, deviceScaleFactor: 1, isMobile: viewport.width <= 520, hasTouch: viewport.width <= 520 });
      const context = page.context();
      const errors = [];
      page.on("console", (message) => { if (message.type() === "error" && !/favicon/.test((message.location() && message.location().url) || "")) errors.push(`console.error: ${message.text().split("\n")[0]}`); });
      page.on("pageerror", (error) => errors.push(`pageerror: ${error.message.split("\n")[0]}`));
      const url = new URL(target.url);
      url.searchParams.set(param, String(frame));
      try {
        await page.goto(url.href, { waitUntil: "load", timeout: 45000 });
        await page.evaluate(async () => { try { await document.fonts.ready; } catch {} });
        await page.waitForTimeout(1500);
        const stem = `${viewport.width}x${viewport.height}-frame-${String(frame).replace(/[^\w.-]/g, "_")}`;
        const shotPath = path.join(output, `${stem}.png`);
        await page.screenshot({ path: shotPath });
        screenshotCount++;

        const measured = await page.evaluate(async () => {
          const box = (element) => {
            const r = element.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height };
          };
          const api = typeof window.__probe === "function";
          const supplied = api ? await window.__probe() : null;
          const stageElement = document.querySelector("[data-probe-stage]");
          const stageBox = supplied?.stage || (stageElement ? box(stageElement) : { x: 0, y: 0, w: innerWidth, h: innerHeight });
          const stage = { x: stageBox.x, y: stageBox.y, w: stageBox.w ?? stageBox.width, h: stageBox.h ?? stageBox.height };
          const labels = supplied?.labels || [...document.querySelectorAll("[data-probe-label]")].map((element) => ({ id: element.getAttribute("data-probe-label") || element.id || element.tagName, ...box(element) }));
          const obstacles = supplied?.obstacles || [...document.querySelectorAll("[data-probe-obstacle]")].map((element) => ({ id: element.getAttribute("data-probe-obstacle") || element.id || element.tagName, ...box(element) }));
          const findElement = (id) => [...document.querySelectorAll("[data-probe-label]")].find((element) => element.getAttribute("data-probe-label") === String(id))
            || document.getElementById(String(id));
          const colorAt = (element) => {
            let alpha = 0, r = 255, g = 255, b = 255;
            for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
              const color = getComputedStyle(node).backgroundColor.match(/rgba?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)(?:,\s*([\d.]+))?\)/i);
              if (!color) continue;
              const opacity = color[4] === undefined ? 1 : Number(color[4]);
              if (opacity <= 0) continue;
              r = Number(color[1]) * opacity + r * (1 - opacity);
              g = Number(color[2]) * opacity + g * (1 - opacity);
              b = Number(color[3]) * opacity + b * (1 - opacity);
              alpha += opacity * (1 - alpha);
              if (alpha >= 0.999) break;
            }
            return { r, g, b };
          };
          const navs = [...document.querySelectorAll("body *")].filter((node) => {
            const style = getComputedStyle(node), r = node.getBoundingClientRect();
            return (style.position === "fixed" || style.position === "sticky") && r.top <= 1 && r.bottom > 0 && r.width > 0 && r.height > 0 && r.height < 160;
          }).filter((node, index, nodes) => !nodes.some((ancestor, other) => other !== index && ancestor.contains(node)));
          const labelInfo = labels.map((item) => {
            const element = findElement(item.id);
            const point = document.elementFromPoint(Math.max(0, Math.min(innerWidth - 1, item.x + 0.5)), Math.max(0, Math.min(innerHeight - 1, item.y + 0.5)));
            const styleElement = element || point;
            const color = styleElement ? getComputedStyle(styleElement).color : "rgb(0, 0, 0)";
            const stack = document.elementsFromPoint(Math.max(0, Math.min(innerWidth - 1, item.x + 0.5)), Math.max(0, Math.min(innerHeight - 1, item.y + 0.5)));
            const canvas = element?.closest("canvas") || stack.find((node) => node.tagName === "CANVAS") || null;
            return {
              id: String(item.id ?? "(missing id)"), rect: { x: Number(item.x), y: Number(item.y), w: Number(item.w ?? item.width), h: Number(item.h ?? item.height) },
              foreground: color, background: colorAt(styleElement), canvas: !!canvas,
              insideTopLayer: !!element && navs.some((nav) => nav.contains(element) || element.contains(nav)),
            };
          });
          return { api, stage, labels: labelInfo, obstacles, navs: navs.map((node) => ({ id: node.id || node.tagName.toLowerCase(), ...box(node) })) };
        });

        const prefix = `[${viewport.width}x${viewport.height} frame=${frame}]`;
        const fail = (kind, ids, pixels, detail) => failures.push(`${prefix} FAIL ${kind} ids=${ids.join(",") || "—"} pixels=${pixels} ${detail}`);
        for (const error of errors) fail("console", [], "—", error);
        for (let i = 0; i < measured.labels.length; i++) {
          const a = measured.labels[i], margin = viewport.width < 900 ? 16 : 40;
          const bounds = measured.stage;
          const edges = {
            left: a.rect.x - bounds.x,
            top: a.rect.y - bounds.y,
            right: bounds.x + bounds.w - (a.rect.x + a.rect.w),
            bottom: bounds.y + bounds.h - (a.rect.y + a.rect.h),
          };
          const short = Object.entries(edges).filter(([, distance]) => distance < margin);
          if (short.length) fail("outside-stage", [a.id], short.map(([edge, distance]) => `${edge}:${Math.round(distance)}px`).join(" "), `required=${margin}px`);
          for (const obstacle of measured.obstacles) {
            const hit = rectOverlap(a.rect, { x: obstacle.x, y: obstacle.y, w: obstacle.w ?? obstacle.width, h: obstacle.h ?? obstacle.height });
            if (hit.area > 0) fail("label-obstacle", [a.id, obstacle.id], `${hit.width.toFixed(1)}x${hit.height.toFixed(1)}=${hit.area.toFixed(1)}px²`, "overlap");
          }
          for (const nav of measured.navs) {
            if (a.insideTopLayer) continue;
            const hit = rectOverlap(a.rect, nav);
            if (hit.area > 0) fail("under-top-nav", [a.id, nav.id], `${hit.width.toFixed(1)}x${hit.height.toFixed(1)}=${hit.area.toFixed(1)}px²`, "label crosses fixed/sticky top element");
          }
          const foreground = rgb(a.foreground);
          let background = a.background;
          if (a.canvas) {
            const x = Math.max(0, Math.min(viewport.width - 1, Math.floor(a.rect.x) - 1));
            const y = Math.max(0, Math.min(viewport.height - 1, Math.floor(a.rect.y)));
            const pixel = decodePixel(await page.screenshot({ clip: { x, y, width: 1, height: 1 } }));
            background = pixel;
          }
          if (foreground && background) {
            const ratio = contrast(foreground, background);
            if (ratio < 4.5) fail("contrast", [a.id], `1px sample ratio=${ratio.toFixed(2)}:1`, `needs=4.5:1 foreground=${a.foreground}`);
          }
          for (const b of measured.labels.slice(i + 1)) {
            const expanded = { x: a.rect.x - 6, y: a.rect.y - 6, w: a.rect.w + 12, h: a.rect.h + 12 };
            const hit = rectOverlap(expanded, b.rect);
            if (hit.area > 0) fail("label-label", [a.id, b.id], `${hit.width.toFixed(1)}x${hit.height.toFixed(1)}=${hit.area.toFixed(1)}px²`, "minimum gap=6px");
          }
        }
        await context.close();
        console.log(`  ${viewport.width}x${viewport.height} frame=${frame} ${measured.labels.length} labels, ${measured.obstacles.length} obstacles -> ${shotPath}`);
      } catch (error) {
        await context.close().catch(() => {});
        failRun(viewport, frame, error);
      }
    }
  }
} finally {
  await browser.close();
  await target.close();
}

function failRun(viewport, frame, error) {
  failures.push(`[${viewport.width}x${viewport.height} frame=${frame}] FAIL runtime ids=— pixels=— ${error.message.split("\n")[0]}`);
}

console.log(`\nProbe ${targetArg} with ${browserLabel} -> ${output}`);
if (failures.length) {
  for (const failure of failures) console.log(`  ${failure}`);
  console.log(`\n${failures.length} FAIL(s); ${screenshotCount} screenshot(s).`);
  process.exitCode = 1;
} else {
  console.log(`No FAILs; ${screenshotCount} screenshot(s).`);
}
