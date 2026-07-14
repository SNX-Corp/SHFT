---
name: deslop
description: >-
  Scrub AI slop from copy or design — find and rewrite everything that signals
  machine-generated content, in both writing and visual layout. Fire whenever
  Malhar says "this sounds AI", "does this sound AI", "remove the AI slop", "de-
  slop this", "it has the tell", "make it not look AI-generated", "sounds like
  ChatGPT", "make it sound human", "too polished / too corporate", or before
  shipping ANY outward-facing text or page he'll show real people. Pairs with
  /voice, which supplies the target voice; deslop is the remover. For SHFT
  public content, /shft-public gates on top of this.
---

# Deslop

Malhar's hard standard: nothing he ships should carry "the tell". He has been
burned publicly (Chief Delphi) for AI-sounding copy. Treat slop as a defect,
not a style preference.

## Writing tells — find and kill

- Em dashes. Always. Restructure the sentence; never substitute a hyphen.
- Stock AI vocabulary: elevate, delve, seamless, unlock, empower, leverage,
  robust, streamline, game-changer, cutting-edge, "in today's fast-paced world",
  "look no further", journey, tapestry, vibrant, dynamic.
- The "it's not X, it's Y" pivot, and symmetric triads ("faster, smarter,
  better") used as filler rhythm.
- Grand adjectives with no fact underneath. Replace with the concrete thing:
  "students build a working robot in week one" beats "an incredible hands-on
  experience".
- Perfectly parallel section structures where every bullet has the same shape.
- Hedged both-sides-isms and empty summaries ("Ultimately, ...").
- Emoji as section headers or bullet decoration in outward copy.
- Enthusiasm inflation: exclamation marks, "amazing", "we're thrilled".

## Design tells — find and kill

- Purple-blue gradient heroes, glassmorphism cards, floating 3D blobs.
- Generic icon-triplet feature rows ("Fast / Secure / Easy").
- Stock-photo energy: fake diverse teams pointing at laptops.
- Default shadcn/Tailwind look shipped unstyled (no brand, no typography care).
- Centered-everything landing pages with identical section rhythm.

## Procedure

1. Inventory: list every instance found, quoted, so Malhar sees what tripped it.
2. Rewrite copy through the /voice standard (his voice + the relevant brand
   profile). Every claim must be real; flag unverifiable ones with "VERIFY:".
3. For design, propose the specific replacement (reference the project's design
   system) rather than "make it cleaner".
4. Re-read the result once more as a hostile Chief Delphi reader; if any line
   could be screenshotted and mocked as AI-written, it's not done.
