# Product surfaces

Onboarding, settings, dashboards, forms, empty states. Not marketing pages, so the macrostructure catalogue does not apply, and not single components either, so component scope does not cover them. This file covers the gap.

The failure mode here is different from a landing page. Marketing slop is decoration with no idea; **product slop is a form in a floating card, centred on a gradient, with a progress bar made of numbered circles.** It is not ugly, it is anonymous: the same screen could belong to any SaaS in any category.

## The rule that fixes most of it

> A product surface earns its firma by **showing the product doing its actual job**, not by decorating the form.

An onboarding screen for an API company should show the API. One for an editor should show the document. One for a finance product should show the ledger entry. The artifact is live, bound to the inputs, and it cannot be pasted into a competitor's product, which is the definition of a firma.

This replaces decoration with proof, and it costs nothing: the data is already in the form state.

## Worked reference: Polar onboarding

Extracted from a screenshot of `polar.sh/onboarding/personal`, which sits behind auth. **Values are read off the image, not the DOM, so treat them as approximate.** The structure and the decisions are what matter here, not the exact pixels.

### The composition

Two columns on near-black, roughly 55/45. Left column holds the form. Right column holds a live HTTP request. No card, no panel, no shadow: the form sits directly on the page and the input fields are the only raised surfaces.

### The firma

The right column renders **the actual `PATCH /v1/users/me` request this form will send**, and its values update as you type. Headers in dim mono (`Host`, `Content-Type`, `Content-Length`, `Authorization: Bearer polar_sk_…`), a hairline, a `REQUEST BODY` label, then the JSON body with line numbers and syntax colour: keys in lavender, string values in green.

Three things this does at once, which is why it is worth copying as a pattern:

1. **It is unpasteable.** Only a developer-monetisation product can put its own API call there. Swap it into another company's onboarding and it makes no sense.
2. **It teaches while it collects.** The audience is developers who will integrate this API. Their first screen shows them the shape of the thing they will write.
3. **It replaces decoration entirely.** There is no illustration, no gradient, no glow, because the right half is doing real work.

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

## Gates for this file

Added to the slop test when the target is a product surface:

1. Is the form wrapped in a card that has no siblings to be separated from?
2. Is the second column an illustration, a gradient or a stock image rather than the product doing its job?
3. Is the progress indicator numbered circles?
4. Is the primary action anything other than the highest-contrast element on the page?
5. Is any label expressed only as a placeholder?
6. Does the helper or error slot collapse at rest, so the layout jumps on validation?
7. Does the submit button change width when it enters its loading state?
8. Are the error strings in the locale profile's register, or did they ship in the model's default?
