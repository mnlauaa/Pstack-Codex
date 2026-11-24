# Pstack Codex updates

## 0.15.48 — 2026-11-24

Updated original **0.15.46 → 0.15.48**, source `96af3b7a4eaf4bab2535d1591f29aae61a3c605d`, pristine snapshot `5589e78da6578a3113609e5a3b9d00591768ff0c`. Six upstream paths changed; the collection now has 59 main skills and 23 Codex playbooks.

- Added explicit-only `$reframe`: start from the user's raw description and files, distinguish possible problems, teach source-checked expert terminology, compare neighboring fields, then rewrite the description. It preserves user constraints and does not implement the underlying task. Inaccessible sources remain unverified and unconfirmed citations are omitted.
- Updated help, guide, package version, provenance and the customization map. Existing Codex model settings, authorization, scheduling, invocation policies and all executable scripts are unchanged.
- **61 Bun tests, four Node tests, three provenance tests, core TypeScript, all 63 skill validators and relative links passed.** Untouched upstream core controls also passed. Statechart scripts are byte-identical to the validated 0.15.46 port; its 407-test result remains historical evidence and was not rerun. See [validation](VALIDATION.md) and [inventory](docs/upstream-0.15.48.tsv).

The ordinary merge preserves original snapshot ancestry and published history. This scheduled update does not refresh the installed plugin. New instruction behavior was reviewed statically; no live model-authored reframe workflow was exercised.

## 0.15.46 — 2026-11-20

Updated original **0.15.43 → 0.15.46**, source `fbb86c09bbb4a25e490aaed136899ced1e9140e4`, pristine snapshot `1e967a72510148f34895ff4023ed9fd70af13923`. Fifteen upstream paths changed; the collection remains 58 main skills and 23 Codex playbooks.

- Statechart handles Windows CRLF and mixed TLC line endings, with explicit UTF-8 Java output. Thirty-three corpus regressions and one message-parser regression cover the new newline behavior.
- Imported upstream's TypeScript janitor and shared process termination helper, replacing POSIX shell cleanup. POSIX uses process-group signals; Windows uses `taskkill`. Worker temporary paths now populate `TMPDIR`, `TEMP` and `TMP`. The skill documents direct Node invocation on native Windows while preserving scoped installation, scratch outputs and unavailable-tool reporting.
- Retained only the existing exit-union annotation, canonical macOS test path and two async callback fixes in the same two statechart files. All other statechart script files match upstream. No new downstream executable patch was needed.
- Intentionally omitted upstream Gemini 4 Neon defaults, automatic panel-model migrations and provider-specific effort rules from active Codex instructions. Existing supported model/effort selections and inheritance remain intact. The archived Claude adapter records upstream's new mapping without becoming an active Codex setup path.
- **407 statechart tests, 61 Bun tests, four Node tests, three provenance tests, TypeScript, all 62 skill validators and relative links passed.** The untouched control retains the known macOS symlink failure and four type diagnostics. See [validation](VALIDATION.md) and [inventory](docs/upstream-0.15.46.tsv).

The ordinary merge preserves original snapshot ancestry and published history. This scheduled update does not refresh the installed plugin. Native Windows and real Bun/Deno statechart execution were not tested.

## 0.15.43 — 2026-11-17

Updated original **0.15.42 → 0.15.43**, source `3fa33bb0f927bea2ccacd48a3cfda95145fb6bae`, pristine snapshot `eecd0929bfeeefd5e66171c9aa9bf55744cd138e`. Seventy upstream paths changed. The port retains 58 main skills and 23 playbooks; upstream now has 22 playbooks.

