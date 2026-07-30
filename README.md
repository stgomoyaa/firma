# firma

**An anti-AI-slop design skill for coding agents.**

Every model was trained on the same SaaS templates, so every model reaches for the same page: Inter, a purple gradient, an eyebrow label above each section, three identical shadowed cards, a glow orb behind the hero. There is a small field of skills that fight this. `firma` is one of them, and it is honest about standing on the others (see [`NOTICE.md`](NOTICE.md)).

Three things it adds that the field does not cover.

**1. A locale register gate.** Every model has a dominant register per language, learned from whatever dominated its training data. Ask for Spanish and you get Argentine voseo: `Empezá gratis`, `crece con vos`, `mirá el demo`. Fluent, confident, and wrong for most of the market you are shipping to, and telling the model "write in Spanish" does not fix it because it believes it already did. Here it is auto-fail against an explicit banned-forms table, and a bundled linter enforces it. No other skill in this genre has a locale gate at all.

**2. Honesty as a hard gate, not good taste.** No invented metrics, no fabricated testimonials, no client logos you do not have, no fake urgency counters. In some markets that is consumer-law exposure, not a style preference. The consequence is structural: a stat-led hero with no real stat is the wrong macrostructure, so the skill picks a different one instead of inventing `+47% conversion`.

**3. Rotation memory, by family.** A per-project log records the macrostructure, its family, the theme, display face, nav and footer of every build. The next build cannot repeat any of the last three shapes, and cannot reuse the previous build's **family**. That second rule is what makes the first one work: Bento followed by Catalogue passes a shape-only check and still gives you two grids. Without rotation, an agent converges back on one house style within a week, and clean-but-identical is still slop.

Plus the rule the skill is named after: **nothing ships without its firma** (Spanish for *signature*), the one artifact or gesture that would make no sense pasted into another site. A built CSS artifact, a bespoke silhouette, a ticker of real numbers, a typographic composition. No firma, no build.

## What is in the box

| File | What it holds |
|---|---|
| `SKILL.md` | The 8 hard rules, 3 verbs, and the 8-step design flow |
| `references/macrostructures.md` | 19 page shapes in 11 families, plus nav and footer archetypes, chosen before any code |
| `references/themes.md` | 12 copy-paste OKLCH themes, 4 of them dark-technical, contrast verified |
| `references/typography.md` | Pairings by direction, and the faces vetoed for being LLM defaults |
| `references/color.md` | The OKLCH engine for building a theme from a brand colour |
| `references/layout.md` | Space, asymmetry, depth, and the grid-alignment gate |
| `references/motion.md` | Motion budget, named easings, the CSS ticker, the scroll-cinematic contract |
| `references/copy.md` | Locale-independent copy rules, honesty, banned openings |
| `references/product-surfaces.md` | Onboarding, settings, dashboards, forms, empty states |
| `references/slop-test.md` | 68 gates plus a six-axis self-critique, run before every handoff |
| `references/audit.md` | Scoring rubric for the `audit` and `redesign` verbs |
| `locales/es-CL.md` | The shipped locale profile: Spanish, neutral Chilean register, tuteo |
| `scripts/guard.mjs` | Deterministic linter for the hard rules. Node, zero dependencies |

## Install

The skill is a folder of markdown plus one script. Any harness that reads `SKILL.md` directories can use it.

```bash
git clone https://github.com/stgomoyaa/firma.git
cp -R firma/skills/firma ~/.claude/skills/
```

Project-local works too, in `<project>/.claude/skills/firma/`. Other harnesses: same folder, different destination. `~/.agents/skills/` for the `.agents` convention, `~/.config/opencode/skills/` for OpenCode, `.cursor/skills/` for Cursor with Agent Skills enabled. Only the Claude Code path is verified here; the rest follow each harness's documented skill location.

## Use

```
firma                      # design something new: runs the 8-step flow
firma audit <target>       # score an existing surface, ranked punch list, no edits
firma redesign <target>    # audit first, then restyle inside the existing implementation
```

