# Themes — copy-paste OKLCH catalogue

Twelve named themes, built with the engine in `color.md`. Each declares its **3 diversification axes** (paper band · display style · accent hue); two consecutive themes must differ on at least one axis (the rule from step 3 of `SKILL.md`). The blocks are copied straight into `:root` and completed with intermediate neutrals per the engine.

Provenance: the construction engine comes from hallmark (MIT); all twelve themes are built with that recipe, with original values and verified contrast. If the brief brings a brand colour, build a custom theme with `color.md` instead of forcing one from the catalogue.

A theme also suggests fonts (see `typography.md` for alternatives within the same direction, and remember the display-face rotation).

---

## Dark-technical (the default when the content is technical)

### 1 · Slate — high-contrast warm dark, chamfer and ticker

Axes: **dark · grotesk · warm (amber 75°)**. The dark-technical flagship: warm carbon (not blue slate), a scarce amber-phosphor accent, chamfered geometry (`clip-path: polygon(...)` cutting ONE corner of cards and CTAs as the signature), ONE CSS ticker of real data. Display: rotate between **Tomorrow** (700) and **Switzer** (700); body Switzer 400; mono JetBrains Mono. Space Grotesk stays out of the default slot through saturation (see `typography.md`).

```css
:root {
  --color-paper:   oklch(16% 0.012 60);
  --color-paper-2: oklch(20% 0.014 60);
  --color-paper-3: oklch(24% 0.014 60);
  --color-border:  oklch(32% 0.012 60);
  --color-neutral: oklch(62% 0.010 65);
  --color-muted:   oklch(74% 0.008 70);
  --color-ink:     oklch(94% 0.006 80);
  --color-accent:  oklch(80% 0.155 75);   /* amber phosphor */
  --color-focus:   oklch(80% 0.155 75);
}
```

### 2 · Phosphor — green terminal on green-black

Axes: **dark · mono · green (145°)**. An honest terminal: mono as display AND body (the one permitted single-font exception), phosphor green only in the prompt, states and links. No fake window chrome: a `<pre>` framed typographically (rule above, label, rule below). JetBrains Mono or Commit Mono.

```css
:root {
  --color-paper:   oklch(15% 0.015 150);
  --color-paper-2: oklch(19% 0.018 150);
  --color-border:  oklch(30% 0.02 150);
  --color-neutral: oklch(60% 0.02 148);
  --color-muted:   oklch(72% 0.015 148);
  --color-ink:     oklch(93% 0.01 145);
  --color-accent:  oklch(80% 0.17 145);   /* phosphor */
  --color-focus:   oklch(80% 0.17 145);
}
```

### 3 · Press — brutal dark, heavy display, red-orange accent

Axes: **dark · condensed-heavy · warm (30°)**. Neutral-warm carbon, Anton/Tanker/Bricolage 800 as display, thick rules (2-3px) instead of hairlines, a red-orange accent as the stamp. For technical manifestos and products with an opinion.

```css
:root {
  --color-paper:   oklch(14% 0.008 40);
  --color-paper-2: oklch(18% 0.010 40);
  --color-border:  oklch(34% 0.010 40);
  --color-neutral: oklch(60% 0.008 40);
  --color-muted:   oklch(73% 0.006 40);
  --color-ink:     oklch(95% 0.005 60);
  --color-accent:  oklch(62% 0.20 30);
  --color-focus:   oklch(68% 0.19 40);
}
```

### 4 · Forest — deep green dark plus bone and amber

Axes: **dark · high-contrast serif or grotesk · green-other (160°) with a secondary amber**. The "premium without beige" theme: deep forest green, bone text, minimal amber. For brands asking for premium or heritage without falling into the vetoed cream+brass palette. Display Sentient or Cabinet Grotesk.

