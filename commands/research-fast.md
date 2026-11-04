---
description: "⚡ Fast Research — 2-Wave Autonomous Documentation, SDK/API & Technical Lookup with 4-Source Triangulation"
version: "5.5"
category: research
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`RESEARCH`, `SCOUT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /research:fast — Fast 2-Wave Autonomous Documentation & Technical Research

> **MISSION**: Rapidly investigate an SDK, API, library, framework, or technical topic using **4-Source Triangulation** and a **2-Wave Iterative Search Loop (`≥ 4–6` targeted queries)**, producing a verified `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` artifact.

<topic>$ARGUMENTS</topic>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & SUB-AGENT RULE

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — spawn `researcher` **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Role: "Deep Technical Researcher", Model: "inherit", Prompt: ...)`.

> ⚠️ **CRITICAL (`TypeName: "self"` MANDATORY)**: Never use `TypeName: "research"` (which disables `search_web` and `write_file`). Always use `TypeName: "self"` so `researcher` has full live web search (`search_web` / `read_url_content`) and Brain Artifact write access.

---

## 🧭 4-SOURCE TRIANGULATION PROTOCOL (MANDATORY)

`researcher` MUST triangulate findings across all 4 authoritative sources before synthesizing:
1. **Source 1 — Local Workspace Manifests & Docs**: Inspect `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, lockfiles, and `./documents/` (if present) to pin exact installed versions and project constraints.
2. **Source 2 — BoomOpen `1,471` Skills Vault (`compact-index.json`)**: Query `~/.{TOOL}/skills/boomopen-workflow-kit/matrix-skills/compact-index.json` (or `<skills>`) and read matching `SKILL.md` files for curated 2026 patterns.
3. **Source 3 — Official Primary Documentation (`search_web` + `read_url_content`)**: Retrieve official vendor docs, API references, migration guides, and changelogs for the exact pinned version.
4. **Source 4 — Empirical Benchmarks & Real-World Issues**: Check GitHub Issues, release notes, and production benchmarks for breaking changes, deprecations, and gotchas.

---

## 🔄 2-WAVE ITERATIVE SEARCH LOOP (`≥ 4–6` Queries)

| Wave | Focus | Minimum Queries | Action |
|------|-------|:---------------:|--------|
| **Wave 1: Official Docs & Version Pinning** | Official documentation, latest stable release, core API/config syntax, local manifest check | `2–3` queries | Pin exact version, extract canonical API signatures, and identify knowledge gaps or edge cases. |
| **Gap Reflection** | Verify what is still unconfirmed (breaking changes, rate limits, edge-case errors, performance overhead) | — | Formulate targeted Wave 2 follow-up queries for every open gap. |
| **Wave 2: Gotchas, Benchmarks & Verification** | GitHub issues, migration pitfalls, security/performance caveats, concrete code patterns | `2–3` queries | Resolve all gaps with primary evidence and verify every code/config snippet against the pinned version. |

---

## 🎭 EXECUTION PHASE: AUTONOMOUS 2-WAVE RESEARCH (`researcher`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `researcher` (`invoke_subagent(TypeName: "self", Role: "Deep Technical Researcher", Model: "inherit")`) |
| **Deliverable** | `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` (fallback: `./reports/{topic}/researchers/RESEARCH-{topic}.md`) |

### Mandatory Sections in `RESEARCH-{topic}.md`:
1. **Executive Summary & Pinned Version Matrix**: Direct answer, library/SDK versions (local vs. latest stable), and compatibility verdict.
2. **Research Execution Audit Log (Mandatory Table)**:
   | Wave | Query / Source Inspected | Source Type (`Docs` / `Skills Vault` / `Workspace` / `Issues`) | Key Finding & Version Verified |
   |------|--------------------------|----------------------------------------------------------------|--------------------------------|
3. **Canonical Architecture & Code/Config Blueprints**: Production-ready, copy-pasteable TypeScript/Python/Rust/config examples matching the pinned version.
4. **Known Gotchas, Breaking Changes & Trade-offs**: Concrete edge cases, deprecations, and mitigation rules.
5. **Verified Clickable Citation Registry**: Clickable `[Source Title](https://...)` and `[file:line](file:///...)` links for every claim.

---

## ⛔ HARD STOP — PRESENT ARTIFACT & AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT WRITE APPLICATION CODE AUTOMATICALLY.**
>
> Present `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` and offer next steps:
> 1. 🔬 `/research:hard` or `/research:team` → Escalate to 3-Wave / Golden Triangle deep investigation
> 2. 📋 `/plan:fast` or `/plan:hard` → Create an implementation plan from these findings
> 3. 💻 `/cook:fast` or `/code:fast` → Implement using the verified blueprint
