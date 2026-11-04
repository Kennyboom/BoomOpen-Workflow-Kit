---
name: intelligent-routing
description: Automatic agent selection and intelligent task routing. Analyzes user requests and routes them through the v5.5 Proactive Sub-agent First Gate, DAG Parallel Fan-Out, Direct Plan Dispatch, and Warm Sub-agent Reuse.
version: "5.5"
---

# 🧭 Intelligent Agent Routing (v5.5 — Smart-Hybrid Edition)

**Purpose**: Automatically classify incoming requests through the **Proactive Sub-agent First Gate (Mode B & Turn-1 Zero-Tax Fan-Out vs. Mode A)** and route tasks to the right canonical specialist agent(s) from `agents/*.md` with **Quality-First Model Policy (`Model: "inherit"`)**, **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, and **Warm Sub-agent Reuse (`send_message`)**.

---

## 1. Proactive Sub-agent First Gate (Evaluate First!)

```mermaid
flowchart TD
    A["Incoming User Request"] --> B{"Known <= 2 files & 1 domain & 0 exploration & no /cmd?"}
    B -- "YES (Known-Target Micro-Edit <= 2 files)" --> C["⚡ MODE A: Known-Target Micro-Direct (TIER 0)"]
    C --> D["Primary Agent executes & verifies directly (0 subagent latency)"]
    B -- "NO (Unscoped exploration, > 2 files, >= 2 domains, NL research, or /cmd)" --> E["🎻 PROACTIVE SUB-AGENT FIRST / MODE B (TIER 1)"]
    E --> F["Turn-1 Parallel Fan-Out (TypeName: self | research, Model: inherit) + Warm Reuse"]
```

### 🚫 Anti-Solo-Crawling & Fast Parallel Sub-agents (Turn-1 Zero-Tax Fan-Out)
- If target files are **NOT already known on Turn 1**, OR if a task requires exploring/auditing/reading **`> 2 files`**, **NEVER crawl files sequentially in the primary agent!** Spawn parallel sub-agents immediately on Turn 1:
  - **Read-Only Local Codebase Scouting/Grep**: `invoke_subagent(TypeName: "research", Role: "Codebase Scouter", Model: "inherit", Prompt: ...)`
  - **Parallel Code Edits, Testing, Debugging, or Web Research (`search_web`)**: `invoke_subagent(TypeName: "self", Role: "<Specialist>", Model: "inherit", Prompt: ...)`

### 🎻 MODE B — Strict Multi-Agent Orchestration (`TIER 1` Deep Path)
- **When ANY is true**:
  1. User explicitly invokes a BoomOpen command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **`> 2 files`** or **`≥ 2 domains`** (e.g., DB + Backend + Frontend + Security).
  3. Task requires architectural design, cross-module debugging, or Golden Triangle review (`:hard` / `:team`).
  4. **Natural-Language Deep Research / Ideation / Architecture Discovery** (`naturalLanguageResearchTrigger = "auto_team"` routes to `/brainstorm:team` Golden Triangle by default, or `/brainstorm:hard` when `"auto_hard"`).
- **Action**: Activate **Strict Orchestrator Mode** and delegate to canonical specialists using `Model: "inherit"` (Pro High default; NEVER `flash_lite`).

### ⚡ MODE A — Known-Target Micro-Direct (`TIER 0` Fast Path)
- **When**: Strictly for simple Q&A, code explanations, or micro-edits where the **exact `≤ 2 known files`** are already identified on Turn 1, 1 domain, 0 exploration needed, and no `/cmd` was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly**, enforcing **Pragmatic 2-Tier Coding Standards** and **Persistent Testing & Bug Fixing**.

---

## 2. Canonical Agent Selection Matrix (21 Specialist Agents — `Model: "inherit"`)

