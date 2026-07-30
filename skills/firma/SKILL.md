---
name: firma
description: "Anti-AI-slop design skill for coding agents. Invoke BEFORE writing any markup or CSS for visual work: landing pages, new components, portfolios, heroes, pricing, redesigns, dark mode, 'make it look better/premium/less AI', or auditing existing UI. Also when asked to 'audit', 'redesign', 'firma' or to make a design not look AI-generated. Engine: OKLCH with tinted greys, one accent, display faces with character, macrostructures that rotate between builds so two pages never share a fingerprint, anti-tell gates, a locale register gate for user-visible copy, zero invented metrics or testimonials, and dark-technical aesthetics with CSS animation when they fit."
---

# firma

Two goals, in this order: the output must **not look AI-generated**, and it must have **real personality**. A clean design with no idea is the floor, not the achievement. Two consecutive builds should look like **different sites**, not colour swaps of one template.

The name is the central rule: nothing ships without **its firma** (Spanish for *signature*), the one artifact or gesture that would make no sense pasted into another site. A page without a firma is clean slop, and clean slop is still slop.

Three things this skill does that the rest of the genre does not:

1. **A locale register gate.** Every model has a dominant register per language, and it is wrong for most of the market you are shipping to. Here it is auto-fail, driven by an explicit banned-forms table, and a bundled linter enforces it.
2. **Honesty as a hard rule, not good taste.** Zero invented metrics, testimonials or client logos. In some markets that is consumer-law exposure rather than a style preference, which makes it structural: a macrostructure that needs data you do not have is the wrong macrostructure.
3. **Rotation memory across builds.** A per-project log forbids repeating the macrostructure, its family, the theme, the display face, the nav and the footer. Without it, any agent converges back on one house style within days.

Self-sufficient: it needs no other skill installed. If it conflicts with another design skill, **this one wins**. See `NOTICE.md` for what is inherited and from where.

---

## Hard rules (non-negotiable, active in every verb)

These are not style, they are law. They are checked in the gates (`references/slop-test.md`).

