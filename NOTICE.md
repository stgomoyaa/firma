# Third-party notices / Procedencia

`firma` is a derivative work. It stands on three earlier anti-AI-slop design skills, and this file says exactly what came from where. Nothing here is copy-pasted prose (every line of `skills/firma/**` was written for this repo), but several of the *mechanisms* are inherited, and inherited mechanisms deserve credit even when the words are new.

`firma` es un trabajo derivado. Se para sobre tres skills anti-slop anteriores, y este archivo dice exactamente qué viene de dónde. Nada acá es prosa copiada (cada línea de `skills/firma/**` se escribió para este repo), pero varios de los *mecanismos* son heredados, y un mecanismo heredado se acredita igual aunque las palabras sean nuevas.

---

## hallmark (MIT)

**Original:** https://github.com/Nutlope/hallmark
**License:** MIT
**Authors:** Hassan El Mghari / Nutlope, with Together AI

The structural engine comes from hallmark. Specifically:

- **The idea of picking a named page shape before writing code.** The catalogue itself was re-derived: `references/macroestructuras.md` now holds 18 shapes grouped into 10 families, against hallmark's flat list of 21. Near-duplicates were merged (its Specimen and Type Specimen became one Especimen family with typographic and photographic variants; Index-First and Ecosystem Index became one Índice; Stat-Led and Quote-Led became one Prueba family carrying the honesty gate once instead of twice), and the grouping exists to fix a real hole in the rotation rule, which is described below.
- **The idea of a six-axis pre-emit self-critique** scored 1 to 5, its single-line stamp, and the "two passes is normal, three means the brief is wrong" heuristic. The axes themselves were re-derived: hallmark scores Philosophy / Hierarchy / Execution / Specificity / Restraint / Variety, this skill scores Filosofía / Jerarquía / Ejecución / **Firma** / **Honestidad** / Variedad. Restraint folded into Ejecución (surplus decoration is bad execution, not less sobriety) and Specificity folded into Firma (a page with a real firma is specific by construction), which freed the two slots for the rules this skill actually enforces. Both new axes break the 1-to-5 scale on purpose: Honestidad is 5 or it blocks the handoff, and Firma below 3 means there is no build.
- **The gate battery.** Roughly 50 of the ~60 gates in `references/slop-test.md` are consolidated and translated from hallmark's 58-gate slop test. The rest are new (see below).
- **The rotation mechanism**: a per-project log that forbids repeating recent structural choices, plus its three theme diversification axes (paper band / display style / accent hue). The extension is this skill's: rotation also has to change the macrostructure **family**, not only the shape. Hallmark's rule allows Bento followed by Catalogue, which are both grids, so the log passes while the two pages still read alike.
- **The OKLCH theme engine** in `references/color.md`: the four-layer construction (paper / ink / tinted neutrals / one accent), the tinting discipline, and the three diversification axes.

Two of hallmark's rules are **deliberately overridden** here, and the override is the point:

| hallmark | firma |
|---|---|
| Prescribes em-dashes as good typography | Em-dashes are banned in visible text (they are the #1 AI writing tell) |
| Permits italic emphasis inside headings | Banned outright; emphasis by weight, accent colour, or a drawn underline |

## taste-skill (MIT)

**Original:** https://github.com/Leonxlnx/taste-skill
**License:** MIT
**Author:** Leonxlnx

Two behaviours come from taste-skill: **infer the design direction from the brief instead of interrogating the user** (one short question only when the read genuinely forks), and **audit before redesigning** anything that already exists.

## pols-antislop

**Original:** third-party visual audit reference, distributed as a Claude skill.

Conceptual influence only: the execution-defect lens, hunting concrete rendered defects (clipping, orphan whitespace, dead controls, contrast, no-JS legibility) rather than keyword-matching a checklist. No text and no license terms from that work are reproduced here; zero shared prose was found when this repo was audited before publication.

---

## What is original to `firma`

Listed explicitly so the derivation above is not read as the whole story:

- **The locale register gate**: a profile-driven rule that rejects the model's default register for the target market in any user-visible string, with the correct rewrite for each banned form. Generalised from the original Spanish-only rule into `locales/`, with `es-CL` shipped as the complete reference profile and the schema documented for writing others. No other skill in this genre has a locale gate at all.
- **The honesty rule as a hard gate**, framed as consumer-law exposure (SERNAC, in Chile) rather than taste: no invented metrics, testimonials, client logos, or urgency counters. A macrostructure that requires data you don't have is the wrong macrostructure.
- **The `firma` requirement itself**: no page ships without one non-transferable artifact or gesture. This is the rule the repo is named after.
- **The grid-alignment gate**: orphan whitespace under an `h1` caused by an undeclared `align-items` on a multi-column grid with unequal heights. Caught in production, now mechanical.
- **The vetoed-tells list**: floating glow orbs, radially-masked grid backgrounds, a mono-caps eyebrow above every section, rows of identical shadowed cards, purple/mesh gradients, gradient text in headlines, Fraunces and Instrument Serif as default serifs.
- **dark-técnico as a first-class direction** with its own theme set, chamfer geometry, and CSS ticker recipe.
- **Component-scope mode**: when the brief is one component, skip macrostructure/nav/footer/rotation and get stricter about the eight interactive states.
- **`scripts/guard.mjs`**, a zero-dependency deterministic linter for the hard rules an English-language linter cannot see: voseo, em-dashes in visible text, unconfirmed metrics, pure black and white, untinted greys, colour literals outside tokens.
- **`references/product-surfaces.md`**: guidance for app surfaces (onboarding, settings, dashboards, forms, empty states), which the macrostructure catalogue does not cover and component scope does not reach. Built around one rule: a product surface earns its firma by showing the product doing its actual job, not by decorating the form.
- **The Cinematic family and its craft contract** in `macrostructures.md` and `motion.md`: the pinned scroll stage, the layer contract, depth ordering, the frame-loop engine, the reversibility requirement, and a reduced-motion mode that keeps every piece of content available.
- **A Definition of Done** that closes the scope instead of inviting another iteration.
- **All 12 theme value sets** in `references/themes.md`. Theme 7 (`Cobalto`) started as hallmark's `cobalt` and was rebuilt from scratch, because hallmark's values used a neutral chroma of 0.004 and this skill's own floor is 0.005: its own theme failed its own rule. Every theme now ships with WCAG contrast computed for each token pair, and `Cobalto` gained a separate accent for use inside its dark band, where the light-mode accent only reaches 3.6:1.
