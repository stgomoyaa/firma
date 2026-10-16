# Directions library (ported from tasteskill v2)

A faster start for step 1b. Instead of inventing three candidate directions from memory, deal three researched ones from a library distilled from a study of curated gallery sites (One Page Love, Awwwards Sites of the Day). The study covered 247 sites; `library/sites.json` holds the 181 records that made the cut.

## What is in `library/`
- `directions.json`: named art directions, each with an idea engine and a composition (axis, masthead, column, scale).
- `heroes.json`, `sections.json`: hero and section blueprints per role.
- `palettes.json`, `type.json`, `motions.json`: palettes, type pairings and motion recipes tied to directions.
- `photos.json`, `sites.json`: the photo sets and the source sites behind each direction.

## Deal directions
```
node scripts/draw.mjs --sector <sector> --brief "<one line>" --options 3 --seed <n>
node scripts/draw.mjs --sector <sector> --brief "<one line>" --direction <id>
```
The first call deals three candidates; the second deals one of them in full (palette, type, section blueprints). Use the three as the candidates of the explore step and render all three before choosing.

## Find free photos and video
```
node scripts/assets.mjs "<query>" --limit <n>
```
Searches open collections and writes the files plus their credits. Needs network from the shell; a sandboxed worker without it gets `ENOTFOUND`.

## firma rules win over anything dealt
1. A dealt direction is a starting point, not a decision. firma still decides, and every hard rule (honesty, locale register, em-dash, italics) applies to it unchanged. A dealt palette or face that a hard rule vetoes gets replaced.
2. Image source order: GPT Image through a Codex worker first; free-licence stock second, with the credit in the footer; Higgsfield last.
3. Any downloaded photo carries its credit on the page, and no stock photo is presented as the client's own work, premises or people.
