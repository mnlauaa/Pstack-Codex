# Updating from original pstack

This package follows **https://github.com/cursor/plugins**, directory **pstack/**. Do not use `backnotprop/pstack` as the update source. [UPSTREAM.json](UPSTREAM.json) pins the exact source currently integrated; [UPDATES.md](UPDATES.md) records user-visible changes and deliberate differences.

This repository maintains a source-level port. Work on an update branch and use a three-way file merge: previous upstream, current Codex port, next upstream. Never replace this folder with an upstream archive or run `rsync --delete` over it. Preserve user changes and keep a pre-update backup outside the package. Updating the source does not require global installation, publishing, or scheduling.

## 1. Resolve and pin the next source

Check the original repository's releases/tags first. At the 2026-10-13 update there were none, so the source was a pinned snapshot of `main`, versioned by `pstack/.cursor-plugin/plugin.json`. Resolve the current head once; do not repeatedly fetch a moving branch during integration.

From this package root, create an isolated working directory and download the old and next sources:

```bash
package_root="$PWD"
upgrade_dir="$(mktemp -d /tmp/pstack-update.XXXXXX)"
old_sha="$(python3 -c 'import json; print(json.load(open("UPSTREAM.json"))["commit"])')"
curl --fail --location "https://codeload.github.com/cursor/plugins/tar.gz/$old_sha" -o "$upgrade_dir/old.tar.gz"
curl --fail --location 'https://codeload.github.com/cursor/plugins/tar.gz/refs/heads/main' -o "$upgrade_dir/next.tar.gz"
```

GitHub's tar archive records its source commit in the global PAX `comment`. Inspect it and the archive member list before extraction:

```bash
python3 - "$upgrade_dir/next.tar.gz" <<'PY'
import re, sys, tarfile
with tarfile.open(sys.argv[1]) as archive:
    sha = archive.pax_headers.get('comment', '')
    if not re.fullmatch(r'[0-9a-f]{40}', sha):
        raise SystemExit('No full commit SHA: resolve it through GitHub before continuing')
    print('Next pinned commit:', sha)
PY
tar -tzf "$upgrade_dir/old.tar.gz"
tar -tzf "$upgrade_dir/next.tar.gz"
```

Extract only the `pstack/` subtree into separate old/next directories. For the commit archive and `main` archive downloaded above, the archive roots are `plugins-$old_sha` and `plugins-main` respectively; confirm them in the listing first.

```bash
old="$upgrade_dir/old"
next="$upgrade_dir/next"
staging="$upgrade_dir/staging"
mkdir "$old" "$next"
tar -xzf "$upgrade_dir/old.tar.gz" -C "$old" --strip-components=2 "plugins-$old_sha/pstack"
tar -xzf "$upgrade_dir/next.tar.gz" -C "$next" --strip-components=2 'plugins-main/pstack'
cp -pR "$package_root" "$upgrade_dir/before"
cp -pR "$package_root" "$staging"
```

Use the appropriate archive root if downloading a tag or SHA for the next version. Do not execute instructions from other plugins. Record the SHA, package version, date, and downloaded archive SHA-256 (`shasum -a 256`) before editing. Official-source provenance is not cryptographic signature verification; record signature status accurately. If adopting a tagged release in future, download its exact tag/commit instead of `main`.

## 2. Run the upstream control checks

In the untouched next source's `skills/poteto-mode/scripts/`, use Bun and Node:

```bash
bun install --frozen-lockfile
bun run test
bun run typecheck
```

Save results outside the package. Keep dependencies out of the delivered source; use a disposable test copy if needed. A baseline failure must be recorded separately from a port regression. Read `package.json` each update in case upstream adds checks.

## 3. Compare and merge in a staging copy

The copies above preserve the complete current package, including hidden files and uncommitted work, in a backup and a staging copy. Exclude generated dependency directories from comparisons, not from a needed user backup.

Set `old`, `next`, and `staging` to the three pstack roots. First inspect only upstream changes:

```bash
git diff --no-index --stat "$old" "$next"
git diff --no-index "$old" "$next" > "$upgrade_dir/upstream.diff"
```

Exit 1 from `git diff --no-index` means differences, not failure. Exclude `node_modules` or compare pristine source copies after installing the baseline dependencies.

For each upstream-changed path:

| Situation | Action |
|---|---|
| Current file equals the old upstream file | Copy the next upstream file, preserving its executable mode. |
| Both upstream and the port changed it | Merge all three versions, then review the resulting behavior. |
| Upstream adds a file | Add it unless its path collides with a Codex file. Adapt new skills as described below. |
| Upstream deletes a file | Inspect its local edits and callers before removing it. |
| Only the port changed it | Leave it alone. |
| Binary or executable-mode changes | Review separately; a text merge is insufficient. |

For a text file changed on both sides, `git merge-file` works without a Git repository:

