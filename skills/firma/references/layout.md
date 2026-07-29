# Layout y espacio

Acá se caza al "generado por IA": columnas iguales, todo centrado, cada card idéntica.

## Principios

- Todo layout tiene un **eje primario**: left-biased, right-biased, top-heavy. Centrado-en-todo es un default, no una decisión.
- **La asimetría lee intencional; la simetría perfecta lee generada.** En la duda, desplazar.
- El espaciado es una **escala, no valores sueltos**. Y variado: si cada gap es 24px, es un template.
- **Romper la grilla una vez a propósito** (un pull-quote, una foto, un número que cruza el límite de columna) vale más que nunca romperla.

## Escala de espaciado (4pt, nombrada)

```css
:root {
  --space-3xs: 0.125rem; --space-2xs: 0.25rem; --space-xs: 0.5rem;
  --space-sm: 0.75rem;   --space-md: 1rem;     --space-lg: 1.5rem;
  --space-xl: 2.5rem;    --space-2xl: 4rem;    --space-3xl: 6rem;
  --space-4xl: 9rem;
}
```

`gap` para hermanos; `margin` solo para ajustes ópticos o break-outs. Ningún valor fuera de la escala (`padding: 17px` es un tell). Secciones con padding DISTINTO entre sí: si el padding de card = sección = página, el ritmo es plano.

## Gate de alineación de grid / whitespace huérfano (regla dura #8)

El bug clásico, cazado en producción: **gap en blanco bajo el h1** porque el grid del hero tenía `align-items: center` (o `stretch` implícito) y la columna vecina era más alta; la columna de texto queda flotando con aire muerto arriba y abajo. Checklist mecánico para TODO grid/flex de 2+ columnas con alturas distintas:

1. Declarar la alineación a propósito: casi siempre `align-items: start` en el grid del hero (el texto arranca arriba, el visual puede crecer).
2. Buscar **whitespace huérfano**: aire que no fue diseñado sino que "quedó" (bajo un heading, entre un h1 y su lede, al pie de una columna corta). Si un espacio no se puede explicar como decisión de ritmo, es un bug.
3. **Columnas paralelas comparables** (pricing, planes, before/after): cada rol (título, precio, body, lista, botón) comparte línea horizontal en TODAS las columnas. Alturas iguales, botón anclado al fondo (`margin-top: auto`), espacio reservado para copy variable. El largo del texto de una celda jamás decide dónde cae el contenido de las vecinas.
4. Head de sección coherente con su body: un head angosto auto-centrado (`margin-inline: auto` + `max-width`) flotando sobre contenido full-width alineado a la izquierda es el mismatch accidental clásico.

## Asimetría (técnicas)

- Margen izquierdo ancho como espacio negativo permanente.
- Grillas offset: columnas impares más anchas (`grid-template-columns: 1.2fr 1fr 0.8fr`), o 12 columnas con spans distintos por ítem.
- Un break-out por página. Top generoso + bottom apretado (o al revés).
- **Ban:** el eyebrow/número a la IZQUIERDA del heading en la misma fila (tag-left/header-right) es el tell editorial-templated más confiable; cuando hay eyebrow (casi nunca, ver copy.md), va ARRIBA del heading en la misma columna, stack vertical.

## Profundidad

- La jerarquía se hace con **peso y escala**, no con sombra. Card con borde hairline o elevación tonal (superficie ±3% lightness + stroke del propio color de la superficie a baja opacidad) > card con drop shadow.
- Si hay sombra: UNA, chica, direccional, tinteada a la superficie (nunca bloom negro parejo en todos los lados, nunca glow de color sobre fondo claro, nunca sombra sobre dark).
- Nada de card-en-card. Un solo nivel de contención.
- Z-index con escala nombrada de 6 niveles; nunca `z-index: 9999`.

## Ejecución (los misses que pols caza)

- **Nada queda mal centrado.** Un número flotando alto en su círculo, un glifo bajo en su tile: verificar centrado matemático Y óptico, no asumirlo. En SVG: `text-anchor: middle` + `dominant-baseline: central` (o `dy` medido).
- **Clear the cut:** todo `clip-path`, notch, `overflow: hidden` o altura fija se verifica píxel a píxel en su borde: ninguna cap cortada, ningún descender comido. El chaflán de dark-técnico incluye el padding que mantiene el contenido entero.
- **Texto nunca pegado al borde** del viewport o contenedor; gutter deliberado y consistente en todos los bloques.
- Contenido que cruza un overlap de secciones no se guillotina en la costura.
- El hero es dueño del primer viewport: o llena el fold o controla exactamente qué asoma abajo; nunca media sección colada sin alinear.
- Hero: `min-h-[100dvh]` si va full, nunca `h-screen` (barra de iOS). Contenido esencial (headline+lede+CTA) visible sin scroll a 1280×800. Padding-top del hero con tope (~6rem): más que eso y el contenido flota como bug.

## Page-edge clipping

Todo elemento que desborda a propósito (marquee full-bleed, headline oversized, figura inclinada) requiere clip global:

```css
html, body { overflow-x: clip; }  /* clip, no hidden: preserva sticky/fixed */
```

Grids con imágenes: tracks `minmax(0, 1fr)`, nunca `1fr` pelado (el mínimo `auto` de una imagen de 1024px rompe el layout en móvil).

## Cuando el layout está bien pero plano

Antes de shippear, una de estas: (1) agregar un break-out, (2) desbalancear un ancho de columna, (3) sacar el CTA primario del centro, (4) reemplazar una card por espacio negativo, (5) variar el padding de UNA sección para que el ritmo sea desparejo.
