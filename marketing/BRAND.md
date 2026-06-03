# Team SHFT: Verified Brand Spec

This is the single source of truth for the SHFT brand. Every value here was extracted from the live site source and verified against the file it lives in. Where a value was wrong or inconsistent in the codebase, that is flagged in Section 10.

Canonical interactive version: the site already has a brand page at `/brand` (`website/src/pages/brand.astro`) and a logo page at `/logos`. This document is the portable, vendor-ready companion to those pages.

Authoritative token source: `website/src/styles/global.css` (the `@theme` block, lines 4 to 60).

---

## 1. Color system

From `global.css` `@theme` (lines 4 to 23). These tokens are the truth. Use the token, not a remembered hex.

| Role | Token | HEX | Usage |
|------|-------|-----|-------|
| **Signature accent** | `--color-accent` | `#A6FF00` | The one bright color. Bolt, CTAs, highlights, the marquee. Neon "volt" green. |
| Accent hover | `--color-accent-hover` | `#8FE000` | Hover state on accent elements. |
| Text on accent | `--color-accent-text` | `#1A1A1A` | Dark text placed on a lime fill. |
| Accent pressed | `--color-accent-dim` | `#5A8C00` | Shadows, dark-on-lime, pressed states. |
| **Primary background** | `--color-bg` | `#FFFFFF` | The site is a white-canvas system. White is the default ground. |
| Surface | `--color-surface` | `#F8F8F8` | Alternate section backgrounds, cards. |
| **Dark / near-black** | `--color-surface-alt` | `#1A1A1A` | Dark sections, footer, primary text. This is the dark, not `#0D0D0D`. |
| Border | `--color-border` | `#E5E5E5` | Hairlines, dividers. |
| Text primary | `--color-text-primary` | `#1A1A1A` | Body and headline text on light. |
| Text secondary | `--color-text-secondary` | `#555555` | Descriptions, supporting copy. |
| Text muted | `--color-text-muted` | `#737373` | Labels, captions, tertiary. (The `/brand` page mislabels this as `#999999`. See Section 10.) |
| Text inverse | `--color-text-inverse` | `#FFFFFF` | Text on dark sections. |

