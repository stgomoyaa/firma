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

Scroll: IntersectionObserver or CSS scroll-driven animations, never `addEventListener('scroll')`.

### The scroll-driven trap: `animation` resets `animation-timeline`

Caught in a real build, invisible to every gate and to the linter. The `animation` shorthand resets `animation-timeline` to `auto`, so declaring the timeline BEFORE the shorthand silently throws it away:

```css
/* WRONG. The timeline is discarded by the shorthand on the next line. */
.hero { animation-timeline: scroll(root); animation-range: 0 62vh; }
.hero { animation: recede 1s linear both; }

/* RIGHT. Timeline always AFTER the shorthand. */
.hero { animation: recede 1s linear both; }
.hero { animation-timeline: scroll(root); animation-range: 0 62vh; }
```

The failure mode is the worst one available: with `both`, the keyframe runs as a normal time animation, finishes in one second, and **lands on its end state immediately**. A hero written to fade out on scroll is at `opacity: 0.16` before the visitor touches anything. It looks like a design decision, not a bug.

It also breaks the rule above about content never depending on an animation firing, which is why it has to be verified rather than assumed. Confirm in a browser: `getAnimations()[0].timeline.constructor.name` must return `ScrollTimeline`, not `DocumentTimeline`. If an element carries both a looping animation and a scroll-driven one, `animation-timeline` takes a per-animation list: `animation-timeline: none, scroll(root)`.
 Reveal-once only; parallax and scroll-scrub need a specific reason.

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

## View Transitions (the page transition that is not a library)

The interaction axis in step 3 lists "a page transition" as a rotation option without saying how. This is how. It is native CSS, works in a multi-page PHP site exactly as in a React app, and adds zero bytes of dependency.

**Support, verified 17-08-2026: 90.2% globally**, Safari 18+, Firefox 144+, Chrome/Edge 111+. It is production, not an experiment. Several showcase sites still claim Safari lacks it; that is stale.

**Why it fits this skill better than any JS alternative.** The absolute rule above says content must never hide behind an animation. With View Transitions that is structural rather than a discipline: the browser animates *snapshots* of the before and after states while the real DOM is already committed. If the transition never runs, the new page is simply there. No fade-up that leaves a blank section.

### Cross-document, for a real multi-page site

Four lines of CSS, no JavaScript at all. This is the right one for a server-rendered site.

```css
@view-transition { navigation: auto; }

::view-transition-old(root) { animation: vt-out var(--dur-short) var(--ease-in) both; }
::view-transition-new(root) { animation: vt-in  var(--dur-long)  var(--ease-out) both; }

@keyframes vt-out { to { opacity: 0; transform: translateY(-6px); } }
@keyframes vt-in  { from { opacity: 0; transform: translateY(8px); } }
```

**Always override the default animations.** The browser ships a plain crossfade on `::view-transition-old/new(root)`; leaving it is the house default, which is the thing this skill exists to avoid.

### The shared element, which is the part worth having

A crossfade between pages is barely worth the code. What earns it is one element that persists and travels: the product photo that becomes the hero, the card that opens into the article.

```css
/* the SAME name on both pages, on the element that persists */
.producto__foto { view-transition-name: pieza; }
```

**The gotcha that costs an afternoon: `view-transition-name` must be unique in the document.** Two elements sharing a name makes the browser skip the ENTIRE transition, silently, with no console error and no partial effect. In a list this bites immediately, because the obvious move is to put the same name on every card. Assign it per-item (`view-transition-name: pieza-7`) or set it on click, on the one element that was clicked, and clear it afterwards.

### Theme toggle by circle reveal

The one place a decorative reveal is motivated: the click point is where the change originates, so the animation says *this came from here*.

```js
document.startViewTransition(() => document.documentElement.classList.toggle('oscuro'))
  .ready.then(() => document.documentElement.animate(
    { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`] },
    { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      pseudoElement: '::view-transition-new(root)' }));
```

`clip-path` is the documented exception to the transform-and-opacity rule here: it is what the API composites against, and the browser runs it off the main thread.

### Reduced motion and the 10% without support

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
}
```

Degradation needs no work: an unsupported browser ignores `@view-transition` and navigates normally. That is the whole fallback. For the JS form, guard it — `if (!document.startViewTransition) { aplicarCambio(); return; }` — so the state change still happens without the animation wrapping it.

**Budget: ONE transition per site, not one per interaction.** A page where every click dissolves is the marquee problem in another costume. Pick the single navigation that matters (catalogue to product, list to detail) and leave the rest instant.

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
