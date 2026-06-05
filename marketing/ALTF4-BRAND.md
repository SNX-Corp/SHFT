# ALT-F4 — Brand Guidelines

Single source of truth for the ALT-F4 (FRC Team 7558) brand. Derived from the
official team logo and the live brand page at `/altf4/brand`.

The brand is three things: **black, white, and one decisive red.** Sharp angles,
zero radius, built like a robot.

---

## 1. The logo

The wordmark spells **ALT-F4** — the keyboard command — in heavy, angular blocks.

- A red **Canadian maple leaf** sits inside the "A" (the team is Toronto-based).
- The **"F4"** is drawn as two outlined red keycaps. This is the signature mark.
- Two grounds only: white-letter version on black, black-letter version on white.
- The maple leaf and the F4 keys stay **red** in both versions.

Asset files (`website/public/images/altf4/`):

| File | Use |
|------|-----|
| `logo.png` | Black "ALT" + red leaf + red F4, transparent. For light grounds. |
| `logo-white.png` | White "ALT" + red leaf + red F4, transparent. For dark grounds. |

Clear space: keep open space around the mark equal to the height of the "A".
Minimum width: 80px digital.

Production note: the logo currently exists as a cleaned transparent raster.
For large merch and embroidery, commission a true vector (SVG/AI/EPS).

---

## 2. Colour

A near-black ground, white type, and one red pulled straight from the logo.
**No second accent.** Red is a scalpel, not a paint roller.

| Role | HEX | Usage |
|------|-----|-------|
| Pure Black | `#000000` | The logo, wordmark fills. |
| Ground Black | `#0A0A0A` | Primary backgrounds, screens. |
| Surface | `#131313` | Cards, panels. |
| Surface Raised | `#1B1B1B` | Highlighted cards. |
| **Brand Red** | `#FF0000` | The one accent: leaf, F4 keys, CTAs, highlights. |
| Red Bright | `#FF2B2B` | Hover state. |
| Red Deep | `#7F0000` | Hard offset shadows, pressed states, depth. |
| White | `#FFFFFF` | Type on dark, light-variant ground. |
| Dim | `#A3A3A3` | Secondary text, captions. |
| Border | `#2A2A2A` | Hairlines, dividers. |

CSS tokens live in `website/src/styles/altf4.css` (`--color-af-*`).

---

## 3. Typography

| Role | Family | Usage |
|------|--------|-------|
| **Display** | Orbitron 900 | Wordmark voice, big numbers, hero statements. Uppercase. |
| **Heading** | Exo 2 600–800 | Section headings, buttons, nav, labels. |
| **Body** | Raleway 400–500 | Paragraphs, long-form. |
| **Data / Labels** | Monospace | Stats, keycap chips, eyebrow labels — the terminal voice. |

---

## 4. Motifs

- **The keycap** — borrowed from the F4 keys. Red-outlined chip with a hard
  offset shadow. Use for labels, tags and call-outs (`.af-key`).
- **Speed slashes** — diagonal red bars for energy and motion. Keep sparing
  (`.af-slashes`).
- **Angular corner cuts** — a hard red triangle clipped into a corner (`.af-cut`).
- **Zero radius** — every corner is sharp. Always.

---

## 5. Voice

Confident, technical, never arrogant. Short declaratives. Numbers over
adjectives. We let results speak.

- Tagline: **Innovate. Build. Compete.**
- Example: "We build the robot first. The trophies follow."

---

## 6. The team (facts for copy)

- **Name / number:** ALT-F4 · FRC Team 7558
- **Home:** Bayview Glen Independent School, Toronto, Ontario
- **Founded:** 2019 (rookie year)
- **Roster:** students in grades 9–12
- **Mission:** give students room to grow through technology and design while
  building critical thinking, collaboration and communication.

### Robot lineage
Vision (2025) · Ventura (2024) · Venus (2023) · Vertigo (2022) · Viper (2020) · Orion (2019)

### Performance (Statbotics, pulled 2026-06)
- 2026 normalized EPA **1864** — **#3 in Canada**, top 2% worldwide
- Canada rank climb: **#35 (2019) → #3 (2026)**
- All-time record **213–96** across 309 matches (**68.9%** win rate)

### Contact
- Robotics Coordinator — mpestonji@bayviewglen.ca
- FRC Specialist — nkashif@bayviewglen.ca
- Web — team7558.com · thebluealliance.com/team/7558 · statbotics.io/team/7558
