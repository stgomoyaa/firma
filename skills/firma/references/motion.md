# Motion

AI motion is scattered: hover-lift on every card, fade-in on every scroll, icons that bounce. Here it shuts up. **One orchestrated moment is worth more than ten small effects.** But watch the other extreme: a dead page is also a fail. Calm yes, dead no.

## Principles

- **Animate `transform` and `opacity` only.** GPU-composited, no layout. Never `width/height/top/left/margin/padding`.
- **Duration in 3 buckets:** micro 100-150ms, short 200-300ms, long 300-500ms. Exits at roughly 75% of the enter.
- **Motivated motion.** Every animation answers "what does this communicate?" in one sentence (hierarchy / feedback / state transition / narrative). "It looked cool" is not an answer; it gets cut.
- `prefers-reduced-motion: reduce` collapses all spatial movement into a crossfade of ≤150ms. Not optional.

## Easings and durations (tokens, never the browser's `ease`)

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* enter  */
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);   /* exit   */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* toggle */
  --dur-micro: 120ms; --dur-short: 220ms; --dur-long: 420ms;
}
```

## ONE orchestrated entrance (and no more)

A single sequence on load, staggered by DOM index via a custom property, total ≤500ms. After that, the content simply IS. No fade-up-on-scroll in every section.

```css
.reveal { opacity: 0; transform: translateY(8px);
  animation: reveal var(--dur-long) var(--ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 60ms); }
