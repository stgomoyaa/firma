# References: real work before design, extracted not imitated

A model designing from memory converges on the average of its training data, and that average is exactly what "looks like an AI template". The hard rules and gates remove the tells; they cannot supply the judgement the model lacks. Real references supply it. Measured 16-09-2026: an Instagram batch built from the rulebook alone passed every automated check and still shipped a colour rail covering the page number and a price set in old-style figures, because nothing was compared against real work and nobody looked at the output.

## When

Every non-trivial build: web page, app surface, social post, carousel, reel cover, thumbnail, ad. Skip only for a single component inside an existing system (inherit its `design.md`) or a fix with no visual decision in it.

## Sources, in order

### 1 · Inspo MCP (web pages; preferred when connected)

Server `https://inspomcp.dev/api/mcp?profile=lite&images=none&maxTokens=1200`, HTTP, no key. It speaks this skill's vocabulary: the same 19 macrostructures, paper band, display class and accent hue.

1. `get_filters` when unsure of a value; anything outside its vocabulary errors.
2. `recommend` with `brief` **and** filters (`industry`, `vibe`, `mode`, `pageType`). Measured 16-09-2026: a brief-only call for a premium dental clinic returned Copilot Microsoft as the lead exemplar. Without filters the match is semantic noise.
3. Read its `evidence` packet: the category's consensus on paper band, display class and accent hue, measured over real sites. That is the gravity of the genre (see below).
4. After choosing a shape in step 4: `find_examples_for_macrostructure`. For real numbers (type ramp, palette roles, CSS variables): `get_design_system(slug)` on the 1-2 closest exemplars. Multi-page builds: `get_site_pages` for how a real product sequences its pages.
5. `get_reference_jsx` only to study structure. Never paste it: its stamp names its own theme, and a pasted component is someone else's firma.

Coverage is marketing and product web pages. Some shapes have only 2-5 examples (`get_filters` → `macrostructureCoverage`). Nothing for Instagram.

### 2 · DESIGN.md libraries (no MCP needed)

Collections of `DESIGN.md` files extracted from real products. Fetch free first (WebFetch, then `https://r.jina.ai/<url>`).

- styles.refero.design · getdesign.md · designmd.supply · typeui.sh · designmd-store.com · designmd.ai
- designmd.me turns any URL into a `DESIGN.md`: run it on a site the client admires or on a direct competitor.
- collectui.com · niblet.com: component patterns.
- component.gallery: how real design systems name, structure and document the same element (tabs, accordion, toast). Use it for product surfaces and states, not for looks.

Collected 14-09-2026 from practitioner lists, not audited one by one: confirm a library still loads before citing it.

### 2b · Per-piece galleries (nav, footer, CTA, bento, 404, motion)

Inspo covers whole pages. These cover one piece each, and are the place to go when a step picks that piece. Same extraction rules: patterns and numbers, never identity.

- **Step 4, nav:** navbar.gallery, browsable by type (static, dropdown, mega menu). Use it to escape the "wordmark + 4 links + button" fingerprint, not to find a prettier version of it.
- **Step 4, footer:** footer.design, browsable by style (typographic, large type, illustrative, cards, animated). Same job against the "4 columns + social + copyright" fingerprint.
- **Bento macro:** bentogrids.com, filterable by light/dark. Read cell ratios and how many cells carry real content before copying the shape.
- **One section at a time:** unsection.com (counts seen: Hero 766, Feature 1,958, CTA 425, Footer 374, Navbar 187, Pricing 152, FAQ 148). Free login for full browsing.
- **CTA voice and placement:** cta.gallery, filterable by industry and light/dark.
- **Error and empty states:** 404s.design, filterable by style, interaction and industry. Pairs with `product-surfaces.md`.
- **Hero:** supahero.io, hero sections only. Read where the headline, proof and action sit in the first viewport.
- **Pricing:** pricingpages.design. Read plan count, which plan is highlighted and how the toggle and comparison table work; the copy is the client's call.
- **Whole pages, when Inspo is down or thin:** godly.website · minimal.gallery · land-book.com (login for full browsing) · landing.love (animation-led). Same extraction rules as Inspo, without its gravity numbers, so count the category yourself.
- **Motion technique banks (read-only):** motion-primitives.com · smoothui.dev · kinetics.colorion.co · microkit.co. Study how an effect is built, then rebuild it with this build's tokens and easing. Never paste the component.
- **Interaction axis (step 3 rotation):** 60fps.design, motion details from shipped apps, 108 filters. Take timing and the trigger, then rebuild in CSS or View Transitions.

