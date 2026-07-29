# firma

An anti-AI-slop design skill for coding agents, written for teams that ship in Spanish.

Every model was trained on the same SaaS templates, so every model reaches for the same page: Inter, a purple gradient, an eyebrow label above each section, three identical shadowed cards, a glow orb behind the hero. There is now a small field of skills that fight this. `firma` is one of them, and it is honest about standing on the others (see [`NOTICE.md`](NOTICE.md)).

What it adds to that field is three things nobody else covers.

**1. A Spanish copy gate.** Ask any LLM for Spanish UI copy and you get Argentine *voseo*: `Empezá gratis`, `crece con vos`, `mirá el demo`. It is the correct register for exactly one market and wrong for the rest. `firma` treats it as auto-fail, with an explicit blacklist and the tuteo rewrite for every form. No other skill in this genre has a locale gate at all.

**2. Honesty as a hard gate, not good taste.** No invented metrics, no fabricated testimonials, no client logos you do not have, no fake urgency counters. In Chile that is consumer-law exposure (SERNAC), not a style preference. The consequence is structural: a stat-led hero with no real stat is the wrong macrostructure, so the skill picks a different one instead of inventing `+47% conversión`.

**3. Rotation memory, by family.** A per-project log records the macrostructure, its family, the theme, display face, nav and footer of every build. The next build cannot repeat any of the last three shapes, and cannot reuse the previous build's **family**. That second rule is what makes the first one work: Bento followed by Catalogue passes a shape-only check and still gives you two grids. Without rotation, an agent converges back on one house style within a week, and clean-but-identical is still slop.

Plus the rule the skill is named after: **nothing ships without its firma**, the one artifact or gesture that would make no sense pasted into another site. A built CSS artifact, a bespoke silhouette, a ticker of real numbers, a typographic composition. No firma, no build.

## What is in the box

| File | What it holds |
|---|---|
| `skills/firma/SKILL.md` | The 8 hard rules, 3 verbs, and the 8-step design flow |
| `references/macroestructuras.md` | 18 page shapes in 10 families, plus nav and footer archetypes, chosen before any code |
| `references/temas.md` | 12 copy-paste OKLCH themes, 4 of them dark-technical |
| `references/tipografia.md` | Type pairings, and the faces vetoed for being LLM defaults |
| `references/color.md` | The OKLCH engine for building a theme from a brand colour |
| `references/layout.md` | Space, asymmetry, depth, and the grid-alignment check |
| `references/motion.md` | Motion budget, named easings, the CSS ticker recipe |
| `references/copy.md` | Spanish neutral copy rules and the voseo blacklist |
| `references/slop-test.md` | ~60 gates plus a six-axis self-critique, run before every handoff |
| `references/audit.md` | Scoring rubric for the `audit` and `redesign` verbs |
| `scripts/guard.mjs` | Deterministic linter for the hard rules. Node, zero dependencies |

## Install

The skill is a folder of markdown. Any harness that reads `SKILL.md` directories can use it.

**Claude Code** (global, applies everywhere):

```bash
git clone https://github.com/stgomoyaa/firma.git
cp -R firma/skills/firma ~/.claude/skills/
```

Or project-local, in `<project>/.claude/skills/firma/`.

**Other harnesses:** same folder, different destination. `~/.agents/skills/` (Codex CLI, and anything else reading the `.agents` convention), `~/.config/opencode/skills/` or the `instructions` array in `opencode.json` (OpenCode), `.cursor/skills/` (Cursor, with Agent Skills enabled). Only the Claude Code path is verified here; the rest follow each harness's documented skill location.

## Use

```
firma                      # design something new: runs the 8-step flow
firma audit <target>       # score an existing surface, ranked punch list, no edits
firma redesign <target>    # audit first, then restyle inside the existing implementation
```

The default flow, condensed: read the existing code before asking anything, state the design read in one line, pick a direction, check the rotation log, pick a macrostructure and nav and footer, pick a theme, emit a short preview block for redirection, build against locked tokens, then run the gates and the self-critique before handing back.

The skill is written to be read by an agent, not by a human on a train. It is opinionated on purpose, and it is short on purpose.

## The 8 hard rules

1. Spanish neutral with **tú**. Zero *voseo*.
2. Total honesty. No invented metrics, testimonials, or logos.
3. **No em-dashes in visible text.** It is the single loudest AI writing tell.
4. No italics inside headings. Emphasis by weight, accent, or a drawn underline.
5. Serifs are welcome. Fraunces and Instrument Serif are vetoed as defaults, because every LLM reaches for them first.
6. dark-técnico is a first-class direction, not an exception.
7. A named veto list of tells that auto-fail even when they look fine.
8. Layout verified, never assumed. Declared grid alignment, no orphan whitespace.

