# Statechart 0.15.36 blocker fixes

The fix is isolated from both the pristine source branch and the unfinished Codex integration.

- Canonicalize the temporary directory in the relative-symlink fixture. macOS exposes the same directory through /var and /private/var; computing a relative link across those spellings created a broken target. Existing launcher assertions are unchanged.
- Give exitClass the existing CheckResult exit type. This prevents numeric literal widening without changing runtime exit codes.
- Await the two signal-test helper calls in async callbacks that return void. Their cleanup and file-preservation assertions remain.

These changes affect two files and add no dependencies. The prior failing reproduction and typecheck output remain committed in upstream-0.15.36-blocked.md and its linked logs. The full fixed suite passed 367 tests with zero failures and zero skips. Strict type checks passed with TypeScript 5.9.3 and 7.0.2 using the same Node 22 declarations as the failing controls. `git diff --check` passed.

Fix commit: `1da984c54ab10ec41dbbc351e3ea2fc94facb892`, branch `codex/fix-statechart-0.15.36`. Pristine snapshot remains `f1e82333be428871db30dc906a7501d23b3a592c`. See [full fixed test output](upstream-0.15.36-fixed.log) and [original failures](upstream-0.15.36-blocked.md).

To continue the upgrade, merge the pristine snapshot into the integration branch using the documented ordinary merge workflow. Resolve the Codex workflow and packaging conflicts, then apply the fix commit with `git cherry-pick 1da984c54ab10ec41dbbc351e3ea2fc94facb892`. Do not move the pristine upstream branch to the fix commit. Update the customization map to record the small production type annotation and replacement of the obsolete macOS test adapter. Run the final port checks and provenance/metadata checks before promotion.

This completes the identified statechart blocker fix. The full 0.15.36 Codex integration, publication, and installation have not been completed. The published and installed release remains 0.15.32. No live orchestration workflow or Linux run is claimed.
