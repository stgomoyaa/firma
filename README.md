# firma

An anti-AI-slop design skill for coding agents, written for teams that ship in Spanish.

Every model was trained on the same SaaS templates, so every model reaches for the same page: Inter, a purple gradient, an eyebrow label above each section, three identical shadowed cards, a glow orb behind the hero. There is now a small field of skills that fight this. `firma` is one of them, and it is honest about standing on the others (see [`NOTICE.md`](NOTICE.md)).

What it adds to that field is three things nobody else covers.

**1. A Spanish copy gate.** Ask any LLM for Spanish UI copy and you get Argentine *voseo*: `Empezá gratis`, `crece con vos`, `mirá el demo`. It is the correct register for exactly one market and wrong for the rest. `firma` treats it as auto-fail, with an explicit blacklist and the tuteo rewrite for every form. No other skill in this genre has a locale gate at all.

**2. Honesty as a hard gate, not good taste.** No invented metrics, no fabricated testimonials, no client logos you do not have, no fake urgency counters. In Chile that is consumer-law exposure (SERNAC), not a style preference. The consequence is structural: a stat-led hero with no real stat is the wrong macrostructure, so the skill picks a different one instead of inventing `+47% conversión`.

**3. Rotation memory.** A per-project log records the macrostructure, theme, display face, nav and footer of every build. The next build cannot repeat any of the last three. Without this, an agent converges back on one house style within a week, and clean-but-identical is still slop.

Plus the rule the skill is named after: **nothing ships without its firma**, the one artifact or gesture that would make no sense pasted into another site. A built CSS artifact, a bespoke silhouette, a ticker of real numbers, a typographic composition. No firma, no build.

## What is in the box

| File | What it holds |
|---|---|
| `skills/firma/SKILL.md` | The 8 hard rules, 3 verbs, and the 8-step design flow |
| `references/macroestructuras.md` | 21 named page shapes, plus nav and footer archetypes, chosen before any code |
| `references/temas.md` | 12 copy-paste OKLCH themes, 4 of them dark-technical |
| `references/tipografia.md` | Type pairings, and the faces vetoed for being LLM defaults |
| `references/color.md` | The OKLCH engine for building a theme from a brand colour |
| `references/layout.md` | Space, asymmetry, depth, and the grid-alignment check |
| `references/motion.md` | Motion budget, named easings, the CSS ticker recipe |
| `references/copy.md` | Spanish neutral copy rules and the voseo blacklist |
| `references/slop-test.md` | ~60 gates plus the six-axis self-critique, run before every handoff |
| `references/audit.md` | Scoring rubric for the `audit` and `redesign` verbs |

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

## Deterministic linting

The gates in `slop-test.md` are run by the agent, which means they are self-reported: the model that wrote the page is the one asked whether the page is slop. For a second, deterministic opinion, pair it with [impeccable](https://github.com/pbakaus/impeccable)'s detector, which needs no LLM and no API key:

```bash
npx impeccable detect --json src/
```

It catches the generic execution layer well (contrast, gray-on-colour, nested cards, glow shadows, AI palettes, eyebrow chips). It does not know about *voseo*, fabricated metrics, or zero-tolerance em-dashes, and it flags two things this skill prescribes on purpose, so ignore those two rules for dark-technical work:

```json
{ "detector": { "ignoreRules": ["marquee"], "ignoreValues": { "overused-font": ["Space Grotesk"] } } }
```

## Provenance

`firma` is a derivative work and says so. The macrostructure taxonomy, the six-axis self-critique, most of the gate battery, the rotation mechanism and the OKLCH engine come from [hallmark](https://github.com/Nutlope/hallmark) (MIT). Brief inference and audit-first come from [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). The execution-defect lens comes from pols-antislop. Full breakdown, including the two hallmark rules this skill deliberately overrides, in [`NOTICE.md`](NOTICE.md).

MIT licensed. Built by [Santiago Moya](https://github.com/stgomoyaa).

---

# firma (español)

Skill de diseño anti-slop para agentes que escriben código, hecha para quienes shippean en español.

Todos los modelos se entrenaron con los mismos templates de SaaS, así que todos llegan a la misma página: Inter, gradiente violeta, un eyebrow arriba de cada sección, tres cards con sombra idénticas, un orbe de glow detrás del hero. Ya existe un pequeño campo de skills que pelean contra eso. `firma` es una de ellas, y es honesta respecto a pararse sobre las otras (ver [`NOTICE.md`](NOTICE.md)).

Lo que agrega son tres cosas que nadie más cubre.

**1. Gate de copy en español.** Pídele copy de UI en español a cualquier LLM y sale voseo argentino: `Empezá gratis`, `crece con vos`, `mirá el demo`. Es el registro correcto para exactamente un mercado y equivocado para el resto. `firma` lo trata como auto-fail, con lista negra explícita y la reescritura en tuteo para cada forma. Ninguna otra skill del género tiene gate de locale.

**2. Honestidad como regla dura, no como buen gusto.** Cero métricas inventadas, cero testimonios fabricados, cero logos de clientes que no tienes, cero contadores de urgencia falsos. En Chile eso es riesgo SERNAC, no una preferencia estética. La consecuencia es estructural: un hero stat-led sin un stat real es la macroestructura equivocada, así que la skill elige otra en vez de inventar `+47% conversión`.

**3. Memoria de rotación.** Un log por proyecto registra macroestructura, tema, display face, nav y footer de cada build. El siguiente no puede repetir ninguno de los últimos tres. Sin eso, un agente vuelve a su único house style en una semana, y limpio pero idéntico sigue siendo slop.

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

## Linter determinista

Los gates de `slop-test.md` los corre el agente, o sea que son auto-reportados: el modelo que escribió la página es el mismo al que se le pregunta si la página es slop. Para una segunda opinión determinista, complementa con el detector de [impeccable](https://github.com/pbakaus/impeccable), que no necesita LLM ni API key:

```bash
npx impeccable detect --json src/
```

Caza bien la capa genérica de ejecución (contraste, gris sobre color, cards anidadas, sombras de glow, paletas IA, eyebrow chips). No sabe nada de voseo, métricas fabricadas ni em-dashes con tolerancia cero, y marca dos cosas que esta skill prescribe a propósito, así que para trabajo dark-técnico esas dos se ignoran:

```json
{ "detector": { "ignoreRules": ["marquee"], "ignoreValues": { "overused-font": ["Space Grotesk"] } } }
```

## Procedencia

`firma` es un trabajo derivado y lo dice. La taxonomía de macroestructuras, la autocrítica de 6 ejes, la mayor parte de la batería de gates, el mecanismo de rotación y el motor OKLCH vienen de [hallmark](https://github.com/Nutlope/hallmark) (MIT). La inferencia de brief y el audit-first, de [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). La lente de defectos de ejecución, de pols-antislop. Desglose completo, incluidas las dos reglas de hallmark que esta skill anula a propósito, en [`NOTICE.md`](NOTICE.md).

Licencia MIT. Hecho por [Santiago Moya](https://github.com/stgomoyaa).