Partner and semantic colors (only when referencing those things, they are not SHFT's own):

| Role | Token | HEX |
|------|-------|-----|
| ALT-F4 red (partner team) | `--color-altf4` / dim | `#A11D1D` / `#7F1414` |
| Ranking gold | `--color-gold` / dim | `#F5C518` / `#B8860B` |

Note: `#0D0D0D` is NOT a brand token. It appears only as a display backdrop on the `/logos` page (`logos.astro:19,34`). Do not use it as the brand dark. The brand dark is `#1A1A1A`.

---

## 2. Typography

Fonts are loaded via `@fontsource` in `website/src/fonts/index.ts` (verified imports), declared in `global.css` (lines 25 to 27).

| Role | Family | Loaded weights | Usage (from `brand.astro`) |
|------|--------|----------------|----------------------------|
| **Display** | **Orbitron** | 400, 500, 600, 700, 800, 900 | Team name (SHFT), display headlines, section numbers. Always uppercase. Weight 700 to 900 only. Never body text. |
| **Heading** | **Exo 2** (Variable) | variable | Section headings, buttons, nav links, labels. Uppercase for labels and buttons. 500 to 700. |
| **Body** | **Raleway** (Variable) | variable | Body, descriptions, paragraphs. 400 for body, 500 for emphasis. Never uppercase at small sizes. |

Type scale (`global.css` lines 29 to 37, real clamp values):

| Step | Value |
|------|-------|
| Display | `clamp(3.5rem, 8vw, 8rem)` |
| H1 | `clamp(2.5rem, 5vw, 4.5rem)` |
| H2 | `clamp(2rem, 4vw, 3.5rem)` |
| H3 | `clamp(1.5rem, 3vw, 2rem)` |
| Body large | `1.25rem` |
| Body | `1rem` |
| Small | `0.875rem` |
| Caption | `0.75rem` |
| Label | `0.6875rem`, weight 700, uppercase, tracking `0.2em` |

Tracking: tight `-0.03em`, display `-0.04em`, wide `0.1em`, mega `0.2em`.
Leading: display `0.9`, heading `1.1`, body `1.6`.
Headings (`h1` to `h6`) default to the heading face (Exo 2) at weight 700 (`global.css:87-90`).

---

## 3. Logo and marks

Real files in `website/public/images/logo/` (dimensions verified):

| File | Real size | What it is | Use on |
|------|-----------|-----------|--------|
| `wordmark.png` | 1225 x 364 | Light wordmark (white letters + lime diagonal) | Dark backgrounds |
| `wordmark-dark.png` | 1225 x 364 | Dark wordmark (near-black letters + lime diagonal) | Light backgrounds |
| `bolt-mask.png` | 1225 x 364 | The diagonal/bolt shape as a raster mask | Building a mark |
| `SS.svg` | 614 x 508 | Real vector. The S-mark source. | The primary icon |
| `ii.svg` | 381 x 549 | Real vector letter fragment | Vector starting point |
| `../maple-leaf.png` | 752 x 800 | Ontario maple-leaf crest (secondary) | Canadian accent |

**The primary mark is the S-Mark**, not a freestanding lightning bolt. `SMark.astro` reads `SS.svg` and renders it as three pieces: a top hook and bottom hook in ink (`#1A1A1A` on light, `#FFFFFF` on dark) plus a **middle diagonal connector in neon green `#A6FF00`**. The "bolt" people see is that lime diagonal inside the S and the wordmark.

Usage rules (from `LogoShowcase.astro`):
- **Clear space:** keep open space around the mark equal to the height of the S-mark on all sides.
- **Minimum digital sizes:** S-mark 24px, wordmark 80px wide.
- Pair light mark on dark, dark mark on light. Keep the lime diagonal as the only color.

Vector for merch: `SS.svg` is a real, usable vector for the S-mark. For the full outlined wordmark and a standalone mark in SVG/EPS, the native source is `~/Desktop/SHFT/SHFT logo.ai` (layered Illustrator file). See `merch/vector-plan.md`.

---

## 4. Design principles (the brand's own rules)

Verbatim intent from `DesignPrinciples.astro`. These are non-negotiable.

1. **Sharp, Not Soft.** Angular geometry, no rounded corners, aggressive crops. Rule: `border-radius: 0`. Softness signals uncertainty.
2. **White Canvas.** Let white space work. Color is accent, not background. The neon green earns attention by being rare. Rule: `bg: #FFFFFF`.
3. **Motion With Purpose.** Every animation serves hierarchy. Nothing moves just to move. Rule: `ease: expo.out`.
4. **Type First.** Typography carries the brand. When in doubt, make the text bigger. Orbitron for impact, Exo 2 for authority, Raleway for clarity. Rule: `font-weight: 900`.

---

## 5. Motion tokens

From `global.css` (lines 48 to 51): easing `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`; durations fast `200ms`, normal `400ms`, slow `800ms`. Ambient micro-motion (status-dot pulse, title shine sweep, breathing rules) is described in `global.css` as core to the brand and always on.

---

## 6. Buttons and components

From `Button.astro`. Buttons are **square** (`rounded-none`), Exo 2 bold, uppercase, tracked, with `active:scale(0.97)`.

| Variant | Style |
|---------|-------|
| `primary` | Lime fill `#A6FF00`, dark text `#1A1A1A`, hover `#8FE000` |
| `outline` | Border `#E5E5E5`, dark text, hover border darkens to text-primary |
| `outline-accent` | 2px lime border, lime text, hover fills lime with dark text |
| `ghost` | No fill, secondary text, hover to primary |

Sizes: default `px-6 py-3 / 13px`, large `px-8 py-4 / 14px`.
Section label pattern: a short lime rule, then a `0.6875rem` 700 uppercase Exo 2 label in muted text, for example `01 - COLOR PALETTE`.

---

## 7. Voice and copy

- **Official tagline:** "SHIFT our mindset. ELEVATE our impact." (`social.ts:7`, `BaseLayout.astro:16`).
- **Footer line:** "Shift the standard." (`content/sections/footer.md`).
- **Hero subtitle:** "A new Ontario FRC team built to compete from day one." (`content/sections/hero.md`).
- **Vision lines:** "A LAUNCHPAD." and "Top 10 in Ontario. Year one." (`content/sections/vision.md`).
- **Brand values:** FOCUS, ELEVATE, INNOVATE, TOGETHER (`data/values.ts`).
- **Hard writing rule:** no em dashes anywhere. Short, declarative lines. Restructure with a period or a colon instead.

Team facts (verified): name **SHFT**, team number **"Number pending"** (`social.ts:6`), founded **2025** (`social.ts:8`), an Ontario FRC team, Instagram **@shftrobotics** (`social.ts:2`).

---

## 8. The look in one line

White canvas. Sharp square edges. Heavy uppercase Orbitron. One rare hit of neon `#A6FF00`. Dark `#1A1A1A` sections for contrast. Motion that means something.

---

## 9. Where everything lives

| Thing | Path |
|-------|------|
| Color, type, motion tokens | `website/src/styles/global.css` (`@theme`) |
| Font loading | `website/src/fonts/index.ts` |
| Live brand page | `website/src/pages/brand.astro` (`/brand`) |
| Live logo page | `website/src/pages/logos.astro` (`/logos`) |
| Brand components | `website/src/components/brand/` |
| Logo art | `website/public/images/logo/` |
| Native vector wordmark | `~/Desktop/SHFT/SHFT logo.ai` |

---

## 10. Audit: what was wrong, and the corrections

This is why a verified spec was needed.

1. **Your `/brand` page mislabels Muted as `#999999`.** The real token `--color-text-muted` is `#737373` (`global.css:11`). The swatch list in `brand.astro:16` should be corrected to `#737373`.
2. **The first marketing kit used `#0D0D0D` as the dark.** That is not a brand token. The brand dark is `#1A1A1A`. (Already standardized the lime to `#A6FF00`; the dark still needs aligning if you keep dark layouts.)
3. **The first marketing kit was all-black.** That conflicts with the "White Canvas" principle, where white is the ground and lime is rare. The kit reads as a different, darker sub-brand.
4. **The first marketing kit used rounded corners and pill buttons.** That conflicts with "Sharp, Not Soft" (`border-radius: 0`) and the real `Button.astro` which is `rounded-none`. On-brand merch and print should use square corners and square or square-cornered buttons.

Fixing items 2 to 4 means rebuilding the kit on a white-canvas, square-edged system, or explicitly deciding the dark look is an intentional merch and social variant.
