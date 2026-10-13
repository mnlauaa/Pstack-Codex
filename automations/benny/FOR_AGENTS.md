# Benny for Codex

Benny is a dormant two-flow automation pack for triaging issue reports and reproducing/fixing confirmed issues. Read [setup-benny](skills/setup-benny/SKILL.md) only when the user asks to configure or activate it. Loading pstack does not start Benny or authorize Slack/tracker writes.

Keep the existing operational skills, templates, adapters, feature maps, source-thread identity rules, compensation behavior, and recording requirements. Bind the two flows to actual host capabilities. Incoming-message events and scheduled polling are distinct trigger types.

The files in references/cursor-setup.md and references/cursor-handoff.md preserve upstream provider-specific setup for comparison; they are not Codex execution steps.
