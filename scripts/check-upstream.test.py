"""Exercise incorrect provenance and an upstream snapshot not yet integrated."""
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('check_upstream', Path(__file__).with_name('check-upstream.py'))
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class ProvenanceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.git('init', '-b', 'main')
        self.git('config', 'user.name', 'Fixture')
        self.git('config', 'user.email', 'fixture@example.invalid')
        (self.root / '.cursor-plugin').mkdir()
        (self.root / '.cursor-plugin/plugin.json').write_text('{"version":"1.0.0"}')
        self.git('add', '.')
        self.git('commit', '-m', 'Original-Commit: ' + 'a' * 40 + '\n\nOriginal-Path: pstack')
        self.snapshot = self.git('rev-parse', 'HEAD')
        self.pin = {
            'repository': 'https://github.com/cursor/plugins', 'path': 'pstack',
            'commit': 'a' * 40, 'snapshot_commit': self.snapshot,
            'snapshot_tree': self.git('rev-parse', 'HEAD^{tree}'),
            'version': '1.0.0', 'local_version': '0.2.0',
        }
        (self.root / 'plugin.json').write_text('{"version":"0.2.0"}')
        self.save()

    def git(self, *args):
        return checker.git(self.root, *args)

    def save(self):
        (self.root / 'UPSTREAM.json').write_text(json.dumps(self.pin))

    def test_integrated_snapshot(self):
        self.assertEqual(checker.check(self.root), self.snapshot)

    def test_rejects_wrong_pin_and_tree(self):
        for key, value in [('commit', 'b' * 40), ('snapshot_tree', 'b' * 40),
                           ('repository', 'https://github.com/backnotprop/pstack'),
                           ('version', '9.0.0'), ('local_version', '9.0.0')]:
            with self.subTest(key=key):
                old = self.pin[key]
                self.pin[key] = value
                self.save()
                with self.assertRaises(ValueError):
                    checker.check(self.root)
                self.pin[key] = old
        self.save()

    def test_rejects_unmerged_upstream_snapshot(self):
        self.git('switch', '-c', 'future')
        (self.root / 'new-upstream-file').write_text('future')
        self.git('add', 'new-upstream-file')
        self.git('commit', '-m', 'Original-Commit: ' + 'a' * 40 + '\n\nOriginal-Path: pstack')
        self.pin['snapshot_commit'] = self.git('rev-parse', 'HEAD')
        self.pin['snapshot_tree'] = self.git('rev-parse', 'HEAD^{tree}')
        self.git('switch', 'main')
        self.save()
        with self.assertRaises(subprocess.CalledProcessError):
            checker.check(self.root)


if __name__ == '__main__':
    unittest.main()