- Architect traces the affected systems and sketches two shapes inline; large or contested designs use Arena with the existing Codex architecture panel. Reflection reads scoped conversation evidence inline, proposes durable edits, and waits for approval before editing a source copy. Removed the retired design and reflection templates and updated callers.
- New `worker.md` gives every delegate a pinned startup contract. The Codex adaptation preserves scope, required checks, supported models, isolation and authorization. Missing capabilities remain unverified. Upstream's blanket external-action permission, provider defaults and baseline-check exemptions are not imported.
- Simplified principles, technical writing and unslop. PR bodies become short briefings, ready by default with user draft overrides. Opening a PR no longer starts babysitting automatically. Babysit reports rebases to the branch owner; owners retain lease and handoff safeguards. Shipping reuses its frozen PR list on restart.
- Retained the Orchestrate playbook, full multi-phase plan contract, plan checker and its seven tests as explicit Codex extensions after upstream removed or simplified them. These preserve native scheduling, recorded IDs, recovery and plan markers required by this repository. No orchestration CLI is restored.
- Existing user model selections, provider/effort semantics and retired configuration entries remain intact. New setup examples omit retired reflection roles. Packaging identities, invocation policies and published history are preserved.
- **373 statechart tests, 61 Bun tests, four Node tests, three provenance tests, TypeScript, skill metadata and relative links passed.** Statechart source is unchanged upstream; the existing two-file macOS/type fixes remain. The first integrated statechart run lacked its declared `fast-check` test dependency; the complete rerun passed after provisioning it, with no source edits. See [validation](VALIDATION.md) and [inventory](docs/upstream-0.15.43.tsv).

This scheduled update publishes repository branches only; it does not update an installed plugin or activate integrations.

## 0.15.42 — 2026-11-16

Updated original **0.15.36 → 0.15.42**, source `bf0c7cd80abdbf7fe47b634978a7d1b4071f71a7`, pristine snapshot `2396940c1b55191357c50fc4105d3ec87663fac6`. The 59 upstream path changes retain 58 main skills and 23 playbooks.

- `how` now uses one read-only native explainer; `why` follows the introducing commits, later changes, and PR discussions directly, with other sources when needed. Both retain scoped evidence and unavailable-capability reporting. Removed the retired how/why prompt and source playbooks, and updated their callers. Recall now owns its source investigators.
- Implementation, investigation, architecture, comment review, and Benny trace code directly instead of requiring an extra `how` invocation. Sharpen asks the eventual task executor to prototype empirical choices while leaving product and preference decisions to the user; sharpening still only rewrites the prompt.
- Arena cross-judges require a known different vendor, not just a different family. When the configured pool or host cannot supply one, the coordinator explains the skip and evaluates the candidates itself. Codex model/effort validation, inheritance, worker limits, and writer isolation remain.
- Statechart draws incoming edges through nested parent-state entries and surfaces actual SANY parse and semantic diagnostics. Imported its updated tests and fixtures; retained only the existing exit-union annotation, macOS fixture path, and async callback fixes in two files.
- Intentionally retained Codex setup semantics instead of importing upstream provider defaults, model-slug migration, global rules, or relative per-role budget changes. Existing user model choices stay intact. Retired roles are omitted from new examples and preserved unused in existing configuration. Marketplace identity, invocation policies, authorization, scheduling and published history are unchanged.
- **373 statechart tests, 61 Bun tests, four Node tests, two real SANY smoke checks, three provenance tests, TypeScript, skill metadata, and relative links passed.** The unchanged core suite had one initial 2-second subprocess timeout during concurrent testing; it passed when rerun alone without edits. See [validation](VALIDATION.md) and [inventory](docs/upstream-0.15.42.tsv).

This scheduled update publishes repository branches only; it does not update an installed plugin or activate integrations.

## 0.15.36 — 2026-11-03

Updated original **0.15.32 → 0.15.36**, source `4dd1d05818d19792e7cd6e818f1667f95f7e1dbe`, pristine snapshot `f1e82333be428871db30dc906a7501d23b3a592c`. The 464 upstream path changes retain 58 main skills and 23 playbooks. Later original main `ae5650febf4320793844c12c4adaa937f417f8da` has the same pstack subtree.

