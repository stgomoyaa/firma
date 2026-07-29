# Temas — catálogo OKLCH copiable

Doce temas nombrados, construidos con el motor de `color.md`. Cada uno declara sus **3 ejes de diversificación** (banda de paper · estilo de display · hue de acento); dos temas consecutivos deben diferir en al menos un eje (regla del paso 3 de SKILL.md). Los bloques se copian tal cual a `:root` y se completan con neutrales intermedios según el motor.

Procedencia: el motor de construcción viene de hallmark (MIT); los doce temas están construidos con esa receta, con valores propios y contraste verificado. Si el brief trae color de marca, construir un custom con `color.md` en vez de forzar un tema del catálogo.

Un tema también sugiere fuentes (ver `tipografia.md` para alternativas dentro de la misma dirección; recordar la rotación de display face).

---

## Dark-técnicos (el default cuando el contenido es técnico)

### 1 · Pizarra — dark cálido de alto contraste, chaflán y ticker

Ejes: **dark · grotesk · cálido (ámbar 75°)**. El flagship dark-técnico: carbón cálido (no azul-slate), acento ámbar-fósforo escaso, geometría con chaflán (`clip-path: polygon(...)` cortando UNA esquina de cards/CTAs como firma), UN ticker CSS de datos reales. Display: rotar entre **Tomorrow** (700) y **Switzer** (700); body Switzer 400; mono JetBrains Mono. Space Grotesk queda fuera del slot default por saturación (ver `tipografia.md`).

```css
:root {
  --color-paper:   oklch(16% 0.012 60);
  --color-paper-2: oklch(20% 0.014 60);
  --color-paper-3: oklch(24% 0.014 60);
  --color-borde:   oklch(32% 0.012 60);
  --color-neutral: oklch(62% 0.010 65);
  --color-muted:   oklch(74% 0.008 70);
  --color-ink:     oklch(94% 0.006 80);
  --color-acento:  oklch(80% 0.155 75);   /* ámbar fósforo */
  --color-focus:   oklch(80% 0.155 75);
}
```

### 2 · Fósforo — terminal verde sobre verde-negro

Ejes: **dark · mono · verde (145°)**. Terminal honesto: mono como display Y body (la única excepción single-font permitida), verde fosforescente solo en prompt, estados y links. Sin fake window chrome: `<pre>` con marco tipográfico (regla arriba + label + regla abajo). JetBrains Mono o Commit Mono.

```css
:root {
  --color-paper:   oklch(15% 0.015 150);
  --color-paper-2: oklch(19% 0.018 150);
  --color-borde:   oklch(30% 0.02 150);
  --color-neutral: oklch(60% 0.02 148);
  --color-muted:   oklch(72% 0.015 148);
  --color-ink:     oklch(93% 0.01 145);
  --color-acento:  oklch(80% 0.17 145);   /* fósforo */
  --color-focus:   oklch(80% 0.17 145);
}
```

### 3 · Tinta — dark brutal, display pesada, acento rojo-naranja

Ejes: **dark · condensed-heavy · cálido (30°)**. Carbón neutro-cálido, Anton/Tanker/Bricolage 800 en display, rules gruesas (2-3px) en vez de hairlines, acento rojo-naranja como sello. Para manifiestos técnicos, productos con opinión.

```css
:root {
  --color-paper:   oklch(14% 0.008 40);
  --color-paper-2: oklch(18% 0.010 40);
  --color-borde:   oklch(34% 0.010 40);
  --color-neutral: oklch(60% 0.008 40);
  --color-muted:   oklch(73% 0.006 40);
  --color-ink:     oklch(95% 0.005 60);
  --color-acento:  oklch(62% 0.20 30);
  --color-focus:   oklch(68% 0.19 40);
}
```

### 4 · Bosque — dark verde profundo + hueso + ámbar

Ejes: **dark · serif-contraste o grotesk · verde-otro (160°) con ámbar secundario**. El "premium sin beige": verde bosque profundo, texto hueso, ámbar mínimo. Para marcas que piden premium/heritage sin caer en la paleta crema+latón vetada. Display Sentient o Cabinet Grotesk.

