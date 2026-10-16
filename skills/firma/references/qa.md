# Rendered QA toolkit (`scripts/qa/`)

Real-browser checks that run on the page as shipped. Node 18+, `playwright-core`, and a local Google Chrome (then Edge, then Playwright Chromium). Run everything from the firma folder or with absolute paths: `node ~/.claude/skills/firma/scripts/qa/<script>.mjs`. Every script takes a file, a folder with `index.html` (served over http, never `file://`) or a URL (dev server or live).

Setup check, once per machine: `node scripts/qa/doctor.mjs` (reports Node, playwright-core, browsers, stand-in fonts, and renders a smoke page). `--fix` installs missing pieces; `--engines` also downloads Firefox and WebKit (about 250 MB, optional). `FIRMA_BROWSER=/path/to/chrome` forces a browser binary. If `node_modules` is missing, `npm install --no-fund --no-audit` inside `scripts/qa/`.

## shoot.mjs: screenshots plus defect scan

```bash
node scripts/qa/shoot.mjs <target> --widths 320,375,768,1280,1440 --out shots/r1
```

| Flag | Effect |
| --- | --- |
| `--out dir` | Output folder (default `./shots` next to the file) |
| `--widths a,b,c` | Viewport widths (default 390,768,1280,1440) |
| `--height n` | Desktop viewport height; an explicit value wins at every width |
| `--scale n` | Device pixel ratio (default 2) |
| `--dark` | `prefers-color-scheme: dark` (only if the page has a dark mode) |
| `--app` | App thresholds (dense UI, no hero rules) |
| `--full` | Full-page shots at every width (default: only at 390 and the widest), also sliced into numbered screens |
| `--wait ms` | Extra wait after load for charts, maps, timers |
| `--no-scan` | Screenshots only |

Writes one PNG per width, `sheet.png` (contact sheet) and full-page slices. The scan runs on the rendered DOM at every width and catches: sideways scroll and the element sticking out, text running off the viewport, clipped or overlapping text, control labels that wrap, contrast (including text over images, measured on pixels), tap targets under 24x24px, hidden content, broken or collapsed images, accessibility names, a keyboard focus walk, whether the action is in the first screen, and the slop faces' tells.

Exit codes: `0` no FAIL (warns never fail), `1` at least one FAIL, `2` bad usage or no browser. A FAIL blocks handover. A warn needs a fix or one line on why it is deliberate. The scan does not replace looking at the PNGs.

## probe.mjs: frozen-frame layout checks

```bash
node scripts/qa/probe.mjs <file.html | url> [--widths 1440x900,375x812] [--frames 0,0.3,0.55,0.75,1] [--param p] [--out shots/probe]
```

## density.mjs: visual density floor

```bash
node scripts/qa/density.mjs <file.html | folder | url> [--floor] [--min-sections-ratio 1] [--min-gradients 3] [--min-big-media 3] [--json]
```

Measures scroll-reactive elements, sections with motion, gradients, media, shadow layers and backdrop filters at 1440x900. Without `--floor`, it only reports measurements; with it, the default minimums require motion in every tall section, three visible gradients and three large media elements. Exits `1` when a floor is missed.

Captures each viewport and query-parameter frame after fonts are ready and a 1.5-second settle, then checks label spacing, obstacle collisions, stage margins, top fixed/sticky navigation, WCAG text contrast, and browser errors. A page may expose `window.__probe()` returning a viewport-coordinate `stage`, `labels`, and `obstacles`; otherwise mark elements with `data-probe-label`, `data-probe-obstacle`, and optionally `data-probe-stage`. The executor runs `probe.mjs` in a fix-and-rerun loop until it reports 0 FAIL before handover; the coordinator judges taste only.

## matrix.mjs: other people's machines

```bash
node scripts/qa/matrix.mjs <target> --out shots/r1/matrix [--only windows-125,linux] [--app] [--wait ms]
```

Passes: `windows-125`, `windows-150`, `windows-hc` (forced-colors), `linux`, `mac` (skipped on a Mac), `android`, `firefox`, `safari`, `safari-iphone`, `reflow-320` (WCAG 1.4.10), `motion` (reduced motion: is anything still moving), `l10n` and `l10n-phone` (words about 35% longer with accents). Windows, Linux and Android fonts are emulated with metric-compatible stand-ins in `scripts/qa/assets/fonts/` (line breaks and widths match, glyph shapes do not). `--only` takes id prefixes and writes to a sibling `only-*` folder.

Firefox and WebKit passes are skipped with a message naming `doctor.mjs --engines` when those engines are not installed; the Chromium passes still run. Output: `sheet.png`, `matrix.md`, one shot per pass. Exit `1` if any pass FAILs, `0` otherwise, `2` bad usage. Run it when the page ships to the public; a skipped engine is reported as pending coverage, not as a pass.

## filmstrip.mjs: the signature moment as stills

```bash
node scripts/qa/filmstrip.mjs <target> --selector ".deck" [--click css | --hover css | --scroll-to css] [--at 0,150,300,600,1200] [--width 1440] [--height 900] [--live] [--out shots/film]
```

Freezes the animation at exact moments (default: CSS and Web Animations are paused and seeked; `--live` captures in real time for requestAnimationFrame, canvas, WebGL). Writes one PNG per moment, the reduced-motion end state and `strip.png`.

## record.mjs: video loop

```bash
node scripts/qa/record.mjs <target> --seconds 8 --out shots/video [--selector css] [--width 1440 --height 900] [--hover css] [--move] [--scroll px] [--poster-at ms]
```

Writes `loop.webm`, plus `loop.mp4` and `poster.jpg` when ffmpeg is installed. Needs Playwright's recorder: `doctor.mjs --fix` if it is missing. Use it for every motion piece, then look at the poster and a few frames.

## fallback.mjs: metric-matched font fallback

```bash
node scripts/qa/fallback.mjs site/fonts/display.woff2 [--serif] [--name "Display Fallback"]
```

Prints an `@font-face` fallback (size-adjust and ascent/descent overrides) measured against Arial or, with `--serif`, Times New Roman, so the page does not jump when the web font arrives.

## Explore step (step 4)

Put the three first-screen directions in one `explore.html` (three sections or three iframes of the same file are fine), then `shoot.mjs explore.html --widths 390,1440 --out shots/explore`. Open every PNG, choose, and record one line per loser. Keep the loser lines in the chat or `design.md` notes, not in the shipped CSS.
