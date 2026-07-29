#!/usr/bin/env node
// firma guard: chequeo determinista de las reglas duras que un linter en inglés no ve.
// Cubre voseo, em-dashes, métricas sin confirmar, negros y grises puros, y tokens sueltos.
// Complementa a `npx impeccable detect` (DOM/AST, capa genérica); no lo reemplaza.
// Uso: node guard.mjs [rutas...] [--json] [--quiet]
// Sale con código 1 si hay algún hallazgo de nivel error.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative, resolve } from 'node:path';

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.svelte-kit',
  'out', 'vendor', 'coverage', '.venv', '__pycache__', '.firma',
]);
const MARKUP = new Set(['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.astro', '.php']);
const SCRIPTISH = new Set(['.js', '.ts', '.mjs', '.cjs']);
const STYLE = new Set(['.css', '.scss', '.sass', '.less']);

// --- reglas de copy -----------------------------------------------------------

// Voseo rioplatense. Lista explícita en vez de un patrón de tónicas, porque
// "café", "sofá", "aquí" y "también" convierten cualquier regex de -á/-é/-í en ruido.
const VOSEO = [
  // presente
  'tenés', 'querés', 'podés', 'sabés', 'salís', 'pagás', 'hacés', 'venís', 'decís',
  'vivís', 'elegís', 'seguís', 'preferís', 'necesitás', 'buscás', 'esperás', 'tomás',
  'usás', 'ganás', 'llevás', 'sos',
  // imperativos
  'agendá', 'mirá', 'dejá', 'empezá', 'fijate', 'sumate', 'escribí', 'probá', 'contá',
  'mandá', 'revisá', 'hacé', 'andá', 'vení', 'elegí', 'seguí', 'descubrí', 'comprá',
  'reservá', 'sumá', 'activá', 'guardá', 'compartí', 'cotizá', 'pedí', 'llamá',
  'enterate', 'aprovechá', 'registrate', 'suscribite', 'ingresá', 'conocé', 'llevate',
];
const VOSEO_RE = new RegExp(`(?<![\\p{L}])(?:${VOSEO.join('|')}|vos)(?![\\p{L}])`, 'giu');

const DASH_RE = /[—–]/g;

// Métricas de marketing. Warn, no error: un número real es legítimo, lo que no es
// legítimo es no haberlo confirmado.
const METRIC_RES = [
  /[+±]\s?\d+([.,]\d+)?\s?%/g,
  /\d+([.,]\d+)?\s?%[\s]{0,60}(de\s+)?(más|menos|aumento|crecimiento|conversión|conversion|uptime|satisfacción|ahorro|retención|ROI)/gi,
  /\d{1,3}([.,]\d{3})+[\s]{0,60}\+?[\s]{0,60}(clientes|usuarios|empresas|pedidos|descargas|proyectos|marcas|pymes)/gi,
  /\+\s?\d+\s?(mil|millones|k|m)?[\s]{0,60}(clientes|usuarios|empresas|países|marcas)/gi,
  /\b\d+\s?x[\s]{0,20}(más|mejor|faster|rápido)/gi,
];

// --- reglas de color ----------------------------------------------------------

const PURE_RE = /#(?:000{1,2}|fff{1,2}|000000|ffffff)\b|rgba?\(\s*0\s*,\s*0\s*,\s*0\s*[,)]|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*[,)]/gi;
const HEX_RE = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
const OKLCH_RE = /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.-]+)/gi;

/**
 * matchAll sobre un regex global copia el lastIndex del original, así que un
 * regex de módulo reusado entre archivos se saltea matches. Siempre uno fresco.
 */
function all(re, s) {
  return [...s.matchAll(new RegExp(re.source, re.flags))];
}

function hexChannels(hex) {
  const h = hex.slice(1);
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [full.slice(0, 2), full.slice(2, 4), full.slice(4, 6)].map((p) => parseInt(p, 16));
}

// --- utilidades ---------------------------------------------------------------

/** Reemplaza una región por espacios para no mover offsets ni números de línea. */
function blank(src, re) {
  return src.replace(re, (m) => m.replace(/[^\n]/g, ' '));
}

