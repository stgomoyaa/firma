#!/usr/bin/env node
// firma guard: deterministic checks for the hard rules a generic linter does not have.
// Covers the locale register gate, em-dashes, unconfirmed metrics, pure black and white,
// untinted greys, and colour literals outside tokens.
// Complements `npx impeccable detect` (DOM/AST, generic execution layer); does not replace it.
// Usage: node guard.mjs [paths...] [--locale <tag>] [--json] [--quiet]
// Exits 1 if any error-level finding is present.
//
// Escape hatch: a file containing the text `firma-guard-disable-file` is skipped.
// For the file that defines the rules (this one), for test fixtures, and for copy that
// genuinely has to ship in another register.
// firma-guard-disable-file

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative, resolve } from 'node:path';

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.svelte-kit',
  'out', 'vendor', 'coverage', '.venv', '__pycache__', '.firma',
]);
const MARKUP = new Set(['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.astro', '.php']);
const SCRIPTISH = new Set(['.js', '.ts', '.mjs', '.cjs']);
const STYLE = new Set(['.css', '.scss', '.sass', '.less']);

// --- locale profiles ----------------------------------------------------------

// One entry per profile in ../locales/. The list is the gate: a form that is not here
// cannot be caught. Explicit list rather than a pattern over stressed -á/-é/-í endings,
// because that pattern also matches "café", "sofá", "aquí" and "también", and a gate
// with false positives gets disabled.
const LOCALES = {
  // Spanish, neutral Chilean register (tuteo). Rejects Argentine voseo.
  'es-CL': [
  // presente
  'tenés', 'querés', 'podés', 'sabés', 'salís', 'pagás', 'hacés', 'venís', 'decís',
  'vivís', 'elegís', 'seguís', 'preferís', 'necesitás', 'buscás', 'esperás', 'tomás',
  'usás', 'ganás', 'llevás', 'sos',
  // imperativos
  'agendá', 'mirá', 'dejá', 'empezá', 'fijate', 'sumate', 'escribí', 'probá', 'contá',
  'mandá', 'revisá', 'hacé', 'andá', 'vení', 'elegí', 'seguí', 'descubrí', 'comprá',
  'reservá', 'sumá', 'activá', 'guardá', 'compartí', 'cotizá', 'pedí', 'llamá',
    'enterate', 'aprovechá', 'registrate', 'suscribite', 'ingresá', 'conocé', 'llevate',
    'vos',
  ],
};

const localeArg = process.argv.find((a) => a.startsWith('--locale='))
  || (process.argv.includes('--locale') ? process.argv[process.argv.indexOf('--locale') + 1] : null);
const LOCALE = (localeArg || 'es-CL').replace('--locale=', '');
if (!LOCALES[LOCALE]) {
  console.error(`unknown locale profile "${LOCALE}". Shipped: ${Object.keys(LOCALES).join(', ')}.`);
  console.error('Add its banned-forms list to LOCALES in this file. See ../locales/README.md.');
  process.exit(2);
}
const BANNED_RE = new RegExp(`(?<![\\p{L}])(?:${LOCALES[LOCALE].join('|')})(?![\\p{L}])`, 'giu');

const DASH_RE = /[—–]/g;

// Marketing metrics. Warn, not error: a real number is legitimate; what is not
// legitimate is shipping one nobody confirmed.
const METRIC_RES = [
  /[+±]\s?\d+([.,]\d+)?\s?%/g,
  /\d+([.,]\d+)?\s?%[\s]{0,60}(de\s+)?(más|menos|aumento|crecimiento|conversión|conversion|uptime|satisfacción|ahorro|retención|ROI)/gi,
  /\d{1,3}([.,]\d{3})+[\s]{0,60}\+?[\s]{0,60}(clientes|usuarios|empresas|pedidos|descargas|proyectos|marcas|pymes)/gi,
  /\+\s?\d+\s?(mil|millones|k|m)?[\s]{0,60}(clientes|usuarios|empresas|países|marcas)/gi,
  /\b\d+\s?x[\s]{0,20}(más|mejor|faster|rápido)/gi,
];

