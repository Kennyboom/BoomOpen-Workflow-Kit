<div align="center">
  <h1>🚀 BoomOpen Workflow Kit v5.1.0</h1>
  <p><strong>Smart-Hybrid Multi-Agent Orchestration & Elite Workflow Framework for AI Coding Assistants</strong></p>
  
  [![Version: 5.1.0](https://img.shields.io/badge/Version-5.1.0-purple.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit v5.1?
**BoomOpen Workflow Kit v5.1 (Antigravity 2.0 Smart-Hybrid Edition)** is an open-source AI workforce operating system that transforms a single AI coding assistant into a coordinated team of **21 specialist agents** with **48 Core Skills** and **1,400+ Niche Library Skills**. Built for **Google Antigravity 2.0 (Gemini)**, **Cursor**, **Claude Code**, **GitHub Copilot**, and **OpenAI Codex**.

### ⚡ What's New in v5.1.0 (Smart-Hybrid Edition)
1. **🚦 2-Mode Smart Complexity Threshold Gate**:
   - **⚡ Mode A — Direct Execution (TIER 0, Default for Simple Tasks)**: Q&A, code explanation, single-domain fixes, or clear edits touching **≤ 3 files** (with no `/cmd` invoked) execute **directly** with **0 sub-agent cold-start latency** and **0 report clutter**, while enforcing **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn).
   - **🎻 Mode B — Strict Multi-Agent Orchestration (TIER 1, Deep Path)**: Activated when an explicit `/cmd` workflow is invoked, or when a task spans **> 3 files**, **≥ 2 domains**, or requires architectural design / `:hard` / `:team` review.
2. **🛠️ Native Antigravity 2.0 Primitives & UI Tools**:
   - Native sub-agent delegation via `define_subagent`, `invoke_subagent`, `send_message` (**Reactive Async Wakeup** — zero polling loops), and `manage_subagents` (plus `runSubagent` cross-platform alias).
   - Interactive UI tools: `ask_question` (multiple-choice widget for `brainstormer` & `planner`) and `generative_ui` (`<agent-embed>` + Mermaid diagrams for `designer` & `reporter`).
3. **🧠 Clean Git Tree via Brain Artifact Routing**:
   - Transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DESIGN`, `DEBUG`, `TEST`, `MAILBOX`, `SESSION-HANDOVER`) default to Antigravity 2.0's native **Brain Artifact Directory** (`<appDataDir>\brain\<conversation-id>\`), rendering directly in the UI Artifact pane while keeping your Git working tree 100% clean.
4. **⚡ Fast 2-Step Progressive Skill Lookup**:
   - Eliminated legacy 6-phase fitness equations. Step 1 checks pre-loaded `<skills>` (`~/.{TOOL}/skills/`); Step 2 queries `skill-seeker` against `~/.{TOOL}/skills_library/` only for niche frameworks.

### 💎 Core Architecture Highlights
- **🔺 Golden Triangle Teams (`:team`)**: Adversarial 3-agent collaboration (`Tech Lead` + `Executor` + `Reviewer / Devil's Advocate`) with append-only `MAILBOX` audit trails and max 3-round convergence loops.
- **📏 Professional Coding Standards**: Hard limits enforced across all code generation: File ≤ 300 lines, Function ≤ 25 lines, Line ≤ 100 chars, Nesting ≤ 3 levels, Params ≤ 4, no `any`, no magic numbers.
- **💾 Infinite Session Memory (`/save` & `/recap`)**: Persist architectural decisions, progress, and gotchas to Brain Artifacts (`SESSION-HANDOVER.md`) and `.brain/` (`brain.json`, `session.json`, `handover.md`).

### 💻 Supported AI Tools
| Tool | Support Level | Global Entrypoint | Framework Path |
|------|--------------|-------------------|----------------|
| **Antigravity (Gemini)** | ✅ Full Native v5.1 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Full | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Full | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Full | `~/.copilot/skills/...` | `~/.copilot/skills/boomopen-workflow-kit/` |
| **Codex** | ✅ Full | `~/.codex/AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |

---

### ⚙️ Installation

**1. Using npx (Global Package)**
```bash
npx @boomopen/workflow-kit install antigravity  # Setup for Antigravity / Gemini
npx @boomopen/workflow-kit install cursor       # Setup for Cursor
npx @boomopen/workflow-kit install --all        # Setup for all supported tools
```

**2. From Source (Local Repository)**
```bash
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

node cli/install.js install antigravity
node cli/install.js install --all
```

---

### 🚀 Quick Start & Command Variants
- **`:fast`** — Rapid multi-step execution with minimal ceremony (e.g., `/cook:fast`, `/fix:fast`).
- **`:hard`** — Full lifecycle with discovery, scout, research, Given/When/Then planning, implementation, and verification (e.g., `/cook:hard`, `/plan:hard`, `/debug:hard`).
- **`:team`** — Golden Triangle 3-agent adversarial collaboration for mission-critical work (e.g., `/cook:team`, `/review:team`, `/plan:team`).

**Examples:**
- `/cook:fast "add dark mode toggle"` — Rapid feature implementation.
- `/plan:hard "build multi-tenant billing module"` — Feature discovery + Given/When/Then specs + edge cases + risk matrix.
- `/cook:team "implement OAuth2 + RBAC"` — Full Golden Triangle team development.
- `/review:team "src/auth/"` — 3-agent adversarial security, performance, and logic code review.
- `/save` & `/recap` — Save and restore session context across conversations.

---

## 🇻🇳 Hướng Dẫn Sử Dụng (Tiếng Việt)

### BoomOpen Workflow Kit v5.1 là gì?
**BoomOpen Workflow Kit v5.1 (Smart-Hybrid Edition)** là hệ điều hành đa tác tử (Multi-Agent) mã nguồn mở dành cho AI coding assistant. Phiên bản **v5.1.0** kết hợp **21 Đặc vụ Chuyên gia (Specialist Agents)**, **48 Core Skills** nạp sẵn, và **1.400+ Niche Skills (`skills_library`)**, được tối ưu hóa đặc biệt cho **Google Antigravity 2.0 (Gemini)**, **Cursor**, **Claude Code**, **GitHub Copilot**, và **Codex**.

### ⚡ Đột phá trong phiên bản v5.1.0 (Smart-Hybrid Edition)
1. **🚦 Cổng Phân Luồng Thông Minh 2 Chế Độ (Mode A vs. Mode B)**:
   - **⚡ Mode A — Thực Thi Trực Tiếp (TIER 0, Mặc định cho tác vụ nhỏ)**: Hỏi đáp, giải thích code, sửa bug đơn lẻ hoặc chỉnh sửa rõ ràng chạm **≤ 3 files** (không gọi `/cmd`) sẽ được AI thực thi và kiểm thử **trực tiếp ngay lập tức** (0 độ trễ khởi tạo sub-agent, 0 tạo file báo cáo rác), nhưng vẫn tuân thủ tuyệt đối **Professional Coding Standards** (≤ 300 dòng/file, ≤ 25 dòng/hàm) và **Persistent Testing & Bug Fixing**.
   - **🎻 Mode B — Điều Phối Đa Đặc Vụ Nghiêm Ngặt (TIER 1, Tác vụ lớn)**: Tự động kích hoạt khi người dùng gõ lệnh `/cmd` (`/cook`, `/plan:hard`, `/review:team`, v.v.) hoặc khi tác vụ chạm **> 3 files**, liên quan **≥ 2 domains** (DB + Backend + Frontend + Security), hoặc cần thiết kế kiến trúc phức tạp.
2. **🛠️ Tích Hợp Công Cụ Bản Địa Antigravity 2.0 (Native Primitives & UI)**:
   - Ủy quyền sub-agent cô lập qua `define_subagent`, `invoke_subagent`, `send_message` (**Reactive Async Wakeup** — tự động đánh thức, không lặp chờ), và `manage_subagents`.
   - Công cụ UI tương tác: `ask_question` (hộp thoại trắc nghiệm trực quan cho `brainstormer` & `planner`) và `generative_ui` (`<agent-embed>` + sơ đồ Mermaid cho `designer` & `reporter`).
3. **🧠 Giữ Sạch Git Working Tree với Brain Artifacts**:
   - Toàn bộ tài liệu trung gian (`PLAN`, `RESEARCH`, `SCOUT`, `DESIGN`, `DEBUG`, `TEST`, `MAILBOX`, `SESSION-HANDOVER`) mặc định được ghi vào **Brain Artifact Directory** (`<appDataDir>\brain\<conversation-id>\`), hiển thị trực tiếp trên thanh Artifact của Antigravity mà không làm bẩn `git status` của dự án.
4. **⚡ Cơ Chế Tra Cứu Kỹ Năng 2 Bước Siêu Tốc**:
   - Loại bỏ công thức tính điểm 6 bước rườm rà cũ. Bước 1 kiểm tra ngay 48 kỹ năng cốt lõi trong `<skills>`; Bước 2 chỉ gọi `skill-seeker` tra cứu kho 1.400+ kỹ năng (`skills_library`) khi gặp công nghệ đặc thù.

### 🚀 Các Tập Lệnh Chính
- `/cook:fast`, `/cook:hard`, `/cook:team` — Phát triển tính năng từ nhanh gọn đến quy trình Tam Giác Vàng (Golden Triangle).
- `/plan:fast`, `/plan:hard`, `/plan:team` — Lập kế hoạch chi tiết (bảng Given/When/Then, ≥5 Edge Cases, ma trận rủi ro, không viết code khi đang lập plan).
- `/fix:fast`, `/fix:hard`, `/fix:team` & `/debug:hard` — Điều tra nguyên nhân gốc rễ và sửa lỗi dứt điểm.
- `/review:fast`, `/review:hard`, `/review:team` — Kiểm định chất lượng code, bảo mật và hiệu năng.
- `/docs:core`, `/docs:business`, `/docs:audit` — Sinh bộ tài liệu kiến trúc và nghiệp vụ chuẩn hóa vào `./documents/`.
- `/save` & `/recap` — Lưu trữ và khôi phục trí nhớ phiên làm việc xuyên suốt dự án.

### 🗑️ Gỡ cài đặt (Uninstall)
```bash
node cli/install.js uninstall antigravity
# Hoặc gỡ toàn bộ:
node cli/install.js uninstall --all
```

<div align="center">
  <b>BoomOpen Workflow Kit v5.1.0</b> — <i>Smart-Hybrid Speed. Multi-Agent Precision.</i>
</div>
