---
name: firma
description: "Sistema de diseño anti-slop para agentes que escriben frontend en español. Invocar ANTES de escribir markup/CSS ante cualquier trabajo visual: landing pages, componentes nuevos, portfolios, heroes, pricing, redesigns, dark mode, 'que se vea mejor/premium/menos IA', o auditar UI existente. También cuando se pida 'audit', 'redesign', 'firma', 'antislop' o que un diseño no parezca hecho por IA. Motor: OKLCH con grises tinteados, un solo acento, fuentes con carácter, macroestructuras que rotan entre builds para que dos páginas no compartan fingerprint, gates anti-tells, copy en español neutro con tú (cero voseo), cero métricas o testimonios inventados, y estéticas dark-técnicas con animación CSS cuando encajan."
---

# firma

Objetivo doble, en este orden: que el output **no parezca generado por IA** y que tenga **harta personalidad**. Un diseño limpio sin idea es el piso, no el logro. Dos builds consecutivos deben parecer **sitios distintos**, no color-swaps del mismo template.

El nombre es la regla central: ninguna página se entrega sin **su firma**, el UN artefacto o gesto que hace que no se pueda copiar y pegar en otro sitio. Página sin firma es slop limpio, y slop limpio sigue siendo slop.

Tres cosas que esta skill hace y el resto del género no:

1. **Gate de copy en español neutro.** El voseo argentino es el default de todo LLM que escribe español; acá es auto-fail con lista negra explícita.
2. **Honestidad como regla dura, no como buen gusto.** Cero métricas, testimonios o logos inventados. En Chile eso es riesgo SERNAC, no una preferencia estética: una macroestructura que necesita datos que no existen es la macroestructura equivocada.
3. **Memoria de rotación entre builds.** Un log en el proyecto impide repetir macroestructura, tema, display face, nav y footer. Sin eso, todo agente vuelve al mismo atractor a los tres días.

Es autosuficiente: no necesita ninguna otra skill instalada. Si choca con otra skill de diseño, **gana esta** (ver `NOTICE.md` para qué se hereda y de dónde).

---

## Reglas duras (no negociables, activas en todo verbo)

Estas no son estilo, son ley. Se chequean en los gates (`references/slop-test.md`).

1. **Español neutro chileno con TÚ. Cero voseo argentino.** Todo copy visible al usuario final va en tú.
   - Prohibido: `vos · tenés · querés · podés · salís · sabés · pagás · hacés · agendá · mirá · dejá · empezá · descubrí · sumate` y cualquier imperativo/conjugación voseante en `-á/-é/-í`.
   - Correcto: `tú · tienes · quieres · puedes · sales · sabes · pagas · haces · agenda · mira · deja · empieza · descubre · súmate`.
   - Sin "usted". Términos técnicos quedan en inglés (deploy, pricing, checkout). Detalle en `references/copy.md`.
