---
description: "⚡⚡⚡ Deep Research — 3-Wave Multi-Hop Autonomous Research + Parallel Codebase Scouter with Dual-Track 5-Lens Analysis"
version: "5.5"
category: research
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`RESEARCH`, `SCOUT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /research:hard — Deep 3-Wave Parallel Research & Codebase Scouting

> **MISSION**: Conduct exhaustive, evidence-gated technical or product research by spawning **`researcher` + `scouter` in parallel on Turn 1 (`TypeName: "self"`, `Model: "inherit"`)**, executing **4-Source Triangulation**, a **3-Wave Multi-Hop Search Loop (`8–12+` queries)**, and **Dual-Track 5-Lens Analysis** (`RESEARCH-{topic}.md` + `SCOUT-{topic}.md`).

<topic>$ARGUMENTS</topic>

---

## ⚡ TURN-1 ZERO-TAX PARALLEL FAN-OUT & SUB-AGENT RULE

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** (`1. MISSION & ACCEPTANCE CRITERIA`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION & DELIVERABLE`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — launch **Phase 1A (`researcher`)** and **Phase 1B (`scouter`)** **concurrently in a single Turn-1 tool batch** via `invoke_subagent(TypeName: "self", Model: "inherit")`.

> ⚠️ **CRITICAL (`TypeName: "self"` MANDATORY FOR BOTH AGENTS)**:
> Antigravity's built-in `TypeName: "research"` has **NO network access (`search_web` disabled) and NO `write_file` tool**.
> **ALWAYS use `TypeName: "self"`** for BOTH `researcher` (needs `search_web` + `write_file` for `RESEARCH-{topic}.md`) AND `scouter` (needs `write_file` for `SCOUT-{topic}.md`)!

---

## 🧭 4-SOURCE TRIANGULATION & 3-WAVE MULTI-HOP SEARCH LOOP (`8–12+` Queries)

### 1. 4-Source Triangulation (Mandatory):
1. **Workspace Manifests & Architecture Docs**: `package.json`, `pyproject.toml`, `Cargo.toml`, lockfiles, `./documents/`, and existing source modules.
2. **BoomOpen `1,471` Skills Vault (`compact-index.json`)**: Query `matrix-skills/compact-index.json` (and `<skills>`) to load matching domain `SKILL.md` specifications.
3. **Official Primary Documentation & Specs (`search_web` + `read_url_content`)**: RFCs, vendor docs, API schemas, and migration guides for the exact target version.
4. **Adversarial Production Evidence**: GitHub Issues, PR discussions, CVEs, post-mortems, and empirical throughput/latency/cost benchmarks.

### 2. 3-Wave Multi-Hop Search Loop (`researcher` — Minimum `8–12+` Targeted Queries):
```
Wave 1 — Official Docs, Specs & Version Pinning (3–4 queries):
  → Pin latest stable vs. workspace versions, core architecture, and official API contracts.
  ▼
Gap Reflection Checkpoint:
  → Identify unverified claims, missing internal mechanics, scale bottlenecks, or edge-case behavior.
  ▼
Wave 2 — Deep Internals, APIs, Schemas & Quantitative Benchmarks (3–4 queries):
  → Dive into wire protocols, data schemas, concurrency/memory models, and head-to-head benchmarks.
  ▼
Wave 3 — Adversarial Failure Modes, GitHub Issues, CVEs & Edge Cases (2–4 queries):
  → Hunt for production failure modes, breaking changes, rate limits, security advisories, and mitigations.
```

---

## 🎭 Phase 1 (Turn-1 Parallel Fan-Out): `researcher` + `scouter`

Spawn **BOTH** sub-agents concurrently on Turn 1 (`TypeName: "self"`, `Model: "inherit"`):

### 🔬 Track 1A: `researcher` — 3-Wave Multi-Hop & Dual-Track 5-Lens Deep Dive
- **Invocation**: `invoke_subagent(TypeName: "self", Role: "Principal Deep Researcher", Model: "inherit", Prompt: ...)`
- **Deliverable**: `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md`
- **Select Track A or Track B (or Hybrid) based on topic**:

