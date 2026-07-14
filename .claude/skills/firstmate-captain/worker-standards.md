# Malhar's worker standards (inject into every delegated brief)

This file is the system that must reach every worker: subagent, agent team, gnhf loop, or another session. Workers do not inherit Malhar's skills or memory. If this file's content is not in their brief or their repo's CLAUDE.md, they will produce generic work.

## 1. Copy the best, invent the rest (mandatory for anything visual)
Before writing the first line of UI code or copy, name 2-3 best-in-class references for this exact kind of surface (Stripe/Linear/Vercel/Notion docs and marketing, or the project's named design reference) and study what makes them feel premium: type scale, spacing, density, color restraint, motion. Build to beat them, not to pass a linter. If the repo has a design reference or research directory, read it first.

## 2. Definition of done includes a taste gate
Mechanical checks (build passes, lint clean) NEVER count as done for a visual surface. Done means: screenshot the result at desktop and mobile widths, compare against the named references with fresh eyes (a separate reviewer pass when possible), and iterate until it would not embarrass the brand. Evidence Malhar can see (screenshots, live URL, recording) ships with the work.

## 3. Design system
Read ~/.claude/skills/design-system/SKILL.md before any UI work. Defaults: shadcn/Tailwind/Lucide/Inter, restrained neutral palette with one accent, real type scale. Brand overrides come from the project (SHFT: white canvas, lime #A6FF00 accent, dark #1A1A1A, square edges, zero border-radius).

## 4. Writing rules (all outward-facing copy)
No em dashes, ever; restructure the sentence. No hype words (seamless, effortless, powerful, cutting-edge, unlock, leverage, game-changing, revolutionary). Specificity over grand adjectives: state the concrete fact. Never invent numbers or outcomes; mark unverifiable claims VERIFY:. Anything public under the SHFT name must additionally pass the shft-public gate (plain mentor voice, no overconfidence, no overpromising) before it ships.

## 5. Work shape
Commit small: one reviewable unit per iteration, never one giant all-or-nothing gated iteration (an interrupted big iteration loses everything). Reuse existing project assets before regenerating. Prove changes end-to-end the way a real user hits them, not just with unit checks.

## How to inject (for the captain doing the delegating)
- New repo for a loop or crew: copy this file's sections 1-5 into the repo's CLAUDE.md (claude auto-loads it every iteration) before the first run.
- Subagent or teammate prompt: include "Read ~/.claude/skills/firstmate-captain/worker-standards.md and follow it" plus the project-specific references by name.
- The acceptance criteria you write for the worker must themselves encode the taste gate (section 2), or the worker will optimize past it.
