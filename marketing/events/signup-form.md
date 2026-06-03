# SHFT Interest / Signup Form + Paper Sign-In Sheet

Two things here: the exact fields for a Google Form (digital signup + QR code on the slide), and a paper sign-in sheet layout for the info night table.

---

## Part 1: Google Form (digital signup)

**Form title:** Join SHFT Interest Form
**Form description:**
> Shift the standard. SHFT is a new Ontario FRC team built to compete from day one. Drop your info and we'll save you a spot. No experience required. @shftrobotics · https://shftrobotics.com

### Fields

| # | Field label | Type | Required | Options / notes |
|---|-------------|------|----------|-----------------|
| 1 | Student first name | Short answer | Yes | |
| 2 | Student last name | Short answer | Yes | |
| 3 | Student email | Short answer | Yes | Validate as email |
| 4 | Student phone (optional) | Short answer | No | For text reminders |
| 5 | Grade / year | Multiple choice | Yes | 8 · 9 · 10 · 11 · 12 · Other |
| 6 | School | Short answer | Yes | |
| 7 | Parent/guardian name | Short answer | Yes | |
| 8 | Parent/guardian email | Short answer | Yes | Validate as email |
| 9 | Parent/guardian phone | Short answer | Yes | |
| 10 | What are you most interested in? | Checkboxes | Yes | Build / CAD · Programming · Electrical · Strategy / Scouting · Media / Outreach · Not sure yet |
| 11 | Any experience? (totally fine if none) | Multiple choice | Yes | None yet · A little · Some · A lot |
| 12 | How did you hear about SHFT? | Multiple choice | No | Info night · A friend · Teacher / school · Instagram · Flyer · Other |
| 13 | Referred by (friend's name) | Short answer | No | Powers the referral mechanic (see referral.md) |
| 14 | Can we add you to our updates list? | Multiple choice | Yes | Yes · No |
| 15 | Anything you want to ask us? | Paragraph | No | |

### Form settings
- Collect email addresses: On (verified)
- Limit to one response: Off (let families submit for multiple kids)
- Confirmation message:
  > You're in. We'll be in touch with the next steps. First meeting is [FILL: date]. See you there. @shftrobotics
- Send responses to a connected Google Sheet so the team can follow up fast.
- Generate a QR code from the live form link and put it on Slide 10 and the table tent.

---

## Part 2: Paper sign-in sheet (info night table)

Print landscape. One line per person. Keep it dead simple so the line moves. Print several copies.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  SHFT INFO NIGHT SIGN-IN                        Shift the standard.   @shftrobotics         │
│  Date: ____________   ·   Prefer digital? Scan the QR code at the table.                    │
├────┬───────────────────┬──────────┬──────────────┬───────────────────┬─────────────────────┤
│ #  │ Student name      │ Grade    │ School       │ Email             │ Parent phone        │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 1  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 2  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 3  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 4  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 5  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 6  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 7  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 8  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 9  │                   │          │              │                   │                     │
├────┼───────────────────┼──────────┼──────────────┼───────────────────┼─────────────────────┤
│ 10 │                   │          │              │                   │                     │
└────┴───────────────────┴──────────┴──────────────┴───────────────────┴─────────────────────┘
   Optional last column to add by hand: "Referred by". Write the friend's name (see referral.md)
```

**Table workflow:** push everyone to the QR/digital form first (it captures parent info and feeds the sheet automatically). The paper sheet is the backup for anyone without a phone or in a hurry. At the end of the night, type any paper entries into the Sheet so nobody falls through the cracks.
