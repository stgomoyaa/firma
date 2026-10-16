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

Every reference leads with the product, not with a sentence: Apple a full-bleed photo of the hardware, Linear the app UI, Stripe a gradient plus product UI, Vercel the deploy flow. A hero made only of type and a hairline box is the failure all three earlier a legal-research product builds shared. Pick one, in this order of preference:

1. **The product UI, rebuilt in code at retina fidelity, with real data.** A real query, a real answer, real metadata, real numbers. Window chrome, layered surfaces, a two-layer shadow, a 1px translucent border, `transform: perspective()` tilt of at most 4°. This is honest (it is the product) and it is what Linear and Stripe do.
2. **A generated image** when the product is physical or the page needs atmosphere. **Source order, always:** (a) **GPT Image through a Codex worker first**: it is included in the plan and costs nothing per image (`image_generation`; run `codex exec -s workspace-write -C <folder>`, asking for the exact file name and pixel size;. (b) Free-licence stock (Unsplash, Pexels) with the credit in the footer, when a real photograph beats a generated one. (c) **Higgsfield last**, only when (a) failed or the job needs what only it does (Soul identity, video): it spends paid credits, and in the 16-10 bake-off two runs drained the balance and the third found it empty. Never a fake screenshot of UI the product does not have, never a person presented as a customer.
3. **A drawn SVG diagram or illustration** only when 1 and 2 cannot show the thing.

The hero asset gets more design time than the rest of the page combined.

## Motion at reference level

- Product UI in the hero animates its own real behaviour once: the query types, the answer resolves, the badge lands. 600-1200ms total, then stillness.
- Scroll-driven reveals are fine on sales pages when each one shows the product doing something; fade-up-on-everything stays out.
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for UI state. Apple's gallery slides run 800ms.

## Iteration is the craft

None of the numbers above survives a single pass. The references are iterated dozens of times by people looking at them. Minimum for this skill: three rounds of render → look → specific corrections (see SKILL.md step 8). A build that was never looked at by a model that can see is not finished, whatever the gates say.

## The wow moment (what "stunning" adds on top of clean)

Measured on viral Opus-built landings (Oct 2026: a dark agency template with a 3D book carrying floating UI, a wordmark that dissolves into particles under the cursor, a fintech page shot entirely with generated photography, a game page whose every section is a generated video used as a scroll-triggered WebGL texture, and an isometric three.js diagram of the product's own flow). Clean craft gets a page to "credible". What these share, and what made them travel, is ONE centrepiece that moves and that nobody has seen before. Pick one per page:

1. **The product's flow as a 3D scene.** An isometric or orthographic three.js diagram of how the product works (input, engine, source, output), with data travelling between blocks, scrubbed by scroll. Honest and specific: it can only be this product.
2. **Generated media as the world.** Image or video from an image/video model, embedded as full-bleed sections or as WebGL textures triggered at fixed scroll points (25 / 50 / 75%). Right for consumer, games, lifestyle. Never fake product UI, never a person presented as a customer.
3. **One interaction on the brand mark or headline.** A wordmark that dissolves into particles under the cursor, a header that changes shape as you scroll. One, not several.

How to brief it so it lands (from a published 1-prompt + 16-follow-up build):
- **Numbers, not adjectives.** Sizes, hex, tracking, durations, easing, every beat on a timecode or scroll percentage.
- **Make it a pure function.** `renderAt(t)` or `renderAt(progress)`, seeded randomness, and a URL parameter (`?t=3.3`, `?p=0.5`) that freezes any moment. That turns the animation into something you can screenshot and measure.
- **Correct by measuring frames, not by vibes.** Sample pixel colours against the brand hex, measure bounds (nothing leaves the frame or passes under the nav, 40px margins), check timings frame by frame. Each follow-up names the frame, the measured value and the target.
- Sixteen measured follow-ups is normal for one centrepiece. Budget for it.

The honesty gate still applies: most of those demos carry invented testimonials, logo walls and stats. Their visual layer is the lesson; their proof layer is exactly what this skill blocks.

## Second reference pass (Oct 2026, measured live with computed styles)

| Site | Display | Body | Depth | Hero asset | The memorable move |
|---|---|---|---|---|---|
| Anthropic | Own serif + own sans (both 300-800 variable); h1 sans 61px w700; section heads serif 80px/1.157 w400, -0.015em | Serif 24px/1.4 | Three stacked, almost invisible layers: `0 2px 2px rgb(0 0 0/.01), 0 4px 4px rgb(0 0 0/.02), 0 16px 24px rgb(0 0 0/.04)` | Type plus a drawn piece: a hand-drawn chalk line rendered on canvas at 12fps over 22 frames, with the model name bent along it | Underlined key words inside the headline; words reveal one by one (`translateY(24px)`, 800ms, `cubic-bezier(.16,1,.3,1)`, staggered) |
| Linear | Inter Variable 64px/1.0 w510 -0.022em, `"cv01","ss03"` | 15px/1.6, -0.011em | Dark: `inset 0 0 0 .5px rgb(255 255 255/.08)` hairline plus `0 2px 32px rgb(0 0 0/.25)` | The product UI, delivered as optimized images, not live DOM | Four text tones on near-black (`#f7f8f8`, `#d0d6e0`, `#8a8f98`, `#62666d`); sections 128px |
| Cursor | Own grotesk, h1 only 26px w400 -0.0125em: the headline is deliberately small | 16px | Product window: `0 28px 70px rgb(0 0 0/.14), 0 14px 32px rgb(0 0 0/.10)`; radius 4px everywhere | The app window (Desktop + CLI, real-looking task list, diff counts, browser preview) floating over a fine-art painting | Product UI on top of a painting: technical object, artistic ground |
| Apple (iPhone Duo) | SF Pro Display, headline ~80px, w600 | SF Pro Text 17px, -0.022em | Almost none; tiles radius 28px | A photograph of the product held in hands, filling the fold | 18 videos and scroll-scrubbed sequences; sections 128px, first one 144/224px |
| affiliateNetwork (Framer) | 88px/80px w600 -0.04em | 20px/28px -0.01em | Inner glow `inset 0 0 85px` in the brand hue on dark panels; radius 24-36px | A vertical phone-format video in a frame, entering with a spring (`y:150→0`, .5s, bounce .2) | Display at -0.04em plus two loud accents (magenta, acid lime) on near-black |

What this adds to the rules above:
- **Headline size is a choice, not a floor.** Cursor ships a 26px h1 and lets the product window be the hero. When the product is the hero, the headline can shrink; when type is the hero (Anthropic, affiliateNetwork), it goes 60-90px with tight tracking.
- **The product-on-art pattern** (Cursor): a precise UI window over a painterly or photographic ground reads as premium and is achievable with a generated image as the ground and real UI on top. Honest when the UI is real.
- **Ultra-subtle stacked shadows** (Anthropic): three layers at 1-4% opacity give lift without a visible shadow. Use this on light paper instead of one 10-20% shadow.
- **Word-by-word headline reveal** with the measured values above is the single entrance most of these share.
- **A drawn gesture** (Anthropic's chalk line, rendered on canvas at a low frame rate) is a human mark that no template ships with.

## Adopted from taste-skill (MIT, Leonxlnx/taste-skill)

- **Claim → proof map before design.** One line per section: the claim it makes and the real proof that backs it. A section with no proof is cut, not decorated. This is the step that kills invented stats before they are written.
- **Headlines two lines or fewer at every width,** mobile included; rewrite the line breaks for mobile instead of letting them fall.
- **Archival imagery with licence** (Openverse, Wikimedia Commons, Art Institute of Chicago, The Met) as an alternative to generated images, credited.
- **Score each looked-at round on a fixed rubric** (design 40, usability 30, creativity 15, content 15) so rounds are comparable. The rubric is fixed before the build, never invented after seeing it.
- Not adopted: its bans on hairlines, mono labels and gradients, which its own data does not support.

## Density floor (sales and product pages)

Measured 15-10-2026 at 1440x900, scrolling the whole page: Linear 1609 elements that change on scroll, 59 gradient surfaces, 270 media; Cursor 1455 / 22 / 95; Noma 167 / 1 / 101. The flat builds this skill used to produce: 0-88 / 0 / 1-2. Restraint at that level reads as "plano", not as Apple. The owner's verdict on every flat build was the same word.

The floor, per sales or product page:
- **Every section has at least one scroll-linked motion** (CSS `animation-timeline: view()`, declared after the `animation` shorthand, with an IntersectionObserver fallback). A heading reveal must finish by the time the heading enters the bottom 75% of the viewport (`animation-range: entry 10% entry 90%`), never on `cover`, or it sits half-revealed and clipped while being read.
- **Depth on the surfaces people decide on:** at least one section on a dark or gradient ground, cards with 3-layer shadows, one glow behind the primary offer. Pricing is never a row of flat outlined boxes.
- **Media in more than the hero:** a generated photograph or a second product mock in at least two sections, and real icons from a licensed set (Phosphor, Lucide) where a list has more than three items.
- **A header that changes on scroll** (transparent over the hero, then a floating pill with blur; reading progress clipped inside it). Its transition animates `max-width`, never `width: 100%` to a fixed value, which jumps.

Measure with `scripts/qa/density.mjs`. **The counts are a floor, not a target, and they get gamed:** every executor handed "≥350 moving elements" split paragraphs into single-word spans to hit it, and two of them broke the page doing so. So the script counts only elements of at least 2,000 px² and reports per-section coverage; the spec states that splitting body text into words to raise a count is forbidden; and the result is still judged on screenshots, never on the number.

## Component libraries

React Bits (reactbits.dev): 215 animated React components. Licence is MIT plus Commons Clause: use in a product is allowed, redistributing or selling the components themselves is not. React only; a static HTML page has to port the idea, not the code. Use one effect per page at most, never the over-used ones as decoration (aurora, blur text, glitch, particles, galaxy, plasma).

## Mechanical gates belong to the builder

Most corrections on the 3D scene of a legal-research landing were mechanical: a label over a block, a label leaving the stage, an invisible moving packet, a grey floor drawing a hard box. A model that can see should never be the first to find those. Every interactive or 3D section exposes `window.__probe()` (stage, labels, obstacles in viewport coordinates) and the builder runs `scripts/qa/probe.mjs` over frozen frames until it reports zero FAILs. Only then does the coordinator look, and only for taste.

Scene defaults that remove the usual first-round failures:
- Transparent canvas; floor as a shadow catcher (`ShadowMaterial`, ~0.1 opacity), never a coloured plane.
- Fit the camera to the bounding box of the content with a fixed margin; never hand-place it.
- Labels are HTML, placed by projection, with obstacles (every object's screen rectangle) as forbidden zones and a fallback through four sides.
- Light paper materials need hemisphere + ambient light; check the darkest visible face against a target luminance.
- Moving markers need emissive material plus a halo, sized for the smallest viewport.
