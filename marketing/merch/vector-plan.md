# SHFT Merch: Getting Print-Ready Vector Art

Good news first: you already own a true vector source. An earlier draft of this file assumed only raster PNGs existed. That was wrong. The native designer file is on your machine, and it is what every large print, embroidery, or screen run should use.

---

## You already have the native vector

**File: `~/Desktop/SHFT/SHFT logo.ai`** (about 478 KB, a layered PDF 1.6 with 10 artboards).

This is a real Adobe Illustrator vector file with layers, not a raster wrapped in an `.ai`. It is the gold-standard source for merch. Use this, not the website PNGs, for anything printed large or embroidered.

The 10 artboards almost certainly hold multiple lockup variants. Open it and locate the full `SH⚡FT` lockup and the standalone bolt.

---

## How to export print-ready files from it

You need a vector editor: Adobe Illustrator, Inkscape (free), or Affinity Designer.

1. Open `SHFT logo.ai`.
2. Find the artboard with the complete `SH⚡FT` lockup. Find or isolate the bolt on its own.
3. Outline the text. In Illustrator: select the wordmark, then Type > Create Outlines. In Inkscape: Path > Object to Path. This locks the letterforms so the printer needs no font.
4. Confirm the bolt is its own object filled exactly `#A6FF00`. If it reads as a different green, recolor it to `#A6FF00`.
5. Export each of these as SVG and EPS, and keep an AI or PDF master:
   - Full `SH⚡FT` lockup, light version (white letters + lime bolt).
   - Full lockup, dark version (near-black letters + lime bolt).
   - Standalone bolt (lime).
   - One-color knockout bolt (single solid path) for embroidery and single-color jobs.
6. Hand all of these to the printer along with `merch-specs.md`.

No vector editor on hand? Inkscape is free and opens this file. Or send `SHFT logo.ai` straight to the print shop. Most shops open an `.ai` and pull the art themselves. Tell them: "Native vector is in the .ai. Use the full SH⚡FT lockup, bolt as a separate lime spot color, proof the lime against Pantone 802 C / 809 C."

---

## Other vector files on your machine (lower priority)

In `~/Documents/shift-logo-clean/`:

- `shft-clean-black-vector.svg` and `shft-clean-white-vector.svg`: clean single-color silhouettes (black or white). Usable for a one-color print or a knockout. They are traced from the artwork and carry no lime, so treat them as fallbacks, not the master.
- `shft-clean-vector-color-raw.svg`: despite the name it contains only black and near-white, no lime. It is not the color lockup.

The native `.ai` beats all of these. Reach for these only for a quick single-color job.

---

## In the website repo (screen use only)

`website/public/images/logo/` holds `wordmark.png` and `wordmark-dark.png` (1225 by 364 raster), `bolt-mask.png`, and `SS.svg` / `ii.svg`. The PNGs are fine for screens and small prints. The two SVGs are auto-traced black fragments, not the full lockup. Do not send these to a printer as "the vector." Use the `.ai` instead.

---

## Color, every time

- Lime is exactly `#A6FF00`. It is a fluorescent volt green that plain CMYK cannot reproduce.
- For apparel and large format, proof against Pantone 802 C / 809 C or a neon ink, and confirm a physical swatch before the full run. See `merch-specs.md`.

---

## Status

Real vector art exists: `~/Desktop/SHFT/SHFT logo.ai`. The only remaining step is to open it, outline the text, confirm the lime is `#A6FF00`, and export SVG plus EPS for the printer. No tracing and no rebuilding required.
