# Slop test — self-critique plus gates

Run this before handing over any output. Self-critique first, then the gates. Every gate answer must be **no**. If something fails, fix it and re-run. Slop does not ship.

## Six-axis self-critique (1-5)

Any axis below 3 triggers a revision pass BEFORE the gates. Two passes is normal; three means the brief was misread, not the design.

| Axis | What is being scored |
|---|---|
| **P** Philosophy | Is there a *why*, a position the page takes? Or is it only a layout? |
| **J** Hierarchy | In 2 seconds, can you tell primary from secondary from tertiary? |
| **E** Execution | Are the details (rules, accent, contrast, focus, alignment) in spec, **and** has everything that does not earn its place been removed? Restraint is not a separate axis: it is a property of execution, and a page carrying surplus decoration is badly executed, not "less sober". |
| **F** Firma | Does the ONE artifact or gesture exist that cannot be pasted into another site? This axis absorbs specificity: a page with a real firma is specific to THIS brief by construction, and one without is generic even if the copy names the client. |
| **H** Honesty | Does every number, quote, logo, screenshot and counter on the page correspond to something that exists and is verifiable? |
| **V** Variety | Does this share a structural fingerprint with an earlier output in the project? (Structural distance, not visual: a colour swap is not variety, and neither are two shapes from the same macro family.) |

**Two axes do not take a middle score and do not obey the <3 threshold:**

- **H Honesty is 5 or it is a fail.** A single unbacked datum puts it at 1 and **blocks the handoff**; it does not trigger a revision pass. This is legal exposure in some markets, not a quality dimension you can average against the others.
- **F Firma below 3 means there is no build.** You do not hand over a page with no firma and the score attached as a warning; you build the firma or you change macrostructure.

The other four are scored as a scale: below 3, revision pass, re-run.

Record in the stamp: `critique: P5 J4 E5 F4 H5 V5`.

## Gates

### Gate 0 · Deterministic check (run BEFORE the manual list)

The gates below are evaluated by the same model that wrote the page, which makes them self-reported. Before reading them, run the two linters that do not depend on that. If something fires here, fix it and re-run; do not proceed to the manual gates with open errors.

```bash
# 1. this skill's own hard rules: locale register, em-dashes, unconfirmed metrics,
#    pure black and white, untinted greys, colour literals outside tokens
node <skill-path>/scripts/guard.mjs --locale <profile> <path>

# 2. generic execution layer: contrast, grey-on-colour, nested cards, glow shadows,
#    AI palettes, eyebrow chips
npx impeccable detect <path>
```

One rule of the external detector conflicts with this skill **on purpose**: the dark-técnico direction prescribes exactly one CSS ticker per page, with a motion budget and `prefers-reduced-motion` honoured, which its `marquee` rule reads as a defect. Waive that one and nothing else, in the project's detector config:

```json
{ "detector": { "ignoreRules": ["marquee"] } }
```

What the external detector does NOT see and the bundled guard does: banned locale forms, fabricated metrics, and zero-tolerance em-dashes (its em-dash rule is advisory and needs eight occurrences to fire). What the guard does NOT see and the detector does: anything requiring a DOM or an AST (computed contrast, real card nesting, content invisible at rest). Both, not one.

### Hard rules

1. Is there any form banned by the active locale profile in visible text? (For `es-CL`: voseo — vos/tenés/querés/agendá/mirá. Look for stressed `-á/-é/-í` imperatives and `-és/-ás/-ís` presents.)
2. Is there any `—` or `–` used as a separator in visible text (headlines, body, quotes, buttons, captions, alt)?
3. Is there any metric, testimonial, name, job title, client logo or urgency counter the user did not provide? (Legal exposure, not only aesthetics.)
4. Is there italic in any heading or display line (including ONE `<em>` word inside a title)?
5. Is the display face Fraunces or Instrument Serif without an explicit brand justification? Or does it repeat the previous build's display?
6. Are there floating glow orbs, ambient 3D spheres, or diffuse blobs with blur+multiply behind the content?
7. Is there a grid or graph-paper background (masked or not) laid under the page?
8. Are there mono-caps eyebrows in more than 1 of every 3 sections, or any eyebrow BESIDE the heading (tag-left/header-right)?
9. Is there a row of floating cards with the same shadow, same radius, same size? (Rhythm comes from variation, not cloning.)
10. Grid alignment: is there orphan whitespace (dead gap under the `h1` from a badly chosen `align-items` next to a taller column), misaligned comparison columns, or a centred section head floating above left-flush body?

### Typography

11. Display in Inter/Roboto/Open Sans/Poppins/Lato or a system default?
12. More than 3 families on the page, or the outlier in more than 2 slots?
13. Weak weight contrast (400 vs 600)? Headings contrast ≥300 units against body.
14. Gradient text in any heading?
15. Hero headline over 2 lines on desktop, or over 90 characters at display size?
16. All-caps display with line-height below 1.0 (cap-tops colliding when it wraps)?
17. Display headers without `overflow-wrap: anywhere; min-width: 0`?
18. Body under 16px, measure outside 45-75ch, or all-caps in paragraphs?

