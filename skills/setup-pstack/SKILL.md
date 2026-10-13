---
name: setup-pstack
description: Configure pstack role models and reasoning preferences for Codex. Use for setup-pstack, configuring pstack models, or changing its reasoning budget.
---

# Setup pstack for Codex

Read [the runtime contract](../poteto-mode/references/codex-runtime.md). Configure `<repo>/.codex/pstack/models.json` without changing global Codex settings. If no repository is selected, ask for the configuration location before writing.

1. Inspect models and supported effort levels exposed by the active host. Preserve current selections. With no configuration or no advertised alternatives, use `inherit-parent` and omit effort overrides. Never invent a model ID.
2. Apply preferences the user already supplied. Ask only for missing choices that matter. Budget labels `small`, `medium`, `large`, and `unlimited` express desired effort (`medium`, `high`, `xhigh`, `max`) where that model supports it; they never mean unlimited money or permission. Model and effort are separate values.
3. Use the schema below. A single role is an object; a panel is a nonempty list of objects. Panel length controls the number of runs, not concurrent slots. The cross-judge pool supplies one judge. Missing roles inherit the parent; missing panels use two independent inherited-model runs.
4. Validate names against the host's supported set and efforts against the selected model. Keep `inherit-parent` and `auto` effort-free. For unsupported preferences report the mismatch and obtain or apply an already-authorized fallback. Preserve unrelated existing values. Write valid JSON idempotently.
5. Show the resulting roles and location. Skills load this file at run start and the parent passes resolved choices to workers; it is not an automatically applied Codex rule. Offer the existing create-verification-skill workflow if the project lacks a real-app verification path.

```json
{
  "version": 1,
  "roles": {
    "feature, refactoring": {"model": "inherit-parent"},
    "bug-fix": {"model": "inherit-parent"},
    "perf-issue": {"model": "inherit-parent"},
    "hillclimb": {"model": "inherit-parent"},
    "judgment and prose": {"model": "inherit-parent"},
    "hardest tasks": {"model": "inherit-parent"},
    "how explorer": {"model": "inherit-parent"},
    "how explainer": {"model": "inherit-parent"},
    "why investigators": {"model": "inherit-parent"},
    "why synthesizer": {"model": "inherit-parent"},
    "reflect tooling": {"model": "inherit-parent"},
    "reflect judgment, divergent, synthesizer": {"model": "inherit-parent"},
    "arena runners": [{"model": "inherit-parent"}, {"model": "inherit-parent"}],
    "arena cross-judge pool": [{"model": "inherit-parent"}],
    "swarm workers": {"model": "inherit-parent"},
    "architect runners": [{"model": "inherit-parent"}, {"model": "inherit-parent"}],
    "interrogate reviewers": [{"model": "inherit-parent"}, {"model": "inherit-parent"}]
  }
}
```

For an explicitly selected supported model, the role object may also contain `reasoning_effort`. Translate that to the actual host's spawn field; do not pass this JSON object directly as a tool argument.
