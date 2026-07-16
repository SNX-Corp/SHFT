# Social Content Tooling Research — SHFT (July 2026)

Cached exploration output. Trust within ~3 months of the date above; after that, re-run the sweep.

## 1. Template-based static graphics at scale

**Satori + @vercel/og (resvg for PNG)** (https://github.com/vercel/satori) - converts JSX/HTML+CSS to SVG then rasterizes; no headless browser needed, renders in 50-200ms and works in edge runtimes - free, open source (MIT) - source: vercel.com/blog, July 2026 comparisons
**Puppeteer/Playwright screenshot pipelines** - full CSS/JS support since it's real Chromium, but Chromium adds ~50MB and is 5x slower than Satori per render - free, open source - source: dev.to/geoffrich.net July 2026
**Polotno SDK** (https://polotno.com/sdk/pricing) - embeddable Canva-style editor plus a programmatic API to generate/mutate designs from data (bulk personalization, template automation) - $199/mo for 10,000 editor loads, up to 90% discount for bootstrapped/small teams - source: polotno.com pricing page, March 2026
**Penpot** (https://github.com/penpot/penpot) - open-source Figma-alternative, self-hostable, SVG/CSS-native, now ships an MCP server so an AI agent can read a design system and generate matching assets - free/self-hosted - source: github.com/penpot, March 2026 (45K+ stars, v2.14.1)
**Canva** (https://canva.com) - fastest path for non-designers; huge template library and Brand Kit, but templates read as generic unless heavily customized - free tier, Pro ~$13/mo/user - source: multiple 2026 comparisons (coldiq.com, illustration.app)

What serious small brands actually do in 2026: most non-technical teams standardize on Canva for daily output and lock a Brand Kit to enforce fonts/colors; teams with a developer on hand build a Satori/vercel-og pipeline for anything templated at volume (stat cards, match-result graphics, roster cards) because it's faster and free to run at scale once built. Figma stays for the master design system, exported into Canva or into code.

## 2. Short-form video / Reels

**Remotion** (https://remotion.dev) - React-based programmatic video; renders via headless Chromium so any CSS/SVG/web font works; best for data-driven or templated video at volume - free for individuals/teams of 3 or fewer, Company license from $100/mo (4 seats) - source: remotion.dev/docs/license, 2026
**Motion Canvas** (https://motioncanvas.io) - true open source (unlike Remotion's source-available license), Canvas 2D renderer, built for hand-choreographed vector animation rather than data-driven video - free - source: remotion.dev/docs/compare, 2026
**CapCut** (https://capcut.com) - free mobile/desktop editor purpose-built for native short-form (Reels/TikTok/Shorts): auto-captions, trending effects, 1080p free export - free tier robust; Pro $9.99/mo, new Pro $19.99/mo adds 4K + full AI toolkit - source: top50aitools.com, 2026
**Descript** (https://descript.com) - transcript-based editing, strongest for repurposing longer talking-head footage into clips, not built for from-scratch social edits - free (60 min/mo), Hobbyist ~$16/mo, Creator ~$24/mo (4K, 30 hrs) - source: 2026 pricing comparisons

For a small team without a video editor on staff, CapCut is the practical daily driver. Remotion is worth it only if someone on the team codes and the team wants repeatable templated video (e.g., auto-generated match recap videos from a results feed).

## 3. AI image/video generation leaders (mid-2026)

**Ideogram v3** (https://ideogram.ai) - the clear leader for text-in-image (roughly 90-95% legible text accuracy per third-party tests vs ~30-40% for Midjourney); best fit for posters, headline graphics, and anything with team name/score overlaid - paid tiers - VERIFY: exact current pricing
**Flux 1.1 Pro** (Black Forest Labs) - strongest for photoreal imagery/photography-style shots, weak at in-image text like most models - available via multiple API resellers (OpenArt, Replicate-style platforms) - source: 2026 model comparisons
**Midjourney v7** - best for art-directed, cinematic, emotional imagery; not reliable for text-in-image; web/Discord-based, no first-party API - subscription-based - source: 2026 comparisons
**Higgsfield** (https://higgsfield.ai) - bundles image, video, 3D, audio, and marketing-studio generation with a virality predictor and reframe/outpaint/upscale tools; reachable directly via MCP in Malhar's Claude sessions (confirmed July 2026: generate_image, generate_video, reframe, remove_background, upscale tools all present) - Starter $15/mo (200 credits) up to Ultra $99/mo annually (3,000 credits) - source: higgsfield.ai/pricing, 2026
**OpenArt** (https://openart.ai) - aggregator giving one login/API to 100+ models (Flux, Ideogram v3, SDXL, Sora 2, Kling) plus its own editing suite (inpaint, background replace, upscale) - Essential $14/mo up to Wonder $240/mo; API access requires Pro tier ($36/mo, $24/mo annual) - source: openart.ai/pricing, 2026
**Kling 3.0** - cheapest credible video-gen with audio included (~$0.084-0.10/sec), strong multi-angle subject consistency, good for character-driven short-form - self-serve API via resellers (e.g., ModelsLab), no waitlist - source: buildmvpfast.com, July 2026
**Veo 3.1** - best lip-sync and native audio generation, native 4K, but gated by region/account tier via Vertex AI / Gemini API - ~$0.75/sec standard tier - source: modelslab.com, 2026
**Runway Gen-4.5** - best creative-control tooling (video-to-video, motion controls) but enterprise waitlist for direct API access, no native audio - ~$0.15-0.20/sec - source: crazyrouter.com, May 2026

No single model wins everything. The practical split for SHFT: Ideogram for anything with team branding/text baked into the image, Flux or Higgsfield for photoreal/action shots, and Kling (cheapest) or Higgsfield's bundled video for short animated clips. Higgsfield is already wired into Malhar's sessions via MCP.

## 4. Instagram/Facebook publishing and scheduling

**Meta Business Suite** - the free native scheduler tied directly to the Page/Instagram professional account; requires converting to a Business or Creator account (free, instant, reversible) - free - source: developers.facebook.com, 2026
**Instagram Graph API (direct)** - official programmatic path; only works with Business/Creator accounts; Advanced Access (needed for most publishing scopes) requires Meta App Review, business verification, and a screencast walkthrough; rate limit scales with account size, so small accounts get a small allowance - free but gated by approval - source: developers.facebook.com/docs/instagram-platform, elfsight.com, May 2026 (v21.0)
**Postiz** (https://github.com/gitroomhq/postiz-app) - open source (AGPL-3.0), self-hostable, ships its own MCP server and REST API/SDK, supports Instagram, Facebook, and ~30 other networks - self-hosted free; cloud Standard $29/mo (5 channels) up to $99/mo - source: github.com, v2.21.7 April 2026 (29.8K stars)
**Buffer** (https://buffer.com) - simplest flat per-channel pricing ($5/channel/mo), free tier exists, no self-hosting or MCP option - source: socialchamp.com, 2026
**Later** - killed its free plan; Starter now ~$18.75/mo - source: postfa.st, 2026

Every tool sits on the same underlying constraint: Meta's Graph API approval and business verification, which is the real bottleneck regardless of scheduler. VERIFY: current Meta App Review turnaround time.

## 5. Industry standard specs for 2026

- **Reels and Stories (IG + FB):** unified as of a March 2026 Meta update into a single 9:16 safe zone spec. Canvas 1080x1920 (or 1440x2560 high-density). Keep critical content out of the top ~14% (~358px), bottom ~20-35% (~512-896px; treat the full 35% as unsafe since caption length varies), and ~6% each side (~87px). Source: billo.app, zeely.ai, March 2026 Meta update.
- **Instagram feed/carousel:** Meta now recommends 4:5 portrait (1080x1350) over 1:1 square; portrait uses roughly a third more mobile screen. Carousels: all slides share the first slide's aspect ratio; max 20 slides; max 30MB static; sRGB, JPEG 85-90 or WebP. Grid preview center-crops 4:5 posts to 3:4 (1012x1350 visible), so keep faces/text/logos centered. Source: inro.social, overvisual.com, 2026.
- **Facebook feed:** broadly follows the same Meta-unified specs. VERIFY: some third-party guides cite slightly different Facebook feed pixel dimensions; check Meta's official spec page before locking a template.

## Recommended stack for SHFT

**Free/cheap path:** Canva Pro with a locked Brand Kit (lime #A6FF00, dark #1A1A1A, Orbitron/Exo 2/Raleway) for day-to-day graphics; CapCut free for Reels; Postiz self-hosted for scheduling once the Meta Business account is set; Ideogram for graphics needing legible baked-in text (VERIFY: current tier pricing). The repo's existing HTML templates (`marketing/social/*.html`) stay valid as a zero-cost pipeline.

**Premium path:** Figma design system feeding a Satori/vercel-og pipeline for templated stat/roster/match cards (near-zero marginal cost once built); Higgsfield subscription (already reachable via MCP) covering image, video, upscale, reframe in one bundle; Remotion (free under its 3-person threshold, which likely covers SHFT) for auto-generated recap video; Postiz cloud if self-hosting is unwanted.

Both paths hit the same gate before automated posting works: Meta Business/Creator account conversion plus Graph API app review. Manual posting through Meta Business Suite needs no approval and works today.
