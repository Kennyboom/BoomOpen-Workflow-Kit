---
description: "ðŸ“ Docs - Full Documentation Suite (executes ALL sub-commands sequentially)"
version: "2.0"
category: documentation
execution-mode: execute
---

# /docs â€” Full Documentation Suite

> **MISSION**: Execute ALL documentation sub-commands **SEQUENTIALLY**. Only report "Done" when ALL deliverables are created: 5 knowledge folders (26+ files) + 4 business folders (22+ files) + 4 audit folders (20+ files).

<scope>$ARGUMENTS</scope>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant (e.g. docs/core.md), and execute it.

---

## âš ï¸ EXECUTION RULES (NON-NEGOTIABLE)

> [!CAUTION]
>
> 1. You MUST execute each sub-command **IN ORDER**
> 2. You MUST wait for each sub-command to **COMPLETE** before starting next
> 3. You MUST create ALL deliverables across 3 sub-commands
> 4. You may **NOT** skip any sub-command
> 5. Report "Done" **ONLY** when all deliverables exist

---

## ðŸ”„ SEQUENTIAL EXECUTION FLOW

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ STEP 1: Load & Execute /docs:core                               â”‚
â”‚   â†’ Wait until ALL 5 knowledge folders are created              â”‚
â”‚   â†’ Each folder: 00-index.md + numbered sub-files               â”‚
â”‚   â†’ Verify: knowledge-overview/, architecture/, domain/,        â”‚
â”‚   â†’         source-base/, standards/                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ STEP 2: Load & Execute /docs:business                           â”‚
â”‚   â†’ Wait until ALL 4 business folders are created               â”‚
â”‚   â†’ Verify: business-prd/, features/, workflows/, glossary/     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ STEP 3: Load & Execute /docs:audit                              â”‚
â”‚   â†’ Wait until ALL 4 audit folders are created                   â”‚
â”‚   â†’ Verify: audit-security, compliance, dataflow,               â”‚
â”‚             recommendations                                     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## STEP 1: EXECUTE `/docs:core`

| Attribute       | Value                                             |
| --------------- | ------------------------------------------------- |
| **Sub-Command** | `~/.{TOOL}/agent-assistant/commands/docs-core.md` |
| **Action**      | **LOAD AND FOLLOW** the entire core.md workflow   |

### Folders to be Created (v3.0 â€” folder-based):

- [ ] `./documents/knowledge-overview/` (00-index.md + 4 sub-files)
- [ ] `./documents/knowledge-architecture/` (00-index.md + 5 sub-files)
- [ ] `./documents/knowledge-domain/` (00-index.md + 4 sub-files)
- [ ] `./documents/knowledge-source-base/` (00-index.md + 4 sub-files)
- [ ] `./documents/knowledge-standards/` (00-index.md + 4 sub-files)

**â¸ï¸ PAUSE HERE** â€” Do NOT proceed to Step 2 until all 5 knowledge folders with sub-files exist.

---

## STEP 2: EXECUTE `/docs:business`

| Attribute       | Value                                                 |
| --------------- | ----------------------------------------------------- |
| **Sub-Command** | `~/.{TOOL}/agent-assistant/commands/docs-business.md` |
| **Action**      | **LOAD AND FOLLOW** the entire business.md workflow   |

### Folders to be Created (v4.0 â€” folder-based):

- [ ] `./documents/business/business-prd/` (00-index.md + 4 sub-files)
- [ ] `./documents/business/business-features/` (00-index.md + 5 sub-files)
- [ ] `./documents/business/business-workflows/` (00-index.md + 5 sub-files)
- [ ] `./documents/business/business-glossary/` (00-index.md + 4 sub-files)

**â¸ï¸ PAUSE HERE** â€” Do NOT proceed to Step 3 until all 4 business folders with sub-files exist.

---

## STEP 3: EXECUTE `/docs:audit`

| Attribute       | Value                                              |
| --------------- | -------------------------------------------------- |
| **Sub-Command** | `~/.{TOOL}/agent-assistant/commands/docs-audit.md` |
| **Action**      | **LOAD AND FOLLOW** the entire audit.md workflow   |

### Folders to be Created (v4.0 - folder-based):

- [ ] `./documents/audit/audit-security/` (00-index.md + 4 sub-files)
- [ ] `./documents/audit/audit-compliance/` (00-index.md + 4 sub-files)
- [ ] `./documents/audit/audit-dataflow/` (00-index.md + 4 sub-files)
- [ ] `./documents/audit/audit-recommendations/` (00-index.md + 4 sub-files)

---

## âœ… FINAL VERIFICATION (REQUIRED)

Before reporting "Done", verify ALL deliverables exist:

```
./documents/
â”œâ”€â”€ Core (5 folders, 26+ files)
â”‚   â”œâ”€â”€ âœ… knowledge-overview/        (00-index + 01~04)
â”‚   â”œâ”€â”€ âœ… knowledge-architecture/    (00-index + 01~05)
â”‚   â”œâ”€â”€ âœ… knowledge-domain/          (00-index + 01~04)
â”‚   â”œâ”€â”€ âœ… knowledge-source-base/     (00-index + 01~04)
â”‚   â””â”€â”€ âœ… knowledge-standards/       (00-index + 01~04)
â”œâ”€â”€ Business (4 folders, 22+ files)
â”‚   â”œâ”€â”€ âœ… business-prd/          (00-index + 01~04)
â”‚   â”œâ”€â”€ âœ… business-features/     (00-index + 01~05)
â”‚   â”œâ”€â”€ âœ… business-workflows/    (00-index + 01~05)
â”‚   â””â”€â”€ âœ… business-glossary/     (00-index + 01~04)
â””â”€â”€ Audit (4 folders, 20+ files)
    â”œâ”€â”€ âœ… audit-security/         (00-index + 01~04)
    â”œâ”€â”€ âœ… audit-compliance/       (00-index + 01~04)
    â”œâ”€â”€ âœ… audit-dataflow/         (00-index + 01~04)
    â””â”€â”€ âœ… audit-recommendations/  (00-index + 01~04)
```

---

## ðŸ“Š COMPLETION OUTPUT

Only output this when ALL deliverables are verified:

```markdown
## âœ… Full Documentation Suite Complete

### ðŸ“ All Documents Created

| Type     | Deliverables                                                | Status   |
| -------- | ----------------------------------------------------------- | -------- |
| Core     | 5 knowledge folders (overview, architecture, domain, source-base, standards) | âœ… 5/5 folders |
| Business | 4 business folders (prd, features, workflows, glossary)     | âœ… 4/4 folders |
| Audit    | 4 audit folders (security, compliance, dataflow, recommendations) | âœ… 4/4 folders |

**Total: 13 folders (68+ files) created in `./documents/`**
```

---

## ðŸš« FORBIDDEN

- âŒ Skipping any sub-command
- âŒ Creating partial deliverables and reporting "Done"
- âŒ Executing sub-commands in parallel (must be sequential)
- âŒ Reporting "Done" before all deliverables exist

---

## ðŸ“Œ INDIVIDUAL ROUTES (Still Available)

If you need only ONE type:

| Route            | Deliverables Created                           |
| ---------------- | ---------------------------------------------- |
| `/docs:core`     | 5 knowledge folders with 00-index + sub-files  |
| `/docs:business` | 4 business folders with 00-index + sub-files  |
| `/docs:audit`    | 4 audit folders with 00-index + sub-files      |
