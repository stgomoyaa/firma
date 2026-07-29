# Tipografía

La tipografía carga el diseño. Si el tipo está mal, nada más importa.

## Principios

- Una página es un **pairing**: display face + body face. Una sola familia solo cuando esa ES la decisión (terminal monospace-everywhere a propósito).
- **Regla 2+1:** máximo tres familias. Display + body + un outlier opcional (wordmark, stat del hero, pull quote) usado en ≤2 lugares de toda la página. Cuatro familias = slop. Mono cuenta como familia.
- **Pesos a los extremos.** 800 junto a 400 lee intencional; 600 junto a 400 lee default. Contraste mínimo de 300 unidades entre heading y body.
- Escala por ratio (1.25 major third default), máximo 5 tamaños por página; más jerarquía se logra con peso y color.
- Line-height: display 1.05-1.2 (piso 1.0 en all-caps o chocan las cap-tops al wrappear), body 1.5-1.65. Measure 45-75ch (`max-width: 65ch`).
- `font-display: swap`, `font-variant-numeric: tabular-nums` en toda columna de números, comillas curvas, `…` real. Nunca sintetizar bold/italic.

## Prohibidas como default (on-distribution de todo LLM)

- **Sans:** Inter, Roboto, Open Sans, Lato, Poppins, Nunito, Montserrat, Raleway, Work Sans, DM Sans, Sora, Syne, Archivo, Figtree, Gabarito, system-ui como único stack.
- **Serif (vetadas como default):** **Fraunces**, **Instrument Serif** (las dos favoritas de la IA), Playfair Display, Cormorant Garamond, Lora, Merriweather, y los didones (Bodoni/Didot) como reflejo de "lujo".
- **Mono:** Courier New, Consolas default, mono del sistema como voz de marca.
- **Grotescas saturadas:** **Space Grotesk** y **Geist** salen del slot default. Space Grotesk se volvió la "alternativa tasteful" de todo lo técnico y los linters deterministas ya la marcan junto a Inter; queda disponible solo por rotación explícita, nunca como primer pick de un tema.

Excepciones: si el usuario la pide por nombre, se usa. Inter Tight solo como body de apoyo en temas técnicos, nunca display. Una serif vetada puede usarse si hay justificación de marca explícita, nunca por reflejo.

**Las serifs en general SÍ están permitidas** y suman personalidad. El veto es a las dos que todo LLM elige, no a la categoría.

## Catálogo (gratis: Google Fonts + Fontshare)

### Display

| Familia | Fuente | Voz | Para |
| --- | --- | --- | --- |
| **Newsreader** | Google | Serif romana con optical-size | Editorial, longform |
| **EB Garamond** | Google | Clásica honesta | Editorial, lectura lenta |
| **Cardo** | Google | Serif académica | Referencia, slow reading |
| **DM Serif Display** | Google | Serif bracketed de alto contraste | Headlines "impresos" |
| **Sentient** | Fontshare | Serif variable de contraste suave | Editorial soft, atmosférico |
| **Erode** | Fontshare | Serif distressed, hand-set | Riso, táctil, brand-y |
| **Bricolage Grotesque** | Google | Sans display variable, pesos brutos | Brutal, playful, personalidad |
| **Space Grotesk** | Google | Grotesca geométrica con quirk | Solo por rotación explícita, ver veto abajo |
| **Familjen Grotesk** | Google | Grotesca cálida con carácter | Editorial-sans, producto con voz |
| **Cabinet Grotesk** | Fontshare | Grotesca display, 9 pesos | Editorial display, magazine |
| **General Sans** | Fontshare | Grotesca moderna | Minimal-moderno |
| **Clash Display** | Fontshare | Ultra-condensada | Posters, momentos de marca |
| **Tanker** | Fontshare | Condensada pesada pura display | Mastheads de una palabra |
| **Anton** | Google | Condensada industrial | Manifiestos |
| **Big Shoulders Display** | Google | Condensada industrial | Declarativo, sport |
| **Tomorrow** | Google | Condensada variable near-future | Dark-técnico |
| **Satoshi** | Fontshare | Geométrica juguetona | Cálido-playful |
| **Geist** | Google | Grotesca moderna neutra | Minimal-moderno, body-grade |

### Body

Geist · Switzer (Fontshare) · General Sans · IBM Plex Sans · Newsreader · Source Serif 4 · EB Garamond · Spectral · Crimson Pro · Satoshi.

### Mono / outlier

Geist Mono · JetBrains Mono · IBM Plex Mono · Commit Mono · Space Mono (retro-quirk).

## Pairings por dirección

| Dirección | Display | Body | Outlier |
| --- | --- | --- | --- |
| **editorial-sobrio** | Newsreader · EB Garamond · Cabinet Grotesk · Familjen Grotesk · Erode | Switzer · IBM Plex Sans · Source Serif 4 | JetBrains Mono · Geist Mono |
| **dark-técnico** | Tomorrow (700) · Switzer (700) · JetBrains Mono · Commit Mono | Geist · IBM Plex Sans | mono de la display o Cabinet (wordmark) |
| **minimal-moderno** | Geist (700) · General Sans · Familjen Grotesk | Geist · Switzer | Geist Mono |
| **cálido-playful** | Bricolage Grotesque · Satoshi · Sentient | Satoshi · Geist · Crimson Pro | Space Mono |
| **brutal / poster** | Bricolage (800) · Anton · Tanker · Big Shoulders | Geist · Switzer | Space Grotesk (numerales) |
| **lujo deliberado** | Cardo · DM Serif Display · Sentient | EB Garamond · Crimson Pro | small caps de la display |

## Rotación (obligatoria)

La display face **no se repite entre builds consecutivos** (leer `.firma/log.json`, campo `display`). Un house pairing repetido en briefs distintos es un tell en sí mismo, aunque cada face sea buena. Elegir por el brief, no por reputación: "la alternativa tasteful conocida" (Space Grotesk en todo lo técnico, Bricolage en todo lo playful) usada siempre también se vuelve slop. Si el proyecto amerita firma real y hay presupuesto, proponer fuente licenciada (Söhne, GT America, Tiempos, familias Klim); nunca nombrar una paga en código sin confirmar licencia.

## Hero headline

- Escribiéndolo tú: ≤7 palabras y ≤50 caracteres. Imperativo o frase nominal, nunca gerundio de apertura.
- Tamaño según largo: ≤50 chars → `--text-display` (clamp con techo 5.25-6rem); 51-90 → un escalón menos; >90 → reescribir más corto.
- Display headings con `overflow-wrap: anywhere; min-width: 0` (palabras largas compuestas rompen el viewport móvil).
- Headline en 1-2 líneas máximo. Tres o más líneas apiladas = escalera sin composición.

## Wordmark

Puede (y en temas con carácter, debe) usar una familia distinta al body; es el registro tipográfico que dice "esto es una marca". Una página Geist-only con wordmark Geist 600 lee sin diseñar.

## Bans finales

- Gradient-text en headings (`background-clip: text`).
- Itálicas en headings o display (regla dura #4 de SKILL.md). Roman siempre; énfasis por peso/color/underline.
- All-caps en párrafos. Letter-spacing >0.05em en body. Body <16px.
- Em-dash (`—`) en cualquier texto visible (regla dura #3). Punto, coma, dos puntos, paréntesis; rangos con guion.
- El outlier en más de 2 slots.
