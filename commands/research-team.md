---
description: "🔺 Team Research — Golden Triangle 3-Vector Parallel Deep-Research with Adversarial Fact-Checking & Wave 3 Gap-Filling"
version: "5.5"
category: research
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`RESEARCH`, `SCOUT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /research:team — Golden Triangle 3-Vector Parallel Deep-Research Engine

> **MISSION**: Achieve maximum research depth and zero-hallucination accuracy through **Turn-1 Parallel 3-Vector Deep-Hunting** across the `research-team` Golden Triangle (`agents/teams/research-team/{techlead,executor,reviewer}.md`), followed by **Adversarial Evidence Cross-Examination & Wave 3 Gap-Filling Search** via Warm Session Reuse (`send_message`).
> **AUTO-TRIGGERED BY DEFAULT (`naturalLanguageResearchTrigger = "auto_team"`)**: Default destination for `/research` and natural-language deep research, technical/documentation investigation, competitor analysis, or architecture discovery.

<topic>$ARGUMENTS</topic>

---

## ⚡ TURN-1 ZERO-TAX 3-VECTOR PARALLEL FAN-OUT & SUB-AGENT RULE

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** (`1. MISSION & ACCEPTANCE CRITERIA`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION & DELIVERABLE`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — spawn all 3 `research-team` specialists **concurrently on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")` and record their `conversationId`s for Warm Session Reuse (`send_message`).

