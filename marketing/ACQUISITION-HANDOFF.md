# SHFT: Student Acquisition + Site + Sponsor Handoff

The plan to fill the founding roster and stand up the money side. This sits on
top of the existing `marketing/` kit (which handles the day-to-day social,
print, and Info Night content). This doc is the **strategy + the website build
spec + the sponsor program**. A developer can build from Parts 3 and 4. You can
run the campaign from Parts 2 and 5.

- **Goal:** a full founding cohort (target ~20 students) committed before the season, plus 1 to 3 real sponsors funding the robot.
- **The site is the closer.** Every ad, flyer, DM, and Info Night ends at shftrobotics.com. The new sections below exist to turn a curious visitor (or their parent) into an application.

---

## 1. The bet

We win by looking and behaving like an elite program *before* we have a trophy, and by selling the two things this audience actually buys: **a university edge** and **belonging to something selective and going somewhere.** We don't compete on "fun robotics club." We compete on outcomes, mentorship credibility (ALT-F4 + WCP), and scarcity (a founding cohort with limited seats).

Three levers do the work:
1. **Positioning:** premium, outcome-first, founding-member exclusivity.
2. **Proof:** real mentor track record, partner stats, a university-pipeline story.
3. **A funnel with a deadline:** events + a real application + a closing date.

---

## 2. Who we're winning (and where they are)

The existing PLAN.md has three personas (newcomer, builder, parent). For *this* push, sharpen on the two highest-yield ones and the channels that reach them.

### 2a. The high-achieving private-school student
Grade 8 to 11 at (or feeding into) academically intense schools. Already does competitive math/science, music, debate. Resume-aware early. Wants something that "counts" and signals seriously. Robotics that is *competitive* and *selective* reads as worth their time.

**Where:** their schools' STEM/robotics clubs and counselors, feeder middle schools, math contest circuits (CEMC/AMC), tutoring and enrichment centers (Spirit of Math, Kumon, RSM, local olympiad coaches), Instagram, and (for the cohort that lives there) Discord.

### 2b. The achievement-focused parent (often immigrant / STEM household)
Decides the time, the rides, and the money. Optimizes hard for **university admissions and skills**, trusts **structure, credentials, and other parents**, and is willing to invest in a real program. Skeptical of "a few teenagers winging it." Highly networked: a single convinced parent brings three more.

**What moves them:** the admissions edge (FRC alumni at MIT, Waterloo, U of T), the mentor pedigree, safety + structure + a clear schedule, the "founding cohort" exclusivity, and visible legitimacy (sponsors, partners, a polished site).

**Where:** parent WeChat / WhatsApp / KakaoTalk groups, **小红书 (RED / Xiaohongshu)**, community and faith orgs, tutoring-center bulletin boards and partnerships, and word of mouth. Reaching this parent is mostly **trust transfer through networks and centers**, not paid ads.

> Practical channel list for 2b is in Part 5. The single biggest unlock is **partnering with tutoring/enrichment centers and a few connected parents** who will forward you into their groups.

---

## 3. New website sections to build

Priorities: **P0** = build first (directly converts), **P1** = soon, **P2** = nice. Each is a section on the homepage unless it says "page." All inherit the existing design system (lime `#A6FF00` on black, Orbitron/Exo 2/Raleway, hard corners, the bolt motif). Build pattern matches the repo: one `parents/*.astro` component + one `src/content/sections/*.md` for copy, wired into `index.astro`.

### 3a. Open House / Info Night  ·  **P0**
The event is the conversion moment; the site sells the seat.
- **Content:** date/time/location, a one-line "what you'll see" (live robot demo, meet the mentors, how to join), a map/directions, "Save your seat" RSVP, and a fallback "can't make it? book a 1:1" link.
- **Build:** new `Events.astro` + `events.md`. RSVP is a form embed (Tally/Google Form) or a calendar link. Add a small **countdown** to the next Info Night (reuse the GSAP setup). Show "X seats left" if you want urgency.
- **Reuses:** `marketing/events/info-night-runofshow.md` and `slides-outline.md` for the night itself.

### 3b. Merch showcase with 3D rotating mockups  ·  **P1**
Merch is identity, walking advertising, and a soft revenue line. Make it feel like a drop.
- **Content:** the hero tee, the bolt sticker/patch, a hoodie, a cap. Each on a 3D mockup the visitor can spin/drag. A "Get notified / pre-order interest" capture (not a real store yet).
- **Build approach (recommended):** Google's **`<model-viewer>`** web component loading a `.glb` per item (a tee/hoodie/cap model with the SHFT print applied as a texture). It gives true drag-to-rotate + auto-spin with almost no code, lazy-loads, and is mobile-friendly. Source GLBs from a mockup tool (e.g., Blender, or a service that exports apparel GLBs) and bake the lime-on-black art on as a texture.
  - **Lighter fallback** if real GLBs are a lift: a **360° image sequence** (24–36 frames rendered once) that scrubs on drag, or a CSS 3D flip of flat front/back mockups. Looks 90% as good, far cheaper.
