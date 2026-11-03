const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  TOOLS,
  ROOT_FILES,
  buildCompactSkillIndex,
  runDoctor,
  runCheck,
  startSettingsUiServer,
} = require('./install.js');
const {
  SOFT_FILE_LINES,
  HARD_FILE_LINES,
  inspectSourceFile,
} = require('./checker.js');
const {
  SETTINGS_MARKER_START,
  SETTINGS_MARKER_END,
  DEFAULT_SETTINGS,
  PRESETS,
  ALLOWED_ENUMS,
  CODING_STANDARDS_PRESETS,
  loadSettings,
  saveSettings,
  setSettingByKey,
  getSettingByKey,
  applyPreset,
  resetSettings,
  renderActiveSettingsMarkdown,
  injectSettingsBlockIntoText,
  syncSettingsToInstalledPlatforms,
  runSettingsCommand,
} = require('./settings.js');

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
      content.includes(SETTINGS_MARKER_START) && content.includes(SETTINGS_MARKER_END),
      `Expected ${relPath} to contain BOOMOPEN-SETTINGS-START/END markers`
    );
    assert.ok(
      !content.includes('0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter'),
      `Expected ${relPath} not to contain legacy solo-bias phrase`
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
    'i18n',
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
    { label: 'Personal user path', regex: new RegExp('Kel' + 'ly\\s+Cla' + 'rk', 'i') },
    { label: 'Personal Windows user path', regex: /C:\\Users\\[A-Za-z]/ },
    { label: 'Legacy author NamCH', regex: /\bNamCH\b/ },
    { label: 'Legacy scope @namch', regex: /@namch\b/i },
    { label: 'Legacy repo hainamchung', regex: /hainamchung/i },
    { label: 'Legacy repo anthropics/boomopen-workflow-kit', regex: /anthropics\/boomopen-workflow-kit/i },
    { label: 'Secret token pattern', regex: /(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z-_]{35}|AKIA[0-9A-Z]{16}|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY)/ },
  ];

  assert.ok(
    !new RegExp('Kel' + 'ly\\s+Cla' + 'rk', 'i').test(fs.readFileSync(__filename, 'utf8')),
    'Expected cli/install.test.js not to contain personal user path'
  );

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

test('All 16 i18n/README.<lang>.md files exist, have full 9-section content, and are linked from root README.md', () => {
  const expectedLangs = [
    'vi', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'fr', 'de',
    'pt-BR', 'ru', 'hi', 'ar', 'id', 'th', 'tr', 'it',
  ];
  const expectedCommands = [
    '/cook', '/code', '/plan', '/fix', '/debug', '/test', '/review',
    '/design', '/docs', '/deploy', '/brainstorm', '/report', '/orchestrate', '/save',
  ];
  const expectedPlatforms = [
    'Antigravity (Gemini)',
    'Claude Code',
    'OpenAI Codex',
    'Cursor',
    'GitHub Copilot',
  ];

  const rootReadme = fs.readFileSync(path.join(REPO_ROOT, 'README.md'), 'utf8');
  assert.ok(
    !rootReadme.includes('## 🇻🇳 Tài Liệu Tiếng Việt') &&
      !rootReadme.includes('Xem Video Bản Tiếng Việt'),
    'Expected root README.md to be 100% pure English without embedded Vietnamese sections'
  );
  const rootPBlocks = rootReadme.match(/<p>[\s\S]*?<\/p>/g) || [];
  for (const pBlock of rootPBlocks) {
    assert.ok(
      !/\]\(\.\//.test(pBlock) && !/\*\*[^*]+\*\*/.test(pBlock),
      'Expected root README.md <p> blocks to use pure HTML <a>/<b> tags instead of raw Markdown'
    );
  }

  for (const lang of expectedLangs) {
    const relLink = `<a href="./i18n/README.${lang}.md">`;
    assert.ok(
      rootReadme.includes(relLink),
      `Expected root README.md to link to ${relLink} via valid HTML <a> tag`
    );

    const filePath = path.join(REPO_ROOT, 'i18n', `README.${lang}.md`);
    assert.ok(fs.existsSync(filePath), `Expected i18n/README.${lang}.md to exist`);

    const content = fs.readFileSync(filePath, 'utf8');
    const lineCount = content.split(/\r?\n/).length;
    assert.ok(
      lineCount >= 130 && lineCount <= 450,
      `Expected i18n/README.${lang}.md to have between 130 and 450 lines, got ${lineCount}`
    );
    assert.ok(
      content.includes('```mermaid') && content.includes('flowchart TD'),
      `Expected i18n/README.${lang}.md to include Mermaid architecture flowchart`
    );
    assert.ok(
      content.includes('<a href="../README.md">🇬🇧 English</a>'),
      `Expected i18n/README.${lang}.md to link back to ../README.md using valid HTML <a> tag`
    );
    const pBlocks = content.match(/<p>[\s\S]*?<\/p>/g) || [];
    for (const pBlock of pBlocks) {
      assert.ok(
        !/\]\(\.\.?\//.test(pBlock) && !/\*\*[^*]+\*\*/.test(pBlock),
        `Expected i18n/README.${lang}.md <p> blocks to use pure HTML <a>/<b> tags`
      );
    }
    if (lang !== 'vi') {
      assert.ok(
        !content.includes('Xem Bản Tiếng Việt') &&
          !content.includes('## 🎬 Official Launch Trailer') &&
          !content.includes('## 🎛️ Unified Settings & Mode Selection'),
        `Expected i18n/README.${lang}.md to have fully localized trailer & settings headers without Vietnamese/English mix`
      );
    }

    for (const cmd of [...expectedCommands, '/settings']) {
      assert.ok(
        content.includes(cmd),
        `Expected i18n/README.${lang}.md to document command ${cmd}`
      );
    }

    for (const plat of expectedPlatforms) {
      assert.ok(
        content.includes(plat),
        `Expected i18n/README.${lang}.md to include platform ${plat}`
      );
    }
  }
});