Excluded: jiro.build, a paid library of copy-paste prompts for AI builders. A prompt that produces "the same output in every builder" is the template fingerprint this skill exists to remove.

Also excluded, same reason: scrolltide.co (USD 299 prompt library), vibeprompts.dev, kage.design (inspiration mapped to prompts). And the block libraries (Aceternity, Magic UI, shadcnblocks, uiverse, 21st.dev): whole sections with their own look are the most recognised AI-landing fingerprint; shadcn/ui primitives are fine as unstyled structure under this build's tokens.

For iPhone apps use the `app-designer` skill and mobbin.com (login) for real app flows, not these web galleries.

Collected 05-10-2026 via Jina Reader. 404s.design returned zero filter counts (JS-rendered), so open it in a browser. Confirm each still loads before citing it.

### 3 · Social surfaces (posts, carousels, reel covers, thumbnails, ads)

Web inspiration does not transfer: the canvas is fixed, it is read at thumb distance and the profile grid crops it. References here are real posts.

- 3 accounts in the same vertical and price tier (who the client actually competes with), plus 1-2 outside the vertical with a recognisable editorial system.
- Extract per reference: text height as a share of canvas height, words per slide, elements per slide, where the recurring series marker sits, how the cover reads at grid size (about 324px wide), what survives the 3:4 grid crop of a 4:5 post and the 3:4 and 4:5 crops of a 9:16 cover.
- Most Instagram browsing needs a login. If you cannot open real posts, say so, then use the brand's own past posts plus Inspo pages from the same industry for tokens. Never describe references you did not see.

## Extraction: patterns and numbers, never identity

**Take:** composition, hierarchy, type ramp ratios, measure, spacing rhythm, density, where the primary action sits, how states and errors are shown.

**Never take:** a logo, an exact palette, a distinctive illustration or photo style, copy, or the signature element of a reference.

**Distance test.** The result differs from EACH reference on at least 2 of: palette anchor hue · display face · macrostructure composition. Matching one reference on all three is a clone with a new name.

## Category gravity

Inspo's `evidence` (or your own count across the references) gives the genre's consensus on paper band, display class and accent hue. Matching it on all three axes is the template look of that category. Take a written position on at least one axis, with it or against it, and name what in the brief justifies it. The swap test from hard rule 7 applies: if the sentence works for a competitor, it is not a position.

- Passes: *"roman serif against a 67% grotesk category: 35 years of practice is the argument, and a serif carries age."*
- Fails: *"serif for a premium feel."*

The rotation rules of step 3 still apply on top.

## Reference card (preview, step 6)

```markdown
- **References** · <site or account> (<url>) · <...> · <...>
- **Took** · <pattern + number> · <pattern + number>
- **Rejected** · <what the references do that this brief should not>
- **Category gravity** · light / grotesk / cool (Inspo, 24 sites) → against on display: <reason>
```

## Side-by-side verification (step 8)

Render the build at its real size (for social also at grid size) and view it next to the references. Answer in writing:

1. Would it sit credibly among them, or is it visibly a tier below? Name the gap.
2. Which reference does it copy? If the answer is a name, it fails the distance test.
3. Which element would a designer call a template? Name it and fix it.

This needs a model that can see images. If none is available (quota, harness, headless run), hand over as **"visual verification pending"**. Never report a pass nobody saw.

## Measure text, not ink

A pixel check that looks for the first non-background pixel passes whenever a decorative element (rail, band, frame) reaches the margin, even when it covers text. Measure the text: for every text element take `Range.getClientRects()` and fail on any intersection with a decorative element or with the canvas safe zone. Measured 16-09-2026: the ink check passed a batch whose rail covered the page number and pressed against the header; the text-rect check caught both on the first run.
