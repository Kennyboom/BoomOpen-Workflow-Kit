---
description: "Business Docs - Generate 4 business folders with structured sub-files"
version: "2.0"
category: documentation
execution-mode: execute
---

# /docs:business - Business Documentation (Folder-Based)

> **MISSION**: Generate or update **ALL 4 business knowledge folders**, each with `00-index.md` + numbered sub-files. Output must be evidence-backed, traceable, and actionable for product, engineering, and delivery teams.

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

## DELIVERABLES - FOLDER-BASED BUSINESS SYSTEM

> [!CAUTION]
> **MUST CREATE OR UPDATE ALL 4 FOLDERS** with `00-index.md` and sub-files. Incomplete = FAILED execution.

> **DOCUMENT LANGUAGE - NON-NEGOTIABLE**
> Every file under `./documents/` must be written in **English only**. Do not use the user's language for file content. (CORE LAW 6.)

### Folder Structure

```
./documents/business/
  business-prd/
    00-index.md
    01-executive-summary.md
    02-problem-goals-and-scope.md
    03-stakeholders-and-requirements.md
    04-acceptance-risks-assumptions.md

  business-features/
    00-index.md
    01-feature-inventory.md
    02-prioritization-moscow.md
    03-feature-specifications.md
    04-dependencies-and-release-sequencing.md
    05-success-metrics.md

  business-workflows/
    00-index.md
    01-actor-map.md
    02-workflow-catalog.md
    03-detailed-workflows.md
    04-decision-rules-and-exceptions.md
    05-sla-and-handoffs.md

  business-glossary/
    00-index.md
    01-canonical-terms.md
    02-synonyms-and-deprecated-terms.md
    03-domain-entities-and-events.md
    04-api-term-mapping.md
```

**Minimum total**: 4 folders x (1 index + 4-5 sub-files) = **22 files minimum**.

### `00-index.md` Pattern (MANDATORY)

Every business folder `00-index.md` MUST include:

1. Quick summary (2-3 paragraphs)
2. Sub-files table with descriptions
3. Key facts for that area
4. Cross-references to related business/core folders
5. Known Gaps and Open Questions

```markdown
# {Business Area}

> **Purpose**: {one-line purpose}
> **Sub-files**: {count}
> **Last Updated**: {YYYY-MM-DD}

## Quick Summary
{2-3 paragraphs}

## Sub-Files
| File | Description |
|------|-------------|
| [01-...](./01-...md) | ... |

## Key Facts
| Key | Value |
|-----|-------|
| ... | ... |

## Cross-References
- [knowledge-overview](../knowledge-overview/00-index.md)
- [knowledge-domain](../knowledge-domain/00-index.md)

## Known Gaps and Open Questions
- ...
```

---

## INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 -> Phase 2 -> Phase 3 -> Phase 4.

---

## Phase 1: BUSINESS RECONNAISSANCE

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` |
| **Goal** | Build evidence-backed business intelligence from codebase + existing docs |


## Business Intelligence Report

### Execution Plan
| Business Area | Mode | Notes |
|---------------|------|-------|
| business-prd/ | CREATE/UPDATE/MIGRATE | {note} |
| business-features/ | CREATE/UPDATE/MIGRATE | {note} |
| business-workflows/ | CREATE/UPDATE/MIGRATE | {note} |
| business-glossary/ | CREATE/UPDATE/MIGRATE | {note} |

### Stakeholder and Actor Map
| Actor | Goal | Touchpoints | Evidence |
|-------|------|-------------|----------|
| {actor} | {goal} | {workflow/api} | {path} |

### Feature Inventory (Raw)
| Feature | User Value | Technical Surface | Dependencies | Evidence |
|---------|------------|-------------------|--------------|----------|
| {feature} | {value} | {files/apis} | {deps} | {path} |

### Workflow Candidates
| Workflow | Trigger | Steps (summary) | Exceptions | Evidence |
|----------|---------|-----------------|------------|----------|
| {name} | {trigger} | {summary} | {exceptions} | {path} |

### Domain Terms (Raw)
| Term | Candidate Definition | Synonyms | Source |
|------|----------------------|----------|--------|
| {term} | {definition} | {synonyms} | {path} |

### Business Evidence Ledger
| Claim Area | Evidence Files | Confidence |
|------------|----------------|------------|
| Stakeholders | {paths} | High/Medium/Low |
| Features | {paths} | High/Medium/Low |
| Workflows | {paths} | High/Medium/Low |
| Domain Terms | {paths} | High/Medium/Low |
```

### Anti-Shallow Guardrails

