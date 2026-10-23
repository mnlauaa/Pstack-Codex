# Pstack for Codex

A community-maintained Codex port of [Lauren Tan’s pstack](https://github.com/cursor/plugins/tree/main/pstack): engineering skills, autonomous workflows, delegated reviews, and verification tools.

This port tracks the original upstream while adapting its instructions to Codex’s tools and authorization boundaries. It is not an official Cursor or OpenAI project.

**Port version:** 0.15.29 · **Upstream:** 0.15.29 · **Source commit:** [`88d4751`](https://github.com/cursor/plugins/tree/88d47514b82e7c44f00f2b2a72ff6dd12158038c/pstack)

## What’s included

- **56 main skills** for implementation, investigation, architecture, reviews, testing, and technical writing.
- **23 playbooks** for coordinated development and longer-running work.
- Codex adaptations for native delegation, model inheritance, worktree isolation, scoped history, and supported scheduling.
- Plan validation, worktree auditing, and GitHub PR-watching scripts.
- `$ketchup` for a visual catch-up with every pending decision, its evidence, and risk.
- `$in-your-own-words` to confirm the agent understands your goal before work starts.
- `$sharpen` to rewrite a prompt with expert methods, raw sources, and an outside check, without executing the task.
- `$create-formal-verification-skill` and `$maintain-formal-verification-skill` for bounded property checks and keeping them aligned with the code. Verifiers are not bundled.
- Source provenance, a change log, and a three-way merge guide for future upstream updates.

## Install in Codex

Register this repository as a marketplace using the Codex CLI:

```bash
codex plugin marketplace add mnlauaa/Pstack-Codex --ref main
codex plugin marketplace list
```

Restart the desktop app, open Plugins, select **Pstack for Codex**, and install **pstack-codex**. Start a new chat and select **poteto-help** for a tour or **poteto-mode** to run a workflow. Adding the marketplace makes the plugin discoverable; it does not itself install the plugin.

The [marketplace catalog](.agents/plugins/marketplace.json) points to this repository’s root plugin. Plugin installation discovers the 56 main skills under `skills/`; the root `SKILL.md` is a separate entry for direct use, and the dormant Benny skills are outside that discovery directory.

To refresh the marketplace after new commits:

```bash
codex plugin marketplace upgrade pstack-marketplace
```

Then reopen the Plugins directory and apply any available plugin update. Marketplace refresh and plugin installation are separate operations. These commands require a Codex version with marketplace support; see the [official plugin documentation](https://developers.openai.com/plugins/build/plugins#add-a-marketplace-from-the-cli).

## Use the source directly

Clone the package:

```bash
git clone https://github.com/mnlauaa/Pstack-Codex.git
cd Pstack-Codex
```

Open your target project in Codex and point it at this package’s `SKILL.md`. Replace `/absolute/path/to/Pstack-Codex` with your clone’s location:

> Read /absolute/path/to/Pstack-Codex/SKILL.md. Use pstack to fix the reported bug in my repository. Reproduce it, make the smallest correct change, run the relevant checks, and get an independent review. Keep the result local.

Cloning alone does not register skills or alter Codex settings. The root [SKILL.md](SKILL.md) routes direct-use requests into the package. The bundled main skill is [poteto-mode](skills/poteto-mode/SKILL.md); [poteto-help](skills/poteto-help/SKILL.md) maps the other workflows.

## Codex behavior

Read the [runtime contract](skills/poteto-mode/references/codex-runtime.md). It binds native subagents, explicit worktrees, model inheritance, scoped history, real scheduling, and authorization. Model preferences are optional; [setup-pstack](skills/setup-pstack/SKILL.md) writes project-local JSON when requested. Panels default to independent inherited-model runs. Workers run within the host's actual limit.

The main collection retains its existing explicit-invocation policies. The new entry skill permits normal discovery. Internal skill names resolve within this package, avoiding collisions with other installed skills.

## Runtime prerequisites

Plain instruction workflows need no package installation. The existing orchestration and GitHub-watcher tools need Bun, their pinned dependencies, and authenticated GitHub CLI. In a writable source checkout, run `bun install --frozen-lockfile` in `skills/poteto-mode/scripts/`. For an immutable plugin cache, use a writable copy. Node runs the plan checker. The stack frontier now uses the PR base chain through `gh` or optional `--forge origin`; Graphite is not required.

Persistent checks require a real scheduler exposed by the host. A skill and a polling process do not themselves keep a closed application running. Required live UI proof needs actual browser/app control and recording support where specified.

## Optional integrations

[Benny](automations/benny/FOR_AGENTS.md) remains dormant until explicitly configured. Its two workflows require verified connectors and triggers. [Bot UI](skills/make-bot-ui/SKILL.md) supports an existing verified webhook/wake backend; the archived Cursor setup is reference material only. Neither is activated by loading this package.

The [guide](docs/guide/README.md) retains the engineering walkthroughs. Use the runtime contract for host-specific behavior. [PORT.md](PORT.md) records the changes and validation limits.

## Updates

We track original `cursor/plugins/pstack` directly. The `upstream` branch holds its untouched subtree; `main` carries the Codex adaptation. Future changes merge through these shared ancestors. Maintainers should start with [AGENTS.md](AGENTS.md) and [UPSTREAM.md](UPSTREAM.md).

This port is version 0.15.29. Package versions match the integrated upstream version; the original commit pin identifies updates within the same upstream version. [UPDATES.md](UPDATES.md) lists the features, fixes, and retained Codex differences. [UPSTREAM.md](UPSTREAM.md) explains how to merge the next original pstack update; [UPSTREAM.json](UPSTREAM.json) pins the integrated source. Use the new [ketchup skill](skills/ketchup/SKILL.md) to catch up on a chat and its pending decisions.

## Validation

The 0.2.5 update passed 68 Bun tests, four Node tests, three provenance tests, strict TypeScript checks, and validation of all 60 skill entrypoints. See [VALIDATION.md](VALIDATION.md) for the tested scope and limitations.

To run the script checks locally, with Bun and Node installed:

```bash
cd skills/poteto-mode/scripts
bun install --frozen-lockfile
bun run test
bun run typecheck
bash -n worktree-audit.sh
```

## Attribution and license

Original pstack by **Lauren Tan**, distributed through [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack). This repository maintains the Codex adaptation and preserves the original [MIT license](LICENSE).
