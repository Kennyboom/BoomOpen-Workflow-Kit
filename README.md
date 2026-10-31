<div align="center">
  <h1>🚀 BoomOpen Workflow Kit v5.2.0</h1>
  <p><strong>Smart-Hybrid Multi-Agent Orchestration & Elite Workflow Framework for AI Coding Assistants</strong></p>
  
  [![Version: 5.2.0](https://img.shields.io/badge/Version-5.2.0-purple.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit v5.2?
**BoomOpen Workflow Kit v5.2 (Antigravity 2.0 Smart-Hybrid Edition)** is an open-source AI workforce operating system that transforms a single AI coding assistant into a coordinated team of **21 specialist agents** with **48 Core Skills** and **1,467+ Niche Library Skills**. Built for **Google Antigravity 2.0 (Gemini)**, **Cursor**, **Claude Code**, **GitHub Copilot**, and **OpenAI Codex**.

### ⚡ What's New in v5.2.0 (Smart-Hybrid Edition)
1. **🧠 Quality-First Model Policy (`Model: "inherit"` / Pro High Default)**:
   - All 21 specialist agents across engineering, architecture, planning, scouting, debugging, testing, reviewing, security, design, and documentation **MUST inherit the user's selected model (`Model: "inherit"` / Pro High)** so reasoning and code quality never drop.
   - Latest `flash` (Flash High) is permitted *only* for trivial mechanical chores (raw log aggregation, simple formatting). `flash_lite` is strictly forbidden.
2. **⚡ DAG-Aware Parallel Fan-Out Execution**:
   - Independent phases (`/cook:hard`, `/plan:hard`, `/fix:hard`, `/review:hard`, `/ask:hard`) launch concurrently in a **single turn** via multiple `invoke_subagent` calls (e.g., `researcher` + `scouter`, or 4-way parallel `tech-lead` + `reviewer` + `security-engineer` + `performance-engineer` in `/review:hard`), while dependent phases (`Plan` → `Implement` → `Test`) remain strictly gated.
3. **🗂️ Pre-Compiled `matrix-skills/compact-index.json` & Fast Incremental Sync**:
   - Pre-compiled O(1) JSON lookup across 1,430+ matrix skills eliminates parsing 1,693-line YAML files.
   - Incremental `skills_library` sync + `fs.writeFileSync` optimization reduces repeat installations to seconds.
4. **🩺 Built-In CLI Diagnostics (`doctor` & `check`)**:
   - `npm run doctor` (`node cli/install.js doctor`): Verifies Antigravity installation health, `≤ 300` line limits, zero UTF-8 mojibake, and compact skill index integrity.
   - `npm run check` (`node cli/install.js check [dir]`): Deterministically audits source code against **Professional Coding Standards** (≤ 300 lines/file, no `any`, no leftover `console.log`).
5. **🚦 2-Mode Smart Complexity Threshold Gate & Clean Git Tree**:
   - **Mode A (Direct, TIER 0)**: Simple tasks touching **≤ 3 files** (no `/cmd`) execute directly with 0 sub-agent overhead.
   - **Mode B (Orchestrated, TIER 1)**: Complex tasks (`> 3 files`, `≥ 2 domains`, or `/cmd`) delegate to isolated sub-agents and route transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\`.

### 💻 Supported AI Tools
| Tool | Support Level | Global Entrypoint | Framework Path |
|------|--------------|-------------------|----------------|
| **Antigravity (Gemini)** | ✅ Full Native v5.2 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
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

### BoomOpen Workflow Kit v5.2 là gì?
**BoomOpen Workflow Kit v5.2 (Smart-Hybrid Edition)** là hệ điều hành đa tác tử (Multi-Agent) mã nguồn mở dành cho AI coding assistant, kết hợp **21 Đặc vụ Chuyên gia**, **48 Core Skills**, và **1.467+ Niche Skills (`skills_library`)** với chỉ mục nén `compact-index.json` siêu tốc.

### ⚡ Đột phá trong phiên bản v5.2.0
1. **🧠 Chính Sách Model Ưu Tiên Chất Lượng Tuyệt Đối (`Model: "inherit"` / Pro High Default)**:
   - Toàn bộ 21 Đặc vụ Chuyên gia trong các tác vụ lập trình, kiến trúc, lập kế hoạch, khảo sát codebase (`scouter`), gỡ lỗi (`debugger`), kiểm thử (`tester`), và thẩm định (`reviewer`) **BẮT BUỘC kế thừa model người dùng đang chọn (`Model: "inherit"` / Pro High)** để đảm bảo chất lượng suy luận và code cao nhất.
   - Chỉ cho phép dùng `flash` (Flash High mới nhất) cho các công việc vặt thuần cơ học (gom log thô, format danh sách đơn giản). Tuyệt đối cấm `flash_lite`.
2. **⚡ Thực Thi Song Song Theo Đồ Thị Phụ Thuộc (DAG Parallel Fan-Out)**:
   - Các pha độc lập không phụ thuộc lẫn nhau (như `researcher` + `scouter` trong `/cook:hard`, `/plan:hard`, `/fix:hard`, hoặc 4 chuyên gia `tech-lead` + `reviewer` + `security-engineer` + `performance-engineer` trong `/review:hard`) được gọi **song song trong cùng 1 lượt (single turn)** qua `invoke_subagent` và tự động gom kết quả qua **Reactive Async Wakeup**.
3. **🗂️ Chỉ Mục Kỹ Năng Nén (`compact-index.json`) & Cài Đặt Incremental Siêu Tốc**:
   - Tự động biên dịch `matrix-skills/compact-index.json` giúp tra cứu hơn 1.430+ kỹ năng trong vài mili-giây mà không cần đọc các file YAML dài hàng nghìn dòng.
   - Cơ chế đồng bộ thông minh (`incremental sync`) giúp cài đặt lại chỉ mất vài giây.
4. **🩺 Công Cụ Chẩn Đoán & Kiểm Định Tự Động (`doctor` & `check`)**:
   - `npm run doctor`: Kiểm tra sức khỏe hệ thống cài đặt Antigravity, giới hạn `≤ 300 dòng/file`, không lỗi font UTF-8 (mojibake).
   - `npm run check [dir]`: Quét mã nguồn tự động theo **Professional Coding Standards** (phát hiện file > 300 dòng, kiểu `any`, hoặc `console.log` thừa).
5. **🚦 Cổng Phân Luồng 2 Chế Độ (Mode A Direct vs. Mode B Orchestrated) & Clean Git Tree**:
   - **Mode A (TIER 0)**: Tác vụ nhỏ (**≤ 3 files**, không gọi `/cmd`) thực thi trực tiếp ngay lập tức.
   - **Mode B (TIER 1)**: Tác vụ lớn (`> 3 files`, `≥ 2 domains`, hoặc có `/cmd`) ủy quyền sub-agent và lưu tài liệu trung gian vào `<appDataDir>\brain\<conversation-id>\` giúp giữ sạch Git working tree 100%.

### 🚀 Các Tập Lệnh Chính
- `/cook:fast`, `/cook:hard`, `/cook:team` — Phát triển tính năng (hỗ trợ DAG Parallel Fan-Out & Golden Triangle).
- `/plan:fast`, `/plan:hard`, `/plan:team` — Lập kế hoạch chi tiết (Given/When/Then, ≥5 Edge Cases, ma trận rủi ro).
- `/fix:fast`, `/fix:hard`, `/fix:team` & `/debug:hard` — Điều tra nguyên nhân gốc rễ song song và sửa lỗi dứt điểm.
- `/review:fast`, `/review:hard`, `/review:team` — Kiểm định 4 chiều song song (Architecture, Code, Security, Performance).
- `/docs:core`, `/docs:business`, `/docs:audit` — Sinh bộ tài liệu kiến trúc và nghiệp vụ vào `./documents/`.
- `/save` & `/recap` — Lưu trữ và khôi phục trí nhớ phiên làm việc (`SESSION-HANDOVER.md` & `.brain/`).

<div align="center">
  <b>BoomOpen Workflow Kit v5.2.0</b> — <i>Pro-High Quality. DAG Parallel Speed.</i>
</div>
