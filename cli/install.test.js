const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  TOOLS,
  ROOT_FILES,
  buildCompactSkillIndex,
  runDoctor,
  runCheck,
} = require('./install.js');
const {
  SOFT_FILE_LINES,
  HARD_FILE_LINES,
  inspectSourceFile,
} = require('./checker.js');

const REPO_ROOT = path.resolve(__dirname, '..');

test('All 5 TOOLS (antigravity, claude, codex, copilot, cursor) use platforms/<tool> assets that exist on disk', () => {
  const expectedTools = ['cursor', 'copilot', 'antigravity', 'claude', 'codex'];
  for (const toolKey of expectedTools) {
    const tool = TOOLS[toolKey];
    assert.ok(tool, `TOOLS.${toolKey} should exist`);
    assert.ok(tool.assets, `TOOLS.${toolKey}.assets should exist`);
    for (const [assetName, assetPath] of Object.entries(tool.assets)) {
      assert.ok(
        assetPath.includes(path.join('platforms', toolKey)),
        `Expected ${toolKey}.${assetName} (${assetPath}) to reside under platforms/${toolKey}`
      );
      assert.ok(
        fs.existsSync(assetPath),
        `Expected asset ${toolKey}.${assetName} to exist at ${assetPath}`
      );
    }
  }

  const ag = TOOLS.antigravity;
  assert.ok(
    ag.paths.frameworkPath.endsWith(
      path.join('.gemini', 'config', 'skills', 'boomopen-workflow-kit')
    )
  );
  assert.equal(ag.replacements['{TOOL}'], 'gemini/config');
});

test('ROOT_FILES includes SKILL.md and README.md', () => {
  assert.ok(ROOT_FILES.includes('README.md'));
  assert.ok(ROOT_FILES.includes('SKILL.md'));
});

