# DESIGN.md: emitting the system, not just the CSS

Step 0 reads `design.md` and treats it as the locked system that wins over everything else. Nothing in the flow used to **write** it. That gap costs twice: the next build on the same project re-derives a system that already exists, and the system only lives inside the CSS, where another agent has to reverse-engineer it before it can respect it.

So every page build emits one. It is the portable form of what was already decided ([Google Stitch's format](https://styles.refero.design/design-md/design-md-for-ai-agents), readable by Cursor, v0, Codex and Claude Code).

## The rule that keeps it honest

**Generate it from the tokens the build actually shipped, never from intent.** Read the `:root` block and the rendered markup, and write down what is there. A DESIGN.md typed by hand drifts from the CSS within one revision, and a design system that lies is worse than none: the next agent follows the document, contradicts the code, and both are now wrong.

If a value is not in the tokens, it does not go in the file. If the file needs a value the tokens do not have, that is a missing token, and it goes up into `:root` first.

## Where it goes

`design.md` at the project root, beside `.firma/log.json`. One per project, overwritten on each build rather than appended: it describes the system as it stands, not its history. That is what the log is for.

## Structure

Sections in this order. Skip a section only when the build genuinely has nothing for it.

### 1 · Direction and firma

Two or three lines: the direction (editorial-sober / dark-técnico / minimal-modern / warm-playful), the macrostructure and family, and **the firma spelled out**, because that is the part a future build must not flatten while "cleaning up".

### 2 · Colour

Every token with its OKLCH value and its job. Not a swatch dump: each line says where it is allowed. The accent line carries its budget (≤5% of viewport).

### 3 · Typography

Families with their exact weights, the scale with its sizes, and letter-spacing per tier where it differs. State which face is display and which is body, and that they do not swap roles.

### 4 · Spacing, shape and depth

The named scale, the radii actually used, and how elevation is expressed (hairline, tonal, shadow). If the build uses three radii, say three and name them.

### 5 · Motion

The easing tokens, the three duration buckets, what the single orchestrated entrance is, and the reduced-motion behaviour.

### 6 · Don'ts (the load-bearing section)

**This is the half that earns the file.** The rest is a dump a machine could regenerate; this is what stops the next agent from breaking a system it did not design.

Derive each one mechanically from what the build used:

| Observed in the tokens | Don't to write |
| --- | --- |
| Weights 400 and 700 only | Do not introduce 500 or 600. Contrast is at the extremes. |
| Three radii: 2, 6, 12px | Do not add a fourth radius, and no radius above 12px on cards. |
| One accent, used on the primary action | Do not add a second chromatic action colour. |
| Elevation by hairline | Do not separate cards with shadow. |
| Mono reserved for data | Do not set body or headings in the mono face. |
| Section rhythm at 96px | Do not compress section gaps below the scale. |

Six to eight lines. Each one names a specific value or slot, never a principle ("keep it clean" is not a don't).

### 7 · Locale

The active locale tag and its banned forms, one line. The next agent writing copy needs this before it writes a single string, and it is the rule most often lost between sessions.

## What does NOT go in

- **Invented values.** Same honesty rule as everything else: if the build has no shadow scale, the file has no shadow scale.
- **Aspirational language.** "Modern and clean" describes nothing and gives the next agent permission to do anything.
- **The rotation history.** That lives in `.firma/log.json`, and duplicating it means two sources that will disagree.
- **A copy of these instructions.** The file describes one project's system, not how the system was chosen.

## Reading someone else's DESIGN.md

Catalogues of extracted systems exist ([2,000+ at Refero](https://styles.refero.design/)) and they are useful for one thing: seeing how a real system documents itself. They are the wrong place to start a design. Beginning from a well-known product's DESIGN.md produces a page that looks like that product, which is the default attractor with extra steps, and it collides with the rotation rules in step 3. Read them as specimens; do not paste them as briefs.
