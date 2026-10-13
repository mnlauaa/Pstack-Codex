# Codex port record

Upstream is Lauren Tan's pstack 0.15.21 from cursor/plugins commit `fe53d9e9093dbb9ae298563b1a9d702dd6e2ca08`. This local adaptation is version 0.2.0. Retain LICENSE and this provenance when redistributing.

The 52-skill main collection and all 23 playbooks are retained. Changes add a root entry skill and portable plugin manifest, normalize skill metadata, preserve existing invocation policies, and bind execution through skills/poteto-mode/references/codex-runtime.md. Model setup now uses project-local JSON with inheritance defaults. Delegation uses native tool schemas and explicit writer isolation. The plan checker and templates use installed-playbook and hourly-audit markers. History is scoped through available Codex tools. Worktree history is optional explicit input, and uncertain history cannot classify a checkout as safe to delete.

The original orchestration store, PR watcher, decision logger, Bun lockfile, and tests are retained. Runtime dependencies are not bundled. Provider-specific Benny and bot setup remains archived as labeled reference material; live entrypoints check actual connectors, triggers, credentials, and control evidence.

Creating this source folder does not install global skills, change Codex model settings, create automations, contact Slack, publish a PR, or enable a webhook. See VALIDATION.md for the checks actually run and their limits.

Source updates and every retained customization are tracked in [UPDATES.md](UPDATES.md), [UPSTREAM.json](UPSTREAM.json), and the linked per-file inventory. Follow [UPSTREAM.md](UPSTREAM.md) for future three-way updates.
