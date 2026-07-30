# Product surfaces

Onboarding, settings, dashboards, forms, empty states. Not marketing pages, so the macrostructure catalogue does not apply, and not single components either, so component scope does not cover them. This file covers the gap.

The failure mode here is different from a landing page. Marketing slop is decoration with no idea; **product slop is a form in a floating card, centred on a gradient, with a progress bar made of numbered circles.** It is not ugly, it is anonymous: the same screen could belong to any SaaS in any category.

## The rule that fixes most of it

> A product surface earns its firma by **showing the product doing its actual job**, not by decorating the form.

An onboarding screen for an API company shows the API. One for an editor shows the document. One for a finance product shows the ledger entry. The artifact is live, bound to the inputs, and it cannot be pasted into a competitor's product, which is the definition of a firma.

This replaces decoration with proof, and it costs nothing: the data is already in the form state.

## The Live Mirror

The strongest version of that rule, and the one worth naming, because it is a technique rather than a principle:

> **As the user fills the form, a second panel composes the product's own native output from what they typed, in real time.**

The form stops being data entry and becomes a demo of the thing they are buying. They watch the output take shape. Nobody reads onboarding copy explaining the output format; everybody watches it assemble itself.

### Why it works

1. **It is unpasteable by construction.** The mirror renders *this* product's output format. Drop it into another company's onboarding and it is nonsense. That is a firma you cannot fake or buy.
2. **It teaches without a tutorial.** A developer filling in their name sees the exact JSON body they will POST next week. The first screen doubles as documentation.
3. **It kills the decoration problem.** There is no illustration, no gradient, no hero graphic, because the other half of the screen is doing real work. The most common product-surface failure (an empty second column filled with stock art) becomes impossible.
4. **It makes latency legible.** Watching the payload build gives the form a sense of consequence that a submit button alone never has.

### What the mirror renders, by product type

The pattern generalises. What changes is only the output format:

| Product | The mirror shows |
|---|---|
| API or developer platform | The HTTP request: method, path, headers, JSON body |
| Data or analytics | The generated query, or the row that will be written |
| Billing or invoicing | The rendered invoice or receipt line |
| Email or marketing tool | The live email preview with merge fields resolved |
| Dev tool or CI | The config file, or the commit and its diff |
| Design tool | The generated token block or component code |
| Scheduling | The calendar entry as it will appear to the invitee |

If a product has no native output artifact, it does not have a Live Mirror, and forcing one produces a fake. Use a single column instead.

### Implementation contract

- **Bind to form state, not to submit.** The mirror updates on input. A panel that only fills after submitting is a confirmation screen, not a mirror, and it loses the entire effect.
- **Render the real format, with its real syntax colours.** JSON keys and strings in the colours a real editor would use. Line numbers if the format has them. Syntax colour here is content, not decoration, which is why it does not break the one-accent rule.
- **Show the empty state honestly.** Before the user types, render the skeleton with the keys present and the values empty or as a dim placeholder. Do not pre-fill invented values to make the panel look full: that is a fabricated artifact and it fails the honesty rule exactly like an invented metric.
- **Redact credentials.** The mirror renders a real request, and people screenshot onboarding screens. An `Authorization: Bearer <live token>` in that panel leaks into every screenshot, support ticket and tutorial that follows. Show the prefix and mask the rest (`polar_sk_••••`), or use a documented placeholder.
- **Format the values as the API would**, not as the input did. The date selects read December / 29 / 2000, the mirror shows `"2000-12-29"`. That transformation is half the teaching.
- **It degrades.** With JS unavailable the mirror renders its static skeleton and the form still submits. Never gate the form's usability on the decorative half.
- **Do not make it look interactive if it is not.** The mirror is output. If it is not editable, it must not look like an editor with a cursor.

### Failure modes

- A static code block that never changes: that is a screenshot of a lie, and worse than an empty column.
- Syntax colours that do not match the real format, so the first thing you teach is wrong.
- A mirror wider than the form, which inverts the hierarchy: the user's task is the form.
- Values that appear before the user types them.
- A live secret rendered in full.

## Worked reference: Polar onboarding

