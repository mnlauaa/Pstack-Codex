---
name: pstack-codex
description: Run pstack engineering workflows in Codex. Use when the user requests pstack, poteto mode, or this package's coordinated development, investigation, review, or PR workflows.
---

# Pstack for Codex

Read [the runtime contract](skills/poteto-mode/references/codex-runtime.md), then [poteto-mode](skills/poteto-mode/SKILL.md). Match the request to its existing playbook and load only the helpers it needs.

For model setup, use [setup-pstack](skills/setup-pstack/SKILL.md). For a tour or choosing a workflow, use [poteto-help](skills/poteto-help/SKILL.md). The `skills/` directory is the bundled collection; resolve names there instead of substituting unrelated installed skills.

This package preserves upstream pstack's structure. The runtime contract adapts its execution to Codex. Invoking it does not authorize actions outside the user's task. A missing tool is a capability limit to report, not permission to invent a tool or claim a check passed.
