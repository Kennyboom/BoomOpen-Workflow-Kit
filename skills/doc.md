# Antigravity Skills Guide (v5.5)

> **Guide to creating and using Skills in the BoomOpen Workflow Kit**

---

## 📋 Overview

While base models (like Gemini Pro High) are powerful generalists, loading every domain rule or tool into the context window on Turn 1 causes context bloat and latency.

**Antigravity Skills** solve this through **Progressive Disclosure** and the **Fast 2-Step Skill Lookup**:
1. **Step 1 — Active Global Skills (`<skills>`)**: 48 core skills installed in `~/.gemini/config/skills/` have their YAML frontmatter (`name` + `description`) pre-indexed in `<skills>`. When a task matches, the agent reads the skill's `SKILL.md` on-demand.
2. **Step 2 — Compact Index & Library (`matrix-skills/compact-index.json` / `skills_library`)**: 1,430+ niche domain skills are indexed in `~/.gemini/config/skills/boomopen-workflow-kit/matrix-skills/compact-index.json` and stored in `~/.gemini/config/skills_library/` for millisecond O(1) lookup when needed.

---

## 📁 Structure and Scope

Skills are folder-based packages placed in either the global skill directory or your project workspace:

| Scope | Path | Description |
|-------|------|-------------|
| **Global Active Skills** | `~/.gemini/config/skills/<skill-name>/` | Pre-indexed in `<skills>` across all projects |
| **Global Dormant Library** | `~/.gemini/config/skills_library/<skill-name>/` | Searched on-demand via `compact-index.json` / `skill-seeker` |
| **Workspace Skills** | `<workspace-root>/.gemini/skills/<skill-name>/` | Project-specific skills scoped to the current repository |

### Skill Directory Structure

```
my-skill/
├── SKILL.md      # (Required) YAML frontmatter + instructions
├── scripts/      # (Optional) Python or Node.js validation scripts
├── references/   # (Optional) Deep-dive documentation or checklists
└── resources/    # (Optional) Templates or schemas
```

---

## 🔍 Example 1: Custom Code Review Skill

### Step 1: Create the skill directory

```bash
mkdir -p ~/.gemini/config/skills/custom-review
```

### Step 2: Create `SKILL.md`

```markdown
---
name: custom-review
description: Reviews code changes against Pragmatic 2-Tier Coding Standards, security, and performance checklists.
---

# Custom Code Review Skill

## Review Checklist
1. **Tier 1 Strict Safety**: Zero explicit `any`, proper `try/catch` error handling, no leftover `console.log` in production code.
2. **Tier 2 Cohesive Structure**: Cohesive file responsibility (~200–350 lines target, ≤450 soft ceiling) and clean guard clauses.
3. **Contract Compliance**: Matches `SHARED_CONTRACT` and touches only `OWNED_FILES`.
```

---

## 📄 Example 2: Skill with Reference Template

### Step 1: Create the directory

```bash
mkdir -p <workspace-root>/.gemini/skills/license-header-adder/resources
```

### Step 2: Create the template file

**`<workspace-root>/.gemini/skills/license-header-adder/resources/HEADER.txt`**:

```
/*
 * Copyright (c) 2026 YOUR_COMPANY_NAME LLC.
 * All rights reserved.
 */
```

### Step 3: Create `SKILL.md`

**`<workspace-root>/.gemini/skills/license-header-adder/SKILL.md`**:

```markdown
---
name: license-header-adder
description: Adds the standard corporate license header to new source files.
---

# License Header Adder

1. **Read Template**: Read `resources/HEADER.txt`.
2. **Prepend**: Add the header to newly created source files using the language's comment syntax.
```