- NEVER generate content from README alone - must verify with direct file reads
- Each business area must have at least 2 evidence files in the ledger
- If evidence is weak (Low confidence), explicitly state it - do NOT guess
- Unknowns go to `Known Gaps and Open Questions`, not speculative claims

### Exit Criteria

- [ ] CREATE/UPDATE/MIGRATE mode detected per business area
- [ ] Stakeholders and actors mapped with evidence
- [ ] Feature inventory extracted with dependencies
- [ ] Workflow candidates identified
- [ ] Domain terms extracted
- [ ] Business Evidence Ledger complete

---

## Phase 2: BUSINESS STRUCTURING AND PRIORITIZATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `business-analyst` |
| **Goal** | Convert raw intelligence into structured, testable business artifacts |
| **Skill** | Load `skills/business-analyst/SKILL.md` |


## Structured Business Pack

### Goals and Scope
| Goal ID | Goal | KPI | Priority |
|---------|------|-----|----------|
| BG-001 | {goal} | {metric} | Must/Should/Could |

### Requirements (INVEST)
| Req ID | Requirement | Value | INVEST Score | Acceptance Criteria |
|--------|-------------|-------|--------------|---------------------|
| BR-001 | {text} | {value} | {score} | {testable criteria} |

### Features (MoSCoW)
| Feature ID | Feature | Priority | Dependencies | Success Metric |
|------------|---------|----------|--------------|----------------|
| BF-001 | {feature} | Must | {deps} | {metric} |

### Workflows (Canonical)
| Workflow ID | Actor | Trigger | Outcome | Exception Handling |
|-------------|-------|---------|---------|--------------------|
| BW-001 | {actor} | {trigger} | {outcome} | {rule} |

### Glossary Canonicalization
| Canonical Term | Definition | Aliases | Deprecated Terms |
|----------------|------------|---------|------------------|
| {term} | {definition} | {aliases} | {deprecated} |

### Traceability Matrix
| Goal | Requirement | Feature | Workflow | KPI |
|------|-------------|---------|----------|-----|
| BG-001 | BR-001 | BF-001 | BW-001 | {metric} |
```

### Exit Criteria

- [ ] Requirements are testable and value-linked
- [ ] Features prioritized with rationale
- [ ] Workflows canonicalized
- [ ] Glossary conflicts resolved
- [ ] Traceability matrix complete

---

## Phase 3: GENERATE BUSINESS FOLDERS

| Attribute | Value |
|-----------|-------|
| **Agent** | `docs-manager` |
| **Goal** | Generate or update all 4 business folders in English only |


## Phase 4: QUALITY AND CONSISTENCY REVIEW

| Attribute | Value |
|-----------|-------|
| **Agent** | `project-manager` |
| **Goal** | Validate cross-folder consistency, delivery readiness, and completeness |


## Business Docs Consistency Matrix
| Check | PRD | Features | Workflows | Glossary | Status |
|------|-----|----------|-----------|----------|--------|
| Scope consistent | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Terms consistent | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| IDs traceable (BG/BR/BF/BW) | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| Metrics defined | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
| No contradictions | Yes/No | Yes/No | Yes/No | Yes/No | Pass/Fail |
```

### Exit Criteria

- [ ] Cross-folder consistency verified
- [ ] Contradictions resolved
- [ ] Traceability intact
- [ ] Delivery readiness confirmed

---

## VERIFICATION

Before completion, verify folder existence and quality:

### Folder Existence

```
./documents/business/
  [ ] business-prd/         (00-index.md + 01~04)
  [ ] business-features/    (00-index.md + 01~05)
  [ ] business-workflows/   (00-index.md + 01~05)
  [ ] business-glossary/    (00-index.md + 01~04)
```

### Quality Gates

For every business folder and sub-file:

- [ ] English only
- [ ] Required sections present
- [ ] Evidence Sources section present with actual paths
- [ ] `00-index.md` contains Known Gaps and Open Questions
- [ ] No placeholder text
- [ ] Business value explicit and measurable where applicable
- [ ] TOC links in every `00-index.md` match actual sub-files

### Cross-Folder Gates

- [ ] IDs consistent (BG/BR/BF/BW)
- [ ] Same term has one canonical meaning across folders
- [ ] Feature priorities align with PRD scope
- [ ] Workflows reflect features and requirements accurately

---

## COMPLETION

Report status:

1. **Complete** - All 4 business folders created/updated and consistency-validated
2. **Incomplete** - List missing folders/sub-files, failed quality gates, and blockers
3. **Continue** -> `/docs:audit` for audit documentation
