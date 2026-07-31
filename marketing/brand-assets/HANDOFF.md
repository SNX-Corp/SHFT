# Brand asset pack: handoff

Written 2026-07-30. Covers the logo pack shipped in PR #7 and the mockup work that
follows it.

---

## 1. What shipped

`/brand` section 04 is a downloadable pack for apparel designers, printers, and
embroiderers. One `shft-logo-pack.zip` plus per-file links.

3 marks x 5 colorways x 4 formats = 60 files, plus `manifest.json` and a spec sheet.

| | |
|---|---|
| Marks | `shft-wordmark` (SHFT + bolt), `shft-robotics-lockup` (full name), `shft-bolt` |
| Colorways | `full-on-dark`, `full-on-light`, `white`, `black`, `green` |
| Formats | SVG, PDF, EPS (true vector), PNG at 4000px on the longest side |

Everything is trimmed to the artwork, so sizing by width or height gives the size
asked for.

### Regenerating

```
python3 marketing/brand-assets/build/build-pack.py
```

Writes `website/public/brand/`. **Never hand-edit anything in that directory.**
SVG and PNG output is byte-identical across runs; EPS and PDF differ only by an
embedded creation timestamp, so a rebuild shows churn in those two.

### The build chain

| File | Does |
|---|---|
| `build/regularize.py` | Rebuilds a silhouette bitmap as clean straight-edged paths. Simplify boundary, cluster edge directions into the angles the artwork actually uses, least-squares fit each edge to the pixels it covers, intersect neighbours for corners. Plain potrace leaves one-pixel wobble that a garment printer scales up. |
| `build/trace_robotics.py` | Applies that to the ROBOTICS letterforms from `wordmark-robotics-official.png`. Writes `_robotics-vector-src.svg`. 0.09% pixel deviation from the source. Only re-run if the master raster changes. |
| `build/compose_lockup.py` | Re-spaces those letters evenly and locks them under the master wordmark. |
| `build/build-pack.py` | Generates every mark, colorway, and format, plus the zip. Calls `compose_lockup` directly. |
| `build/READ-ME-FIRST.txt` | The spec sheet that ships inside the zip. |

### Things that will bite you

- **`wordmark.svg` is the only source of truth.** It is SHFT + bolt, no ROBOTICS,
  despite the filename. Everything else is generated from it.
- **No font matches the ROBOTICS letterforms.** 14 candidates were scored against the
  source glyphs; the closest (Zen Dots) was 15% off. They are custom art. Never retype
  the word, and keep that instruction in the spec sheet.
- **The archival lockup is a different generation of the mark.** In
  `wordmark-official.jpeg` the bolt is roughly twice the size relative to the letters
  and cuts straight through the ROBOTICS line. The current master has a compact bolt
  that does not reach that far, which is why the lockup is composed rather than lifted.
- **`wordmark-shft-robotics.png` is still wrong and still referenced.** Off-model bolt,
  plus 137px of padding on the top edge only. About 20 files under `marketing/print/`,
  `ads/`, `social/`, `mockups/`, `openhouse/`, `brand-guide.html`, and
  `sponsor-package.html` still point at it. Sweeping them needs a per-file visual check
  because the aspect ratio changes from 3.17 to 2.31.
- **The scroll-reveal script grabs anything bordered.** `src/scripts/animations.ts`
  tags every `[class*="border"]` element inside a `<section>` and offsets it 24px. Any
  new section full of bordered chips or table rows needs `data-no-reveal` on the
  `<section>`, or its contents render visibly shifted.
- **The S-mark is deliberately out of the pack.** `SS.svg` is an autotrace with visible
  edge wobble. It stays a screen mark; the bolt covers small placements. If it ever
  needs to go to print, run it through `regularize.py` first and review the corners by
  eye, because the first pass left small artifacts on the hook shapes.

---

## 2. Next up: mockups on /brand

Malhar wants mockups added, and sent Noeen's product sheet as reference.

### Assets that already exist

`~/Desktop/SHFT/merch-lookbook/products/` holds 9 renders. **They are not in the repo
yet.** Sorted by whether they match the current brand system:

| Usable | Carries the correct SHFT wordmark + bolt |
|---|---|
| `hoodie-front.png` | 1440px. Full front wordmark. Small red mark on the left sleeve, check what it is before shipping. |
| `hoodie-back.png` | 1440px. Bolt down the side. |
| `cap.png` | 1440px. Full lockup on the brim. |
| `lanyard.png` | 1440px. Repeating wordmark. |
| `wristband.png` | 1440px. Wordmark on green. |
| `tee.png` | 1080px. **Has garbled AI text** reading "Sponsored by" on the back. Crop it out or leave the file out. |

| Do not use | Why |
|---|---|
| `polo.png` | Uses a different angular arrow emblem that is not in the current brand system. |
| `bottle.png` | Same off-system emblem. |
| `flag.png` | Same off-system emblem. |

Also on disk: `~/Desktop/SHFT/shft merch/*.mp4`, four 360-degree rotating merch videos,
and `~/Desktop/SHFT/merch-lookbook/lookbook.html`.

### Noeen's product sheet

Take the product range and the placement thinking. Do not take the artwork.

Three things in it do not match the brand as recorded:

1. **The emblem** is the angular arrow mark, not the current bolt. Same mark as the
   three unusable renders above.
2. **The green** is a mid-green, not `#A6FF00`. BRAND.md is explicit that the canonical
   green is `#A6FF00` and that off-greens get corrected.
3. **`VERIFY:` team number 11753.** It appears throughout the sheet and **nowhere in the
   repo.** Do not put a team number on public brand assets until Malhar confirms it.
   Note that 7558 is ALT-F4's number and must never appear on SHFT material.
4. **`VERIFY:` tagline "INNOVATE. ADAPT. SHFT."** BRAND.md records the banner tagline as
   "INNOVATE. BUILD. COMPETE." Confirm which is current before either goes on the page.

### Recommended approach

Add a placement section under Downloads that answers the question a printer actually
has: where does the mark go, and how big. For each placement, show the garment, name it,
give the print width in mm and inches from the minimum-size table, and name the file to
use. That is more useful to a vendor than a photo gallery, and it stays honest because
it is a diagram rather than a fake product shot.

Use the six usable renders. Do not put AI-generated product photos with garbled text on
a page going to outside vendors; that is the exact failure the shft-public gate exists
to catch.

---

## 3. Gate reminder

Everything on `/brand` and everything inside the zip is outward-facing. It goes through
the shft-public gate before it ships. On this pass the gate caught `FRC Team 7558` in the
spec sheet header, which would have put ALT-F4's team number inside a zip going to
outside vendors.
