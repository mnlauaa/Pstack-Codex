#!/usr/bin/env python3
"""Check the imported original baseline and its integration into this checkout."""
import json
from pathlib import Path
import subprocess
import sys


def git(root, *args):
    return subprocess.check_output(
        ['git', '-C', str(root), *args], text=True, stderr=subprocess.PIPE
    ).strip()


def check(root):
    pin = json.loads((root / 'UPSTREAM.json').read_text())
    if (pin['repository'], pin['path']) != ('https://github.com/cursor/plugins', 'pstack'):
        raise ValueError('The source must remain original cursor/plugins/pstack')
    snapshot = pin['snapshot_commit']
    if git(root, 'rev-parse', snapshot + '^{commit}') != snapshot:
        raise ValueError('snapshot_commit must be a full commit SHA')
    if git(root, 'rev-parse', snapshot + '^{tree}') != pin['snapshot_tree']:
        raise ValueError('Imported snapshot tree differs from the recorded tree')
    message = git(root, 'show', '-s', '--format=%B', snapshot)
    if 'Original-Commit: ' + pin['commit'] not in message.splitlines():
        raise ValueError('Imported snapshot does not identify the pinned original commit')
    if 'Original-Path: pstack' not in message.splitlines():
        raise ValueError('Imported snapshot must identify the pstack subtree')
    manifest = json.loads(git(root, 'show', snapshot + ':.cursor-plugin/plugin.json'))
    if manifest['version'] != pin['version']:
        raise ValueError('Original package version differs from the source pin')
    git(root, 'merge-base', '--is-ancestor', snapshot, 'HEAD')
    local = json.loads((root / 'plugin.json').read_text())
    if local['version'] != pin['local_version']:
        raise ValueError('Local plugin version differs from the source pin')
    return snapshot


if __name__ == '__main__':
    try:
        print('Integrated original snapshot verified:', check(Path(__file__).resolve().parents[1]))
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as error:
        print('Upstream check failed:', error, file=sys.stderr)
        sys.exit(1)
