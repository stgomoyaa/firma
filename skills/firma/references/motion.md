# Motion

El motion IA es disperso: hover-lift en cada card, fade-in en cada scroll, íconos que rebotan. Acá se calla. **Un momento orquestado vale más que diez efectos chicos.** Pero ojo con el otro extremo: una página muerta también es un fail. Calmo sí; muerto no.

## Principios

- **Animar solo `transform` y `opacity`.** GPU-composited, sin layout. Nunca `width/height/top/left/margin/padding`.
- **Duración en 3 buckets:** micro 100-150ms, corto 200-300ms, largo 300-500ms. Exits al ~75% del enter.
- **Motion motivado.** Toda animación responde en una frase a "¿qué comunica?" (jerarquía / feedback / transición de estado / narrativa). "Se veía cool" no es respuesta; se corta.
- `prefers-reduced-motion: reduce` colapsa todo movimiento espacial a crossfade ≤150ms. No opcional.

## Easings y duraciones (tokens, nunca `ease` del browser)

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* entra  */
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);   /* sale   */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* toggle */
  --dur-micro: 120ms; --dur-corto: 220ms; --dur-largo: 420ms;
}
```

## UNA entrada orquestada (y ninguna más)

Una sola secuencia al cargar, stagger por índice DOM vía custom property, total ≤500ms. Después de eso, el contenido simplemente ESTÁ. Nada de fade-up-on-scroll en cada sección.

```css
.reveal { opacity: 0; transform: translateY(8px);
  animation: reveal var(--dur-largo) var(--ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 60ms); }
@keyframes reveal { to { opacity: 1; transform: none; } }
```

**Regla absoluta (de pols): el contenido es visible por defecto.** Nunca depender de que un JS/observer/timeline dispare el reveal para que el texto exista: si no dispara (tab en background, hydration, screenshot), la sección queda EN BLANCO. El fallback sin JS muestra todo. Si no se puede garantizar, no se esconde.

Scroll: IntersectionObserver o CSS scroll-driven, jamás `addEventListener('scroll')`. Solo reveal-once; parallax y scroll-scrub solo con razón específica.

## El ticker CSS (la firma dark-técnica canónica)

Un ticker/marquee horizontal de datos es una firma legítima cuando el contenido es REAL (métricas del negocio, servicios soportados, países, precios). **Máximo UNO por página**; dos marquees = relleno flojo.

```css
.ticker { overflow: hidden; white-space: nowrap;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.ticker__track { display: inline-flex; gap: var(--space-xl);
  animation: ticker 32s linear infinite; }          /* linear ES correcto en loops funcionales */
.ticker__track:hover { animation-play-state: paused; }  /* WCAG 2.2.2 */
@keyframes ticker { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .ticker__track { animation: none; } }
```

Estructura: duplicar el contenido del track (dos copias) para el loop perfecto con `translateX(-50%)`. El fade en los bordes con `mask-image` evita el corte seco. Contenido separado por un glifo del sistema (▪ / · racionado / número), no por emoji.

Si se anima un fill/barra: animar clip o transform con caps estables, llenar el track COMPLETO, easing suave. Un fill a medias o con caps que saltan de recto a redondeado grita slop.

## Estados

- Botón: hover = shift de color o fill, `:active` = `translateY(1px)` o `scale(0.98)`. **El hover-boop (botón que salta o escala al hover) está vetado**; los botones no se mueven al hover.
- Underline que crece/viaja al hover: vetado (tic de template). Cambio de estado limpio y quieto.
- Menú/tooltip: corto, `--ease-out` al abrir, `--ease-in` al cerrar. Tooltip: delay 800ms en hover, 0ms en focus.
- Modal: largo, scale 0.96→1 + crossfade. Accordion: `grid-template-rows: 0fr→1fr`, nunca `height`.
- Focus ring: instantáneo SIEMPRE, jamás transicionado.
- Éxito silencioso > toast celebratorio. Optimistic + Undo > diálogo de confirmación (modal solo para lo irreversible).
- Carousel/auto-rotación: pause en hover Y focus, o no autoplay.

## Bans

`transition: all` · bounce/elastic/overshoot en UI · más de un efecto de hover simultáneo en un elemento · parallax decorativo · cursores custom · cursor-follower dots · loops infinitos que no sean funcionales (ticker/loader) · `will-change` preventivo en clases enteras · hover-scale uniforme en todas las cards · animación de gradiente en hover · glow pulsante en dots de "live".
