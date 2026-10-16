---
name: firma
description: "Anti-AI-slop design skill for coding agents. Invoke BEFORE writing any markup or CSS for visual work: landing pages, new components, portfolios, heroes, pricing, redesigns, dark mode, 'make it look better/premium/less AI', or auditing existing UI. Also for social visuals: Instagram posts, carousels, reel covers, thumbnails, ads. Also when asked to 'audit', 'redesign', 'firma' or to make a design not look AI-generated. Engine: real references pulled before designing (Inspo MCP, DESIGN.md libraries, real posts) and extracted rather than imitated, a measured craft layer from Stripe, Linear, Vercel and Apple (tracking by size, ink, two-layer depth, brand gradients), a mandatory hero asset (product UI in code with real data, or a GPT Image / Higgsfield image), three looked-at render rounds before handover, OKLCH with tinted greys, one accent, macrostructures that rotate between builds (not on sales pages of an existing venture), anti-tell gates, a locale register gate for user-visible copy, zero invented metrics or testimonials, and dark-technical aesthetics with CSS animation when they fit."
---

# firma

Three goals, in this order: the output must **not look AI-generated**, it must reach **reference-level craft** (Stripe, Linear, Vercel, Apple), and it must have **real personality**. The skill has two layers: guardrails that remove tells (below) and a measured craft layer that adds what removing tells never produces (`references/craft.md`). Clean is the floor. The craft layer is the job. A clean design with no idea is the floor, not the achievement. Two consecutive builds should look like **different sites**, not colour swaps of one template.

The name is the central rule: nothing ships without **its firma** (Spanish for *signature*), the one artifact or gesture that would make no sense pasted into another site. A page without a firma is clean slop, and clean slop is still slop.

Three things this skill does that the rest of the genre does not:

1. **A locale register gate.** Every model has a dominant register per language, and it is wrong for most of the market you are shipping to. Here it is auto-fail, driven by an explicit banned-forms table, and a bundled linter enforces it.
2. **Honesty as a hard rule, not good taste.** Zero invented metrics, testimonials or client logos. In some markets that is consumer-law exposure rather than a style preference, which makes it structural: a macrostructure that needs data you do not have is the wrong macrostructure.
3. **Rotation memory across builds.** A per-project log forbids repeating the macrostructure, its family, the theme, the display face, the nav and the footer. Without it, any agent converges back on one house style within days.

Self-sufficient: it needs no other skill installed. If it conflicts with another design skill, **this one wins**. See `NOTICE.md` for what is inherited and from where.

---

## Hard rules (non-negotiable, active in every verb)

Only rules 1-4 are law; they block handover. Rules 5-9 are strong defaults: follow them unless `references/craft.md` or the brief gives a measured reason not to, and say which one you are overriding and why.

1. **Copy ships in the target locale's neutral register.** The register the model reaches for by default is auto-fail until proven right for that market. Name the locale, load its profile from `locales/`, treat its banned-forms table as a gate. Default profile: `locales/es-CL.md` (Spanish, neutral Chilean register, second person *tú*, zero Argentine voseo). If the brief names no locale, ask once: guessing the locale is guessing the audience. Detail in `references/copy.md`.
2. **Total honesty.** Zero invented testimonials, zero fake client logos, zero fabricated metrics ("+47% conversion", "5,000 customers"), zero fake urgency counters. With no real figure: a labelled grey placeholder ("metric to confirm"), or ask, or redesign the section without the proof slot. A stat-led hero with no real stat is the wrong macrostructure.
3. **Em-dashes (`—`) banned in every visible string.** It is THE AI-writing tell. Use a period, comma, colon or parentheses. Ranges take a plain hyphen (`2020-2026`, `$40-80`). This deliberately overrides the typographic convention that prescribes them.
   - **Scope:** shipped user-visible copy. Headlines, body, buttons, labels, captions, alt text, emails, error strings. It does not govern source comments, commit messages, or this documentation, which is why these reference files use em-dashes as definition separators. The bundled guard enforces the same scope: it extracts visible text and skips comments.
