# Validation of pstack-codex 0.2.4 — 2026-10-20

Original pstack 0.15.28 at `ddf824aff1e55ba14bd666b30bce3fc69962abe6` changes 26 subtree paths. PAX identity and archive SHA-256 were checked. The pristine imported snapshot matches the archive's 172 files and executable modes; signatures were not verified.

- Untouched upstream control: **68 Bun tests**, 246 assertions, zero failures; watcher strict TypeScript and shell syntax checks passed.
- Integrated port: **68 Bun tests + 4 Node tests**, zero failures; watcher strict TypeScript and shell syntax checks passed.
- **3 provenance regression tests passed**. Integrated source ancestry is checked after the ordinary merge commit.
- Skill-creator validation passed for **60 skill entrypoints**; **61 YAML files, 5 JSON files, and 340 concrete relative links** validated. No conflict markers remain.
- Reviewed new skills for unavailable verifiers, isolated negative controls, blocked sync commits, bounded proof claims, empirical fallback labels, existing user work, and product-fix scope. Setup only offers the workflow; it does not install tools or run verification on its own. These are instruction reviews, not end-to-end generated verifier trials.
- Reviewed clean merges and host conflicts. Codex runtime, model schema, executable scripts, lockfile, and marketplace catalog remain unchanged. Claude mapping instructions are labeled archived reference and are not used as Codex runtime behavior.

No live formal verifier, generated project skill, plugin installation, scheduler, external service, or UI journey was exercised. Temporary test dependencies are not bundled. See [the inventory](docs/upstream-0.15.28.tsv) for per-file source dispositions.

---

# Validation of pstack-codex 0.2.3 — 2026-10-16

Original commit `99743e9c151c8537cbbf1f98bb38f34ef3368453` changes 12 pstack paths while retaining upstream version 0.15.25. All **169 pristine source files and executable modes** match the downloaded archive. PAX commit identity and archive SHA-256 were checked; signatures were not verified.

- Untouched upstream control: **68 Bun tests**, 246 assertions, zero failures; strict watcher TypeScript and shell syntax checks passed.
- Integrated port: **68 Bun tests + 4 Node tests**, zero failures; strict watcher TypeScript and shell syntax checks passed.
- **3 provenance regression tests passed**; integrated ancestry is checked after committing the ordinary merge.
- Skill-creator validation passed for **58 skill entrypoints**; **59 YAML files, 5 JSON files, and 321 concrete relative links** validated. No conflict markers remain.
- Reviewed every upstream change, including clean merges. Seven conflicts preserve Codex packaging, invocation metadata, skill syntax, and worker-slot/model bindings while incorporating the changed engineering guidance. The shared runtime, model setup, scheduling, integrations, executable scripts, dependency lock, and marketplace catalog are unchanged.
- Behavioral checks include the existing unavailable-forge and missing-scheduler-marker cases. New text was reviewed for legitimate-state guards, observable test effects, stale-state evidence, and preserved permission boundaries; no new host capability is introduced.

This is instruction/metadata review plus executable regression coverage, not a live agent workflow trial. Plugin installation, scheduling, external services, and UI behavior were not exercised. Dependencies remained in temporary writable copies. See [the per-file inventory](docs/upstream-0.15.25-99743e9c151c.tsv).

---

# Validation of pstack-codex 0.2.2 — 2026-10-15

Original pstack **0.15.25** at `850d7f2e9f5e55dff7eb00a0a479337fe79eb22f` changes 42 paths from 0.15.23, including the new sharpen skill and executable forge changes. The pristine snapshot `ceea2de5498da4b7796ca6e0c64bce1b36ff8ae0` matches all **169 source files** and executable modes from the archive. Archive PAX identity and SHA-256 were checked; signatures were not verified.

- Untouched upstream control: **68 Bun tests passed**, 246 assertions, zero failures; strict watcher TypeScript and shell syntax checks passed.
- Integrated port: **68 Bun tests + 4 Node tests passed**, zero failures; strict watcher TypeScript and shell syntax checks passed. Locked dependencies stayed in temporary writable copies.
- The existing worktree fixture now also exercises GitHub fallback, Origin precedence and draft PR holds, and unavailable forges. Paths with spaces, dirty-file preservation, explicit/fallback bases, invalid refs, and missing-history protection remain covered. A new assertion initially used the remote column rather than the PR column; correcting the fixture index made the check pass without changing production behavior.
- **3 provenance regression tests passed**. Source ancestry and local version are checked after the merge commit, before publication.
- **58 skill entrypoints, 59 YAML files, 5 JSON files, and 318 concrete relative links** validated with the skill-creator validator and metadata/link checks.
- Reviewed changed instruction paths for native delegation, explicit/inherited model settings, unavailable speed/scheduler/verifier behavior, user authorization, pinned package instructions, isolated writer replacement, and single-writer state. This is instruction review, not a live agent trial.
- Original orchestration and watcher changes are retained unchanged. The worktree audit retains only its existing Codex path/history adaptations; its forge behavior is upstream's. The Bun lockfile and license are unchanged.

