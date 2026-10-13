---
name: setup-benny
description: Configure the dormant Benny triage and reproduce/fix automation pack for Codex when the user requests its setup or activation.
---

# Set up Benny for Codex

Read the pstack [runtime contract](../../../../skills/poteto-mode/references/codex-runtime.md). Keep the two operational flows and their existing adapters. No automation or external write starts without the user's applicable request.

1. Resolve the repository and hosting environment. Preserve an existing installation and user-owned configuration. Use the existing configuration and feature-map examples as templates, not ready credentials or valid action names. Store user-owned settings outside the source-managed pack. Never overwrite local customizations during refresh.
2. Ensure a fresh run can read this pack and its pstack dependencies at stable paths. A local heartbeat can use this installed package's resolved absolute paths. For an isolated checkout or remote host, provision the package into that environment and verify the paths there before enabling it. Do not rely on another computer's plugin-cache path or Cursor settings.
3. Fill the existing configuration schema with actual Slack source/operations channels, tracker routing, repository, action names, models, time budgets, and source-thread identity. Select only advertised models. Confirm the user grant for each external write and preserve draft-only PR behavior. Never put token values in prompts or committed configuration.
4. Read and run the existing [control-adapter setup](../reproduce-and-fix-issues/references/control-adapter.md), including its nine-step real-app check, screenshots, and required video. Missing drive or recording capability fails that check; do not substitute compilation.
5. Resolve the trigger for each flow. A connected incoming Slack-message event needs an actual supported event subscription. If only a scheduler exists, offer or use polling only when the user has authorized that behavior; keep a durable cursor and deduplicate by source message identity. Report an unsupported event requirement rather than quietly replacing it.
6. On Codex desktop use the available automation tool with its actual schema for supported scheduled work. Preserve existing automation IDs and update rather than duplicate. Each prompt names the exact operational SKILL.md, config, writable state, allowed channels/actions, budget, deduplication key, and completion/cancellation behavior. Scheduled calls alone do not implement incoming-message subscriptions.
7. Verify the secret-free configuration and paths from the actual runner. Use a user-authorized test report to check source identity, triage, tracker behavior, and reproduction evidence. Record the returned automation/subscription IDs and run receipts. If any requirement fails, leave the affected automation disabled and report that limitation.

Use [triage-issue-reports](../triage-issue-reports/SKILL.md) and [reproduce-and-fix-issues](../reproduce-and-fix-issues/SKILL.md) as the live flow entrypoints. The pack remains dormant until those checks succeed.