/** Deja solo lo que un lector ve: sin tags, sin script/style, sin comentarios. */
function visibleText(src, ext) {
  let s = src;
  s = blank(s, /<script\b[\s\S]*?<\/script>/gi);
  s = blank(s, /<style\b[\s\S]*?<\/style>/gi);
  s = blank(s, /<!--[\s\S]*?-->/g);
  s = blank(s, /\/\*[\s\S]*?\*\//g);
  if (MARKUP.has(ext)) s = blankTags(s);
  return s;
}

/**
 * Borra los tags dejando en su offset original el valor de los atributos que el
 * usuario sí lee (alt, placeholder, title, aria-label, label).
 */
function blankTags(src) {
  const ATTR = /\b(?:alt|placeholder|title|aria-label|label)\s*=\s*(["'])([\s\S]*?)\1/gi;
  return src.replace(/<[^>]*>/g, (tag) => {
    let out = tag.replace(/[^\n]/g, ' ');
    for (const m of all(ATTR, tag)) {
      const val = m[2];
      const at = m.index + m[0].length - val.length - 1; // salta la comilla de cierre
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

// --- chequeos -----------------------------------------------------------------

function checkFile(path, src) {
  const ext = extname(path);
  const out = [];
  const push = (level, rule, index, msg) => out.push({
    level, rule, path, line: lineAt(src, index), msg, snippet: snippet(src, index),
  });

  if (MARKUP.has(ext) || SCRIPTISH.has(ext)) {
    const text = visibleText(src, ext);
    for (const m of all(VOSEO_RE, text)) {
      push('error', 'voseo', m.index,
        `voseo rioplatense en texto visible: "${m[0]}". Reescribir en tuteo.`);
    }
    for (const m of all(DASH_RE, text)) {
      push('error', 'em-dash', m.index,
        'em-dash o en-dash en texto visible. Usar punto, coma, dos puntos o paréntesis.');
    }
    for (const re of METRIC_RES) {
      for (const m of all(re, text)) {
        push('warn', 'metrica-sin-confirmar', m.index,
          `métrica en copy: "${m[0].replace(/\s+/g, ' ').trim()}". Confirmar que es real y verificable, o sacarla.`);
      }
    }
  }

  if (STYLE.has(ext) || MARKUP.has(ext)) {
    const css = MARKUP.has(ext)
      ? blank(src, /<script\b[\s\S]*?<\/script>/gi)
      : src;

    for (const m of all(PURE_RE, css)) {
      push('error', 'negro-blanco-puro', m.index,
        `${m[0]} puro. Tintar: todo neutral lleva chroma ≥ 0.005.`);
    }
    for (const m of all(HEX_RE, css)) {
      const [r, g, b] = hexChannels(m[0]);
      const pure = (r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255);
      if (!pure && r === g && g === b) {
        push('error', 'gris-sin-tintar',
          m.index, `${m[0]} es gris neutro exacto. Tintarlo al hue ancla del tema.`);
      }
    }
    for (const m of all(OKLCH_RE, css)) {
      if (parseFloat(m[2]) < 0.005) {
        push('error', 'gris-sin-tintar', m.index,
          `oklch con chroma ${m[2]}. Los neutrales van tinteados (chroma ≥ 0.005).`);
      }
    }
    // Un literal de color solo se declara al definir un token.
    for (const m of [...all(HEX_RE, css), ...all(OKLCH_RE, css)]) {
      const lineStart = css.lastIndexOf('\n', m.index) + 1;
      let lineEnd = css.indexOf('\n', m.index);
      if (lineEnd === -1) lineEnd = css.length;
      const line = css.slice(lineStart, lineEnd);
      if (!/--[\w-]+\s*:/.test(line) && !/^\s*(\/\/|\*)/.test(line)) {
        push('warn', 'color-fuera-de-tokens', m.index,
          `color literal fuera de un token. Subirlo a :root como var(--color-...).`);
      }
    }
  }

  // Un mismo literal repetido en la línea no es un hallazgo nuevo.
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
      msg: 'hay animación en el proyecto y ningún @media (prefers-reduced-motion: reduce).',
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

const sources = files.map((f) => { try { return readFileSync(f, 'utf8'); } catch { return ''; } });
const findings = [];
files.forEach((f, i) => findings.push(...checkFile(f, sources[i])));
findings.push(...checkProject(files, sources));

const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

if (asJson) {
  console.log(JSON.stringify({ files: files.length, errors, warns }, null, 2));
} else if (!quiet || findings.length) {
  const cwd = process.cwd();
  for (const f of findings) {
    const tag = f.level === 'error' ? 'ERROR' : 'aviso';
    console.log(`${relative(cwd, f.path)}:${f.line}  ${tag}  [${f.rule}] ${f.msg}`);
    if (f.snippet) console.log(`    ${f.snippet}`);
  }
  console.log(`\n${files.length} archivos · ${errors.length} errores · ${warns.length} avisos`);
  if (!findings.length) console.log('sin hallazgos.');
}

process.exit(errors.length ? 1 : 0);
