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
- **The S-mark is retired, not just out of the pack.** Malhar confirmed on 2026-07-30
  that the team does not use it. `SS.svg` and `SMark.astro` are deleted, `/logos`
  redirects to `/brand#downloads`, and the bolt took over every placement it held. Do
  not reintroduce it. The same angular arrow mark appears on Noeen's product sheet and
  on the `polo`, `bottle`, and `flag` renders, which is why those stay unusable.

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

Two things in it still do not match the brand. The other two are now resolved.

1. **The emblem** is the angular arrow mark, not the current bolt. That mark is now
   retired outright, so nothing from the sheet's artwork can be used.
2. **The green** is a mid-green, not `#A6FF00`. BRAND.md is explicit that the canonical
   green is `#A6FF00` and that off-greens get corrected.
3. **Resolved: team number 11753.** Malhar confirmed it on 2026-07-30. It is now in
   BRAND.md and filled through the marketing kit. 7558 is ALT-F4's and stays off SHFT
   material.
4. **Resolved: tagline "INNOVATE. ADAPT. SHFT."** Malhar confirmed it on 2026-07-30.
   "INNOVATE. BUILD. COMPETE." turned out to be ALT-F4's tagline that SHFT drafts had
   borrowed, and it was corrected on 8 surfaces.

### Done: the placement section

Shipped as `/brand` section 05, built from `PlacementGuide.astro`. Six placements (tee
front, hoodie left chest, hoodie back, cap front, sticker or patch, pit banner), each
naming the file, the size in both units, and the decoration method. Measurements come
from `merch/merch-specs.md`, and every diagram places the real production vector from
`public/brand/svg` on a garment outline drawn to adult-M scale.

**The renders were not used, and should not be.** All six carry a green that is not
`#A6FF00`: sampled at `#9DCA06`, `#86B103`, `#94BC43`, `#A9D11A`, `#9CDE21`, and
`#99D30A`. The hoodie also has an off-brand red sleeve mark and the tee has garbled AI
text reading "Sponsored by". A page whose own instruction is "never substitute a
different green" cannot show one. They remain fine for the lookbook and social, where
they are not read as production specs.

If mockups are ever wanted on the page, correct the green first the way the
`brand-assets` PNGs were corrected, and drop the tee entirely.

---

## 3. Still open

- **`wordmark-shft-robotics.png` is still wrong and still referenced.** Unchanged from
  the last pass. About 20 files still point at it and sweeping them needs a per-file
  visual check, because the aspect ratio changes from 3.17 to 2.31.
- **No verified Pantone or thread number.** `merch-specs.md` suggests proofing to
  Pantone 802 C / 809 C; the download page says none is on file. Both are true (suggested
  is not verified), but the first shop that picks one should have it recorded so the
  numbers stop disagreeing.

## 4. Gate reminder

Everything on `/brand` and everything inside the zip is outward-facing. It goes through
the shft-public gate before it ships. Earlier the gate caught `FRC Team 7558` in the spec
sheet header, which would have put ALT-F4's team number inside a zip going to outside
vendors.

On the placement pass it caught five things in freshly written copy, four of which were
invented rules or claims stated as fact: a jersey-number placement rule that exists
nowhere, a tagline letterspacing limit, a wrong minimum-size explanation, and a phrase
implying SHFT has print runs behind it. Write the rule into BRAND.md first, or do not
state it on a public page.