| User Intent | Keywords | Selected Canonical Agent(s) | Dispatch Mode |
|-------------|----------|-----------------------------|---------------|
| **Authentication / Authz** | "login", "auth", "jwt", "oauth", "rbac" | `security-engineer` + `backend-engineer` | Mode B (≥ 2 domains) |
| **UI Component / Styling** | "button", "card", "layout", "tailwind", "react" | `frontend-engineer` | Mode A (≤ 2 known files) or Mode B |
| **UI/UX Design Spec** | "wireframe", "design system", "ux", "mockup" | `designer` | Mode B (`DESIGN-{feature}.md`) |
| **Mobile App** | "react native", "flutter", "ios", "android", "expo" | `mobile-engineer` | Mode A (≤ 2 known files) or Mode B |
| **API / Server Logic** | "endpoint", "route", "controller", "service", "rest" | `backend-engineer` | Mode A (≤ 2 known files) or Mode B |
| **Database / Schema** | "schema", "migration", "query", "index", "prisma", "sql" | `database-architect` | Mode A (≤ 2 known files) or Mode B |
| **Root-Cause Debugging** | "error", "bug", "crash", "race condition", "5 whys" | `debugger` | Mode A (≤ 2 known files) or Mode B |
| **Testing / QA** | "test", "coverage", "unit", "e2e", "playwright" | `tester` | Mode A (≤ 2 known files) or Mode B |
| **Code / Arch Review** | "review", "PR", "audit", "quality" | `reviewer` (+ `tech-lead`, `security-engineer`, `performance-engineer` in `:hard`) | Mode B (Parallel Fan-Out) |
| **CI/CD & Deployment** | "deploy", "docker", "kubernetes", "github actions" | `devops-engineer` | Mode A (≤ 2 known files) or Mode B |
| **Security Audit** | "vulnerability", "owasp", "xss", "csrf", "pentest" | `security-engineer` | Mode B |
| **Performance Tuning** | "slow", "profil", "latency", "memory leak", "bundle" | `performance-engineer` | Mode B |
| **Business Requirements** | "prd", "user story", "acceptance criteria", "kpi" | `business-analyst` | Mode B |
| **Project Coordination** | "roadmap", "milestone", "risk register", "timeline" | `project-manager` | Mode B |
| **Documentation Suite** | "readme", "architecture docs", "/docs:core" | `docs-manager` | Mode B |
| **Codebase Discovery** | "scout", "explore", "map architecture", "locate" | `scouter` (`TypeName: "research"`) | Mode B (Parallel with `researcher`) |
| **External Research** | "research", "compare libraries", "best practices" | `researcher` (`TypeName: "self"`) | Mode B (Parallel with `scouter`) |
| **Ideation / Discovery** | "brainstorm", "options", "trade-offs", "nghiên cứu" | `brainstormer` (`/brainstorm:team` via `auto_team`) | Mode B (Golden Triangle / `ask_question`) |
| **Game Development** | "unity", "unreal", "godot", "phaser", "ecs" | `game-engineer` | Mode A (≤ 2 known files) or Mode B |
| **Status / Analytics Report**| "status report", "executive summary", "metrics" | `reporter` | Mode B |
| **Full Feature / App** | "build feature", "end-to-end", "new module" | `scouter` + `researcher` → `planner` → Direct Engineer Dispatch | Mode B (Full DAG) |

---

## 3. Intelligent Work Distribution Rules (Mode B)

1. **DAG Parallel Fan-Out**: Launch independent phases concurrently in a single turn (`researcher` + `scouter`; 4-way `/review:hard`; `backend-engineer` + `frontend-engineer` when `SHARED_CONTRACT` and disjoint `OWNED_FILES` are locked).
2. **Direct Plan-to-Executor Dispatch**: Once `PLAN-{feature}.md` exists in `:fast`, `:hard`, or `/orchestrate`, dispatch tasks **directly** from `PLAN` to domain engineers without a middleman `tech-lead` hop. Reserve `tech-lead` for Architecture Review and `:team` Golden Triangle arbitration.
3. **Warm Sub-agent Session Reuse (`send_message`)**: Record each spawned sub-agent's `conversationId` in the **Active Sub-agent Session Registry**. Reuse warm sessions via `send_message(Recipient: conversationId)` for follow-up tasks, review/test fixes, and debate rounds (0s cold-start, 100% context retained).
