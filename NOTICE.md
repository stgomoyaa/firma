# Third-party notices / Procedencia

`firma` is a derivative work. It stands on three earlier anti-AI-slop design skills, and this file says exactly what came from where. Nothing here is copy-pasted prose (every line of `skills/firma/**` was written for this repo), but several of the *mechanisms* are inherited, and inherited mechanisms deserve credit even when the words are new.

`firma` es un trabajo derivado. Se para sobre tres skills anti-slop anteriores, y este archivo dice exactamente qué viene de dónde. Nada acá es prosa copiada (cada línea de `skills/firma/**` se escribió para este repo), pero varios de los *mecanismos* son heredados, y un mecanismo heredado se acredita igual aunque las palabras sean nuevas.

---

## hallmark (MIT)

**Original:** https://github.com/Nutlope/hallmark
**License:** MIT
**Authors:** Hassan El Mghari / Nutlope, with Together AI

The structural engine comes from hallmark. Specifically:

- **The macrostructure taxonomy.** `references/macroestructuras.md` uses the same 21 named page shapes, in the same order and numbering, as hallmark's `references/macrostructures/01-bento-grid.md` … `21-component-playground.md`. The names and the taxonomy are hallmark's. Every description, every diversification note, and every honesty constraint attached to them is written here.
- **The six-axis pre-emit self-critique**, including the single-line stamp format (`P5 H4 E5 S4 R5 V5`) and the "two passes is normal, three means the brief is wrong" heuristic.
- **The gate battery.** Roughly 50 of the ~60 gates in `references/slop-test.md` are consolidated and translated from hallmark's 58-gate slop test. The rest are new (see below).
- **The rotation mechanism**: a per-project log that forbids repeating recent structural choices, plus its three diversification axes (paper band / display style / accent hue).
- **The OKLCH theme engine** in `references/color.md`, and the literal token values of theme 7 (`Cobalto`), which are hallmark's `cobalt`. The other 11 themes were built with the same recipe but are not hallmark's values.

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

- **The `es` copy gate**: a blacklist-driven rule that rejects Argentine *voseo* in any user-visible string, with the tuteo rewrite for each form. No other skill in this genre has a Spanish-locale gate.
- **The honesty rule as a hard gate**, framed as consumer-law exposure (SERNAC, in Chile) rather than taste: no invented metrics, testimonials, client logos, or urgency counters. A macrostructure that requires data you don't have is the wrong macrostructure.
- **The `firma` requirement itself**: no page ships without one non-transferable artifact or gesture. This is the rule the repo is named after.
- **The grid-alignment gate**: orphan whitespace under an `h1` caused by an undeclared `align-items` on a multi-column grid with unequal heights. Caught in production, now mechanical.
- **The vetoed-tells list**: floating glow orbs, radially-masked grid backgrounds, a mono-caps eyebrow above every section, rows of identical shadowed cards, purple/mesh gradients, gradient text in headlines, Fraunces and Instrument Serif as default serifs.
- **dark-técnico as a first-class direction** with its own theme set, chamfer geometry, and CSS ticker recipe.
- **Component-scope mode**: when the brief is one component, skip macrostructure/nav/footer/rotation and get stricter about the eight interactive states.
- **A Definition of Done** that closes the scope instead of inviting another iteration.
- 11 of the 12 OKLCH themes.
