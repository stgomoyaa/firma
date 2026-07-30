<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/stgomoyaa/firma/main/assets/repo-banner-firma-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/stgomoyaa/firma/main/assets/repo-banner-firma-light.svg">
    <img width="880" alt="firma. An anti-AI-slop design skill for coding agents. Nothing ships without its firma. Stack: Markdown, Node, Zero deps." src="https://raw.githubusercontent.com/stgomoyaa/firma/main/assets/repo-banner-firma-light.svg">
  </picture>
</p>

# firma

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Reads the brief, picks one named shape before writing a line of code, writes the copy in the target market's own register, then runs a linter against itself before anything ships.** No em dash in that sentence: the skill would fail its own gate on itself, so neither does this one.

Nothing ships without passing 68 gates, a locale register check most anti-slop skills do not have, and two independent linters, none of which need an API key.

[Before and after](#before-and-after) · [Install](#install) · [Hard rules](#hard-rules) · [Directions](#one-brief-four-directions) · [What ships](#what-ships) · [Numbers](#the-numbers) · [Where this is weak](#where-this-is-weak) · [How it works](#how-it-works) · [Provenance](#provenance-and-license)

## What this is

`firma` is a skill folder for coding agents: one instructions file (`SKILL.md`), ten reference files, one shipped locale profile, and one zero-dependency linter. Installing it means copying `skills/firma/` into wherever your harness reads skill folders, nothing to build and nothing to run as a service. What you get forever, on every future build in that project: a fixed set of hard rules (no invented metrics, no em dashes, no italic headings, no default Argentine Spanish when the brief is Chilean), a rotation log so two builds do not repeat the same page shape and family, and a linter you can wire into CI without paying for a model call to check it.

It rewrites how a page looks and reads. It does not touch application logic, state, routing, backend code or test coverage, and `guard.mjs` parses text and CSS, not a live rendered page.

## Before and after

Two committed fixtures, not two versions of one brief. `examples/slop.html` is a generic SaaS landing page written the way a model defaults to write one. `examples/firma.html` is an events-API landing page built to this skill's spec: dark-technical direction, the Slate theme, the Split Studio macrostructure, a chamfer signature and one CSS ticker. They carry different content on purpose, so what follows is two independent measurements run through the same two linters, not a rewrite of one into the other.

| | `examples/slop.html` | `examples/firma.html` |
|---|---|---|
| `guard.mjs --locale es-CL` | 8 errors, 14 warnings | 0 errors, 1 warning |
| `npx impeccable detect` | 23 anti-patterns | 2 anti-patterns |
| Locale register | Argentine voseo ("vos", "Empezá gratis") | Chilean tuteo |
| Numbers in the copy | "+47%", "5.000 clientes", "99,9% uptime": none sourced | "por confirmar" (to confirm), labelled, nothing invented |
| Neutrals and blacks | pure `#ffffff`, `rgba(0,0,0,…)` shadow | every neutral tinted, no pure black or white |
| Accent treatment | purple to blue gradient text, a blurred glow orb | one amber phosphor accent, used only for links, the CTA and focus states |

Both commands are runnable against the committed files:

```bash
node skills/firma/scripts/guard.mjs --locale es-CL examples/slop.html
npx impeccable detect examples/slop.html
```

## The honest number

Set against those two linters and the catalogue behind them (68 gates, 12 themes, 19 page shapes across 11 families, a locale linter with 0 runtime dependencies), the number that stays flat is **1**: exactly one locale profile ships, `es-CL`. Every other hard rule (no em dashes, no invented metrics, no italic headings, the vetoed serifs, the rotation memory) applies in any language. The register gate, the rule this project is proudest of, only has a banned-forms table for that one market. Ask for Spanish outside Chile, or for Portuguese or German, and rule 1 still fires, it just has nothing to check the copy against. Writing another profile closes that gap; nothing in the tooling does it for you.

## Install

```bash
git clone https://github.com/stgomoyaa/firma.git
cp -R firma/skills/firma ~/.claude/skills/
```

Under a minute: one clone, one copy, no build step, no account, no API key. Requirements: a current Node.js to run `scripts/guard.mjs` (no `package.json`, nothing to `npm install`), and a harness that reads `SKILL.md` folders. Safe to re-run: the `cp -R` overwrites the same destination every time, and nothing in the skill writes outside `.firma/log.json` inside whichever project uses it.

Project-local works too, in `<project>/.claude/skills/firma/`. Other harnesses, same folder under a different root: `~/.agents/skills/` for the `.agents` convention, `~/.config/opencode/skills/` for OpenCode, `.cursor/skills/` for Cursor with Agent Skills enabled. Only the Claude Code path above is verified here.

> [!TIP]
> Point the guard at your own project once it is installed: `node skills/firma/scripts/guard.mjs --locale es-CL src/`. It scans every matching file, collects every finding, and exits 1 if any error-level one is present, so it wires into CI without a model call.

> [!IMPORTANT]
> Honesty and the locale register are hard gates, not style notes. One invented metric or one line of voseo Spanish fails the build regardless of how good the rest of the page is.

> [!NOTE]
> Only one locale profile ships. The schema for writing another, and the two rules that matter most (prefer an explicit banned-forms list to a clever pattern, never add a form you are unsure about), are in `skills/firma/locales/README.md`.

## Hard rules

Checked in the gates, active in every verb (`firma`, `firma audit <target>`, `firma redesign <target>`):

1. Copy ships in the target locale's neutral register. The model's default register is auto-fail until proven right for that market.
2. Total honesty. No invented metrics, testimonials, client logos or fake urgency counters.
3. No em dashes in visible text, the loudest AI-writing tell there is. A period, comma, colon or parentheses instead; ranges take a plain hyphen.
4. No italics inside headings. Emphasis by weight, accent colour, or a drawn underline.
5. Serifs are welcome. Fraunces and Instrument Serif are vetoed as defaults, because every LLM reaches for them first.
6. dark-technical is a first-class direction, not an exception.
7. A named veto list of tells that auto-fail even when they look fine (glow orbs, masked grid backgrounds, the eyebrow-above-every-section habit, identical shadowed cards).
8. Layout verified, never assumed. Declared grid alignment, checked for orphan whitespace.

## One brief, four directions

The same brief routes to a different slice of the theme catalogue depending on which of the four directions it reads as. This is the axis the rotation log walks every build: same input, different setting.

| Direction | Themes it draws from |
|---|---|
| dark-technical | Slate, Phosphor, Press, Forest |
| editorial-sober | Paper, Newsprint, Smoke, Riso |
| minimal-modern | Cobalt, Mono+Pop |
| warm-playful | Terracotta, Olive |

Source: `skills/firma/references/themes.md`, "How to choose" step 2.

## What ships

| File | What it holds |
|---|---|
| `SKILL.md` | The 8 hard rules, the 3 verbs, and the 8-step design flow |
| `references/macrostructures.md` | 19 page shapes in 11 families, plus nav and footer archetypes |
| `references/themes.md` | 12 copy-paste OKLCH themes, with contrast declared per token pair |
| `references/typography.md` | Pairings by direction, and the faces vetoed as LLM defaults |
| `references/color.md` | The OKLCH engine for building a theme from a brand colour |
| `references/layout.md` | Space, asymmetry, depth, and the grid-alignment gate |
| `references/motion.md` | Motion budget, named easings, the CSS ticker, the scroll-cinematic contract |
| `references/copy.md` | Locale-independent copy rules, honesty, banned openings |
| `references/product-surfaces.md` | Onboarding, settings, dashboards, forms, empty states |
| `references/readme.md` | A repository README, which is a shipped surface with its own slop shape |
| `references/slop-test.md` | 68 gates plus the six-axis self-critique, run before every handoff |
| `references/audit.md` | Scoring rubric for the `audit` and `redesign` verbs |
| `locales/es-CL.md` | The one shipped locale profile: Spanish, neutral Chilean register, tuteo |
| `scripts/guard.mjs` | The deterministic linter for the hard rules. Node, 0 dependencies |
| `examples/` | The two fixtures this README measures |

## The numbers

Every count below was produced this session by reading or grepping the committed files, not estimated. Reproduce any row with the command in the third column.

| Metric | Value | Reproduce |
|---|---|---|
| Gates in `slop-test.md` | 68 | `grep -cE '^[0-9]+\.' skills/firma/references/slop-test.md` |
| Macrostructure shapes / families | 19 / 11 | count the bold shape names and the `## N ·` family headings in `skills/firma/references/macrostructures.md` |
| OKLCH themes | 12 | `grep -cE '^### [0-9]+ ' skills/firma/references/themes.md` |
| Locale profiles shipped | 1 (`es-CL`) | `ls skills/firma/locales/*.md` |
| Runtime dependencies | 0 | no `package.json` in the repo; `scripts/guard.mjs` imports only `node:fs` and `node:path` |
| `guard.mjs` on `examples/slop.html` | 8 errors, 14 warnings | `node skills/firma/scripts/guard.mjs --locale es-CL examples/slop.html` |
| `guard.mjs` on `examples/firma.html` | 0 errors, 1 warning | `node skills/firma/scripts/guard.mjs --locale es-CL examples/firma.html` |
| `impeccable detect` on `examples/slop.html` | 23 anti-patterns | `npx impeccable detect examples/slop.html` |
| `impeccable detect` on `examples/firma.html` | 2 anti-patterns, both edge cases this skill documents on purpose (the CSS ticker override, and Space Grotesk used under the skill's explicit-rotation exception rather than as a first pick) | `npx impeccable detect examples/firma.html` |
| Cobalt theme contrast against paper (ink, muted, neutral, accent) | 16.3:1, 9.2:1, 5.1:1, 4.6:1 | declared in `skills/firma/references/themes.md`, theme 7, not computed this session |
| Cobalt `--color-accent-dark` inside the graphite band | 6.2:1 | same source |

## Where this is weak

- Of the 68 gates in `slop-test.md`, only the subset `guard.mjs` and `impeccable detect` cover is checked mechanically. The rest are self-reported: the same model that wrote the page is the one asked whether the page passes them.
- One locale profile ships. Every hard rule except the register gate applies in any language; the register gate itself only has a banned-forms table for `es-CL`.
- `guard.mjs` reads text and CSS with regular expressions, not a rendered DOM. It cannot compute contrast, detect real card nesting, or tell whether an element is actually visible; that half of the job belongs to `impeccable`, which needs a real HTML parse.
- The rotation log at `.firma/log.json` is a plain file the agent is instructed to read and append to. `guard.mjs` skips that directory outright and enforces none of it: delete the log and the rotation memory the whole skill leans on for variety is gone with it.

## How it works

1. **Pre-flight.** Read the existing code first (`design.md` if present, font stack, tokens, framework) before asking anything.
2. **Read.** Infer audience, the page's single job and a tone extreme from the brief; declare the read in one line.
3. **Rotate.** Check `.firma/log.json` against the last 3 to 5 builds; the macrostructure shape cannot repeat any of them and the family cannot repeat the previous one.
4. **Theme.** Pick from the 12-theme catalogue, or build one from a brand colour with the OKLCH engine; every colour locked into a `:root` token.
5. **Preview.** Emit a short bullet block, including the one firma artifact, before writing any CSS.
6. **Build.** Tokens only, named spacing scale, copy run through the target locale's profile, a stamp on the first line of the CSS.
7. **Gate.** Score the six-axis self-critique, then run all 68 gates starting with `guard.mjs` and `impeccable detect`; hand over only once every gate answers no.

## Provenance and license

`firma` is a derivative work and says so. The shape of the six-axis self-critique, most of the gate battery, the rotation mechanism and the OKLCH engine come from [hallmark](https://github.com/Nutlope/hallmark) (MIT), along with the idea of picking a named page shape before writing code. The shape catalogue itself was re-derived here: 19 shapes in 11 families, near-duplicates merged and the family grouping added to close a hole in the rotation rule. Brief inference and audit-first come from [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). The execution-defect lens comes from pols-antislop. Full breakdown, including the two hallmark rules this skill deliberately overrides, in [`NOTICE.md`](NOTICE.md).

MIT. Copy it, fork it, strip the attribution if you must, but the locale gate and the honesty gate are the two rules worth keeping even if nothing else survives the fork.

Built by [Santiago Moya](https://github.com/stgomoyaa).
