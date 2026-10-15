# Craft: the measured layer

The rest of this skill removes tells. This file adds what removing tells never produces: the execution that makes Stripe, Linear, Vercel and Apple read as premium. Every number below was measured from the live sites (Inspo `get_design_system`, captured May 2026; re-measure before quoting them as current). Use them as the floor for any sales or product page, not as decoration to pick from.

## The finding that reorders the skill

Three of the four reference sites set their display type in a neutral grotesk (Söhne, Inter, Geist) at a light or regular weight. None of them uses a "face with personality" and none uses the 800-vs-400 contrast the older rules of this skill prescribed. Premium is not a rare typeface. It is a common typeface executed to the decimal: tracking tightened by size, optical sizing on, stylistic sets chosen, ink that is never black, and one visual that is unmistakably the product.

So, for sales and product surfaces:
- A neutral grotesk is allowed and often right. What fails is the neutral grotesk **at its defaults** (zero tracking at 64px, `#000` ink, `font-weight: 700`, no features). That is the AI look, not the face.
- Display weight lives between 300 and 510. Contrast comes from size and tracking, not from bolding.

## Type, measured

| Site | Face | h1 | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Stripe | Söhne | 48px (heading-xl to ~96px) | 300 | 1.03-1.15 | -0.02em |
| Linear | Inter Variable | 64px | 510 | 1.00 | -0.022em |
| Vercel | Geist | 64px (fluid 64-128px) | 400 | 1.00 | -0.06em |
| Apple | SF Pro Display / Text | 40-80px | 600 | 1.05-1.1 | -0.015em; body -0.022em at 17px |

Rules derived from the table:
- **Tracking by size, always.** 12-14px: 0 to +0.01em. 15-20px: -0.01em. 24-40px: -0.015 to -0.02em. 48-72px: -0.022 to -0.035em. 80px and up: -0.04 to -0.06em. A heading over 40px with `letter-spacing: 0` is the single most common reason a page looks generated.
- **Display line-height 1.0-1.05**, body 1.4-1.5. Stripe body is 1.4, not the 1.6 most templates use.
- **Turn the face's features on.** Linear: `font-feature-settings: "cv01", "ss03"; font-variation-settings: "opsz" auto`. Use `font-optical-sizing: auto` on any variable face with an opsz axis, and pick the stylistic set that fixes the generic glyphs (single-storey a, flat-top 1, open 4) when the face offers one.
- **Body 15-17px** (Linear 15px, Stripe 16px, Apple 17px). Secondary text one step down and one tone lighter, never smaller than 13px.
- Two weights per page in practice: Linear uses 510 and 400 (590 only for 20px titles). Stripe uses 300 and 400.

## Ink and surfaces

- **Ink is never black.** Stripe heading `#061b31` (navy ink), subdued `#64748d`. Apple `rgb(29,29,31)`, secondary `rgb(134,134,139)`. Linear dark text `#f7f8f8`, secondary `#d0d6e0`, tertiary `#8a8f98`, quaternary `#62666d`.
- **Four text tones, not two.** Primary, secondary, tertiary, disabled. Hierarchy comes from tone as much as size.
- **Surfaces step in tiny increments.** Apple fills `#fff` / `#fafafc` / `#f5f5f7`. Linear dark levels `#08090a` / `#141515` / `#191a1b` / `#202122`. A 2-4% lightness step plus a translucent border (`#ffffff0d` on dark) is the elevation system; a heavy shadow is not.
- Borders are translucent ink, not grey hex: `rgba(0,0,0,0.08)` on light, `rgba(255,255,255,0.05-0.08)` on dark.

## Depth: shadows that read as light

The older rules treated shadow as suspect. The references use it constantly, just never as a uniform black blur.
- **Stack two layers**: a tight contact shadow plus a wide ambient one. Stripe tints both with its ink hue (`#00377014` top, offsets 5px/2px, blurs 10px/4px). Vercel: `0 8px 30px #0000001f` medium, `0 30px 60px #0000001f` large. Linear dark: `0 7px 32px #00000059`.
- Tint the shadow toward the page ink hue, never pure black on a coloured surface.
- Shadow is for things that float (cards on hover, the product frame, menus). Static sections stay flat.

## Colour and gradient

- **One brand gradient is premium, not slop**, when it is the brand: Stripe's accent runs `#bdb4ff → #643afd → #533afd`. What stays banned is gradient TEXT in headlines and the purple-to-pink default with no brand reason.
- A mesh or radial gradient behind the hero visual is allowed when it carries the brand colour and sits behind a real product asset. Add 2-4% noise (an SVG `feTurbulence` overlay at low opacity) to kill banding.
- Accent use stays narrow: links, the primary button, focus, one highlight per screen.

## Space and rhythm

- Section gaps measured: Linear 128px and 224px, Vercel 80px and 208px, Stripe 96px to 160px. Premium pages use **two** large gaps, not one, so the page breathes unevenly.
- Container 1440px max with content columns of 1080-1200px; text measure 560-680px.
- Fluid type with `clamp()` across the whole ramp (Vercel ships `clamp(4rem, -2.86rem + 11.43vi, 8rem)` for display).

## The hero asset (mandatory on sales and product pages)

Every reference leads with the product, not with a sentence: Apple a full-bleed photo of the hardware, Linear the app UI, Stripe a gradient plus product UI, Vercel the deploy flow. A hero made only of type and a hairline box is the failure all three earlier Verbatim builds shared. Pick one, in this order of preference:

1. **The product UI, rebuilt in code at retina fidelity, with real data.** A real query, a real answer, real metadata, real numbers. Window chrome, layered surfaces, a two-layer shadow, a 1px translucent border, `transform: perspective()` tilt of at most 4°. This is honest (it is the product) and it is what Linear and Stripe do.
2. **A generated image** when the product is physical or the page needs atmosphere: from an image model (GPT Image, Higgsfield or similar). Never a fake screenshot of UI the product does not have, never a person presented as a customer.
3. **A drawn SVG diagram or illustration** only when 1 and 2 cannot show the thing.

The hero asset gets more design time than the rest of the page combined.

## Motion at reference level

- Product UI in the hero animates its own real behaviour once: the query types, the answer resolves, the badge lands. 600-1200ms total, then stillness.
- Scroll-driven reveals are fine on sales pages when each one shows the product doing something; fade-up-on-everything stays out.
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for UI state. Apple's gallery slides run 800ms.

## Iteration is the craft

None of the numbers above survives a single pass. The references are iterated dozens of times by people looking at them. Minimum for this skill: three rounds of render → look → specific corrections (see SKILL.md step 8). A build that was never looked at by a model that can see is not finished, whatever the gates say.
