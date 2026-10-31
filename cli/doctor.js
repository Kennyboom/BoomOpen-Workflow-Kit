const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const MAX_ENTRY_LINES = 350;
const MAX_DOC_LINES = 450;
const MIN_COMPACT_SKILLS = 1000;
const MOJIBAKE_REGEX = /(?:â•”|ðŸŒ|â Œ|âš\s*ï¸|\ufffd)/;

/**
 * Parse a single domain YAML file into compact skill entries.
 */
function parseDomainYaml(yamlContent, domainName, coreSkillNames) {
  const entries = {};
  const blocks = yamlContent.split(/\r?\n\s*-\s+skill_id:\s*/).slice(1);
  for (const block of blocks) {
    const idMatch = block.match(/^([^\r\n#]+)/);
    if (!idMatch) continue;
    const skillId = idMatch[1].trim();
    const catMatch = block.match(/category:\s*([^\r\n#]+)/);
    const prioMatch = block.match(/priority_score:\s*(\d+)/);
    const skillFolder = coreSkillNames.has(skillId) ? 'skills' : 'skills_library';
    entries[skillId] = {
      domain: domainName,
      priority: prioMatch ? Number(prioMatch[1]) : 5,
      category: catMatch ? catMatch[1].trim() : 'specialized',
      path: `${skillFolder}/${skillId}/SKILL.md`,
    };
  }
  return entries;
}

/**
 * Build matrix-skills/compact-index.json from matrix-skills/*.yaml files.
 */
function buildCompactSkillIndex(repoRoot) {
  const matrixDir = path.join(repoRoot, 'matrix-skills');
  const skillsDir = path.join(repoRoot, 'skills');
  const coreSkills = new Set(fs.existsSync(skillsDir) ? fs.readdirSync(skillsDir) : []);
  const indexMap = {};
  const yamlFiles = fs
    .readdirSync(matrixDir)
    .filter((f) => f.endsWith('.yaml') && !f.startsWith('_'));

  for (const file of yamlFiles) {
    const domain = path.basename(file, '.yaml');
    const content = fs.readFileSync(path.join(matrixDir, file), 'utf8');
    Object.assign(indexMap, parseDomainYaml(content, domain, coreSkills));
  }

  const outputPath = path.join(matrixDir, 'compact-index.json');
  const payload = { version: '5.4.0', totalSkills: Object.keys(indexMap).length, skills: indexMap };
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');
  return { count: payload.totalSkills, outputPath };
}

/**
 * Audit a directory (or nested subdirectories) of Markdown files for line limits, mojibake, and legacy paths.
 */
function auditMarkdownDir(dirPath, label, recursive = false) {
  if (!fs.existsSync(dirPath)) return { name: label, passed: false, detail: 'Directory missing' };
  const mdFiles = [];
  function walk(currentDir, prefix = '') {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      if (entry.isDirectory() && recursive) {
        walk(path.join(currentDir, entry.name), `${prefix}${entry.name}/`);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        mdFiles.push({ fullPath: path.join(currentDir, entry.name), relName: `${prefix}${entry.name}` });
      }
    }
  }
  walk(dirPath);
  const issues = [];
  for (const file of mdFiles) {
    const text = fs.readFileSync(file.fullPath, 'utf8');
    const lineCount = text.split(/\r?\n/).length;
    if (lineCount > MAX_DOC_LINES) issues.push(`${file.relName} (${lineCount} lines)`);
    if (MOJIBAKE_REGEX.test(text)) issues.push(`${file.relName} (mojibake)`);
    if (text.includes('agent-assistant')) issues.push(`${file.relName} (legacy ref)`);
  }
  const detail = issues.length === 0 ? `${mdFiles.length} files OK (≤${MAX_DOC_LINES} lines)` : issues.join('; ');
  return { name: label, passed: issues.length === 0, detail };
}

/**
 * Check ~/.gemini/GEMINI.md line count and existence.
 */
function checkGeminiEntrypoint(homeDir) {
  const geminiMd = path.join(homeDir, '.gemini', 'GEMINI.md');
  if (!fs.existsSync(geminiMd)) {
    return { name: '~/.gemini/GEMINI.md', passed: false, detail: 'Missing' };
  }
  const lines = fs.readFileSync(geminiMd, 'utf8').split(/\r?\n/).length;
  return {
    name: '~/.gemini/GEMINI.md',
    passed: lines <= MAX_ENTRY_LINES,
    detail: `${lines} lines (limit ${MAX_ENTRY_LINES})`,
  };
}

/**
 * Check ~/.gemini/config/skills.json and installed SKILL.md.
 */
function checkSkillsManifest(homeDir) {
  const skillsJson = path.join(homeDir, '.gemini', 'config', 'skills.json');
  const kitSkillMd = path.join(
    homeDir,
    '.gemini',
    'config',
    'skills',
    'boomopen-workflow-kit',
    'SKILL.md'
  );
  let jsonValid = false;
  if (fs.existsSync(skillsJson)) {
    try {
      JSON.parse(fs.readFileSync(skillsJson, 'utf8'));
      jsonValid = true;
    } catch {
      jsonValid = false;
    }
  }
  return [
    {
      name: '~/.gemini/config/skills.json',
      passed: jsonValid,
      detail: jsonValid ? 'Valid JSON' : 'Missing or invalid JSON',
    },
    {
      name: 'Installed SKILL.md',
      passed: fs.existsSync(kitSkillMd),
      detail: fs.existsSync(kitSkillMd) ? 'Present' : 'Missing',
    },
  ];
}

/**
 * Run full BoomOpen Workflow Kit doctor diagnostics.
 */
function runDoctor(options = {}) {
  const repoRoot = options.repoRoot || path.resolve(__dirname, '..');
  const homeDir = options.homeDir || os.homedir();
  const compactPath = path.join(repoRoot, 'matrix-skills', 'compact-index.json');
  if (!fs.existsSync(compactPath)) buildCompactSkillIndex(repoRoot);
  const compactData = JSON.parse(fs.readFileSync(compactPath, 'utf8'));
  const checks = [
    checkGeminiEntrypoint(homeDir),
    ...checkSkillsManifest(homeDir),
    auditMarkdownDir(path.join(repoRoot, 'rules'), 'rules/*.md'),
    auditMarkdownDir(path.join(repoRoot, 'commands'), 'commands/*.md'),
    auditMarkdownDir(path.join(repoRoot, 'agents'), 'agents/*.md'),
    auditMarkdownDir(path.join(repoRoot, 'agents', 'teams'), 'agents/teams/**/*.md', true),
    {
      name: 'matrix-skills/compact-index.json',
      passed: compactData.totalSkills >= MIN_COMPACT_SKILLS,
      detail: `${compactData.totalSkills} skills indexed`,
    },
  ];
  const healthy = checks.every((c) => c.passed);
  if (!options.silent) {
    console.log('\n🩺 BoomOpen Workflow Kit Doctor (v5.4.0)\n' + '─'.repeat(60));
    for (const c of checks) console.log(`  ${c.passed ? '✅' : '❌'} ${c.name.padEnd(34)} ${c.detail}`);
    console.log('─'.repeat(60));
  }
  return { healthy, checks };
}

module.exports = {
  MAX_ENTRY_LINES,
  MAX_DOC_LINES,
  buildCompactSkillIndex,
  runDoctor,
};
