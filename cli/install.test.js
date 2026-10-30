const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const {
    TOOLS,
    ROOT_FILES,
    ensureDir,
    copyWithReplace,
    removeSubdirectories,
} = require('./install.js');

describe('BoomOpen Workflow Kit v5.1 CLI Installer', () => {
    test('TOOLS.antigravity uses boomopen-workflow-kit frameworkPath and replacements', () => {
        assert.ok(
            TOOLS.antigravity.paths.frameworkPath.endsWith(
                path.join('.gemini', 'config', 'skills', 'boomopen-workflow-kit')
            )
        );
        assert.strictEqual(
            TOOLS.antigravity.replacements['boomopen-workflow-kit'],
            'boomopen-workflow-kit'
        );
        assert.strictEqual(
            TOOLS.antigravity.replacements['~/.{TOOL}/skills/boomopen-workflow-kit/'],
            '~/.gemini/config/skills/boomopen-workflow-kit/'
        );
    });

    test('ROOT_FILES includes README.md and SKILL.md', () => {
        assert.ok(ROOT_FILES.includes('README.md'));
        assert.ok(ROOT_FILES.includes('SKILL.md'));
    });

    test('ensureDir() creates directory if missing', () => {
        const tmpDir = path.join(os.tmpdir(), 'boomopen-test-dir-' + Date.now());
        ensureDir(tmpDir);
        assert.ok(fs.existsSync(tmpDir));
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    test('copyWithReplace() replaces placeholders in markdown files', () => {
        const srcDir = path.join(os.tmpdir(), 'boomopen-src-' + Date.now());
        const destDir = path.join(os.tmpdir(), 'boomopen-dest-' + Date.now());
        ensureDir(srcDir);
        fs.writeFileSync(
            path.join(srcDir, 'sample.md'),
            'Load ~/.{TOOL}/skills/boomopen-workflow-kit/rules/CORE.md',
            'utf8'
        );

        copyWithReplace(srcDir, destDir, TOOLS.antigravity.replacements, false);
        const output = fs.readFileSync(path.join(destDir, 'sample.md'), 'utf8');
        assert.strictEqual(
            output,
            'Load ~/.gemini/config/skills/boomopen-workflow-kit/rules/CORE.md'
        );

        fs.rmSync(srcDir, { recursive: true, force: true });
        fs.rmSync(destDir, { recursive: true, force: true });
    });

    test('removeSubdirectories() removes nested dirs while preserving _ref', () => {
        const wfDir = path.join(os.tmpdir(), 'boomopen-wf-' + Date.now());
        ensureDir(path.join(wfDir, '_ref'));
        ensureDir(path.join(wfDir, 'cook'));
        fs.writeFileSync(path.join(wfDir, '_ref', 'proto.md'), 'keep', 'utf8');
        fs.writeFileSync(path.join(wfDir, 'cook', 'fast.md'), 'remove', 'utf8');
        fs.writeFileSync(path.join(wfDir, 'cook-fast.md'), 'keep-root', 'utf8');

        removeSubdirectories(wfDir, false);
        assert.ok(fs.existsSync(path.join(wfDir, '_ref', 'proto.md')));
        assert.ok(fs.existsSync(path.join(wfDir, 'cook-fast.md')));
        assert.ok(!fs.existsSync(path.join(wfDir, 'cook')));

        fs.rmSync(wfDir, { recursive: true, force: true });
    });
});
