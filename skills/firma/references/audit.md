# Audit — cacería de tells en UI existente

Para los verbos `audit` y `redesign`. Leer el target completo (markup + CSS + render si hay browser), identificar violaciones CONCRETAS (no matches de keyword), reportar rankeado. En `redesign`: audit primero, tocar después, preservando IA de contenido, rutas, slugs, labels del nav, campos de formularios (analytics/autofill), logo y copy legal. Nada de eso cambia sin aprobación explícita.

## Formato de reporte

```
[critical|major|minor] Nombre del tell — archivo:línea
  por qué es un tell (una línea)
  → fix (una línea)

Resumen — N critical · M major · K minor
Veredicto — [se shippea como slop | lee como IA | cerca, arreglar los minor]
```

## Critical (shippea como slop)

- Hero con gradiente purple/mesh o aurora blobs; gradient-text en headline.
- Inter/Roboto como única familia; single-font sin intención.
- Grilla de 3 features idénticas icono-arriba; cards flotantes clonadas con la misma sombra.
- `#000`/`#fff` puros; grises sin tintear; el dark azul-carbón default; el beige+brass premium default.
- Métricas/testimonios/logos inventados (además de tell, riesgo SERNAC).
- Chrome redibujado (fake browser/phone/terminal con traffic-light dots); screenshots de divs.
- Voseo argentino en el copy; em-dashes regados.
- Contenido invisible sin JS (reveal que no dispara = sección en blanco).
- Texto ilegible por contraste (botón con texto ≈ fill; sección oscura con ink oscuro).
- Nav y footer con el fingerprint IA exacto (wordmark+links+botón / 4 columnas+social).

## Major (lee como IA)

- Eyebrow mono-caps arriba de cada sección; eyebrow al lado del heading; labels numerados (`01 / FEATURES`).
- Todo centrado sección tras sección; hero `100vh` con una frase.
- El stack de hero default con panel a la derecha; par fill+outline; CTAs duplicados en intención.
- Itálicas de énfasis en headings.
- Orbes de glow; grilla de fondo con máscara radial; glow radial simétrico detrás del objeto hero; inner-glow en badges; dot pulsante de "live".
- Sombra pareja en todo; hover-lift+shadow+border-glow bolted en cada card; hover-boop en botones; underline que crece.
- Fade-up-on-scroll en cada sección; parallax decorativo; loops infinitos no funcionales; más de un marquee.
- Icono en tile de color; emoji como icono; dos librerías de iconos mezcladas; iconos de pack redibujados a mano "para que parezcan custom".
- Glass con banding/leak/pop; grain SOBRE el contenido en vez de detrás.
- Pills tinteados en cada metadata; countdown fake; version labels en hero; scroll cues; strips de locale/clima; créditos de foto decorativos; texto rotado 90°.
- Kicker+serif-H2 en cada sección; statement serif con palabra en itálica; isla-CTA con form pill; el mismo kit de secciones reciclado del build anterior (recycling del house style).

## Minor (detalles de gusto)

- Comillas rectas; `...` en vez de `…`; doble espacio.
- "Juan Pérez"/"Jane Doe"; Acme/Nexus como nombres.
- `z-index: 9999`; paddings fuera de escala; secciones todas con el mismo padding.
- `width: 100vw`; middle-dots en cadena; tabular data sin `tabular-nums`.

## Defectos de ejecución (buscar activamente, son los que más se escapan)

1. **Centrado fallido:** contenido que debía quedar centrado en su caja/círculo/pill y quedó corrido. Verificar matemática Y ópticamente.
2. **Whitespace huérfano / grid mal alineado:** gap muerto bajo el h1 (`align-items: center` con columna vecina alta), columnas de pricing desfasadas (botones a alturas distintas), head centrado sobre body left-flush.
3. **Contenido cortado:** caps rebanadas por un clip/notch/overflow/altura fija; descenders comidos; wordmark gigante del footer clipeado o sin alinear.
4. **Texto pegado al borde** sin gutter.
5. **CTA/nav que wrappea a 2 líneas**; nav de 2 líneas en desktop.
6. **Scroll horizontal** en algún ancho 320-1920.
7. **Costuras de color:** glow/scrim que muere seco en el borde de sección; imagen full-bleed con seam duro contra el fondo.
8. **Controles muertos:** tabs/accordions/toggles que no responden. Probar con click real si hay browser.
9. **Display type asfixiado:** tracking negativo hasta que los glifos se tocan; separadores enterrados.
10. **Sticky que se pisa:** elemento sticky interno a `top: 0` pintando sobre el nav.

## Priorización del redesign (orden de palanca)

1. Tipografía (el lift visual más grande por unidad de riesgo).
2. Espaciado y ritmo vertical.
3. Recalibración de color (desaturar, unificar neutrales tinteados, un acento).
4. Capa de motion apropiada.
5. Recomposición de hero y secciones clave.
6. Reemplazo total de un bloque, solo si es insalvable.

Parar cuando el brief está satisfecho. Si IA de contenido + SEO están sanos, evolución dirigida (pasos 1-4) da ~70% del valor con ~40% del riesgo; el rebuild total se reserva para deuda estructural real y siempre con aprobación.
