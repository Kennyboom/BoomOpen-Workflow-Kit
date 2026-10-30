# 🎯 SKILLS — Fast 2-Step Progressive Skill Resolution

> **VERSION**: 5.1 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: When skill resolution is needed in Mode B | **PURPOSE**: Low-latency Hybrid Skill Orchestration Layer (HSOL)

---

## ⚡ FAST 2-STEP PROGRESSIVE SKILL LOOKUP (DEFAULT)

> **PERFORMANCE RULE**: Do **NOT** manually scan all 19 `matrix-skills/*.yaml` files on every task. Use this fast 2-step lookup instead:

```
┌────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: Check Pre-Loaded <skills> in System Prompt (0 Latency)            │
│  • Inspect the <skills> catalog already injected into your system context  │
│    (Progressive Disclosure).                                               │
│  • If a matching skill is listed, read its SKILL.md directly.              │
├────────────────────────────────────────────────────────────────────────────┤
│  STEP 2: Targeted Lookup via skill-seeker (Only for Niche Domains)         │
│  • If the required niche framework/domain is NOT in <skills>:              │
│    1. Run a targeted grep_search in ~/.gemini/config/skills_library/       │
│       (or read only the single relevant matrix-skills/{domain}.yaml file). │
│    2. Read ONLY the matched SKILL.md file to load its instructions.        │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## SKILL SOURCES & GOVERNANCE

1. **Active Global Skills (`<skills>`)** — Pre-indexed in `~/.{TOOL}/skills/` (`~/.gemini/config/skills/` on Antigravity 2.0) and visible in `<skills>` at turn start.
2. **Dormant Skills Library (`skill-seeker`)** — 1,400+ specialized skills in `~/.gemini/config/skills_library/` searched on-demand via `grep_search`.
3. **Domain Matrix (`matrix-skills/{domain}.yaml`)** — Domain-indexed metadata in `~/.{TOOL}/skills/boomopen-workflow-kit/matrix-skills/` (governed by `_index.yaml` and `_dynamic.yaml`).

---

## SKILL DECISION FLOW

### By Task Complexity

| Assessment | Action |
|------------|--------|
| **Simple** | Base knowledge sufficient — skip skill resolution (`🎯 Skills Analysis: Simple → Skipping`) |
| **Complex** | Run the **Fast 2-Step Lookup** (`<skills>` → `skill-seeker` / single `matrix-skills/{domain}.yaml`) and load matching `SKILL.md` |

**⛔ FORBIDDEN**: Outputting `Complex → Using base knowledge (...)` without checking `<skills>` and `skill-seeker`.

### Complex Task Resolution Algorithm

```
WHEN task_complexity == Complex:
  1. CHECK pre-loaded <skills> in system prompt for matching domain/framework skills.
  2. IF found in <skills>:
     → READ the matched SKILL.md directly.
  3. ELSE (niche framework/tool not in <skills>):
     → USE skill-seeker: run targeted grep_search in ~/.gemini/config/skills_library/
       OR check the single relevant ~/.{TOOL}/skills/boomopen-workflow-kit/matrix-skills/{domain}.yaml
     → READ the matched SKILL.md file.
  4. IF no local skill exists and variant is :hard or :team:
     → Optionally discover via `npx skills find "{keywords}"` or report gap explicitly.
```

---

## FITNESS & TRUST PROGRESSION (HSOL)

```
fitness = 0.35 × SEMANTIC_MATCH + 0.25 × SPECIFICITY + 0.20 × TRUST_LEVEL + 0.10 × FRESHNESS + 0.10 × SUCCESS_RATE
```

- **Curated / Matrix skills**: `trust = 1.0`
- **Dynamic skills**: `NEW (0.3) → EVALUATING (0.5, 3 runs) → VALIDATED (0.7, 10 runs) → PROMOTED (1.0, ≥85% success)`
- Dynamic entries in `_dynamic.yaml` preserve `owner`, `checksum`, `support_state`, `promotion_state`, `freshness`, `installed_at`, and `last_execution`.

---

## DYNAMIC DISCOVERY COMMANDS (Optional Fallback)

```bash
npx skills find "query"           # Search community skills
npx skills add owner/repo@skill -g -y
```

- **Low-trust task-critical skill (`fitness < 0.75`)**: Confirm with user before installing external packages.
