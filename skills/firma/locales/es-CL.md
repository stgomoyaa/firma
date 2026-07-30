# Locale profile: `es-CL`

Spanish, neutral Chilean register, second person **tú**. This is the reference profile: the one that is fully specified and battle-tested. Use it as the template for writing another.

## The default register to reject

Ask any current model for Spanish UI copy and you get **Argentine voseo**. It is the correct register for one market and reads foreign in the rest of Latin America. It is not a style preference, it is a wrong-audience bug, and it shows up even when the brief names Chile explicitly.

Subagents and imported design systems default to it hardest. Pass the constraint into every delegated prompt, do not assume it inherits.

## Banned forms and their rewrites

Auto-fail in any user-visible string. The right column is the only acceptable form.

| Banned (voseo) | Correct (tuteo) |
| --- | --- |
| vos | tú |
| sos | eres |
| tenés | tienes |
| querés | quieres |
| podés | puedes |
| sabés | sabes |
| salís | sales |
| pagás | pagas |
| hacés | haces |
| venís | vienes |
| decís | dices |
| elegís | eliges |
| seguís | sigues |
| necesitás | necesitas |
| agendá | agenda |
| mirá | mira |
| dejá | deja |
| empezá | empieza |
| descubrí | descubre |
| sumate | súmate |
| elegí | elige |
| probá | prueba |
| escribí | escribe |
| contá | cuenta |
| revisá | revisa |
| registrate | regístrate |
| suscribite | suscríbete |
| enterate | entérate |
| conocé | conoce |
| llevate | llévate |

**General pattern:** any present tense with a stressed `-és / -ás / -ís` ending, or any imperative with a stressed final `-á / -é / -í`, is voseo. Rewrite in tuteo.

**Why the list and not the pattern:** a regex over stressed `-á/-é/-í` also matches *café*, *sofá*, *aquí*, *así* and *también*. The bundled linter uses this explicit list for that reason. When you add a form here, add it to the linter's list too.

## Also banned in this profile

- **"usted"** and its conjugations. Formal register reads institutional and distant for consumer and B2B alike in this market.
- **Mexicanisms and Argentinisms of register**, even in tuteo: *platicar*, *ahorita*, *padrísimo*, *laburo*, *pibe*, *che*, *bárbaro* as an adjective of approval.
- **Peninsular Spanish forms:** *vosotros*, *os*, *coger* for "take", *ordenador*, *móvil*, *vale* as agreement.

## Kept in English, never translated

Technical terms ship untranslated because translating them reads amateur: *deploy, checkout, pricing, dashboard, login, backend, frontend, commit, branch, endpoint, framework, plugin, hosting, streaming, marketplace, feed, banner, newsletter*.

Do not half-translate either. *"Despliegue continuo"* for CI/CD and *"tablero"* for dashboard are worse than the English.

## Formatting conventions for this locale

- **Decimal separator is a comma, thousands separator is a period**: `1.499` is one thousand four hundred ninety-nine, `4,5` is four point five. Getting this backwards is an instant tell of a translated interface.
- **Currency:** `CLP` with VAT already inside the displayed price. Chilean consumer law expects the final price shown; a price plus "+ IVA" reads like a translated US template. Format as `$12.990`, no decimals, period as thousands separator.
- **Reference unit:** `UF` is written `UF`, never `CLF`.
- **Dates:** day first, `29-07-2026` or `29 de julio de 2026`. Never `07/29/2026`.
- **Time zone:** `America/Santiago`. Business hours in 24h format.
- **Phone:** `+56 9 XXXX XXXX`.
- **National ID:** `RUT` with dots and a dash, `12.345.678-9`, and it validates with a check digit. A fake RUT in a placeholder is a data-honesty violation like any other invented number.
- **Consumer protection:** the relevant agency is `SERNAC`. Invented metrics and fake urgency counters are legal exposure here, not just bad taste. See the honesty rule in `references/copy.md`.

## Placeholder names

Plausible local names and businesses, never `Juan Pérez`, never `Jane Doe`, never `Acme`. Use real-sounding domain-specific placeholders: *Ferretería Brasil*, *Rastro Sur*, *Comercial Vitacura*. A placeholder that reads like a placeholder is a hole in the design.

## Guard command

```bash
node <skill-path>/scripts/guard.mjs --locale es-CL src/
```

`es-CL` is the default, so the flag is optional. It flags every banned form above in user-visible text and exits non-zero.