- Imported the TypeScript statechart pipeline, bounded TLA+ checks, counterexample paths, differential corpus tests, and separate Pele SVG rendering. The old `.mjs` interfaces and portable preload harness are superseded. Fixed the macOS symlink fixture, the checker exit-union annotation, and two async signal-test callbacks; other executable statechart files remain upstream-exact.
- Adopted upstream's simpler orchestration: one PR owner, independent current-head verification, and a first-unit pilot. The removed orchestration CLI stays removed. Native Codex delegation and coordinator-owned durable run files preserve authorization, actual worker limits, scheduler IDs, cancellation, recovery, single writers, and pinned leases. Existing stores must be reconciled before migration.
- Autopilot-stack now stacks only dependent work and stops at verified delivery. Imported narrower verifier reruns, same-file trunk rebase triggers, goal-first briefs, subtitle checks, and measurement guidance.
- Interrogate now reports only executable failures rerun by the coordinator in isolated checkouts. Arena skips its cross-family judge when no eligible configured family is available, explaining the gap. Model preferences and invocation metadata are preserved.
- Full integrated statechart: **367 passed, zero failed, zero skipped**. Core: 61 Bun and four Node tests passed. TypeScript, metadata, relative links, provenance and independent review passed. See [validation](VALIDATION.md), [inventory](docs/upstream-0.15.36.tsv), and [fix history](docs/upstream-0.15.36-fixes.md). Live scheduling and PR workflows were not exercised.

## 0.15.32 — 2026-10-26

Updated original **0.15.30 → 0.15.32**, source `99b609a72323b70204eab407c622f436e858e112`, pristine snapshot `68bfbf7b7b1d3c62b0e9375770efc1a99f4cec3e`. Forty-seven upstream paths changed; 58 main skills and 23 playbooks.

- Added explicit-only `$ketchup-video` with scoped evidence, scratch video output, and honest rendering failures.
- Imported PR-stack fork identity, active-PR selection, watcher deadline, multi-backtick plan parsing, and GNU/BSD worktree date fixes.
- Imported expanded statechart models, rendering and modules, preserving upstream production scripts. Adapted installation guidance to require authorization for dependency setup. Extended the portable Node test preload to allow empty-directory claims and simulate all four competing-run races. Replaced the new Linux-only callers and removed unused C injection. Existing filesystem assertions remain, with an extra injection probe.
- Formal-verification generation references `$statechart`; reflection edits target approved project/user skill copies rather than installed caches. Native swarm models, slots, worktrees, scheduling and authorization remain.
- Resolved the four candidate failures in the test adapter. The full statechart suite passes 146 tests with five explicit skips; core and provenance checks pass. See [validation](VALIDATION.md) and [inventory](docs/upstream-0.15.32.tsv). Earlier failing logs remain as regression evidence.

## 0.15.30 — 2026-10-23

Updated original **0.15.29 → 0.15.30**, source `9b93e81fb2921b9263d9463c15bafeabfe3903aa`, snapshot `6f7e30e7ca69027ff02d229108105458ac345136`. Seventeen upstream paths changed; 57 main skills and 23 playbooks.

- Added explicit-only `$statechart`: TLA+ model to Mermaid, diagram to model skeleton, and code-model versus spec comparison with numbered bug paths.
- Retained production statechart scripts byte-for-byte. Added Codex runtime binding, scratch-copy and executable-mapping guidance, and blocked/unverified reporting for unavailable Java, TLC, or PNG rendering.
- Updated help, guide, and package counts. Models, scheduling, authorization, existing scripts, lockfile, and marketplace identity are unchanged.
- Fixed macOS test portability: canonical temporary paths remove `/var` versus `/private/var` mismatches; Node-level rename fault injection replaces Linux-only preloading. Existing recovery and concurrent-write assertions remain. The original failing control log is retained as historical evidence.
- Reconciled the published version-alignment change; package version now matches upstream 0.15.30. See [validation](VALIDATION.md) and [inventory](docs/upstream-0.15.30.tsv).

## 0.15.29 — 2026-10-23 — version alignment

Aligned package version **0.2.5 → 0.15.29** with the integrated original pstack version. Future package versions follow the integrated upstream version; commit pins distinguish changes within the same version. Updated the maintenance rule and current documentation. Historical version entries and inventories remain unchanged.

This changes metadata only. The blocked 0.15.30 candidate is not included; runtime content and source pins are unchanged.

## 0.2.5 — 2026-10-20