@keyframes reveal { to { opacity: 1; transform: none; } }
```

**Absolute rule: content is visible by default.** Never depend on JS, an observer or a timeline firing for text to exist. If it does not fire (background tab, hydration, screenshot), the section is BLANK. The no-JS fallback shows everything. If that cannot be guaranteed, nothing gets hidden.

Scroll: IntersectionObserver or CSS scroll-driven animations, never `addEventListener('scroll')`. Reveal-once only; parallax and scroll-scrub need a specific reason.

## The CSS ticker (the canonical dark-technical firma)

A horizontal data ticker is a legitimate firma when the content is REAL (business metrics, supported services, countries, prices). **At most ONE per page**; two marquees is lazy filler.

```css
.ticker { overflow: hidden; white-space: nowrap;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.ticker__track { display: inline-flex; gap: var(--space-xl);
  animation: ticker 32s linear infinite; }          /* linear IS correct in functional loops */
.ticker__track:hover { animation-play-state: paused; }  /* WCAG 2.2.2 */
@keyframes ticker { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .ticker__track { animation: none; } }
```

Structure: duplicate the track's content (two copies) for a seamless loop with `translateX(-50%)`. The edge fade via `mask-image` avoids the hard cut. Separate items with a system glyph (▪ / a rationed · / a number), never an emoji.

If animating a fill or bar: animate clip or transform with stable caps, fill the track COMPLETELY, smooth easing. A half fill, or caps that jump from square to round, screams slop.

## Scroll-driven cinematic (the Stage family)

A pinned viewport-height stage with aligned depth layers, where scroll progress drives a camera through one coherent world. This is the macrostructure family `Cinematic / Scroll Stage`. It is expensive to build and it fails loudly when done carelessly, so it needs its own rules.

**It is the right choice only when** the subject is genuinely spatial (a place, a physical product, a system you move through) and there is real art to move. It is the wrong choice for a text product, a dashboard, or anything where the reader came to scan rather than to be shown.

### Structure

One long scroll container, one sticky stage, layers inside it:

```css
.stage { position: sticky; top: 0; min-height: 100svh;
  overflow: clip; isolation: isolate; }
```

Scroll travel typically 3,600 to 5,000px on desktop. Derive progress from the **section's** local scroll, not global page scroll, clamp it to 0..1, and expose it as one normalised `p`. Keep the beat boundaries in a single readable config object so retiming does not mean hunting through code.

Documented z-index bands, and nothing outside them: `0-9` world and background, `10-19` tint and framing, `20-29` narrative copy, `30-39` navigation and controls, `40+` overlays.

### The layer contract

Every layer shares one camera, perspective, light direction, colour grade and master aspect ratio. Each carries 10-20% bleed beyond the visible frame wherever motion can expose an edge. Clean straight alpha, no white or black halo. Stable bottom and centre anchors. **No text baked into any layer, ever**: copy stays semantic HTML.

If supplied layers do not align, fix it in CSS positioning and cropping. Do not hide a fundamental mismatch behind heavy blur; report the asset that genuinely needs recompositing.

### Depth and motion

- Background moves least, midground slightly more, hero and foreground most. Getting this order wrong reads as a broken parallax rather than as depth.
- Pointer parallax stays subtle: 6-24px at the extremes, and opposing directions between far and near layers.
- Set `transform-origin` deliberately on every layer.
- Never expose an empty canvas edge during scale or parallax.
- Blur supports a focus transition, it does not become permanent fog. Keep it at or below the minimum needed for text legibility, pair it with restrained brightness and tint so text stays readable, and provide a cheaper tint-only fallback for low-power devices.
- The subject must not drift during interpolation. Composition is preserved at every value of `p`, not only at the keyframes.

### The engine

Update through `requestAnimationFrame`. Scroll, resize and pointer listeners request a frame rather than doing work directly, and are passive where possible. Smooth the visual playhead toward the target only when reduced motion is not requested, smooth pointer input separately, and **stop requesting frames once values converge**. Write a small set of CSS custom properties and let CSS own the final transforms. Cache stable geometry and recompute on resize or when assets finish loading. Never trigger synchronous layout inside the frame loop.

### Narrative beats

Each panel gets a clear enter, hold and exit. Animate text independently from the image layers, with opacity plus a small translation, never large flying text. One panel visible at a time unless the overlap is deliberate. **Reversing the scroll must reverse every visual state cleanly**: the timeline is deterministic and fully reversible, and testing upward scroll is not optional.

### Reduced motion for this family

This is where the family usually cheats. A real `prefers-reduced-motion` mode disables playhead smoothing and pointer parallax, removes aggressive zoom, blur and lateral travel, and either uses brief crossfades or serves a static hero followed by the same content in normal document flow. **Every piece of information and every interaction stays available.** A reduced-motion mode that drops content is a fail, not an accommodation.

### Checkpoints

Inspect the stage at `p` = 0.00, 0.18, 0.27, 0.44, 0.58, 0.74, 0.90, 1.00, and at each one verify: no transparent holes or unpainted edges, no accidental layer-order change, no text collision, no abrupt opacity pop, no asset stretching, no critical subject cropped, no loading flash, no horizontal document overflow. Then scroll back up and verify the same states in reverse.

## States

- Button: hover = colour or fill shift, `:active` = `translateY(1px)` or `scale(0.98)`. **The hover-boop (a button that jumps or scales on hover) is vetoed**; buttons do not move on hover.
- An underline that grows or travels on hover: vetoed, it is a template tic. Clean, still state change.
- Menu and tooltip: short, `--ease-out` opening, `--ease-in` closing. Tooltip: 800ms delay on hover, 0ms on focus.
- Modal: long, scale 0.96→1 plus crossfade. Accordion: `grid-template-rows: 0fr→1fr`, never `height`.
- Focus ring: instant ALWAYS, never transitioned.
- Silent success beats a celebratory toast. Optimistic plus Undo beats a confirmation dialog (modals only for the irreversible).
- Carousel or auto-rotation: pause on hover AND focus, or no autoplay.

## Bans

`transition: all` · bounce, elastic or overshoot in UI · more than one hover effect at once on an element · decorative parallax · custom cursors · cursor-follower dots · infinite loops that are not functional (ticker, loader) · preventive `will-change` on whole classes · uniform hover-scale on every card · animating a gradient on hover · a pulsing glow on "live" dots.
