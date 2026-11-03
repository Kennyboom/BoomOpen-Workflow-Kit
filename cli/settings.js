const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SETTINGS_MARKER_START = '<!-- BOOMOPEN-SETTINGS-START -->';
const SETTINGS_MARKER_END = '<!-- BOOMOPEN-SETTINGS-END -->';

const CODING_STANDARDS_PRESETS = {
  pragmatic: { softFileLines: 400, hardFileLines: 500, forbidExplicitAny: true, warnConsoleLog: true },
  strict: { softFileLines: 300, hardFileLines: 400, forbidExplicitAny: true, warnConsoleLog: true },
  relaxed: { softFileLines: 600, hardFileLines: 800, forbidExplicitAny: true, warnConsoleLog: false },
};

const ALLOWED_ENUMS = {
  preset: ['smart-hybrid', 'solo-fast', 'deep-architect', 'adversarial-team', 'custom'],
  'execution.mode': ['auto', 'mode_a', 'mode_b', 'team'],
  'execution.modeAThresholdFiles': [1, 3, 5, 10],
  'workflows.defaultVariant': ['auto', 'fast', 'hard', 'team', 'ask'],
  'workflows.naturalLanguageResearchTrigger': ['auto_team', 'auto_hard', 'ask_first', 'off'],
  'models.subagentPolicy': ['quality_first', 'strict_inherit', 'balanced_speed'],
  'research.depth': ['5_lens_deep', 'standard', 'quick_brief'],
  'clarification.style': ['autonomous_first', 'interactive_ask', 'zero_questions'],
  'teams.maxDebateRounds': [1, 2, 3],
  'codingStandards.preset': ['pragmatic', 'strict', 'relaxed'],
  'verification.level': ['strict_e2e', 'fast_check', 'manual'],
  'deliverables.routing': ['brain_artifacts', 'workspace_reports', 'both'],
  'language.response': ['auto', 'vi', 'en', 'ja', 'ko', 'zh-CN'],
};

const DEFAULT_SETTINGS = {
  version: '5.5.0',
  preset: 'smart-hybrid',
  execution: { mode: 'auto', modeAThresholdFiles: 3 },
  workflows: { defaultVariant: 'auto', naturalLanguageResearchTrigger: 'auto_team' },
  models: { subagentPolicy: 'quality_first' },
  research: { depth: '5_lens_deep' },
  clarification: { style: 'autonomous_first' },
  teams: { maxDebateRounds: 3 },
  codingStandards: { ...CODING_STANDARDS_PRESETS.pragmatic, preset: 'pragmatic' },
  verification: { level: 'strict_e2e' },
  deliverables: { routing: 'brain_artifacts' },
  language: { response: 'auto' },
};

const PRESETS = {
  'smart-hybrid': structuredClone(DEFAULT_SETTINGS),
  'solo-fast': {
    version: '5.5.0',
    preset: 'solo-fast',
    execution: { mode: 'mode_a', modeAThresholdFiles: 10 },
    workflows: { defaultVariant: 'fast', naturalLanguageResearchTrigger: 'off' },
    models: { subagentPolicy: 'balanced_speed' },
    research: { depth: 'quick_brief' },
    clarification: { style: 'zero_questions' },
    teams: { maxDebateRounds: 1 },
    codingStandards: { ...CODING_STANDARDS_PRESETS.relaxed, preset: 'relaxed' },
    verification: { level: 'fast_check' },
    deliverables: { routing: 'brain_artifacts' },
    language: { response: 'auto' },
  },
  'deep-architect': {
    version: '5.5.0',
    preset: 'deep-architect',
    execution: { mode: 'mode_b', modeAThresholdFiles: 1 },
    workflows: { defaultVariant: 'hard', naturalLanguageResearchTrigger: 'auto_hard' },
    models: { subagentPolicy: 'strict_inherit' },
    research: { depth: '5_lens_deep' },
    clarification: { style: 'interactive_ask' },
    teams: { maxDebateRounds: 3 },
    codingStandards: { ...CODING_STANDARDS_PRESETS.strict, preset: 'strict' },
    verification: { level: 'strict_e2e' },
    deliverables: { routing: 'brain_artifacts' },
    language: { response: 'auto' },
  },
  'adversarial-team': {
    version: '5.5.0',
    preset: 'adversarial-team',
    execution: { mode: 'team', modeAThresholdFiles: 1 },
    workflows: { defaultVariant: 'team', naturalLanguageResearchTrigger: 'auto_team' },
    models: { subagentPolicy: 'strict_inherit' },
    research: { depth: '5_lens_deep' },
    clarification: { style: 'interactive_ask' },
    teams: { maxDebateRounds: 3 },
    codingStandards: { ...CODING_STANDARDS_PRESETS.strict, preset: 'strict' },
    verification: { level: 'strict_e2e' },
    deliverables: { routing: 'both' },
    language: { response: 'auto' },
  },
};