```css
:root {
  --color-paper:   oklch(19% 0.025 160);
  --color-paper-2: oklch(23% 0.028 160);
  --color-border:  oklch(34% 0.025 160);
  --color-neutral: oklch(62% 0.02 155);
  --color-muted:   oklch(75% 0.015 130);
  --color-ink:     oklch(94% 0.012 95);   /* bone */
  --color-accent:  oklch(75% 0.13 80);    /* amber */
  --color-focus:   oklch(75% 0.13 80);
}
```

---

## Editorial lights

### 5 · Paper — warm editorial, serif, burgundy

Axes: **light · high-contrast serif · warm (25°)**. The canonical editorial-sober: warm tinted paper, Newsreader or EB Garamond display, hairlines, radius 0. A scarce burgundy accent.

```css
:root {
  --color-paper:   oklch(96% 0.010 85);
  --color-paper-2: oklch(93% 0.012 85);
  --color-border:  oklch(83% 0.010 85);
  --color-neutral: oklch(52% 0.010 70);
  --color-muted:   oklch(40% 0.010 60);
  --color-ink:     oklch(20% 0.012 50);
  --color-accent:  oklch(45% 0.15 25);    /* burgundy */
  --color-focus:   oklch(50% 0.16 30);
}
```

### 6 · Newsprint — cool light, roman serif, signal red

Axes: **light · classical serif · warm (28°)**. Masthead, dense columns, frequent fine rules, a newspaper red. EB Garamond or Cardo display, IBM Plex Sans body.

```css
:root {
  --color-paper:   oklch(97% 0.005 250);
  --color-paper-2: oklch(94% 0.006 250);
  --color-border:  oklch(80% 0.006 250);
  --color-neutral: oklch(48% 0.008 255);
  --color-muted:   oklch(38% 0.008 255);
  --color-ink:     oklch(19% 0.010 260);
  --color-accent:  oklch(55% 0.21 28);
  --color-focus:   oklch(55% 0.21 28);
}
```

### 7 · Cobalt — technical light with a graphite band

Axes: **light · grotesk · cool (256°)**. Cool engineering paper, electric cobalt as signal (never flood), ONE dark graphite band per page (quickstart or demo) giving a light → dark → light rhythm. Display Tomorrow or Switzer plus mono.

```css
:root {
  --color-paper:        oklch(97% 0.008 254);
  --color-paper-2:      oklch(94% 0.010 254);
  --color-border:       oklch(84% 0.012 254);
  --color-neutral:      oklch(52% 0.016 256);
  --color-muted:        oklch(38% 0.020 257);
  --color-ink:          oklch(21% 0.024 258);
  --color-accent:       oklch(55% 0.19 258);   /* electric cobalt */
  --color-graphite:     oklch(20% 0.018 260);  /* the dark band */
  --color-accent-dark:  oklch(68% 0.16 256);   /* the accent INSIDE the band */
  --color-focus:        oklch(55% 0.19 258);
}
```

Verified contrast (WCAG, against paper): ink 16.3:1 · muted 9.2:1 · neutral 5.1:1 · accent 4.6:1. Inside the graphite band: paper 16.6:1 · `--color-accent-dark` 6.2:1. The normal accent on graphite gives 3.6:1 and **is not usable for text**: inside the band use `--color-accent-dark`, which is the engine's dark-mode rule (more lightness, less chroma) applied to one section. `--color-border` gives 1.5:1 and is for hairlines only, never for text or meaningful icons.

### 8 · Terracotta — warm light plus slate, no brass

Axes: **light · grotesk or soft serif · warm (40°)**. Warm premium that dodges beige+brass: a barely warm light base, terracotta against slate greys. Familjen Grotesk or Sentient.

```css
:root {
  --color-paper:   oklch(95% 0.012 55);
  --color-paper-2: oklch(92% 0.014 55);
  --color-border:  oklch(80% 0.012 55);
  --color-neutral: oklch(50% 0.015 250);  /* deliberately cool slate: the terracotta/slate pair IS the theme */
  --color-muted:   oklch(40% 0.015 250);
  --color-ink:     oklch(22% 0.015 45);
  --color-accent:  oklch(58% 0.16 40);    /* terracotta */
  --color-focus:   oklch(58% 0.16 40);
}
```