### Colour

19. Pure `#000` or `#fff` as a surface?
20. Any neutral at chroma 0 (an untinted grey)?
21. A purple-blue, purple-cyan, mesh or aurora gradient anywhere?
22. Does the accent cover more than 5% of the viewport?
23. A beige+brass+espresso palette on a premium brief, or the default carbon-blue / slate-indigo on a dark one, or cream / UI-kit grey as an unchosen base?
24. Any text/background pair below 4.5:1 (body) or 3:1 (large, icons, focus)? Check especially: button text against button fill, dark sections with inherited ink, muted on paper-2.
25. Hard colour seams between sections with no intent (a glow dying at an edge, a scrim cutting off)?

### Structure and layout

26. A generic template (hero → 3 identical features → CTA → footer), the same macrostructure **shape** as any of the last 3 in the log, or the same macrostructure **family** as the previous build?
27. A 3-equal-column grid with icon-above-heading-below?
28. A card inside a card?
29. A `100vh` hero with everything centred on one vertical axis (eyebrow+title+lede+CTA)? At most 2 centred elements; the rest breaks the axis.
30. Is the nav the AI fingerprint (wordmark + 4-5 links + button right + hairline + white) without justification? Is the footer the 4-column + social + copyright one without being a docs hub?
31. The default hero stack (eyebrow → headline → subtext → a fill+outline button pair, panel on the right) with nothing in the skeleton broken?
32. A fill+outline button pair as the default action row? Two CTAs with the same intent on the page?
33. More than 2 consecutive sections with the same image/text zigzag split? Fewer than 4 layout families on an 8-section page?
34. Shadow even on all sides as a reflex, glow over dark, or two stacked shadows?
35. Any spacing value outside the named scale?
36. Mixed radius with no system (pill buttons in a square layout, square cards on a pill page)?
37. A bento with filler cells, or all cells white-on-white text only?

### Chrome and decoration

38. Redrawn chrome (fake browser bar with dots, fake phone frame, fake code window, fake terminal with traffic lights)? A real screenshot in a `<figure>`, or nothing.
39. Fake screenshots built out of divs (fake dashboard, fake task list)?
40. Icons: two libraries mixed, emoji (✨🚀⚡) as a feature icon, or an icon dropped into a coloured tile or circle?
41. A decorative element with no semantic anchor (floating cursor, random number, Pantone chip for no reason, sticker)?
42. Glassmorphism with no real backdrop to refract, or glass with banding, leaking or popping?
43. A sun/moon toggle, a dot under the active nav item, or a loose decorative hairline beside a label?

### Motion

44. `transition: all`, the browser's default easing, or bounce/overshoot in UI?
45. Is width/height/top/left/margin/padding being animated?
46. More than ONE orchestrated entrance, or fade-up-on-scroll in every section?
47. Content starting at opacity 0 and depending on JS or an observer to exist? (If the reveal does not fire, the section is blank: absolute fail.)
48. A focus ring that fades in? Hover-boop on buttons? An underline that grows on hover?
49. Is `prefers-reduced-motion` missing on any animation? A carousel or ticker with no pause on hover and focus?
50. More than one ticker or marquee per page?

### States and implementation

51. Any interactive element without its 8 states in code (minimum default/hover/focus-visible/active/disabled)?
52. Inputs: border-width changing between states, focus using a border instead of an outline, a height different from its sibling button, a helper slot that collapses, disabled expressed only with opacity?
53. Any colour or font-family inline outside the token block (mid-render improvisation)?
54. Dead controls (a tab, accordion or toggle that looks interactive and does nothing)?

### Responsive

55. Horizontal scroll at any width from 320 to 1920px? (`overflow-x: clip` on html AND body, always.)
56. Any CTA, nav link, tab or breadcrumb wrapping to 2 lines at any width? A 2-line nav on desktop?
57. An image grid using bare `1fr` instead of `minmax(0, 1fr)`?
58. Two stickies at `top: 0` (nav plus an inner element) overlapping on scroll?

### Firma and variety

59. Does the page have its firma (the artifact or gesture that cannot be pasted into another site)? Without it, this is clean slop: restraint with no idea is half-finished work.
60. Is the stamp missing from the first line of the CSS, or the append to `.firma/log.json` missing, or missing fields (`family` included, or the next rotation cannot check the previous build's family)?

## The deepest tell

Dodging this list is not designing. You can pass every gate and still ship slop if you invented nothing. The list makes the work less incorrect; the **firma** (gate 59) and the position (axis P) make it good. Clean is the floor, never the achievement.
