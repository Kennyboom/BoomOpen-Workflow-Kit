<div align="center">
  <h1>🚀 BoomOpen Workflow Kit v5.3.0</h1>
  <p><strong>Smart-Hybrid Multi-Agent Orchestration & Intelligent Work Distribution Framework for AI Coding Assistants</strong></p>
  
  [![Version: 5.3.0](https://img.shields.io/badge/Version-5.3.0-purple.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit v5.3?
**BoomOpen Workflow Kit v5.3 (Antigravity 2.0 Smart-Hybrid Edition)** is an open-source AI workforce operating system that transforms a single AI coding assistant into a coordinated team of **21 specialist agents** with **48 Core Skills** and **1,467+ Niche Library Skills**. Built for **Google Antigravity 2.0 (Gemini)**, **Cursor**, **Claude Code**, **GitHub Copilot**, and **OpenAI Codex**.

### ⚡ What's New in v5.3.0 (Intelligent Work Distribution Edition)
1. **🎯 Direct Plan-to-Executor Dispatch (No Middleman Double-Hop)**:
   - Once `PLAN-{feature}.md` exists in `:fast`, `:hard`, or `/orchestrate`, the **Orchestrator dispatches tasks directly from `PLAN` to the domain engineers** (`backend-engineer`, `frontend-engineer`, `database-architect`, etc.) without spawning a middleman `tech-lead` router. `tech-lead` is reserved for Architecture Design/Review (`/review:hard`) and `:team` Golden Triangle arbitration.
2. **♻️ Stateful Warm Sub-agent Reuse Registry (`send_message` by `conversationId`)**:
   - The Orchestrator maintains an **Active Sub-agent Session Registry (`Role → conversationId`)**. Follow-up tasks, fix-after-test/review iterations, Golden Triangle debate rounds, and `E0` interrupted sub-agent auto-revivals use `send_message(Recipient: conversationId)` — achieving **0s cold-start latency** and **100% preserved file context**.
3. **🤝 Contract-First Parallel Dispatch & File Ownership Locks (`SHARED_CONTRACT` + `OWNED_FILES`)**:
   - Multi-domain plans (`planner.md`) define a locked **`SHARED_CONTRACT`** (API endpoints, DTOs, error schemas) and explicit **`OWNED_FILES (Write Permitted)`** vs. **`READ_ONLY_FILES (Do Not Edit)`** before launching `backend-engineer` + `frontend-engineer` in parallel, eliminating race conditions and integration mismatches.
4. **🧠 Quality-First Model Policy (`Model: "inherit"` / Pro High Default)**:
   - All 21 specialist agents **MUST inherit the user's selected model (`Model: "inherit"` / Pro High)** so reasoning and code quality never drop. `flash_lite` is strictly forbidden.
5. **🩺 Built-In CLI Diagnostics (`doctor` & `check`) & Compact Skill Index**:
   - `node cli/install.js doctor` & `node cli/install.js check [dir]` verify installation health, `compact-index.json` (1,430+ skills), and **Professional Coding Standards** (≤ 300 lines/file, no `any`).

### 💻 Supported AI Tools
| Tool | Support Level | Global Entrypoint | Framework Path |
|------|--------------|-------------------|----------------|
| **Antigravity (Gemini)** | ✅ Full Native v5.3 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
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

# Run health diagnostics & code standards check
node cli/install.js doctor
node cli/install.js check ./src
```

---

## 🇻🇳 Hướng Dẫn Sử Dụng (Tiếng Việt)

### BoomOpen Workflow Kit v5.3 là gì?
**BoomOpen Workflow Kit v5.3 (Intelligent Work Distribution Edition)** là hệ điều hành đa tác tử (Multi-Agent) mã nguồn mở dành cho AI coding assistant, kết hợp **21 Đặc vụ Chuyên gia**, **48 Core Skills**, và **1.467+ Niche Skills (`skills_library`)** với cơ chế phân phối công việc thông minh, khóa quyền sở hữu file (`OWNED_FILES`), và tái sử dụng phiên Sub-agent nóng (`send_message`).

### ⚡ Đột phá trong phiên bản v5.3.0
1. **🎯 Điều Phối Trực Tiếp Từ Plan Tới Engineer (Direct Plan-to-Executor Dispatch)**:
   - Khi đã có `PLAN-{feature}.md` trong `/cook:hard`, `/code:hard`, `/fix:hard` hoặc `/orchestrate`, Orchestrator giao việc **trực tiếp từ Plan cho các kỹ sư thực thi** (`backend-engineer`, `frontend-engineer`, `database-architect`) mà không tốn thêm 1 bước trung gian gọi `tech-lead`. `tech-lead` được dành riêng cho Thiết kế/Thẩm định Kiến trúc (`/review:hard`) và Trọng tài phân xử trong `:team` (Golden Triangle).
2. **♻️ Sổ Đăng Ký & Tái Sử Dụng Sub-agent Nóng (`send_message` theo `conversationId`)**:
   - Orchestrator lưu `Role → conversationId` của mọi sub-agent đã khởi tạo. Khi cần sửa lỗi sau khi `tester`/`reviewer` kiểm tra, hoặc qua các vòng tranh biện Golden Triangle, hoặc tự động hồi sinh sub-agent bị ngắt (`E0`), hệ thống gọi `send_message(Recipient: conversationId)` giúp **độ trễ khởi động = 0 giây** và **giữ nguyên 100% ngữ cảnh file đã đọc**.
3. **🤝 Giao Việc Song Song Theo Hợp Đồng (`SHARED_CONTRACT`) & Khóa Quyền Ghi File (`OWNED_FILES`)**:
   - `planner` bắt buộc định nghĩa **`SHARED_CONTRACT`** (API endpoint, schema DTO, mã lỗi) và tách biệt rõ **`OWNED_FILES (Được phép sửa)`** vs **`READ_ONLY_FILES (Chỉ đọc)`** trước khi chạy song song `backend-engineer` + `frontend-engineer`, loại bỏ hoàn toàn xung đột ghi đè file.
4. **🧠 Chính Sách Model Ưu Tiên Chất Lượng Tuyệt Đối (`Model: "inherit"` / Pro High Default)**:
   - Toàn bộ 21 Đặc vụ Chuyên gia **BẮT BUỘC kế thừa model Pro High người dùng đang chọn (`Model: "inherit"`)**. Chỉ dùng `flash` cho việc vặt cơ học; tuyệt đối cấm `flash_lite`.
5. **🩺 Công Cụ Chẩn Đoán (`doctor` & `check`) & Clean Git Tree**:
   - Lưu tài liệu trung gian vào `<appDataDir>\brain\<conversation-id>\` giữ sạch Git tree 100%, kèm kiểm định tự động `npm run doctor` & `npm run check`.

### 🚀 Các Tập Lệnh Chính
- `/cook:fast`, `/cook:hard`, `/cook:team` — Phát triển tính năng (DAG Parallel Fan-Out, Contract-First & Golden Triangle).
- `/plan:fast`, `/plan:hard`, `/plan:team` — Lập kế hoạch chi tiết (`SHARED_CONTRACT`, `OWNED_FILES`, Given/When/Then).
- `/fix:fast`, `/fix:hard`, `/fix:team` & `/debug:hard` — Điều tra nguyên nhân gốc rễ song song và sửa lỗi dứt điểm.
- `/review:fast`, `/review:hard`, `/review:team` — Kiểm định 4 chiều song song (Architecture, Code, Security, Performance).
- `/docs:core`, `/docs:business`, `/docs:audit` & `/save`, `/recap` — Tài liệu kiến trúc và quản lý trí nhớ phiên làm việc.

<div align="center">
  <b>BoomOpen Workflow Kit v5.3.0</b> — <i>Pro-High Quality. Intelligent Dispatch. Warm Sub-Agent Speed.</i>
</div>
