# Maintaining Pstack for Codex

This repository distributes one Codex plugin. Original source is **only** `https://github.com/cursor/plugins`, subtree `pstack/`. `backnotprop/pstack` is a design reference, not an upstream dependency or merge target.

## Before changing anything

Read `UPSTREAM.json`, `UPSTREAM.md`, `PORT.md`, and the latest `UPDATES.md` entry. Inspect Git status, branch tips, and the user's requested scope. Preserve unrelated work. Repository maintenance does not require executing the bundled workflow skills, registering a marketplace, installing the plugin, or activating integrations.

## Branch contract

- `upstream` is a pristine, root-level snapshot of original `pstack/`; never add local fixes, dependencies, or this instruction file there.
- `main` is the integrated Codex package and marketplace source.
- `UPSTREAM.json.commit` identifies the original monorepo SHA. `snapshot_commit` and `snapshot_tree` identify the imported subtree in this repository. Record both accurately.
- Stage snapshots on `sync/pstack-<sha>` and integrations on `update/pstack-<sha>` in isolated worktrees, following `UPSTREAM.md`.
- The initial history bridge was a one-time connection of content already integrated. Never use an `ours` strategy merge to accept a new upstream update. Never force-push, squash away the upstream parent, or replace `main` with an upstream archive.
- Preserve published history. Keep upstream updates separate from unrelated customizations. Publish branches only within the user's authorized scope.

## Keep the customization surface small

Use `skills/poteto-mode/references/codex-runtime.md` for shared Codex behavior. Keep caller-specific instructions and executable fixes where needed; a runtime reference does not automatically override contradictory text or repair scripts. Do not rewrite unchanged skills merely to make a diff smaller.

Retain these contracts unless the user explicitly requests a change:

- Native delegation, supported model/effort validation, inheritance defaults, actual worker limits, and explicit worktree isolation.
- Project-local `.codex/pstack/models.json`; it is pstack configuration, not native Codex configuration.
- Real scheduler tools and recorded IDs for later wakeups, completion conditions, cancellation, and recovery. A polling process or skill text does not itself create persistent scheduling.
- User-defined authorization, scoped history, and honest labels for missing tool traces or independent reviews. Skill instructions cannot grant extra host permissions.
- Codex plan markers and conservative worktree handling, including paths with spaces and uncertain history.
- Stable `pstack-codex` plugin / `pstack-marketplace` catalog identities, `agents/openai.yaml` invocation policies, upstream attribution, and MIT license.

The marketplace discovers `skills/`; root `SKILL.md` is a direct-use entry. Do not imply every file under `automations/` is a discovered or active skill. Never edit the installed plugin cache to implement a source fix.

## Verification and update records

For provenance/history changes, run:

```bash
python3 scripts/check-upstream.test.py
python3 scripts/check-upstream.py
git diff --check
```

For upstream imports or executable script changes, also run in a writable test copy:

```bash
cd skills/poteto-mode/scripts
bun install --frozen-lockfile
bun run test
bun run typecheck
bash -n worktree-audit.sh
```

Run untouched upstream control checks before integrating a new release. Validate changed skills with the available skill-creator validator, parse metadata, check concrete relative links, and review new host-specific instructions. Test changed behavior, including unavailable-capability cases; do not claim live integration coverage from static checks.

Update source pins, local package version when warranted, `UPDATES.md`, `VALIDATION.md`, README/PORT counts, and the customization map in `UPSTREAM.md`. Historical per-version inventories are evidence of a particular integration, not a continuously regenerated manifest of every maintenance change.

Before publishing, verify the source snapshot is an ancestor of the integrated commit, the worktree is clean, and remote refs have not diverged. Keep both branch histories available. If something remains untested, say precisely what.
