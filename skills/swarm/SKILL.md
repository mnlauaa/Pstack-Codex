---
name: swarm
description: Fan out N parallel workers, drain them, and return one report. Use for
  $swarm, 'swarm this', or parallel coverage, races, gauntlets, and exploration.
---

Before using this skill, read the shared [Codex runtime contract](../poteto-mode/references/codex-runtime.md) once per run. Resolve bundled skills by package path and follow that contract for tools, models, history, scheduling, and permissions.

# Swarm

Fan out N native workers within available slots. They may cover separate slices, race the same brief, or mix both. The parent waits, aggregates, and returns one report.

## Start

Open a todolist with one entry per phase before launching anything.

1. Frame
2. Fan out
3. Aggregate
4. Report

## Phase A: Frame

1. State the done predicate and the artifact or report the swarm must return.
2. Choose the shape. Partition into slices, race N workers on identical briefs, or mix both. For a race or mixed shape, declare `first pass`, `rank all`, or `best-of` before spawning.
3. Set N from the user or derive it from the shape. N is total workers, not the host concurrency limit.
4. Resolve the `swarm workers` role object through the runtime Models contract. For an explicitly requested model race, name supported models per arm and report any unavailable diversity. Choose reasoning effort and speed per the runtime Models contract.
5. Give each worker its own writable output when it writes. When workers verify or measure commits, each brief names the exact SHAs. A measurement brief also names the method (sample count, what one sample is, order). The worker records both in its result.

## Phase B: Fan out

Dispatch N native workers through a rolling window within the available slots. Give each its scoped brief, model selection, output path, and explicit worktree where it writes. Use only execution environments actually supported by the host.

For a non-default base, prepare or select the correct worktree at the requested ref and pass its absolute path and verified HEAD in the brief. Do not assume a cloud-specific spawn argument.

Every brief stands alone. Include the goal, scope, exact slice or race arm, how to verify, and what to report. Reports use `PASS`, `ISSUES`, or `BLOCKED` with evidence. A worker that can prove a defect reports `ISSUES` and lists every issue it can prove, not only the first.

If a worker drops out, proceed with N-1 and note it.

## Phase C: Aggregate

Read the terminal results. Drop a result that does not record the SHAs and method its brief names, and respawn that worker once. After a second miss, record a gap. A gap does not count as a pass. For coverage, every required slice needs a result. For a race, apply the selection rule declared up front. Use first pass, rank all, or best-of. Do not paste raw worker dumps.

Keep a compact result table, one-line evidenced issues, and explicit gaps or dropouts.

## Phase D: Report

Return one consolidated in-chat report with the table, issue one-liners, gaps or dropouts, and the race rule when used.