// --- colour rules -------------------------------------------------------------

const PURE_RE = /#(?:000{1,2}|fff{1,2}|000000|ffffff)\b|rgba?\(\s*0\s*,\s*0\s*,\s*0\s*[,)]|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*[,)]/gi;
const HEX_RE = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
const OKLCH_RE = /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.-]+)/gi;

/**
 * matchAll on a global regex copies the original's lastIndex, so a module-level
 * regex reused across files silently skips matches. Always build a fresh one.
 */
function all(re, s) {
  return [...s.matchAll(new RegExp(re.source, re.flags))];
}

function hexChannels(hex) {
  const h = hex.slice(1);
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [full.slice(0, 2), full.slice(2, 4), full.slice(4, 6)].map((p) => parseInt(p, 16));
}

// --- helpers ------------------------------------------------------------------

/** Blanks a region with spaces so offsets and line numbers do not shift. */
function blank(src, re) {
  return src.replace(re, (m) => m.replace(/[^\n]/g, ' '));
}

/** Leaves only what a reader sees: no tags, no script/style, no comments. */
function visibleText(src, ext) {
  let s = src;
  s = blank(s, /<script\b[\s\S]*?<\/script>/gi);
  s = blank(s, /<style\b[\s\S]*?<\/style>/gi);
  s = blank(s, /<!--[\s\S]*?-->/g);
  s = blank(s, /\/\*[\s\S]*?\*\//g);
  s = blank(s, /(?<!:)\/\/[^\n]*/g); // line comments, without eating https://
  if (MARKUP.has(ext)) s = blankTags(s);
  return s;
}

/**
 * Blanks tags, keeping at its original offset the value of the attributes a user
 * actually reads (alt, placeholder, title, aria-label, label).
 */
function blankTags(src) {
  const ATTR = /\b(?:alt|placeholder|title|aria-label|label)\s*=\s*(["'])([\s\S]*?)\1/gi;
  return src.replace(/<[^>]*>/g, (tag) => {
    let out = tag.replace(/[^\n]/g, ' ');
    for (const m of all(ATTR, tag)) {
      const val = m[2];
      const at = m.index + m[0].length - val.length - 1; // skip the closing quote
      out = out.slice(0, at) + val + out.slice(at + val.length);
    }
    return out;
  });
}

function lineAt(src, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (src[i] === '\n') line++;
  return line;
}

function snippet(src, index, len = 60) {
  const start = src.lastIndexOf('\n', index) + 1;
  let end = src.indexOf('\n', index);
  if (end === -1) end = src.length;
  return src.slice(start, end).trim().slice(0, len);
}

function walk(dir, acc = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.') {
      if (!STYLE.has(extname(e.name)) && !MARKUP.has(extname(e.name))) continue;
    }
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(p, acc);
    } else {
      const ext = extname(e.name);
      if (MARKUP.has(ext) || STYLE.has(ext) || SCRIPTISH.has(ext)) acc.push(p);
    }
  }
  return acc;
}

// --- checks -------------------------------------------------------------------

