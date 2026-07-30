# Layout and space

This is where "AI-generated" gets caught: equal columns, everything centred, every card identical.

## Principles

- Every layout has a **primary axis**: left-biased, right-biased, top-heavy. Centred-everything is a default, not a decision.
- **Asymmetry reads intentional; perfect symmetry reads generated.** When in doubt, offset it.
- Spacing is a **scale, not loose values**. And varied: if every gap is 24px, it is a template.
- **Breaking the grid once on purpose** (a pull-quote, a photo, a number crossing the column boundary) is worth more than never breaking it.

## Spacing scale (4pt, named)

```css
:root {
  --space-3xs: 0.125rem; --space-2xs: 0.25rem; --space-xs: 0.5rem;
  --space-sm: 0.75rem;   --space-md: 1rem;     --space-lg: 1.5rem;
  --space-xl: 2.5rem;    --space-2xl: 4rem;    --space-3xl: 6rem;
  --space-4xl: 9rem;
}
```

`gap` for siblings; `margin` only for optical adjustments or break-outs. No value outside the scale (`padding: 17px` is a tell). Sections carry DIFFERENT padding from each other: if card padding equals section equals page, the rhythm is flat.

## Grid alignment and orphan whitespace gate (hard rule 8)

The classic bug, caught in production: **a blank gap under the `h1`** because the hero grid had `align-items: center` (or an implicit `stretch`) and the neighbouring column was taller, leaving the text column floating with dead air above and below. Mechanical checklist for EVERY grid or flex of 2+ columns with unequal heights:

1. Declare the alignment on purpose: almost always `align-items: start` on a hero grid (text starts at the top, the visual is free to grow).
2. Hunt for **orphan whitespace**: air that was not designed but simply "ended up there" (under a heading, between an `h1` and its lede, at the foot of a short column). If a space cannot be explained as a rhythm decision, it is a bug.
3. **Comparable parallel columns** (pricing, plans, before/after): every role (title, price, body, list, button) shares a horizontal line across ALL columns. Equal heights, button anchored to the bottom (`margin-top: auto`), space reserved for variable copy. The text length of one cell never decides where its neighbours' content falls.
4. Section head coherent with its body: a narrow auto-centred head (`margin-inline: auto` plus `max-width`) floating above full-width left-aligned content is the classic accidental mismatch.

## Asymmetry (techniques)

- A wide left margin as permanent negative space.
- Offset grids: odd columns wider (`grid-template-columns: 1.2fr 1fr 0.8fr`), or 12 columns with different spans per item.
- One break-out per page. Generous top plus tight bottom, or the reverse.
- **Ban:** the eyebrow or number to the LEFT of the heading on the same row (tag-left/header-right) is the most reliable editorial-templated tell. When there is an eyebrow at all (almost never, see `copy.md`), it goes ABOVE the heading in the same column, stacked vertically.

## Depth

- Hierarchy comes from **weight and scale**, not shadow. A card with a hairline border or tonal elevation (surface ±3% lightness plus a stroke in the surface's own colour at low opacity) beats a card with a drop shadow.
- If there is a shadow: ONE, small, directional, tinted to the surface. Never an even black bloom on all sides, never a coloured glow on a light background, never a shadow over dark.
- No card inside a card. One level of containment.
- Z-index on a named 6-level scale; never `z-index: 9999`.

## Execution (the misses that slip through)

- **Nothing is left badly centred.** A number floating high in its circle, a glyph sitting low in its tile: verify mathematical AND optical centring, do not assume it. In SVG: `text-anchor: middle` plus `dominant-baseline: central` (or a measured `dy`).
- **Clear the cut:** every `clip-path`, notch, `overflow: hidden` or fixed height is verified pixel by pixel at its edge: no clipped cap, no eaten descender. The dark-technical chamfer includes the padding that keeps content whole.
- **Text never touches the edge** of the viewport or its container; a deliberate, consistent gutter across every block.
- Content crossing a section overlap does not get guillotined at the seam.
- The hero owns the first viewport: it either fills the fold or controls exactly what peeks below. Never half a section sneaking in unaligned.
- Hero: `min-h-[100dvh]` when full-height, never `h-screen` (the iOS bar). Essential content (headline, lede, CTA) visible without scrolling at 1280×800. Hero padding-top capped (~6rem): more than that and the content floats like a bug.

## Page-edge clipping

Every element that overflows on purpose (a full-bleed marquee, an oversized headline, a tilted figure) requires a global clip:

```css
html, body { overflow-x: clip; }  /* clip, not hidden: preserves sticky and fixed */
```

Grids with images: tracks at `minmax(0, 1fr)`, never bare `1fr` (the `auto` minimum of a 1024px image breaks the layout on mobile).

## When the layout is correct but flat

Before shipping, do one of these: (1) add a break-out, (2) unbalance a column width, (3) move the primary CTA off centre, (4) replace a card with negative space, (5) vary the padding of ONE section so the rhythm is uneven.
