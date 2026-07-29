# Macroestructuras — 21 formas de página

Elegir UNA antes de escribir código. Cada una es un fingerprint completo (colocación del heading, composición del body, lenguaje de divisores, voz de botones, tratamiento de imagen). Elegir una forma nombrada es más rápido y más variado que decidir seis ejes sueltos.

**Diversificación:** la elección no puede repetir ninguna de las últimas 3 entradas del log. Brief vago → elegir entre las primeras 10 (cubren ~80% de los casos). **Specimen (10) no es default**: solo con brief explícitamente editorial/foundry.

## Índice

1. **Bento Grid** — bloques modulares de tamaños DISTINTOS (feature, quote, imagen, stat). El ritmo viene de la variación de tamaño, no de cards uniformes. Celdas = exactamente el contenido que hay; nunca una celda vacía de relleno, nunca 6 celdas blanco-sobre-blanco solo con texto.
2. **Long Document** — lee como memo/carta/journal. Prosa continua con heads inline. La página es literatura sobre el producto.
3. **Marquee Hero** — el hero ES la página above the fold: una declaración o visual llena el viewport. Abajo, la página se vuelve otra cosa (lista, grilla, prosa).
4. **Stat-Led** — el hero es un número gigante REAL (nunca inventado; sin dato real esta macro está prohibida). Todo lo que sigue lo sostiene. El número nunca va solo: siempre con una línea que dice qué significa.
5. **Workbench** — screenshots reales del producto como contenido primario; tour guiado del app en uso. Menos marketing, más "esto haces con él".
6. **Conversational FAQ** — preguntas en negrita, respuestas breves. La página lee como entrevista honesta al producto.
7. **Manifesto** — tipografía polémica grande, energía de declaración. Le dice al lector qué creer antes de qué comprar.
8. **Photographic** — una imagen enorme domina cada fold; el texto es anotación pequeña. La página dice *mira* antes que *lee*.
9. **Quote-Led** — el hero es un pull-quote con atribución REAL (regla de honestidad; sin quote real, otra macro).
10. **Specimen** — labels numerados al margen, serif enorme, spans asimétricos, CTA tipográfico. Solo editorial/foundry explícito.
11. **Catalogue** — grilla uniforme de variaciones de lo mismo (SKUs, paletas, tipos). Índice visual de inventario.
12. **Letter** — primera persona, íntima, abre con saludo. Sin botones en el fold. Nota personal del founder. Encaja con personal brands que no performan.
13. **Index-First** — la página ES una lista de links. Navegación pura como diseño.
14. **Narrative Workflow** — etapas numeradas cuentan cómo se usa el producto en el tiempo (1.0 → 2.0 → 3.0). Timeline de proceso; el numerado acá es genuinamente ordinal (excepción legítima al ban de eyebrows).
15. **Split Studio** — díptico: cada bloque divide la pantalla, texto a un lado, prueba al otro, alternando dirección. Máximo 2 splits seguidos en la misma dirección de alternancia; el tercero rompe con full-width u otra familia.
16. **Feature Stack** — panel izquierdo sticky (label/descripción) + panel derecho scroll-synced. Ritmo cinematográfico. Ojo con dobles sticky a `top: 0` (offset bajo el nav).
17. **Type Specimen** — la tipografía ES el diseño. Foundry o design-system donde el tipo es la prueba.
18. **Portfolio Grid** — cards filtrables de proyectos. El trabajo es el producto.
19. **Map / Diagram** — un diagrama espacial grande organiza la página (flujo, red, mapa de sistema). La información se dispone espacialmente, no linealmente. Encaja muy bien con dark-técnico.
20. **Ecosystem Index** — múltiples superficies de descubrimiento (destacados / recientes / por categoría). El valor es browsear.
21. **Component Playground** — bloques interactivos código-y-preview como contenido primario. Todo control que se ve interactivo FUNCIONA (control muerto = roto, no diseño).

## Nav y footer (se eligen en el mismo paso)

Son parte del fingerprint, no chrome opcional.

**Navs (rotar entre builds):** minimal 2-links (solo si de verdad hay 2 destinos) · SaaS tres-secciones · chip flotante · side-rail · pill flotante con blur · masthead de diario · slab brutal · terminal/comando · edge-aligned mínimo · con banner retractable · ⌘K-pill inline. **El nav IA default (wordmark izquierda + 4-5 links + botón derecha + hairline + fondo blanco) falla el gate** salvo justificación real. Nav en UNA línea en desktop, alto ≤80px.

**Footers (rotar entre builds):** masthead · una línea inline · colofón denso · statement (cierra con una frase) · cierre de carta · newsletter-first · wordmark gigante compuesto (anclado al borde inferior, sin gap debajo, nada cortado). **El footer IA default (4 columnas Product/Company/Resources/Legal + social + copyright)** solo en un docs hub genuino.

## Cómo elegir

1. Leer el brief; anotar señales fuertes ("data heavy" → Stat-Led/Map, "cuenta la historia" → Narrative, "personal" → Letter, "muchos features chicos" → Bento).
2. Excluir las últimas 3 del log.
3. Declarar el pick en texto plano antes del código: "Macro: Split Studio. Nav: pill. Footer: statement."
4. Genuinamente empatado → ofrecer 3 opciones de familias categóricamente distintas (una de grilla, una de documento, una de poster) y que elija quien pide.

## Secuencia SaaS (solo cuando aplica)

Para B2B SaaS con macro 1/4/5/3: hero → prueba social (solo logos REALES) → features → testimonios (solo REALES) → pricing (precio visible; "contáctanos" en cada tier es un tell) → FAQ → CTA final (UN botón) → footer. Es una receta de qué debe existir, no un template de cómo se ve. Para no-SaaS (carta, manifiesto, editorial) esta secuencia NO aplica.
