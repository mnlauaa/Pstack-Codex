# Updating from original pstack

The only upstream is [cursor/plugins](https://github.com/cursor/plugins), subtree `pstack/`. We borrow the untouched-baseline branch pattern from `backnotprop/pstack`; its content and history are not dependencies. Read [AGENTS.md](AGENTS.md) before updating.

## Branches and source identity

- `upstream` contains only the original `pstack/` subtree, at repository root. No Codex files, generated dependencies, or local fixes belong there.
- `main` contains the integrated Codex plugin and its documentation. It is the marketplace distribution branch.
- `sync/pstack-<short-sha>` stages a new pristine snapshot; `update/pstack-<short-sha>` integrates it with the port. Use disposable worktrees for both.
- [UPSTREAM.json](UPSTREAM.json) records the **original monorepo commit** in `commit`, and the **local subtree snapshot commit/tree** in `snapshot_commit` / `snapshot_tree`. These are different identities. It records the baseline integrated into `main`, not merely the newest downloaded source.

`upstream` is a branch in this repository, not a remote pointing to the full Cursor monorepo. Fetching Cursor's `main` directly into it would import the wrong directory layout.

The one-time 2026-10-13 history bridge connected the already-integrated 0.15.21 baseline without changing the package tree or rewriting published commits. See [the history record](docs/upstream-history.md). **Never repeat an `ours` strategy merge for new upstream content:** it would silently mark unported changes as integrated.

## 1. Preflight and resolve a source

```bash
git status --short --branch
git fetch origin
git log --oneline --left-right main...origin/main
git log --oneline --left-right upstream...origin/upstream
python3 scripts/check-upstream.py
```

Preserve dirty work and reconcile branch divergence before starting. A fresh clone may need `git branch --track upstream origin/upstream`. Do not reset a user's checkout. Inspect any CI/deployment configuration before promotion. This package currently has no checked-in deployment workflow.

Check original releases/tags. Prefer a suitable stable release; if none exists, pin the selected original `main` commit. Record the full 40-character SHA, version, date, archive SHA-256, and actual signature-verification status. Do not describe an unsigned main snapshot as a verified release.

```bash
# Replace this placeholder with the resolved original commit.
next_sha='REPLACE_WITH_FULL_ORIGINAL_SHA'
upgrade_dir="$(mktemp -d /tmp/pstack-update.XXXXXX)"
curl --fail --location "https://codeload.github.com/cursor/plugins/tar.gz/$next_sha" -o "$upgrade_dir/next.tar.gz"
shasum -a 256 "$upgrade_dir/next.tar.gz"
tar -tzf "$upgrade_dir/next.tar.gz"
```

Verify the archive's global PAX `comment` equals `next_sha` before extraction:

```bash
python3 - "$upgrade_dir/next.tar.gz" "$next_sha" <<'CHECK'
import re, sys, tarfile
assert re.fullmatch(r'[0-9a-f]{40}', sys.argv[2]), 'Expected full source SHA'
with tarfile.open(sys.argv[1]) as archive:
    assert archive.pax_headers.get('comment') == sys.argv[2], 'Source SHA mismatch'
CHECK
mkdir "$upgrade_dir/next"
tar -xzf "$upgrade_dir/next.tar.gz" -C "$upgrade_dir/next" --strip-components=2 "plugins-$next_sha/pstack"
```

Inspect the member list first; extract only the expected subtree. Check `next/.cursor-plugin/plugin.json`. Never fetch instructions from a moving branch during a run.

## 2. Create the pristine snapshot

The following replacement is safe only inside the newly created disposable upstream worktree. Never run it against `main`, a consumer project, or an installed plugin cache.

```bash
short_sha="${next_sha:0:12}"
git worktree add -b "sync/pstack-$short_sha" "$upgrade_dir/raw" upstream
rsync -a --delete --exclude .git "$upgrade_dir/next/" "$upgrade_dir/raw/"
git -C "$upgrade_dir/raw" diff --stat
git -C "$upgrade_dir/raw" add --all
git -C "$upgrade_dir/raw" diff --cached --stat
git -C "$upgrade_dir/raw" commit --allow-empty   -m "Import original pstack at $next_sha"   -m "Original-Commit: $next_sha"   -m 'Original-Path: pstack'
snapshot_commit="$(git -C "$upgrade_dir/raw" rev-parse HEAD)"
snapshot_tree="$(git -C "$upgrade_dir/raw" rev-parse HEAD^{tree})"
```

An empty commit is appropriate when the selected original monorepo commit did not change pstack. Check file bytes, executable modes, additions, and deletions against the extracted source. `--delete` is necessary here to record upstream deletions; it is prohibited on the integrated port. Do not add Codex instructions to the snapshot.

Run the upstream control in another copy so test dependencies cannot enter the snapshot:

```bash
cp -R "$upgrade_dir/next" "$upgrade_dir/control"
(cd "$upgrade_dir/control/skills/poteto-mode/scripts" && bun install --frozen-lockfile && bun run test && bun run typecheck)
```

Read the new `package.json` first in case its checks changed. Record baseline failures separately from port regressions.

## 3. Merge into the Codex port

```bash
git worktree add -b "update/pstack-$short_sha" "$upgrade_dir/port" main
git -C "$upgrade_dir/port" merge --no-ff --no-commit "$snapshot_commit"
```

Conflicts are expected where upstream and Codex changed the same behavior. Inspect `git diff --name-only --diff-filter=U` in the port worktree. Preserve the contracts below while incorporating new upstream behavior. Do not blanket-select either side, use `-s ours`, or apply `-X ours`. Review clean merges too, including deleted files and upstream packaging changes.

The existing `.cursor-plugin/plugin.json` is intentionally absent on `main`; keep it absent after resolving modify/delete conflicts. Keep the local root `plugin.json` identity when upstream changes its own manifest. Keep ordinary scripts identical to upstream unless an explicit Codex contract requires a patch.

Use [the latest integration inventory](docs/upstream-0.15.29.tsv) as context. The current customization diff is `git diff <integrated-snapshot-commit> HEAD`, not the original first-port diff. Keep future Codex-only changes in focused commits, with shared tool rules in `codex-runtime.md` rather than repeated across skills. Skill references and script changes still need explicit integration; installing a second plugin is not an override mechanism.

## Codex customization contracts

| Area / paths | Disposition and required behavior |
|---|---|
| `.agents/plugins/marketplace.json` | Retain the Codex marketplace catalog, its stable `pstack-marketplace` name, and its local source path to the package root. |
| `SKILL.md`, `agents/openai.yaml`, `plugin.json` | Retain the `pstack-codex` entry and local package identity. Review upstream packaging changes without replacing these files. Keep `.cursor-plugin/plugin.json` out of the port. |
| `skills/*/SKILL.md`, `skills/*/agents/openai.yaml` | Adapt upstream behavior. Preserve lowercase names, Codex-compatible frontmatter, `$skill` examples, and existing invocation policies. Keep the runtime-contract link. For new explicit-only upstream skills, express that existing policy in `agents/openai.yaml`. |
| `skills/poteto-mode/references/codex-runtime.md` | Retain native delegation, supported models/efforts and optional speed controls, slot limits, explicit writer isolation, scoped history, durable run paths, scheduling IDs, recovery, cancellation, and task authorization. |
| `skills/setup-pstack/SKILL.md` and role instructions | Retain project-local `.codex/pstack/models.json`, separate model/effort values, inheritance defaults, and validation against actual supported models. Do not import provider-specific defaults. |
| Main mode and role prompts | The receiving chat owns the playbook. Delegates receive role text and scope; Markdown filenames are not registered agent types. Independent same-model review is labeled honestly. |
| Autonomous/PR/orchestration playbooks | Retain real Codex heartbeat scheduling, completion conditions, cancellation and resume state. Opening or watching a PR does not itself authorize merging or external messaging. Preserve pinned leases, single-writer replacement/handoffs, and verification on the code that lands; never reload a moving trunk playbook mid-run. |
| Recall, reflection, evaluation, and investigation | Keep scoped Codex evidence and non-Git fallbacks. A digest cannot prove tool calls. Do not restore Cursor transcript paths or assume read-only task scope removes MCP tools. |
| `scripts/check-plan.mjs` and its fixtures | Keep `installed-playbook:` and `hourly-audit` markers. Port parser fixes independently of Cursor's `git show origin/main:` and `/loop 1h` markers. |
| `scripts/worktree-audit.sh` | Keep full paths containing spaces, explicit `PSTACK_TRANSCRIPT_DIR`, and `review-history` rather than `safe` when history needs review. Preserve base selection and fail on invalid refs. Both Origin draft/open and GitHub open PRs must remain held; unavailable forge/history evidence cannot authorize removal. |
| `skills/sharpen/` | Preserve explicit-only invocation and prompt-rewrite-only behavior; user choices and constraints remain binding. |
| Formal-verification skills | Keep explicit invocation, project-local skill authoring, isolated negative-control mutations, honest bounds and empirical-vs-formal labels, and blocked/draft results for unavailable verifiers. |
| `docs/harness/claude-code.md` | Archived upstream reference only; Codex uses its own runtime binding, never the Claude skip rules or global config paths. |
| Benny / bot entrypoints and archived references | Keep integrations conditional on actual connectors/backends. Archived Cursor instructions remain reference material, not active setup. |
| `scripts/orch/`, `scripts/watch-pr/`, `bun.lock`, ordinary references | Prefer unchanged upstream code where no Codex behavior differs. Bring dependent interfaces, callers, fixtures, and tests over together. |

All `scripts/` entries above are relative to `skills/poteto-mode/` unless a full path is shown. The full per-file source disposition for this update is in [the inventory](docs/upstream-0.15.29.tsv). It records the previous, new, and integrated file hashes. Documentation files are identified there without self-referential hashes. Use hashes to confirm what was copied exactly; they are evidence of this update, not a restriction on later local edits.

## 4. Validate and record the integration

In the port worktree:

1. Update `UPSTREAM.json` with original SHA/version/archive hash/date/signature status and the candidate `snapshot_commit` / `snapshot_tree`. Preserve the previous original SHA in `previous_commit`.
2. Set `plugin.json.version` and `UPSTREAM.json.local_version` to the integrated original `UPSTREAM.json.version`; update README/PORT counts and provenance. Do not continue the former independent 0.2.x numbering. Same-version upstream changes and Codex-only maintenance retain that version and are distinguished by commit pins and dated update records. A blocked candidate must not cause main to advertise an upstream version it has not integrated.
3. Add a dated entry to `UPDATES.md`: new behavior, retained adaptations, superseded patches, intentional omissions, and limitations.
4. Run the relevant script checks below, validate skill frontmatter and YAML/JSON, check relative links, and review newly introduced Cursor tool names, model IDs, paths, or `/loop` instructions. Archived examples and explicit negative examples can be intentional.
5. Record real results in `VALIDATION.md`. Do not claim scheduler, installation, cloud, or UI behavior was exercised unless it ran. Keep dated inventories historical; generate a new one for each integration. When upstream changes without a version bump, suffix the new inventory with the original short commit SHA.

```bash
(cd skills/poteto-mode/scripts && bun install --frozen-lockfile && bun run test && bun run typecheck && bash -n worktree-audit.sh)
python3 scripts/check-upstream.test.py
git diff --check
git add <reviewed-paths>
git commit
python3 scripts/check-upstream.py
```

Run these from the port worktree; replace `<reviewed-paths>` with actual paths. The ancestry check runs **after** the merge commit because `HEAD` must include the imported snapshot. The checker verifies recorded provenance and ancestry, not byte equivalence to the remote archive or runtime correctness; archive comparison and behavioral checks remain necessary.

## 5. Promote without losing ancestry

Review the completed branch diff, then verify the original `main` did not move or acquire unrelated changes. Integrate it using the repository's normal review flow. Preserve the upstream merge ancestry: do not squash or rebase away the snapshot parent. If `main` has advanced, merge the new `main` into the candidate and repeat affected checks.

For the current direct-push workflow, from the clean main checkout:

```bash
git switch main
git merge --ff-only "update/pstack-$short_sha"
git merge-base --is-ancestor upstream "$snapshot_commit"
git branch -f upstream "$snapshot_commit"
python3 scripts/check-upstream.py
git merge-base --is-ancestor upstream main
git push --atomic origin main upstream
```

Move `upstream` only after checking its old tip is an ancestor of the candidate; `git merge-base --is-ancestor upstream "$snapshot_commit"` must succeed. The local `branch -f` only advances that verified ref, never rewrites published ancestry. Do not force-push. If the atomic push is rejected because either remote branch moved, fetch and reconcile rather than overwriting it. Publish only when authorized by the task.

Remove disposable worktrees with `git worktree remove` after inspecting untracked files. Do not delete user work to force cleanup. Keep backup refs until the updated plugin has been used successfully.

Rollback on a published branch uses a reviewed revert or restoration commit after preserving newer user changes. Keep provenance truthful: reverting runtime content does not remove merge ancestry, so a later retry must explicitly reapply reverted changes. Never reset or force-push shared `main` as the normal rollback path.
