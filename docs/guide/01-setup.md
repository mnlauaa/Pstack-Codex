# Set up pstack for Codex

Use this package's root SKILL.md directly, or register the folder using a supported local skill/plugin installation. Creating this folder alone does not globally install it. See the [package README](../../README.md).

## Pick your models

The default is the parent model with no effort override. Run [setup-pstack](../../skills/setup-pstack/SKILL.md) when you want role-specific choices. It writes project-local `.codex/pstack/models.json`, loaded at run start. A role is a model/effort object; a panel is a list. Only actual host-supported model/effort combinations are accepted. An inherited-model panel supplies independent runs, not cross-provider diversity.

Re-read changed configuration before the next dispatch. Existing agents keep their launch settings. A longer panel uses more total work and is queued within the available worker slots.

## Verify the real app

Use the existing project harness where possible. If it lacks the needed user path, [create-verification-skill](../../skills/create-verification-skill/SKILL.md) can create a project-local verification workflow. Confirm the actual control and recording tools are available before promising those checks.

## Run your first task

Load the root skill and ask for a small real change with explicit acceptance checks and a delivery boundary. For example:

> Use pstack to add a --json flag to this command. Text output must stay byte-identical. Verify both and keep the changes local.

The workflow selects a playbook, tracks its steps using available planning tools or a checklist, and reports evidence and omissions. Follow [the runtime contract](../../skills/poteto-mode/references/codex-runtime.md) for worktrees, scheduling, permissions, and history.

Next: [Route work through poteto-mode](02-poteto-mode.md).