Extracted from a screenshot of `polar.sh/onboarding/personal`, which sits behind auth. **Values are read off the image, not the DOM, so treat them as approximate.** The structure and the decisions are what matter here, not the exact pixels.

### The composition

Two columns on near-black, roughly 55/45. Left column holds the form. Right column holds a live HTTP request. No card, no panel, no shadow: the form sits directly on the page and the input fields are the only raised surfaces.

### The firma: a Live Mirror

The right column renders **the actual `PATCH /v1/users/me` request this form will send**, and its values update as you type. This is the canonical example of the pattern above. Headers in dim mono (`Host`, `Content-Type`, `Content-Length`, `Authorization: Bearer polar_sk_…`), a hairline, a `REQUEST BODY` label, then the JSON body with line numbers and syntax colour: keys in lavender, string values in green.

Note the value transformation, which is the detail that makes it teach rather than echo: the form collects the date as three selects reading December / 29 / 2000, and the mirror shows `"date_of_birth": "2000-12-29"`. The country select says Chile, the mirror says `"country": "CL"`. The user learns the API's shape by watching their own input get translated into it.

One thing to fix when copying it: the reference renders `Authorization: Bearer` with what appears to be a live secret key. Mask it.

### The details worth stealing

- **Step indicator as three hairline segments**, side by side at the top, the active one bright and the rest dim. No numbered circles, no "Step 1 of 3" label, no connecting line with dots. It dodges the numbered-label tell completely and reads instantly.
- **One saturated colour in the UI.** The checked checkbox is blue and it is the only saturated element that is not content. The syntax colours on the right are content, not decoration, which is why they do not break the one-accent rule.
- **The CTA is the brightest thing on the page**: a full-width white pill with dark text on a near-black page. In a dark UI, the primary action should win the contrast contest outright. An outlined ghost button as primary on dark is a common and avoidable mistake.
- **Labels above inputs**, small and muted, never placeholder-as-label. Placeholder-as-label fails the moment the field is filled.
- **Field grouping matches the data**: first and last name side by side, country full width, date of birth as three selects in one row. The grid follows the shape of the information, not a uniform one-per-row rhythm.
- **Generous field height** (roughly 44px) with a subtle fill slightly lighter than the page and a hairline border. Dark UI depth comes from lightness steps, never from shadow.
- **Legal text inline above the button**, with real underlined links, not a checkbox buried in 11px grey.

### What it does not do

No card wrapping the form. No gradient. No glow. No orb. No grid background. No icon tile above the heading. No eyebrow. No illustration of a person at a laptop. The page is a heading, a paragraph, a form, a button, and a live artifact.

## Rules for product surfaces

**Composition**

- Two columns when there is a real artifact to show; one column when there is not. An empty second column filled with an illustration is worse than a single column.
- The form sits on the page. A card around a form is only justified when several cards coexist and need separating.
- Field grid follows the data shape. Related short fields share a row.

**Depth in dark UI**

- Elevation is lightness, +3% per level. Shadows over dark produce accidental glow.
- Inputs are the raised surface, the page is the base. Do not raise the form and the inputs both.

**States, which matter more here than on a landing page**

- All 8 states in real code for every control (default, hover, focus-visible, active, disabled, loading, error, success).
- `disabled` is never opacity alone: drop the fill contrast too, and keep the label legible.
- Validation errors sit next to the field, name what is wrong, and say what to do. The helper slot is reserved at rest so nothing jumps when an error appears.
- Loading on the submit button replaces the label with a spinner **and keeps the button width**, or the layout jumps.

**Progress indicators**

- Hairline segments or a plain fraction. Never numbered circles connected by a line, which is the single most templated component in the category.
- If there are more than 5 steps, the indicator is lying about the length of the flow. Group them.

**Empty states**

- What is empty, why it matters, one button. No illustration of a cactus, an empty box, or a magnifying glass.

**Copy**

- Locale gate applies in full: every label, placeholder, helper, error and button string. Errors are the strings most often left in the model's default register, because nobody reviews the unhappy path.
- Field labels are nouns, buttons are verbs.

## Gates

The 8 gates for this file live in `slop-test.md` under "Product surfaces", so the whole battery runs from one place. They only apply when the target is an app surface.
