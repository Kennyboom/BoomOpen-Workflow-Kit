---
description: ⚡⚡⚡ Deep Ideation — Multi-Agent 5-Lens Research, Competitor Teardown & Product/Architecture Synthesis
version: "5.5"
category: planning
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /brainstorm:hard — Deep Multi-Agent Research & Ideation

> **MISSION**: Conduct exhaustive multi-agent research (5-Lens market/competitor teardown, technical architecture, unit economics at scale, and pre-mortem risks) and synthesize a complete, decision-ready Product & Architecture Blueprint (`RESEARCH-{topic}.md` + `BRAINSTORM-{topic}.md`).
> **AUTO-TRIGGERED BY NATURAL LANGUAGE**: Whenever the user asks in natural language to *"nghiên cứu"*, *"phân tích chuyên sâu"*, *"khám phá ý tưởng"*, *"đề xuất ý tưởng / đề xuất thêm"*, *"research"*, *"deep dive"*, or *"brainstorm"* an idea, product, game, or system architecture.

<topic>$ARGUMENTS</topic>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — launch Phase 1A (`researcher`) and Phase 1B (`scouter` / domain specialist) **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## 🔀 TIERED EXECUTION & ANTIGRAVITY WEB-SEARCH SUBAGENT RULE (MANDATORY)

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1, Model: inherit). EMBODY ONLY on system failure (Tier 2)."
  antigravity_web_search_rule:
    - "⚠️ CRITICAL: Antigravity's built-in `TypeName: 'research'` subagent runs in a read-only sandbox with NO network access (`search_web` disabled) and NO `write_file`."
    - "✅ ALWAYS use `invoke_subagent(TypeName: 'self', Role: ..., Model: 'inherit', Prompt: ...)` for BOTH `researcher` AND `scouter`/`brainstormer` so they have full `search_web` and Brain Artifact `write_file` capabilities."
  four_source_triangulation_and_3_wave_search:
    - "Phase 1A (`researcher`) MUST execute 4-Source Triangulation (Workspace manifests/docs + 1,471 Skills Vault `compact-index.json` + Official Docs via `search_web` + Benchmarks/Issues) and a 3-Wave Multi-Hop Search Loop (`Wave 1: Official Docs & Versions` → `Gap Reflection` → `Wave 2: Deep Internals & Benchmarks` → `Wave 3: Failure Modes & Edge Cases`, `8–12+` queries)."
  dag_parallel_fan_out:
    - "Launch Phase 1A (`researcher`) and Phase 1B (`scouter` for existing repo OR domain specialist like `game-engineer`/`tech-lead` for greenfield ideas) CONCURRENTLY in a single turn via `TypeName: 'self'`."
```

---

## ⚠️ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  researcher: "<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{topic}.md" # (or ./reports/{topic}/researchers/RESEARCH-{topic}.md)
  scouter_or_specialist: "<appDataDir>\\brain\\<conversation-id>\\SCOUT-{topic}.md" # (optional for greenfield if merged into RESEARCH, mandatory if codebase exists)
  brainstormer_synthesis: "<appDataDir>\\brain\\<conversation-id>\\BRAINSTORM-{topic}.md" # MANDATORY FINAL BLUEPRINT

enforcement:
  - Phase 1A (`researcher`) MUST execute 5–10+ web searches across the 5 Mandatory Lenses and create `RESEARCH-{topic}.md`
  - Phase 2 (`brainstormer`) MUST read `RESEARCH-{topic}.md` (and `SCOUT-{topic}.md`) and create `BRAINSTORM-{topic}.md`
```

All deliverables in `<appDataDir>\brain\<conversation-id>\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you (technical terms in English).

---

## ⛔ ABSOLUTE PROHIBITION — NO APPLICATION CODE

> **🔴 THIS WORKFLOW PRODUCES DEEP RESEARCH & PRODUCT/ARCHITECTURE BLUEPRINTS ONLY. NO APPLICATION CODE.**
>
> - ❌ NEVER write application implementation code or modify project source files
> - ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` without explicit user approval
> - ✅ ONLY produce exhaustive `RESEARCH-{topic}.md`, `SCOUT-{topic}.md`, and `BRAINSTORM-{topic}.md` artifacts

---

## 🎭 Phase 1 (DAG Parallel Fan-Out): 5-LENS DEEP RESEARCH + ARCHITECTURE/CODEBASE SCOUTING

Launch **Phase 1A (`researcher`)** and **Phase 1B (`scouter` or Domain Specialist)** concurrently in a **single turn** (`Model: "inherit"`):

### 🔬 Phase 1A: 5-Lens Market, Competitor & Technical Deep Dive (`researcher`)

| Attribute | Value |
| --------- | ----- |
| **Agent** | `researcher` (`Model: "inherit"`, registered via `define_subagent` or `TypeName: "self"` for full `search_web` access) |
| **Goal**  | Execute 5–10+ targeted web searches across the 5 Mandatory Lenses and write `RESEARCH-{topic}.md` |