test('Unified Settings schema defaults naturalLanguageResearchTrigger to auto_team and covers all 12 settings across 4 categories', () => {
  assert.equal(DEFAULT_SETTINGS.version, '5.5.0');
  assert.equal(DEFAULT_SETTINGS.preset, 'smart-hybrid');
  assert.equal(DEFAULT_SETTINGS.execution.modeAThresholdFiles, 2);
  assert.ok(ALLOWED_ENUMS['execution.modeAThresholdFiles'].includes(2));
  assert.equal(DEFAULT_SETTINGS.workflows.naturalLanguageResearchTrigger, 'auto_team');

  const mdBlock = renderActiveSettingsMarkdown(DEFAULT_SETTINGS);
  assert.ok(mdBlock.includes('Proactive Sub-agent First'));
  assert.ok(mdBlock.includes('Turn 1'));

  const expected12Keys = [
    'execution.mode',
    'execution.modeAThresholdFiles',
    'workflows.defaultVariant',
    'workflows.naturalLanguageResearchTrigger',
    'models.subagentPolicy',
    'research.depth',
    'clarification.style',
    'teams.maxDebateRounds',
    'codingStandards.preset',
    'verification.level',
    'deliverables.routing',
    'language.response',
  ];

  const enumKeys = Object.keys(ALLOWED_ENUMS).filter((k) => k !== 'preset');
  assert.deepEqual(enumKeys, expected12Keys);
  for (const key of expected12Keys) {
    const val = getSettingByKey(DEFAULT_SETTINGS, key);
    assert.ok(
      ALLOWED_ENUMS[key].includes(val),
      `Expected DEFAULT_SETTINGS.${key} (${val}) to be in ALLOWED_ENUMS[${key}]`
    );
  }

  assert.deepEqual(Object.keys(PRESETS), [
    'smart-hybrid',
    'solo-fast',
    'deep-architect',
    'adversarial-team',
  ]);
  assert.equal(PRESETS['smart-hybrid'].workflows.naturalLanguageResearchTrigger, 'auto_team');
  assert.equal(PRESETS['solo-fast'].execution.mode, 'mode_a');
  assert.equal(PRESETS['deep-architect'].execution.mode, 'mode_b');
  assert.equal(PRESETS['adversarial-team'].execution.mode, 'team');
  assert.equal(PRESETS['adversarial-team'].workflows.naturalLanguageResearchTrigger, 'auto_team');
});

