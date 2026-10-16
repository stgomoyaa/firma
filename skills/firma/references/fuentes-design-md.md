# Fuentes de DESIGN.md evaluadas

Consulta: 6 oct 2026. “No verificado” significa que la página pública consultada no lo aclara.

| Fuente | Qué ofrece / formato | Gratis y acceso por CLI/API sin login | Calidad y foco |
|---|---|---|---|
| [Refero Styles](https://styles.refero.design) | Biblioteca de 2.000+ fichas; DESIGN.md detallado, tokens, CSS y Tailwind. | Página y contenido accesibles sin login; no encontré API pública ni precio en la ficha consultada. | Muy buen nivel de detalle y dirección visual; productos, SaaS, ecommerce, dashboards y mobile. |
| [TypeUI](https://typeui.sh) | 94 design skills, prompts y sistemas vía MCP; no es una biblioteca directa de DESIGN.md observados. | Catálogo visible; MCP forma parte de Creative, anunciado a US$30/mes. API/CLI pública sin login no verificada. | Curado y accionable para sitios y UI; amplitud de usos, calidad variable por skill. |
| [Neuform](https://neuform.ai) | Generador de landing HTML y plantillas para remix; anuncia DESIGN.md reutilizables. | Precio, login y consumo CLI/API no verificables en la página accesible. | Enfocado en landing pages; útil para explorar variantes, menos evidencia de sistemas de producto complejos. |
| [Aura](https://aura.build) | Generador de landings con IA y galería de plantillas remixables (free, Pro y pagadas desde US$19), editor visual con CMS/SEO, export a Figma. No es biblioteca de DESIGN.md. | Galería visible sin login; generar y remixar requiere cuenta; plantillas Pro/pagas. Sin API/CLI pública verificada (revisado con navegador real, 06-10). | Útil como referencia de composición de landing (hero, secciones); estética de plantilla, conviene extraer decisiones y no copiar. |
| [designmd.supply](https://designmd.supply) | Pega un dominio y genera un Google DESIGN.md con identidad, capturas y markup de Context.dev; catálogo de marcas. | Sitio y repo públicos; no encontré API/CLI documentada ni confirmé si generar requiere cuenta. | Buen punto de partida basado en sitios reales; cobertura general por dominio, fidelidad depende de la extracción. |
| [OpenDesign](https://open-design.ai) | App open source con más de 150 sistemas; crea sistemas desde sitio, GitHub o Figma. Exporta HTML/PDF/PNG, no una descarga suelta de DESIGN.md confirmada. | App local gratis y sin cuenta con agente local o API propia; Cloud alojado requiere cuenta/plan. Sin API pública de catálogo confirmada. | Amplio: sitios, app UI, dashboards, slides y prototipos. Más herramienta de creación que fuente de referencia rápida. |
| [DesignMD](https://designmd.me) | Convierte URL en DESIGN.md, preview HTML y complemento de importación Figma; muestra 8 páginas por análisis. | Cobra 4 créditos por spec; sin tarjeta para empezar. CLI/API sin login no verificados. | Muestra tokens concretos; extracción multi página, apta para producto/SaaS y sitios. |
| [Hyperbrowser DESIGNMD](https://design-md.hyperbrowser.ai) | Extrae un DESIGN.md de cualquier sitio con el estándar abierto de Google. | Pide una API key de Hyperbrowser (se guarda solo en el navegador); costo según el plan de Hyperbrowser, no verificado. Revisado con navegador real, 06-10. | Mismo uso que designmd.supply/DesignMD: extraer el sistema de un sitio de referencia concreto. |

## Orden sugerido para firma

- **Landing ecommerce:** Refero para fichas de producto y marcas; designmd.supply o DesignMD para extraer el sitio de referencia concreto. Neuform y Aura sirven para explorar composición de landing.
- **Panel admin:** Refero para dashboards/SaaS; TypeUI como patrón MCP curado.
- **App iOS:** Refero para referencias de producto/mobile; DesignMD puede extraer una web, no una interfaz nativa. Completar con capturas reales de apps.
- En cada superficie, comparar 3-5 referencias relevantes y extraer decisiones, sin copiar identidad. No contar generadores o herramientas como referencias visuales por sí solos.

## Traer una ficha Refero por terminal

```sh
curl -fsSL 'https://r.jina.ai/http://styles.refero.design/style/ID-DE-LA-FICHA' -o /tmp/refero-ficha.md
```

La respuesta incluye la ficha y su DESIGN.md dentro del snapshot Markdown. Para el archivo limpio, usar el botón **DESIGN.md** de la ficha; no encontré un endpoint de descarga directa verificable. Reemplaza el ID por el de la ficha elegida.
