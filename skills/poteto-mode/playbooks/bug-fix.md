### Bug fix

**You own this task. Plan, review, verify.** Use scoped delegates where they add value. A trivial local fix or a task that forbids delegation can be performed inline; do not label self-review independent. Choose reasoning effort and speed per the runtime Models contract.

Be scientific. Every shipped line traces to runtime evidence. Belt-and-suspenders that "might help" is a hypothesis, not a fix. It does not ship. When evidence refutes a hypothesis, revert what it motivated. The smallest change the evidence justifies ships, nothing more.

1. Reproduce it yourself on the matching surface via the control skill (Non-negotiables), even when a debug or instrumentation protocol says to ask the user to reproduce. Ask the user only with a stated, specific reason the control surface cannot reach the target, and only after driving it as far as it goes. For a library or API, calling its exported consumer interface is the matching surface. If it won't reproduce directly, synthesize the trigger, tighten conditions, or instrument until it fires.
2. Binary-search the cause. Form the candidate hypotheses, then rule them out until one survives. Seed them with `how` over the affected subsystem and the **why** skill for regression history. Each pass, take the split that cuts the most remaining problem space, get runtime evidence, eliminate. When program state is unclear, add instrumentation or logging and read it as the code runs. Don't guess. Drive a long or stubborn hunt with the Codex runtime continuation contract. Confirm the surviving *mechanism* with runtime evidence before the step-3 architect/interrogate fan-out.
3. Plan the fix. If it crosses a function boundary, `architect` first. For delegated implementation use the configured bug-fix role and a specific scope; apply the inline exception above when appropriate.
4. Verify on the same surface. The original repro now passes. "Inconclusive" or wrong-surface is not a pass. Flag it. Tests exercising the actual exported interface can provide direct behavioral proof for a library. UI or service bugs need the matching runtime path.
5. Save failing-then-passing evidence. When a Git repository and the delivery scope support commits, stage the repro before the fix in history; a local-only non-Git task keeps the test receipts instead. See the **tdd** skill for the failing-test-first cadence when the bug has a cheap local test path. Skip it when the test would be expensive, integration-heavy, or unclear.
   This is the canonical **sequence-verifiable-units** principle skill, the failing test first and the fix on top.
6. Run **Opening a PR** only when the requested delivery includes a PR. Otherwise report the local change and evidence.

**Reply:** what was broken, root cause, fix, how you verified. Paste failing-then-passing repro output verbatim.
