# 0.15.36 update blocked, 2026-11-03

This is an evidence-only candidate branch. No 0.15.36 source has been merged into the Codex package, and nothing has been published or installed. Published main and the installed plugin remain at 0.15.32.

## Source and recovery

- Original source: cursor/plugins, pstack subtree, commit `4dd1d05818d19792e7cd6e818f1667f95f7e1dbe`, version 0.15.36.
- Pristine staging branch: `sync/pstack-4dd1d05818d1`, snapshot `f1e82333be428871db30dc906a7501d23b3a592c`, tree `4719e1c4b4c43bac85d4206a8b41dd2899769c1c`.
- Archive SHA-256: `58e3a9f2a5ad07b2edaf2487c56a4b4aff006dba6e47d5c2291a83145afbe3fd`. Archive PAX identity and exact imported tree verified; signatures not verified. No upstream tags or releases were available at initial resolution.
- The latest main checked on November 3, `ae5650febf4320793844c12c4adaa937f417f8da`, has the same pstack tree. It does not require a separate import.
- Reconciled the interrupted October 30 run. No second snapshot or overlapping updater was started. Work and state remain under `/tmp/pstack-20261030`; committed evidence survives temporary-file cleanup.

## Control results

Untouched upstream core passed 61 Bun tests and 179 assertions, strict TypeScript, and shell syntax. Bun 1.4.2 used the supplied frozen lockfile.

The untouched statechart suite ran on Node 22.23.1, Temurin JDK 21.0.13, and the checksum-pinned TLC 1.7.4 release jar. It passed 366 of 367 tests, failed one, and skipped none. Rendering dependencies and Java/TLC were installed only in temporary storage. See [full control log](upstream-0.15.36-control.log).

The failing test is the launcher reached through an absolute and a relative symlink, at `skills/statechart/scripts/test/cli.test.ts:129`. Its assertion receives undefined stderr rather than an empty string. It fails independently under the default macOS temporary path and passes with `TMPDIR=/private/tmp`, without source changes. The fixture constructs relative links between Node's canonical source path and a temporary path containing the macOS alias. See [failure](upstream-0.15.36-launcher-repro.log) and [canonical-path diagnostic](upstream-0.15.36-launcher-canonical-tmp.log). This establishes a test-path portability issue, not a proven production launcher defect.

Statechart strict type checking also fails with TypeScript 5.9.3 and the core lockfile's TypeScript 7.0.2, using Node 22 type declarations. Two assignments in `run.ts:455` and `run.ts:471` widen `exit` to number instead of `0 | 1 | 2`. Two callbacks in `test/cli.test.ts:430` and `test/cli.test.ts:453` return objects rather than void. See [TypeScript 7.0.2 output](upstream-0.15.36-typecheck.log). The statechart package provides a tsconfig but does not pin a compiler or Node types.

Reproduce from a writable pristine copy:

```sh
cd skills/poteto-mode/scripts
bun install --frozen-lockfile
bun run test
bun run typecheck
bash -n worktree-audit.sh
cd ../../statechart/scripts
npm install --ignore-scripts --no-audit --no-fund
# Set JAVA, TLA2TOOLS, XDG_CACHE_HOME, and npm_config_cache to temporary test tools/cache.
npm test
node --test --test-name-pattern='launcher reached through an absolute' test/cli.test.ts
TMPDIR=/private/tmp node --test --test-name-pattern='launcher reached through an absolute' test/cli.test.ts
../../poteto-mode/scripts/node_modules/.bin/tsc --project tsconfig.json --typeRoots /absolute/test-tools/node_modules/@types
```

## Integration still required

The upstream change touches 464 paths. A read-only merge rehearsal identified 25 conflicting paths, including packaging, Codex workflow text, and deletion of the old statechart test harness. It did not modify main or start an integration merge.

Upstream replaces statechart with a TypeScript pipeline and removes the old commands, renderer, and tests. Reconcile the new implementation and its checks rather than restoring obsolete files solely to resolve conflicts. The Codex temporary-path test adaptation needs review at the new fixture boundary.

Upstream also deletes the orchestration CLI and replaces its workflow with Cursor Project tracker/store tools. Preserve Codex durable state, scheduler IDs, cancellation/recovery, worker limits, models, authorization, and single-writer ownership while adapting it. Review changed autopilot ownership, interrogate runtime-proof requirements, and all clean merges. Do not silently assume Cursor tools exist in Codex.

After resolving the control failures and completing that port, run the required port tests and skill metadata/link validation, update pins and release records, verify ancestry and remote divergence, then atomically push main and upstream. Do not publish this evidence-only branch as a release. No port test result, live orchestration coverage, or installed-plugin update is claimed here.
