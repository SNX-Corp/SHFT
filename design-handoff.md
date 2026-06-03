# Team SHFT — Design & Brand Handoff

The visual identity for **Team SHFT**, packaged so anyone (a printer, a merch
shop, a designer) can produce on-brand apparel and goods. Pair this with the
logo files in `website/public/images/logo/`.

> **One-line brand:** an electric, competition-first Ontario FRC robotics team.
> Bold. Engineered. A little bit lightning.

---

## 1. The mark

The wordmark is **SHFT** set in a heavy italic geometric face, with a **lime
lightning bolt** standing in for the "I". The bolt is the heart of the brand:
the energy, the "shift", the thing that reads instantly on a hat or a sticker.

Two ideas to design around:
1. **The full wordmark** — `SH⚡FT` — for the front of a tee, a banner, a hero graphic.
2. **The bolt alone** — the lime lightning bolt — for a sleeve hit, a sticker, a cap, an embroidered chest mark, a watermark.

---

## 2. Logo files (current)

In `website/public/images/logo/`:

| File | What it is | Use on |
|------|-----------|--------|
| `wordmark.png` | **Light** wordmark (white letters + lime bolt), 1225×364 | dark garments / dark backgrounds |
| `wordmark-dark.png` | **Dark** wordmark (near-black letters + lime bolt) | light garments / white backgrounds |
| `bolt-mask.png` | The **bolt shape** alone (mask) | building a standalone bolt icon |
| `SS.svg`, `ii.svg` | Vector letter/mark fragments | vector starting points |
| `../maple-leaf.png` | Maple-leaf crest (secondary mark) | "Ontario" / Canadian accent |

> ⚠️ **For merch, get a true vector wordmark.** The PNGs are 1225 px wide — fine for screens and small prints, but large-format apparel, embroidery, and screen-print want **SVG / AI / EPS** so it scales and separates cleanly. Re-export the wordmark to vector (or rebuild it from the Orbitron-style letters + the bolt) before any large run. The bolt itself should be a clean vector path.

---

## 3. Color

The brand is **one electric accent on a near-black/white system.** Restraint is the point: lime does the talking.

| Role | Name | HEX | RGB | On-screen use |
|------|------|-----|-----|----------------|
| **Signature** | SHFT Lime | `#A6FF00` | 166, 255, 0 | the bolt, CTAs, highlights |
| Lime (pressed) | Lime Dim | `#5A8C00` | 90, 140, 0 | dark-on-lime text, shadows |
| **Base dark** | SHFT Black | `#1A1A1A` | 26, 26, 26 | dark garments, text |
| Base light | White | `#FFFFFF` | 255, 255, 255 | light garments, text |
| Neutral | Mid Grey | `#737373` | 115, 115, 115 | secondary text |
| Hairline | Border Grey | `#E5E5E5` | 229, 229, 229 | rules, dividers |

**Partner / accent colors** (only when referencing them — they are not SHFT's):
ALT-F4 red `#A11D1D`, ranking gold `#F5C518`, WCP blue `~#4D7DFF`.

### Print notes (read before ordering)
- **`#A6FF00` is a fluorescent yellow-green ("volt").** Plain CMYK can't reproduce it well; it will look flat/olive. For accurate merch use a **spot/Pantone or neon ink**.
- Starting Pantone references to proof against: **Pantone 802 C / 809 C** (bright/fluoro green-yellow). **Always confirm with a physical swatch** — neon greens shift a lot between screen and fabric.
- Best contrast = **lime on black.** It is the brand's signature pairing and the strongest merch look.
- Lime on white is legible but loses punch; if used, weight the lime heavier or outline it.
- **Never** put the lime bolt on a lime field, and avoid low-contrast lime-on-mid-grey.

---

## 4. Typography

| Use | Typeface | Why |
|-----|----------|-----|
| **Display / wordmark voice** | **Orbitron** (700–900) | geometric, techy, "robotics". The wordmark lives here. |
| Headlines | **Exo 2** (700) | sporty, condensed energy |
| Body / supporting | **Raleway** (400–600) | clean, readable |

For merch text (slogans, team number, back-of-shirt), **Orbitron in heavy
weights, uppercase, tight tracking** is the brand voice. All three are free
(Google Fonts / fontsource), so a printer can license/obtain them easily.

**Voice rule (applies to any copy on merch):** no em dashes. Short, declarative
lines. e.g. "Shift the standard." / "Better. Every. Year." / "Built to compete."

---

## 5. Clear space & minimum size

- **Clear space:** keep open space around the wordmark equal to the height of the bolt on all sides. Don't crowd it with seams, other logos, or text.
- **Minimum size:** wordmark no smaller than ~25 mm / 1 in wide in print so the bolt notch stays clean. The bolt-only icon can go smaller (down to ~10 mm) since it's a single shape.
- **Embroidery:** simplify to 2 colors (lime + garment color). The bolt embroiders beautifully on its own.

---

## 6. Do / Don't

**Do**
- Use the lime bolt as the star. Let it be the only bright thing.
- Pair lime + black for the strongest look.
- Use the bolt alone as an icon (sleeve, cap, sticker, chest).
- Keep the wordmark's proportions exact.

**Don't**
- ❌ Stretch or squish the wordmark (keep the 1225:364 ≈ **3.37:1** aspect ratio locked).
- ❌ Recolor the bolt anything but the lime (or a single garment-matched knockout).
- ❌ Add drop shadows, gradients, or outlines to the wordmark.
- ❌ Rebuild the wordmark in a different font. Use the supplied art.
- ❌ Place the logo on a busy photo without a solid block or scrim behind it.

---

## 7. Merch ideas (on-brand starting points)

- **Tee (hero):** black tee, large white `SH⚡FT` wordmark across the chest, lime bolt. Optional small "ONTARIO COMMUNITY FRC TEAM" or team number under it in Orbitron.
- **Bolt sticker / patch:** the lime bolt alone. The most reusable, recognizable item.
- **Hoodie:** black, small bolt on the left chest, big wordmark or "SHIFT THE STANDARD." across the back in Orbitron.
- **Cap:** embroidered bolt (front) or small wordmark.
- **Pit / banner:** black field, oversized wordmark, lime bolt, plus partner lockups (ALT-F4, WCP) in a tidy row at the bottom.
- **Slogan line options:** "Shift the standard." · "Built to compete from day one." · "Better. Every. Year."

---

## 8. Production checklist

- [ ] Export/obtain a **vector** wordmark (SVG/AI/EPS) and a **vector bolt**.
- [ ] Provide both light and dark wordmark versions to the printer.
- [ ] Specify **lime = `#A6FF00`**, proof against Pantone 802/809 C, confirm with a physical swatch (neon).
- [ ] Confirm garment color first (the look is built around **lime on black**).
- [ ] Supply Orbitron / Exo 2 / Raleway if any custom text is set.
- [ ] Lock the wordmark aspect ratio at **3.37:1** — do not let anyone "fit to box."

---

*Brand basis: the live site at shftrobotics.com. Tokens live in
`website/src/styles/global.css`; logo art in `website/public/images/logo/`.*
