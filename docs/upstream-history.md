# Original upstream history baseline

Established on 2026-10-13 using the original pstack version already integrated, **0.15.21**. No newer upstream content was imported and no third-party mirror was used.

| Identity | Value |
|---|---|
| Original repository | `https://github.com/cursor/plugins` |
| Original subtree | `pstack/` |
| Original monorepo commit | `fe53d9e9093dbb9ae298563b1a9d702dd6e2ca08` |
| Imported subtree commit (`upstream`) | `1d1e34b929dfdae135dfa5225fe4a93366e7b18b` |
| Imported subtree tree | `8824c764d99583f7cc8059c915296e444c53f060` |
| Published main before bridge | `d1617a64e245145516a3e5e65859505a5fcbd9ae` |
| Backup tag | `backup/pre-upstream-bridge-2026-10-13` |
| One-time bridge commit | `84e5f399ef8751d0e3bb109f87c22fa0a65be909` |
| Main tree before and immediately after bridge | `1c0000b247ea4c4810ab0249f64b555be9bc04b4` |

The imported subtree contains all 167 source files with original bytes and executable modes. Its local commit is an import record, not the original Cursor commit. The original archive SHA-256 and PAX source commit matched the existing pin; signatures were not verified.

The bridge has the previous main tip as its first parent and the imported snapshot as its second. It used the `ours` merge strategy **only because that original snapshot was already ported and validated**. The identical before/after tree proves the bridge itself changed no files. Existing published commits remain ancestors; no rebase or force-push was needed.

A disposable clone rehearsed the bridge and a synthetic future upstream-only edit. The future edit merged normally and the Codex runtime contract stayed byte-identical. The synthetic commit was never imported into this repository.

Future updates use ordinary three-way merges as described in [UPSTREAM.md](../UPSTREAM.md). Never repeat the history bridge for new upstream changes. Provenance checks validate recorded metadata and ancestry; they do not replace comparing a snapshot against the downloaded original or testing runtime behavior.
