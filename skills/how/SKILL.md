---
name: how
description: "Use for \"how does X work\", code walkthroughs before changing something, and placement / ownership / layering questions (\"where should this live\", \"which package owns this\", \"is this the right layer\"). Explains subsystem architecture, runtime flow, onboarding mental models. Use why for motivation."
---

Before using this skill, read the shared [Codex runtime contract](../poteto-mode/references/codex-runtime.md) once per run. Resolve bundled skills by package path and follow that contract for tools, models, history, scheduling, and permissions.


# How

Explore the codebase to answer "how does X work?" questions.

If the scope is ambiguous, state your interpretation and explore. The user can redirect.

## 1. Explain

Spawn one native delegate with read-only task scope that explores and explains in one pass. Resolve the `how explainer` role through the runtime Models contract, defaulting to `inherit-parent`, within available worker slots. If delegation is unavailable or forbidden, explore and explain inline and label that limitation. Give the delegate the user's question and this brief:

> You are writing an architectural explanation for a senior engineer. Explore the codebase and write an explanation that a senior engineer unfamiliar with this area could read and walk away with a solid mental model. They should understand the architecture well enough to start working in it confidently. You have read-only access to the codebase.

## 2. Present

Present the subagent's output. Light edits for clarity or context from the conversation are fine. Do not substantially rewrite it.
