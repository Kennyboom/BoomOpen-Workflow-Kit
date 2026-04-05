---
description: "📝 Knowledge Folder Specs + Quality Gates — Referenced by docs-core.md"
version: "1.0"
type: reference
---

# Phase 2: Knowledge Folder Specifications

## Folder Content Requirements (Generate in this order)

### FOLDER 1: `knowledge-source-base/` — Foundation: WHERE things are

| Sub-File | MUST Include |
|----------|-------------|
| `00-index.md` | Summary, TOC, **Read Order for New Members**, cross-refs, known gaps |
| `01-directory-structure.md` | Complete annotated directory tree (depth 3-4), purpose of each dir |
| `02-entry-points.md` | Entry files, boot sequence, build scripts, config entry points |
| `03-key-modules.md` | Per-module: purpose, exports, dependencies, internal structure |
| `04-configuration.md` | Config files inventory, env vars with descriptions, secrets management |

### FOLDER 2: `knowledge-overview/` — Identity: WHAT and WHY

| Sub-File | MUST Include |
|----------|-------------|
| `00-index.md` | Project summary, TOC, quick facts table (name, version, type, lang) |
| `01-project-identity.md` | Name, version, purpose, **First 60 Minutes onboarding checklist** |
| `02-tech-stack.md` | Categorized stack table with version + evidence file |
| `03-features.md` | Key features with descriptions/metrics |
| `04-getting-started.md` | Prerequisites, step-by-step install, first run, troubleshooting |

### FOLDER 3: `knowledge-architecture/` — Design: HOW things connect

| Sub-File | MUST Include |
|----------|-------------|
| `00-index.md` | Architecture summary, component diagram (Mermaid), cross-refs |
| `01-system-overview.md` | High-level diagram, architecture style, layer boundaries |
| `02-components.md` | Per-component: name, responsibility, interfaces, dependencies |
| `03-data-flow.md` | Request lifecycle diagram, key data flows, event flows |
| `04-design-patterns.md` | Patterns used: name, where applied, rationale, code reference |
| `05-decisions.md` | ADR table: decision, choice, alternatives, rationale, trade-offs |

### FOLDER 4: `knowledge-domain/` — Data: WHAT flows through

| Sub-File | MUST Include |
|----------|-------------|
| `00-index.md` | Domain summary, entity overview (Mermaid ERD), bounded contexts |
| `01-entities.md` | Per-entity: fields with types, constraints, relationships |
| `02-database-schema.md` | Tables, indexes, migrations. Or "Not applicable" with reason |
| `03-api-contracts.md` | Per-endpoint: method, path, request/response, auth, errors |
| `04-business-rules.md` | Validations, business logic, state machines, constraints |

### FOLDER 5: `knowledge-standards/` — Rules: HOW TO CODE correctly

| Sub-File | MUST Include |
|----------|-------------|
| `00-index.md` | Standards summary, naming convention quick reference |
| `01-code-style.md` | Formatting rules, linting config, naming conventions table |
| `02-conventions.md` | File organization, import order, export patterns |
| `03-git-workflow.md` | Commit format, branch naming, PR guidelines, CI/CD pipeline |
| `04-testing-standards.md` | Test organization, naming, coverage goals, test commands |

---

## Mode-Dependent Execution

| Mode | Action |
|------|--------|
| **CREATE** | Create folder → `00-index.md` first → sub-files sequentially |
| **UPDATE** | Read ALL existing → compare with Intelligence Report → append/revise/preserve |
| **MIGRATE** | Read flat file → create folder → distribute content → archive flat file |

---

## Per-File Quality Gates

Every sub-file MUST pass:
- [ ] Written in English only
- [ ] Has project-specific content (not template text)
- [ ] No placeholders: `{placeholder}`, TODO, TBD
- [ ] Has `## Evidence Sources` section with actual file paths
- [ ] Every claim traces to Evidence Ledger
- [ ] Passes "new team member" test

---

## Verification Checklist

**Minimum total**: 5 folders × (1 index + 4-5 sub-files) = **26 files**

For EACH knowledge folder verify:
- [ ] `00-index.md` TOC matches actual sub-files
- [ ] All cross-reference links point to existing files
- [ ] No sub-file exceeds ~300 lines (split if needed)
- [ ] No sub-file < 20 lines of real content (merge if too thin)
- [ ] Mermaid diagrams (if used) are syntactically valid

## Sub-File Format Template

```markdown
# {Project Name} — {Document Title}

> **Purpose**: {one-line}
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: {YYYY-MM-DD}

---

{Content sections with real project data}

---

## Evidence Sources

| File | Why it was used |
|------|----------------|
| {actual/path/to/file} | {what evidence it provided} |
```