function checkFile(path, src) {
  const ext = extname(path);
  const out = [];
  const push = (level, rule, index, msg) => out.push({
    level, rule, path, line: lineAt(src, index), msg, snippet: snippet(src, index),
  });

  if (MARKUP.has(ext) || SCRIPTISH.has(ext)) {
    const text = visibleText(src, ext);
    for (const m of all(BANNED_RE, text)) {
      push('error', 'locale-register', m.index,
        `form banned by locale ${LOCALE} in visible text: "${m[0]}". See ../locales/${LOCALE}.md.`);
    }
    for (const m of all(DASH_RE, text)) {
      push('error', 'em-dash', m.index,
        'em-dash or en-dash in visible text. Use a period, comma, colon or parentheses.');
    }
    for (const re of METRIC_RES) {
      for (const m of all(re, text)) {
        push('warn', 'metrica-sin-confirmar', m.index,
          `metric in copy: "${m[0].replace(/\s+/g, ' ').trim()}". Confirm it is real and verifiable, or remove it.`);
      }
    }
  }

  if (STYLE.has(ext) || MARKUP.has(ext)) {
    const css = MARKUP.has(ext)
      ? blank(src, /<script\b[\s\S]*?<\/script>/gi)
      : src;

    for (const m of all(PURE_RE, css)) {
      push('error', 'negro-blanco-puro', m.index,
        `pure ${m[0]}. Tint it: every neutral carries chroma >= 0.005.`);
    }
    for (const m of all(HEX_RE, css)) {
      const [r, g, b] = hexChannels(m[0]);
      const pure = (r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255);
      if (!pure && r === g && g === b) {
        push('error', 'gris-sin-tintar',
          m.index, `${m[0]} is an exact neutral grey. Tint it toward the theme's anchor hue.`);
      }
    }
    for (const m of all(OKLCH_RE, css)) {
      if (parseFloat(m[2]) < 0.005) {
        push('error', 'gris-sin-tintar', m.index,
          `oklch with chroma ${m[2]}. Neutrals ship tinted (chroma >= 0.005).`);
      }
    }
    // A colour literal is only declared when defining a token.
    for (const m of [...all(HEX_RE, css), ...all(OKLCH_RE, css)]) {
      const lineStart = css.lastIndexOf('\n', m.index) + 1;
      let lineEnd = css.indexOf('\n', m.index);
      if (lineEnd === -1) lineEnd = css.length;
      const line = css.slice(lineStart, lineEnd);
      if (!/--[\w-]+\s*:/.test(line) && !/^\s*(\/\/|\*)/.test(line)) {
        push('warn', 'color-fuera-de-tokens', m.index,
          'colour literal outside a token. Lift it into :root as var(--color-...).');
      }
    }
  }

  // The same literal repeated on one line is not a new finding.
  const seen = new Set();
  return out.filter((f) => {
    const k = `${f.path}:${f.line}:${f.rule}:${f.msg}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function checkProject(files, sources) {
  const out = [];
  const animated = files.filter((f, i) =>
    /@keyframes|animation\s*:|animation-name/.test(sources[i]));
  if (animated.length === 0) return out;
  const guarded = sources.some((s) => /prefers-reduced-motion/.test(s));
  if (!guarded) {
    out.push({
      level: 'error', rule: 'sin-reduced-motion', path: animated[0], line: 1,
      msg: 'the project animates and has no @media (prefers-reduced-motion: reduce).',
      snippet: '',
    });
  }
  return out;
}

// --- cli ----------------------------------------------------------------------

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const quiet = argv.includes('--quiet');
const targets = argv.filter((a) => !a.startsWith('--'));
const roots = (targets.length ? targets : ['.']).map((t) => resolve(t));

const files = [];
for (const root of roots) {
  let st;
  try { st = statSync(root); } catch { continue; }
  if (st.isDirectory()) files.push(...walk(root));
  else files.push(root);
}

const DISABLE = 'firma-guard' + '-disable-file';
const sources = files.map((f) => { try { return readFileSync(f, 'utf8'); } catch { return ''; } });
const findings = [];
files.forEach((f, i) => {
  if (sources[i].includes(DISABLE)) return;
  findings.push(...checkFile(f, sources[i]));
});
findings.push(...checkProject(files, sources));

const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

if (asJson) {
  console.log(JSON.stringify({ files: files.length, errors, warns }, null, 2));
} else if (!quiet || findings.length) {
  const cwd = process.cwd();
  for (const f of findings) {
    const tag = f.level === 'error' ? 'ERROR' : ' warn';
    console.log(`${relative(cwd, f.path)}:${f.line}  ${tag}  [${f.rule}] ${f.msg}`);
    if (f.snippet) console.log(`    ${f.snippet}`);
  }
  console.log(`\n${files.length} files · ${errors.length} errors · ${warns.length} warnings · locale ${LOCALE}`);
  if (!findings.length) console.log('no findings.');
}

process.exit(errors.length ? 1 : 0);
