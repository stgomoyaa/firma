# Slop-test — autocrítica + gates

Correr ANTES de entregar cualquier output. Primero la autocrítica, después los gates. Toda respuesta de gate debe ser **no**. Si algo falla, se arregla y se re-corre. No se shippea slop.

## Autocrítica en 6 ejes (1-5)

Cualquier eje <3 dispara un pase de revisión ANTES de los gates. Dos pases es normal; tres significa que el brief está mal leído, no el diseño.

| Eje | Qué se puntúa |
|---|---|
| **P** Filosofía | ¿Hay un *por qué*, una posición que la página toma? ¿O es solo un layout? |
| **H** Jerarquía | ¿En 2 segundos se distingue primario/secundario/terciario? |
| **E** Ejecución | ¿Los detalles (rules, acento, contraste, focus, alineación) están en spec? |
| **S** Especificidad | ¿Parece hecho para ESTE brief o para cualquiera? |
| **R** Restraint | ¿Se sacó todo lo que no se gana su lugar? |
| **V** Variedad | ¿Comparte fingerprint estructural con un output anterior del proyecto? (distancia estructural, no visual: un color-swap no es variedad, y dos formas de la misma familia de macro tampoco) |

Registrar en el stamp: `critique: P5 H4 E5 S4 R5 V5`.

## Gates

### Gate 0 · Chequeo determinista (correr ANTES de la lista a mano)

Los gates de abajo los evalúa el mismo modelo que escribió la página, así que son auto-reportados. Antes de leerlos, correr los dos linters que no dependen de eso. Si algo sale acá, se arregla y se vuelve a correr; no se pasa a los gates a mano con errores pendientes.

```bash
# 1. reglas duras propias: voseo, em-dash, métricas sin confirmar, negros/grises puros, tokens sueltos
node <ruta-de-la-skill>/scripts/guard.mjs <ruta>

# 2. capa genérica de ejecución: contraste, gris-sobre-color, cards anidadas, glow, paletas IA, eyebrow chips
npx impeccable detect <ruta>
```

Dos reglas de impeccable chocan **a propósito** con esta skill y se ignoran en trabajo dark-técnico (el ticker CSS y la display face son prescripciones, no defectos). Dejar en `.impeccable/config.json` del proyecto:

```json
{ "detector": { "ignoreRules": ["marquee"] } }
```

Lo que impeccable NO ve y el guard sí: voseo, métricas fabricadas, y em-dashes con tolerancia cero (su regla es *advisory* y necesita 8 ocurrencias para gatillar). Lo que el guard NO ve y impeccable sí: todo lo que necesita DOM o AST (contraste calculado, anidamiento real de cards, contenido invisible en reposo). Los dos, no uno.

### Reglas duras (no negociables)

1. ¿Hay voseo argentino en algún texto visible (vos/tenés/querés/agendá/mirá…)? Buscar imperativos en `-á/-é/-í` tónica y presentes en `-és/-ás/-ís`.
2. ¿Hay algún `—` o `–`-separador en texto visible (headlines, body, quotes, botones, captions, alt)?
3. ¿Hay alguna métrica, testimonio, nombre, cargo, logo de cliente o contador de urgencia que el usuario no haya provisto? (Riesgo SERNAC, no solo estética.)
4. ¿Hay itálica en algún heading/display (incluida UNA palabra `<em>` dentro de un título)?
5. ¿La display face es Fraunces o Instrument Serif sin que la marca lo justifique explícitamente? ¿O repite la display del build anterior?
6. ¿Hay orbes de glow flotantes, esferas 3D ambientales o blobs difusos con blur+multiply detrás del contenido?
7. ¿Hay fondo de grilla/graph-paper (con o sin máscara radial) tendido bajo la página?
8. ¿Hay eyebrows mono-caps en más de 1 de cada 3 secciones, o algún eyebrow al LADO del heading (tag-left/header-right)?
9. ¿Hay una fila de cards flotantes con la misma sombra, mismo radius, mismo tamaño? (El ritmo viene de variación, no de clonación.)
10. ¿Grid-alignment: hay whitespace huérfano (gap muerto bajo el h1 por `align-items` mal elegido con columna vecina más alta), columnas de comparación desfasadas, o head de sección centrado flotando sobre body left-flush?

### Tipografía

11. ¿Display en Inter/Roboto/Open Sans/Poppins/Lato o system default?
12. ¿Más de 3 familias en la página, o el outlier en más de 2 slots?
13. ¿Contraste de peso débil (400 vs 600)? Headings contrastan ≥300 unidades con el body.
14. ¿Gradient-text en algún heading?
15. ¿Headline del hero >2 líneas en desktop, o >90 chars a tamaño display?
16. ¿All-caps display con line-height <1.0 (colisión de cap-tops al wrappear)?
17. ¿Display headers sin `overflow-wrap: anywhere; min-width: 0`?
18. ¿Body <16px, measure fuera de 45-75ch, o all-caps en párrafos?

### Color