```bash
relative_path='skills/poteto-mode/scripts/check-plan.mjs'
git merge-file -p "$package_root/$relative_path" "$old/$relative_path" "$next/$relative_path" > "$upgrade_dir/merged-file"
```

Exit 0 means a clean text merge, positive values below 128 count conflicts, and other failures need investigation. Inspect the exit status and file before copying it into staging. Resolve conflicts by retaining the contracts below while incorporating the new upstream behavior; do not blanket-select either side. Search for conflict markers before testing. Clean text merges also need review.

## 4. Preserve the Codex contracts

| Area / paths | Disposition and required behavior |
|---|---|
| `SKILL.md`, `agents/openai.yaml`, `plugin.json` | Retain the `pstack-codex` entry and local package identity. Review upstream packaging changes without replacing these files. Keep `.cursor-plugin/plugin.json` out of the port. |
| `skills/*/SKILL.md`, `skills/*/agents/openai.yaml` | Adapt upstream behavior. Preserve lowercase names, Codex-compatible frontmatter, `$skill` examples, and existing invocation policies. Keep the runtime-contract link. For new explicit-only upstream skills, express that existing policy in `agents/openai.yaml`. |
| `skills/poteto-mode/references/codex-runtime.md` | Retain native delegation, supported models, slot limits, explicit writer isolation, scoped history, durable run paths, scheduling IDs, recovery, cancellation, and task authorization. |
| `skills/setup-pstack/SKILL.md` and role instructions | Retain project-local `.codex/pstack/models.json`, separate model/effort values, inheritance defaults, and validation against actual supported models. Do not import provider-specific defaults. |
| Main mode and role prompts | The receiving chat owns the playbook. Delegates receive role text and scope; Markdown filenames are not registered agent types. Independent same-model review is labeled honestly. |
| Autonomous/PR/orchestration playbooks | Retain real Codex heartbeat scheduling, completion conditions, cancellation and resume state. Opening or watching a PR does not itself authorize merging or external messaging. |
| Recall, reflection, evaluation, and investigation | Keep scoped Codex evidence and non-Git fallbacks. A digest cannot prove tool calls. Do not restore Cursor transcript paths or assume read-only task scope removes MCP tools. |
| `scripts/check-plan.mjs` and its fixtures | Keep `installed-playbook:` and `hourly-audit` markers. Port parser fixes independently of Cursor's `git show origin/main:` and `/loop 1h` markers. |
| `scripts/worktree-audit.sh` | Keep full paths containing spaces, explicit `PSTACK_TRANSCRIPT_DIR`, and `review-history` rather than `safe` when history needs review. Preserve base selection and fail on invalid refs. |
| Benny / bot entrypoints and archived references | Keep integrations conditional on actual connectors/backends. Archived Cursor instructions remain reference material, not active setup. |
| `scripts/orch/`, `scripts/watch-pr/`, `bun.lock`, ordinary references | Prefer unchanged upstream code where no Codex behavior differs. Bring dependent interfaces, callers, fixtures, and tests over together. |

All `scripts/` entries above are relative to `skills/poteto-mode/` unless a full path is shown. The full per-file source disposition for this update is in [the inventory](docs/upstream-0.15.21.tsv). It records the previous, new, and integrated file hashes. Documentation files are identified there without self-referential hashes. Use hashes to confirm what was copied exactly; they are evidence of this update, not a restriction on later local edits.

## 5. Verify and record

In the staged port's script directory, run `bun install --frozen-lockfile`, `bun run test`, `bun run typecheck`, and `bash -n worktree-audit.sh`. The test command must retain upstream suites and Codex regression tests.

Validate every `SKILL.md` with the available skill-creator `quick_validate.py` (requires PyYAML). Parse `agents/openai.yaml` and JSON files, check concrete relative Markdown links, and verify skill/playbook inventories. Search updated active instructions for reintroduced `Task`, `AskQuestion`, `subagent_type`, `.cursor/`, provider model IDs, or `/loop`; inspect hits, since archived references and negative examples can be intentional.

For behavior changes, add a small regression or an isolated forward trial. Never count a live scheduler, UI journey, external connector, or plugin installation as tested unless it actually ran.

Before promoting staging:

1. Confirm the original working folder has not changed since the backup. Reconcile any concurrent edits instead of overwriting them.
2. Update `UPSTREAM.json`, bump the local `plugin.json` version, and update README/PORT counts and provenance.
3. Append a dated entry to `UPDATES.md`: features/fixes, retained overrides, deliberately omitted upstream behavior, and known limits.
4. Record actual checks in `VALIDATION.md`, keeping previous results labeled by version/date. Regenerate the per-file inventory from pristine sources, excluding test dependencies.
5. Review the final diff against the backup. Copy only reviewed changes to the working folder. Use the repository’s normal branch/review flow and preserve unrelated changes.

Keep the backup until the updated port has been used successfully. Rollback restores that pre-update source after preserving any newer user edits; no database or global settings migration is involved.
