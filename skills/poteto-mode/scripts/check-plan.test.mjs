import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const checker = fileURLToPath(new URL("./check-plan.mjs", import.meta.url));
const rule = "Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.";
const plan = `# Export records

Deliver a checked export path.

## How to read this
One box is one unit of work. Each box names the evidence.
Check a box only when its evidence exists.
Use playbooks/autopilot-stack.md.
${rule}

## Program checklist
### Arm the program
- [ ] Read \`installed-playbook: skills/poteto-mode/playbooks/autopilot-stack.md\`.
- [ ] Register \`hourly-audit\` with the supported scheduler and record its ID.
### Spawn owners
- [ ] Dispatch within the available slots.
### PR mechanics
- [ ] Follow the agreed delivery boundary.
### Verdict and merge
- [ ] Record a status message only on change.
### Boot recipe
- [ ] Resume from the recorded state.

## Export data (PR 1)
**Depends on.** None.
**Files.**
- [ ] Update export.js.
**Build.**
- [ ] Implement export.
**You see.**
- [ ] Exported records match the selection.
**Verify, unit.** ${rule}
- [ ] Run the export tests.
**Verify, live.** ${rule} Ten lanes on \`inherit-parent\` at the PR head.
${Array.from({length: 10}, (_, i) => `- [ ] Lane ${i + 1}. Exercise scenario ${i + 1}. Save \`lane-${i + 1}.png\`. Pass when records match.`).join("\n")}
**Verify, perf.** ${rule}
- [ ] Metric. Latency.
- [ ] Probe. Same dataset on trunk and head.
- [ ] Baseline. Record trunk latency.
- [ ] Rule. Reject a regression beyond the agreed budget.
**Review gate.** None. PR 1 changes no interaction.
**Merge.**
- [ ] Await the operator's requested landing decision.

## Close the program
- [ ] Disable the recorded schedule.
## Appendix A. Prototype evidence
No prototype was needed for this fixture.
`;

function check(text) {
  const dir = mkdtempSync(join(tmpdir(), "pstack-plan-"));
  try {
    const path = join(dir, "plan.md");
    writeFileSync(path, text);
    return spawnSync(process.execPath, [checker, path], {encoding: "utf8"});
  } finally {
    rmSync(dir, {recursive: true, force: true});
  }
}

test("accepts a complete Codex plan with an installed source and scheduled audit", () => {
  const result = check(plan);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 PR sections, 0 problems/);
});

test("rejects missing scheduling and legacy Cursor-only plan markers", () => {
  for (const text of [
    plan.replace("hourly-audit", "manual-check"),
    plan.replace("hourly-audit", "/loop 1h").replace("installed-playbook:", "git show origin/main:"),
  ]) {
    const result = check(text);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /hourly-audit/);
  }
});

test("retains the ten-lane evidence requirement", () => {
  const result = check(plan.replace(/^- \[ \] Lane 10\..*\n/m, ""));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /expected 1 to 10/);
});