2. **Honestidad total — riesgo legal SERNAC, no solo estética.** Cero testimonios inventados, cero logos de clientes falsos, cero métricas fabricadas ("+47% conversión", "5.000 clientes"), cero contadores de urgencia falsos. Si no hay dato real: placeholder gris etiquetado ("métrica por confirmar"), preguntar, o rediseñar la sección sin el slot de prueba. Un stat-led sin stats reales es la macroestructura equivocada.
3. **Em-dashes (`—`) prohibidos en todo texto visible.** Es EL tell de escritura IA. Usa punto, coma, dos puntos o paréntesis. Rangos con guion simple (`2020-2026`, `$40-80`). Esto anula la regla tipográfica de hallmark que los prescribía.
4. **Itálicas en headings prohibidas.** Ni una palabra en itálica dentro de un título (`Built to <em>think</em>` es un tell top). Énfasis por peso, color de acento o underline dibujado. Itálica solo como énfasis dentro de párrafos de body.
5. **Serifs permitidas y bienvenidas** (dan personalidad), **pero Fraunces e Instrument Serif están vetadas como default** (son las serif favoritas de todo LLM; también Playfair/Cormorant/didones como reflejo de "lujo"). Preferir picks más distintivos y **rotar** la display face entre builds. Catálogo en `references/tipografia.md`.
6. **Dark-técnico es dirección de primera clase**, no excepción: dark de alto contraste, geometría con chaflán/notch, ticker CSS, acentos fosforescentes. Cuando el brief lo pide (dev tool, API, datos, "técnico", "oscuro"), es la dirección natural. Receta en `references/motion.md` y temas dark en `references/temas.md`.
7. **Tells vetados explícitamente** (auto-fail aunque "se vean bien"): orbes de glow flotantes · fondo de grilla con máscara radial · eyebrow mono-caps arriba de CADA sección · cards flotantes con sombra idénticas en fila · look "SaaS de acento que brilla" · gradientes purple/mesh · gradient-text en headlines.
8. **Layout verificado, no asumido.** El bug clásico: gap en blanco bajo el h1 porque un grid con `align-items: center` (o `stretch` implícito) tiene al lado una columna más alta. Todo grid de 2+ columnas con alturas distintas declara su alineación a propósito (`align-items: start` casi siempre) y se revisa que no quede **whitespace huérfano** ni columnas de comparación desfasadas. Gate propio.

---

## Verbos

| Invocación | Qué hace |
| --- | --- |
| *(default)* | Diseñar/construir algo nuevo. Sigue el **Flujo de diseño** de abajo. |
| `audit <target>` | Lee el target, lo puntúa contra `references/audit.md` + los gates, devuelve punch list rankeada (critical/major/minor + veredicto). **No edita.** |
| `redesign <target>` | Audit primero, después rediseña la capa visual **dentro de los límites de la implementación existente** salvo confirmación explícita de rebuild total. Preserva rutas, IA de contenido, copy voice, analytics hooks y slugs. Nunca borra archivos de producción sin plan aprobado. |

En proyectos existentes: declarar qué archivos se van a tocar antes de editar. Deletes requieren confirmación.

---

## Flujo de diseño (default)

### 0 · Pre-flight scan

Si el proyecto tiene código, **leerlo antes de preguntar nada**: `design.md` (si existe, es el sistema lockeado y manda), font stack (`next/font`, `@fontsource`, links a Google Fonts, tailwind config), paleta (`:root`, tokens), libs de motion, spacing scale, framework. Emitir un bloque corto "Pre-flight: preservo X, introduzco Y". Proyecto vacío → una línea y seguir.

### 1 · Design read (inferir, no interrogar)

Antes de tocar código, inferir del brief: **audiencia · trabajo de la página (la acción única) · tono extremo** (editorial, brutalista, técnico, soft, lujo, playful, austero; "clean y moderno" no es un tono). Declararlo en UNA línea:

> *"Leyendo esto como: landing de <X> para <audiencia>, lenguaje <vibe>, dirección <dirección>."*

Si el read genuinamente diverge en dos caminos, **una** pregunta corta, nunca un cuestionario. Si se puede inferir con confianza, declarar y avanzar. Sin señales de marca en el brief, el default es personal brand honesto: primera persona, entregables concretos, cero performance.

### 2 · Dirección

Cuatro direcciones; el brief elige por señales, default silencioso **editorial-sobrio**:

- **editorial-sobrio** — el registro anti-slop canónico. Paper tinteado, serif o grotesk con carácter, hairlines, radius 0-4px, tipografía manda.
- **dark-técnico** — dev tools, APIs, infra, datos, "oscuro", "terminal". Alto contraste sobre dark tinteado (nunca `#000` ni el azul-carbón default), mono o grotesk display, chaflán/notch como firma geométrica, UN ticker CSS permitido, acento fosforescente ≤5%. El default cuando el contenido es técnico, no una excepción.
- **minimal-moderno** — SaaS/B2B tipo Linear/Stripe. Neutrales fríos permitidos, precisión, restraint.
- **cálido-playful** — consumer, comunidad, onboarding. Radius generoso, sans humanista, color con más chroma.

