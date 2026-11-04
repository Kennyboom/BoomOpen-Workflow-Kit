---
description: ⚡⚡⚡ Research Answer — Turn-1 Parallel Codebase Scouting + 3-Wave Deep Research with Evidence-Gated Synthesis
version: "5.5"
category: knowledge
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`RESEARCH`, `SCOUT`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /ask:hard — Research-Backed Answering (Turn-1 Parallel Fan-Out)

> **MISSION**: Provide comprehensive, evidence-backed answers by immediately spawning **`researcher` + `scouter` in parallel on Turn 1 (`TypeName: "self"`, `Model: "inherit"`)** using **4-Source Triangulation** and the **3-Wave Multi-Hop Search Protocol** — with **ZERO sequential `brainstormer` bottleneck**.

<question>$ARGUMENTS</question>

---

## ⚡ TURN-1 ZERO-TAX PARALLEL DISPATCH & SUB-AGENT RULE

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md`, and do **NOT** run a sequential `brainstormer` pre-phase — launch **Phase 1A (`researcher`)** and **Phase 1B (`scouter`)** **concurrently in a single Turn-1 tool batch** via `invoke_subagent(TypeName: "self", Model: "inherit")`.

> ⚠️ **CRITICAL (`TypeName: "self"` MANDATORY FOR BOTH AGENTS)**:
> Antigravity's built-in `TypeName: "research"` has **NO network access (`search_web` disabled) and NO `write_file` tool**.
> **ALWAYS use `invoke_subagent(TypeName: "self", Role: ..., Model: "inherit", Prompt: ...)`** for BOTH `researcher` AND `scouter`!

---

## 🔀 TIERED EXECUTION & QUALITY-FIRST MODEL POLICY

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Spawn `researcher` + `scouter` in parallel on Turn 1 with `TypeName: "self"`, `Model: "inherit"` (Pro High default; NEVER `flash_lite`) |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## ⚡ Phase 1 (Turn-1 Parallel Fan-Out): `researcher` (3-Wave Search) + `scouter` (Codebase & Skills)

> **🚀 TURN-1 DAG FAN-OUT DIRECTIVE**: Launch **Track 1A (`researcher`)** AND **Track 1B (`scouter`)** **concurrently in a single Turn-1 batch** (`TypeName: "self"`, `Model: "inherit"`), and join via Reactive Async Wakeup before Phase 2 Synthesis.

### 🔬 Track 1A: EXTERNAL & DOCUMENTATION DEEP RESEARCH (`researcher`)
- **Agent**: `researcher` (`invoke_subagent(TypeName: "self", Role: "Deep Technical Researcher", Model: "inherit")`)
- **4-Source Triangulation + 3-Wave Search Protocol (`6–10+` queries)**:
  1. **Wave 1 (Official Docs & Version Pinning)**: Search official vendor documentation, RFCs, and changelogs (`search_web` + `read_url_content`).
  2. **Gap Reflection**: Identify unverified behaviors, edge cases, or performance/security trade-offs.
  3. **Wave 2 (Deep Internals, APIs & Benchmarks)**: Verify exact API contracts, schemas, and empirical benchmarks.
  4. **Wave 3 (Adversarial Failure Modes & Issues)**: Check GitHub Issues, breaking changes, and production gotchas.
- **Deliverable**: `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` (with `Research Execution Audit Log` and clickable URLs).

### 🧭 Track 1B: LOCAL CODEBASE, MANIFESTS & SKILLS VAULT ANALYSIS (`scouter`)
- **Agent**: `scouter` (`invoke_subagent(TypeName: "self", Role: "Codebase & Skills Scouter", Model: "inherit")`)
- **Goal**:
  1. Inspect local manifests (`package.json`, `pyproject.toml`, `Cargo.toml`), `./documents/`, and source files (`[file:line]` links).
  2. Query `matrix-skills/compact-index.json` (`1,471` skills) and load matching `SKILL.md` files for curated patterns.
- **Deliverable**: `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md` with exact `file:line` references and architecture diagrams.

---

## 🎭 Phase 2: EVIDENCE-GATED SYNTHESIS (`researcher` / Orchestrator)

| Attribute | Value |
|-----------|-------|
| **Prerequisite** | Combine Track 1A (`RESEARCH-{topic}.md`) + Track 1B (`SCOUT-{topic}.md`) |
| **Deliverable** | `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` (updated master artifact) + structured in-chat synthesis |
| **Exit** | Comprehensive answer with `Research Execution Audit Log`, version-pinned code examples, clickable `file:///` & `https://` links, Mermaid diagrams, and trade-offs |

---

## ✅ COMPLETION

Present the synthesized answer with:
1. ✅ **Answered** — Question resolved with internal (`SCOUT`) + external (`RESEARCH`) evidence
2. 🔬 **Adversarial Deep-Dive** → `/research:team` if 3-vector Golden Triangle verification is desired
3. 📋 **Plan** → `/plan:hard` if architectural planning is needed next
4. 💻 **Implement** → `/cook:hard` or `/code:hard` if implementation is needed
