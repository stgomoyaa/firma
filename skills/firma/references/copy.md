# Copy

Words are part of the design. A brilliant layout with stock copy reads generic; tight copy in an average layout reads considered.

## The locale gate (hard rule 1)

Every user-visible string ships in the **target locale's neutral register**, and the register your model reaches for by default is auto-fail until proven correct for that market.

Name the locale, load its profile from [`../locales/`](../locales/), and treat the profile's banned-forms table as a hard gate. The profile owns the register, the banned forms, the formatting conventions and the placeholder names. This file owns everything about copy that is the same in every language.

Default profile: [`es-CL`](../locales/es-CL.md). Its short version: Spanish, neutral Chilean register, second person **tú**, zero Argentine voseo, no "usted", technical terms untranslated.

If the brief names no locale, ask once. Guessing the locale is guessing the audience.

## Honesty (hard rule 2)

This is legal exposure in some markets, not only bad taste. Check the profile for the local consumer-protection body.

- **Zero invented metrics.** No "10× faster", "5,000 customers", "+47% conversion". With no real figure: a labelled grey placeholder block ("metric to confirm"), or ask, or redesign the section without the proof slot.
- **Zero fabricated testimonials, names, job titles or client logos.** A logo wall holds real brands you have the right to name, or there is no logo wall.
- **Zero fake urgency.** No countdown that does not count anything, no "3 spots left" without the number behind it, no fake precision (`5.8mm`, `99.99%`) the brand cannot defend.
- **A stat can be the hero when it is real.** A real, verifiable number outperforms any headline. It never stands alone: always the line that says what it means.

A section whose macrostructure requires proof you do not have is the wrong macrostructure. Change the structure, do not invent the proof.

## Em-dashes (hard rule 3)

`—` and `–` as separators: banned in every visible string. Use a period, a comma, a colon or parentheses. Ranges take a plain hyphen (`2020-2026`, `$40-80`). Quote attribution is a line break plus the name at a lighter weight, never `— Sarah`.

It is the loudest AI-writing tell there is, which is why it overrides the typographic convention that recommends them.

## Principles

- **Specific verbs.** "Save changes" beats "OK" beats "Submit". The button names the action it performs.
- **Links that stand alone.** "See pricing" beats "Click here".
- **Errors are instructions:** what happened (factual), why if you know, what to do (imperative). No "Oops!", no humour on frustration paths (failed payment, locked account), no exclamation marks in errors.
- **Active voice, one register per page.** Pick "Delete" or "Remove" and use it everywhere.
- **Say less.** Headline ≤7 words. Sub-paragraph ≤25 words. Hero holds at most 4 text elements (eyebrow OR wordmark, headline, subtext, CTAs). Confidence shows in what you leave out.
- **One CTA per intent across the whole page.** "Let's talk" plus "Contact me" plus "Get in touch" are one intent: pick one label and repeat it identically in nav, hero and footer.
- **Empty states:** what is empty, why it matters, one button.
- **Real typography:** curly quotes, a true `…`, a non-breaking space before units.

## Eyebrows and labels (default: off)

- The mono-caps eyebrow above every section is the most recognised tell on the veto list. **At most 1 eyebrow per 3 sections**, and only when it names the topic in plain language. The answer is almost always zero: the headline alone carries it.
- Banned outright: numbered eyebrows (`01 / FEATURES`), version labels in the hero (`BETA`, `V0.6`) outside a real launch, "Quietly trusted by", artisanal-poetic labels ("Field notes", "From the studio"), micro-meta under the eyebrow, locale/weather strips (`STGO 14:23 · 18°C`), scroll cues (`↓ scroll`), pills laid over images, decorative photo credits, version footers on marketing pages, decorative status dots, and 90°-rotated text as a reflex.
- The interpunct (`·`) is rationed: at most one per metadata line.
- One label treatment for everything (the same mono-caps in eyebrow, button, colophon and nav) is a costume, not a voice. Different roles get different treatments, or there are no labels.

## Banned openings

"Built for the modern team" · "Unleash your X" · "Where A meets B" · "Supercharge your workflow" · "Innovative solutions" · "Seamless integration" · "In today's digital landscape" · "Next-generation" · "Transform/Elevate/Revolutionise your…" and their equivalents in any language. Cliché demo names: Acme, Nexus, Pulse. Use domain-specific placeholders instead, per the locale profile.

If the brief gives nothing specific for the opening, **say so and ask** for a concrete noun, verb or place. A model cannot invent specificity; it can only invent the appearance of it.

## The specificity that does work (copy the pattern, not the words)

- **Date plus named vertical:** *"Creative direction and typography for culture since 2003."*
- **Refusing the marketing verb:** *"One thing, done properly."*
- **Flat declarative** (dark-technical): *"The events API for data teams. Real ingestion, delivery in seconds."*
- **Data-first when the data is real:** *"14 countries · 9 services · p50 delivery 4s."*
- **Enumerative with a refusal:** *"Reads anything that emits lines. Files, pipes, sockets."*
- **Honest personal:** role plus place plus a concrete deliverable, with no performative modesty and no LLM poetry.

## Copy self-audit (before shipping)

Re-read every visible string (headlines, labels, captions, alt text, errors) and kill: grammatically broken phrases, unclear referents, wordplay that is cute but wrong, LLM meta-poetry ("an elegant nothing"), passive-aggressive humility. When in doubt the plain functional sentence wins. Twee AI copy is worse than boring copy.

Then run the locale gate mechanically, do not eyeball it:

```bash
node <skill-path>/scripts/guard.mjs --locale <profile> src/
```
