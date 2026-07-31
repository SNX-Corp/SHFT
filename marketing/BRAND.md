# Team SHFT: Verified Brand Spec

Single source of truth for the SHFT brand. It reconciles two inputs:
1. The live website code (`website/src/styles/global.css`), which holds the canonical color and type tokens.
2. The official brand board and asset pack the team provided (now in `marketing/brand-assets/`), which defines the identity: the SHFT ROBOTICS wordmark, the emblem, the slogans, and the patterns.

Where the two disagreed, the resolution is recorded in Section 10. Key call: the canonical green is `#A6FF00` (the website). The AI-generated brand board renders the green slightly off as `#8FE400`. Use `#A6FF00`.

---

## 1. Color system (canonical)

From `global.css` `@theme`. These are the truth. Use the token, not a remembered hex.

| Role | Token | HEX | Usage |
|------|-------|-----|-------|
| **Signature green** | `--color-accent` | `#A6FF00` | The one bright color. Bolt, CTAs, highlights, accents. |
| Green hover | `--color-accent-hover` | `#8FE000` | Hover state on accent elements. |
| Text on green | `--color-accent-text` | `#1A1A1A` | Dark text on a green fill. |
| Green pressed | `--color-accent-dim` | `#5A8C00` | Shadows, pressed states. |
| **Dark / near-black** | `--color-surface-alt` | `#1A1A1A` | The dark ground for the dark-primary look, footer, primary text. |
| White | `--color-bg` | `#FFFFFF` | The ground for the light variant. |
| Surface | `--color-surface` | `#F8F8F8` | Alternate light backgrounds, cards. |
| Border | `--color-border` | `#E5E5E5` | Hairlines on light. |
| Text primary | `--color-text-primary` | `#1A1A1A` | Body and headline on light. |
| Text secondary | `--color-text-secondary` | `#555555` | Supporting copy on light. |
| Text muted | `--color-text-muted` | `#737373` | Labels, captions. (The `/brand` page mislabels this `#999999`.) |
| Text inverse | `--color-text-inverse` | `#FFFFFF` | Text on dark. |

Partner and semantic: ALT-F4 red `#A11D1D` (dim `#7F1414`), ranking gold `#F5C518` (dim `#B8860B`).

Do not use: `#8FE400` (AI brand-board green, slightly off) or `#0D0F1F` (AI brand-board navy). The canonical green is `#A6FF00`, the canonical dark is `#1A1A1A`.

---

## 2. Two looks: dark primary, light variant

The brand runs on a near-black and white system with one green accent. Two valid grounds:

- **Dark (primary).** Ground `#1A1A1A`, white type, `#A6FF00` accent. This matches the real hoodies, banner, flag, robot, and social. The marketing kit ships in this look.
- **Light (variant).** Ground `#FFFFFF`, ink `#1A1A1A` type, `#A6FF00` used sparingly. This is the website style. The light kit is preserved in `marketing/light-variant/`.

Both looks share the same rule: **square edges, `border-radius: 0`.** Sharp, not soft. The only curves allowed are real physical objects in a mockup (a hoodie hood, a cap crown).

---

## 3. Logo and marks (official identity)

**Primary wordmark: SHFT ROBOTICS.** White "SHFT" in a heavy italic, the green lightning bolt as the "I", and "ROBOTICS" letter-spaced below with the bolt cutting through. Cleaned, transparent, correct-green files are in `brand-assets/`.

**Emblem (the mark):** an angular arrow-bolt that reads as an "S". White upper half, green lower half. Used alone for avatars, stickers, sleeve hits, watermarks.

Emblem variations (from the brand board): **Primary** (white + green on dark), **Inverted** (dark on a green square), **White** (single-color white), **Icon** (the emblem inside a green circle ring).

Clear space: keep open space around the mark equal to the height of the emblem. Minimum sizes (digital): emblem 24px, wordmark 80px wide.