```css
:root {
  --color-paper:   oklch(19% 0.025 160);
  --color-paper-2: oklch(23% 0.028 160);
  --color-borde:   oklch(34% 0.025 160);
  --color-neutral: oklch(62% 0.02 155);
  --color-muted:   oklch(75% 0.015 130);
  --color-ink:     oklch(94% 0.012 95);   /* hueso */
  --color-acento:  oklch(75% 0.13 80);    /* ámbar */
  --color-focus:   oklch(75% 0.13 80);
}
```

---

## Lights editoriales

### 5 · Papel — editorial cálido, serif, burdeos

Ejes: **light · serif-contraste · cálido (25°)**. El editorial-sobrio canónico: paper cálido tinteado, Newsreader o EB Garamond display, hairlines, radius 0. Acento burdeos escaso.

```css
:root {
  --color-paper:   oklch(96% 0.010 85);
  --color-paper-2: oklch(93% 0.012 85);
  --color-borde:   oklch(83% 0.010 85);
  --color-neutral: oklch(52% 0.010 70);
  --color-muted:   oklch(40% 0.010 60);
  --color-ink:     oklch(20% 0.012 50);
  --color-acento:  oklch(45% 0.15 25);    /* burdeos */
  --color-focus:   oklch(50% 0.16 30);
}
```

### 6 · Periódico — light frío, serif romana, rojo señal

Ejes: **light · serif-clásica · cálido (28°)**. Masthead, columnas densas, rules finas frecuentes, un rojo de diario. EB Garamond o Cardo display, IBM Plex Sans body.

```css
:root {
  --color-paper:   oklch(97% 0.005 250);
  --color-paper-2: oklch(94% 0.006 250);
  --color-borde:   oklch(80% 0.006 250);
  --color-neutral: oklch(48% 0.008 255);
  --color-muted:   oklch(38% 0.008 255);
  --color-ink:     oklch(19% 0.010 260);
  --color-acento:  oklch(55% 0.21 28);
  --color-focus:   oklch(55% 0.21 28);
}
```

### 7 · Cobalto — light técnico con banda grafito

Ejes: **light · grotesk · frío (256°)**. Paper frío de ingeniería, cobalto eléctrico como señal (nunca inundación), UNA banda oscura grafito por página (quickstart/demo) que da ritmo light → dark → light. Display Tomorrow o Switzer + mono.

```css
:root {
  --color-paper:       oklch(97% 0.008 254);
  --color-paper-2:     oklch(94% 0.010 254);
  --color-borde:       oklch(84% 0.012 254);
  --color-neutral:     oklch(52% 0.016 256);
  --color-muted:       oklch(38% 0.020 257);
  --color-ink:         oklch(21% 0.024 258);
  --color-acento:      oklch(55% 0.19 258);   /* cobalto eléctrico */
  --color-grafito:     oklch(20% 0.018 260);  /* la banda dark */
  --color-acento-dark: oklch(68% 0.16 256);   /* el acento DENTRO de la banda */
  --color-focus:       oklch(55% 0.19 258);
}
```

Contraste verificado (WCAG, sobre paper): ink 16.3:1 · muted 9.2:1 · neutral 5.1:1 · acento 4.6:1. Dentro de la banda grafito: paper 16.6:1 · `--color-acento-dark` 6.2:1. El acento normal sobre grafito da 3.6:1 y **no sirve para texto**: dentro de la banda se usa `--color-acento-dark`, que es la regla de dark mode del motor (más lightness, menos chroma) aplicada a una sola sección. `--color-borde` da 1.5:1 y es solo para hairlines, nunca para texto ni íconos con significado.

### 8 · Terracota — light cálido + slate, sin latón

Ejes: **light · grotesk o serif-suave · cálido (40°)**. Premium cálido que esquiva el beige+brass: base clara apenas cálida, terracota contra grises slate. Familjen Grotesk o Sentient.

```css
:root {
  --color-paper:   oklch(95% 0.012 55);
  --color-paper-2: oklch(92% 0.014 55);
  --color-borde:   oklch(80% 0.012 55);
  --color-neutral: oklch(50% 0.015 250);  /* slate frío a propósito: el par terracota/slate ES el tema */
  --color-muted:   oklch(40% 0.015 250);
  --color-ink:     oklch(22% 0.015 45);
  --color-acento:  oklch(58% 0.16 40);    /* terracota */
  --color-focus:   oklch(58% 0.16 40);
}
```