La dirección scopea qué temas rotan y qué gates se relajan. Decirla en voz alta junto al pick de macroestructura.

### 3 · Memoria y diversificación (lo más valioso de la skill)

Leer `.firma/log.json` en la raíz del proyecto (y `.firma/log.json` si existe, para continuidad). Schema: array JSON, entrada más nueva primero:

```json
[{ "date": "2026-07-17", "macro": "Bento Grid", "tema": "Pizarra", "direccion": "dark-tecnico", "display": "Space Grotesk", "nav": "pill", "brief": "landing de producto" }]
```

Reglas con las últimas 3-5 entradas:

- La **macroestructura** no puede repetir ninguna de las últimas 3.
- El **tema** debe diferir del anterior en al menos 1 de 3 ejes: **banda de paper** (dark <30% / mid 30-85% / light >85% de lightness) · **estilo de display** (serif-contraste / serif-clásica / grotesk / mono / condensed-heavy / humanista) · **hue del acento** (cálido 10-60° / frío 200-300° / verde-otro / neutro).
- La **display face** no puede repetir la del build anterior.
- Nav y footer archetype tampoco repiten el build anterior.

**Declarar la rotación en el chat antes de elegir** ("Últimos 3: Bento/Pizarra, Long Document/Papel, Manifesto/Tinta → elijo Split Studio/Cobalto, difiere en banda y acento"). Elegir en la página, no en la cabeza: es lo que impide volver al atractor default. Al final del build, append al log (recortar a 20 entradas).

### 4 · Macroestructura + nav + footer

Elegir UNA de las 21 formas nombradas en `references/macroestructuras.md` ANTES de escribir código. La macroestructura fija colocación de heading, composición, lenguaje de divisores y voz de botones de una vez. Specimen no es default. Nav y footer se eligen en el mismo paso: **el nav "wordmark + 4 links + botón a la derecha" y el footer "4 columnas + social + copyright" son los fingerprints IA más reconocidos**; usarlos solo con justificación real.

### 5 · Tema (paleta + fuentes)

Catálogo OKLCH copiable en `references/temas.md` (incluye 4 temas dark-técnicos). Si el brief trae color de marca o un vibe multi-atributo que el catálogo no cubre, construir un tema custom con el motor de `references/color.md` (paper/ink/neutrales tinteados al hue ancla, un acento 0.12-0.22 de chroma). Reglas universales: OKLCH en todo, nada de `#000`/`#fff` puros, grises SIEMPRE tinteados (chroma ≥0.005), acento ≤5% del viewport, tipografía por `references/tipografia.md`.

### 6 · Preview (antes de emitir código)

Bloque corto de bullets para que quien pide pueda redirigir antes de 500 líneas de CSS:

```markdown
**firma**
- **Dirección** · dark-técnico
- **Macro** · Split Studio
- **Tema** · Pizarra (dark cálido · grotesk · acento ámbar-fósforo)
- **Fuentes** · Space Grotesk 700 / Switzer 400 / JetBrains Mono
- **Firma** · ticker de métricas reales + chaflán en cards
- **Secciones** · Hero · Demo · Precios · FAQ · Cierre
- **Difiere del anterior en** · banda de paper + display
```

La **firma** es obligatoria: el UN artefacto/gesto que hace que esta página no pueda pegarse en otro sitio (un artefacto CSS construido, una silueta bespoke, un ticker con datos reales, una composición tipográfica). Página sin firma = slop limpio. Si no hay firma, no hay build.

### 7 · Build

