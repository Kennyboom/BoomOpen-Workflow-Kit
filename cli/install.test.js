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

test('TOOLS.antigravity configuration uses unified boomopen-workflow-kit v5.4 paths', () => {
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

test('Antigravity template GEMINI.md enforces Pragmatic 2-Tier Standards, Direct Dispatch, and Warm Reuse', () => {
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
  assert.ok(content.includes('Pragmatic 2-Tier Coding Standards'));
  assert.ok(content.includes('QUALITY-FIRST MODEL POLICY'));
  assert.ok(content.includes('NEVER use `flash_lite`'));
  assert.ok(content.includes('Direct Plan-to-Executor Dispatch'));
  assert.ok(content.includes('Stateful Warm Sub-agent Reuse'));
  assert.ok(!content.includes('agent-assistant'));
});

test('All rules/*.md files are <= 300 lines, pure BoomOpen v5.4, and enforce Intelligent Work Distribution', () => {
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

  const errorsContent = fs.readFileSync(path.join(rulesDir, 'ERRORS.md'), 'utf8');
  assert.ok(errorsContent.includes('E0'));
  assert.ok(errorsContent.includes('Warm Auto-Revive'));
  assert.ok(errorsContent.includes('A11'));
  assert.ok(errorsContent.includes('A12'));
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
  assert.equal(data.version, '5.4.0');
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
