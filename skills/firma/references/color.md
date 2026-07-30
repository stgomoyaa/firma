# Colour

AI-generated UI fails at colour first: it picks blue, uses pure black, draws a purple-cyan gradient, and floods 30% of the page with the accent. All of that is corrected here.

## Principles

- **OKLCH everywhere.** Perceptually uniform; `hsl()` and `rgb()` lie about brightness.
- **One accent.** Two at most. Everything else is neutral. The accent occupies **≤5% of any viewport** (count by area: solid fills, headings in accent, backgrounds).
- **No pure extremes.** No `#000`, no `#fff`. Always tint toward the anchor hue.
- **Tinted greys.** Warm anchor gives warm neutrals; cool anchor gives cool ones. Minimum chroma 0.005 on every neutral. A flat grey (chroma 0) reads as a wireframe.

## Palette construction (the engine for custom themes)

Four layers, all tinted to the same anchor hue:

1. **Paper** — the base surface. Light: `oklch(95-98% 0.005-0.015 <hue>)`. Dark: `oklch(12-18% 0.008-0.02 <hue>)`.
2. **Ink** — primary text. Light: `oklch(16-24% 0.005-0.02 <hue>)`. Dark: `oklch(92-96% 0.005-0.01 <hue>)`.
3. **Neutrals** — 5 to 9 steps between paper and ink, all carrying the anchor's tint (0.005-0.015).
4. **Accent** — one saturated colour (chroma 0.12-0.22). Links, active states, focus, highlights. Never the background of a whole section.

```css
:root {
  --color-paper:   oklch(96% 0.012 80);
  --color-paper-2: oklch(93% 0.014 80);
  --color-border:  oklch(82% 0.010 80);
  --color-neutral: oklch(56% 0.008 80);
  --color-muted:   oklch(40% 0.008 70);
  --color-ink:     oklch(18% 0.010 60);
  --color-accent:  oklch(62% 0.20 40);
  --color-focus:   oklch(55% 0.19 55);
}
```

## Dark mode recipe (and dark themes)

- Paper lightness 12-18%, never `#000`. Ink 92-96%, never `#fff`.
- Body font-weight drops 50 units (400 → 350) to compensate for the optical weight of light text on dark.
- Accent: -0.02/-0.04 chroma, +5-10% lightness relative to light mode.
- **Elevation is LIGHTER surfaces** (+3% lightness per level), not shadows. A shadow over dark creates accidental glow.
- The anchor hue does not change between modes; only lightness and chroma do.
- **The default dark-slop is banned:** carbon-blue / slate-indigo (`#0c0e15` and family) with a lilac accent is the night twin of the purple gradient. A dark theme does not have to be blue: warm, green-black, warm carbon, oxblood-black. Chosen, not defaulted.

## Contrast

| Content | WCAG minimum | Target |
| --- | --- | --- |
| Body text | 4.5:1 | 7:1 |
| Large text (≥24px, or ≥18px bold), icons, focus rings | 3:1 | 4.5:1 |

Quick OKLCH check: if `|L_text − L_background| < 50%` it probably fails; confirm it. The ones that slip through most: text inheriting `color` inside a card that switched to `paper-2`; a button whose text ≈ its fill (black on black, because the model forgot `--color-accent-ink`); a dark section whose interior still carries dark ink. **Every rule that sets a dark `background` sets a light `color` in the same rule.**

When a theme has a dark band inside a light page, the light-mode accent usually fails against that band. Give the band its own accent token at higher lightness and lower chroma rather than reusing the page accent and hoping.

## Palettes vetoed as defaults

- **Purple-to-cyan, purple-to-blue, mesh gradients, aurora blobs.** The number-one AI fingerprint.
- **Beige+brass premium:** cream or bone (`#f5f1ea` and family) plus brass, clay or ochre plus espresso, for any "premium/artisanal" brief. It is THE LLM default for premium consumer. Alternatives: cool luxury (silver/smoke), forest (deep green + bone + amber), black + tan, cobalt + cream, terracotta + slate, monochrome plus one saturated pop.
- **"Editorial" cream as a reflex.** Choosing cream is the new choosing a purple gradient; valid only when chosen with an argument.
- **UI-kit grey** (gray-100/200, `#f3f4f6`) as a footer band or surface: a wireframe in its default state.
- **Gradients with 3+ stops**, and gradients animated on hover.

## Using the accent

It is a highlighter, not a block: active nav item, focus ring, hover underline, the primary CTA's border or text, a small square beside a heading. Do not fill giant buttons with it, do not fill whole sections, no glow. In dark-técnico the phosphor accent follows the same ≤5% rule: it glows because it is scarce. **If you feel like using more accent, that is the signal to use less.**

Continuity rule: sections resolve into one another with no hard colour seams; at most one deliberate hard cut per page (for example the footer dropping to its own floor). And one accent per page, locked: a warm-grey site does not get a blue CTA in section 7.