> ⚠️ **CRITICAL (`TypeName: "self"` MANDATORY FOR ALL 3 TRIANGLE AGENTS)**:
> Antigravity's built-in `TypeName: "research"` has **NO network access (`search_web` disabled) and NO `write_file` tool**.
> **ALWAYS use `invoke_subagent(TypeName: "self", Role: ..., Model: "inherit", Prompt: ...)`** for `techlead`, `executor`, and `reviewer` so every triangle member can run live `search_web` / `read_url_content` queries and write to `<appDataDir>\brain\<conversation-id>\`!

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST)

| Phase | Owner | Output Artifact |
|-------|-------|-----------------|
| **P1: Parallel 3-Vector Deep-Hunting** | `techlead` + `executor` + `reviewer` | Vector findings appended to `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` + `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md` (when workspace code exists) |
| **P2: Adversarial Cross-Examination & Wave 3 Gap-Filling** | `reviewer` ⇄ `executor` ⇄ `techlead` (`send_message`) | `[CRITIQUE]`, Wave 3 verification queries, and `[CONSENSUS]` in `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` |
| **P3: Evidence-Gated Master Synthesis** | `techlead` / `executor` | **`<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md`** (fallback: `./reports/{topic}/researchers/RESEARCH-{topic}.md`) |

---

## 🎭 Phase 1 (Turn-1 Parallel Fan-Out): 3-VECTOR DEEP-HUNTING — 🔺 GOLDEN TRIANGLE

Immediately on Turn 1, spawn all **3 `research-team` roles in parallel** (`TypeName: "self"`, `Model: "inherit"`), assigning each a distinct investigative vector across our **4-Source Triangulation** (`Workspace` + `1,471 Skills Vault` + `Official Docs` + `Benchmarks/Issues`):

| Triangle Role | Specialist Persona (`agents/teams/research-team/`) | Assigned Investigative Vector (Turn-1 Parallel Execution) |
|---------------|----------------------------------------------------|-----------------------------------------------------------|
| **🔺 Tech Lead (Vector 1)** | `techlead.md` (`researcher` Lead) | **Vector 1 — Official Specifications, RFCs, System Architecture & Theoretical Foundations**: Execute Wave 1 & Wave 2 `search_web` / `read_url_content` (`4–6+` queries) targeting official vendor docs, RFCs/specs, version matrices, core architectural invariants, and Dual-Track 5-Lens framing. Log `[TASK_BRIEF]` + `[VECTOR_1_FINDINGS]` to `MAILBOX-{date}.md`. |
| **⚙️ Executor (Vector 2)** | `executor.md` (`scouter` + `researcher`) | **Vector 2 — Deep SDK/API Docs, Local Codebase Manifests, `1,471` Skills Vault & Implementation Blueprints**: Inspect local manifests (`package.json`, `pyproject.toml`, `Cargo.toml`, `./documents/`), query `matrix-skills/compact-index.json` (`1,471` skills) for matching `SKILL.md` files, and run `4–6+` deep SDK/API `search_web` queries to build concrete code/config blueprints and `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md` (if repo exists). Log `[VECTOR_2_SUBMISSION]` to `MAILBOX-{date}.md`. |
| **🛡️ Reviewer (Vector 3)** | `reviewer.md` (`brainstormer` / Devil's Advocate) | **Vector 3 — Independent Fact-Checking, Competitor/OSS Benchmarks, Production Post-Mortems & Failure Modes**: Execute `4–6+` independent adversarial `search_web` queries hunting for GitHub Issues, breaking changes, CVEs, p99 latency/memory bottlenecks, unit economics traps, and competitor weaknesses (`≥ 5` benchmarks). Log `[VECTOR_3_ADVERSARIAL_AUDIT]` to `MAILBOX-{date}.md`. |

---

## 🎭 Phase 2: ADVERSARIAL EVIDENCE CROSS-EXAMINATION & WAVE 3 GAP-FILLING (`send_message`)

> **♻️ WARM SESSION REUSE MANDATORY**: Do **NOT** spawn new sub-agents for Phase 2! Reuse the 3 warm `conversationId`s from Phase 1 via `send_message(Recipient: conversationId, Message: ...)`.

1. **Adversarial Audit (`reviewer` via `send_message`)**:
   - Audits Vector 1 and Vector 2 submissions in `MAILBOX-{date}.md` against Vector 3 adversarial evidence:
     - Are any API signatures, config flags, or version numbers unverified or deprecated?
     - Are benchmark/cost numbers backed by primary sources or hand-wavy estimates?
     - Are production failure modes (race conditions, N+1, memory leaks, rate limits, D7/D30 churn) addressed?
   - Issues `[CRITIQUE]` in `MAILBOX-{date}.md` listing exact gaps (`🔴 CRITICAL` / `🟠 HIGH`).
2. **Wave 3 Gap-Filling Search (`executor` / `techlead` via `send_message`, max 3 rounds)**:
   - Runs targeted **Wave 3 gap-filling `search_web` / `read_url_content` queries** to resolve every `[CRITIQUE]` item with primary URLs or local `[file:line]` proof, posting `[REVISION]` to `MAILBOX-{date}.md`.
3. **Consensus Stamp**:
   - `reviewer` verifies fixes and `techlead` records binding consensus in `MAILBOX-{date}.md`:
     `✅ CONSENSUS: research-team/techlead ✓ | research-team/executor ✓ | research-team/reviewer ✓`

---

## 🎭 Phase 3: EVIDENCE-GATED MASTER SYNTHESIS (`RESEARCH-{topic}.md`)

Synthesize the consensus-approved findings from all 3 vectors into `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` with these **6 Mandatory Sections**:

1. **Executive Summary, Consensus Stamp & Pinned Version Matrix**:
   - Direct synthesis verdict, `✅ CONSENSUS` stamp, and exact version compatibility table (Local Workspace vs. Latest Stable vs. Breaking Changes).
2. **Research Execution Audit Log (Mandatory Table)**:
   | Vector / Wave | Agent | Query / Source Inspected | Source Tier (`Official Docs` / `Skills Vault` / `Workspace` / `Issues & Benchmarks`) | Verified Finding |
   |---------------|-------|--------------------------|--------------------------------------------------------------------------------------|------------------|
3. **Deep 5-Lens Analysis (Track A: Product/Market/Game OR Track B: Technical/SDK/Architecture)**:
   - Complete 5-Lens breakdown with **Mermaid architecture/sequence/state diagrams** and **production-ready code/config blueprints**.
4. **Quantitative Trade-off & Benchmark Matrix (`≥ 3–5` Options/Competitors)**:
   - Head-to-head comparison across performance/latency, cost/unit economics at scale, DX, security, and fatal weaknesses.
5. **Adversarial Failure Modes, Edge Cases & Mitigation Playbook**:
   - Every production pitfall, GitHub issue, CVE, or scale bottleneck uncovered by Vector 3 paired with concrete engineering countermeasures.
6. **Verified Clickable Citation Registry**:
   - Numbered clickable `[Source Title](https://...)` and `[file:line](file:///...)` references for 100% of claims.

---

## ⛔ HARD STOP — PRESENT ARTIFACTS & AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT WRITE APPLICATION CODE AUTOMATICALLY.**
>
> Present clickable links to `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md`, `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md` (if created), and `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md`, then offer next steps:
> 1. 💡 `/brainstorm:team` → Ideate killer features or product mechanics from this research
> 2. 🎨 `/design:hard` or `/design:team` → Create UI/UX & system design specifications (`DESIGN-{topic}.md`)
> 3. 📋 `/plan:team` or `/plan:hard` → Build a contract-locked implementation plan (`PLAN-{topic}.md`)
> 4. 💻 `/cook:team` or `/cook:hard` → Implement the architecture with full verification
