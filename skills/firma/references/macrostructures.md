# Macrostructures — 19 shapes in 11 families

Pick ONE before writing code. Each shape is a complete fingerprint: heading placement, body composition, divider language, button voice, image treatment. Picking a named shape is faster and more varied than deciding six loose axes.

**Shapes are grouped into families, and the family is what governs rotation.** Two different grids still read as two grids: going from Bento to Catalogue satisfies "do not repeat the macro" without producing a different site. So there are two rules, not one:

- The **shape** cannot repeat any of the last 3 entries in `.firma/log.json`.
- The **family** cannot repeat the immediately previous build's.

Vague brief: pick inside Grid, Document, Poster or Product, which cover the large majority of cases. **Specimen is not a default**: only for an explicitly editorial, type-foundry or visual-catalogue brief. **Cinematic is not a default either**: it is the most expensive family to build and the easiest to get wrong.

---

## 1 · Grid — the rhythm comes from the cells

**Bento** — modular blocks at DIFFERENT sizes (feature, quote, image, stat). The rhythm comes from size variation, not from uniform cards. Cells hold exactly the content that exists; never a filler cell, never 6 white-on-white text-only cells.

**Catalogue** — a uniform grid of variations on one thing (SKUs, palettes, plans, typefaces). A visual index of inventory. Here uniformity IS correct: the items are comparable and the eye compares them.

**Portfolio** — project cards, filterable if there are enough items to justify the filter. The work is the product. A filter over 3 items is decoration; under 6 items, use a plain list.

## 2 · Document — reads as continuous text

**Memo** — continuous prose with inline heads, in the register of a memo or a journal. The page is literature about the product, not a brochure about the product.

**Letter** — first person, intimate, opens with a greeting. No buttons in the fold. A personal note from the founder. Fits personal brands that do not perform.

**FAQ** — questions in bold, answers short. The page reads as an honest interview with the product. Works when the buyer's real objections are the most valuable content you have.

## 3 · Poster — one declaration dominates

**Marquee** — the hero IS the page above the fold: one statement or one visual fills the viewport. Below it, the page becomes something else (a list, a grid, prose). The transition is the effect.

**Manifesto** — large polemical typography, declaration energy, sustained across the whole page. It tells the reader what to believe before what to buy.

## 4 · Proof — the page is built on ONE real datum

**Proof-Led** — the hero is a single piece of evidence and everything after it holds that evidence up. Two variants: **number** (one giant stat) or **quote** (a pull-quote with attribution).

Honesty gate, non-negotiable: **without the real datum this family is forbidden.** It does not get filled with an invented number or a composite testimonial. If there is no verifiable number or quote, the right macro is a different one. And the datum never stands alone: always with the line that says what it means.

## 5 · Product — the software is the content

**Workbench** — real product screenshots as the primary content; a guided tour of the app in use. Less marketing, more "here is what you do with it". Real screenshots or none: an invented mockup of a UI that does not exist is the visual version of a fabricated metric.

**Playground** — interactive code-and-preview blocks as the primary content. Every control that looks interactive WORKS. A dead control is a bug, not decoration.

## 6 · Sequence — the order is the content

**Stages** — numbered steps telling how the product is used over time. The numbering here is genuinely ordinal, which makes it the legitimate exception to the numbered-eyebrow veto.

**Feature Stack** — sticky left panel (label and description) plus a scroll-synced right panel. Cinematic rhythm. Watch for double stickies at `top: 0`: the second one gets offset below the nav or they overlap.

## 7 · Index — navigation IS the design

**Index** — the page is a list of links, or several discovery surfaces at once (featured, recent, by category). The value is browsing, and the design is the hierarchy of the list. It scales from a flat index to a hub: same shape, more surfaces.

## 8 · Spatial — the arrangement is not linear

**Diagram** — one large diagram organises the page (a flow, a network, a system map, an architecture). Information is laid out spatially rather than in sequence. Fits dark-técnico very well, and it is the only family where the central artifact can also be the page's firma.

## 9 · Specimen — the material is the content

**Typographic** — the type IS the design: numbered labels in the margin, enormous sizes, asymmetric spans, a typographic CTA. Foundry, design system, or any page where the type is the proof.

**Photographic** — one enormous image dominates each fold; the text is small annotation. The page says *look* before it says *read*. Requires good original photography: with generic stock this shape collapses on its own.

## 10 · Diptych — the split screen is the rhythm

**Split Studio** — each block divides the screen, text on one side and proof on the other, alternating direction. At most 2 consecutive splits in the same alternation direction; the third breaks with full-width or another family.

## 11 · Cinematic — scroll drives a camera through one world

**Scroll Stage** — one long scroll container, one pinned viewport-height stage, aligned depth layers inside it, and scroll progress mapped to transforms, opacity, blur and narrative panels. Not a stack of unrelated full-screen sections, and not a prerecorded video: one coherent world with a camera moving through it.

**Only pick this when the subject is genuinely spatial** (a place, a physical product, a system you travel through) and real art exists to move. For a text product, a dashboard, or anything a reader came to scan, it is the wrong family and an expensive one to discover that in.

Its craft rules are long enough to live elsewhere: the layer contract, the depth ordering, the engine, the reversibility requirement and the reduced-motion mode are all in `motion.md` under "Scroll-driven cinematic". Two of them decide whether the build succeeds:

- **Every layer shares one camera, light direction and colour grade, carries 10-20% bleed, and contains no baked-in text.** Copy stays semantic HTML.
- **The timeline is deterministic and fully reversible.** Scrolling back up must reverse every visual state cleanly. Most implementations in this family are only tested downward, and that is where they break.

The firma of a Scroll Stage page is the world itself, which means it only counts if the art is specific. Stock layers moved with good easing are still stock.

---

## Nav and footer (picked in the same step)

They are part of the fingerprint, not optional chrome.

**Navs (rotate between builds):** minimal 2-links (only if there genuinely are 2 destinations) · SaaS three-section · floating chip · side rail · floating pill with blur · newspaper masthead · brutal slab · terminal/command · minimal edge-aligned · with a retractable banner · inline ⌘K pill. **The default AI nav (wordmark left + 4-5 links + button right + hairline + white background) fails the gate** without a real justification. Nav on ONE line on desktop, height ≤80px.

**Footers (rotate between builds):** masthead · single inline line · dense colophon · statement (closes with one sentence) · letter sign-off · newsletter-first · giant composed wordmark (anchored to the bottom edge, no gap below, nothing clipped). **The default AI footer (4 columns of Product/Company/Resources/Legal + social + copyright)** only in a genuine docs hub.

## How to choose

1. Read the brief; note the strong signals ("data heavy" → Diagram or Proof-Led, "tell the story" → Stages, "personal" → Letter, "many small features" → Bento, "they need to compare" → Catalogue, "walk me through the place" with real art → Scroll Stage).
2. Exclude the last 3 shapes from the log **and the previous build's family**.
3. Check the Proof family gate: if the brief asks for it but there is no real datum, change family now, not mid-build.
4. Declare the pick in plain text before any code: "Family: Diptych. Shape: Split Studio. Nav: pill. Footer: statement."
5. Genuinely tied: offer 3 options from categorically different families (one grid, one document, one poster) and let the person asking choose.

## SaaS sequence (only when it applies)

For B2B SaaS in the Grid, Proof or Product families: hero → social proof (REAL logos only) → features → testimonials (REAL only) → pricing (price visible; "contact us" on every tier is a tell) → FAQ → final CTA (ONE button) → footer. It is a recipe for what must exist, not a template for how it looks. For non-SaaS (letter, manifesto, editorial) this sequence does NOT apply.