**Mandatory 5 Lenses for `researcher`** (from `agents/researcher.md`):
1. **Lens 1 — Phenomenon & Behavioral Psychology Teardown** (Hook Model: Trigger → Action → Variable Reward → Investment, cultural/viral hooks).
2. **Lens 2 — Competitor & Benchmark Matrix (Minimum 5 Benchmarks)** (local & global competitors, core loops, monetization, and **fatal weaknesses**).
3. **Lens 3 — Deep Technical & System Architecture** (rendering/frontend, realtime multiplayer/state sync, database/caching, anti-cheat/security).
4. **Lens 4 — Unit Economics, Latency & Cost Modeling at Scale** (concrete server + bandwidth + AI token cost math at 1,000 CCU / 10,000 DAU, plus 80–90% cost optimization via Hybrid Rule Engine + targeted LLM).
5. **Lens 5 — Pre-Mortem Failure Modes & Risk Mitigation** (why 90% of similar projects fail at D7/D30 and concrete countermeasures).

**Exit Criteria (Phase 1A):**
- [ ] `RESEARCH-{topic}.md` created in `<appDataDir>\brain\<conversation-id>\`
- [ ] ≥ 5 real-world competitors/benchmarks analyzed in a comparison matrix
- [ ] Concrete architecture trade-offs and unit economics / cost math at scale documented
- [ ] Primary sources cited with URLs

---

### 🧭 Phase 1B: Codebase Scouting OR Domain Specialist Architecture Audit (`scouter` / `game-engineer` / `tech-lead`)

| Attribute | Value |
| --------- | ----- |
| **Agent** | `scouter` (if existing codebase) OR Domain Specialist (`game-engineer` / `tech-lead` / `database-architect` for greenfield product/game ideation) |
| **Goal**  | Map existing repo constraints OR design domain-specific technical mechanics (`SCOUT-{topic}.md`) |

- **If workspace has an existing codebase**: Spawn `scouter` to map architecture, reusable modules, schemas, and integration points into `SCOUT-{topic}.md`.
- **If greenfield idea (e.g., new 3D game, new SaaS platform, new AI system)**: Spawn the matching domain specialist (`game-engineer` for games/3D worlds, `tech-lead` for SaaS/distributed systems) in parallel with `researcher` to audit rendering budgets (WebGPU/Three.js, mobile FPS/battery), multiplayer state authority, and data schema constraints into `SCOUT-{topic}.md`.

**Exit Criteria (Phase 1B):**
- [ ] `SCOUT-{topic}.md` created with concrete technical constraints, architecture diagrams, and performance/security guardrails

---

## 🎭 Phase 2: DEEP PRODUCT, KILLER FEATURES & ARCHITECTURE SYNTHESIS (`brainstormer`)

| Attribute        | Value |
| ---------------- | ----- |
| **Agent**        | `brainstormer` (`Model: "inherit"`) |
| **Goal**         | Synthesize `RESEARCH-{topic}.md` + `SCOUT-{topic}.md` into a comprehensive `BRAINSTORM-{topic}.md` blueprint |
| **Prerequisite** | Wait for Phase 1A (`RESEARCH-{topic}.md`) and Phase 1B (`SCOUT-{topic}.md`) to complete |

**Mandatory Sections in `BRAINSTORM-{topic}.md`** (from `agents/brainstormer.md`):
1. **Vision, Cultural Wave & Unfair Positioning**
2. **Core Loop & Retention Engine (Micro Loop 1–5m → Daily D1–D7 → Macro/Endgame D30+ → Viral K-Factor Engine)**
3. **5–7 Killer Features (Counter-Positioning vs. Competitors, exact UX mechanics, viral shareability, and low-cost technical implementation)**
4. **Core Domain Entities (8–12 entities), State Machines, Economy Sink/Faucet Balance & Edge Cases**
5. **Recommended Production Tech & Hybrid AI Architecture**
6. **Phased Delivery Roadmap (Phase 1 Viral MVP → Phase 2 Social/Depth → Phase 3 Scale)**

**Exit Criteria (Phase 2):**
- [ ] `BRAINSTORM-{topic}.md` created at `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{topic}.md`
- [ ] 5–7 Killer Features designed with concrete mechanics and cost/feasibility proof
- [ ] Complete Core Loop (D1/D7/D30) and 8+ Domain Entities documented
- [ ] Phased MVP → V1 → V2 roadmap defined

---

## ⛔ HARD STOP — PRESENT ARTIFACTS & AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT WRITE CODE AUTOMATICALLY.**
>
> Present clickable links to `RESEARCH-{topic}.md`, `SCOUT-{topic}.md`, and `BRAINSTORM-{topic}.md`, highlight the top breakthroughs, and offer next steps:
> 1. 📋 `/plan:hard` → Decompose the approved MVP into an actionable multi-agent engineering plan (`PLAN-{topic}.md`)
> 2. 🎨 `/design:hard` → Create the UI/UX & 3D visual design system (`DESIGN-{topic}.md`)
> 3. 🚀 `/cook:hard` → End-to-end multi-agent implementation of the MVP
> 4. 🔄 Refine specific Killer Features or mechanics based on user feedback
