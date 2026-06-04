# SHFT ROBOTICS T-Shirt Print Spec

One-page production spec for the vendor. Read top to bottom. All artwork is supplied as vector. Do not redraw or rasterize.

---

## 1. Item and blank

| Field | Spec |
|---|---|
| Item | Short-sleeve crew-neck t-shirt |
| Garment color | Black |
| Recommended blank | Bella+Canvas 3001 (retail soft) **or** Gildan 64000 (budget) |
| Example SKUs | Bella+Canvas **3001C Black**; Gildan **64000 Black** |
| Sizes | YS to 3XL as ordered |
| Fabric note | Ringspun cotton or 50/50. Confirm white underbase is not needed on these dark blanks for a screen run (it is, see method). |

---

## 2. Print method

- **Screen print**, plastisol or water-based discharge.
- **2 colors maximum**: White + Lime spot. The garment black is the third "color" and is the blank, not ink.
- On black fabric the white art doubles as the underbase. Lime prints wet-on-wet or as a second hit over a white flash so the neon stays bright. Confirm with a press proof.
- Output all film at **100% / 1:1**. Do not scale art on press.

---

## 3. Print locations

Two options. A normal team order runs Option A on the front; Option B is the alternate or the back-of-collar / left-chest add-on.

### Option A: Full front
| Field | Spec |
|---|---|
| Artwork file | **`../../brand-assets/wordmark.svg`** (SHFT ROBOTICS lockup) |
| Print width | **260 mm wide** (height follows art at ~146.7 mm) |
| Horizontal | Centered on chest, art center on the garment center line |
| Vertical | Top edge of art **75 mm below the collar (neck) seam** |
| Colors | White letters + Lime bolt and ROBOTICS bars |

### Option B: Left chest
| Field | Spec |
|---|---|
| Artwork file | **`../../brand-assets/bolt.svg`** (bare bolt). Alt: `../../brand-assets/shft.svg` (compact SHFT, 90 mm wide) |
| Print size | **90 mm tall** (bolt width follows art at ~56.8 mm) |
| Horizontal | **70 mm right of the garment center line** (this lands on the wearer's left chest) |
| Vertical | **70 mm below the shoulder seam** |
| Colors | Lime only (1 color), or White + Lime if using `shft.svg` |

Master layout of both placements at 1:1: **`tee-print-artwork.svg`** (this folder).

---

## 4. Colors

Keep the print to **2 colors**. The garment supplies the black.

| Role | Color | Hex | Print note |
|---|---|---|---|
| Accent | Lime | **#A6FF00** | **SPOT COLOR.** Match to **Pantone 802 C** or **809 C**, or a neon ink. |
| Text / underbase | White | #FFFFFF | Standard white. Doubles as underbase under lime on black. |
| Garment | Ink | #1A1A1A | The blank. Not printed. |

> **Spot color is mandatory.** Lime #A6FF00 in plain CMYK prints a flat, dull olive. It must be a spot or neon ink. Pull a **physical swatch** and get sign-off before the run. Do not approve to screen.

---

## 5. Artwork files (supplied as vector, color #A6FF00, transparent)

| Placement | File | Notes |
|---|---|---|
| Full front | `../../brand-assets/wordmark.svg` | White letters + green bolt + green ROBOTICS |
| Left chest | `../../brand-assets/bolt.svg` | Bare green bolt |
| Left chest (alt) | `../../brand-assets/shft.svg` | Compact SHFT, white + green |
| Light-garment variant | `../../brand-assets/wordmark-dark.svg` | Ink letters, for any non-black reorder |
| Master art sheet | `tee-print-artwork.svg` | Both placements, 1:1 mm, with dimensions |

All files are true vector. Separate the white and lime as two spot channels off the same art. Do not trace, re-key, or convert to CMYK.

---

## 6. Production checklist

- [ ] Blank confirmed: Bella+Canvas 3001 or Gildan 64000, **Black**, correct sizes.
- [ ] Art received as vector. White and Lime separated as two spot channels.
- [ ] Lime set as a **spot** ink, matched to **PMS 802 C / 809 C** or a neon. Not CMYK.
- [ ] Physical ink swatch pulled and approved against the Pantone chip.
- [ ] Films / screens output at **100% / 1:1**.
- [ ] Front placement: **260 mm wide, centered, 75 mm below collar seam.**
- [ ] Left chest (if ordered): **90 mm tall, 70 mm right of center, 70 mm below shoulder seam.**
- [ ] White underbase / flash dialed so lime reads bright on black.
- [ ] Press proof on the actual blank approved before the full run.
- [ ] Registration checked: white and lime align on the bolt.

---

Team: **SHFT ROBOTICS** · shftrobotics.com · @shftrobotics