- **Tokens lockeados.** Todo color y toda `font-family` referencia un token de `:root` (`var(--color-acento)`). Cero hex/oklch inline a mitad del render; si falta un valor, se sube al bloque de tokens primero.
- Spacing scale 4pt nombrada (`--space-xs` … `--space-4xl`); ningún `padding: 17px` suelto.
- Pesos a los extremos: si el body es 400, headings 700-800 o 200. Nunca 500/600 como contraste.
- Asimetría con eje primario; máximo 2 elementos centrados en el hero. Hairlines o elevación tonal en vez de cards con sombra. Radius coherente con la dirección (editorial = 0-4px, un solo sistema de radius por página).
- Motion: solo `transform` + `opacity`, 3 easings custom nombrados, UNA entrada orquestada por página (no fade-up-on-scroll en todo), `prefers-reduced-motion` siempre, **contenido nunca escondido detrás de una animación de entrada** (si el reveal no dispara, la sección queda en blanco). Detalle en `references/motion.md`.
- Todo elemento interactivo con sus 8 estados (default/hover/focus-visible/active/disabled/loading/error/success). Focus ring instantáneo, nunca animado.
- Responsive verificado a 320/375/768/1280: sin scroll horizontal (`overflow-x: clip` en html y body), CTAs y nav links en UNA línea, grids con imágenes usan `minmax(0, 1fr)`.
- Copy por `references/copy.md`: específico, honesto, en español neutro chileno.
- **Stamp** en la primera línea del CSS: `/* firma · macro: <n> · tema: <n> · direccion: <d> · critique: P#H#E#S#R#V# */` y append a `.firma/log.json`.
- Nunca clobberear el stylesheet global existente; append-only bajo las directivas del framework.

### 8 · Gates + autocrítica (antes de entregar)

1. **Autocrítica en 6 ejes** (1-5): Filosofía · Jerarquía · Ejecución · Especificidad · Restraint · Variedad. Cualquier eje <3 → pase de revisión antes de los gates.
2. Correr los **gates de `references/slop-test.md`** (los ~50 heredados de hallmark, consolidados, + los propios: em-dash, voseo, alineación de grid/whitespace huérfano, orbes/grilla-radial, eyebrows, honestidad). Toda respuesta debe ser **no**. Si un gate falla, se arregla; no se shippea slop.
3. Verificación visual real cuando haya browser disponible (screenshot a 2-3 anchos): centrado óptico, nada cortado por un clip/notch, columnas paralelas alineadas.

---

## Component-scope (cuando el brief es un componente, no una página)

Señales: nombra un solo elemento UI, brief ≤30 palabras, target es un archivo de componente. En ese caso: saltar macroestructura/nav/footer/log (los componentes no rotan), heredar tokens y dirección del proyecto, y ser MÁS estricto en estados: los 8 estados con código real + un preview que los muestre apilados. Los gates universales (tipografía, color, contraste, motion, español) aplican igual.

---

## Definition of Done

El build está listo cuando: gates en verde + firma presente + responsive verificado + copy en español neutro sin voseo + cero datos inventados. **Ahí se cierra el scope.** Iterar más allá de eso sin que te lo pidan es scope creep que no mueve plata; decirlo explícito ("ya está suficientemente bueno para shippear") en el cierre.

---

## Mapa de references (cargar solo lo que el paso pide)

| Archivo | Cuándo |
| --- | --- |
| `references/macroestructuras.md` | Paso 4, todo build de página |
| `references/temas.md` | Paso 5, todo build |
| `references/tipografia.md` | Paso 5 + build |
| `references/color.md` | Tema custom o dudas de paleta/contraste |
| `references/layout.md` | Build: espacio, asimetría, profundidad, grid-alignment |
| `references/motion.md` | Build con cualquier elemento interactivo o animación (incluye receta de ticker) |
| `references/copy.md` | Build: todo texto visible |
| `references/slop-test.md` | Paso 8, SIEMPRE antes de entregar |
| `references/audit.md` | Verbos `audit` y `redesign` |

Procedencia, en detalle y con licencias, en `NOTICE.md` del repo: https://github.com/stgomoyaa/firma/blob/main/NOTICE.md. Resumen: la taxonomía de macroestructuras, la autocrítica de 6 ejes, la batería de gates y el mecanismo de rotación vienen de **hallmark** (MIT); la inferencia de dirección sin interrogar al usuario, de **taste-skill** (MIT); la cacería de tells de ejecución, de **pols-antislop**. Las reglas duras, el requisito de firma, los temas (salvo Cobalto), el gate de español neutro, la regla de honestidad y el modo component-scope son propios.
