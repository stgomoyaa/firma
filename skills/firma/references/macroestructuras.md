# Macroestructuras — 18 formas en 10 familias

Elegir UNA antes de escribir código. Cada forma es un fingerprint completo (colocación del heading, composición del body, lenguaje de divisores, voz de botones, tratamiento de imagen). Elegir una forma nombrada es más rápido y más variado que decidir seis ejes sueltos.

**Las formas se agrupan por familia, y la familia es lo que manda en la rotación.** Dos grillas distintas siguen leyendo como dos grillas: pasar de Bento a Catálogo cumple "no repetir la macro" pero no produce un sitio distinto. Por eso hay dos reglas, no una:

- La **forma** no puede repetir ninguna de las últimas 3 entradas de `.firma/log.json`.
- La **familia** no puede repetir la del build inmediatamente anterior.

Brief vago → elegir dentro de Grilla, Documento, Póster o Producto (cubren la gran mayoría de los casos). **Especimen no es default**: solo con brief explícitamente editorial, de foundry o de catálogo visual.

---

## 1 · Grilla — el ritmo viene de las celdas

**Bento** — bloques modulares de tamaños DISTINTOS (feature, quote, imagen, stat). El ritmo viene de la variación de tamaño, no de cards uniformes. Celdas = exactamente el contenido que hay; nunca una celda vacía de relleno, nunca 6 celdas blanco-sobre-blanco solo con texto.

**Catálogo** — grilla uniforme de variaciones de lo mismo (SKUs, paletas, planes, tipos). Índice visual de inventario. Acá la uniformidad SÍ es correcta: son ítems comparables y el ojo los compara.

**Portafolio** — cards de proyectos, filtrables si hay suficientes para justificar el filtro. El trabajo es el producto. Un filtro con 3 ítems es decoración; bajo 6 ítems, lista simple.

## 2 · Documento — lee como texto continuo

**Memo** — prosa continua con heads inline, formato de memo o journal. La página es literatura sobre el producto, no un folleto sobre el producto.

**Carta** — primera persona, íntima, abre con saludo. Sin botones en el fold. Nota personal del founder. Encaja con personal brands que no performan.

**FAQ** — preguntas en negrita, respuestas breves. La página lee como entrevista honesta al producto. Funciona cuando las objeciones reales del comprador son el contenido más valioso que tienes.

## 3 · Póster — una declaración domina

**Marquee** — el hero ES la página above the fold: una declaración o un visual llena el viewport. Abajo, la página se vuelve otra cosa (lista, grilla, prosa). La transición es el efecto.

**Manifiesto** — tipografía polémica grande, energía de declaración, sostenida en toda la página. Le dice al lector qué creer antes de qué comprar.

## 4 · Prueba — la página se construye sobre UN dato real

**Proof-Led** — el hero es una sola pieza de evidencia y todo lo que sigue la sostiene. Dos variantes: **número** (un stat gigante) o **quote** (un pull-quote con atribución).

Gate de honestidad, no negociable: **sin el dato real, esta familia está prohibida**. No se rellena con un número inventado ni con un testimonio compuesto. Si no hay número ni quote verificable, la macro correcta es otra. Y el dato nunca va solo: siempre con la línea que dice qué significa.

## 5 · Producto — el software es el contenido

**Workbench** — screenshots reales del producto como contenido primario; tour guiado del app en uso. Menos marketing, más "esto haces con él". Screenshots reales o ninguno: un mockup inventado de una UI que no existe es la versión visual de una métrica fabricada.

**Playground** — bloques interactivos código-y-preview como contenido primario. Todo control que se ve interactivo FUNCIONA. Un control muerto es un bug, no una decoración.

## 6 · Secuencia — el orden es el contenido

**Etapas** — pasos numerados cuentan cómo se usa el producto en el tiempo. El numerado acá es genuinamente ordinal, así que es la excepción legítima al veto de eyebrows numerados.

**Feature Stack** — panel izquierdo sticky (label y descripción) + panel derecho scroll-synced. Ritmo cinematográfico. Ojo con dobles sticky a `top: 0`: el segundo va offseteado bajo el nav o se pisan.

## 7 · Índice — la navegación ES el diseño

**Índice** — la página es una lista de links, o varias superficies de descubrimiento a la vez (destacados, recientes, por categoría). El valor es browsear, y el diseño es la jerarquía de la lista. Escala desde un índice plano hasta un hub: es la misma forma con más superficies.

## 8 · Espacial — la disposición no es lineal

**Diagrama** — un diagrama grande organiza la página (flujo, red, mapa de sistema, arquitectura). La información se dispone espacialmente, no en secuencia. Encaja muy bien con dark-técnico, y es la única familia donde el artefacto central puede ser también la firma de la página.

## 9 · Especimen — el material es el contenido

**Tipográfico** — la tipografía ES el diseño: labels numerados al margen, tamaños enormes, spans asimétricos, CTA tipográfico. Foundry, design system, o cualquier página donde el tipo es la prueba.

**Fotográfico** — una imagen enorme domina cada fold; el texto es anotación pequeña. La página dice *mira* antes que *lee*. Requiere fotos propias buenas: con stock genérico esta forma se cae sola.

## 10 · Díptico — la pantalla partida es el ritmo

**Split Studio** — cada bloque divide la pantalla, texto a un lado, prueba al otro, alternando dirección. Máximo 2 splits seguidos en la misma dirección de alternancia; el tercero rompe con full-width u otra familia.

---

## Nav y footer (se eligen en el mismo paso)

Son parte del fingerprint, no chrome opcional.

**Navs (rotar entre builds):** minimal 2-links (solo si de verdad hay 2 destinos) · SaaS tres-secciones · chip flotante · side-rail · pill flotante con blur · masthead de diario · slab brutal · terminal/comando · edge-aligned mínimo · con banner retractable · ⌘K-pill inline. **El nav IA default (wordmark izquierda + 4-5 links + botón derecha + hairline + fondo blanco) falla el gate** salvo justificación real. Nav en UNA línea en desktop, alto ≤80px.

**Footers (rotar entre builds):** masthead · una línea inline · colofón denso · statement (cierra con una frase) · cierre de carta · newsletter-first · wordmark gigante compuesto (anclado al borde inferior, sin gap debajo, nada cortado). **El footer IA default (4 columnas Product/Company/Resources/Legal + social + copyright)** solo en un docs hub genuino.

## Cómo elegir

1. Leer el brief; anotar señales fuertes ("data heavy" → Diagrama o Proof-Led, "cuenta la historia" → Etapas, "personal" → Carta, "muchos features chicos" → Bento, "hay que comparar" → Catálogo).
2. Excluir las últimas 3 formas del log **y la familia del build anterior**.
3. Verificar el gate de la familia Prueba: si el brief la pide pero no hay dato real, cambiar de familia ahora, no a mitad del build.
4. Declarar el pick en texto plano antes del código: "Familia: Díptico. Forma: Split Studio. Nav: pill. Footer: statement."
5. Genuinamente empatado → ofrecer 3 opciones de familias categóricamente distintas (una de grilla, una de documento, una de póster) y que elija quien pide.

## Secuencia SaaS (solo cuando aplica)

Para B2B SaaS con familias Grilla, Prueba o Producto: hero → prueba social (solo logos REALES) → features → testimonios (solo REALES) → pricing (precio visible; "contáctanos" en cada tier es un tell) → FAQ → CTA final (UN botón) → footer. Es una receta de qué debe existir, no un template de cómo se ve. Para no-SaaS (carta, manifiesto, editorial) esta secuencia NO aplica.
