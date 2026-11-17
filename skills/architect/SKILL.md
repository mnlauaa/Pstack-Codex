---
name: architect
description: "Sketch types, signatures, and module structure before code, then stay in the loop while implementation fills in. Use for $architect, 'architect this', 'design this', or non-trivial work where jumping to code would lock in the wrong shape."
---

Before using this skill, read the shared [Codex runtime contract](../poteto-mode/references/codex-runtime.md) once per run. Resolve bundled skills by package path and follow that contract for tools, models, history, scheduling, and permissions.


# Architect

Before writing code, trace every system the change touches, then sketch two different shapes for it (types, signatures, module boundaries) and pick the one where each piece of state has one owner, each task has one way to do it, and callers need to know least. Redesign instead of patching if workarounds repeat.

For a large or contested design, run the **arena** skill instead of sketching alone.

Respect a request to stop at the design before implementing. Resolve an Arena panel through the Codex runtime contract; if delegation is unavailable, report the missing independent candidates rather than claiming that review ran.
