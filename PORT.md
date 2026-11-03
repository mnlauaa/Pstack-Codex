# Codex port record

Upstream is Lauren Tan's pstack 0.15.36 from cursor/plugins commit `4dd1d05818d19792e7cd6e818f1667f95f7e1dbe`. This local adaptation is version 0.15.36. Retain LICENSE and this provenance when redistributing.

The 58-skill main collection and all 23 playbooks are retained. Changes add a root entry skill and portable plugin manifest, normalize skill metadata, preserve existing invocation policies, and bind execution through skills/poteto-mode/references/codex-runtime.md. Model setup now uses project-local JSON with inheritance defaults. Delegation uses native tool schemas and explicit writer isolation. The plan checker and templates use installed-playbook and hourly-audit markers. History is scoped through available Codex tools. Worktree history is optional explicit input, and uncertain history cannot classify a checkout as safe to delete.

The PR watcher, decision logger, Bun lockfile, and their tests are retained. Upstream removed the orchestration CLI/store; the Codex coordinator uses native delegation and durable run files, retaining scheduler IDs, recovery, pinned leases, and one writer per branch. PR stacks follow actual dependencies. Runtime dependencies are not bundled. Provider-specific Benny and bot setup remains archived as labeled reference material; live entrypoints check actual connectors, triggers, credentials, and control evidence.

Creating this source folder does not install global skills, change Codex model settings, create automations, contact Slack, publish a PR, or enable a webhook. See VALIDATION.md for the checks actually run and their limits.

Source updates and every retained customization are tracked in [UPDATES.md](UPDATES.md), [UPSTREAM.json](UPSTREAM.json), and the linked per-file inventory. Follow [UPSTREAM.md](UPSTREAM.md) for future three-way updates.

Original source snapshots now live on `upstream`; `main` retains Codex adaptations. The two histories share a recorded baseline without rewriting published commits. See [AGENTS.md](AGENTS.md) for agent maintenance rules and [the history record](docs/upstream-history.md) for the initial bridge.


The 0.15.36 statechart TypeScript pipeline replaces the old `.mjs` tools and portable fault-injection harness. Its local fixes annotate the checker exit union, canonicalize the launcher fixture’s temporary path on macOS, and make two signal test callbacks return void. All other executable statechart files match upstream. The new suite exercises actual TLC checks, differential replay, CLI failures, signals, and SVG rendering. Rendering is separate from model checking; dependency installation remains scoped.