test('All 5 platform entrypoints and templates enforce v5.5 Smart-Hybrid, Pragmatic 2-Tier Standards, and flat command routing', () => {
  const entryFiles = [
    'GEMINI.md',
    'CLAUDE.md',
    'CODEX.md',
    'COPILOT.md',
    'CURSOR.md',
    'AGENT.md',
    'platforms/antigravity/GEMINI.md',
    'platforms/antigravity/AntigravityGlobal.agent.md',
    'platforms/claude/CLAUDE.md',
    'platforms/codex/CODEX.md',
    'platforms/copilot/boomopen-workflow-kit.agent.md',
    'platforms/cursor/.cursorrules',
    'platforms/cursor/rules/boomopen-workflow-kit.mdc',
  ];

  for (const relPath of entryFiles) {
    const fullPath = path.join(REPO_ROOT, relPath);
    assert.ok(fs.existsSync(fullPath), `Expected ${relPath} to exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lineCount = content.split(/\r?\n/).length;
    assert.ok(
      lineCount <= 220,
      `Expected ${relPath} to be <= 220 lines, got ${lineCount}`
    );
    assert.ok(content.includes('v5.5'), `Expected ${relPath} to include v5.5`);
    assert.ok(content.includes('MODE A'), `Expected ${relPath} to include MODE A`);
    assert.ok(content.includes('MODE B'), `Expected ${relPath} to include MODE B`);
    assert.ok(
      content.includes('Pragmatic 2-Tier') || content.includes('PRAGMATIC 2-TIER'),
      `Expected ${relPath} to include Pragmatic 2-Tier Coding Standards`
    );
    assert.ok(
      !content.includes('commands/{cmd}/{variant}.md') &&
        !content.includes('commands/{cmd}/team.md') &&
        !content.includes('commands/{cmd}/hard.md'),
      `Expected ${relPath} not to contain legacy nested command paths`
    );
  }
});

test('Zero files in repository contain legacy code-assistants, Antigravity Kit, personal paths, or leaked secrets', () => {
  assert.ok(
    !fs.existsSync(path.join(REPO_ROOT, 'code-assistants')),
    'Legacy code-assistants directory must not exist'
  );
  assert.ok(
    !fs.existsSync(path.join(REPO_ROOT, 'global_replace.py')),
    'Scratch global_replace.py must not exist at root'
  );
  assert.ok(
    !fs.existsSync(path.join(REPO_ROOT, 'test-boom')),
    'Scratch test-boom directory must not exist at root'
  );
  assert.ok(
    fs.existsSync(path.join(REPO_ROOT, 'SECURITY.md')),
    'SECURITY.md must exist at repository root'
  );

  const dirsToScan = [
    'agents',
    'cli',
    'commands',
    'documents',
    'platforms',
    'rules',
    'scripts',
    'skills',
    'web/src',
  ];
  const rootFilesToScan = [
    'package.json',
    'LICENSE',
    'SECURITY.md',
    'README.md',
    'SKILL.md',
    'CHANGELOG.md',
    'AGENT.md',
    'AGENT-TEMPLATE.md',
    'CLAUDE.md',
    'CODEX.md',
    'COPILOT.md',
    'CURSOR.md',
    'GEMINI.md',
  ];

  function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    let out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) out = out.concat(walk(full));
      else if (/\.(md|js|ts|tsx|json|py|toml|yaml|yml|mdc)$/i.test(entry.name)) out.push(full);
    }
    return out;
  }

  const allFiles = [
    ...rootFilesToScan.map((f) => path.join(REPO_ROOT, f)).filter((f) => fs.existsSync(f)),
    ...dirsToScan.flatMap((d) => walk(path.join(REPO_ROOT, d))),
  ];

  // Build patterns dynamically so this test file itself doesn't trigger self-matches
  const forbiddenChecks = [
    { label: 'code-assistants', regex: /code-assistants/ },
    { label: 'Antigravity Kit', regex: /antigravity\s+kit/i },
    { label: 'Personal path (Kelly Clark)', regex: /Kelly\s+Clark/i },
    { label: 'Personal Windows user path', regex: /C:\\Users\\[A-Za-z]/ },
    { label: 'Legacy author NamCH', regex: /\bNamCH\b/ },
    { label: 'Legacy scope @namch', regex: /@namch\b/i },
    { label: 'Legacy repo hainamchung', regex: /hainamchung/i },
    { label: 'Legacy repo anthropics/boomopen-workflow-kit', regex: /anthropics\/boomopen-workflow-kit/i },
    { label: 'Secret token pattern', regex: /(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z-_]{35}|AKIA[0-9A-Z]{16}|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY)/ },
  ];

  for (const file of allFiles) {
    if (file.endsWith('install.test.js') || file.endsWith('doctor.js')) continue;
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(REPO_ROOT, file);
    for (const chk of forbiddenChecks) {
      assert.ok(
        !chk.regex.test(content),
        `Expected ${rel} not to match forbidden pattern: ${chk.label}`
      );
    }
  }
});

test('All rules/*.md files are <= 300 lines, pure BoomOpen v5.5, and enforce Intelligent Work Distribution', () => {
  const rulesDir = path.join(REPO_ROOT, 'rules');
  const ruleFiles = fs.readdirSync(rulesDir).filter((f) => f.endsWith('.md')).sort();
  assert.deepEqual(ruleFiles, [
    'AGENTS.md',
    'CORE.md',
    'ERRORS.md',
    'PHASES.md',
    'REFERENCE.md',
    'SKILLS.md',
    'TEAMS.md',
  ]);
  for (const file of ruleFiles) {
    const content = fs.readFileSync(path.join(rulesDir, file), 'utf8');
    const lineCount = content.split(/\r?\n/).length;
    assert.ok(
      lineCount <= 300,
      `Expected rules/${file} to be <= 300 lines, got ${lineCount}`
    );
    assert.ok(
      !content.includes('agent-assistant'),
      `Expected rules/${file} not to contain legacy 'agent-assistant'`
    );
  }
  const agentsContent = fs.readFileSync(path.join(rulesDir, 'AGENTS.md'), 'utf8');
  assert.ok(agentsContent.includes('QUALITY-FIRST MODEL POLICY'));
  assert.ok(agentsContent.includes('Direct Plan-to-Executor Dispatch'));
  assert.ok(agentsContent.includes('Active Sub-agent Session Registry'));
  assert.ok(agentsContent.includes('OWNED_FILES'));
  assert.ok(agentsContent.includes('SHARED_CONTRACT'));
});

test('commands/ directory has only flat *.md files + _ref/ and all files are <= 450 lines', () => {
  const commandsDir = path.join(REPO_ROOT, 'commands');
  const entries = fs.readdirSync(commandsDir, { withFileTypes: true });
  const subdirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  assert.deepEqual(subdirs, ['_ref'], 'commands/ should only contain _ref subdirectory');

  const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith('.md')).map((e) => e.name);
  for (const file of mdFiles) {
    const content = fs.readFileSync(path.join(commandsDir, file), 'utf8');
    const lineCount = content.split(/\r?\n/).length;
    assert.ok(
      lineCount <= 450,
      `Expected commands/${file} to be <= 450 lines, got ${lineCount}`
    );
  }
});

test('buildCompactSkillIndex generates matrix-skills/compact-index.json with >= 1000 skills', () => {
  const result = buildCompactSkillIndex(REPO_ROOT);
  assert.ok(result.count >= 1000, `Expected >= 1000 skills, got ${result.count}`);
  assert.ok(fs.existsSync(result.outputPath));
  const data = JSON.parse(fs.readFileSync(result.outputPath, 'utf8'));
  assert.equal(data.version, '5.5.0');
  assert.ok(data.skills['api-patterns']);
  assert.equal(data.skills['api-patterns'].domain, 'backend');
});

test('Pragmatic 2-Tier checker allows 320-line cohesive file, warns at 420 lines, and errors >500 lines or on explicit any', () => {
  assert.equal(SOFT_FILE_LINES, 400);
  assert.equal(HARD_FILE_LINES, 500);

  const cohesive320 = Array.from({ length: 320 }, (_, i) => `const line${i} = ${i};`).join('\n');
  const res320 = inspectSourceFile('/project/src/userService.ts', '/project', cohesive320);
  assert.equal(res320.violations.length, 0);
  assert.equal(res320.warnings.length, 0);

  const soft420 = Array.from({ length: 420 }, (_, i) => `const line${i} = ${i};`).join('\n');
  const res420 = inspectSourceFile('/project/src/orderService.ts', '/project', soft420);
  assert.equal(res420.violations.length, 0);
  assert.equal(res420.warnings.length, 1);

  const hard510 = Array.from({ length: 510 }, (_, i) => `const line${i} = ${i};`).join('\n');
  const res510 = inspectSourceFile('/project/src/godModule.ts', '/project', hard510);
  assert.equal(res510.violations.length, 1);

  const test600 = Array.from({ length: 600 }, (_, i) => `const line${i} = ${i};`).join('\n');
  const resTest = inspectSourceFile('/project/src/userService.test.ts', '/project', test600);
  assert.equal(resTest.violations.length, 0);
  assert.equal(resTest.warnings.length, 0);

  const badAny = 'export function parsePayload(input: any): string { return String(input); }';
  const resAny = inspectSourceFile('/project/src/parser.ts', '/project', badAny);
  assert.equal(resAny.violations.length, 1);
});

test('runDoctor and runCheck pass on repository and modular CLI files', () => {
  const doctorReport = runDoctor({ repoRoot: REPO_ROOT, silent: true });
  assert.equal(
    doctorReport.healthy,
    true,
    `Doctor checks failed: ${JSON.stringify(doctorReport.checks.filter((c) => !c.passed))}`
  );

  const checkReport = runCheck(path.join(REPO_ROOT, 'cli'), { silent: true });
  assert.equal(
    checkReport.passed,
    true,
    `Code check failed: ${checkReport.violations.join(', ')}`
  );
  assert.ok(checkReport.scannedFiles >= 4);
});

test('Destructive command hook blocks root deletions and allows safe commands', async () => {
  const hookPath = path.join(
    REPO_ROOT,
    'platforms',
    'antigravity',
    'hooks',
    'validate-tool-call.mjs'
  );
  assert.ok(fs.existsSync(hookPath));
  const { evaluateCommand } = await import(`file://${hookPath.replace(/\\/g, '/')}`);
  assert.equal(evaluateCommand('rm -rf /').allowed, false);
  assert.equal(evaluateCommand('npm test').allowed, true);
});
