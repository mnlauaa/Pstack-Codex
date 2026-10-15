import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, realpathSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

test("audit preserves a dirty worktree with spaces and never treats absent history as safe", () => {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), "pstack audit ")));
  const repo = join(dir, "main repo");
  const checkout = join(dir, "worker checkout");
  const bin = join(dir, "bin");
  mkdirSync(bin);
  writeFileSync(join(bin, "gh"), '#!/bin/sh\nprintf "[]\\n"\n', {mode: 0o755});
  writeFileSync(join(bin, "origin"), "#!/bin/sh\nexit 1\n", {mode: 0o755});
  const env = {...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1", PATH: `${bin}:${process.env.PATH}`, PSTACK_TRANSCRIPT_DIR: ""};
  function git(...args) {
    const result = spawnSync("git", args, {env, encoding: "utf8"});
    assert.equal(result.status, 0, result.stderr);
  }
  try {
    git("init", "--initial-branch=main", repo);
    git("-C", repo, "config", "user.name", "Fixture");
    git("-C", repo, "config", "user.email", "fixture@example.invalid");
    git("-C", repo, "config", "core.hooksPath", "/dev/null");
    writeFileSync(join(repo, "owned.txt"), "base\n");
    git("-C", repo, "add", "owned.txt");
    git("-C", repo, "commit", "-m", "fixture");
    git("-C", repo, "update-ref", "refs/remotes/origin/main", "HEAD");
    git("-C", repo, "worktree", "add", "-b", "worker", checkout);
    const audit = (...args) => spawnSync("bash", [fileURLToPath(new URL("./worktree-audit.sh", import.meta.url)), ...args, repo], {env, encoding: "utf8"});
    const clean = audit();
    assert.equal(clean.status, 0, clean.stderr);
    assert.ok(clean.stdout.includes(`\treview-history\t${checkout}`), clean.stdout);
    writeFileSync(join(checkout, "owned.txt"), "user modification\n");
    const dirty = audit();
    assert.equal(dirty.status, 0, dirty.stderr);
    assert.ok(dirty.stdout.includes(`\thold-wip\t${checkout}`), dirty.stdout);
    assert.equal(readFileSync(join(checkout, "owned.txt"), "utf8"), "user modification\n");

    git("-C", checkout, "add", "owned.txt");
    git("-C", checkout, "commit", "-m", "worker change");
    git("-C", repo, "update-ref", "refs/remotes/origin/integration", "worker");
    const row = (result) => {
      assert.equal(result.status, 0, result.stderr);
      return result.stdout.split("\n").find((line) => line.endsWith(`\t${checkout}`)).split("\t");
    };
    assert.equal(row(audit())[2], "no", "worker change is not merged into origin/main");
    const explicit = audit("--base", "origin/integration");
    assert.equal(row(explicit)[2], "YES");
    assert.equal(row(explicit)[7], "review-history", "base selection must not bypass history review");
    assert.match(explicit.stdout, /^# base: origin\/integration/m);

    git("-C", repo, "symbolic-ref", "refs/remotes/origin/HEAD", "refs/remotes/origin/integration");
    assert.equal(row(audit())[2], "YES", "remote HEAD takes precedence over origin/main");
    git("-C", repo, "symbolic-ref", "--delete", "refs/remotes/origin/HEAD");
    git("-C", repo, "update-ref", "-d", "refs/remotes/origin/main");
    git("-C", repo, "update-ref", "refs/remotes/origin/master", "worker");
    assert.equal(row(audit())[2], "YES", "origin/master is supported as a fallback");

    // Both forge schemas must hold open work, including Origin drafts.
    writeFileSync(join(bin, "gh"), `#!/bin/sh\nprintf '%s\\n' '[{"number":7,"state":"OPEN","headRefName":"worker"}]'\n`, {mode: 0o755});
    assert.equal(row(audit())[7], "hold-open-pr", "GitHub fallback holds open PRs");
    writeFileSync(join(bin, "origin"), `#!/bin/sh\nprintf '%s\\n' '[{"number":8,"status":"draft","headRef":"worker"}]'\n`, {mode: 0o755});
    assert.equal(row(audit())[7], "hold-open-pr", "Origin drafts remain in use");
    assert.equal(row(audit())[5], "#8/draft", "Origin takes precedence when available");
    writeFileSync(join(bin, "origin"), "#!/bin/sh\nexit 1\n", {mode: 0o755});
    writeFileSync(join(bin, "gh"), "#!/bin/sh\nexit 1\n", {mode: 0o755});
    assert.equal(row(audit())[7], "review-history", "unavailable forges do not authorize removal");

    const missing = audit("-b", "does-not-exist");
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /base ref not found/);
    const invalid = audit("--unknown");
    assert.equal(invalid.status, 2);
    assert.match(invalid.stderr, /unknown option/);
    git("-C", repo, "update-ref", "-d", "refs/remotes/origin/master");
    const noBase = audit();
    assert.equal(noBase.status, 1);
    assert.match(noBase.stderr, /no base ref/);
    assert.equal(readFileSync(join(checkout, "owned.txt"), "utf8"), "user modification\n");
  } finally {
    rmSync(dir, {recursive: true, force: true});
  }
});
