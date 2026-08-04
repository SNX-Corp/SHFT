# SHFT ROBOTICS / The Showcase

A single-page "showoff" build that recreates every component, effect, and UI/UX trick
from [landonorris.com](https://landonorris.com) (built by OFF+BRAND), reskinned with the
SHFT Robotics brand.

## The stack it recreates

landonorris.com runs on Webflow with four ingredients doing the heavy lifting:

| landonorris.com | This page |
| --- | --- |
| GSAP + ScrollTrigger for scroll animations | GSAP 3.12 + ScrollTrigger, vendored |
| Lenis smooth scroll | Lenis 1.3, vendored |
| Three.js / WebGL for 3D and the liquid cursor mask | Three.js 0.160, vendored, two custom scenes |
| Rive for vector motion graphics | Scripted SVG loop emulating the Rive treatment |

No build step. Open `index.html` from any static server:

```bash
cd fable5-showcase
python3 -m http.server 8000
# open http://localhost:8000
```

## Trick list

1. **Preloader**: percentage counter, progress bar, wordmark reveal, green curtain lift.
2. **Custom cursor**: dot + lagging ring, grows over targets, contextual labels (DRAG / VIEW).
3. **WebGL liquid trail mask**: the signature LN effect. Pointer paints into a ping-pong
   framebuffer; a noise-warped threshold of that trail blends two procedural brand scenes
   with a green rim at the blob edge. Idle drift before the first pointer move.
4. **Hero intro**: hand-rolled SplitText, per-character staggered rise out of line masks.
5. **Velocity marquee**: infinite ticker, speed and skew driven by live Lenis velocity.
6. **Scrubbed text**: line-mask paragraph reveals plus an outline word that fills with
   signature green via clip-path scrub.
7. **Count-up stats**: numbers tween up once on enter.
8. **Three.js drag viewer**: extruded brand bolt with studio lighting, drag inertia,
   idle spin, float bob, and scroll-linked rotation (LN's helmet viewers).
9. **Pinned horizontal gallery**: section pins while the track scrubs sideways; card art
   parallaxes against track motion via `containerAnimation`; progress bar.
10. **Media reveals**: clip-path wipe-ins, inner scale parallax, grayscale-to-color hover.
11. **Interaction lab**: magnetic buttons, text scramble links, underline slides,
    Rive-style vector motion loop.
12. **Page transitions**: staggered triple-panel wipe with emblem flash on nav clicks.
13. **Fullscreen menu**: overlay with oversized staggered links.
14. **Data table**: row hover slide fill, semantic status chips (green / gold / red).
15. **Footer**: oversized wordmark scrubbing up from below the fold, magnetic socials.

Honors `prefers-reduced-motion`: preloader, smooth scroll, and scrubs are skipped.

## Brand

Everything follows the SHFT Robotics brand guide: signature green `#A6FF00` on near-black
`#1A1A1A`, Orbitron / Exo 2 / Raleway, square edges (`border-radius: 0`), dot-grid and
speed-slash patterns, official taglines. All media are procedural SVG placeholders in
brand style.