No live plugin installation, scheduler, cloud worker, UI journey, GitHub/Origin PR mutation, or external integration was exercised. Forge tests use fixture CLIs; they do not establish compatibility with every live forge/version. No global settings or installed caches were changed. See [the inventory](docs/upstream-0.15.25.tsv) for per-file provenance.

---

# Validation of pstack-codex 0.2.1 — 2026-10-14

Original pstack **0.15.23** at `5108b719a7aa484ef1a9781f587c7bbeac793f92` was compared against the prior pristine snapshot: 10 changed paths, including one new skill. The integrated port uses ordinary merge ancestry; eight conflict paths were resolved by preserving Codex contracts and incorporating the reviewed original changes.

- Untouched upstream control: **63 Bun tests passed**, 232 assertions, zero failures; strict watcher TypeScript check passed.
- Integrated port: **63 Bun tests + 4 Node tests passed**, zero failures; strict TypeScript and shell syntax checks passed.
- Provenance checker regression suite: **3 tests passed**. The integrated snapshot ancestry is checked after committing the merge.
- All **57 skill entrypoints**, 58 YAML files, and JSON metadata validated; concrete relative links resolved after correcting a ketchup link during validation.
- Reviewed the new explicit-only skill, read-only ketchup behavior, package-relative delegate fallback, and preservation of the shared runtime contract. Metadata validation is not a live behavioral trial.
- Original archive identity was checked using its PAX commit; source hash is in `UPSTREAM.json`. The imported snapshot is verified against the extracted source, including file modes. Signature verification was not performed.

Tooling and dependencies stayed in temporary writable test copies; no global installation or settings changes occurred. Live agent delegation, plugin installation, scheduling, external integrations, and visual catch-up rendering were not exercised. Existing executable scripts and the lockfile did not change.

---

# Maintenance structure validation — 2026-10-13

The runtime remains pstack-codex 0.2.0 / original pstack 0.15.21. This change introduces Git ancestry, maintenance documentation, and a read-only provenance checker.

- All **167** imported upstream file blobs and executable modes matched the previously pinned original archive. Archive SHA-256 and PAX commit matched `UPSTREAM.json`; signatures were not checked.
- The one-time history bridge preserved the complete prior main tree. Exact commits/trees are in [the history record](docs/upstream-history.md).
- A disposable clone accepted a synthetic future upstream change through a normal merge and preserved the Codex runtime contract. The documented isolated-worktree copy reproduced the original tree, removed a stale file, and preserved the worktree's `.git` link.
- `python3 scripts/check-upstream.test.py`: **3 tests passed**, including five mismatched-provenance/version cases and rejection of an unmerged snapshot.
- `python3 scripts/check-upstream.py`: integrated baseline verified.
- All **56** skill entrypoints and YAML/JSON metadata validated; concrete relative Markdown links resolved. `git diff --check` passed.
- Runtime paths (`skills`, `agents`, `automations`, `assets`, root skill/manifest, and LICENSE) remain unchanged from the published pre-bridge tree. Existing runtime suites were not rerun for this maintenance-only change; their prior results are retained below.

No plugin installation, live scheduling, external workflow, or new upstream release was tested in this change. No global Codex settings were modified. The provenance checker needs the recorded snapshot in local Git history; use a full clone or fetch the missing history before running it.

---

# Validation of pstack-codex 0.2.0

Checked on 2026-10-13 on macOS against original pstack **0.15.21**, commit `fe53d9e9093dbb9ae298563b1a9d702dd6e2ca08`. The source identity is recorded in [UPSTREAM.json](UPSTREAM.json). Validation used isolated source copies and temporary tooling; dependencies are not bundled in the delivered package.