---

## Mid and special

### 9 · Smoke — MID paper (the band nobody uses), heavy display

Axes: **mid · condensed-heavy · neutral/ink**. Warm mid grey as the base (rare, therefore distinctive), typography as the only colour, accent = a deeper ink. Big Shoulders or Anton display.

```css
:root {
  --color-paper:   oklch(87% 0.008 70);
  --color-paper-2: oklch(83% 0.009 70);
  --color-border:  oklch(70% 0.008 70);
  --color-neutral: oklch(45% 0.008 65);
  --color-muted:   oklch(35% 0.008 65);
  --color-ink:     oklch(17% 0.010 60);
  --color-accent:  oklch(17% 0.010 60);   /* the ink IS the accent */
  --color-focus:   oklch(50% 0.15 60);
}
```

### 10 · Mono+Pop — off-white/off-black plus ONE electric accent

Axes: **light · grotesk · the pop hue rotates per build** (emerald 150° / electric blue 250° / pink 350°; never the same on two consecutive builds). General Sans or Geist.

```css
:root {
  --color-paper:   oklch(97% 0.005 260);
  --color-paper-2: oklch(94% 0.005 260);
  --color-border:  oklch(84% 0.005 260);
  --color-neutral: oklch(50% 0.006 260);
  --color-muted:   oklch(38% 0.006 260);
  --color-ink:     oklch(18% 0.008 260);
  --color-accent:  oklch(60% 0.21 150);   /* rotate the hue per build */
  --color-focus:   oklch(60% 0.21 150);
}
```

### 11 · Riso — light with overprinted blue ink, print texture

Axes: **light · distressed serif or riso-bold · cool (262°)**. Barely warm paper, a risograph blue as the only emphasis ink, subtle grain BEHIND the content, minimal off-register as the signature. Erode or Bricolage display, Space Mono as the outlier.

```css
:root {
  --color-paper:   oklch(96% 0.012 90);
  --color-paper-2: oklch(93% 0.014 90);
  --color-border:  oklch(82% 0.012 90);
  --color-neutral: oklch(50% 0.010 80);
  --color-muted:   oklch(40% 0.010 80);
  --color-ink:     oklch(22% 0.012 70);
  --color-accent:  oklch(50% 0.16 262);   /* riso blue */
  --color-focus:   oklch(50% 0.16 262);
}
```

### 12 · Olive — mid-light muted green plus brick

Axes: **mid-light · humanist or serif · warm (30°) over a green base**. Desaturated olive as the surface, brick as the accent. Warm without cream. Satoshi or Familjen Grotesk.

```css
:root {
  --color-paper:   oklch(91% 0.02 110);
  --color-paper-2: oklch(88% 0.022 110);
  --color-border:  oklch(76% 0.02 110);
  --color-neutral: oklch(48% 0.02 105);
  --color-muted:   oklch(38% 0.018 100);
  --color-ink:     oklch(21% 0.015 90);
  --color-accent:  oklch(52% 0.15 30);    /* brick */
  --color-focus:   oklch(52% 0.15 30);
}
```

---

## How to choose

1. Read the log (`.firma/log.json`): the new theme differs from the previous one on ≥1 axis. Name the candidate and its 3 axes out loud; if 2 of 3 match the previous build, pick something more distant.
2. The direction scopes the subset: dark-técnico rotates 1-4; editorial-sober rotates 5, 6, 9, 11; minimal-modern rotates 7, 10; warm-playful rotates 8, 12 (plus custom variants).
3. A brief with a brand colour or a multi-attribute vibe: build a custom theme with the engine in `color.md`, and log its axes exactly like a catalogue theme.
4. Fill in any missing neutral steps with the engine. **Every value lives in the token block**, never inline.
