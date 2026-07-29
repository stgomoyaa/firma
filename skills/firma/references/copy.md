# Copy

Las palabras son parte del diseño. Layout brillante con copy stock lee genérico; copy apretado en layout promedio lee considerado.

## Español neutro chileno con TÚ (regla dura #1)

Todo texto visible al usuario final va en **español neutro chileno, tuteo**. Ni voseo argentino, ni "usted", ni mexicanismos/argentinismos de registro.

| Prohibido (voseo) | Correcto (tú) |
| --- | --- |
| vos | tú |
| tenés | tienes |
| querés | quieres |
| podés | puedes |
| sabés | sabes |
| salís | sales |
| pagás | pagas |
| hacés | haces |
| agendá | agenda |
| mirá | mira |
| dejá | deja |
| empezá | empieza |
| descubrí | descubre |
| sumate | súmate |
| elegí | elige |
| probá | prueba |

Patrón general: cualquier presente en `-és/-ás/-ís` tónico o imperativo en `-á/-é/-í` tónico es voseo → reescribir en tuteo. Términos técnicos quedan en inglés sin traducir (deploy, checkout, pricing, dashboard). Moneda: cuando el mercado es Chile, CLP con IVA incluido en el precio mostrado (el 19% ya va dentro, mostrarlo aparte es un tell de traducción).

## Honestidad (regla dura #2, riesgo SERNAC)

- Cero métricas inventadas ("10× más rápido", "5.000 clientes", "+47% conversión"). Sin dato real: `—` con bloque gris etiquetado ("métrica por confirmar"), o preguntar, o rediseñar la sección sin el slot.
- Cero testimonios, nombres, cargos o logos de clientes falsos. Un logo wall solo con marcas reales y con derecho a nombrarlas; si no, no hay logo wall.
- Cero contadores de urgencia falsos, cero "quedan 3 cupos" sin datos reales, cero precisión fake (`5.8mm`, `99.99%`) que la marca no puede sostener.
- Un stat SÍ puede ser el hero cuando es real (un número real y verificable vale más que cualquier headline); nunca va solo, siempre con la línea que dice qué significa.

## Em-dash (regla dura #3)

`—` y `–` como separador: prohibidos en todo texto visible. Punto, coma, dos puntos o paréntesis. Rangos con guion simple (`2020-2026`, `$40-80`). Atribución de quote: salto de línea + nombre en peso menor (nunca "— Sarah").

## Principios

- **Verbos específicos.** "Guardar cambios" > "OK" > "Enviar". El botón nombra la acción que ejecuta.
- **Links que se sostienen solos.** "Ver precios" > "Haz clic aquí".
- **Errores = instrucciones:** qué pasó (factual) → por qué si se sabe → qué hacer (imperativo). Sin "¡Ups!", sin humor en rutas de frustración (pago fallido, cuenta bloqueada), sin signos de exclamación en errores.
- **Voz activa, un registro por página.** Elegir "Eliminar" o "Quitar" y usarlo siempre.
- **Decir menos.** Headline ≤7 palabras; sub-párrafo ≤25 palabras; hero con máximo 4 elementos de texto (eyebrow O marca, headline, subtexto, CTAs). La confianza se muestra en lo que se deja fuera.
- **Un solo CTA por intención en toda la página.** "Hablemos" + "Contáctame" + "Escríbeme" son la misma intención → UN label, repetido idéntico en nav, hero y footer.
- Empty states: qué está vacío + por qué importa + UN botón.
- Tipografía correcta: comillas curvas, `…` real, espacio duro antes de unidades.

## Eyebrows y labels (default: OFF)

- El eyebrow mono-caps arriba de cada sección es el tell #1 de la lista de vetos. **Máximo 1 eyebrow por cada 3 secciones**, y solo cuando nombra el tema en lenguaje plano. Casi siempre la respuesta es cero: el headline solo basta.
- Prohibido: eyebrows numerados (`01 / FEATURES`), labels de versión en el hero (`BETA`, `V0.6`) salvo launch real, "Quietly trusted by", labels poético-artesanales ("Field notes", "Del taller"), micro-meta bajo el eyebrow, strips de locale/clima ("STGO 14:23 · 18°C"), scroll cues ("↓ scroll"), pills sobre imágenes, créditos de foto decorativos, footers de versión en marketing, dots de estado decorativos, texto rotado 90° como reflejo.
- El punto medio (`·`) racionado: máximo 1 por línea de metadata.
- Un solo tratamiento de label para TODO (mismo mono-caps en eyebrow, botón, colofón y nav) = disfraz, no voz. Roles distintos, tratamientos distintos, o sin labels.

## Aperturas prohibidas

"Construido para el equipo moderno" · "Libera/Desata tu X" · "Donde A se encuentra con B" · "Potencia tu workflow" · "Soluciones innovadoras" · "Integración perfecta/seamless" · "En el panorama digital actual" · "Next-generation" · "Transforma/Eleva/Revoluciona tu…" y sus equivalentes en inglés. Nombres cliché de demo: Acme, Nexus, Pulse (usar placeholders con dominio: "Ferretería Brasil", "Rastro Sur"). Placeholder de persona: nombres verosímiles hispanos, jamás "Juan Pérez"/"Jane Doe".

Si el brief no da nada específico para la apertura, **decirlo y preguntar** por un sustantivo, verbo o lugar concreto. El modelo no inventa especificidad.

## La especificidad que sí funciona (imitar el patrón, no las palabras)

- Fecha + vertical nombrada: *"Dirección creativa y tipografía para cultura desde 2003."*
- Rechazo del verbo de marketing: *"Una cosa bien hecha."*
- Declarativo plano (dark-técnico): *"La API de eventos para equipos de datos. Ingesta real, entrega en segundos."*
- Data-first cuando el dato es real: *"14 países · 9 servicios · entrega p50 4s."*
- Enumerativo con rechazo: *"Lee lo que emita líneas. Archivos, pipes, sockets."*
- Personal honesto: rol + lugar + entregable concreto, sin humildad performativa ni poesía de LLM.

## Autoauditoría de copy (antes de shippear)

Releer TODA string visible (headlines, labels, captions, alt, errores) y matar: frases gramaticalmente rotas, referentes poco claros, wordplay lindo-pero-incorrecto, meta-poesía de LLM ("un elegante nada"), humildad pasivo-agresiva. En la duda, la frase funcional simple gana. Copy IA "tierno" es peor que copy aburrido. Y el chequeo final de voseo: buscar `és `, `ás `, `ís `, `á ` tónicas en imperativos.
