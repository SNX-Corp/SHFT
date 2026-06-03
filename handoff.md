# Team SHFT — Project Handoff

Everything needed to run, edit, and ship the Team SHFT website.

- **Live site:** https://shftrobotics.com
- **Repo:** `SNX-Corp/SHFT` (app lives in the `website/` subdirectory)
- **Host:** Vercel (project `teamshft`), domain on Vercel nameservers
- **What it is:** A single-page marketing site for Team SHFT, a new Ontario FRC (FIRST Robotics Competition) community team.

---

## 1. Tech stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | [Astro](https://astro.build) (static output) | 6.3.x |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | 4.3.x |
| Animation | GSAP + ScrollTrigger | 3.15.x |
| Fonts | `@fontsource` (Orbitron, Exo 2 Variable, Raleway Variable) | 5.2.x |
| Runtime | Node | >= 22.12 |
| Deploy | Vercel CLI (`vercel --prod`) | — |

No backend. No database. Everything renders to static HTML at build time.

---

## 2. Run it locally

```bash
cd website
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static build into website/dist/
npm run preview    # serve the production build locally
```

That is the whole loop. The site is static, so `npm run build` is the source of truth for what ships.

---

## 3. Project structure

```
SHFT-repo/
├─ vercel.json          # Vercel build config (builds the website/ subdir)
├─ handoff.md           # this file
├─ design-handoff.md    # brand / merch guide
└─ website/
   ├─ src/
   │  ├─ pages/
   │  │  ├─ index.astro       # the homepage (assembles every section)
   │  │  ├─ v2.astro          # dev mirror of the homepage (no preloader)
   │  │  └─ admin / brand / logos  # utility pages
   │  ├─ layouts/
   │  │  └─ BaseLayout.astro   # <head>, fonts, preloader slot
   │  ├─ components/
   │  │  ├─ Nav.astro          # nav + the morphing wordmark
   │  │  ├─ HeroCinematic.astro# the hero (video bg, wordmark, copy)
   │  │  ├─ Preloader.astro    # split-doors intro
   │  │  ├─ JoinModal.astro    # "Join SHIFT" contact popup
   │  │  ├─ Footer.astro
   │  │  ├─ SectionLabel.astro # the "01 · THE VISION" eyebrow
   │  │  ├─ RollText.astro     # per-letter rolling hover effect
   │  │  └─ parents/           # one component per page section
   │  │     ├─ Vision.astro        Mentor.astro       Partnership.astro
   │  │     ├─ Pricing.astro       WhatYouGet.astro   SeasonTimeline.astro
   │  │     ├─ Expectations.astro  FAQ.astro          Contact.astro
   │  ├─ content/
   │  │  └─ sections/          # ALL editable copy lives here (markdown)
   │  ├─ scripts/
   │  │  └─ animations.ts      # the GSAP reveal/scroll sequence
   │  └─ styles/
   │     └─ global.css         # design tokens (@theme) + utilities
   └─ public/
      ├─ images/logo/          # wordmark.png, wordmark-dark.png, bolt-mask.png
      ├─ images/maple-leaf.png # the crest
      ├─ images/parents/       # section background photos
      └─ videos/               # hero-left.mp4 + poster
```

---

## 4. Editing content (no code needed)

All copy is in **`website/src/content/sections/*.md`** (Astro content collections). Edit the frontmatter, save, and the section updates. One file per section:

| File | Section |
|------|---------|
| `hero.md` | Hero eyebrow, subtitle, partner/sponsor, CTA |
| `vision.md` | "Not just a team" + the 4 stats |
| `mentors.md` | Malhar + Noeen bios, quotes, credentials |
| `partnership.md` | ALT-F4 partnership + the EPA/rank stat card |
| `pricing.md` | "The Program" — how to join + what's included (price intentionally hidden) |
| `experience.md` | "What your child actually gets" — the 6 cards |
| `timeline.md` | The season timeline phases |
| `expectations.md` | What's asked of students + parents |
| `faq.md` | Q&A list |
| `contact.md` | Contact section + Join modal (name, email, phone) |
| `footer.md` | Tagline, footer nav links |
| `nav.md` | Top nav links + CTA |
| `marquee.md` | The scrolling highlight strip |

**CMS option:** a Decap/Sveltia admin is wired up at `/admin` (`public/admin/config.yml`) for editing the same markdown through a UI. It needs a Git-backed auth provider configured to write changes (see the auth setup notes in the repo).