---

## Mid y especiales

### 9 · Humo — paper MID (la banda que nadie usa), display pesada

Ejes: **mid · condensed-heavy · neutro/ink**. Gris cálido medio como base (raro = distintivo), tipografía como único color, acento = ink más profundo. Big Shoulders o Anton display.

```css
:root {
  --color-paper:   oklch(87% 0.008 70);
  --color-paper-2: oklch(83% 0.009 70);
  --color-borde:   oklch(70% 0.008 70);
  --color-neutral: oklch(45% 0.008 65);
  --color-muted:   oklch(35% 0.008 65);
  --color-ink:     oklch(17% 0.010 60);
  --color-acento:  oklch(17% 0.010 60);   /* el ink ES el acento */
  --color-focus:   oklch(50% 0.15 60);
}
```

### 10 · Monocromo+pop — off-white/off-black + UN acento eléctrico

Ejes: **light · grotesk · rota el hue del pop por build** (esmeralda 150° / azul eléctrico 250° / rosa 350°; nunca dos builds seguidos el mismo). General Sans o Geist.

```css
:root {
  --color-paper:   oklch(97% 0.005 260);
  --color-paper-2: oklch(94% 0.005 260);
  --color-borde:   oklch(84% 0.005 260);
  --color-neutral: oklch(50% 0.006 260);
  --color-muted:   oklch(38% 0.006 260);
  --color-ink:     oklch(18% 0.008 260);
  --color-acento:  oklch(60% 0.21 150);   /* rotar hue por build */
  --color-focus:   oklch(60% 0.21 150);
}
```

### 11 · Riso — light con tinta azul sobreimpresa, textura de imprenta

Ejes: **light · serif-distressed o riso-bold · frío (262°)**. Papel apenas cálido, un azul de risografía como única tinta de énfasis, grain sutil DETRÁS del contenido, off-register mínimo como firma. Erode o Bricolage display, Space Mono outlier.

```css
:root {
  --color-paper:   oklch(96% 0.012 90);
  --color-paper-2: oklch(93% 0.014 90);
  --color-borde:   oklch(82% 0.012 90);
  --color-neutral: oklch(50% 0.010 80);
  --color-muted:   oklch(40% 0.010 80);
  --color-ink:     oklch(22% 0.012 70);
  --color-acento:  oklch(50% 0.16 262);   /* azul riso */
  --color-focus:   oklch(50% 0.16 262);
}
```

### 12 · Oliva — mid-light verde apagado + ladrillo

Ejes: **mid-light · humanista o serif · cálido (30°) sobre base verde**. Oliva desaturado como superficie, ladrillo como acento. Cálido sin crema. Satoshi o Familjen Grotesk.

```css
:root {
  --color-paper:   oklch(91% 0.02 110);
  --color-paper-2: oklch(88% 0.022 110);
  --color-borde:   oklch(76% 0.02 110);
  --color-neutral: oklch(48% 0.02 105);
  --color-muted:   oklch(38% 0.018 100);
  --color-ink:     oklch(21% 0.015 90);
  --color-acento:  oklch(52% 0.15 30);    /* ladrillo */
  --color-focus:   oklch(52% 0.15 30);
}
```

---

## Cómo elegir

1. Leer el log (`.firma/log.json`): el tema nuevo difiere del anterior en ≥1 eje. Nombrar el candidato y sus 3 ejes en voz alta; si 2 de 3 coinciden con el build anterior, elegir otro más distante.
2. La dirección scopea el subconjunto: dark-técnico rota 1-4; editorial-sobrio rota 5, 6, 9, 11; minimal-moderno rota 7, 10; cálido-playful rota 8, 12 (y variantes custom).
3. Brief con color de marca o vibe multi-atributo → tema custom con el motor de `color.md`; registrar sus ejes en el log igual que un tema de catálogo.
4. Completar los pasos neutrales que falten con el motor; **todo valor vive en el bloque de tokens**, nunca inline.
