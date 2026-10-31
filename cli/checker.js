const fs = require('node:fs');
const path = require('node:path');

const SOFT_FILE_LINES = 400;
const HARD_FILE_LINES = 500;
const CODE_EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.ts',
  '.tsx',
  '.jsx',
  '.py',
  '.go',
  '.rs',
]);
const TS_EXTENSIONS = new Set(['.ts', '.tsx']);
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  'skills_library',
  'matrix-skills',
  '.brain',
]);
const EXEMPT_FILES = new Set(['install.js']);

/**
 * Recursively collect source code files under targetDir.
 * @param {string} currentDir
 * @param {string[]} accumulator
 * @returns {string[]}
 */
function collectSourceFiles(currentDir, accumulator = []) {
  if (!fs.existsSync(currentDir)) return accumulator;
  const stat = fs.statSync(currentDir);
  if (stat.isFile()) {
    accumulator.push(currentDir);
    return accumulator;
  }
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(fullPath, accumulator);
    } else if (CODE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      accumulator.push(fullPath);
    }
  }
  return accumulator;
}

/**
 * Check if a file is exempt from line-count limits (test files, .d.ts, or CLI installer).
 * @param {string} fileName
 * @returns {boolean}
 */
function isLineCountExempt(fileName) {
  return (
    EXEMPT_FILES.has(fileName) ||
    fileName.includes('.test.') ||
    fileName.includes('.spec.') ||
    fileName.endsWith('.d.ts')
  );
}

/**
 * Inspect a single source file against Pragmatic 2-Tier Coding Standards.
 * @param {string} filePath
 * @param {string} baseDir
 * @param {string} [overrideContent]
 * @returns {{violations: string[], warnings: string[]}}
 */
function inspectSourceFile(filePath, baseDir, overrideContent) {
  const relPath = path.relative(baseDir, filePath) || path.basename(filePath);
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const content = overrideContent ?? fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const violations = [];
  const warnings = [];

  if (!isLineCountExempt(fileName)) {
    if (lines.length > HARD_FILE_LINES) {
      violations.push(
        `${relPath}: ${lines.length} lines (exceeds hard ceiling ${HARD_FILE_LINES})`
      );
    } else if (lines.length > SOFT_FILE_LINES) {
      warnings.push(
        `${relPath}: ${lines.length} lines (exceeds soft target ${SOFT_FILE_LINES}, OK if single responsibility)`
      );
    }
  }
  if (
    TS_EXTENSIONS.has(ext) &&
    !fileName.endsWith('.d.ts') &&
    /(?::\s*any\b|\bas\s+any\b|<any>)/.test(content)
  ) {
    violations.push(`${relPath}: explicit 'any' type detected`);
  }
  const isCliOrTest =
    relPath.startsWith('cli') ||
    filePath.includes(`${path.sep}cli${path.sep}`) ||
    fileName.includes('.test.') ||
    fileName.includes('.spec.');
  if (!isCliOrTest && /\bconsole\.log\s*\(/.test(content)) {
    warnings.push(`${relPath}: leftover console.log() detected`);
  }
  return { violations, warnings };
}

/**
 * Run deterministic code quality checks on targetDir.
 * @param {string} targetDir
 * @param {{silent?: boolean}} options
 * @returns {{passed: boolean, scannedFiles: number, violations: string[], warnings: string[]}}
 */
function runCheck(targetDir = process.cwd(), options = {}) {
  const resolvedDir = path.resolve(targetDir);
  const files = collectSourceFiles(resolvedDir);
  const violations = [];
  const warnings = [];

  for (const filePath of files) {
    const report = inspectSourceFile(filePath, resolvedDir);
    violations.push(...report.violations);
    warnings.push(...report.warnings);
  }

  const passed = violations.length === 0;
  if (!options.silent) {
    console.log('\n📏 BoomOpen Pragmatic 2-Tier Code Check (v5.4.0)\n' + '─'.repeat(60));
    console.log(`  📁 Target:   ${resolvedDir}`);
    console.log(`  📄 Scanned:  ${files.length} source files`);
    console.log(`  ❌ Errors:   ${violations.length} (Hard >${HARD_FILE_LINES} lines or explicit 'any')`);
    console.log(`  ⚠️  Warnings: ${warnings.length} (Soft >${SOFT_FILE_LINES} lines or console.log)`);
    for (const v of violations) console.log(`     ❌ ${v}`);
    for (const w of warnings) console.log(`     ⚠️  ${w}`);
    console.log('─'.repeat(60));
  }
  return { passed, scannedFiles: files.length, violations, warnings };
}

module.exports = {
  SOFT_FILE_LINES,
  HARD_FILE_LINES,
  inspectSourceFile,
  runCheck,
};