Updated original pstack **0.15.28 → 0.15.29**, from `ddf824aff1e55ba14bd666b30bce3fc69962abe6` to `88d47514b82e7c44f00f2b2a72ff6dd12158038c`. Pristine snapshot: `e52c7ab9a97cdbad28c27abb3041ec8d561dc19e`. Eight upstream paths changed; counts remain 56 main skills and 23 playbooks.

- `$sharpen` now explains four ways to improve a prompt (expert approach, raw sources, specific methods/tools, and an outside check), then returns the rewritten prompt. It no longer executes the task. User choices and explicit constraints remain binding.
- Updated help, recipes, guide, and README to match. Retained explicit-only Codex invocation, runtime reference, packaging, models, scheduling, and authorization boundaries. No scripts or dependencies changed.
- Ordinary merge preserves pristine upstream ancestry. This is a pinned main snapshot; signatures were not verified. See [validation](VALIDATION.md) and [the inventory](docs/upstream-0.15.29.tsv).

## 0.2.4 — 2026-10-20

Updated original pstack **0.15.25 → 0.15.28**, from `99743e9c151c8537cbbf1f98bb38f34ef3368453` to `ddf824aff1e55ba14bd666b30bce3fc69962abe6`. Pristine snapshot: `fb4cb8d03e5bbceb07d5352d127c2bfacb5e46fb`. There are 26 changed upstream paths and **56 main skills**, 23 playbooks, two role prompts, three dormant Benny skills, and the root entry. This is a pinned main snapshot; signatures were not verified.

- Added `$create-formal-verification-skill` and `$maintain-formal-verification-skill`: choose a meaningful property, state bounds, prove the check can fail, record covered code and sync commits, and distinguish model drift from product bugs. Verifiers are not bundled.
- Added optional formal-verification setup offers, help routing, recipes, and guide coverage. New generators remain explicit-only and use project `.agents/skills/`, the shared runtime, isolated scratch mutations, and blocked/draft reporting when a required verifier is unavailable. Empirical generated-input tests are not labeled exhaustive proofs.
- `$ketchup` now lists every pending decision with evidence and risk; its response can grow with the number of items. Read-only behavior and factual visuals remain.
- TypeScript branded-value examples now use validating type predicates rather than casts. Imported the small sharpen simplification while retaining binding user constraints.
- Imported guide revisions with Codex commands and paths. Kept the new Claude adapter as explicitly archived upstream reference; its tool mappings, global settings, and skip rules do not govern this port. The external generated Claude distribution is not imported.
- Upstream lowercase-name fixes were already present here. Kept the portable manifest, marketplace identity, role models, scheduler behavior, authorization boundaries, runtime scripts, and lockfile.

See [validation](VALIDATION.md), [the inventory](docs/upstream-0.15.28.tsv), and [the updated customization map](UPSTREAM.md).

## 0.2.3 — 2026-10-16

Integrated original commit `99743e9c151c8537cbbf1f98bb38f34ef3368453` after `850d7f2e9f5e55dff7eb00a0a479337fe79eb22f`. Upstream still labels this **0.15.25**; the 12-path subtree change, not the version string or unrelated monorepo commits, triggered this update. Pristine subtree commit: `c7b8538ff500228568f660051c869624866329cc`. The package remains 54 main skills and 23 playbooks.

- Root-cause guidance distinguishes legitimate states needing handling from invalid states whose producer must be fixed.
- Behavioral testing now checks observable contracts and external effects, rejects tests coupled to internals, and permits absence assertions when absence is the actual contract. Updated `$correct`, the principle index, and guide together.
- Premise testing now asks for a direct experiment after repeated failed fixes. Idempotency guidance derives actions from current state and requires evidence for stale artifacts.
- Imported upstream consolidation of type-system, migration, reviewer judgment, and swarm reporting instructions. Retained Codex swarm worker-count/slot guidance and model bindings where upstream removed overlapping text; preserved invocation metadata and runtime links.
- Kept the Codex README and added the new source pin. No executable scripts, locks, models, scheduling, permissions, marketplace identity, or installed plugins changed.

Ordinary merge ancestry retains the pristine source. Signatures were not verified. See [validation](VALIDATION.md) and [this integration's inventory](docs/upstream-0.15.25-99743e9c151c.tsv); the previous 0.15.25 inventory remains historical.

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
