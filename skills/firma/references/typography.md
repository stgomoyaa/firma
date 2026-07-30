# Typography

Typography carries the design. If the type is wrong, nothing else matters.

## Principles

- A page is a **pairing**: display face plus body face. One single family only when that IS the decision (a deliberate monospace-everywhere terminal).
- **The 2+1 rule:** three families maximum. Display plus body plus an optional outlier (wordmark, hero stat, pull quote) used in ≤2 places across the whole page. Four families is slop. Mono counts as a family.
- **Weights at the extremes.** 800 next to 400 reads intentional; 600 next to 400 reads default. Minimum 300 units of contrast between heading and body.
- Scale by ratio (1.25 major third by default), at most 5 sizes per page; more hierarchy comes from weight and colour.
- Line-height: display 1.05-1.2 (floor of 1.0 in all-caps, or cap-tops collide when it wraps), body 1.5-1.65. Measure 45-75ch (`max-width: 65ch`).
- `font-display: swap`, `font-variant-numeric: tabular-nums` on every column of numbers, curly quotes, a real `…`. Never synthesise bold or italic.

## Banned as defaults (on-distribution for every LLM)

- **Sans:** Inter, Roboto, Open Sans, Lato, Poppins, Nunito, Montserrat, Raleway, Work Sans, DM Sans, Sora, Syne, Archivo, Figtree, Gabarito, and `system-ui` as the only stack.
- **Serif:** **Fraunces** and **Instrument Serif** (the AI's two favourites), plus Playfair Display, Cormorant Garamond, Lora, Merriweather, and the didones (Bodoni/Didot) as a reflex for "luxury".
- **Mono:** Courier New, default Consolas, the system mono as a brand voice.
- **Saturated grotesks:** **Space Grotesk** and **Geist** leave the default slot. Space Grotesk became the "tasteful alternative" for everything technical and deterministic linters now flag it alongside Inter; it stays available through explicit rotation, never as a theme's first pick.

Exceptions: if the user asks for one by name, use it. Inter Tight only as a supporting body face in technical themes, never as display. A vetoed serif can be used with an explicit brand justification, never as a reflex.

**Serifs in general ARE allowed** and they add personality. The veto is on the two every LLM reaches for, not on the category.

## Catalogue (free: Google Fonts plus Fontshare)

### Display

| Family | Source | Voice | For |
| --- | --- | --- | --- |
| **Newsreader** | Google | Roman serif with optical size | Editorial, longform |
| **EB Garamond** | Google | Honest classical | Editorial, slow reading |
| **Cardo** | Google | Academic serif | Reference, slow reading |
| **DM Serif Display** | Google | High-contrast bracketed serif | "Printed" headlines |
| **Sentient** | Fontshare | Variable serif, soft contrast | Soft editorial, atmospheric |
| **Erode** | Fontshare | Distressed, hand-set serif | Riso, tactile, brand-y |
| **Bricolage Grotesque** | Google | Variable display sans, raw weights | Brutal, playful, personality |
| **Space Grotesk** | Google | Geometric grotesk with a quirk | Explicit rotation only, see the veto above |
| **Familjen Grotesk** | Google | Warm grotesk with character | Editorial sans, product with a voice |
| **Cabinet Grotesk** | Fontshare | Display grotesk, 9 weights | Editorial display, magazine |
| **General Sans** | Fontshare | Modern grotesk | Minimal-modern |
| **Clash Display** | Fontshare | Ultra-condensed | Posters, brand moments |
| **Tanker** | Fontshare | Heavy condensed, pure display | One-word mastheads |
| **Anton** | Google | Industrial condensed | Manifestos |
| **Big Shoulders Display** | Google | Industrial condensed | Declarative, sport |
| **Tomorrow** | Google | Variable near-future condensed | Dark-technical |
| **Satoshi** | Fontshare | Playful geometric | Warm-playful |
| **Geist** | Google | Neutral modern grotesk | Minimal-modern, body-grade |

### Body

Geist · Switzer (Fontshare) · General Sans · IBM Plex Sans · Newsreader · Source Serif 4 · EB Garamond · Spectral · Crimson Pro · Satoshi.

### Mono and outlier

Geist Mono · JetBrains Mono · IBM Plex Mono · Commit Mono · Space Mono (retro quirk).

## Pairings by direction

| Direction | Display | Body | Outlier |
| --- | --- | --- | --- |
| **editorial-sober** | Newsreader · EB Garamond · Cabinet Grotesk · Familjen Grotesk · Erode | Switzer · IBM Plex Sans · Source Serif 4 | JetBrains Mono · Geist Mono |
| **dark-técnico** | Tomorrow (700) · Switzer (700) · JetBrains Mono · Commit Mono | Geist · IBM Plex Sans | the display's mono, or Cabinet (wordmark) |
| **minimal-modern** | Geist (700) · General Sans · Familjen Grotesk | Geist · Switzer | Geist Mono |
| **warm-playful** | Bricolage Grotesque · Satoshi · Sentient | Satoshi · Geist · Crimson Pro | Space Mono |
| **brutal / poster** | Bricolage (800) · Anton · Tanker · Big Shoulders | Geist · Switzer | Space Grotesk (numerals) |
| **deliberate luxury** | Cardo · DM Serif Display · Sentient | EB Garamond · Crimson Pro | small caps of the display |

## Rotation (mandatory)

The display face **does not repeat between consecutive builds** (read `.firma/log.json`, field `display`). A house pairing repeated across different briefs is a tell in itself, even when every face in it is good.

Choose by the brief, not by reputation: "the known tasteful alternative" (Space Grotesk for everything technical, Bricolage for everything playful) also becomes slop when it is always the answer.

If the project deserves a real signature and there is budget, propose a licensed face (Söhne, GT America, Tiempos, the Klim families); never name a paid font in code without confirming the licence.
