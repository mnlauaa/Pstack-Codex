---
name: make-bot-ui
description: Build a UI that sends actions to a verified webhook-backed agent service. Use when requesting a bot dashboard, webhook controls, or a Tailscale-accessible agent UI.
---

# Make a bot UI from Codex

Read [the runtime contract](../poteto-mode/references/codex-runtime.md). Preserve the UI, server, webhook, and optional tailnet structure. A native arbitrary-webhook wake endpoint is not assumed.

1. Identify the actual backend and its documented create/trigger interface, request envelope, authentication, and success receipt. Use a supported connected service or an endpoint the user already supplies. If the host lacks a receiver or agent wake path, explain precisely what is missing before implementing dependent delivery. An HTTP 200 without a run receipt does not prove the agent woke.
2. If the user specifically wants the original Cursor backend, consult [the preserved provider reference](references/cursor-backend.md). Its tools, UI clicks, and secret cards apply only inside that verified provider environment; never call those names as Codex tools.
3. Keep credentials in the backend's supported secret store or a user-configured server environment variable. Never request secrets in chat or ship them to the browser. Use a secure input facility only when actually exposed. Use the backend's documented authentication headers; do not invent them.
4. Build the page and a small server-side action endpoint. Validate allowed actions and fields, treat event bodies as data, use a bounded request timeout, and report delivery failure without duplicating mutating requests. UI buttons call the local server; the server contacts the backend. Retain failed action metadata only if safe and necessary, excluding credentials and sensitive bodies.
5. If tailnet access was requested, inspect and reuse an existing Tailscale node. Use platform-appropriate setup if installation is authorized. Bind only the interface needed, verify network reachability and access controls, and do not expose an unauthenticated action endpoint more broadly than requested.
6. Probe with a harmless action that the backend explicitly ignores or treats as a health check. Verify both delivery and the target run receipt, then exercise the real UI through available browser tooling. Report the URL, supported actions, evidence, and any unverified integration.

Do not claim a webhook or secret store was created merely because a prompt describes one. The original event/body schema remains in the provider reference for a deliberate Cursor-backed integration.
