# SHFT ROBOTICS — Sticker Pack Print Spec

A 3-sticker die-cut pack: two circular roundels and one kiss-cut bolt. This sheet is written for a vinyl sticker vendor. Hand it over with the three artwork SVGs in this folder.

---

## 1. Item and recommended blank

| | Detail |
|---|---|
| Item | Die-cut / kiss-cut vinyl stickers |
| Material | Premium white cast or calendered vinyl, permanent adhesive, outdoor rated (3 to 5 year). PVC or PET face. |
| Finish | Gloss UV laminate over the print (scratch, water and UV protection). Matte laminate is an acceptable alternate if requested. |
| Example stock / SKUs | StickerMule "Die Cut" or "Kiss-Cut" gloss vinyl; Avery Dennison MPI 1105 face + DOL 1360 gloss overlaminate; Oracal 651 + Oraguard 210 gloss for short-run cut vinyl. |
| Liner | White paper or PET release liner. For kiss-cut keep the liner whole (no cut-through). |

---

## 2. Print method

- **Process:** CMYK + spot eco-solvent, latex, or UV inkjet, then contour cut on a plotter (e.g. Roland, Graphtec, Summa) reading the magenta CutContour path.
- **White ink / white base:** the kiss-cut bolt prints on clear-edge transparent areas only where the bolt and halo live, so it needs an opaque white base layer under the lime where any clear vinyl is used. On white vinyl stock no white layer is required.
- **Cut type:**
  - Roundels (bolt-roundel, shft-roundel): full **die-cut** through face and liner, individual circles.
  - Bolt (bolt-diecut): **kiss-cut**, face cut to contour, liner left whole, peel-and-stick.
- **Resolution:** vector art supplied. Rasterize at 600 dpi minimum if the RIP requires a bitmap.

---

## 3. Colors

Keep each sticker to 1 to 2 inks plus white. The lime is the brand color and must read as a true neon, not a flat olive.

| Color | Value | Production note |
|---|---|---|
| Lime (brand) | #A6FF00 | **Spot color.** Proof against **PANTONE 802 C** (or **809 C**) or a neon/fluorescent green ink. Plain 4-color CMYK prints flat olive and is not acceptable. Confirm a physical swatch before the full run. |
| Black | #000000 | Roundel disc background. Supplied as pure black for spot and digital vinyl. If the vendor runs CMYK litho instead, ask them to build a rich black from it rather than printing 100K alone. |
| White | #FFFFFF | Keyline ring on roundels, halo on the kiss-cut bolt, and the white base under lime on clear vinyl. |
| CutContour | #FF00FF (magenta, 1pt) | Cut path only. **Does not print.** Set as a spot named `CutContour` (or your plotter's cut-spot name) with overprint off. |

---

## 4. Print locations, sizes and files

Each artwork is a self-contained SVG with the brand vectors embedded and a magenta CutContour die line.

### A. Bolt Roundel
- **File:** `bolt-roundel.svg`
- **Brand vector inside:** `../../brand-assets/bolt.svg` (lime bolt)
- **Size:** 75 mm diameter finished. Alt small size 50 mm.
- **Build:** lime bolt centered on a #000000 disc, 14u white keyline ring inset from the edge, black bleed extends ~1.75 mm past the cut line.
- **Cut:** full die-cut circle, CutContour at r = 75 mm.
- **Colors:** Lime spot + Ink + White (2 colors + white base on clear stock; on white stock no base needed).

### B. SHFT Roundel
- **File:** `shft-roundel.svg`
- **Brand vector inside:** `../../brand-assets/shft.svg` (white SHFT letters + lime accent stroke)
- **Size:** 75 mm diameter finished. Alt small size 50 mm.
- **Build:** the SHFT mark centered on a #000000 disc, 14u white keyline ring, black bleed past the cut line.
- **Cut:** full die-cut circle, CutContour at r = 75 mm.
- **Colors:** Lime spot + Ink + White.

### C. Bolt Kiss-Cut
- **File:** `bolt-diecut.svg`
- **Brand vector inside:** `../../brand-assets/bolt.svg` over `../../brand-assets/bolt-white.svg` halo
- **Size:** ~70 mm tall finished (bolt height incl. halo). Width follows the bolt silhouette, roughly 40 mm.
- **Build:** lime bolt on transparent, ~3.5 mm white keyline halo around the silhouette.
- **Cut:** **kiss-cut** to the halo contour. CutContour traces the outer halo edge. Liner stays whole.
- **Colors:** Lime spot + White (2 colors). White base required under the lime since the stock area around it is transparent.

---

## 5. Sizes summary

| Sticker | Standard | Small | Cut |
|---|---|---|---|
| Bolt Roundel | 75 mm dia | 50 mm dia | Die-cut circle |
| SHFT Roundel | 75 mm dia | 50 mm dia | Die-cut circle |
| Bolt Kiss-Cut | 70 mm tall | 50 mm tall | Kiss-cut to contour |

---

## 6. Production checklist

- [ ] Lime confirmed as spot: PANTONE 802 C or 809 C or neon green. Not CMYK olive.
- [ ] Physical swatch of the lime approved before the full run.
- [ ] CutContour set as a non-printing spot (`CutContour`), overprint off, 1pt magenta.
- [ ] Roundels set to full die-cut (face + liner). Bolt set to kiss-cut (face only, liner whole).
- [ ] Bleed present on roundels: black disc ~1.75 mm past the cut line.
- [ ] White base layer added under lime wherever stock is clear/transparent (kiss-cut bolt).
- [ ] Gloss laminate applied over the print.
- [ ] Outdoor-rated permanent adhesive vinyl confirmed.
- [ ] Sizes confirmed: 75 mm roundels, 70 mm bolt (or 50 mm small set).
- [ ] Press proof or single sample sticker reviewed before the full quantity.

---

Team: SHFT ROBOTICS · @shftrobotics · shftrobotics.com