## Deterministic linting: two linters, not one

The gates in `slop-test.md` are run by the agent, which means they are self-reported: the model that wrote the page is the one asked whether the page is slop. Two deterministic linters close that gap, and they cover different halves of it.

**1. The bundled guard**, for the hard rules an English linter cannot see. Node, zero dependencies, ships inside the skill:

```bash
node <skill-path>/scripts/guard.mjs src/          # human output, exit 1 on errors
node <skill-path>/scripts/guard.mjs src/ --json   # for CI
```

It flags *voseo* in visible text, em-dashes and en-dashes in visible text, unconfirmed marketing metrics, pure `#000`/`#fff`, exact untinted greys (including `oklch` with chroma below 0.005), and colour literals declared outside a token. It reads text and CSS, not a DOM: it will not compute contrast or detect real card nesting, and it is deliberately conservative about *voseo* (an explicit blacklist, because any regex over tonic `-á/-é/-í` also matches *café*, *sofá* and *aquí*).

**2. [impeccable](https://github.com/pbakaus/impeccable)'s detector**, for the generic execution layer, with a real DOM and AST. No LLM, no API key:

```bash
npx impeccable detect src/
```

It catches contrast, grey-on-colour, nested cards, glow shadows, AI palettes and eyebrow chips. It does not know about *voseo* or fabricated metrics, and its em-dash rule is advisory and needs eight occurrences to fire, so it will never enforce rule 3 above. One of its rules conflicts with this skill on purpose: the dark-technical direction prescribes exactly one CSS ticker per page, with a motion budget and `prefers-reduced-motion` honoured, which its `marquee` rule reads as a defect. Waive that one and nothing else:

```json
{ "detector": { "ignoreRules": ["marquee"] } }
```

## Provenance

`firma` is a derivative work and says so. The shape of the six-axis self-critique, most of the gate battery, the rotation mechanism and the OKLCH engine come from [hallmark](https://github.com/Nutlope/hallmark) (MIT), along with the idea of picking a named page shape before writing code. The shape catalogue itself was re-derived here: 18 shapes in 10 families, with near-duplicates merged and the family grouping added to close a hole in the rotation rule. Brief inference and audit-first come from [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). The execution-defect lens comes from pols-antislop. Full breakdown, including the two hallmark rules this skill deliberately overrides, in [`NOTICE.md`](NOTICE.md).

MIT licensed. Built by [Santiago Moya](https://github.com/stgomoyaa).

---

# firma (español)

Skill de diseño anti-slop para agentes que escriben código, hecha para quienes shippean en español.

Todos los modelos se entrenaron con los mismos templates de SaaS, así que todos llegan a la misma página: Inter, gradiente violeta, un eyebrow arriba de cada sección, tres cards con sombra idénticas, un orbe de glow detrás del hero. Ya existe un pequeño campo de skills que pelean contra eso. `firma` es una de ellas, y es honesta respecto a pararse sobre las otras (ver [`NOTICE.md`](NOTICE.md)).

Lo que agrega son tres cosas que nadie más cubre.

**1. Gate de copy en español.** Pídele copy de UI en español a cualquier LLM y sale voseo argentino: `Empezá gratis`, `crece con vos`, `mirá el demo`. Es el registro correcto para exactamente un mercado y equivocado para el resto. `firma` lo trata como auto-fail, con lista negra explícita y la reescritura en tuteo para cada forma. Ninguna otra skill del género tiene gate de locale.

**2. Honestidad como regla dura, no como buen gusto.** Cero métricas inventadas, cero testimonios fabricados, cero logos de clientes que no tienes, cero contadores de urgencia falsos. En Chile eso es riesgo SERNAC, no una preferencia estética. La consecuencia es estructural: un hero stat-led sin un stat real es la macroestructura equivocada, así que la skill elige otra en vez de inventar `+47% conversión`.

**3. Memoria de rotación, por familia.** Un log por proyecto registra la macroestructura, su familia, el tema, la display face, el nav y el footer de cada build. El siguiente no puede repetir ninguna de las últimas tres formas, ni reusar la **familia** del build anterior. Esa segunda regla es la que hace funcionar la primera: Bento seguido de Catálogo pasa un chequeo por forma y te deja dos grillas igual. Sin rotación, un agente vuelve a su único house style en una semana, y limpio pero idéntico sigue siendo slop.

Más la regla que le da el nombre: **nada se entrega sin su firma**, el UN artefacto o gesto que no tendría sentido pegado en otro sitio. Un artefacto CSS construido, una silueta bespoke, un ticker con números reales, una composición tipográfica. Sin firma, no hay build.

## Instalación

La skill es una carpeta de markdown. Cualquier harness que lea directorios `SKILL.md` puede usarla.

```bash
git clone https://github.com/stgomoyaa/firma.git
cp -R firma/skills/firma ~/.claude/skills/
```

Para otros harnesses, la misma carpeta a otro destino: `~/.agents/skills/` (Codex CLI y todo lo que siga esa convención), `~/.config/opencode/skills/` u `opencode.json` (OpenCode), `.cursor/skills/` (Cursor con Agent Skills activado). Acá solo está verificada la ruta de Claude Code; el resto sigue la ubicación documentada por cada harness.

## Uso

```
firma                      # diseñar algo nuevo: corre el flujo de 8 pasos
firma audit <target>       # puntuar una superficie existente, punch list rankeada, sin editar
firma redesign <target>    # audit primero, después restyle dentro de la implementación existente
```

## Las 8 reglas duras

1. Español neutro con **tú**. Cero voseo.
2. Honestidad total. Cero métricas, testimonios o logos inventados.
3. **Cero em-dashes en texto visible.** Es el tell de escritura IA más fuerte que existe.
4. Cero itálicas dentro de headings. Énfasis por peso, acento o underline dibujado.
5. Las serif son bienvenidas. Fraunces e Instrument Serif quedan vetadas como default, porque todo LLM va a esas primero.
6. dark-técnico es dirección de primera clase, no excepción.
7. Una lista nombrada de tells que hacen auto-fail aunque se vean bien.
8. Layout verificado, nunca asumido. Alineación de grid declarada, sin whitespace huérfano.

## Linters deterministas: dos, no uno

Los gates de `slop-test.md` los corre el agente, o sea que son auto-reportados: el modelo que escribió la página es el mismo al que se le pregunta si la página es slop. Dos linters deterministas cierran ese hueco, y cubren mitades distintas.

**1. El guard incluido**, para las reglas duras que un linter en inglés no ve. Node, cero dependencias, viaja dentro de la skill:

```bash
node <ruta-de-la-skill>/scripts/guard.mjs src/          # salida legible, exit 1 si hay errores
node <ruta-de-la-skill>/scripts/guard.mjs src/ --json   # para CI
```

Marca voseo en texto visible, em-dashes y en-dashes en texto visible, métricas de marketing sin confirmar, `#000`/`#fff` puros, grises neutros exactos (incluido `oklch` con chroma bajo 0.005), y literales de color declarados fuera de un token. Lee texto y CSS, no un DOM: no calcula contraste ni detecta anidamiento real de cards, y es deliberadamente conservador con el voseo (lista negra explícita, porque cualquier regex sobre tónicas `-á/-é/-í` también matchea *café*, *sofá* y *aquí*).

**2. El detector de [impeccable](https://github.com/pbakaus/impeccable)**, para la capa genérica de ejecución, con DOM y AST reales. Sin LLM ni API key:

```bash
npx impeccable detect src/
```

Caza contraste, gris sobre color, cards anidadas, sombras de glow, paletas IA y eyebrow chips. No sabe de voseo ni de métricas fabricadas, y su regla de em-dash es *advisory* y necesita ocho ocurrencias para gatillar, así que nunca va a hacer cumplir la regla 3. Una de sus reglas choca con esta skill a propósito: la dirección dark-técnica prescribe exactamente un ticker CSS por página, con presupuesto de motion y `prefers-reduced-motion` respetado, y su regla `marquee` lo lee como defecto. Se waivea esa y ninguna más:

```json
{ "detector": { "ignoreRules": ["marquee"] } }
```

## Procedencia

`firma` es un trabajo derivado y lo dice. La forma de la autocrítica de 6 ejes, la mayor parte de la batería de gates, el mecanismo de rotación y el motor OKLCH vienen de [hallmark](https://github.com/Nutlope/hallmark) (MIT), junto con la idea de elegir una forma de página nombrada antes de escribir código. El catálogo de formas se re-derivó acá: 18 formas en 10 familias, con los casi-duplicados fusionados y la agrupación por familia agregada para tapar un hueco de la regla de rotación. La inferencia de brief y el audit-first, de [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). La lente de defectos de ejecución, de pols-antislop. Desglose completo, incluidas las dos reglas de hallmark que esta skill anula a propósito, en [`NOTICE.md`](NOTICE.md).

Licencia MIT. Hecho por [Santiago Moya](https://github.com/stgomoyaa).
