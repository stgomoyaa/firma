# Color

La UI generada por IA falla primero en color: elige azul, usa negro puro, dibuja un gradiente purple-cyan, riega el acento por el 30% de la página. Todo eso se corrige acá.

## Principios

- **OKLCH en todo.** Perceptualmente uniforme; `hsl()` y `rgb()` mienten sobre el brillo.
- **Un acento.** Máximo dos. Todo lo demás es neutral. El acento ocupa **≤5% de cualquier viewport** (contar por área: fills sólidos, headings en acento, fondos).
- **Sin extremos puros.** Nada de `#000` ni `#fff`. Siempre tintear hacia el hue ancla.
- **Grises tinteados.** Ancla cálida → neutrales cálidos; ancla fría → fríos. Chroma mínima 0.005 en todo neutral. Un gris plano (`chroma 0`) lee a wireframe.

## Construcción de paleta (motor para temas custom)

Cuatro capas, todas tinteadas al mismo hue ancla:

1. **Paper** — superficie base. Light: `oklch(95-98% 0.005-0.015 <hue>)`. Dark: `oklch(12-18% 0.008-0.02 <hue>)`.
2. **Ink** — texto primario. Light: `oklch(16-24% 0.005-0.02 <hue>)`. Dark: `oklch(92-96% 0.005-0.01 <hue>)`.
3. **Neutrales** — 5-9 pasos entre paper e ink, todos con la tinta del ancla (0.005-0.015).
4. **Acento** — un color saturado (chroma 0.12-0.22). Links, estados activos, focus, highlights. Nunca fondo de secciones enteras.

```css
:root {
  --color-paper:   oklch(96% 0.012 80);
  --color-paper-2: oklch(93% 0.014 80);
  --color-borde:   oklch(82% 0.010 80);
  --color-neutral: oklch(56% 0.008 80);
  --color-muted:   oklch(40% 0.008 70);
  --color-ink:     oklch(18% 0.010 60);
  --color-acento:  oklch(62% 0.20 40);
  --color-focus:   oklch(55% 0.19 55);
}
```

## Receta dark mode (y de temas dark)

- Paper lightness 12-18%, nunca `#000`. Ink 92-96%, nunca `#fff`.
- Body font-weight baja 50 unidades (400 → 350) para compensar el peso óptico de texto claro sobre oscuro.
- Acento: -0.02/-0.04 de chroma, +5-10% de lightness respecto al modo claro.
- **Elevación = superficies más CLARAS** (+3% lightness por nivel), no sombras. Sombra sobre dark crea glow accidental.
- El hue ancla no cambia entre modos; solo lightness y chroma.
- **Prohibido el dark-slop default:** el azul-carbón/slate-índigo (`#0c0e15` y familia) con acento lila es el gemelo nocturno del gradiente purple. Un dark no tiene por qué ser azul: cálido, verde-negro, carbón cálido, oxblood-negro. Elegido, no defaulteado.

## Contraste (gates 40-41)

| Contenido | Mínimo WCAG | Target |
| --- | --- | --- |
| Body text | 4.5:1 | 7:1 |
| Texto grande (≥24px o ≥18px bold), iconos, focus rings | 3:1 | 4.5:1 |

Chequeo rápido en OKLCH: si `|L_texto − L_fondo| < 50%`, probablemente falla; confirmar. Los que más se escapan: texto que hereda `color` dentro de una card que cambió a `paper-2`; botón con texto ≈ fill (negro sobre negro: el modelo olvidó `--color-acento-ink`); sección oscura cuyo interior sigue con ink oscuro. Toda regla que setea `background` oscuro setea `color` claro en la misma regla.

## Paletas vetadas como default

- **Purple-to-cyan / purple-to-blue / mesh gradients / aurora blobs.** El fingerprint IA número 1.
- **Beige+brass premium:** crema/hueso (`#f5f1ea` y familia) + latón/arcilla/ocre + espresso para cualquier brief "premium/artesanal". Es EL default LLM de consumo premium. Alternativas: lujo frío (plata/humo), forest (verde profundo + hueso + ámbar), negro + tan, cobalto + crema, terracota + slate, monocromo + un pop saturado.
- **Crema "editorial" como reflejo.** Elegir cream es el nuevo elegir gradiente purple; válido solo elegido con argumento.
- **El gris de UI-kit** (gray-100/200, `#f3f4f6`) como banda de footer o superficie: wireframe en su default.
- **Gradientes de 3+ stops** y gradientes animados en hover.

## Uso del acento

Es un destacador, no un bloque: nav activo, focus ring, underline en hover, borde/texto del CTA primario, un cuadrado chico junto a un heading. No llenar botones gigantes con él, no secciones enteras, no glow. En dark-técnico el acento fosforescente sigue la misma regla del ≤5%: brilla porque es escaso. Si dan ganas de usar más acento, esa es la señal de usar menos.

Regla de continuidad (de pols): las secciones se resuelven una en la otra, sin costuras duras de color; un corte duro deliberado por página como máximo (ej. el footer bajando a su propio piso). Y un solo acento por página, lockeado: un sitio gris-cálido no recibe un CTA azul en la sección 7.
