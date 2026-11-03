# Statechart 0.15.36 blocker fixes

The fix was first isolated from the pristine source branch, then applied to the full Codex integration. The pristine snapshot remains unchanged.

- Canonicalize the temporary directory in the relative-symlink fixture. macOS exposes the same directory through /var and /private/var; computing a relative link across those spellings created a broken target. Existing launcher assertions are unchanged.
- Give exitClass the existing CheckResult exit type. This prevents numeric literal widening without changing runtime exit codes.
- Await the two signal-test helper calls in async callbacks that return void. Their cleanup and file-preservation assertions remain.

These changes affect two files and add no dependencies. The prior failing reproduction and typecheck output remain committed in upstream-0.15.36-blocked.md and its linked logs. The full fixed suite passed 367 tests with zero failures and zero skips. Strict type checks passed with TypeScript 5.9.3 and 7.0.2 using the same Node 22 declarations as the failing controls. `git diff --check` passed.

Fix commit: `1da984c54ab10ec41dbbc351e3ea2fc94facb892`, branch `codex/fix-statechart-0.15.36`. Pristine snapshot remains `f1e82333be428871db30dc906a7501d23b3a592c`. See [full fixed test output](upstream-0.15.36-fixed.log) and [original failures](upstream-0.15.36-blocked.md).

The ordinary integration merge imports the pristine snapshot and applies this two-file patch during conflict resolution. The fix branch remains a recovery reference; it is not the pristine upstream branch. The customization map records the production type annotation and replacement of the obsolete macOS test adapter.

The full integration now passes 367 statechart tests, 61 Bun tests, four Node tests, TypeScript, metadata and provenance checks. See [current validation](../VALIDATION.md) and [integrated test output](upstream-0.15.36-port.log). Historical failures above remain evidence of the original blockers. No live orchestration workflow or Linux run is claimed.