### Current key facts (so they stay consistent)
- Tagline: **"Shift the standard."**
- Eyebrow: **"Ontario Community FRC Team"**
- Hero line: **"A new Ontario FRC team built to compete from day one."**
- Partner: **ALT-F4** (Team 7558) · Sponsor: **WCP**
- Mentors: **Malhar Soni** (Head Coach), **Noeen Kashif** (Lead Mentor)
- Contact: **team@shftrobotics.com**, **+1 (647) 878-6114** (the phone link opens a pre-filled SMS)
- Social: **Instagram @shftrobotics** (only social link)
- Pricing: the **$10k figure is deliberately hidden**. Section 04 talks about what's included + how to join; the fee is discussed when families meet.

---

## 5. Notable features / how the tricky bits work

- **Morphing wordmark (`Nav.astro`):** the SHIFT wordmark sits centered in the hero and, on scroll, rides up and docks into the nav as a small logo. It is rendered at full hero size and **scaled DOWN** to dock (so it stays crisp on retina screens). Width/height are set in JS in `measure()`; the morph runs in `update()` on scroll.
- **Preloader (`Preloader.astro`):** split-doors intro, homepage only. It measures the hero logo slot and lines its own logo up to the exact same spot before the doors open. Fires a `shft:reveal` event that starts the hero intro.
- **Hero video (`HeroCinematic.astro`):** full-bleed muted autoplay loop with a readability scrim. A poster `<img>` sits behind it; if autoplay is blocked (iOS Low Power Mode), the video hides and the poster shows (no tap-to-play control).
- **Animations (`scripts/animations.ts`):** GSAP reveal sequence + ScrollTrigger section reveals. Respects `prefers-reduced-motion`.
- **Join modal (`JoinModal.astro`):** the "Join SHIFT" button opens a contact card (email + pre-filled text). Copy-to-clipboard buttons included.

---

## 6. Design tokens (quick reference)

Defined in `website/src/styles/global.css` under `@theme`. Full brand detail is in `design-handoff.md`.

```
Accent (lime):  --color-accent       #A6FF00
                --color-accent-hover #8FE000
                --color-accent-dim   #5A8C00
                --color-accent-text  #1A1A1A   (dark text on lime)
Dark:           --color-surface-alt  #1A1A1A
                --color-text-primary #1A1A1A
Light:          --color-bg           #FFFFFF
                --color-surface      #F8F8F8
                --color-border       #E5E5E5
Text:           secondary #555555 · muted #737373 · inverse #FFFFFF
Partner accents: ALT-F4 #A11D1D · gold #F5C518

Fonts: display = Orbitron · heading = Exo 2 · body = Raleway
```

---

## 7. Deploy

Deploys are done from the **repo root** via the Vercel CLI (not auto-deploy from Git):

```bash
cd SHFT-repo
vercel --prod --yes
```

This builds the `website/` app and aliases the result to **shftrobotics.com** automatically. A deploy takes ~15–20s. After it finishes, hard-refresh (Cmd/Ctrl+Shift+R) to clear any cached HTML.

**Domain / DNS:** `shftrobotics.com` (and `www`) point to Vercel via custom nameservers `ns1.vercel-dns.com` / `ns2.vercel-dns.com` (set at the registrar). Vercel manages the records + SSL automatically. Nothing to touch unless the registrar changes.

> Note: commits are made locally and shipped via the CLI. The GitHub remote may sit behind the deployed state. `git push` when you want the remote in sync.

---

## 8. Gotchas worth knowing

- **iOS Low Power Mode** makes Safari report `prefers-reduced-motion` and blocks video autoplay. The hero handles both (logo stays visible, video falls back to its poster), but it is why the site looks "calmer" in Low Power Mode.
- **`scroll-behavior: smooth`** is global. Programmatic `scrollTo` animates; pass `behavior: 'instant'` when you need an immediate jump.
- **Scoped-CSS HMR:** editing a scoped `<style>` block can occasionally leave stale CSS in dev. If a style change isn't applying, restart the dev server (`lsof -ti:4321 | xargs kill -9; npm run dev`).
- **The logo is raster (PNG).** It renders crisp on screen, but for large-format print (merch, banners) you want vector. See `design-handoff.md`.