| Lens | **Track A: Product / Market / Game Ideation** | **Track B: Deep Technical / SDK / System Architecture** |
|------|-----------------------------------------------|---------------------------------------------------------|
| **Lens 1** | **Phenomenon & Behavioral Psychology Teardown** (Hook Model, core motivation, viral drivers) | **Official Specification, Version Matrix & Core Internals** (exact version pinning, runtime lifecycle, wire protocol) |
| **Lens 2** | **Competitor & Benchmark Matrix (`≥ 5` Benchmarks)** (strengths, monetization, fatal weaknesses) | **API Contracts, Type Schemas & Implementation Blueprints** (complete typed signatures, config, and integration patterns) |
| **Lens 3** | **System & Technical Architecture** (rendering, state sync, data model, security) | **Comparative Architecture Trade-off Matrix (`≥ 3–5` Options)** (throughput, p99 latency, DX, lock-in, ecosystem maturity) |
| **Lens 4** | **Unit Economics & Cost Modeling at Scale** (1k CCU / 10k DAU server + bandwidth + AI token math) | **Performance, Memory, Concurrency & Cost Envelope** (bundle size, memory footprint, connection pooling, scaling limits) |
| **Lens 5** | **Pre-Mortem Failure Modes & Risk Mitigation** (D7/D30 churn killers & concrete countermeasures) | **Adversarial Failure Modes, GitHub Issues, Security CVEs & Migration Gotchas** (breaking changes, race conditions, rollbacks) |

### 🧭 Track 1B: `scouter` — Local Codebase, Manifests & Skills Vault Mapping
- **Invocation**: `invoke_subagent(TypeName: "self", Role: "Codebase & Skills Vault Scouter", Model: "inherit", Prompt: ...)`
- **Deliverable**: `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md`
- **Responsibilities**:
  1. Inspect workspace manifests (`package.json`, `tsconfig.json`, `pyproject.toml`, `Cargo.toml`), `./documents/`, and relevant modules (`[file:line]` links).
  2. Query `matrix-skills/compact-index.json` (`1,471` skills) and summarize applicable patterns from matched `SKILL.md` files.
  3. Map integration touchpoints, compatibility constraints, and blast radius (or greenfield architectural constraints if no repo code exists yet).

---

## 🎭 Phase 2: CROSS-VERIFICATION & MASTER SYNTHESIS

Once `researcher` and `scouter` complete via Reactive Async Wakeup:
1. Cross-check `RESEARCH-{topic}.md` against `SCOUT-{topic}.md` (if any version or architectural mismatch exists, use `send_message(Recipient: conversationId)` to resolve it with the warm sub-agent).
2. Verify `RESEARCH-{topic}.md` contains all mandatory sections:
   - [ ] **Executive Summary & Decision Recommendation**
   - [ ] **Research Execution Audit Log** (Wave 1, Wave 2, Wave 3 queries + 4-Source Triangulation table)
   - [ ] **Primary Documentation & Version Compatibility Matrix**
   - [ ] **Deep 5-Lens Analysis (Track A or Track B)** with **Mermaid architecture/sequence diagrams** and **production-grade code/config blueprints**
   - [ ] **Quantitative Trade-off Matrix & Adversarial Failure Modes**
   - [ ] **Verified Clickable Citation Registry** (`https://...` and `file:///...`)

---

## ⛔ HARD STOP — PRESENT ARTIFACTS & AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT WRITE APPLICATION CODE AUTOMATICALLY.**
>
> Present clickable links to `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` and `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md`, summarize the top evidence-backed findings, and offer next steps:
> 1. 🔺 `/research:team` → Escalate to Golden Triangle 3-Vector adversarial cross-examination
> 2. 💡 `/brainstorm:team` or `/design:hard` → Ideate product features or design system specifications
> 3. 📋 `/plan:hard` or `/plan:team` → Create a contract-locked implementation plan (`PLAN-{topic}.md`)
> 4. 💻 `/cook:hard` → Implement the recommended architecture
