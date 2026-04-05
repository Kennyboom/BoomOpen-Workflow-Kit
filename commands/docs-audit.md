---
description: "Audit Docs - Generate 4 audit folders with structured sub-files"
version: "3.0"
category: documentation
execution-mode: execute
---

# /docs:audit â€” Security & Compliance Audit Documentation

> **MISSION**: Generate or update **ALL 4 audit folders**, each with `00-index.md` + sub-files.
> Output must be evidence-backed, scored, and actionable.

<scope>$ARGUMENTS</scope>

---

## PRE-FLIGHT

**LOAD**: CORE.md â†’ PHASES.md â†’ AGENTS.md (path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`)

---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ this reference file NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/docs-recon-protocol.md` â€” Reconnaissance scan steps and Intelligence Report template (shared with docs-core)
>
> **Failure to read = incorrect execution. This file contains BINDING protocols.**

---

## DELIVERABLES â€” 4 Audit Folders

> **â›” MUST CREATE OR UPDATE ALL 4 FOLDERS.** Incomplete = FAILED.

```
./documents/audit/
  audit-security/          # 00-index + 01-attack-surface + 02-vulnerability-findings + 03-owasp-assessment + 04-risk-summary
  audit-compliance/        # 00-index + 01-control-inventory + 02-framework-mapping + 03-gap-register + 04-evidence-state
  audit-dataflow/          # 00-index + 01-trust-boundaries + 02-data-flow-map + 03-sensitive-data-inventory + 04-privacy-posture
  audit-recommendations/   # 00-index + 01-critical-remediations + 02-high-priority + 03-medium-low + 04-score-uplift-plan
```

**Minimum**: 4 folders Ã— 5 files = **20 files**

### `00-index.md` Pattern â€” includes: Quick summary, Strict score (numeric/grade/confidence), Sub-files table, Key findings, Cross-refs, Known gaps

### Finding ID System

| Prefix | Area | Example |
|--------|------|---------|
| `SEC-` | Security | SEC-001 |
| `CMP-` | Compliance | CMP-001 |
| `DFL-` | Data flow | DFL-001 |
| `REM-` | Remediation | REM-001 |

Cross-folder: Same finding = same ID + same severity. `audit-recommendations/` MUST reference IDs from other 3 folders.

### Evidence Discipline

- Tag claims: `Verified` / `Partial` / `Unknown`
- Include file paths with line anchors: `path/to/file.ts#L42`
- Never infer Verified without direct evidence
- No placeholders in final documents

---

## Phase 1: AUDIT RECONNAISSANCE

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` |
| **Goal** | Map attack surface, data flows, security controls, dependency risks |

**Output**: Audit Recon Report with: Execution plan (CREATE/UPDATE/MIGRATE per folder), Attack surface map, Security controls detected, Data flow candidates, Dependency risk posture, Evidence ledger

---

## Phase 2: DEEP SECURITY ANALYSIS

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Vulnerability analysis, OWASP Top 10 assessment, compliance mapping, risk scoring |

**Output**: Findings register (ID/title/severity/OWASP/CWE), OWASP assessment, Compliance control matrix (NIST/CIS/ISO), Risk matrix (likelihood Ã— impact), Privacy assessment

---

## Phase 3: GENERATE AUDIT FOLDERS

| Attribute | Value |
|-----------|-------|
| **Agent** | `docs-manager` |
| **Goal** | Generate/update all 4 audit folders in English only |

---

## Phase 4: FRAMEWORK MAPPING & SCORING

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Validate framework mappings, finalize scoring |
| **Skill** | Load `skills/docs-audit/references/framework-mapping.md` + `scoring-framework.md` |

---

## Phase 5: CONSISTENCY & QUALITY REVIEW

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` |
| **Goal** | Cross-folder consistency, evidence integrity, production readiness |

**Consistency checks**: Finding IDs consistent âœ“ | Severity alignment âœ“ | Evidence present âœ“ | Score sections âœ“ | No placeholders âœ“ | Framework refs âœ“ | Cross-refs valid âœ“ | No contradictions âœ“

**Per-folder checks**:
- `audit-security/` â†’ attack-surface + findings register
- `audit-compliance/` â†’ control-mapping + gap register
- `audit-dataflow/` â†’ data-flow diagram (Mermaid) + trust boundaries
- `audit-recommendations/` â†’ prioritized remediation + score uplift plan

---

## COMPLETION

```markdown
## Audit Documentation Complete

| Folder | Files | Score | Grade | Status |
|--------|-------|-------|-------|--------|
| audit-security/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |
| audit-compliance/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |
| audit-dataflow/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |
| audit-recommendations/ | 00-index + 01~04 | {score}/100 | {grade} | Created/Updated |

### Overall Audit Maturity
- **Weighted Score**: {score}/100 | **Grade**: {grade} | **Confidence**: {level}

### Highest-Priority Follow-Up
1. {action with finding ID}
2. {action with finding ID}

**Total: 4 folders (20+ files) in `./documents/audit/`**
**Next** â†’ Address critical findings
```
