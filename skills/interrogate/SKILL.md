---
name: interrogate
description: "Use for \"interrogate\", \"adversarial review\", \"multi-model review\", \"challenge this\", \"stress test this code\", \"find blind spots\", or \"tear this apart\". Adversaries try to break a change or design, and only findings proven by a run survive."
---

Before using this skill, read the shared [Codex runtime contract](../poteto-mode/references/codex-runtime.md) once per run. Resolve bundled skills by package path and follow that contract for tools, models, history, scheduling, and permissions.

# Interrogate

Adversaries try to break a change or a design. A finding survives only when a run proves it. Report the findings. Do not apply fixes.

## Frame

The scope is what the user names. Otherwise it is the branch diff from its merge base with the base branch, through the working tree. State the intent with the **in-your-own-words** skill, from the user's message, the commits, and the PR description. Ask the user when the intent is unclear.

## Fan out

Read the **arena** skill and run Phase A steps 3 and 4 and Phase B with these changes. Resolve the `interrogate reviewers` panel in `<repo>/.codex/pstack/models.json` through the runtime Models contract instead of `arena runners`. Missing panels default to two independent inherited-model runs. Preserve configured seats and supported model/effort pairs, use a rolling window within the actual worker limit, and label independent same-model review honestly.

Use general-purpose native delegates with scoped briefs. Explicitly create one isolated worktree and branch per adversary, based on the reviewed state. Copy the scope's uncommitted changes, including relevant untracked files, into each checkout without disturbing the source tree. Each adversary can write and run local repros there. Review scope never grants extra network, installation, live-service, or destructive permissions. If delegation or another required capability is missing, report the gap and label any local work or finding unverified as an independent review. Do not claim a clean review.

In place of the arena task and rationale, give each adversary the scope, the intent, and this brief:

> Break this change. Prove each finding with a run against the real code, such as a failing test, a repro script, or command output that shows the wrong behavior. For a design or plan, run a prototype or probe the current tree. Keep repros in your own worktree. Report each finding with a title, the exact command, the output it printed, and the output the intent requires. Leave out anything you did not run. That covers style, naming, structure, and risks that need a future change to matter. No findings is a valid result.

## Verify

Verify each finding per arena Phase F by rerunning its command in an isolated repro checkout with the same reviewed code and inputs. Inspect the command and its effects first, and stay within the user's authorization. Keep a finding when the output shows the failure and the failure breaks the intent. Drop the rest. Merge findings that share a root cause.

Skip arena Phases C, D, and E. Adversaries find different failures, so the verdict keeps every verified finding, not one adversary's list.

## Output

- **Intent**: the restatement.
- **Findings**: for each verified finding, the command, its output, how it breaks the intent, and the adversaries that found it. Say "no verified findings" when none survive.
- **Dropped**: for each adversary, the count of dropped findings and why.
- **Coverage**: models and independent runs used, reviewed revision and working changes, and unavailable capabilities or unverified findings. "No verified findings" does not mean missing review or execution coverage passed.
