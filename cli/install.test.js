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

const REPO_ROOT = path.resolve(__dirname, '..');

test('TOOLS.antigravity configuration uses unified boomopen-workflow-kit v5.2 paths', () => {
  const ag = TOOLS.antigravity;
  assert.ok(ag, 'antigravity tool config should exist');
  assert.ok(
    ag.paths.frameworkPath.endsWith(
      path.join('.gemini', 'config', 'skills', 'boomopen-workflow-kit')
    )
  );
  assert.equal(ag.replacements['{TOOL}'], 'gemini/config');
  assert.equal(
    ag.replacements['{TOOL}/boomopen-workflow-kit/'],
    'gemini/config/skills/boomopen-workflow-kit/'
  );
  assert.equal(
    ag.replacements['~/.{TOOL}/skills/boomopen-workflow-kit/'],
    '~/.gemini/config/skills/boomopen-workflow-kit/'
  );
  assert.equal(
    ag.replacements['~/.agent/'],
    '~/.gemini/config/skills/boomopen-workflow-kit/'
  );
});

test('ROOT_FILES includes SKILL.md and README.md', () => {
  assert.ok(ROOT_FILES.includes('README.md'));
  assert.ok(ROOT_FILES.includes('SKILL.md'));
});

test('Antigravity template GEMINI.md enforces Quality-First Model Policy and DAG Parallel Fan-Out', () => {
  const geminiTemplatePath = path.join(
    REPO_ROOT,
    'code-assistants',
    'antigravity-assistant',
    'GEMINI.md'
  );
  const content = fs.readFileSync(geminiTemplatePath, 'utf8');
  const lineCount = content.split(/\r?\n/).length;
  assert.ok(
    lineCount <= 220,
    `Expected GEMINI.md to be <= 220 lines, got ${lineCount}`
  );
  assert.ok(content.includes('MODE A — Direct Execution'));
  assert.ok(content.includes('MODE B — Strict Multi-Agent Orchestration'));
  assert.ok(content.includes('QUALITY-FIRST MODEL POLICY'));
  assert.ok(content.includes('NEVER use `flash_lite`'));
  assert.ok(content.includes('DAG-Aware Parallel Fan-Out'));
  assert.ok(!content.includes('agent-assistant'));
});

test('All rules/*.md files are <= 300 lines, pure BoomOpen v5.2, and enforce Model: inherit', () => {
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
  assert.ok(agentsContent.includes('DAG Parallel Fan-Out'));
});

test('commands/ directory has only flat *.md files + _ref/ and all files are <= 300 lines', () => {
  const commandsDir = path.join(REPO_ROOT, 'commands');
  const entries = fs.readdirSync(commandsDir, { withFileTypes: true });
  const subdirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  assert.deepEqual(subdirs, ['_ref'], 'commands/ should only contain _ref subdirectory');

  const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith('.md')).map((e) => e.name);
  for (const file of mdFiles) {
    const content = fs.readFileSync(path.join(commandsDir, file), 'utf8');
    const lineCount = content.split(/\r?\n/).length;
    assert.ok(
      lineCount <= 300,
      `Expected commands/${file} to be <= 300 lines, got ${lineCount}`
    );
    assert.ok(
      !content.includes('global_workflows'),
      `Expected commands/${file} not to contain legacy 'global_workflows'`
    );
  }
});

test('buildCompactSkillIndex generates matrix-skills/compact-index.json with >= 1000 skills', () => {
  const result = buildCompactSkillIndex(REPO_ROOT);
  assert.ok(result.count >= 1000, `Expected >= 1000 skills, got ${result.count}`);
  assert.ok(fs.existsSync(result.outputPath));
  const data = JSON.parse(fs.readFileSync(result.outputPath, 'utf8'));
  assert.equal(data.version, '5.2.0');
  assert.ok(data.skills['api-patterns']);
  assert.equal(data.skills['api-patterns'].domain, 'backend');
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
    'code-assistants',
    'antigravity-assistant',
    'hooks',
    'validate-tool-call.mjs'
  );
  assert.ok(fs.existsSync(hookPath));
  const { evaluateCommand } = await import(`file://${hookPath.replace(/\\/g, '/')}`);
  assert.equal(evaluateCommand('rm -rf /').allowed, false);
  assert.equal(evaluateCommand('npm test').allowed, true);
});
