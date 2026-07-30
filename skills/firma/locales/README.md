# Locale profiles

## Why this exists

Every model has a **dominant register per language**, learned from whatever dominated its training data for that language. Ask for Spanish and you get Argentine voseo. The register is fluent, confident and wrong for most of the market you are shipping to, and no amount of "write in Spanish" in the prompt fixes it, because the model believes it already did.

That is a bug with a fixed shape, so it gets a gate rather than a style note: **name the target locale, load its profile, and treat the profile's banned forms as auto-fail in any user-visible string.**

This is the only design skill in this genre with a locale gate at all. It is also the cheapest rule in the whole system to enforce, because the banned forms are a finite list and a linter can read it.

## Shipped profiles

| Profile | Status |
|---|---|
| [`es-CL.md`](es-CL.md) | Complete and battle-tested. Spanish, neutral Chilean register, tuteo. The reference implementation. |

**One profile ships, on purpose.** Writing a profile requires knowing a market's register well enough to say which forms are wrong, and inventing that from the outside produces confident nonsense, which is exactly what the profile exists to prevent. `es-CL` is the one whose author ships to that market daily. The schema below is here so you can write yours.

## Writing a profile

A profile is one markdown file, `locales/<ietf-tag>.md`, with these sections. Everything is required except the last.

1. **The default register to reject.** Name what the model reaches for in this language and why it is wrong for your market. Be specific: "Argentine voseo" is useful, "informal Spanish" is not.
2. **Banned forms and their rewrites.** A two-column table. Left is what the model produces, right is the only acceptable form. This table is the gate: if a form is not in it, the linter cannot catch it.
3. **Also banned.** Register-level bans that are not single-word substitutions: formality levels, regionalisms from adjacent markets, forms from the language's other continent.
4. **Kept in the source language.** Which technical terms ship untranslated, because half-translating them reads amateur.
5. **Formatting conventions.** Decimal and thousands separators, currency format and whether tax is inside the displayed price, date order, phone format, national ID format, the consumer-protection body if invented claims carry legal exposure in that market.
6. **Placeholder names.** Plausible local names and businesses, and the generic ones that are banned.
7. **Guard command** (optional). If you extend the linter with your list.

### Two rules for the banned-forms table

**Prefer an explicit list to a clever pattern.** For `es-CL`, a regex over stressed `-á/-é/-í` endings catches the voseo imperatives and also *café*, *sofá*, *aquí* and *también*. The linter uses the explicit list for that reason. A gate with false positives gets disabled, and a disabled gate catches nothing.

**A form you are unsure about does not go in.** The table is auto-fail. One wrong entry and the author starts waiving the rule, which costs more than the entry was worth.

## Wiring a profile into the linter

`scripts/guard.mjs` reads its banned forms from the profile named by `--locale`, defaulting to `es-CL`. Adding a profile means adding its list; it does not mean touching the checking logic.

```bash
node <skill-path>/scripts/guard.mjs --locale es-CL src/
```

## What the gate does not cover

The profile governs **register and formatting**. It does not judge whether the copy is any good: that is the copy rules in [`../references/copy.md`](../references/copy.md), which are locale-independent. Perfectly-registered generic copy is still generic.
