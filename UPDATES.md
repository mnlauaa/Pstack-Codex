# Pstack Codex updates

## 0.2.2 — 2026-10-15

Updated original pstack **0.15.23 → 0.15.25**, from `5108b719a7aa484ef1a9781f587c7bbeac793f92` to `850d7f2e9f5e55dff7eb00a0a479337fe79eb22f`. Imported subtree: `ceea2de5498da4b7796ca6e0c64bce1b36ff8ae0`. This pinned original `main` snapshot is not signature-verified. The package now contains **54 main skills**, 23 playbooks, two role prompts, three dormant Benny skills, and the root entry.

- Added explicit-only `$sharpen`: consider expert methods, the user's actual outcome, and specification quality, retain an outside check, then do the task. Explicit user constraints remain binding.
- Stack frontier discovery now follows forge PR base chains with GitHub CLI by default and optional Origin support; removed the Graphite requirement. Imported the implementation, callers, and tests together.
- PR watcher recognizes owner-approval `ACTION_REQUIRED` as the review gate on both GitHub read paths. This classification does not authorize bypassing approval.
- Worktree audit supports Origin and GitHub schemas and holds draft/open PRs. Retained full paths, explicit scoped history, and conservative review buckets; expanded the existing regression fixture.
- Autopilot runs the full swarm at code-ready and after major changes; smaller changes get an independent verifier and fresh checks. Landing tests the affected merge result, pins branch leases, and sequences repeated trunk collisions. Stack owners do not rebase; the root owns topology through explicit writer handoffs.
- Catch-up summaries explain changes with inline evidence, reserve diagrams for meaningful relationships, and keep action items as plain bullets; visuals no longer count toward the prose limit.
- Adapted job-based reasoning guidance to supported Codex controls. Inheritance and explicit user model/effort settings remain; no fabricated fast-model IDs or provider fallbacks.

Retained real scheduler IDs and cancellation, pinned installed playbooks, durable state outside the plugin, one coordinator writing the shared store, isolated replacement writers, invocation policies, and user authorization. Cursor cloud/Task defaults, `/loop`, moving-trunk instruction reads, and immediate overlapping replacement writers are not imported as Codex operations. Portable packaging and marketplace identities remain unchanged. Ordinary merge ancestry preserves both histories. See [validation](VALIDATION.md) and [the per-file inventory](docs/upstream-0.15.25.tsv).

## 0.2.1 — 2026-10-14

Updated original pstack **0.15.21 → 0.15.23**, from `fe53d9e9093dbb9ae298563b1a9d702dd6e2ca08` to `5108b719a7aa484ef1a9781f587c7bbeac793f92`. Imported subtree commit: `ec3eb0c0458835ffc85e62b8ec7f7bf709d61f3c`. The original `main` snapshot is pinned; signatures were not verified. This update contains **53 main skills**, 23 playbooks, two role prompts, three dormant Benny skills, and the root entry.

- Added explicit-only `$in-your-own-words` to restate the user's goal and problem before work; linked it from help and recipes.
- Updated `$ketchup` to concise, plain-language summaries with small visuals, checked numbers, and focused decision requests. Its read-only scope and Codex runtime link remain.
- Root-cause guidance now asks for a cheap, always-on signal when the decisive fact required a deep investigation.
- Adapted the delegate's missing-path fallback to resolve the main skill inside its own package. It reports unavailable paths instead of searching Cursor caches or selecting a newer package mid-run.
- Upstream's removal of Cursor mode/reminder metadata needed no Codex change because those fields were already absent. Kept the Codex README, portable plugin identity, invocation policies, and authorization/runtime contracts; adapted upstream discovery guidance to the existing Codex install instructions.

Eight conflict paths were reviewed: Cursor manifest deletion, README, role prompt, portable manifest, ketchup, help, recipes, and main-mode metadata. No scripts or dependency locks changed. The ordinary merge retains both upstream and port ancestry. See [validation](VALIDATION.md) and [the new per-file inventory](docs/upstream-0.15.23.tsv).

## Upstream maintenance structure — 2026-10-13

Added a pristine `upstream` branch at the already-integrated original 0.15.21 snapshot and connected it to `main` without changing runtime files or rewriting published history. The branch pattern is inspired by `backnotprop/pstack`; original Cursor remains the only source. Added original-versus-imported commit/tree identities, a provenance checker with negative tests, [AGENTS.md](AGENTS.md), and an ordinary-merge update guide. See [the history record](docs/upstream-history.md) for exact hashes and rehearsal evidence. Runtime package version remains 0.2.0.

## Marketplace packaging — 2026-10-13

Added `.agents/plugins/marketplace.json` so this GitHub repository can be registered as `pstack-marketplace`. README now documents registration, installation, refresh, and the distinction between bundled plugin skills and the root direct-use entry. Upstream and plugin versions remain unchanged; no runtime skill behavior changed.

## 0.2.0 — 2026-10-13

Updated directly from original `cursor/plugins/pstack` **0.15.15 → 0.15.21**. No source from `backnotprop/pstack` was used for this update.

