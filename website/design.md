# SHFT — design.md

The single source of truth for how the SHFT site looks and feels. Any agent or person building or editing a SHFT page reads this first, then matches it. The goal is that every page we ship looks like it came from the same studio, not from a fresh prompt each time.

Values here are extracted from `website/src/styles/global.css` (the `@theme` block). When code and this file disagree, the code wins and this file gets updated. Do not invent new tokens; use the ones below.

---

## 1. What SHFT looks like in one line

White canvas, one neon-lime accent used rarely, near-black ink, hard square edges, three purposeful typefaces, motion that reveals hierarchy instead of decorating. Premium through restraint, not through effects.

## 2. Four principles (these decide the close calls)

1. **Sharp, not soft.** Angular geometry, zero border-radius, aggressive photo crops. Every edge is intentional. Softness reads as uncertainty. The only rounded things in the whole system are functional pills (a live-status dot, a close button).
2. **White canvas.** White space does the work. Color is accent, never background. The lime earns attention by being rare. If lime is on more than a small fraction of a screen, it is being overused.
3. **Motion with purpose.** Every animation serves hierarchy. Nothing moves just to move. Reveals communicate order of importance; speed communicates confidence. Default easing is expo-out.
4. **Type first.** Typography carries the brand. When in doubt, make the text bigger. Orbitron for impact, Exo 2 for authority, Raleway for reading.

## 3. Color

Use the token, not the hex, in code (`bg-accent`, `text-text-secondary`, etc). Hexes listed so the intent is unambiguous.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FFFFFF` | Page background. The default. |
| `surface` | `#F8F8F8` | Quiet raised panels on white. |
| `surface-alt` | `#1A1A1A` | Dark blocks, code tags, inverted sections. |
| `border` | `#E5E5E5` | Hairlines and card outlines on white. |
| `text-primary` | `#1A1A1A` | Body and headings. Near-black, never pure `#000`. |
| `text-secondary` | `#555555` | Supporting copy. |
| `text-muted` | `#737373` | Labels, captions, metadata. |
| `text-inverse` | `#FFFFFF` | Text on dark. |
| `accent` | `#A6FF00` | The lime. Primary CTAs, one highlight per view, active state. |
| `accent-hover` | `#8FE000` | Lime hover. |
| `accent-text` | `#1A1A1A` | Ink that sits on lime (dark on lime, never white). |
| `accent-dim` | `#5A8C00` | Lime that needs to pass contrast as text on white. |

**Sub-brand accents** (only on their own surfaces, never mixed with lime as equals):
- ALT-F4 / Team 7558 red: `altf4 #A11D1D`, `altf4-dim #7F1414`.
- Award/gold: `gold #F5C518`, `gold-dim #B8860B`.

**Rules.** Lime on dark or on white only. Never lime text on lime. Never pure black. One accent moment per viewport is the target; two is the ceiling.

## 4. Type

Three families, three jobs. Do not add a fourth.

| Family | Token | Role | Weights loaded |
|---|---|---|---|
| Orbitron | `font-display` | Impact: hero words, big numbers, brand marks. | 400–900 |
| Exo 2 | `font-heading` | Authority: all headings `h1`–`h6`, buttons, labels. Default heading font, weight 700. | variable |
| Raleway | `font-body` | Clarity: body copy, long text. Site default. | variable |

**Scale** (fluid, already defined as tokens):

| Token | Size | Line height | Tracking |
|---|---|---|---|
| `text-display` | `clamp(3.5rem, 8vw, 8rem)` | `0.9` | `-0.04em` |
| `text-h1` | `clamp(2.5rem, 5vw, 4.5rem)` | `1.1` | `-0.03em` |
| `text-h2` | `clamp(2rem, 4vw, 3.5rem)` | `1.1` | `-0.03em` |
| `text-h3` | `clamp(1.5rem, 3vw, 2rem)` | `1.1` | — |
| `text-body-lg` | `1.25rem` | `1.6` | — |
| `text-body` | `1rem` | `1.6` | — |
| `text-small` | `0.875rem` | — | — |
| `text-caption` | `0.75rem` | — | — |
| `text-label` | `0.6875rem` | — | `0.2em`, uppercase, 700 |

Prefer the `text-*-size` utilities (`text-display-size`, `text-h1-size`, `text-label-size`) which bundle size + line height + tracking correctly. Labels are always uppercase with mega tracking.

## 5. Layout and spacing

- Content max width: `1400px` (`content-width` utility). Narrow/reading width: `900px` (`narrow-width`).
- Horizontal page padding: `1.5rem`, applied by those utilities. Do not hand-roll gutters.
- Section rhythm is generous vertical space over dividers. Let white space separate, not lines.
- Scroll offset for the fixed nav is `5rem` (already set on `html` and `section`).

## 6. Components (match these, do not reinvent)

- **Buttons** (`Button.astro`): square (`rounded-none`), Exo 2, bold, uppercase, wide tracking, `active:scale-[0.97]`, 200ms. Variants: `primary` (lime fill, dark text), `outline` (border, fills to surface on hover), `outline-accent` (2px lime, inverts on hover), `ghost` (muted to primary). Sizes: `default`, `large`.
- **Section label** (`SectionLabel.astro`): short lime rule + number + dot + uppercase muted label, sitting above a section. This is how sections are introduced.
- **Cards**: `border border-border`, generous padding (`p-8`), hover lifts (`hover:-translate-y-1`) and borders go lime (`hover:border-accent`), 300ms. Square corners.
- **Code / rule tags**: dark block (`bg-surface-alt`) with lime monospace text, for stating a spec inline.

## 7. Motion

- **Easing:** `--ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`. This is the SHFT curve. Durations: `fast 200ms`, `normal 400ms`, `slow 800ms`.
- **Scroll reveals:** driven by GSAP (`src/scripts/animations.ts`). Elements start hidden and reveal in order of importance. Before GSAP is ready, a fallback in CSS forces them visible so nothing is ever stuck blank.
- **Ambient motion:** a small library of slow looping micro-animations that are core to the brand and always run, even on mobile and with reduce-motion (pulse dot, breathing rules, title shine sweep, staggered squares, letter-roll on hover). Keep these subtle. New ambient motion should be the exception, justified, and slow.
- **Interaction:** buttons press in (`scale 0.97`); links can roll per-character (`.text-roll`); the hero photo has a click-to-zoom camera push with no green overlay.
- Motion communicates confidence through crispness. Nothing bouncy, nothing springy, nothing slow-and-floaty.

## 8. Guardrails (the fast no list)

- No border-radius on structural elements. Squares. (Functional pills only: status dots, close buttons.)
- No pure black `#000`; use `#1A1A1A`.
- No lime as a background wash; it is an accent.
- No fourth typeface; no swapping the three roles.
- No gradients except the built-in title-shine sweep.
- No drop shadows as decoration; separation comes from space, borders, and dark blocks.
- No stock-photo filler. Use real team/robot photography or purpose-made imagery that matches this system.
- Copy rules still apply on every surface: no em dashes, no hype words, specific facts over adjectives, never invent numbers. Anything a parent, sponsor, or student will see must pass the shft-public gate.

## 9. References we build to beat

Linear (restraint, type scale, motion discipline), Vercel (white canvas + one accent, sharp edges), Stripe (density and hierarchy). When building a new surface, name the closest reference and beat it, do not just pass a linter.
