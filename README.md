<div align="center">
  <h1>🚀 BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Multi-Platform Unified & Smart-Hybrid Multi-Agent Orchestration Framework for AI Coding Assistants</strong></p>
  
  [![Version: 5.5.0](https://img.shields.io/badge/Version-5.5.0-purple.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit v5.5?
**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** is an open-source AI workforce operating system that transforms a single AI coding assistant into a coordinated team of **21 specialist agents** with **48 Core Skills** and **1,467+ Niche Library Skills**. Built for 100% unified parity across **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor**, and **GitHub Copilot**.

### ⚡ What's New in v5.5.0 (Multi-Platform Unified Edition)
1. **🌐 Unified 5-Platform Architecture (`platforms/{antigravity,claude,codex,copilot,cursor}/`)**:
   - Standardized all 5 platform templates under `platforms/<tool>/` and upgraded every root entrypoint (`GEMINI.md`, `CLAUDE.md`, `CODEX.md`, `COPILOT.md`, `CURSOR.md`, `AGENT.md`) to 100% `v5.5` Smart-Hybrid parity — including embedded **Pragmatic 2-Tier Coding Standards**, **Persistent Testing & Bug Fixing**, **2-Mode Complexity Gate**, and flat `commands/{cmd}-{variant}.md` routing.
2. **📏 Pragmatic 2-Tier Coding Standards (Anti-Fragmentation & Strict Safety)**:
   - **Tier 1 — Strict Quality & Safety (Zero Tolerance)**: Zero `any`, named constants for magic numbers, structured logger (no debug `console.log`), `try/catch` + typed errors on async/API boundaries, clean sorted imports.
   - **Tier 2 — Flexible Structural Guidelines (Cohesion Over Mechanical Line Cutting)**: Target `~200–350` lines/file with a `~400–450` line soft ceiling for cohesive modules (`>500` lines hard split; tests/types exempt) and `~25–40` lines/function (`≤ 60` for linear UI/switch/config).
3. **🔍 Unified 5-Whys (SPIE v3.0) Debugging & Synchronized Core Skills**:
   - Upgraded `agents/debugger.md`, `skills/debugger/SKILL.md`, `/debug:hard`, and `/debug:fast` with the **5-Whys (SPIE v3.0)** causal framework.
4. **🎯 Direct Plan-to-Executor Dispatch & Stateful Warm Sub-agent Reuse (`send_message`)**:
   - Once `PLAN-{feature}.md` exists, the Orchestrator dispatches tasks directly to domain engineers (`backend-engineer`, `frontend-engineer`, etc.) and reuses warm sub-agent sessions via `send_message(Recipient: conversationId)` with **0s cold-start latency** and **100% preserved file context**.
5. **🩺 Multi-Platform CLI Diagnostics (`doctor` & `check`)**:
   - `node cli/install.js doctor` verifies all 5 platform asset bundles (`platforms/*`), 21 agents, 51 team files (`agents/teams/**/*.md`), 72 commands, and `compact-index.json`; `node cli/install.js check [dir]` enforces Tier 1 (`any` / `console.log`) and Tier 2 (`400` soft warning / `500` hard ceiling).

### 💻 Supported AI Platforms (`platforms/*`)
| Platform | Support Level | Global Entrypoint | Framework Path |
|----------|--------------|-------------------|----------------|
| **Antigravity (Gemini)** | ✅ Full Native v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Full Native v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Full Native v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Full Native v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Full Native v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

### ⚙️ Installation & Verification

```bash
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Install for a specific platform (antigravity | claude | codex | cursor | copilot) or --all
node cli/install.js install antigravity
node cli/install.js install claude
node cli/install.js install codex
node cli/install.js install cursor
node cli/install.js install copilot

# Run health diagnostics & Pragmatic 2-Tier code standards check
node cli/install.js doctor
node cli/install.js check ./src
```

---

## 🇻🇳 Hướng Dẫn Sử Dụng (Tiếng Việt)

### BoomOpen Workflow Kit v5.5 là gì?
**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** là hệ điều hành đa tác tử (Multi-Agent) mã nguồn mở dành cho AI coding assistant, đồng bộ 100% sức mạnh trên cả **5 nền tảng (Antigravity, Claude Code, Codex, Cursor, Copilot)** với **21 Đặc vụ Chuyên gia**, **48 Core Skills**, **1.467+ Niche Skills (`skills_library`)**, Chuẩn Code Thực Dụng 2 Tầng, khóa quyền sở hữu file (`OWNED_FILES`), và tái sử dụng phiên Sub-agent nóng (`send_message`).

### ⚡ Đột phá trong phiên bản v5.5.0
1. **🌐 Đồng Bộ Toàn Diện 5 Nền Tảng (`platforms/{antigravity,claude,codex,copilot,cursor}/`)**:
   - Chuẩn hóa toàn bộ thư mục cấu hình nền tảng về `platforms/<tool>/` và nâng cấp đồng bộ cả 6 file entrypoint gốc (`GEMINI.md`, `CLAUDE.md`, `CODEX.md`, `COPILOT.md`, `CURSOR.md`, `AGENT.md`) lên chuẩn **v5.5 Smart-Hybrid** (tích hợp sẵn Pragmatic 2-Tier Coding Standards, Persistent Testing & Bug Fixing, 2-Mode Gate, và đường dẫn lệnh phẳng `commands/{cmd}-{variant}.md`).
2. **📏 Chuẩn Code Thực Dụng 2 Tầng (Pragmatic 2-Tier Coding Standards)**:
   - **Tầng 1 — Bắt Buộc Tuyệt Đối (Strict Quality & Safety)**: Cấm `any`, cấm magic numbers, dùng logger chuẩn (không để sót `console.log` rác), bắt buộc `try/catch` + typed error cho mọi lời gọi async/API.
   - **Tầng 2 — Linh Hoạt Theo Ngữ Cảnh (Cohesion Over Mechanical Line Cutting)**: Mục tiêu `~200–350` dòng/file, trần mềm `~400–450` dòng cho module gắn kết chặt, chỉ bắt buộc tách khi `>500` dòng hoặc ôm `≥ 2` trách nhiệm độc lập (miễn trừ file test/type).
3. **🎯 Điều Phối Trực Tiếp Từ Plan & Tái Sử Dụng Sub-agent Nóng (`send_message`)**:
   - Giao việc trực tiếp từ `PLAN` tới kỹ sư chuyên môn (`Model: "inherit"`) và tái sử dụng phiên sub-agent nóng qua `send_message(Recipient: conversationId)` giúp **độ trễ khởi động = 0 giây** và **giữ nguyên 100% ngữ cảnh**.
4. **🩺 Công Cụ Chẩn Đoán Đa Nền Tảng (`doctor` & `check`)**:
   - Kiểm tra toàn diện 5 nền tảng `platforms/*`, 21 agents, 51 team files (`agents/teams/*/*.md`), 72 commands và kiểm định chuẩn code 2 tầng (`npm run doctor` & `npm run check`).

### 🚀 Các Tập Lệnh Chính
- `/cook:fast`, `/cook:hard`, `/cook:team` — Phát triển tính năng (DAG Parallel Fan-Out, Contract-First & Golden Triangle).
- `/plan:fast`, `/plan:hard`, `/plan:team` — Lập kế hoạch chi tiết (`SHARED_CONTRACT`, `OWNED_FILES`, Given/When/Then).
- `/fix:fast`, `/fix:hard`, `/fix:team` & `/debug:hard` — Điều tra nguyên nhân gốc rễ 5-Whys (SPIE v3.0) và sửa lỗi dứt điểm.
- `/review:fast`, `/review:hard`, `/review:team` — Kiểm định 4 chiều song song (Architecture, Code, Security, Performance).
- `/docs:core`, `/docs:business`, `/docs:audit` & `/save`, `/recap` — Tài liệu kiến trúc và quản lý trí nhớ phiên làm việc.

<div align="center">
  <b>BoomOpen Workflow Kit v5.5.0</b> — <i>5 Platforms Unified. Pragmatic Standards. Warm Sub-Agent Speed.</i>
</div>
