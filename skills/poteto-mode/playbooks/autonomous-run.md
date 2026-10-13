### Autonomous run

**You own the exit condition. Define done, then drive to it without stopping.**

1. State the exit condition as a checkable predicate before the first iteration (tests green, repro fixed, all N PRs merged, pixel-diff zero).
2. Choose active continuation, native event waits, or an actual scheduled wake per the Codex runtime contract. Watcher children notify an active run; durable future wakes require a supported scheduler and a recorded schedule ID. If the required scheduler is unavailable, state that limitation, save the resume point, and continue only authorized active work.
3. Each iteration makes the smallest change the evidence justifies, verifies it against the predicate, commits if it advanced, discards changes that didn't help. Belt-and-suspenders that "might help" gets reverted, not left to ride.
   Sequence the work via the **sequence-verifiable-units** principle skill, verifying each unit before the next instead of batching checks at the end.
4. Fix necessary blockers within the authorized task. Record related bugs, broken skills, and other discoveries outside scope as follow-ups instead of expanding the work or publishing extra PRs. Retain existing user grants and surface only decisions or permissions genuinely required to continue.
5. Checkpoint every iteration via the **show-me-your-work** skill, a row for what changed and whether the predicate moved.
6. Stop when the predicate is met. A plateau is not a stop, so keep going and pivot your approach to push past it. Surface a genuine dead end rather than spinning, and never relax the predicate to declare victory.

**Reply:** the exit condition, iterations run, what landed, what was discarded, final predicate state.
