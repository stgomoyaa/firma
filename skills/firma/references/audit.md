# Audit — hunting tells in existing UI

For the `audit` and `redesign` verbs. Read the whole target (markup plus CSS plus the render if a browser is available), identify CONCRETE violations (not keyword matches), report them ranked. In `redesign`: audit first, touch afterwards, preserving content IA, routes, slugs, nav labels, form field names (analytics and autofill), the logo and legal copy. None of that changes without explicit approval.

## Report format

```
[critical|major|minor] Name of the tell — file:line
  why it is a tell (one line)
  → fix (one line)

Summary — N critical · M major · K minor
Verdict — [ships as slop | reads as AI | close, fix the minors]
```

## Critical (ships as slop)

- Hero with a purple or mesh gradient, or aurora blobs; gradient text in a headline.
- Inter or Roboto as the only family; single-font with no intent.
- A grid of 3 identical icon-above features; cloned floating cards with the same shadow.
- Pure `#000`/`#fff`; untinted greys; the default carbon-blue dark; the default beige+brass premium.
- Invented metrics, testimonials or logos (a tell, and legal exposure in some markets).
- Redrawn chrome (fake browser, phone or terminal with traffic-light dots); screenshots built from divs.
- Copy in the register the active locale profile bans; em-dashes scattered through the text.
- Content invisible without JS (a reveal that does not fire leaves a blank section).
- Text illegible from contrast (button text ≈ its fill; a dark section with dark ink).
- Nav and footer in the exact AI fingerprint (wordmark + links + button / 4 columns + social).

## Major (reads as AI)

- A mono-caps eyebrow above every section; an eyebrow beside the heading; numbered labels (`01 / FEATURES`).
- Everything centred section after section; a `100vh` hero holding one sentence.
- The default hero stack with a panel on the right; the fill+outline pair; CTAs duplicated in intent.
- Italic emphasis inside headings.
- Glow orbs; a radially-masked grid background; a symmetric radial glow behind the hero object; inner-glow on badges; a pulsing "live" dot.
- Even shadow on everything; hover-lift plus shadow plus border-glow bolted onto every card; hover-boop on buttons; a growing underline.
- Fade-up-on-scroll in every section; decorative parallax; non-functional infinite loops; more than one marquee.
- An icon in a coloured tile; emoji as icons; two icon libraries mixed; pack icons hand-redrawn "to look custom".
- Glass with banding, leaking or popping; grain OVER the content instead of behind it.
- Tinted pills on every piece of metadata; a fake countdown; version labels in the hero; scroll cues; locale or weather strips; decorative photo credits; text rotated 90°.
- A kicker plus serif H2 in every section; a serif statement with one italic word; a CTA island with a pill form; the same section kit recycled from the previous build (house-style recycling).

## Minor (taste details)

- Straight quotes; `...` instead of `…`; double spaces.
- Generic placeholder people (`Jane Doe`) or companies (Acme, Nexus).
- `z-index: 9999`; padding values off the scale; every section carrying identical padding.
- `width: 100vw`; chained middle dots; tabular data without `tabular-nums`.

## Execution defects (hunt for these actively, they slip through most)

1. **Failed centring:** content that should have been centred in its box, circle or pill and sits off. Verify mathematically AND optically.
2. **Orphan whitespace and misaligned grids:** dead gap under the `h1` (`align-items: center` beside a tall column), pricing columns out of register (buttons at different heights), a centred head above left-flush body.
3. **Clipped content:** caps sliced by a clip, notch, overflow or fixed height; eaten descenders; a giant footer wordmark clipped or unaligned.
4. **Text against the edge** with no gutter.
5. **A CTA or nav item wrapping to 2 lines**; a 2-line nav on desktop.
6. **Horizontal scroll** at any width from 320 to 1920.
7. **Colour seams:** a glow or scrim dying abruptly at a section edge; a full-bleed image with a hard seam against the background.
8. **Dead controls:** tabs, accordions or toggles that do not respond. Click them for real if a browser is available.
9. **Suffocated display type:** negative tracking pushed until the glyphs touch; separators buried.
10. **Overlapping stickies:** an inner sticky at `top: 0` painting over the nav.

## Redesign priority (order of leverage)

1. Typography (the largest visual lift per unit of risk).
2. Spacing and vertical rhythm.
3. Colour recalibration (desaturate, unify tinted neutrals, one accent).
4. An appropriate motion layer.
5. Recomposing the hero and the key sections.
6. Full replacement of a block, only when it is unsalvageable.

Stop when the brief is satisfied. If content IA and SEO are healthy, directed evolution (steps 1 to 4) delivers roughly 70% of the value at roughly 40% of the risk; a full rebuild is reserved for real structural debt and always needs approval.