function getSettingsPaths(options = {}) {
  const homeDir = options.homeDir || os.homedir();
  const cwd = options.cwd || process.cwd();
  return {
    globalPath: path.join(homeDir, '.boomopen', 'settings.json'),
    projectPath: path.join(cwd, '.boomopen.json'),
  };
}

function getSettingByKey(settings, dottedKey) {
  if (!dottedKey) return settings;
  return dottedKey.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), settings);
}

function setNestedValue(target, dottedKey, value) {
  const parts = dottedKey.split('.');
  let cur = target;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function coerceEnumValue(dottedKey, rawVal) {
  const allowed = ALLOWED_ENUMS[dottedKey];
  if (!allowed) return undefined;
  const numericVal = typeof rawVal === 'string' && /^\d+$/.test(rawVal) ? Number(rawVal) : rawVal;
  if (allowed.includes(numericVal)) return numericVal;
  if (allowed.includes(rawVal)) return rawVal;
  return undefined;
}

function validateAndSanitizeSettings(partial = {}, base = DEFAULT_SETTINGS) {
  const merged = structuredClone(base);
  if (!partial || typeof partial !== 'object') return merged;
  for (const key of Object.keys(ALLOWED_ENUMS)) {
    const candidate = key in partial ? partial[key] : getSettingByKey(partial, key);
    if (candidate !== undefined) {
      const coerced = coerceEnumValue(key, candidate);
      if (coerced !== undefined) setNestedValue(merged, key, coerced);
    }
  }
  const stdPreset = merged.codingStandards?.preset || 'pragmatic';
  const presetDetails = CODING_STANDARDS_PRESETS[stdPreset] || CODING_STANDARDS_PRESETS.pragmatic;
  merged.codingStandards = {
    ...presetDetails,
    preset: stdPreset,
    ...(typeof partial.codingStandards?.softFileLines === 'number' ? { softFileLines: partial.codingStandards.softFileLines } : {}),
    ...(typeof partial.codingStandards?.hardFileLines === 'number' ? { hardFileLines: partial.codingStandards.hardFileLines } : {}),
  };
  merged.version = '5.5.0';
  return merged;
}

function readJsonSafe(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function loadSettings(options = {}) {
  const { globalPath, projectPath } = getSettingsPaths(options);
  const globalData = readJsonSafe(globalPath);
  let resolved = validateAndSanitizeSettings(globalData || {}, DEFAULT_SETTINGS);
  if (options.scope !== 'global') {
    const projectData = readJsonSafe(projectPath);
    if (projectData) resolved = validateAndSanitizeSettings(projectData, resolved);
  }
  return resolved;
}

function renderActiveSettingsMarkdown(settings = DEFAULT_SETTINGS) {
  const s = validateAndSanitizeSettings(settings, DEFAULT_SETTINGS);
  const cs = s.codingStandards;
  return [
    SETTINGS_MARKER_START,
    '## 🎛️ ACTIVE USER SETTINGS OVERRIDE (Managed via `/settings` & `~/.boomopen/settings.json`)',
    '> **PRECEDENCE**: `1. Explicit Turn Command (/cmd:variant, @fast/@deep/@team)` > `2. Workspace ./.boomopen.json` > `3. Active Settings Below` > `4. Default File Rules`.',
    `- **Active Preset**: \`${s.preset}\` | **Execution Mode (\`execution.mode\`)**: \`${s.execution.mode}\` (\`auto\` = Mode A when \`≤ ${s.execution.modeAThresholdFiles} files\` & \`1 domain\`, else Mode B; \`mode_a\` = Force Direct Solo Mode unless \`:hard\`/\`:team\`/\`/orchestrate\`; \`mode_b\` = Force Multi-Agent Orchestrator; \`team\` = Force Golden Triangle 3-Agent \`:team\`)`,
    `- **Workflows**: \`defaultVariant = ${s.workflows.defaultVariant}\` (\`auto\`|\`fast\`|\`hard\`|\`team\`|\`ask\`) | \`naturalLanguageResearchTrigger = ${s.workflows.naturalLanguageResearchTrigger}\` (\`auto_team\` routes NL research/ideation to \`/brainstorm:team\` Golden Triangle | \`auto_hard\` → \`/brainstorm:hard\` | \`ask_first\` | \`off\`)`,
    `- **Intelligence & Research**: \`models.subagentPolicy = ${s.models.subagentPolicy}\` (\`inherit\` Pro High default; never \`flash_lite\`) | \`research.depth = ${s.research.depth}\` | \`clarification.style = ${s.clarification.style}\` | \`teams.maxDebateRounds = ${s.teams.maxDebateRounds}\``,
    `- **Standards & Verification**: \`codingStandards.preset = ${cs.preset}\` (Soft \`${cs.softFileLines}\` / Hard \`${cs.hardFileLines}\` lines, \`forbidExplicitAny = ${cs.forbidExplicitAny}\`, \`warnConsoleLog = ${cs.warnConsoleLog}\`) | \`verification.level = ${s.verification.level}\``,
    `- **Deliverables & Language**: \`deliverables.routing = ${s.deliverables.routing}\` (\`<appDataDir>\\brain\\<conversation-id>\\\` default) | \`language.response = ${s.language.response}\``,
    SETTINGS_MARKER_END,
  ].join('\n');
}

function injectSettingsBlockIntoText(content, settings = DEFAULT_SETTINGS) {
  const block = renderActiveSettingsMarkdown(settings);
  if (content.includes(SETTINGS_MARKER_START) && content.includes(SETTINGS_MARKER_END)) {
    const startIdx = content.indexOf(SETTINGS_MARKER_START);
    const endIdx = content.indexOf(SETTINGS_MARKER_END) + SETTINGS_MARKER_END.length;
    return content.slice(0, startIdx) + block + content.slice(endIdx);
  }
  const dividerIdx = content.indexOf('\n---\n', content.startsWith('---\n') ? content.indexOf('\n---\n', 4) + 4 : 0);
  if (dividerIdx !== -1) {
    return `${content.slice(0, dividerIdx)}\n\n${block}\n${content.slice(dividerIdx)}`;
  }
  return `${content.trimEnd()}\n\n${block}\n`;
}

function syncSettingsToInstalledPlatforms(settings, options = {}) {
  const start = Date.now();
  const homeDir = options.homeDir || os.homedir();
  const active = settings ? validateAndSanitizeSettings(settings) : loadSettings(options);
  const targetsByPlatform = {
    antigravity: [
      path.join(homeDir, '.gemini', 'GEMINI.md'),
      path.join(homeDir, '.gemini', 'agents', 'AntigravityGlobal.agent.md'),
      path.join(homeDir, '.antigravity', 'agents', 'AntigravityGlobal.agent.md'),
    ],
    claude: [path.join(homeDir, '.claude', 'CLAUDE.md'), path.join(homeDir, '.claude', 'AGENT.md')],
    codex: [
      path.join(homeDir, '.codex', 'CODEX.md'),
      path.join(homeDir, '.codex', 'AGENTS.md'),
      path.join(homeDir, '.codex', 'AGENT.md'),
    ],
    cursor: [
      path.join(homeDir, '.cursor', 'CURSOR.md'),
      path.join(homeDir, '.cursor', 'rules', 'boomopen-workflow-kit.mdc'),
      path.join(homeDir, '.cursor', 'AGENT.md'),
    ],
    copilot: [
      path.join(homeDir, '.copilot', 'COPILOT.md'),
      path.join(homeDir, '.copilot', 'AGENT.md'),
      path.join(homeDir, '.vscode-prompts', 'boomopen-workflow-kit.agent.md'),
    ],
  };
  const updatedFiles = [];
  const platforms = {};
  for (const [platform, fileList] of Object.entries(targetsByPlatform)) {
    let anySynced = false;
    for (const filePath of fileList) {
      if (fs.existsSync(filePath)) {
        const current = fs.readFileSync(filePath, 'utf8');
        const updated = injectSettingsBlockIntoText(current, active);
        if (updated !== current) fs.writeFileSync(filePath, updated, 'utf8');
        updatedFiles.push(filePath);
        anySynced = true;
      }
    }
    platforms[platform] = anySynced;
  }
  return { updatedFiles, platforms, elapsedMs: Date.now() - start };
}

function saveSettings(patch = {}, options = {}) {
  const scope = options.scope === 'project' || options.project ? 'project' : 'global';
  const { globalPath, projectPath } = getSettingsPaths(options);
  const targetPath = scope === 'project' ? projectPath : globalPath;
  const currentBase = loadSettings({ ...options, scope });
  const nextSettings = validateAndSanitizeSettings(patch, currentBase);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(nextSettings, null, 2) + '\n', 'utf8');
  const effective = loadSettings(options);
  const syncReport = options.sync === false ? null : syncSettingsToInstalledPlatforms(effective, options);
  return { settings: effective, savedPath: targetPath, scope, syncReport };
}

function setSettingByKey(dottedKey, rawValue, options = {}) {
  if (!ALLOWED_ENUMS[dottedKey]) {
    throw new Error(`Unknown setting key "${dottedKey}". Allowed keys: ${Object.keys(ALLOWED_ENUMS).join(', ')}`);
  }
  const coerced = coerceEnumValue(dottedKey, rawValue);
  if (coerced === undefined) {
    throw new Error(`Invalid value "${rawValue}" for ${dottedKey}. Allowed: ${ALLOWED_ENUMS[dottedKey].join(' | ')}`);
  }
  const patch = { [dottedKey]: coerced };
  if (dottedKey !== 'preset') patch.preset = 'custom';
  return saveSettings(patch, options);
}

function applyPreset(presetName, options = {}) {
  const presetObj = PRESETS[presetName];
  if (!presetObj) {
    throw new Error(`Unknown preset "${presetName}". Available presets: ${Object.keys(PRESETS).join(', ')}`);
  }
  return saveSettings(presetObj, options);
}

function resetSettings(options = {}) {
  const scope = options.scope === 'project' || options.project ? 'project' : 'global';
  const { projectPath } = getSettingsPaths(options);
  if (scope === 'project' && fs.existsSync(projectPath)) {
    fs.rmSync(projectPath, { force: true });
    const effective = loadSettings(options);
    const syncReport = options.sync === false ? null : syncSettingsToInstalledPlatforms(effective, options);
    return { settings: effective, savedPath: projectPath, scope, syncReport };
  }
  return saveSettings(DEFAULT_SETTINGS, { ...options, scope: 'global' });
}

function printSettingsStatus(settings, paths, syncReport) {
  const hasProject = fs.existsSync(paths.projectPath);
  console.log('\n🎛️  BoomOpen Unified Control Center (v5.5.0)\n' + '─'.repeat(68));
  console.log(`  ⚡ Active Preset:  ${settings.preset} (${hasProject ? 'workspace override active' : 'global'})`);
  console.log(`  🌐 Global Store:   ${paths.globalPath}`);
  console.log(`  📁 Project Store:  ${paths.projectPath} (${hasProject ? 'present' : 'not set'})`);
  console.log('─'.repeat(68));
  for (const key of Object.keys(ALLOWED_ENUMS).filter((k) => k !== 'preset')) {
    console.log(`  • ${key.padEnd(42)} = ${String(getSettingByKey(settings, key))}`);
  }
  if (syncReport) {
    const syncedList = Object.entries(syncReport.platforms)
      .map(([p, ok]) => `${ok ? '✅' : '⬚'} ${p}`)
      .join('  ');
    console.log('─'.repeat(68));
    console.log(`  🚀 Platforms (${syncReport.elapsedMs}ms): ${syncedList}`);
  }
  console.log('─'.repeat(68) + '\n');
}

async function runSettingsCommand(args = [], options = {}) {
  const isProject = args.includes('--project') || args.includes('-p');
  const isJson = args.includes('--json');
  const cleanArgs = args.filter((a) => !['--project', '-p', '--json', '--no-open'].includes(a));
  const sub = (cleanArgs[0] || 'status').toLowerCase();
  const opts = { ...options, scope: isProject ? 'project' : 'global' };

  if (sub === '--ui' || sub === 'ui' || args.includes('--ui')) {
    const portIdx = args.indexOf('--port');
    const port = portIdx !== -1 && args[portIdx + 1] ? Number(args[portIdx + 1]) : 4567;
    const { startSettingsUiServer } = require('./settings-ui.js');
    return startSettingsUiServer({ ...opts, port, openBrowser: !args.includes('--no-open') });
  }
  if (sub === 'get') {
    const settings = loadSettings(opts);
    const val = cleanArgs[1] ? getSettingByKey(settings, cleanArgs[1]) : settings;
    if (!options.silent) console.log(isJson || typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val));
    return { action: 'get', value: val, settings };
  }
  if (sub === 'set') {
    let key = cleanArgs[1];
    let val = cleanArgs[2];
    if (key && key.includes('=') && val === undefined) [key, val] = key.split('=');
    const res = setSettingByKey(key, val, opts);
    if (!options.silent) printSettingsStatus(res.settings, getSettingsPaths(opts), res.syncReport);
    return { action: 'set', ...res };
  }
  if (sub === 'mode') {
    const res = setSettingByKey('execution.mode', cleanArgs[1], opts);
    if (!options.silent) printSettingsStatus(res.settings, getSettingsPaths(opts), res.syncReport);
    return { action: 'mode', ...res };
  }
  if (sub === 'preset') {
    const res = applyPreset(cleanArgs[1], opts);
    if (!options.silent) printSettingsStatus(res.settings, getSettingsPaths(opts), res.syncReport);
    return { action: 'preset', ...res };
  }
  if (sub === 'reset') {
    const res = resetSettings(opts);
    if (!options.silent) printSettingsStatus(res.settings, getSettingsPaths(opts), res.syncReport);
    return { action: 'reset', ...res };
  }
  const settings = loadSettings(opts);
  const paths = getSettingsPaths(opts);
  const syncReport = syncSettingsToInstalledPlatforms(settings, opts);
  if (!options.silent) printSettingsStatus(settings, paths, syncReport);
  return { action: 'status', settings, paths, syncReport };
}

module.exports = {
  SETTINGS_MARKER_START,
  SETTINGS_MARKER_END,
  DEFAULT_SETTINGS,
  PRESETS,
  ALLOWED_ENUMS,
  CODING_STANDARDS_PRESETS,
  getSettingsPaths,
  validateAndSanitizeSettings,
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
};
