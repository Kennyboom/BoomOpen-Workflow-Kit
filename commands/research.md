---
description: "🔬 Research Router — Autonomous Deep-Research Engine for official documentation, SDK/API internals, codebase manifests, and multi-wave technical investigation"
version: "5.5"
category: research
execution-mode: router
---

# /research — Autonomous Deep-Research Router (v5.5)

> **ROUTER DIRECTIVE**: Route documentation, technical/architectural investigation, competitor benchmarks, and deep research requests to the appropriate `/research:{variant}` workflow.
> **DEFAULT ROUTING (`auto_team`)**: When `workflows.defaultVariant = "auto"` or `workflows.naturalLanguageResearchTrigger = "auto_team"`, route **IMMEDIATELY on Turn 1** to `/research:team` (`commands/research-team.md`), or `/research:hard` (`commands/research-hard.md`) when configured as `"auto_hard"`.

<topic>$ARGUMENTS</topic>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** (`1. MISSION & ACCEPTANCE CRITERIA`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION & DELIVERABLE`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

> ⚠️ **CRITICAL ANTIGRAVITY SUB-AGENT RULE (`TypeName: "self"` MANDATORY)**:
> Antigravity's built-in `TypeName: "research"` sub-agent runs in a restricted sandbox with **NO network access (`search_web` disabled) and NO `write_file` tool**.
> **ALWAYS use `invoke_subagent(TypeName: "self", Role: ..., Model: "inherit", Prompt: ...)`** for `researcher`, `research-team`, any sub-agent needing `search_web`, or any `scouter` that writes `SCOUT-*.md`!

---

## 🎯 INTENT DETECTION & ZERO-CODE GUARDRAIL (MANDATORY)

> ⛔ **ALL `/research` workflows produce EVIDENCE-BACKED RESEARCH ARTIFACTS ONLY. NO APPLICATION CODE.**
>
> - ❌ NEVER modify application source code or auto-transition to `/code`, `/cook`, `/fix` without explicit user approval.
> - ✅ Write deliverables (`RESEARCH-{topic}.md`, `SCOUT-{topic}.md`, `MAILBOX-{date}.md`) to `<appDataDir>\brain\<conversation-id>\` (Brain Artifacts First; fallback `./reports/{topic}/`) in the user's input language (technical terms in English) and **STOP**.

---

## 🧭 ROUTING LOGIC

```
1. IF user explicitly specifies a variant:
   - `/research:fast` → Load `commands/research-fast.md`
   - `/research:hard` → Load `commands/research-hard.md`
   - `/research:team` → Load `commands/research-team.md`

2. IF no variant is specified (`/research <topic>`) OR triggered via Natural-Language Deep Research ("nghiên cứu", "tìm hiểu sâu", "phân tích chuyên sâu", "đánh giá", "research", "deep dive", "analyze", "investigate"):
   - Check active `workflows.naturalLanguageResearchTrigger` / `workflows.defaultVariant` setting:
     * `auto_team` / `team` (DEFAULT) → Route IMMEDIATELY to `/research:team` (`commands/research-team.md` — Golden Triangle 3-Vector Parallel Deep-Research)
     * `auto_hard` / `hard` → Route IMMEDIATELY to `/research:hard` (`commands/research-hard.md` — 3-Wave Multi-Hop + Parallel Scouter)
     * `fast` → Route to `/research:fast` (`commands/research-fast.md` — Fast 2-Wave Documentation Lookup)
     * `ask_first` / `ask` → Present the selection menu below
```

---

## 📋 AVAILABLE ROUTES

| Route | Workflow File | Architecture & Best Use Case |
|-------|---------------|------------------------------|
| **`/research:fast`** | `commands/research-fast.md` | **Fast 2-Wave Documentation & API Research**: Single `researcher` (`TypeName: "self"`) executing **4-Source Triangulation** + **2-Wave Search (`≥ 4–6` queries)** → `RESEARCH-{topic}.md` |
| **`/research:hard`** | `commands/research-hard.md` | **Deep 3-Wave Parallel Research & Codebase Scouting**: Turn-1 parallel fan-out of `researcher` (**3-Wave Multi-Hop `8–12+` queries** + **Dual-Track 5-Lens**) + `scouter` (`TypeName: "self"`) → `RESEARCH-{topic}.md` + `SCOUT-{topic}.md` |
| **`/research:team`** | `commands/research-team.md` | **Default (`auto_team`) — Golden Triangle 3-Vector Deep-Research**: Turn-1 parallel fan-out of `research-team` (`techlead` Vector 1 Specs/RFCs + `executor` Vector 2 SDK/Codebase/Skills + `reviewer` Vector 3 Benchmarks/Failure Modes) + Adversarial Cross-Examination via `send_message` → `RESEARCH-{topic}.md` |

---

## 💬 PRESENT OPTIONS (Only when `ask_first` / `ask` is active)

```markdown
## 🔬 Research Mode Selection

**Topic**: [parsed topic]

**Choose research depth:**
1. 🔺 **Team (Recommended Default)** → `/research:team` — Golden Triangle 3-Vector Parallel Deep-Research + Adversarial Fact-Checking
2. ⚡⚡⚡ **Hard** → `/research:hard` — 3-Wave Multi-Hop Deep Research + Parallel Codebase Scouter (`8–12+` queries)
3. ⚡ **Fast** → `/research:fast` — Fast 2-Wave Official Documentation & API Lookup (`4–6` queries)

⏳ Awaiting selection...
```