4. **No italics used as emphasis inside headings.** One word italicised inside a title to make it feel important (`Built to <em>think</em>`) is a top tell, and it is auto-fail. Emphasis goes by weight, accent colour, or a drawn underline.

   **What this does not ban is italic as a systematic register.** A page that alternates roman and italic across EVERY heading as a compositional device (fashion, editorial, an atelier) is using a typographic system, not reaching for emphasis. The test is consistency: if the italic appears in one heading it is emphasis and it fails; if it structures all of them and would look broken removed, it is the voice of the page. Read as emphasis by default, since the reflex version is far more common than the deliberate one.
### Strong defaults (override with a stated, measured reason)

5. **Serifs are welcome** and add personality, **but Fraunces and Instrument Serif are vetoed as defaults** (every LLM's two favourite serifs; likewise Playfair, Cormorant and the didones as a reflex for "luxury"). Prefer more distinctive picks and **rotate** the display face between builds. Catalogue in `references/typography.md`.
6. **dark-técnico is a first-class direction**, not an exception: high-contrast dark, chamfered or notched geometry, a CSS ticker, phosphor accents. When the brief calls for it (dev tool, API, data, "technical", "dark"), it is the natural direction. Recipe in `references/motion.md`, themes in `references/themes.md`.
7. **No visual element is banned by its shape. What is banned is reaching for one with no reason.** A glow, an aurora, a beam, a grid background, a floating card, a mesh gradient: each is a tell when it is decoration applied by reflex, and each is legitimate when the material of THIS brief asks for it. The difference is not the element, it is whether anything on the page made it necessary.

   **The test is written and falsifiable.** An element from this list earns its place only if the build states, in the CSS stamp, one sentence naming what in this brief produced it. Then apply the swap test: **rewrite the sentence for a different client. If it still works, it was not a justification.**

   - Passes: *"the product is a signal farm, so the phosphor bloom is the signal arriving."* Says something no other brief says.
   - Fails: *"adds depth and a modern feel."* Works for anything, therefore justifies nothing.

   The reflex versions remain auto-fail because nothing produced them: orbs floating behind content for atmosphere · a mono-caps eyebrow above EVERY section · rows of identical cards with identical shadow, radius and size · the "glowing accent SaaS" look worn as a costume · gradient text in headlines.

   This rule is the one that most often gets misread as "keep it austere". It is not. **Avoiding every element on the list produces its own house style**, and a page that dodged all of them and invented nothing still ships slop. See "The deepest tell" in `references/slop-test.md`.
8. **Layout verified, never assumed.** The classic bug: blank gap under the `h1` because a grid with `align-items: center` (or an implicit `stretch`) sits beside a taller column. Every grid of 2+ columns with unequal heights declares its alignment on purpose (`align-items: start` almost always), and gets checked for **orphan whitespace** and misaligned comparison columns. Its own gate.
9. **Real references before design, extracted not imitated.** A model designing from memory lands on its training average, which is the template look no rule can remove. Before choosing direction, macrostructure or theme, pull 3-5 real references for the same job (Inspo MCP with industry filters, DESIGN.md libraries, or real posts for social work) and take patterns and numbers, never identity. The result differs from each reference on at least 2 of palette anchor hue, display face and macrostructure composition, and takes a written position on the category's gravity. It is checked side by side against those references before handover; without a model that can see, the handover says "visual verification pending", never "pass". Applies beyond the browser: Instagram posts, carousels, reel covers, thumbnails and ads. Method in `references/references.md`.

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

### 1b · References (before choosing anything)

**Faster start:** `node scripts/draw.mjs` deals 3 researched directions from a gallery-site library (`references/directions.md`); use them as the three candidates for the explore step instead of inventing three from scratch.

Hard rule 9. Pull 3-5 real references for this job before steps 2-5, in this order: Inspo MCP (`recommend` with `industry`/`vibe`/`mode` filters, never the brief alone), DESIGN.md libraries (which one per surface, and how to fetch a Refero card from the terminal: `references/fuentes-design-md.md`), and for social surfaces real posts from accounts in the same vertical and price tier. Read the category gravity (consensus paper band, display class, accent hue) and decide where this build stands on it. Declare in ONE line: *"References: A, B, C. Category: light / grotesk / cool → against on display, because <brief-specific reason>."* The choices in steps 2-5 have to be traceable to this line or to the brief. If no source is reachable, say so and design with that stated limitation. Method, extraction rules and the distance test in `references/references.md`.

### 2 · Direction

Four directions; the brief picks by signal, silent default **editorial-sober**:

- **editorial-sober** — the canonical anti-slop register. Tinted paper, serif or grotesk with character, hairlines, radius 0-4px, typography leads.
- **dark-técnico** — dev tools, APIs, infrastructure, data, "dark", "terminal". High contrast on tinted dark (never `#000`, never the default carbon blue), mono or grotesk display, chamfer or notch as the geometric signature, ONE CSS ticker allowed, phosphor accent ≤5%. The default when the content is technical, not an exception.
- **minimal-modern** — SaaS/B2B in the Linear or Stripe register. Cool neutrals allowed, precision, restraint.
- **warm-playful** — consumer, community, onboarding. Generous radius, humanist sans, more chroma.


**Sales and conversion sites (customer-first, local market).** When the job of the page is selling (sales landing, raffle, ecommerce, booking), the silent default changes:
- **`references/craft.md` is mandatory**: its type, ink, depth and spacing numbers are the floor. A neutral grotesk executed to those numbers beats a face with personality at defaults.
- **A hero asset is mandatory** (craft.md, "The hero asset"): the product UI rebuilt in code with real data, or a generated image (GPT Image via a Codex worker, or Higgsfield). A hero made only of type and boxes does not ship.
- **Rotation is not a hard rule here.** Refine one system across builds of the same venture instead of rotating seven axes; rotate only between different ventures.
- **Motion by default**: scroll reveals, hover states, one hero animation, honoring `prefers-reduced-motion`. Never ship it static and wait to be asked.
- **More color and impact** than editorial-sober: match the chroma of the real competitors in that vertical in Chile, still with one primary accent.
- **"Clone X" briefs**: when the brief is "copy X / sell the same but cheaper", the competitor is the spec. Replicate its structure, funnel steps, feature set and pricing tiers; firma governs execution quality, not the concept.
- **Editable levers**: badges, counters, prices, packs and their order, and operating config (hours, slots, areas) are editable from an admin panel, not hardcoded.
- **Persona panel before handover**: 3-5 subagents acting as concrete buyers (and sellers, for a marketplace) report whether they trust it, understand how to buy, and what stops them.

The direction scopes which themes rotate and which gates relax. Say it out loud alongside the macrostructure pick.

### 3 · Memory and diversification (the most valuable part of the skill)

Read `.firma/log.json` at the project root (and `.hallmark/log.json` if the project came from hallmark, for continuity). Schema: a JSON array, newest entry first:

```json
[{ "date": "2026-07-17", "family": "Grid", "macro": "Bento", "theme": "Slate", "direction": "dark-tecnico", "display": "Tomorrow", "nav": "pill", "interaction": "ticker", "brief": "product landing" }]
```

Rules, against the last 3 to 5 entries (portfolio, editorial and new-venture work; on sales and conversion pages of an existing venture, keep its system and skip these):

- The macrostructure **shape** cannot repeat any of the last 3.
- The macrostructure **family** cannot repeat the previous build's. This is the rule that pays: two shapes from one family (Bento and Catalogue, both Grid) satisfy the shape rule and still produce two pages that look alike.
- The **theme** must differ from the previous one on at least 1 of 3 axes: **paper band** (dark <30% / mid 30-85% / light >85% lightness) · **display style** (high-contrast serif / classical serif / grotesk / mono / condensed-heavy / humanist) · **accent hue** (warm 10-60° / cool 200-300° / green-other / neutral).
- The **display face** cannot repeat the previous build's.
- Nav and footer archetypes cannot repeat the previous build's either.
- The **interaction** cannot repeat the previous build's either. This is the axis that was missing: two pages can rotate macro, theme, display, nav and footer and still behave identically, and behaviour is half of what a visitor remembers. Rotate what the page DOES: an orchestrated entrance · a scroll-driven camera · hover that reveals · a pinned panel that swaps · a ticker · a page transition (View Transitions, native and dependency-free: `references/motion.md`) · nothing at all (deliberate stillness is a legitimate pick and reads as confidence when the type carries the page).

**Declare the rotation in chat before choosing** ("Last 3: Grid/Bento/Slate, Document/Memo/Paper, Poster/Manifesto/Press → choosing Diptych/Split Studio/Cobalt, changes family and differs in band and accent"). Choose on the page, not in your head: that is what stops the slide back to the default attractor. At the end of the build, append to the log (trim to 20 entries).

### 4 · Macrostructure, nav and footer

If the target is an app surface rather than a marketing page (onboarding, settings, a dashboard, a form), skip this step and use `references/product-surfaces.md` instead: the macrostructure catalogue does not apply there. If the target is a repository README, use `references/readme.md`, which has its own structure and its own gates.

Pick ONE of the 19 named shapes in `references/macrostructures.md` BEFORE writing code, and say which of the 11 **families** it belongs to. With Inspo connected, pull real examples of the chosen shape (`find_examples_for_macrostructure`) and read the numbers of the closest one (`get_design_system`) before building. The macrostructure fixes heading placement, composition, divider language and button voice all at once. Specimen is not the default, and the **Proof** family is forbidden without a real, verifiable number or quote. Nav and footer are picked in the same step: **the "wordmark + 4 links + button on the right" nav and the "4 columns + social + copyright" footer are the most recognised AI fingerprints**; use them only with a real justification.

**Explore three directions before committing (marketing pages and new surfaces).** Render the first screen (above the fold) in THREE genuinely different directions in one `explore.html`. They must differ on ground (light, dark, saturated or image), display face and accent hue family, **and on layout of the first screen** (any two directions may share at most one of layout, face, palette, hero visual), and each must obey the hard rules (OKLCH, one accent, vetoed faces) and the rotation log from step 3. Shoot it with `scripts/qa/shoot.mjs` (`references/qa.md`), then **squint test**: blur the three first screens (or view them at thumbnail size) and compare where the light and dark masses sit; if two read the same, change the layout, never just the colour (from oil-ui). Pick one, and write one line per loser on why it lost. Skip for a single component inside an existing `design.md` system, and for fixes.

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
- **References** · <3-5 real sites or accounts with URLs> (source: Inspo `developer-tools` / DESIGN.md library / real posts)
- **Took / rejected** · <pattern + measured number> / <what they do that this brief should not>
- **Category gravity** · <paper / display / accent consensus> (<source, n sites>) → against on accent: warm amber, because the product is a physical signal farm
```

The **firma** is mandatory: the ONE artifact or gesture that stops this page being pasteable into another site (a built CSS artifact, a bespoke silhouette, a ticker of real data, a typographic composition). A page with no firma is clean slop. No firma, no build.

**How to find it — the firma is derived from the material, never picked from a menu.** Choosing "a ticker" because the last build had a chamfer is rotation, not invention, and rotation runs out. Before the preview, answer these four in one line each and build the firma from whichever answers with something concrete:

1. **What does this business have that no competitor has?** A physical object, a real number, a process, a constraint, a place, a piece of jargon its customers use and nobody else does.
2. **What does the product actually output?** Its own output composed live beats any illustration of it. A dashboard shows a real row, an API shows a real response, a store shows a real order.
3. **What is the unglamorous operational detail?** Ports, batch numbers, cutoff times, physical inventory, delivery windows. This is where the specificity lives, and it is the one competitors will not copy because it is not flattering.
4. **What would the owner argue about?** The opinion the business holds that a neutral competitor would not print.

If all four come back empty, the brief is too thin to design against and that is the finding: say so and ask for material, rather than reaching for a decorative gesture to fill the slot. **A firma invented in the absence of material is decoration with a better name.**

### 7 · Build

- **Tokens locked.** Every colour and every `font-family` references a `:root` token (`var(--color-accent)`). Zero inline hex or oklch mid-render; if a value is missing, it goes up into the token block first.
- Named 4pt spacing scale (`--space-xs` … `--space-4xl`); no loose `padding: 17px`.
- Type executed to `references/craft.md`: tracking by size (negative from 24px up), display line-height 1.0-1.05, optical sizing and stylistic sets on, ink never black, four text tones. Display weight is a decision: light-to-regular (300-510) with tight tracking is the reference register; heavy (700-800) is a poster register. Never 600 by default.
- Asymmetry with a primary axis; at most 2 centred elements in the hero. Tonal elevation plus translucent borders; shadows only on what floats, two layers, tinted to the ink (craft.md). Radius coherent with the direction (editorial 0-4px, one radius system per page).
- Motion: `transform` and `opacity` only, 3 named custom easings, ONE orchestrated entrance per page (not fade-up-on-scroll everywhere) **on editorial and portfolio pages; sales and product pages follow the density floor in `references/craft.md` instead, where every section moves with scroll**, `prefers-reduced-motion` always, and **content never hidden behind an entrance animation** (if the reveal does not fire, the section is blank). Detail in `references/motion.md`.
- Every interactive element gets its 8 states (default/hover/focus-visible/active/disabled/loading/error/success). Focus ring instant, never animated.
- Responsive checked at 320/375/768/1280/1440 by the QA scan in step 8 (not by eye alone): no horizontal scroll (`overflow-x: clip` on html and body), CTAs and nav links on ONE line, image grids use `minmax(0, 1fr)`.
- Copy per `references/copy.md`: specific, honest, in the target locale's register.
- **Stamp** on the first line of the CSS: `/* firma · macro: <n> · theme: <n> · direction: <d> · critique: P#J#E#F#H#V# */` and append to `.firma/log.json`. If the build uses any element covered by hard rule 7, the stamp carries its one-sentence justification too.
- **Emit `design.md`** at the project root, generated from the tokens the build actually shipped, per `references/design-md.md`. This closes the loop with step 0, which reads it: the next build on this project inherits the system instead of re-deriving it, and its **don'ts section** is what stops a later agent from breaking a scale it did not choose. Generated from the CSS, never typed by hand, or it drifts and starts lying.
- Never clobber an existing global stylesheet; append-only under the framework's directives.

### 8 · Iterate with eyes, then gates (before handing over)

**Three rounds minimum of render → look → correct.** Each round: render at 375 (device emulation, never a shrunk window: headless Chrome will not go below ~500px with `--window-size`) and 1440 with `scripts/qa/shoot.mjs`, look at the screenshots next to the references, write 3-8 specific corrections (a value, an element, a pixel distance), apply them. Who does what: the coordinator (Opus, a model that can see) looks and decides the corrections; the executor applies them. QA runs where a browser works: the coordinator's own session, `ops-tester` or a worker that can drive a browser. Never inside a sandbox that cannot open Chrome. A build with fewer than three looked-at rounds is handed over as "draft", not done.

### 8b · Gates and self-critique

1. **Six-axis self-critique** (1-5): Philosophy · Hierarchy · Execution · **Firma** · **Honesty** · Variety. Any axis <3 triggers a revision pass before the gates, with two exceptions that are not averaged: Honesty is 5 or it blocks the handoff, and Firma below 3 means there is no build. Detail in `references/slop-test.md`.
2. Run the **82 gates in `references/slop-test.md`** (16 are conditional: 8 for app surfaces, 6 for READMEs, 2 for View Transitions), which start with a deterministic Gate 0: the bundled `scripts/guard.mjs` plus an external detector. Every gate answer must be **no**. If a gate fails, fix it; slop does not ship.

   **The external detector is `impeccable`, pinned:** `npx -y impeccable@3.6.0 detect <dir-or-file> [--json]`. Pinned on purpose: a gate on `@latest` drifts on its own and a rule that appears overnight starts failing builds nobody changed. It reads `.impeccable/config.json` at the project root (`detector.ignoreRules`, `detector.ignoreFiles`, `detector.ignoreValues`).

   **It is a linter, never an authority on design.** When it flags something this skill prescribes on purpose, the answer is neither to obey it nor to ignore the tool: add the rule id to `detector.ignoreRules` with a one-line comment naming which rule of this skill it collides with. An unexplained ignore is how a gate quietly stops meaning anything.

   **What it does and does not cover, measured 26-08-2026 on v3.6.0.** It catches the generic layer: `gradient-text`, `low-contrast` (WCAG AA with the real ratio), nested cards, AI palettes. It does **not** catch the three that cost the most here: the locale register (hard rule 1), fabricated metrics (hard rule 2), or em-dashes in visible copy (hard rule 3, which it treats as advisory and never fails on). A shipped build scanned clean (`detect src/index.css` → `[]`) while a fixture written to violate these three passed its scan untouched. So: the detector covers the layer any tool covers, and this skill keeps the delta. Never swap `scripts/guard.mjs` for it; run both.
3. **Side-by-side visual verification against the references** (`references/references.md`): screenshots at 2-3 widths, or at real size and grid size for social canvases, viewed next to the references. Check optical centring, nothing clipped by a chamfer or notch, parallel columns aligned, and answer the three written questions there. On fixed canvases, measure text rects against decorative elements and safe zones; a pixel-ink bounding box is not a layout check.
4. **Rendered QA (`scripts/qa/`, details in `references/qa.md`).** Run `node scripts/qa/shoot.mjs <file|folder|url> --widths 320,375,768,1280,1440` and read its defect scan: sideways scroll, clipped or wrapped text, contrast, tap targets, focus walk, collapsed images. Run `scripts/qa/matrix.mjs` when the page ships to the public (Windows, Linux, Android, 320px reflow, reduced motion, translation-length stress). Motion pieces are recorded with `record.mjs` and frozen with `filmstrip.mjs`. Any FAIL from the scan blocks handover; warns get a fix or one line on why they are deliberate. No model that can see images available: hand over as "visual verification pending", never "pass".

---

## Component scope (when the brief is a component, not a page)

Signals: it names a single UI element, the brief is ≤30 words, the target is a component file. In that case: skip macrostructure, nav, footer and the rotation log (components do not rotate), inherit tokens and direction from the project, and be STRICTER about states: all 8 with real code plus a preview that stacks them. The universal gates (typography, colour, contrast, motion, locale) apply unchanged.

---

## Definition of Done

The build is done when: gates green, firma present, references cited and the result viewed next to them, responsive verified, copy passing the locale gate, `design.md` emitted and matching the tokens, and zero invented data. **That is where the scope closes.** Iterating past it unasked is scope creep that moves no metric; say so explicitly ("this is good enough to ship") when closing.

---

## Reference map (load only what the step asks for)

| File | When |
| --- | --- |
| `references/craft.md` | Every sales, product or marketing page: measured type, ink, depth, gradient, spacing and the mandatory hero asset |
| `references/references.md` | Step 1b and step 8, every build: sources, extraction, distance test, side-by-side check |
| `references/macrostructures.md` | Step 4, every page build |
| `references/themes.md` | Step 5, every build |
| `references/typography.md` | Step 5 plus build |
| `references/color.md` | Custom theme, or palette and contrast questions |
| `references/layout.md` | Build: space, asymmetry, depth, grid alignment |
| `references/product-surfaces.md` | Onboarding, settings, dashboards, forms, empty states |
| `references/readme.md` | A repository README, which is a shipped surface with its own slop shape |
| `references/motion.md` | Build with any interactive element or animation (includes the ticker recipe) |
| `references/copy.md` | Build: every visible string |
| `references/design-md.md` | Step 7: emitting the project's `design.md` from the shipped tokens |
| `locales/<tag>.md` | Whenever copy is written; `es-CL` is the default profile |
| `references/slop-test.md` | Step 8, ALWAYS before handing over |
| `references/audit.md` | The `audit` and `redesign` verbs |
| `scripts/guard.mjs` | Gate 0, and any time you want the hard rules checked mechanically |
| `references/directions.md` | Step 1b: dealing three researched directions and finding free photos |
| `references/qa.md` | Steps 4 and 8: the explore step and the rendered QA toolkit in `scripts/qa/` |

Provenance, in detail and with licences, in `NOTICE.md` of the repo: https://github.com/stgomoyaa/firma/blob/main/NOTICE.md