1. **Copy ships in the target locale's neutral register.** The register the model reaches for by default is auto-fail until proven right for that market. Name the locale, load its profile from `locales/`, treat its banned-forms table as a gate. Default profile: `locales/es-CL.md` (Spanish, neutral Chilean register, second person *tú*, zero Argentine voseo). If the brief names no locale, ask once: guessing the locale is guessing the audience. Detail in `references/copy.md`.
2. **Total honesty.** Zero invented testimonials, zero fake client logos, zero fabricated metrics ("+47% conversion", "5,000 customers"), zero fake urgency counters. With no real figure: a labelled grey placeholder ("metric to confirm"), or ask, or redesign the section without the proof slot. A stat-led hero with no real stat is the wrong macrostructure.
3. **Em-dashes (`—`) banned in every visible string.** It is THE AI-writing tell. Use a period, comma, colon or parentheses. Ranges take a plain hyphen (`2020-2026`, `$40-80`). This deliberately overrides the typographic convention that prescribes them.
4. **No italics inside headings.** Not one word in italic inside a title (`Built to <em>think</em>` is a top tell). Emphasis by weight, accent colour, or a drawn underline. Italic only as emphasis inside body paragraphs.
5. **Serifs are welcome** and add personality, **but Fraunces and Instrument Serif are vetoed as defaults** (every LLM's two favourite serifs; likewise Playfair, Cormorant and the didones as a reflex for "luxury"). Prefer more distinctive picks and **rotate** the display face between builds. Catalogue in `references/typography.md`.
6. **dark-técnico is a first-class direction**, not an exception: high-contrast dark, chamfered or notched geometry, a CSS ticker, phosphor accents. When the brief calls for it (dev tool, API, data, "technical", "dark"), it is the natural direction. Recipe in `references/motion.md`, themes in `references/themes.md`.
7. **Explicitly vetoed tells** (auto-fail even when they "look fine"): floating glow orbs · radially-masked grid backgrounds · a mono-caps eyebrow above EVERY section · rows of identical shadowed floating cards · the "glowing accent SaaS" look · purple and mesh gradients · gradient text in headlines.
8. **Layout verified, never assumed.** The classic bug: blank gap under the `h1` because a grid with `align-items: center` (or an implicit `stretch`) sits beside a taller column. Every grid of 2+ columns with unequal heights declares its alignment on purpose (`align-items: start` almost always), and gets checked for **orphan whitespace** and misaligned comparison columns. Its own gate.

---

## Verbs

| Invocation | What it does |
| --- | --- |
| *(default)* | Design or build something new. Follows the **Design flow** below. |
| `audit <target>` | Reads the target, scores it against `references/audit.md` plus the gates, returns a ranked punch list (critical/major/minor plus a verdict). **Does not edit.** |
| `redesign <target>` | Audit first, then restyle the visual layer **within the limits of the existing implementation** unless a full rebuild is explicitly confirmed. Preserves routes, content IA, copy voice, analytics hooks and slugs. Never deletes production files without an approved plan. |

In existing projects: declare which files will be touched before editing. Deletions need confirmation.

---

## Design flow (default)

### 0 · Pre-flight scan

If the project has code, **read it before asking anything**: `design.md` (if it exists it is the locked system and it wins), font stack (`next/font`, `@fontsource`, Google Fonts links, tailwind config), palette (`:root`, tokens), motion libraries, spacing scale, framework. Emit a short "Pre-flight: preserving X, introducing Y" block. Empty project: one line and move on.

### 1 · Design read (infer, do not interrogate)

Before touching code, infer from the brief: **audience · the job of the page (the single action) · the extreme of tone** (editorial, brutalist, technical, soft, luxury, playful, austere; "clean and modern" is not a tone). Declare it in ONE line:

> *"Reading this as: a landing page for <X> aimed at <audience>, <vibe> language, <direction> direction."*

If the read genuinely forks in two, **one** short question, never a questionnaire. If it can be inferred confidently, declare and move. With no brand signals in the brief, the default is honest personal brand: first person, concrete deliverables, zero performance.

### 2 · Direction

Four directions; the brief picks by signal, silent default **editorial-sober**:

- **editorial-sober** — the canonical anti-slop register. Tinted paper, serif or grotesk with character, hairlines, radius 0-4px, typography leads.
- **dark-técnico** — dev tools, APIs, infrastructure, data, "dark", "terminal". High contrast on tinted dark (never `#000`, never the default carbon blue), mono or grotesk display, chamfer or notch as the geometric signature, ONE CSS ticker allowed, phosphor accent ≤5%. The default when the content is technical, not an exception.
- **minimal-modern** — SaaS/B2B in the Linear or Stripe register. Cool neutrals allowed, precision, restraint.
- **warm-playful** — consumer, community, onboarding. Generous radius, humanist sans, more chroma.

The direction scopes which themes rotate and which gates relax. Say it out loud alongside the macrostructure pick.

### 3 · Memory and diversification (the most valuable part of the skill)

Read `.firma/log.json` at the project root (and `.hallmark/log.json` if the project came from hallmark, for continuity). Schema: a JSON array, newest entry first:

```json
[{ "date": "2026-07-17", "family": "Grid", "macro": "Bento", "theme": "Slate", "direction": "dark-tecnico", "display": "Tomorrow", "nav": "pill", "brief": "product landing" }]
```

Rules, against the last 3 to 5 entries:

- The macrostructure **shape** cannot repeat any of the last 3.
- The macrostructure **family** cannot repeat the previous build's. This is the rule that pays: two shapes from one family (Bento and Catalogue, both Grid) satisfy the shape rule and still produce two pages that look alike.
- The **theme** must differ from the previous one on at least 1 of 3 axes: **paper band** (dark <30% / mid 30-85% / light >85% lightness) · **display style** (high-contrast serif / classical serif / grotesk / mono / condensed-heavy / humanist) · **accent hue** (warm 10-60° / cool 200-300° / green-other / neutral).
- The **display face** cannot repeat the previous build's.
- Nav and footer archetypes cannot repeat the previous build's either.

**Declare the rotation in chat before choosing** ("Last 3: Grid/Bento/Slate, Document/Memo/Paper, Poster/Manifesto/Press → choosing Diptych/Split Studio/Cobalt, changes family and differs in band and accent"). Choose on the page, not in your head: that is what stops the slide back to the default attractor. At the end of the build, append to the log (trim to 20 entries).

### 4 · Macrostructure, nav and footer

If the target is an app surface rather than a marketing page (onboarding, settings, a dashboard, a form), skip this step and use `references/product-surfaces.md` instead: the macrostructure catalogue does not apply there.

Pick ONE of the 19 named shapes in `references/macrostructures.md` BEFORE writing code, and say which of the 11 **families** it belongs to. The macrostructure fixes heading placement, composition, divider language and button voice all at once. Specimen is not the default, and the **Proof** family is forbidden without a real, verifiable number or quote. Nav and footer are picked in the same step: **the "wordmark + 4 links + button on the right" nav and the "4 columns + social + copyright" footer are the most recognised AI fingerprints**; use them only with a real justification.

### 5 · Theme (palette plus fonts)

Copy-paste OKLCH catalogue in `references/themes.md` (includes 4 dark-technical themes). If the brief brings a brand colour, or a multi-attribute vibe the catalogue does not cover, build a custom theme with the engine in `references/color.md` (paper/ink/neutrals tinted to one anchor hue, one accent at 0.12-0.22 chroma). Universal rules: OKLCH throughout, no pure `#000` or `#fff`, greys ALWAYS tinted (chroma ≥0.005), accent ≤5% of the viewport, typography per `references/typography.md`.

### 6 · Preview (before emitting code)

A short bullet block so the person asking can redirect before 500 lines of CSS:

```markdown
**firma**
- **Direction** · dark-técnico
- **Macro** · Diptych / Split Studio
- **Theme** · Slate (warm dark · grotesk · amber-phosphor accent)
- **Fonts** · Tomorrow 700 / Switzer 400 / JetBrains Mono
- **Firma** · ticker of real metrics + chamfer on cards
- **Sections** · Hero · Demo · Pricing · FAQ · Close
- **Differs from the last build in** · macro family + paper band + display
```

The **firma** is mandatory: the ONE artifact or gesture that stops this page being pasteable into another site (a built CSS artifact, a bespoke silhouette, a ticker of real data, a typographic composition). A page with no firma is clean slop. No firma, no build.

### 7 · Build

- **Tokens locked.** Every colour and every `font-family` references a `:root` token (`var(--color-accent)`). Zero inline hex or oklch mid-render; if a value is missing, it goes up into the token block first.
- Named 4pt spacing scale (`--space-xs` … `--space-4xl`); no loose `padding: 17px`.
- Weights at the extremes: if body is 400, headings are 700-800 or 200. Never 500/600 as contrast.
- Asymmetry with a primary axis; at most 2 centred elements in the hero. Hairlines or tonal elevation instead of shadowed cards. Radius coherent with the direction (editorial 0-4px, one radius system per page).
- Motion: `transform` and `opacity` only, 3 named custom easings, ONE orchestrated entrance per page (not fade-up-on-scroll everywhere), `prefers-reduced-motion` always, and **content never hidden behind an entrance animation** (if the reveal does not fire, the section is blank). Detail in `references/motion.md`.
- Every interactive element gets its 8 states (default/hover/focus-visible/active/disabled/loading/error/success). Focus ring instant, never animated.
- Responsive verified at 320/375/768/1280: no horizontal scroll (`overflow-x: clip` on html and body), CTAs and nav links on ONE line, image grids use `minmax(0, 1fr)`.
- Copy per `references/copy.md`: specific, honest, in the target locale's register.
- **Stamp** on the first line of the CSS: `/* firma · macro: <n> · theme: <n> · direction: <d> · critique: P#J#E#F#H#V# */` and append to `.firma/log.json`.
- Never clobber an existing global stylesheet; append-only under the framework's directives.

### 8 · Gates and self-critique (before handing over)

1. **Six-axis self-critique** (1-5): Philosophy · Hierarchy · Execution · **Firma** · **Honesty** · Variety. Any axis <3 triggers a revision pass before the gates, with two exceptions that are not averaged: Honesty is 5 or it blocks the handoff, and Firma below 3 means there is no build. Detail in `references/slop-test.md`.
2. Run the **gates in `references/slop-test.md`**, which start with a deterministic Gate 0: the bundled `scripts/guard.mjs` plus an external detector. Every gate answer must be **no**. If a gate fails, fix it; slop does not ship.
3. Real visual verification when a browser is available (screenshots at 2-3 widths): optical centring, nothing clipped by a chamfer or notch, parallel columns aligned.

---

## Component scope (when the brief is a component, not a page)

Signals: it names a single UI element, the brief is ≤30 words, the target is a component file. In that case: skip macrostructure, nav, footer and the rotation log (components do not rotate), inherit tokens and direction from the project, and be STRICTER about states: all 8 with real code plus a preview that stacks them. The universal gates (typography, colour, contrast, motion, locale) apply unchanged.

---

## Definition of Done

The build is done when: gates green, firma present, responsive verified, copy passing the locale gate, and zero invented data. **That is where the scope closes.** Iterating past it unasked is scope creep that moves no metric; say so explicitly ("this is good enough to ship") when closing.

---

## Reference map (load only what the step asks for)

| File | When |
| --- | --- |
| `references/macrostructures.md` | Step 4, every page build |
| `references/themes.md` | Step 5, every build |
| `references/typography.md` | Step 5 plus build |
| `references/color.md` | Custom theme, or palette and contrast questions |
| `references/layout.md` | Build: space, asymmetry, depth, grid alignment |
| `references/product-surfaces.md` | Onboarding, settings, dashboards, forms, empty states |
| `references/motion.md` | Build with any interactive element or animation (includes the ticker recipe) |
| `references/copy.md` | Build: every visible string |
| `locales/<tag>.md` | Whenever copy is written; `es-CL` is the default profile |
| `references/slop-test.md` | Step 8, ALWAYS before handing over |
| `references/audit.md` | The `audit` and `redesign` verbs |
| `scripts/guard.mjs` | Gate 0, and any time you want the hard rules checked mechanically |

Provenance, in detail and with licences, in `NOTICE.md` of the repo: https://github.com/stgomoyaa/firma/blob/main/NOTICE.md