- **Spec it tasteful:** dark stage, one spotlight, the lime bolt catching the light as it turns. Pair with `marketing/merch/merch-specs.md` for what's actually printable.
- **Caution:** keep models small (<2–3 MB each) and lazy-load below the fold so it doesn't hurt mobile load.

### 3c. "Where this takes you": University Outcomes  ·  **P0 (this is the parent-closer)**
The single most persuasive section for the achievement parent. Make the admissions case explicit.
- **Content:** FRC as one of the most recognized STEM extracurriculars; alumni destinations (MIT, Waterloo Engineering, U of T, Stanford, Toronto Met, etc.); the portfolio + leadership + mentor-letter story; scholarship dollars FIRST awards annually (FIRST and its sponsors award tens of millions in scholarships, cite the current figure). University/word-marks as a logo wall (respect usage rules; "alumni attend" framing).
- **Build:** `Outcomes.astro` + `outcomes.md`. Stat tiles (Orbitron numbers) + a logo strip + 2–3 short proof lines. No fluff.

### 3d. Founding cohort / limited roster  ·  **P0**
Scarcity is the accelerant for this audience. Frame the first season as a one-time thing.
- **Content:** "20 seats. One founding class. Applications close [date]." A live-ish counter ("X of 20 spots claimed"), founding-member perks (name on the founding wall, founders' patch/merch, first pick of sub-team). 
- **Build:** can be a band inside the Apply or Open House section. The counter can be a hand-set number in markdown to start; automate later off the form.

### 3e. Proof & credibility wall  ·  **P1**
Tie the existing partnership stats into a "why believe us" block: ALT-F4 record + EPA/rank (already built), WCP sponsorship ("no rookie team has had WCP, before a season"), the mentor track record (nothing to top of Canadian FRC), pro-grade facility + tools. You have most of this; the move is to **cluster it as one credibility moment** rather than scattered.

### 3f. Parent hub + voices  ·  **P1**
A block (or a `/parents` page) that speaks directly to the parent: safety + supervision, the weekly schedule, the time commitment in real numbers, "what other parents ask," and the outcomes. Add 2 to 3 short testimonials (mentor/alumni/parent) as you collect them. This is where the WeChat-forwarded parent lands and gets reassured.

### 3g. The Application (real funnel, not just the contact modal)  ·  **P0**
Right now "Join SHFT" opens a contact card. For a cohort, you want an actual **application/RSVP**: name, grade, school, interest area, parent contact. A short form signals selectivity ("apply," not "sign up") which *helps* with this audience.
- **Build:** `/apply` page (or modal) embedding a Tally/Google Form. Wire a "Lead" event so you can measure cost per application. Keep the existing pre-filled SMS as the low-friction backup.

### 3h. Countdown / momentum  ·  **P2**
A slim countdown to Info Night or applications-close, reusable site-wide (nav ribbon or hero footer). Cheap urgency.

---

## 4. Sponsor page + the package

A dedicated page at **`/sponsor`** (or `/partners`). This is a sales asset, so it should feel like the most confident page on the site. Goal: get a company to email for a custom deal, or pick a tier.

### 4a. Why a company sponsors us (the pitch, top of the page)
Lead with what *they* get, not what we need:
- **Audience + talent:** a room full of future engineers and the affluent, education-investing families and schools around them. For engineering/tech firms, this is an **early talent pipeline** (interns, co-ops, future hires).
- **Credibility by association:** ALT-F4 + WCP already back us; a sponsor joins a serious, vetted program, not a gamble.
- **STEM / community / ESG story:** fund Ontario STEM education, get a clean, photogenic impact story and content.
- **Tax treatment:** if/when registered as a non-profit/charity or under a school umbrella, sponsorships may be tax-receiptable. (Confirm status; state it plainly.)
- **Visibility:** the robot, the jersey, the pit, the events, the site, and a fast-growing social account.

Put 3 to 4 stat tiles here: cohort size, hours/season of engaged STEM time, events + audience reached, social + site reach. Use real numbers as they exist; mark projections as projections.

### 4b. The tiers ("crazy good" = dense value + a clear ladder)
Name them on-brand (energy theme). Suggested ladder, each tier inherits everything below it. Prices are placeholders for you to set against your real robot budget.

| Tier | ~Price | What they get (adds to the tier below) |
|------|--------|----------------------------------------|
| **Spark** | $250–500 | Name on the website partners wall + a thank-you social post. Tax receipt (if eligible). |
| **Circuit** | $1,000 | Logo (not just name) on the site + the pit banner. A quarterly social feature. Info Night mention. |
| **Surge** | $3,000–5,000 | **Logo on the robot** + the team jersey/shirt. A dedicated branded Reel/post. A named station or award at events. End-of-season impact report. |
| **Powerhouse (Title)** | $10,000+ | Presenting partner: **"SHFT, presented by [Company]"** lockup. Top logo placement everywhere. Speaking slot + a company "Engineering Day" / shop tour. First access to the student talent pool for internships. Custom everything. |

Add a **"Build a custom package"** lane for in-kind (tools, materials, machine time, mentorship, space) and for companies that want one specific thing (e.g., name the practice field). In-kind is often easier to land than cash.

### 4c. What the money funds (make it concrete + honest)
A simple breakdown so a sponsor sees their dollars become a robot: competition robot, FRC/district registration, tools + equipment, parts + materials, facility, food during build, robot transport, coaching. (This is the same "what's included" list already on the site, reframed as "what your sponsorship builds.")

### 4d. Page structure (build spec)
`/sponsor` page (new route, not on the homepage nav primary, but linked from footer + a hero CTA on that page):
1. Hero: "Power the next generation of Ontario engineers." + a "Become a partner" CTA.
2. Why sponsor + the impact stat tiles (4a).
3. Current partners: ALT-F4 + WCP lockups (you already have these).
4. The tier table (4b) with a highlighted recommended tier.
5. "What your sponsorship builds" (4c).
6. Custom / in-kind lane.
7. Close: a contact block (the existing Join modal pattern, but routed to a sponsor inbox) + a **downloadable one-page PDF deck** for them to forward internally.
- **Build:** `src/pages/sponsor.astro` + `src/content/sections/sponsor.md`. Reuse Nav/Footer. The PDF deck can be a print-styled HTML page exported to PDF (same trick as the `marketing/print/*.html` files).

---

## 5. The acquisition engine (channels for this audience)

The kit's social/print/events content feeds these. What's specific here is *where* to push for the private-school + achievement-parent segment.

| Channel | Move | Why it works here |
|---------|------|-------------------|
| **Tutoring / enrichment centers** | Partner with Spirit of Math, RSM, Kumon, local contest coaches. Flyer on their board, a forward into their parent list, a guest "intro to robotics" slot. | These centers *are* the audience, pre-aggregated and trusting the center. Highest-leverage single move. |
| **Private + feeder schools** | Email STEM teachers, counselors, principals (templates in `events/school-outreach-emails.md`). Offer an Info Night or a lunch demo. Target schools with weak/no robotics. | You become the serious option their school lacks. Counselors forward "university-strengthening" programs. |
| **Parent networks (WeChat / WhatsApp / RED)** | Give 3 to 5 connected founding parents a ready-to-forward blurb + the site link + the Info Night. Post the outcomes story on **小红书/RED**. | Trust transfers through the network far better than ads. One parent = several. |
| **Math/science contest circuits** | Show up where AMC/CEMC/olympiad kids are. Sponsor or table a local contest. | Same kid, already competitive and resume-aware. |
| **Instagram / TikTok** | Run the existing `social/` calendar. Lead reels with "no experience needed" + "what this does for university." | Reaches the student directly; parents check the grid for legitimacy. |
| **Referral** | The kit's referral mechanic (`events/referral.md`). A founding-member who brings a friend gets a perk. | Multiplies the warmest source. |
| **Paid (optional, $150/$500 tiers)** | Geo + interest Meta/IG ads to parents in target postal codes; retarget site visitors. Only on a budget tier. | Fills the top of the funnel where networks don't reach. |

**The funnel, end to end:** Reach (centers, schools, networks, social) → Believe (the site: outcomes, proof, partners) → Apply (the `/apply` form) → Show up (Info Night) → Commit (founding seat, before the close date).

---

## 6. Build roadmap

Sequence so each thing you ship moves the funnel.

**Phase 1. Make the site close (P0):**
1. The Application (`/apply` + form + lead tracking).
2. Open House / Info Night section (date + RSVP + countdown).
3. University Outcomes section.
4. Founding-cohort / scarcity band.

**Phase 2. Credibility + money (P1):**
5. Proof & credibility wall (cluster the existing partner stats).
6. Parent hub + first testimonials.
7. **Sponsor page** + the tier package + the downloadable deck.

**Phase 3. Delight + identity (P1/P2):**
8. Merch showcase with 3D mockups.
9. Countdown ribbon, momentum polish.

Each ships independently. If I'm building, I'd do Phase 1 in one pass (it's the same component/content pattern repeated), then the sponsor page, then the 3D merch (the only piece with real new tech).

---

## 7. Decisions needed from you (so the build isn't blocked)

- **Info Night:** date, time, venue + address. (Blocks 3a and the whole funnel.)
- **Applications close date** + the real seat target (20?). (Blocks 3d.)
- **Form tool:** Tally vs Google Form vs a custom embed. (Blocks 3g.)
- **Sponsor tier prices** + whether you're a registered non-profit/charity (for the tax-receipt line) + the sponsor inbox email. (Blocks Part 4.)
- **Outcomes proof:** any real alumni destinations / scholarship figures you can cite, or do we use FIRST's published program-wide numbers (cited as such).
- **Merch fidelity:** true 3D GLBs vs a 360 image-sequence vs flat mockups (cost/effort tradeoff).
- **Target school + center list:** the 5 to 10 you actually want to hit first.

---

*Companion docs: `PLAN.md` (8-week playbook), `README.md` (the kit map), `merch/merch-specs.md` + `merch/vector-plan.md` (production), `events/` (Info Night), `../design-handoff.md` (brand), `../handoff.md` (how the site is built + deployed).*