| Check | Result |
|---|---|
| Untouched upstream control | `bun test orch watch-pr check-plan.test.ts`: **63 passed**, zero failed, 232 assertions. Watcher strict TypeScript check passed. |
| Integrated port tests | `bun run test`: **63 Bun tests + 4 Node tests passed**, zero failed. Includes all new upstream pagination and Markdown-fence tests plus the Codex-specific checks. |
| Worktree regression | Verified dirty-file preservation and paths with spaces; explicit integration base; remote HEAD priority; master fallback; absent-history review; invalid flags/refs and missing-base failures. Used local fixture repositories and a fake GitHub CLI, not a live remote. |
| TypeScript | `tsc --project watch-pr/tsconfig.json --noEmit --strict` passed on the integrated port. |
| Shell | `bash -n worktree-audit.sh` passed. |
| Skill metadata | skill-creator `quick_validate.py` passed for **56 entrypoints**: 52 main skills, three Benny skills, root entry. |
| Structured metadata and links | YAML/JSON parsed and all concrete relative Markdown links resolved; template placeholders excluded. |
| Layout and provenance | All 52 upstream main skill directories and 23 playbooks retained; original LICENSE and Bun lockfile unchanged. Per-file dispositions recorded in [the inventory](docs/upstream-0.15.21.tsv). |
| Independent instruction review | Read-only review found no substantive issue in sampled changed skill flows and the update guide. One duplicated reviewer heading was removed. This was instruction review, not a live workflow trial. |
| Update-guide rehearsal | The documented archive extraction commands reproduced the expected old/new package versions and skill paths. Three-way merging used `git merge-file` in a disposable copy, without needing a Git checkout. |

Tools: Bun 1.4.2, Node 22.23.1, upstream's frozen lockfile resolving TypeScript 7.0.2, and PyYAML 6.0.3 for skill validation. The original upstream release/tag pages listed no releases; the pinned source is a `main` snapshot. Cryptographic signatures were not verified.

The runtime contract, scheduling, model setup, invocation policies, history scope, and external-action boundaries were preserved. Instruction review and metadata validation do not establish end-to-end agent reliability. No live scheduler, GitHub mutation, cloud worker, Slack/tracker trigger, webhook, plugin installation, or real application verification journey was exercised in this update. The new verification requirements still need a real project to exercise them. No global settings or installations were changed.

To repeat script checks in a writable copy:

```bash
cd skills/poteto-mode/scripts
bun install --frozen-lockfile
bun run test
bun run typecheck
bash -n worktree-audit.sh
```

Use the available skill-creator validator for every `SKILL.md`. Follow [UPSTREAM.md](UPSTREAM.md) when integrating another upstream snapshot, and preserve the historical record below rather than attributing old forward trials to this release.

---

# Historical validation: pstack-codex 0.1.0

Checked on 2026-10-09 on macOS. Based on upstream pstack 0.15.15, commit `ccb5507cec1546dc88135c1139c811e6c59115ba`.

| Check | Result |
|---|---|
| skill-creator `quick_validate.py` | All 55 SKILL.md entrypoints passed: 51 main skills, three dormant Benny skills, and the new root entry. |
| YAML, plugin JSON, and local references | Metadata parsed; 273 concrete relative Markdown links resolved at validation time. Template placeholders were excluded. |
| Preserved layout | All 51 main skill directories, 23 playbooks, two role prompts, and the original LICENSE remain. |
| Existing `bun test orch watch-pr` | 52 passed, zero failed, 206 assertions. |
| Existing watcher TypeScript check | `tsc --project watch-pr/tsconfig.json --noEmit --strict` passed. |
| New Node port checks | Four passed: valid adapted plan; rejection of missing scheduling/legacy-only markers; retained review-lane requirement; dirty worktree preservation and conservative missing-history classification with spaces in paths. |
| Shell syntax | `bash -n worktree-audit.sh` passed. |
| Independent forward trial | A separate agent used the root skill to fix a local pagination fixture. It demonstrated one passing/two failing tests before the fix, then three passing tests and direct exported-API evidence. An unrelated user file was preserved. |
| Independent instruction review | Read-only routing, a twenty-task queue with three worker slots and a dirty checkout, and unavailable hourly scheduling were reviewed. Findings about stale tool arguments, history, provider assumptions, scope, and Benny paths were corrected. |

The forward trial prohibited nested agents, so it did not establish independent code-review execution. It exposed local-only/non-Git friction; the affected instructions were corrected afterward and metadata/reference checks rerun. This is one trial, not exhaustive behavioral coverage.

Test tooling was provisioned in an isolated build workspace with Bun 1.4.2 and Node 22.23.1. Runtime dependencies and the validation virtual environment are not bundled in the delivered package. The pinned Bun lockfile remains unchanged. Install Bun and the pinned script dependencies before using the advanced orchestration or PR watcher helpers.

No live scheduler, Slack/tracker trigger, webhook backend, remote worker, cross-provider model panel, PR publication, or plugin-directory installation was exercised. Those capabilities remain conditional on actual host tools and access. The package does not claim an automation is active merely because its instructions describe one.

To rerun script checks in a writable checkout, enter `skills/poteto-mode/scripts/`, run `bun install --frozen-lockfile`, then `bun run test` and `bun run typecheck`. Skill metadata validation additionally needs the host's skill-creator validator and PyYAML.