The default flow, condensed: read the existing code before asking anything, state the design read in one line, pick a direction, check the rotation log, pick a macrostructure family and shape plus nav and footer, pick a theme, emit a short preview block so you can redirect, build against locked tokens, then run the gates and the self-critique before handing back.

The skill is written to be read by an agent, not by a human on a train. It is opinionated on purpose, and short on purpose.

## The 8 hard rules

1. Copy ships in the target locale's neutral register. The model's default register is auto-fail.
2. Total honesty. No invented metrics, testimonials, or logos.
3. **No em-dashes in visible text.** The single loudest AI writing tell.
4. No italics inside headings. Emphasis by weight, accent, or a drawn underline.
5. Serifs are welcome. Fraunces and Instrument Serif are vetoed as defaults, because every LLM reaches for them first.
6. dark-técnico is a first-class direction, not an exception.
7. A named veto list of tells that auto-fail even when they look fine.
8. Layout verified, never assumed. Declared grid alignment, no orphan whitespace.

## Locale profiles

The gate is driven by a profile in `locales/`, so it works for any language whose default register is wrong for your market.

**One profile ships, on purpose.** Writing a profile means knowing a market's register well enough to say which forms are wrong, and inventing that from the outside produces exactly the confident nonsense the profile exists to prevent. `es-CL` is complete and battle-tested. The schema for writing another is documented in `locales/README.md`, including the two rules that matter: prefer an explicit banned-forms list to a clever pattern, and never add a form you are unsure about, because a gate with false positives gets disabled and a disabled gate catches nothing.

## Deterministic linting: two linters, not one

The gates in `slop-test.md` are run by the agent, which means they are self-reported: the model that wrote the page is the one asked whether the page is slop. Two deterministic linters close that gap, and they cover different halves of it.

**1. The bundled guard**, for the hard rules a generic linter does not have. Node, zero dependencies, ships inside the skill:

```bash
node <skill-path>/scripts/guard.mjs --locale es-CL src/   # exit 1 on errors
node <skill-path>/scripts/guard.mjs src/ --json           # for CI
```

It flags banned locale forms in visible text, em-dashes and en-dashes in visible text, unconfirmed marketing metrics, pure `#000`/`#fff`, exact untinted greys (including `oklch` below 0.005 chroma), and colour literals declared outside a token. It reads text and CSS, not a DOM: it will not compute contrast or detect real card nesting.

**2. [impeccable](https://github.com/pbakaus/impeccable)'s detector**, for the generic execution layer, with a real DOM and AST. No LLM, no API key:

```bash
npx impeccable detect src/
```

It catches contrast, grey-on-colour, nested cards, glow shadows, AI palettes and eyebrow chips. It does not know about locale registers or fabricated metrics, and its em-dash rule is advisory and needs eight occurrences to fire, so it will never enforce rule 3. One of its rules conflicts with this skill on purpose: the dark-technical direction prescribes exactly one CSS ticker per page, with a motion budget and `prefers-reduced-motion` honoured, which its `marquee` rule reads as a defect. Waive that one and nothing else:

```json
{ "detector": { "ignoreRules": ["marquee"] } }
```

## Provenance

`firma` is a derivative work and says so. The shape of the six-axis self-critique, most of the gate battery, the rotation mechanism and the OKLCH engine come from [hallmark](https://github.com/Nutlope/hallmark) (MIT), along with the idea of picking a named page shape before writing code. The shape catalogue itself was re-derived here: 19 shapes in 11 families, with near-duplicates merged and the family grouping added to close a hole in the rotation rule. Brief inference and audit-first come from [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). The execution-defect lens comes from pols-antislop. Full breakdown, including the two hallmark rules this skill deliberately overrides, in [`NOTICE.md`](NOTICE.md).

MIT licensed. Built by [Santiago Moya](https://github.com/stgomoyaa).
