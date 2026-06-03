# SHFT Robotics: Targeting + Tracking

## Geo radius

Recruitment is local. A teen has to physically get to your build space, so the radius is bounded by **commute, not interest**.

- **Core radius: 15 to 20 km** around `[FILL: city]` (or around your build/meeting location, which is the more honest center).
- **Reasoning:** ~20 km is the realistic edge of a parent-drives-or-transit commute for an after-school program. Beyond that, click cost stays the same but show-up rate collapses.
- **Tighten to 10 km** if `[FILL: city]` is dense (urban core) and you want only walkable / short-drive students.
- **Add named towns instead of widening the circle:** if there are 1 or 2 feeder towns just outside the radius with a high school but no robotics team, add them as separate pins rather than inflating the radius into empty farmland or another team's territory.
- **Avoid overlapping another established FRC team's school.** Recruiting against an entrenched team wastes spend.

**In Meta:** Location > Add location > drop pin on build space > set radius to 15 km > "People living in or recently in this location."
**In Google (if used):** Locations > radius target > 20 km > "Presence: People in or regularly in your targeted locations."

---

## UTM link scheme for shftrobotics.com

One consistent scheme so every click is attributable in GA4 / Meta. Lowercase, no spaces, hyphens or underscores only.

**Pattern:**
```
https://shftrobotics.com/?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=recruit_2026&utm_content=CONTENT
```

| Field | Values to use |
|-------|---------------|
| `utm_source` | `meta`, `instagram`, `facebook`, `google`, `flyer`, `qr` |
| `utm_medium` | `paid_social`, `cpc`, `organic`, `print` |
| `utm_campaign` | `recruit_2026` (one campaign name for the whole push) |
| `utm_content` | which ad: `parents_a1`, `teens_b3`, `rsa_local`, `story_video`, `infonight_flyer` |

**Ready-to-use links:**

```
# Meta, Parents audience, variant A1
https://shftrobotics.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=recruit_2026&utm_content=parents_a1

# Meta, Teens audience, variant B3
https://shftrobotics.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=recruit_2026&utm_content=teens_b3

# Instagram bio link / organic
https://shftrobotics.com/?utm_source=instagram&utm_medium=organic&utm_campaign=recruit_2026&utm_content=bio

# Google search RSA (local set)
https://shftrobotics.com/?utm_source=google&utm_medium=cpc&utm_campaign=recruit_2026&utm_content=rsa_local

# Printed flyer / poster QR code
https://shftrobotics.com/?utm_source=flyer&utm_medium=print&utm_campaign=recruit_2026&utm_content=infonight_flyer
```

**Notes:**
- Use a QR generator pointed at the `flyer` link for any printed poster at schools.
- Keep `utm_campaign=recruit_2026` identical everywhere so all spend rolls up to one number.
- Shorten links for print/bio with a free shortener if the raw UTM looks ugly, but keep the UTM on the destination.

---

## The 3 numbers to watch

Ignore vanity metrics (reach, impressions, likes). On a tiny budget, watch exactly these three:

### 1. Cost per signup (the only number that matters)
- **What:** total ad spend ÷ number of real signups / RSVPs.
- **Target:** under **$10 per signup** is good for local recruiting; under $5 is excellent. If it climbs past ~$20, pause and rework the creative or audience.
- **How to track:** requires a real conversion event. Easiest path: a simple RSVP form (Google Form, Tally, or a `/join` page) and count submissions, divide by spend. Wire a Meta Pixel "Lead" event to the form thank-you page so Meta optimizes toward it.

### 2. Link clicks (and link CTR)
- **What:** clicks to the site, and CTR (link clicks ÷ impressions).
- **Target CTR:** **above 1%** on Meta is healthy; below 0.7% means the creative or hook is weak. Swap the creative, not the audience, first.
- **Why:** this is your earliest signal, available within 24 to 48 hours, long before signups accumulate. It tells you if the ad is interesting.

### 3. RSVPs to the info night (the real-world conversion)
- **What:** actual count of people who say they are coming to `[FILL: info night date/time]` at `[FILL: info night location]`.
- **Target:** set a goal (e.g. 25 RSVPs to net ~12 to 15 show-ups to net a founding class). Recruiting attendance drops roughly half from RSVP to show-up; budget for that.
- **Why:** clicks and even signups are cheap talk. Butts in seats at the info night is the metric that decides whether the campaign worked.

**Weekly check-in (5 minutes):** spend, link CTR, signups, cost per signup, RSVP count. Shift budget toward the audience with the lowest cost per signup. That is the entire optimization loop.
