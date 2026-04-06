---
description: "Core Docs - Generate 5 knowledge folders with evidence-backed sub-files"
version: "3.0"
category: documentation
execution-mode: execute
---

# /docs:core — Core Technical Documentation

> **MISSION**: Analyze the project through deep codebase reconnaissance, then generate
> **5 knowledge folders** — each with `00-index.md` + focused sub-files.
> Every claim must trace to actual source code.

<scope>$ARGUMENTS</scope>

---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/docs-recon-protocol.md` — Phase 1 recon steps + Intelligence Report template
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/docs-folder-specs.md` — Folder content requirements + quality gates + verification checklist
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## PRE-FLIGHT

**LOAD**: CORE.md → PHASES.md → AGENTS.md (path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`)

---

## DELIVERABLES — 5 Knowledge Folders

> **⛔ MUST CREATE OR UPDATE ALL 5 FOLDERS.** Incomplete = FAILED.

```
./documents/
  knowledge-source-base/    # WHERE things are
  knowledge-overview/       # WHAT and WHY
  knowledge-architecture/   # HOW things connect
  knowledge-domain/         # WHAT flows through
  knowledge-standards/      # HOW TO CODE correctly
```

Each folder: `00-index.md` (summary + TOC + cross-refs) + `01-*.md` ... `04-*.md` sub-files.

### The `00-index.md` Pattern (MANDATORY)

Each `00-index.md` MUST include:
1. Brief overview (2-3 paragraphs)
2. Sub-files table — filename + description
3. Quick facts — key reference data
4. Cross-references to related folders
5. Known Gaps and Open Questions

### Scaling Rules

| Condition | Action |
|-----------|--------|
| Sub-file > ~300 lines | Split into focused sub-files |
| Sub-file < 20 lines | Merge into nearest related sub-file |
| Many modules/services | Add per-module sub-files |

---

## Phase 1: DEEP CODEBASE RECONNAISSANCE

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` |
| **Goal** | Mode detection + deep scan + Intelligence Report |
| **Reference** | `_ref/docs-recon-protocol.md` — full recon steps + report template |

> **⛔ READ `_ref/docs-recon-protocol.md` for detailed scan steps and Intelligence Report template.**

**Exit Criteria**:
- [ ] Mode detection complete (CREATE/UPDATE/MIGRATE per folder)
- [ ] Tech stack mapped with evidence
- [ ] Architecture patterns identified with file-level evidence
- [ ] Domain entities and API surface cataloged
- [ ] Evidence Ledger complete (every claim area ≥ 3 evidence files)
- [ ] Intelligence Report emitted (Phase 2 depends on this)

---

## Phase 2: GENERATE KNOWLEDGE FOLDERS

| Attribute | Value |
|-----------|-------|
| **Agent** | `docs-manager` |
| **Goal** | Create all 5 folders with `00-index.md` + sub-files |
| **Input** | Intelligence Report + Evidence Ledger from Phase 1 |
| **Reference** | `_ref/docs-folder-specs.md` — content requirements + quality gates |

> **⛔ READ `_ref/docs-folder-specs.md` for folder content requirements, quality gates, and verification.**

### Thinking Protocol (MANDATORY — Before Each Sub-File)

1. WHO reads this? New developer? PM? AI agent?
2. WHAT must they understand from THIS file alone?
3. Is EVERY claim backed by an actual file I read?
4. Is anything speculative? → Remove or mark as assumption

**Exit Criteria**:
- [ ] All 5 folders created with `00-index.md` + sub-files
- [ ] Every `00-index.md` TOC matches actual sub-files
- [ ] Every sub-file has `## Evidence Sources`
- [ ] No placeholder text in any file
- [ ] All content is English only

---

## COMPLETION

```markdown
## Docs-Core Complete

### Deliverables
| # | Folder | Sub-Files | Mode | Status |
|---|--------|-----------|------|--------|
| 1 | knowledge-source-base/ | 00-index + {N} | CREATE/UPDATE | Done |
| 2 | knowledge-overview/ | 00-index + {N} | CREATE/UPDATE | Done |
| 3 | knowledge-architecture/ | 00-index + {N} | CREATE/UPDATE | Done |
| 4 | knowledge-domain/ | 00-index + {N} | CREATE/UPDATE | Done |
| 5 | knowledge-standards/ | 00-index + {N} | CREATE/UPDATE | Done |

**Total files**: {count}
**Next** → `/docs:business`
```
