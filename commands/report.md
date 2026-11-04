---
description: 📝 Report Router — Multi-purpose reporting (create report, update docs, or generate from template)
version: "5.5"
category: documentation
execution-mode: router
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /report — Reporting Router

> **ROUTER DIRECTIVE**: Analyze reporting needs and route to appropriate reporting workflow.
>
> **MULTI-PURPOSE**: Report supports any topic and three output modes — create new report, update existing files, or generate from user template/format.

<task>$ARGUMENTS</task>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## 🎯 INTENT DETECTION (BEFORE ROUTING — MANDATORY)

> ⛔ **ALL report workflows produce REPORT FILES ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code
> - ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` after completing report
> - ✅ Output deliverable report files and STOP. Wait for user's explicit next command.
> - ✅ Reports MUST be written in the same language the user communicates with you.

---

## OUTPUT MODES (infer from user request)

Reporter **infers** the mode from what the user asks for — no fixed phrase list. Choose by **intent**:

| Mode | User intent | Reporter action |
|------|-------------|-----------------|
| **Create report** | User wants a **new** deliverable (report, summary, analysis, documentation). | Scout/synthesize → write **new** file under `<appDataDir>\brain\<conversation-id>\REPORT-{topic}-{date}.md` (or `./reports/{topic}/` / path user specifies). |
| **Update existing** | User wants **changes reflected in existing** files (docs, README, specs, etc.). | Scout → identify related files → **edit** those files. Do not create a new report unless also asked. |
| **From template** | User provides a **format, template, or structure** to follow. | Use that format/structure → generate file(s) matching it (e.g. after scouting source). |

**Topic-agnostic**: Subject is whatever the user asks for — infer from the request; not limited to status or technical only.

---

## ROUTING LOGIC

```
IF task is simple status update OR summary:
  → Route to /report:fast

IF task is comprehensive analysis OR deep dive OR any non-trivial topic (infer from request):
  → Route to /report:hard

IF user explicitly asks to UPDATE existing files (not create report):
  → Use /report:hard or /report:team; reporter OUTPUT MODE = update existing files

IF task is complex AND maximum quality with team collaboration needed:
  → Route to /report:team

IF unsure:
  → Default to /report:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `/report:fast`  | Quick status updates, daily summaries                                       |
| `/report:hard`  | Detailed analysis, any topic (algorithms, docs, changes), template-based  |
| `/report:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 📝 Reporting Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. ⚡ **Fast** → `/report:fast` — Quick summary
2. ⚡⚡⚡ **Hard** → `/report:hard` — Full analysis, any topic; create report **or** update existing files / use template
3. 👥 **Team** → `/report:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
