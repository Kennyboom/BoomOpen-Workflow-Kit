<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Hệ Điều Hành Nhân Sự AI Đa Nền Tảng & Khung Điều Phối Đa Tác Tử Thông Minh (Smart-Hybrid)</strong></p>

  [![Version: 5.5.0](https://img.shields.io/badge/Version-5.5.0-7c3aed.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases)
  [![Platforms: 5 Unified](https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg)](#)
  [![Agents: 21 Specialists + 17 Teams](https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg)](#)
  [![Skills: 48 Core + 1,430+ Library](https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C430%2B%20Library-f59e0b.svg)](#)
  [![Node.js: >=18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg)](https://nodejs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

  <p>
    [🇬🇧 English](../README.md) • **🇻🇳 Tiếng Việt** • [🇨🇳 简体中文](./README.zh-CN.md) • [🇹🇼 繁體中文](./README.zh-TW.md) • [🇯🇵 日本語](./README.ja.md) • [🇰🇷 한국어](./README.ko.md) • [🇪🇸 Español](./README.es.md) • [🇫🇷 Français](./README.fr.md) • [🇩🇪 Deutsch](./README.de.md)<br/>
    [🇧🇷 Português](./README.pt-BR.md) • [🇷🇺 Русский](./README.ru.md) • [🇮🇳 हिन्दी](./README.hi.md) • [🇸🇦 العربية](./README.ar.md) • [🇮🇩 Bahasa Indonesia](./README.id.md) • [🇹🇭 ไทย](./README.th.md) • [🇹🇷 Türkçe](./README.tr.md) • [🇮🇹 Italiano](./README.it.md)
  </p>
</div>

---

## 🌟 BoomOpen Workflow Kit v5.5 là gì?

**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** là hệ điều hành đa tác tử (Multi-Agent) mã nguồn mở giúp biến một AI Coding Assistant đơn lẻ thành một tổ chức kỹ thuật hoàn chỉnh gồm **21 Đặc vụ Chuyên gia (Specialist Agents)**, **17 Đội hình Tam Giác Vàng (Golden Triangle Teams)**, **48 Kỹ năng Lõi (Core Skills)** và **1.430+ Kỹ năng Chuyên sâu (`skills_library`)**.

Khác với các bộ prompt đơn lẻ hoặc các wrapper nặng nề luôn gây độ trễ khởi động cho mọi câu hỏi nhỏ, BoomOpen v5.5 giới thiệu **Cổng Phân Loại Độ Phức Tập Thông Minh 2 Chế Độ (2-Mode Smart Complexity Threshold Gate)**:
- **⚡ Mode A — Thực Thi Trực Tiếp (0 giây Cold-Start)**: Các câu hỏi Q&A, giải thích code, hoặc sửa lỗi/thay đổi cục bộ (`≤ 3 files`, 1 domain, không gọi lệnh `/cmd`) được Agent chính thực thi và kiểm thử **trực tiếp**, tuân thủ nghiêm ngặt **Chuẩn Code Thực Dụng 2 Tầng (Pragmatic 2-Tier Coding Standards)** và **Kiểm Thử & Sửa Lỗi Bền Bỉ (Persistent Testing & Bug Fixing)**.
- **🎻 Mode B — Điều Phối Đa Tác Tử Nghiêm Ngặt (Strict Multi-Agent Orchestration)**: Các tính năng phức tạp (`> 3 files` hoặc `≥ 2 domains`) hoặc khi gọi lệnh `/cmd` tường minh sẽ kích hoạt chế độ điều phối đa tác tử với **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Khóa Hợp Đồng & Quyền Ghi File (`SHARED_CONTRACT` + `OWNED_FILES`)**, và **Tái Sử Dụng Sub-agent Nóng (`send_message`)**.

---

## 🏗️ Kiến Trúc Smart-Hybrid (v5.5)

```mermaid
flowchart TD
    User["👤 Yêu Cầu Người Dùng / Lệnh Slash"] --> Gate{"🚦 Cổng Độ Phức Tập 2 Chế Độ"}
    Gate -->|"≤ 3 files, 1 domain, không /cmd"| ModeA["⚡ Mode A: Thực Thi Trực Tiếp (Tier 0)<br/>0s Cold-Start + Chuẩn Code 2 Tầng"]
    Gate -->|"> 3 files, ≥ 2 domains, hoặc /cmd"| ModeB["🎻 Mode B: Điều Phối Đa Tác Tử (Tier 1)<br/>Model: inherit (Mặc định Pro High)"]

    ModeB --> FanOut["🔀 Pha 1: DAG Parallel Fan-Out<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 Pha 2: Lập Kế Hoạch Theo Hợp Đồng (planner)<br/>Khóa SHARED_CONTRACT + OWNED_FILES"]
    Plan --> Dispatch{"🎯 Biến Thể Thực Thi"}

    Dispatch -->|":fast / :hard"| Direct["⚡ Giao Việc Trực Tiếp Từ Plan<br/>(backend-engineer + frontend-engineer song song)"]
    Dispatch -->|":team"| Triangle["🔺 Đội Hình Tam Giác Vàng Đối Kháng<br/>(TechLead ⇄ Executor ⇄ Reviewer qua MAILBOX)"]

    Direct --> Verify["🧪 Pha 4: Kiểm Định & Tái Sử Dụng Phiên Nóng<br/>tester + reviewer (send_message 0s warm loop)"]
    Triangle --> Verify
```

---

## 🧠 6 Trụ Cột Cốt Lõi Của v5.5

1. **🌐 Đồng Bộ Toàn Diện 5 Nền Tảng (`platforms/*`)**:
   - Hỗ trợ cài đặt gốc (native) đồng nhất 100% cho **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor**, và **GitHub Copilot** từ một kiến trúc duy nhất.
2. **📏 Chuẩn Code Thực Dụng 2 Tầng (Pragmatic 2-Tier Coding Standards — Chống Cắt Vụn File)**:
   - **Tầng 1 — Bắt Buộc Tuyệt Đối (Zero Tolerance)**: Single Responsibility (1 trách nhiệm/file hoặc hàm), **CẤM `any` tường minh**, **CẤM để sót `console.log` tạm** trong ứng dụng production, bắt buộc `try/catch` + typed error ở biên async/API, hằng số `SCREAMING_SNAKE_CASE`, DRY (`≥ 3`), và sắp xếp imports sạch sẽ.
   - **Tầng 2 — Ngưỡng Cấu Trúc Linh Hoạt (Ưu Tiên Tính Mạch Lạc)**: File gắn kết hướng tới `~200–350 dòng` với trần mềm `~400–450 dòng` (chỉ bắt buộc tách khi `>500 dòng` hoặc ôm nhiều domain; miễn trừ cho Test, Schema/Types, CLI, Docs). Hàm logic `~20–40 dòng` (`~40–80 dòng` cho UI/Handlers).
3. **🎯 Giao Việc Trực Tiếp Từ Plan & Tái Sử Dụng Sub-agent Nóng (`send_message`)**:
   - Khi đã có `PLAN-{feature}.md`, Orchestrator giao việc **trực tiếp** cho các kỹ sư chuyên môn (`backend-engineer`, `frontend-engineer`, `database-architect`,...) mà không qua bước trung gian `tech-lead` dư thừa.
   - Các sub-agent đang hoạt động được lưu trong **Danh Bạ Phiên Nóng (`Role → conversationId`)** và tái sử dụng qua `send_message` với **độ trễ khởi động = 0 giây** và **giữ nguyên 100% ngữ cảnh file**.
4. **🤝 Giao Việc Song Song Theo Hợp Đồng (`SHARED_CONTRACT` + `OWNED_FILES`)**:
   - Bản kế hoạch đa domain khóa trước API endpoints, DTO schemas và phân tách quyền sở hữu file (`OWNED_FILES` vs. `READ_ONLY_FILES`) trước khi khởi chạy song song các kỹ sư, loại bỏ hoàn toàn xung đột ghi đè file.
5. **🔍 Truy Nguyên Nhân Gốc Rễ 5-Whys (SPIE v3.0) & Giữ Sạch Git Tree 100%**:
   - `debugger` phân tích tối thiểu 3 giả thuyết và chuỗi nhân quả **5-Whys** (`Why 1 Triệu chứng` → `Why 5 Nguyên nhân hệ thống`). Các tài liệu trung gian (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) được ưu tiên lưu vào `<appDataDir>\brain\<conversation-id>\` để giữ sạch cây Git.
6. **🩺 Chẩn Đoán CLI Tích Hợp (`doctor` & `check`) & Chỉ Mục Kỹ Năng O(1)**:
   - `npm run doctor` kiểm tra toàn bộ 5 nền tảng, 21 agents, 51 file đội hình, 72 lệnh và `matrix-skills/compact-index.json` (`1.430+` kỹ năng). `npm run check <dir>` kiểm định tự động chuẩn code Tầng 1 & Tầng 2.

---

## 💻 Các Nền Tảng AI Được Hỗ Trợ

| Nền Tảng | Mức Hỗ Trợ | Entrypoint Toàn Cục | Đường Dẫn Cài Đặt Framework |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ Native v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Native v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Native v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Native v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Native v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 Cài Đặt Nhanh & Kiểm Định

```bash
# 1. Clone kho mã nguồn
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. Cài đặt cho trợ lý lập trình AI của bạn (chọn 1 hoặc --all)
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # All 5 platforms

# 3. Kiểm tra sức khỏe cài đặt, chuẩn code 2 tầng & bộ test tự động
npm run doctor
npm run check ./cli
npm test
```

---

## 🎯 Bảng Tham Chiếu Lệnh Slash

| Lệnh | Biến Thể | Mục Đích Chính |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | Phát triển tính năng trọn vẹn (Research/Scout → Plan → Code song song → Test → Review) |
| **`/code`** | `:fast`, `:hard`, `:team` | Thực thi lập trình trực tiếp từ bản kế hoạch `PLAN-{feature}.md` đã có |
| **`/plan`** | `:fast`, `:hard`, `:team` | Thiết lập bản vẽ kỹ thuật với `SHARED_CONTRACT`, `OWNED_FILES` & tiêu chí Given/When/Then |
| **`/fix`** | `:fast`, `:hard`, `:team` | Sửa lỗi tận gốc kèm kiểm thử hồi quy bắt buộc |
| **`/debug`** | `:fast`, `:hard`, `:team` | Điều tra nguyên nhân gốc rễ theo 3 giả thuyết + chuỗi nhân quả **5-Whys (SPIE v3.0)** (`DEBUG-{issue}.md`) |
| **`/test`** | `:fast`, `:hard`, `:team` | Chạy DAG Parallel Fan-Out bộ test hiện có + rà soát edge-case chưa phủ (`tester` + `scouter`) |
| **`/review`** | `:fast`, `:hard`, `:team` | Kiểm định 4 chiều song song (Kiến trúc, Chất lượng Code, Bảo mật OWASP, Hiệu năng) |
| **`/design`** | `:fast`, `:hard`, `:team` | Thiết kế kiến trúc hệ thống, lược đồ CSDL và đặc tả UI/UX (`DESIGN.md`) |
| **`/docs`** | `:core`, `:business`, `:audit` | Khởi tạo và đồng bộ tài liệu kiến trúc & nghiệp vụ chuẩn 2 tầng (`./documents/`) |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | Kiểm tra điều kiện triển khai, môi trường preview, rollout production & rollback an toàn |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | Khám phá yêu cầu theo phương pháp Socratic, phân tích đánh đổi & ý tưởng |
| **`/report`** | `:fast`, `:hard`, `:team` | Tổng hợp báo cáo kỹ thuật và điều hành kèm số liệu & sơ đồ |
| **`/orchestrate`** | — | Điều phối đường ống đa tác tử tùy chỉnh xuyên suốt nhiều miền (domains) |
| **`/save` / `/recap`** | — | Lưu trạng thái phiên (`SESSION-HANDOVER.md`) và khôi phục ngữ cảnh trong `< 5 giây` |

---

## 🤖 21 Đặc Vụ Chuyên Gia & 17 Đội Hình Tam Giác Vàng

| Nhóm Chuyên Môn | Đặc Vụ Chuyên Gia (`agents/*.md`) | Đội Hình Tam Giác Vàng (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **Kỹ Thuật & Thực Thi** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **Kiến Trúc & Hoạch Định** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **Chất Lượng, Bảo Mật & Gỡ Lỗi** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **Nghiên Cứu & Tri Thức** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📂 Cấu Trúc Kho Mã Nguồn

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 Đặc vụ Chuyên gia + 17 Đội hình Tam Giác Vàng (51 file vai trò)
├── cli/                     # Trình cài đặt (install.js), Doctor (doctor.js), Code Checker 2 tầng (checker.js) & Tests
├── commands/                # 72 quy trình lệnh Slash (:fast, :hard, :team) + giao thức _ref/
├── documents/               # Tài liệu Kiến trúc, Domain, Source-Base & Chuẩn Code 2 tầng
├── i18n/                    # Tài liệu đa ngôn ngữ (16 bản dịch đầy đủ cho các ngôn ngữ phổ biến)
├── matrix-skills/           # Ma trận kỹ năng YAML theo miền + chỉ mục nén compact-index.json (1.430+ kỹ năng)
├── platforms/               # Bản mẫu hợp nhất cho 5 nền tảng (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # Quy tắc Mode B nạp theo yêu cầu (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Các script Python tự động hóa & kiểm định (checklist.py, verify_all.py,...)
├── skills/                  # 48 Kỹ năng Lõi (clean-code, debugger, plan-writing, frontend-design,...)
├── skills_library/          # 1.430+ kỹ năng chuyên sâu nạp theo yêu cầu qua tra cứu 2 bước
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 Giấy Phép & Bảo Mật

- **Giấy phép**: Phân phối theo [Giấy phép MIT](../LICENSE). Bản quyền © 2026 **Kennyboom (BoomOpen)**.
- **Chính sách Bảo mật**: Xem chi tiết tại [SECURITY.md](../SECURITY.md) về các rào chắn bảo mật tích hợp và quy trình báo cáo lỗ hổng.