test('2-Tier Settings persistence (global + project), 4 presets, setSettingByKey, and resetSettings work in isolated temp dir', async () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'boomopen-test-'));
  const homeDir = path.join(tmpRoot, 'home');
  const cwd = path.join(tmpRoot, 'workspace');
  fs.mkdirSync(homeDir, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });

  try {
    const initial = loadSettings({ homeDir, cwd });
    assert.equal(initial.preset, 'smart-hybrid');
    assert.equal(initial.workflows.naturalLanguageResearchTrigger, 'auto_team');

    for (const presetName of ['solo-fast', 'deep-architect', 'adversarial-team', 'smart-hybrid']) {
      const applied = applyPreset(presetName, { homeDir, cwd, scope: 'global', sync: false });
      assert.equal(applied.settings.preset, presetName);
      assert.equal(applied.settings.execution.mode, PRESETS[presetName].execution.mode);
    }

    const customGlobal = setSettingByKey('execution.mode', 'mode_b', {
      homeDir,
      cwd,
      scope: 'global',
      sync: false,
    });
    assert.equal(customGlobal.settings.preset, 'custom');
    assert.equal(customGlobal.settings.execution.mode, 'mode_b');

    const projOverride = saveSettings(
      { 'execution.mode': 'team', 'teams.maxDebateRounds': 2 },
      { homeDir, cwd, scope: 'project', sync: false }
    );
    assert.equal(projOverride.scope, 'project');
    assert.ok(fs.existsSync(path.join(cwd, '.boomopen.json')));
    assert.equal(loadSettings({ homeDir, cwd }).execution.mode, 'team');
    assert.equal(loadSettings({ homeDir, cwd }).teams.maxDebateRounds, 2);
    assert.equal(loadSettings({ homeDir, cwd, scope: 'global' }).execution.mode, 'mode_b');

    resetSettings({ homeDir, cwd, scope: 'project', sync: false });
    assert.ok(!fs.existsSync(path.join(cwd, '.boomopen.json')));
    assert.equal(loadSettings({ homeDir, cwd }).execution.mode, 'mode_b');

    resetSettings({ homeDir, cwd, scope: 'global', sync: false });
    assert.equal(loadSettings({ homeDir, cwd }).preset, 'smart-hybrid');
    assert.equal(loadSettings({ homeDir, cwd }).execution.mode, 'auto');

    const cmdGet = await runSettingsCommand(
      ['get', 'workflows.naturalLanguageResearchTrigger', '--json'],
      { homeDir, cwd, silent: true }
    );
    assert.equal(cmdGet.value, 'auto_team');
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});

