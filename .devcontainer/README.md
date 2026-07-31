# Running SHFT in a Codespace

A Codespace is a Linux machine GitHub runs for you. You reach it from your own
terminal over SSH, so it feels like a normal shell, but the work happens on
GitHub's hardware instead of your Mac.

This config installs Claude Code, the GitHub CLI, Node 22, and an SSH server,
then installs the site's dependencies.

## One-time setup

1. Give your local `gh` the Codespaces permission (it does not have it by default):

   ```
   gh auth refresh -h github.com -s codespace
   ```

2. Mint a long-lived Claude token on your Mac:

   ```
   claude setup-token
   ```

3. Save that token as a Codespaces secret named `CLAUDE_CODE_OAUTH_TOKEN` at
   <https://github.com/settings/codespaces>, scoped to this repository.
   Codespaces exposes it as an environment variable inside the machine, so
   Claude Code is signed in the moment the box starts.

   Codespaces secrets are separate from Actions secrets. Setting one does not
   set the other.

## Daily use

```
gh codespace create -r SNX-Corp/SHFT --idle-timeout 240m   # first time only
gh codespace list                                          # find the name
gh codespace ssh -c <name>                                 # get a shell
gh codespace stop -c <name>                                # stop paying for it
```

Inside the box, work exactly as you would locally: `claude`, `npm --prefix
website run dev`, git, gh.

Run Claude inside `tmux` so a dropped connection does not kill your session:

```
tmux new -s work        # start
tmux attach -t work     # reattach after reconnecting
```

## What this does and does not give you

**Does:** a real terminal on a machine that is not your laptop, with your own
`~/.claude`, so the statusline, the session-guard hook, and `/usage` all work
there the same as at home.

**Does not:** run overnight. The idle timeout maxes out at 240 minutes and is
driven by your *connection*, not by what is running inside the container. When
your laptop sleeps and the SSH connection drops, the Codespace stops, `tmux` or
no `tmux`. GitHub documents this as an interactive development environment, not
a place to park background jobs.

For genuinely unattended work, use one of these instead:

- **GitHub Actions** on a `schedule:` cron, with `anthropics/claude-code-action`.
  Six hours per job, no connection needed. Test a scheduled run before relying
  on it; there is an open bug where cron-triggered runs can fail auth.
- **Claude cloud routines** at <https://claude.ai/code/routines>, which run in
  Anthropic's cloud on a cron. Note that those transcripts stay server-side, so
  `/usage` will not see them.

## Cost

GitHub Pro includes 180 core-hours per month, roughly 90 hours on the 2-core
default. After that a 2-core machine is $0.18/hour. Compute stops billing when
the Codespace is stopped; storage keeps accruing until you delete it. Stopped
Codespaces are deleted automatically after 30 days by default.

Running Claude here costs the same tokens as running it at home. A Codespace
changes where the work happens, not what it costs.

## Rebuilds

`~/.claude` survives stopping and starting a Codespace, but a container
*rebuild* clears it. That is why the auth token lives in a Codespaces secret
rather than only in the container: after a rebuild, Claude Code signs itself
back in from the environment variable.