**The production pack lives at `website/public/brand/`** and is published at
[shftrobotics.com/brand#downloads](https://shftrobotics.com/brand#downloads). Three marks
(wordmark, full SHFT ROBOTICS lockup, bolt) x five colourways x SVG, PDF, EPS, and 4000px PNG,
plus `shft-logo-pack.zip` and a spec sheet. Send that link to any printer, embroiderer, or
apparel designer. Regenerate with `python3 marketing/brand-assets/build/build-pack.py`; never
hand-edit files under `website/public/brand/`.

Asset files (cleaned to `#A6FF00`, transparent):

| File | What it is |
|------|-----------|
| `brand-assets/wordmark.svg` / `-dark.svg` | **Master vector.** SHFT + bolt (no ROBOTICS), white or ink letters. Everything else is generated from this. |
| `brand-assets/wordmark-tight.svg` | The same artwork with the viewBox trimmed to the art. |
| `brand-assets/_robotics-vector-src.svg` | The ROBOTICS letterforms as vector, rebuilt from the master raster. Read by the lockup composer, not for direct use. |
| `brand-assets/wordmark-robotics-official.png` | The full lockup raster the ROBOTICS vector was keyed off. Zero padding, `#A6FF00`. |
| `brand-assets/wordmark-shft-robotics.png` | **Do not use.** Off-model bolt (fat, missing top spike) and 137px of padding on the top edge only. Superseded by the pack. |
| `brand-assets/icon-transparent.png` | The emblem in a green circle, transparent. Avatar, sticker, watermark. |
| `brand-assets/wordmark-official.jpeg` | Original AI wordmark on black (reference, off-green). |
| `brand-assets/icon.jpeg` | Original AI icon on black (reference, off-green). |
| `brand-assets/banner.jpeg` | Grunge banner with INNOVATE. BUILD. COMPETE. (reference, off-green). |
| `brand-assets/brand-board.jpeg` | The full brand board (reference). |
| `brand-assets/brand-in-action.jpeg` | Real-world application grid (reference). |
| `brand-assets/team-hoodie.png` | Real team member in the SHFT hoodie. Strong recruiting photo. |

Also in the website repo: `website/public/images/logo/wordmark.png` (older "SHFT" lockup, correct green, transparent) and `SS.svg` (older S-mark vector).

Production note: the SHFT ROBOTICS lockup is now a true vector and ships in the pack above, so
merch and embroidery no longer need a commissioned redraw. The emblem (`icon-transparent.png`) is
still raster only. The S-mark (`SS.svg`) is an autotrace with wobbly edges, so it stays a screen
mark and is deliberately left out of the print pack; use the bolt for small placements instead.

---

## 4. Typography

Loaded via `@fontsource` (`website/src/fonts/index.ts`), declared in `global.css`.

| Role | Family | Usage |
|------|--------|-------|
| **Display** | **Orbitron** 700 to 900 | The wordmark voice, display headlines, big statements. Uppercase. |
| **Heading** | **Exo 2** 600 to 800 | Section headings, buttons, nav, labels. Uppercase for labels and buttons. |
| **Body** | **Raleway** 400 to 500 | Body, descriptions, paragraphs. The brand board confirms Raleway for body. |

Type scale (`global.css`): display `clamp(3.5rem,8vw,8rem)`, h1 `clamp(2.5rem,5vw,4.5rem)`, h2 `clamp(2rem,4vw,3.5rem)`, h3 `clamp(1.5rem,3vw,2rem)`, body `1rem`, label `0.6875rem` (700, uppercase, tracking `0.2em`). Tracking: tight `-0.03em`, display `-0.04em`, mega `0.2em`. Leading: display `0.9`, body `1.6`.

---

## 5. Brand patterns and elements

From the brand board, for backgrounds and accents (keep subtle, green at low opacity on dark):

- **Dot grid:** a regular grid of small green dots.
- **Speed slashes:** three parallel diagonal bars.
- **Angular cuts:** hard-angled corner shapes and chevrons.

---

## 6. Motion and components

Motion (`global.css`): easing `cubic-bezier(0.16, 1, 0.3, 1)`; durations 200 / 400 / 800ms. Ambient micro-motion (status pulse, title shine) is core.

Buttons are **square** (`rounded-none`), Exo 2 bold uppercase, `active:scale(0.97)`. Primary: green fill `#A6FF00` + ink text. Outline on dark: 1.5px white border, white text. Section label: a short green rule then an Exo 2 `0.6875rem` uppercase label, format `01 / LABEL`.

---

## 7. Voice and copy

- **Primary tagline:** INNOVATE. BUILD. COMPETE.
- **Campaign slogans:** "WE DON'T FOLLOW. WE SHFT." and "BUILDING THE FUTURE ONE SHIFT AT A TIME."
- **Site lines (still valid):** "Shift the standard." and "A new Ontario FRC team built to compete from day one." and "Top 10 in Ontario. Year one."
- **Values:** FOCUS, ELEVATE, INNOVATE, TOGETHER.
- **Hard rule:** no em dashes anywhere. Short, declarative lines. Use a period or a colon.

Team facts: name **SHFT** (SHFT ROBOTICS in full lockup), team number **"Number pending"**, founded **2025**, Ontario FRC team, Instagram **@shftrobotics**, bio "Robotics Team. Innovate. Build. Compete.", `shftrobotics.com`.

---

## 8. The look in one line

Near-black ground. One green hit, `#A6FF00`. Sharp square edges. The SHFT ROBOTICS wordmark and the bolt emblem. Heavy uppercase Orbitron. Motion that means something.

---

## 9. Where everything lives

| Thing | Path |
|-------|------|
| Color, type, motion tokens | `website/src/styles/global.css` (`@theme`) |
| Live brand page | `website/src/pages/brand.astro` (`/brand`) |
| Official assets (cleaned + reference) | `marketing/brand-assets/` |
| Marketing kit (dark primary) | `marketing/` (print, social, ads, merch, events) |
| Light variant of the kit | `marketing/light-variant/` |
| Visual preview gallery | `marketing/preview/index.html` |

---

## 10. Audit: conflicts and resolutions

1. **Green: `#A6FF00` is canonical.** The website uses it. The AI brand board renders it as `#8FE400` (pixel-sampled the official files at about `#91E403`). The cleaned brand-assets PNGs are corrected to `#A6FF00`. Never ship `#8FE400`.
2. **Dark: `#1A1A1A` is canonical.** The AI brand board shows a navy `#0D0F1F`. Use `#1A1A1A`.
3. **`/brand` page bug:** it labels Muted `#999999`; the real token is `#737373`. One-line fix in `brand.astro:16`, not yet applied.
4. **The kit now ships dark-primary** to match the real brand, with the white-canvas version preserved in `light-variant/`. Earlier the kit was all-black with the wrong dark (`#0D0D0D`) and rounded corners; that is fixed.
5. **New wordmark and emblem are raster-only.** Commission a true vector before large merch.