test('renderActiveSettingsMarkdown and syncSettingsToInstalledPlatforms hot-sync all 5 simulated platforms in os.tmpdir()', () => {
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'boomopen-sync-'));
  try {
    const platformFiles = [
      path.join(tmpHome, '.gemini', 'GEMINI.md'),
      path.join(tmpHome, '.claude', 'CLAUDE.md'),
      path.join(tmpHome, '.codex', 'CODEX.md'),
      path.join(tmpHome, '.cursor', 'CURSOR.md'),
      path.join(tmpHome, '.copilot', 'COPILOT.md'),
    ];
    for (const file of platformFiles) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(
        file,
        `# Entrypoint\n\n${renderActiveSettingsMarkdown(DEFAULT_SETTINGS)}\n\n## Rules\n`,
        'utf8'
      );
    }

    const report = syncSettingsToInstalledPlatforms(PRESETS['adversarial-team'], {
      homeDir: tmpHome,
    });
    assert.equal(report.updatedFiles.length, 5);
    assert.deepEqual(report.platforms, {
      antigravity: true,
      claude: true,
      codex: true,
      cursor: true,
      copilot: true,
    });

    for (const file of platformFiles) {
      const updated = fs.readFileSync(file, 'utf8');
      assert.ok(updated.includes('**Active Preset**: `adversarial-team`'));
      assert.ok(updated.includes('**Execution Mode (`execution.mode`)**: `team`'));
      assert.ok(updated.includes('`naturalLanguageResearchTrigger = auto_team`'));
    }

    const injectedWithoutMarkers = injectSettingsBlockIntoText(
      '# Title\n\n---\n\n## Content\n',
      PRESETS['solo-fast']
    );
    assert.ok(injectedWithoutMarkers.includes(SETTINGS_MARKER_START));
    assert.ok(injectedWithoutMarkers.includes('**Active Preset**: `solo-fast`'));
  } finally {
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

test('Local Web Control Center (startSettingsUiServer on ephemeral port 0) serves HTML and REST API endpoints cleanly', async () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'boomopen-webui-'));
  const homeDir = path.join(tmpRoot, 'home');
  const cwd = path.join(tmpRoot, 'workspace');
  fs.mkdirSync(homeDir, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });

  const { server, url, port } = await startSettingsUiServer({
    port: 0,
    openBrowser: false,
    silent: true,
    homeDir,
    cwd,
  });

  try {
    assert.ok(port > 0, 'Expected ephemeral port > 0');

    const htmlRes = await fetch(`${url}/`);
    assert.equal(htmlRes.status, 200);
    const html = await htmlRes.text();
    assert.ok(html.includes('BOOMOPEN v5.5 — UNIFIED SETTINGS & CONTROL CENTER'));
    assert.ok(html.includes('Save & Sync to All 5 Platforms'));

    const getRes = await fetch(`${url}/api/settings`);
    assert.equal(getRes.status, 200);
    const getData = await getRes.json();
    assert.equal(getData.ok, true);
    assert.equal(getData.settings.preset, 'smart-hybrid');
    assert.equal(getData.settings.workflows.naturalLanguageResearchTrigger, 'auto_team');

    const presetRes = await fetch(`${url}/api/preset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preset: 'adversarial-team', scope: 'global' }),
    });
    assert.equal(presetRes.status, 200);
    const presetData = await presetRes.json();
    assert.equal(presetData.ok, true);
    assert.equal(presetData.settings.preset, 'adversarial-team');
    assert.equal(presetData.settings.execution.mode, 'team');

    const postSettingsRes = await fetch(`${url}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scope: 'global',
        settings: {
          execution: { mode: 'mode_a', modeAThresholdFiles: 5 },
          workflows: { naturalLanguageResearchTrigger: 'auto_hard' },
        },
      }),
    });
    assert.equal(postSettingsRes.status, 200);
    const postSettingsData = await postSettingsRes.json();
    assert.equal(postSettingsData.ok, true);
    assert.equal(postSettingsData.settings.execution.mode, 'mode_a');
    assert.equal(postSettingsData.settings.execution.modeAThresholdFiles, 5);
    assert.equal(postSettingsData.settings.workflows.naturalLanguageResearchTrigger, 'auto_hard');

    const resetRes = await fetch(`${url}/api/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope: 'global' }),
    });
    assert.equal(resetRes.status, 200);
    const resetData = await resetRes.json();
    assert.equal(resetData.ok, true);
    assert.equal(resetData.settings.preset, 'smart-hybrid');
    assert.equal(resetData.settings.workflows.naturalLanguageResearchTrigger, 'auto_team');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});

test('Dynamic codingStandards in inspectSourceFile enforces strict (300/400) vs relaxed (600/800) thresholds', () => {
  assert.deepEqual(CODING_STANDARDS_PRESETS.strict, {
    softFileLines: 300,
    hardFileLines: 400,
    forbidExplicitAny: true,
    warnConsoleLog: true,
  });
  assert.deepEqual(CODING_STANDARDS_PRESETS.relaxed, {
    softFileLines: 600,
    hardFileLines: 800,
    forbidExplicitAny: true,
    warnConsoleLog: false,
  });

  const code350 = Array.from({ length: 350 }, (_, i) => `const x${i} = ${i};`).join('\n');
  const strict350 = inspectSourceFile('/project/src/mod.ts', '/project', code350, 'strict');
  assert.equal(strict350.violations.length, 0);
  assert.equal(strict350.warnings.length, 1);

  const code450 = Array.from({ length: 450 }, (_, i) => `const x${i} = ${i};`).join('\n');
  const strict450 = inspectSourceFile('/project/src/mod.ts', '/project', code450, 'strict');
  assert.equal(strict450.violations.length, 1);

  const relaxed450 = inspectSourceFile('/project/src/mod.ts', '/project', code450, 'relaxed');
  assert.equal(relaxed450.violations.length, 0);
  assert.equal(relaxed450.warnings.length, 0);

  const code650 = Array.from({ length: 650 }, (_, i) => `const x${i} = ${i};`).join('\n');
  const relaxed650 = inspectSourceFile('/project/src/mod.ts', '/project', code650, 'relaxed');
  assert.equal(relaxed650.violations.length, 0);
  assert.equal(relaxed650.warnings.length, 1);
});

test('cli/settings.js and cli/settings-ui.js stay <= 380 lines and commands/settings.md exists', () => {
  const settingsLines = fs
    .readFileSync(path.join(REPO_ROOT, 'cli', 'settings.js'), 'utf8')
    .split(/\r?\n/).length;
  const settingsUiLines = fs
    .readFileSync(path.join(REPO_ROOT, 'cli', 'settings-ui.js'), 'utf8')
    .split(/\r?\n/).length;
  const cmdSettingsPath = path.join(REPO_ROOT, 'commands', 'settings.md');

  assert.ok(
    settingsLines <= 380,
    `Expected cli/settings.js <= 380 lines, got ${settingsLines}`
  );
  assert.ok(
    settingsUiLines <= 380,
    `Expected cli/settings-ui.js <= 380 lines, got ${settingsUiLines}`
  );
  assert.ok(fs.existsSync(cmdSettingsPath), 'Expected commands/settings.md to exist');
  const cmdSettingsContent = fs.readFileSync(cmdSettingsPath, 'utf8');
  assert.ok(cmdSettingsContent.includes('ask_question'));
  assert.ok(cmdSettingsContent.includes('auto_team'));
});


