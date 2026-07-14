# SHFT — team site + brand (Astro, ~/SHFT-repo). White canvas, lime #A6FF00, dark #1A1A1A, square edges. ALL outward-facing content MUST pass the shft-public skill gate before shipping.

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