19. ¿`#000` o `#fff` puros como superficie?
20. ¿Algún neutral con chroma 0 (gris sin tintear)?
21. ¿Gradiente purple-blue/purple-cyan/mesh/aurora en cualquier parte?
22. ¿El acento cubre >5% del viewport?
23. ¿Paleta beige+brass+espresso en un brief premium, o azul-carbón/slate-índigo default en un dark, o crema/gris-UI-kit como base no elegida?
24. ¿Algún par texto/fondo bajo 4.5:1 (body) o 3:1 (grande/iconos/focus)? Revisar especialmente: texto de botón ≈ fill del botón, secciones oscuras con ink heredado, muted sobre paper-2.
25. ¿Costuras duras de color entre secciones sin intención (un glow que muere en el borde, un scrim que corta)?

### Estructura y layout

26. ¿Template genérico (hero → 3 features iguales → CTA → footer), la misma forma de macroestructura que alguna de las últimas 3 del log, o la misma **familia** de macroestructura que el build anterior?
27. ¿Grilla de 3 columnas iguales con icono-arriba-heading-abajo?
28. ¿Card dentro de card?
29. ¿Hero `100vh` con todo centrado en un solo eje vertical (eyebrow+título+lede+CTA)? Máximo 2 elementos centrados; el resto rompe el eje.
30. ¿El nav es el fingerprint IA (wordmark + 4-5 links + botón derecha + hairline + blanco) sin justificación? ¿El footer es el de 4 columnas + social + copyright sin ser docs hub?
31. ¿El stack de hero default (eyebrow → headline → subtexto → par de botones fill+outline, panel a la derecha) sin romper nada del esqueleto?
32. ¿Par de botones fill+outline como fila de acciones default? ¿Dos CTAs con la misma intención en la página?
33. ¿Más de 2 secciones seguidas con el mismo split imagen/texto zigzag? ¿Menos de 4 familias de layout en una página de 8 secciones?
34. ¿Sombra pareja en todos los lados por reflejo, glow sobre dark, o doble sombra apilada?
35. ¿Algún espaciado fuera de la escala nombrada?
36. ¿Radius mezclado sin sistema (botones pill en layout recto, cards cuadradas en página pill)?
37. ¿Bento con celdas vacías de relleno o todas blanco-sobre-blanco solo texto?

### Chrome y decoración

38. ¿Chrome redibujado (fake browser bar con dots, fake phone frame, fake ventana de código, fake terminal con traffic lights)? Screenshot real en `<figure>` o nada.
39. ¿Screenshots falsos hechos de divs (fake dashboard, fake task list)?
40. ¿Iconos: dos librerías mezcladas, emoji (✨🚀⚡) como icono de feature, o icono metido en un tile/círculo de color de fondo?
41. ¿Elemento decorativo sin ancla semántica (cursor flotante, número random, chip Pantone sin razón, sticker)?
42. ¿Glassmorphism sin backdrop real que refractar, o glass con banding/leak/pop?
43. ¿Toggle sol-luna, dot bajo el nav item activo, o hairline decorativa suelta al lado de un label?

### Motion

44. ¿`transition: all`, easing default del browser, o bounce/overshoot en UI?
45. ¿Se anima width/height/top/left/margin/padding?
46. ¿Más de UNA entrada orquestada, o fade-up-on-scroll en cada sección?
47. ¿Contenido que arranca en opacity 0 y depende de JS/observer para existir? (Si el reveal no dispara, sección en blanco: fail absoluto.)
48. ¿Focus ring que hace fade-in? ¿Hover-boop en botones? ¿Underline que crece al hover?
49. ¿Falta `prefers-reduced-motion` en alguna animación? ¿Carousel/ticker sin pause en hover+focus?
50. ¿Más de un ticker/marquee por página?

### Estados e implementación

51. ¿Algún interactivo sin sus 8 estados en código (mínimo default/hover/focus-visible/active/disabled)?
52. ¿Inputs: border-width que cambia entre estados, focus con border en vez de outline, altura distinta al botón hermano, slot de helper que colapsa, disabled solo con opacity?
53. ¿Color o font-family inline fuera del bloque de tokens (improvisación mid-render)?
54. ¿Controles muertos (tab/accordion/toggle que se ve interactivo y no hace nada)?

### Responsive

55. ¿Scroll horizontal en algún ancho 320-1920px? (`overflow-x: clip` en html Y body, siempre.)
56. ¿Algún CTA, link de nav, tab o breadcrumb que wrappea a 2 líneas en algún ancho? ¿Nav de 2 líneas en desktop?
57. ¿Grid con imágenes usando `1fr` pelado en vez de `minmax(0, 1fr)`?
58. ¿Doble sticky a `top: 0` (nav + elemento interno) que se pisan al scrollear?

### Firma y variedad

59. ¿La página tiene su firma (el artefacto/gesto que no se puede pegar en otro sitio)? Sin firma, es slop limpio: la restraint sin idea es trabajo a medio terminar.
60. ¿Falta el stamp en la primera línea del CSS, o falta el append a `.firma/log.json` con sus campos completos (`familia` incluida, o la próxima rotación no puede chequear la familia del build anterior)?

## El tell más profundo

Esquivar esta lista no es diseñar. Se puede pasar todo gate y aún así shippear slop si no se inventó nada. La lista hace el trabajo menos incorrecto; la **firma** (gate 59) y la posición (eje P) lo hacen bueno. Limpio es el piso, nunca el logro.
