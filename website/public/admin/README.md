# SHFT Editor — Setup Guide

This is a one-page guide for getting `yoursite.com/admin` working so you and Noeen can edit copy live.

## How it works (the 30-second version)

- The editor lives at `/admin` on the live site (e.g. `https://teamshiftfrc.com/admin/`)
- You log in with **GitHub**
- You see a sidebar with every section (Hero, Vision, Mentors, FAQ, …)
- Click a section → edit text → hit **Save**
- Sveltia commits the changes to GitHub on the `main` branch
- Vercel detects the commit → rebuilds the site → live in ~30 seconds
- The **public site stays identical** — only the words change

---

## ONE-TIME SETUP (Malhar does this)

### 1. Add a `redirect.html` for OAuth callback
Already done — the script handles it.

### 2. Create a GitHub Personal Access Token (PAT)
Sveltia uses GitHub's modern fine-grained tokens. You'll do this once and store it.

1. Go to: https://github.com/settings/personal-access-tokens/new
2. Token name: `SHFT Sveltia CMS`
3. Resource owner: `SNX-Corp`
4. Expiration: `90 days` (you'll renew quarterly)
5. Repository access: **Only select repositories** → pick `SHFT`
6. Permissions → **Repository permissions**:
   - **Contents:** `Read and write`
   - **Metadata:** `Read-only` (auto-selected)
7. Click **Generate token**
8. **Copy the token** — you only see it once

> Alternative: classic PATs work too. If you prefer those, scope = `repo`.

### 3. Add yourself + Noeen as repo collaborators
Sveltia commits as the logged-in user, so each editor needs write access to the repo.

1. Go to https://github.com/SNX-Corp/SHFT/settings/access
2. **Invite a collaborator** → add Noeen's GitHub username
3. Role: `Write` (or `Maintain` if you want her to also manage settings)

### 4. Deploy
Just push the new `public/admin/` folder and the content collection refactor to GitHub. Vercel auto-deploys.

```bash
git add .
git commit -m "Add Sveltia CMS at /admin"
git push origin main
```

That's it. The editor is now live at `https://teamshiftfrc.com/admin/`.

---

## HOW NOEEN LOGS IN

1. Go to `https://teamshiftfrc.com/admin/`
2. Click **Sign in with GitHub Token** (Sveltia shows this on first visit)
3. Paste her PAT (see "Create a PAT" steps above — Noeen makes her own)
4. The token stays in her browser's local storage — she only does this once per device

> If GitHub OAuth (the "Sign in with GitHub" button without pasting tokens) is preferred, that requires deploying a small OAuth proxy. Skip for now — PAT auth works fine.

---

## EDITING WORKFLOW

1. Open `/admin/`
2. Sidebar shows all sections — pick one (e.g. "FAQ")
3. Edit any field
4. Click **Save** (top right)
5. Sveltia commits to `main` immediately
6. Vercel's build webhook fires
7. Site updates in ~30 seconds
8. Refresh `yoursite.com` to verify

Sveltia shows a "Publishing…" indicator while Vercel is rebuilding.

---

## EDITING LOCALLY (no internet / pre-launch)

For local-only editing without hitting GitHub, you can use Sveltia's local backend:

```bash
# In config.yml, temporarily change:
backend:
  name: github         # change to: test-repo
  repo: SNX-Corp/SHFT  # ignore in local mode
```

Or run `npx @sveltia/cms-proxy-server` and switch the backend to `proxy`. Not needed for production.

---

## TROUBLESHOOTING

**"Failed to load entries"**
- Your PAT expired or doesn't have `Contents: Write` on this repo.
- Generate a new one, re-paste on login.

**"Cannot commit"**
- The branch is set to `main` in `config.yml`. Confirm that matches your default branch.
- Confirm Noeen has `Write` access to the repo (not just `Read`).

**Site doesn't update after save**
- Vercel might be paused or have a build error. Check the Vercel dashboard for the SHFT project.
- The commit is on GitHub — you can always pull and inspect manually.

**Edit broke the site**
- Every save is a git commit. `git revert` it, push, you're back.
- Or use GitHub's web UI to roll the file back to a previous version.

---

## SECURITY NOTES

- The PAT is stored in **the editor's browser localStorage** — never in this repo
- Anyone who can reach `/admin/` and has a valid PAT can edit. Treat the URL like a back-office page.
- If you want to gate the URL itself, add a Vercel password protection rule on `/admin/*` (Vercel → Project → Settings → Deployment Protection).
- All edits are tracked as git commits — full audit trail under your username.

---

## WHAT'S EDITABLE

Every text string on the homepage:
- Hero (eyebrow, 3 headline lines, subtitle, both CTAs)
- Marquee (scrolling items list)
- Vision (headlines, paragraphs, 4 stat boxes)
- Mentors (both Malhar + Noeen — bios, quotes, credentials, can add a 3rd mentor)
- Partnership (intro + 6 cards)
- Pricing (everything — price, steps, cost breakdown, transparency note)
- Experience (intro + 6 cards)
- Timeline (intro + 6 season phases)
- Expectations (students + parents columns)
- FAQ (all questions and answers — can add/remove)
- Contact (eyebrow, headlines, CTA, 3-step process)
- Nav (links + CTA)
- Footer (tagline, links)

**Not editable via the admin** (intentionally — these are layout, not content):
- Colors / fonts / spacing
- Photos (yet — can add image fields when ready)
- Section order
- Animations
