# Explore: find the best current tools and references before building

Malhar wants premium output. Premium starts with knowing what the best looks like
RIGHT NOW and which tools the best people actually use. This skill is the research
harness you run BEFORE building any creative or technical surface: a video, a post
series, a page, a print piece, a pipeline. It operationalizes "copy the best,
invent the rest" and stops us from defaulting to whatever tool is already in hand.

Fire this skill when: starting a new kind of deliverable, the current toolchain
feels mediocre, Malhar says "make it premium / best quality / what's the best way
to do X", or more than ~3 months have passed since the last exploration of that
lane (this space moves fast; cached answers rot).

## The three questions every exploration answers

1. **Who does this best today?** Name 2-3 real references for this exact surface
   (brands, accounts, sites, videos). Study what makes them premium: type, spacing,
   pacing, restraint, motion. These become the taste gate for the build.
2. **What tools do the best people use right now?** Current-year answer, not
   training-data memory. Search fresh sources.
3. **What can WE run?** Filter by what is actually available in this session:
   MCP servers, open source we can run, budget Malhar has approved. A great tool
   we cannot access is trivia, not an option.

## The sweep (run lanes in parallel where independent)

Delegate mechanical lanes to subagents on cheaper models (haiku for list-gathering,
sonnet for assessment). Always inject worker-standards
(`.claude/skills/firstmate-captain/worker-standards.md`) into every worker prompt.
Keep the final judgment and the recommendation for the expensive model: tool choice
is taste plus constraints, not a checklist.

| Lane | How to search | What to bring back |
|------|---------------|--------------------|
| **Best-in-class references** | WebSearch for "[surface] best examples [current year]", awards sites, the design-system skill's reference library | 2-3 named references and WHY each is premium |
| **Open source** | GitHub search (stars, recent commits), "awesome-X" lists, WebSearch "[task] open source [current year]" | Repos with license, maintenance signal (last commit, issues), one-line honest fit |
| **Connected AI tools** | Inventory the session's MCP servers first (e.g. Higgsfield: run `models_explore` with action "recommend" for the actual goal). Then check ToolSearch for tools already wired in | What each can produce TODAY, cost per generation, quality ceiling |
| **AI generation market** | WebSearch current leaders for the specific modality (image, video, audio, 3D). Include OpenArt, Midjourney, Flux, Ideogram, Runway, Kling, Veo and whatever has emerged since | Which lead THIS quarter, API/MCP reachability, price |
| **Industry standards** | Official platform docs (Meta, YouTube, print vendors), current spec sheets | Exact specs: sizes, safe zones, formats, limits. Cite the doc |

## Rules that keep the research honest

- **Currency over memory.** Anything about "the best tool" answered from memory is
  stale by definition. Every recommendation needs a 2025+ source or a live check.
- **Verify the surprising.** One source is a rumor. Two independent sources is a fact.
  Anything unverifiable ships marked `VERIFY:`.
- **Honest assessments only.** One line per tool: what it is best at, what it costs,
  the catch. No hype words. A tool review that reads like the tool's own landing
  page is a failed review.
- **Access-check before recommending.** If the recommendation needs a paid account,
  an API key, or a spend, say so plainly. Spend is an escalation to Malhar, never
  a silent default.
- **Cache the findings.** Write results to `references/<yyyy-mm>-<topic>.md` inside
  this skill's directory, dated, so the next session starts warm. Trust a cached
  file only within ~3 months; after that, re-sweep.

## Output: the recommendation brief

End every exploration with a short brief Malhar can act on:

1. **The references.** 2-3 named best-in-class examples for this surface and the
   one thing each does that we should copy.
2. **The pick.** The recommended stack: best free/cheap path AND best premium path,
   with the concrete difference the premium buys.
3. **The plan.** What we build with it, first step, and what evidence will prove
   it worked (screenshot, render, live URL).
4. **Flags.** Anything that costs money, needs an account, or could not be verified.

Then build to beat the references, not to pass a linter. The exploration is only
done when its findings change what we make.