- Previous upstream: `ccb5507cec1546dc88135c1139c811e6c59115ba`.
- Integrated upstream: `fe53d9e9093dbb9ae298563b1a9d702dd6e2ca08`.
- Source: [original pinned pstack](https://github.com/cursor/plugins/tree/fe53d9e9093dbb9ae298563b1a9d702dd6e2ca08/pstack).
- Upstream has no published releases/tags at this check; this is a pinned `main` snapshot, not a signed release. Cryptographic signatures were not verified.
- Package now contains **52 main skills, 23 playbooks, two role prompts**, three dormant Benny skills, and the root Codex entry.

### New and changed behavior

| Change | Before | After | Main files |
|---|---|---|---|
| PR review pagination | Read at most the first 100 review threads. | Follow every review-thread page; include later unresolved threads and Bugbot pass counts. Six new upstream tests cover the reader. | `skills/poteto-mode/scripts/watch-pr/{github,policy,types}.ts` and related tests/fakes |
| Markdown plan parsing | Toggle code state on triple backticks. | Recognize indented, tilde, nested/longer fences and valid closing fences; five upstream parser tests retained with Codex plan markers. | `skills/poteto-mode/scripts/check-plan.mjs`, `check-plan.test.ts` |
| Worktree merge base | Assume `origin/main`. | Accept `-b/--base`; try `origin/HEAD`, `origin/main`, then `origin/master`; fetch an explicit origin base and reject missing refs. Retain paths-with-spaces and history protections. | `skills/poteto-mode/scripts/worktree-audit.sh`, its Node regression, cleanup playbook |
| Chat catch-up | No dedicated catch-up skill for events since the user's last message. | Add `$ketchup`: read-only status and decision summaries, with evidence and useful visuals. | `skills/ketchup/`, `skills/poteto-help/SKILL.md` |
| Verification startup | A responding process could be treated as ready. | Require a usable empty-data startup, migrations/seed data, and honest reporting of missing journey preconditions. | `skills/create-verification-skill/SKILL.md` |
| Verification evidence | Stand-in environments were not explicitly distinguished. | List setup steps a stand-in performed that remain unverified on the real target. Never weaken a journey to hide missing seed data. | `skills/create-verification-skill/SKILL.md` |
| Playbook ownership | Delegate/coordinator distinction was less explicit. | The receiving chat runs the playbook; `poteto-agent` is for scoped code/helper work inside it. | `skills/poteto-mode/SKILL.md`, `agents/poteto-agent.md` |
| Candidate rationale | Request a short rationale. | Also name considered and rejected alternatives. | `skills/arena/SKILL.md` |
| Instruction maintenance | More verbose prompts, principles, and review guidance. | Incorporate upstream consolidation across how/why, reflection reviewers, principles, PR writing, and prose rules while retaining Codex tool bindings. | See the per-file inventory |

### Deliberate differences from original 0.15.21

The Codex runtime contract, project-local model JSON, inherited models, native delegation, concurrency limits, heartbeat scheduling, scoped history, user authorization, managed-worktree handling, and dormant integrations remain. The package retains its own name/version, root skill, `agents/openai.yaml` policies, and Codex frontmatter.

Cursor's plugin manifest, mode keyboard instructions, registered-agent assumptions, model defaults, transcript layouts, `/loop` calls, and external control/deslop dependencies are not adopted as executable Codex instructions. The source adds a root `plugin.json`; this port already has one and keeps its own identity. README remains the Codex entry guide, with the new skill and update links added.

The upstream watcher and orchestration code use upstream implementations; the Bun dependency lockfile is unchanged. The plan tests use Codex markers. Worktree tests additionally cover base selection without losing dirty-checkout, paths-with-spaces, or missing-history protection. The explicit no-merge-without-authorization warning in Babysit is retained even though upstream removed that paragraph during consolidation.

This update also preserves concise existing wording in some overlapping host-specific paragraphs rather than adopting editorial rewrites that would restore Cursor assumptions. This is a behavior-preserving port, not a byte-identical mirror.

### Update evidence and next update

[VALIDATION.md](VALIDATION.md) records actual checks and remaining limitations. [UPSTREAM.json](UPSTREAM.json) is the machine-readable source pin. [The file inventory](docs/upstream-0.15.21.tsv) records every upstream file, whether it changed from the previous baseline, and whether the integrated copy is exact, adapted, or intentionally omitted; it also lists port-only files.

Follow [UPSTREAM.md](UPSTREAM.md) next time. Compare the next original source against this pinned upstream, not against the first 0.15.15 baseline and not against a third-party mirror.

## 0.1.0 — 2026-10-09

Initial Codex port of original pstack 0.15.15 at `ccb5507cec1546dc88135c1139c811e6c59115ba`. Added the root entry, Codex runtime contract, model configuration, scoped history and scheduling adaptations, conservative worktree handling, and port validation. See [PORT.md](PORT.md) for the maintained customization overview and the historical validation section in [VALIDATION.md](VALIDATION.md).
