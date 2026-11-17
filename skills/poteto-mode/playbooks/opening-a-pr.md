### Opening a PR

Use when the requested delivery includes a PR. Read-only investigations and local-only changes do not publish merely because a playbook ended.

Explicitly create or reuse an isolated worktree from the intended base, with one writer per branch. Preserve unrelated work and inspect the actual branch and diff. Prepare small, landable commits; do not rewrite published or shared history without the existing authorization. Run the Codex runtime cleanup pass before commit and **no-comments** before review. Apply **technical-writing** and **unslop** to the title, body and commit messages.

Title: `type(scope): subject`, naming a real symbol when it carries the change. Body: a one-minute briefing at most 40 lines with these `##` headings in order, dropping empty ones: `Why`, `What changed`, `Scope`, `Tradeoffs` (only rejected alternatives a reviewer would ask about), `Blast Radius`, `Verification`. Link long logs and tables rather than pasting them.

Stack only follow-ups that depend on another PR, targeting its base branch; independent work branches from trunk. Use the run's supported PR tool when available. Otherwise use `gh pr create`, or `origin pr create --status open` when Origin's CLI resolves the repository. Keep one forge for the run. Open ready by default (`draft: false` where supported); honor the user's explicit draft requirement. Verify the created PR's actual status and attach its URL through the available Codex artifact tool.

Opening a PR does not start a babysit or authorize a merge. Return the URL and continue the requested work. Autopilot owners follow the babysit assignment already in their brief; other runs babysit only when asked.
