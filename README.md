<div align="center">
  <h1>🚀 BoomOpen Workflow Kit v5.4.0</h1>
  <p><strong>Smart-Hybrid Multi-Agent Orchestration, Pragmatic 2-Tier Coding Standards & Intelligent Work Distribution for AI Coding Assistants</strong></p>
  
  [![Version: 5.4.0](https://img.shields.io/badge/Version-5.4.0-purple.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit v5.4?
**BoomOpen Workflow Kit v5.4 (Antigravity 2.0 Smart-Hybrid & Pragmatic Standards Edition)** is an open-source AI workforce operating system that transforms a single AI coding assistant into a coordinated team of **21 specialist agents** with **48 Core Skills** and **1,467+ Niche Library Skills**. Built for **Google Antigravity 2.0 (Gemini)**, **Cursor**, **Claude Code**, **GitHub Copilot**, and **OpenAI Codex**.

### ⚡ What's New in v5.4.0 (Pragmatic 2-Tier Standards & Workflows Optimization)
1. **📏 Pragmatic 2-Tier Coding Standards (Anti-Fragmentation & Strict Safety)**:
   - **Tier 1 — Strict Quality & Safety (Zero Tolerance)**: Zero `any`, named constants for magic numbers, structured logger (no debug `console.log`), `try/catch` + typed errors on async/API boundaries, clean sorted imports.
   - **Tier 2 — Flexible Structural Guidelines (Cohesion Over Mechanical Line Cutting)**: Target `~200–350` lines/file with a `~400–450` line soft ceiling for cohesive modules (`>500` lines hard split; tests/types exempt) and `~25–40` lines/function (`≤ 60` for linear UI/switch/config) — preventing artificial file fragmentation (`Anti-Fragmentation Rule`).
2. **🔍 Unified 5-Whys (SPIE v3.0) Debugging & Synchronized Core Skills**:
   - Upgraded `agents/debugger.md`, `skills/debugger/SKILL.md`, `/debug:hard`, and `/debug:fast` with the **5-Whys (SPIE v3.0)** causal framework, and synchronized `skills/clean-code`, `skills/plan-writing`, `skills/intelligent-routing`, `skills/frontend-design`, and `skills/mobile-developer` to v5.4.
3. **🎯 Direct Plan-to-Executor Dispatch & Stateful Warm Sub-agent Reuse (`send_message`)**:
   - Once `PLAN-{feature}.md` exists, the Orchestrator dispatches tasks directly to domain engineers (`backend-engineer`, `frontend-engineer`, etc.) and reuses warm sub-agent sessions via `send_message(Recipient: conversationId)` with **0s cold-start latency** and **100% preserved file context**.
4. **🤝 Contract-First Parallel Dispatch & Brain Artifact Routing (`<appDataDir>\brain\<conversation-id>\`)**:
   - Multi-domain plans lock `SHARED_CONTRACT` + `OWNED_FILES` before parallel fan-out, and all 21 agents, 51 team files, and 72 command workflows route transient deliverables (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` first to keep the Git tree 100% clean.
5. **🩺 Upgraded CLI Diagnostics (`doctor` & `check`)**:
   - `node cli/install.js doctor` verifies all 21 agents, 51 team files (`agents/teams/**/*.md`), 72 commands, and `compact-index.json`; `node cli/install.js check [dir]` enforces Tier 1 (`any` / `console.log`) and Tier 2 (`400` soft warning / `500` hard ceiling, exempting test/type files).

### 💻 Supported AI Tools
| Tool | Support Level | Global Entrypoint | Framework Path |
|------|--------------|-------------------|----------------|
| **Antigravity (Gemini)** | ✅ Full Native v5.4 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Full | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Full | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Full | `~/.copilot/skills/...` | `~/.copilot/skills/boomopen-workflow-kit/` |
| **Codex** | ✅ Full | `~/.codex/AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |

---

### ⚙️ Installation & Verification

```bash
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Install for Antigravity (Gemini) or all tools
node cli/install.js install antigravity
node cli/install.js install --all

# Run health diagnostics & Pragmatic 2-Tier code standards check
node cli/install.js doctor
node cli/install.js check ./src
```

---

## 🇻🇳 Hướng Dẫn Sử Dụng (Tiếng Việt)

### BoomOpen Workflow Kit v5.4 là gì?
**BoomOpen Workflow Kit v5.4 (Pragmatic 2-Tier Coding Standards & Smart-Hybrid Edition)** là hệ điều hành đa tác tử (Multi-Agent) mã nguồn mở dành cho AI coding assistant, kết hợp **21 Đặc vụ Chuyên gia**, **48 Core Skills**, và **1.467+ Niche Skills (`skills_library`)** với Chuẩn Code Thực Dụng 2 Tầng, khóa quyền sở hữu file (`OWNED_FILES`), và tái sử dụng phiên Sub-agent nóng (`send_message`).

### ⚡ Đột phá trong phiên bản v5.4.0
1. **📏 Chuẩn Code Thực Dụng 2 Tầng (Pragmatic 2-Tier Coding Standards)**:
   - **Tầng 1 — Bắt Buộc Tuyệt Đối (Strict Quality & Safety)**: Cấm `any`, cấm magic numbers, dùng logger chuẩn (không để sót `console.log` rác), bắt buộc `try/catch` + typed error cho mọi lời gọi async/API.
   - **Tầng 2 — Linh Hoạt Theo Ngữ Cảnh (Cohesion Over Mechanical Line Cutting)**: Mục tiêu `~200–350` dòng/file, trần mềm `~400–450` dòng cho module gắn kết chặt, chỉ bắt buộc tách khi `>500` dòng hoặc ôm `≥ 2` trách nhiệm độc lập (miễn trừ file test/type). Hàm mục tiêu `~25–40` dòng (`≤ 60` dòng cho JSX/switch-case tuyến tính) — chống cắt vụn file máy móc (`Anti-Fragmentation Rule`).
2. **🔍 Đồng Bộ Kỹ Năng Lõi (`skills/`) & Điều Tra 5-Whys (SPIE v3.0)**:
   - Đồng bộ `skills/clean-code`, `skills/debugger`, `skills/plan-writing`, `skills/intelligent-routing`, `skills/frontend-design`, `skills/mobile-developer` và `agents/debugger.md` với khung truy nguyên nhân gốc rễ **5-Whys (SPIE v3.0)**.
3. **🎯 Điều Phối Trực Tiếp Từ Plan & Tái Sử Dụng Sub-agent Nóng (`send_message`)**:
   - Giao việc trực tiếp từ `PLAN` tới kỹ sư chuyên môn (`Model: "inherit"`) và tái sử dụng phiên sub-agent nóng qua `send_message(Recipient: conversationId)` giúp **độ trễ khởi động = 0 giây** và **giữ nguyên 100% ngữ cảnh**.
4. **🩺 Công Cụ Chẩn Đoán (`doctor` & `check`) & Clean Git Tree (`<appDataDir>\brain\<conversation-id>\`)**:
   - Kiểm tra toàn diện 21 agents, 51 team files (`agents/teams/*/*.md`, giữ nguyên 100% checklist của 14 `reviewer.md`), 72 commands và kiểm định chuẩn code 2 tầng (`npm run doctor` & `npm run check`).

### 🚀 Các Tập Lệnh Chính
- `/cook:fast`, `/cook:hard`, `/cook:team` — Phát triển tính năng (DAG Parallel Fan-Out, Contract-First & Golden Triangle).
- `/plan:fast`, `/plan:hard`, `/plan:team` — Lập kế hoạch chi tiết (`SHARED_CONTRACT`, `OWNED_FILES`, Given/When/Then).
- `/fix:fast`, `/fix:hard`, `/fix:team` & `/debug:hard` — Điều tra nguyên nhân gốc rễ 5-Whys (SPIE v3.0) và sửa lỗi dứt điểm.
- `/review:fast`, `/review:hard`, `/review:team` — Kiểm định 4 chiều song song (Architecture, Code, Security, Performance).
- `/docs:core`, `/docs:business`, `/docs:audit` & `/save`, `/recap` — Tài liệu kiến trúc và quản lý trí nhớ phiên làm việc.

<div align="center">
  <b>BoomOpen Workflow Kit v5.4.0</b> — <i>Pragmatic Standards. Intelligent Dispatch. Warm Sub-Agent Speed.</i>
</div>
