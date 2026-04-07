const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Kelly Clark\\.gemini\\antigravity\\global_workflows';

const files = ['design-team.md', 'fix-team.md', 'report-team.md', 'docs-audit.md'];

for (const fileName of files) {
  const filePath = path.join(dir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content.length;
  
  // === TEAM FILES: Remove inline Mailbox format block ===
  // This is the block starting with ## [{TIMESTAMP}] and the Message Types table
  // that was left over from first refactor pass
  content = content.replace(
    /## \[\{TIMESTAMP\}\][\s\S]*?(?=\n## 📁)/g,
    ''
  );
  
  // Remove any leftover Message Format sections
  content = content.replace(
    /\*\*Message Format\*\*:[\s\S]*?\*\*Message Types\*\*:[\s\S]*?(?=\n---\n)/g,
    ''
  );
  
  // === DOCS-AUDIT: Compress verbose sections ===
  // Remove PRE-FLIGHT duplicate
  content = content.replace(
    /## PRE-FLIGHT \(DO FIRST[\s\S]*?(?=\n---\n)/g,
    '## PRE-FLIGHT\n\n**LOAD**: CORE.md → PHASES.md → AGENTS.md\n'
  );
  
  // Remove TIERED EXECUTION duplicate
  content = content.replace(
    /## TIERED EXECUTION PROTOCOL[\s\S]*?(?=\n---\n)/g,
    ''
  );
  
  // Remove INCREMENTAL EXECUTION duplicate  
  content = content.replace(
    /## INCREMENTAL EXECUTION[\s\S]*?(?=\n---\n)/g,
    ''
  );

  // === Compress verbose Triangle Loop descriptions ===
  // Trim bullet sub-items under Triangle Loop (keep main steps, remove sub-bullets)
  content = content.replace(
    /(\*\*Triangle Loop\*\*:[\s\S]*?)(?=\*\*Deliverable|\*\*Exit Criteria|\*\*Consensus)/g,
    (match) => {
      const lines = match.split('\n');
      const kept = lines.filter(l => {
        // Keep main numbered steps, remove deep sub-bullets (3+ spaces indent)
        if (l.match(/^   {3,}-/)) return false;
        if (l.match(/^   {3,}\*/)) return false;
        return true;
      });
      return kept.join('\n');
    }
  );

  // === Clean up ===
  content = content.replace(/\n{4,}/g, '\n\n---\n\n');
  content = content.replace(/agent-assistant/g, 'boomopen-workflow-kit');
  
  const after = content.length;
  fs.writeFileSync(filePath, content, 'utf8');
  
  const status = after <= 12000 ? '✅' : (after <= 13000 ? '🟡' : '🔴');
  console.log(`${status} ${fileName.padEnd(22)} ${before} → ${after} (cut ${before - after})`);
}
