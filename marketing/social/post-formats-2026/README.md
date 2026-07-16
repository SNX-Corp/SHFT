# Instagram post formats (fall 2026)

Eight on-brand frames, one per pillar plus a photo format and a story. Feed
posts are 1080x1350 (4:5, Meta's current recommended feed size). The story is
1080x1920 with text kept inside the safe zones.

| File | Format | Pairs with caption |
|------|--------|--------------------|
| `01-brand.html` | Feed 4:5 | brand-01 |
| `02-program.html` | Feed 4:5 | prog-02 |
| `03-event.html` | Feed 4:5 | event-01 |
| `04-wcp.html` | Feed 4:5 | wcp-01 |
| `05-openhouse.html` | Feed 4:5 | oh-01 |
| `06-lab.html` | Feed 4:5 | lab-01 |
| `07-photo.html` | Feed 4:5, photo | any team caption |
| `08-story-openhouse.html` | Story 9:16 | oh-03 |

Captions live in `../captions-fall-2026.md`. Finished PNGs are in `preview/`.

## How to edit and export

1. Open the `.html` file in a text editor, change the words, fill every
   `[ FILL ]` chip with the real fact.
2. To re-export exact-size PNGs: `node shot.js` in this folder (needs
   `npm i playwright-core` once, and a Chromium install; on Malhar's Mac,
   `npx playwright install chromium` first). PNGs land in `preview/`.
3. Or open the file in Chrome and screenshot the frame.

## Rules

- One green hit per frame. If two elements are lime, demote one.
- Square corners everywhere. No shadows, no gradients on type.
- The `[ FILL ]` chips are placeholders. Never post a frame that still shows one.
- The photo frame (`07`) uses the real team photo from `../../brand-assets/`.
  Swap in real shop and event photos as they exist. No AI images presented as
  our real space or people.
- Fonts are bundled in `fonts/` (Orbitron, Exo 2, Raleway) so renders match the
  site exactly with no network needed.
