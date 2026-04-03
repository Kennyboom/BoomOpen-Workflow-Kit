<div align="center">
  <h1>🚀 BoomOpen Workflow Kit</h1>
  <p><strong>Multi-agent orchestration and elite workflow framework for AI coding assistants</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit?
**BoomOpen Workflow Kit** is an advanced, open-source AI workforce operating system designed to transform a single AI coding assistant into a highly coordinated team of specialist agents. Combining the hardcore **38 Boom Elite Core Skills** with the vast **1400+ Matrix Skill Library (HSOL)**, it provides structural rigor to AI tools like Cursor, Claude Code, Copilot, and Gemini.

### 🌟 Key Features
- **Write Less, Architect More**: Enforces production-grade coding standards via built-in logic engines (SPIE v3 Debugger, Master Planner v4.0).
- **Environment Agnostic Setup**: Install once to your global directory (`~/.cursor/`, `~/.gemini/`) and it applies to all your projects seamlessly.
- **Smart Router Architecture**: Built-in routing via commands like `/code`, `/plan`, `/debug` which automatically delegate tasks to the right AI agents based on complexity variants (`:fast`, `:hard`, `:team`).
- **Strict Quality Gates**: Over 5 phases of requirement gathering, brainstorming, planning, and TDD-based execution are strictly enforced to prevent AI hallucinations and context slipping.

### 💎 Why BoomOpen is Elite (The "VIP" Difference)
Unlike standard AI assistant setups that act as a "jack of all trades," BoomOpen enforces enterprise-grade discipline on your AI tools. Here is what makes the kit vastly superior to default interactions:
- **Zero-Hallucination Socratic Gates**: Before writing a single line of code, the AI must pass a mandatory "Socratic Gate" to confirm edge-cases, trade-offs, and true intent, stopping garbage output before it starts.
- **The "No-Code-In-Plan" Rule (4-Phase Architecture)**: BoomOpen strictly silences the AI from throwing random code chunks. Instead, it forces a linear pipeline: Analysis → Planning → Architectural Solutioning → Implementation.
- **Context Budget Protection**: AI models lose IQ after long conversations. BoomOpen possesses an internal context manager that audits file memory limits and forces session-preservation, ensuring the AI stays razor-sharp indefinitely.
- **The SPIE v3 Debugger (5-Whys Mechanism)**: When errors occur, BoomOpen prevents the AI from wildly guessing patches. It enforces the "5-Whys" root-cause methodology to surgically eliminate the core flaw.
- **Supercharged by HSOL**: Injecting domain-expert knowledge with **1400+ specific skills**, effectively cloning Senior Engineers constraint models (e.g., Apple HIG for UI, strict SOLID principles for specific frameworks).

### 🧠 Deep Memory Architecture (.brain)
Unlike standard AI sessions that experience amnesia once you close the editor, BoomOpen Workflow Kit creates a localized nervous system for your project inside the `.brain/` directory:
- **Persistent Knowledge Items (KI)**: The kit enforces a `knowledge/` folder structure containing curated design decisions and system architecture. The AI proactively reads these before starting any task to keep code aligned with existing patterns.
- **Cross-Session Memory Integration**: Using commands like `/save`, the AI automatically extracts the current session's key findings into a disk-based memory bank. When you return tomorrow, simply run `/recap` to perfectly resurrect the AI's prior context. 
- **Context Swap Mechanism**: During incredibly long conversations, BoomOpen forces a graceful downgrade by generating a `handover.md` file, flushing its RAM, and starting clean without losing project trajectory.

### 💻 Supported AI Tools
| Tool | Support Level | Installation Path |
|------|--------------|-------------------|
| **Cursor** | ✅ Full | `~/.cursor/` |
| **Antigravity (Gemini)** | ✅ Full | `~/.gemini/` |
| **Claude Code** | ✅ Full | `~/.claude/` |
| **GitHub Copilot** | ✅ Full | `~/.copilot/` |
| **Codex** | ✅ Full | `~/.codex/` |

---

### ⚙️ Installation

**1. Using npx (Global Package)**
```bash
npx @boomopen/workflow-kit install cursor       # Setup for Cursor
npx @boomopen/workflow-kit install antigravity  # Setup for Gemini
npx @boomopen/workflow-kit install --all        # Setup for all supported tools
```

**2. From Source (Local Repository)**
```bash
# Clone the repository
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Install into your tool
node cli/install.js install cursor
node cli/install.js install --all
```

---

### 🚀 Quick Start
Once installed, simply open your AI chat interface (e.g., Cursor Chat) and type one of the router commands. Each command supports different variants based on the complexity of the task:

- **`:fast`** — For quick tweaks, single-file edits, or simple features. (e.g., `/code:fast`)
- **`:hard`** — For complex, multi-file features requiring deep thinking, systematic debugging, or structural changes. (e.g., `/plan:hard`)
- **`:team`** — For massive epics requiring a multi-agent orchestrated approach. (e.g., `/orchestrate:team`)

**Examples:**
- `/code:fast "add dark mode"` — Execute a simple feature.
- `/plan:hard "build payment module"` — Trigger the Master Planner v4 to build an architectural blueprint.
- `/debug:hard "auth failed in production"` — Trigger the SPIE (Systematic Problem Investigation Engine) to find the root cause.
- `/test:hard "login components"` — Run the Test Engineer v3.0 logic for RED-GREEN-REFACTOR.
- `/orchestrate "build new fullstack SaaS"` — Spawn a multi-agent team to collaborate.

---

### 🗑️ Uninstall
```bash
npx @boomopen/workflow-kit uninstall cursor
# OR locally:
node cli/install.js uninstall cursor
```

<br/>

---

<br/>

## 🇻🇳 Hướng Dẫn Sử Dụng (Tiếng Việt)

### BoomOpen Workflow Kit là gì?
**BoomOpen Workflow Kit** là một hệ điều hành mã nguồn mở dành cho AI coding assistant. Khung làm việc này giúp biến một AI thông thường thành một đội ngũ gồm nhiều Đặc vụ (Agents) chuyên biệt. Với bộ lõi thiện chiến gồm **38 Boom Elite Core Skills** kết hợp cùng thư viện khổng lồ **1400+ Matrix Skills (HSOL)**, hệ thống áp đặt tư duy phát triển phần mềm và tiêu chuẩn code cực kỳ nghiêm ngặt cho các công cụ như Cursor, Claude Code, hay Copilot.

### 🌟 Tính năng nổi bật
- **Kiến trúc Router Thông minh**: Giao tiếp thông qua các tập lệnh tinh gọn như `/code`, `/plan`, `/debug` đi kèm các cấp độ (`:fast`, `:hard`, `:team`) giúp AI tự biết cách chia nhỏ công việc.
- **Tiêu chuẩn Production-Grade**: Áp đặt các Engine độc quyền như *SPIE v3 Debugger* (phân tích lỗi 5-Whys) hay *Master Planner v4.0* (lên kế hoạch chống bỏ sót code).
- **Cài đặt 1 lần cho mọi dự án**: Cấu hình sẽ tự động tiêm thẳng vào thư mục toàn cục (Global) của trình soạn thảo, dùng được cho 100% các dự án của bạn.

### 💎 Tại sao BoomOpen là đỉnh cao? (Điểm khác biệt VIP)
Khác với việc dùng AI (như ChatGPT, Claude hay Github Copilot) theo kiểu "hỏi gì đáp nấy" dẫn đến code rác và thiếu tính hệ thống, BoomOpen áp đặt một **"kỷ luật thiết kế cấp độ Doanh nghiệp"** lên AI của bạn. Đây là lý do tại sao bộ framework này đánh bại các source công cộng khác:
- **Chặn đứng Ảo giác (Socratic Gates)**: Trước khi gõ bất kỳ dòng code nào, tác vụ phức tạp bắt buộc AI phải thực hiện thao tác "Cổng Socratic" để hỏi lại sếp các rủi ro và góc độ thiết kế hẹp (Edge Cases). Triệt tiêu việc AI "cầm đèn chạy trước ô tô".
- **Kỷ luật Trí Thép "Kế hoạch không thả Code"**: BoomOpen khóa mỏm AI không cho phép nhả code ngay lập tức. Mọi tính năng lớn đều phải đi qua chốt chặn 4 bước: *Phân tích → Lập Plan → Giải pháp Kiến trúc → Thực thi*. Nó ép AI tư duy theo chuẩn 1 Giám Đốc Kỹ Thuật (CTO) và 1 Senior Engineer thay vì 1 Intern Code.
- **Bảo toàn Bộ não vô hạn (Context Budget)**: Các AI thường bị "ngu đi" hoặc "rút ngắn trí nhớ" sau 40-50 tin nhắn do tràn RAM / Context Window. BoomOpen có cơ chế tự động quét bộ nhớ và đóng gói kiến thức sang file `handover.md` để giải phóng bộ nhớ tạm, giúp AI luôn thông minh ở mức cao cấp nhất trọn đời dự án dự án.
- **Vũ khí Debug SPIE v3.0 (Kỹ thuật điều tra 5-Whys)**: Lỗi log đầy đỏ lòm terminal? Thay vì nhắm mắt sửa bừa thêm bug mới, BoomOpen áp đặt quy trình của Kỹ sư Kiểm thử Động cơ bằng cách hỏi "tại sao" đủ 5 bước sâu xuống cấu trúc hạ tầng để đào tận gốc nguyên nhân cỗi rễ.
- **Sức mạnh từ Kho tàng Bí kíp (1400+ HSOL)**: Không chỉ là một khung làm việc suông, hệ thống này được đút thụt hàng tá quy chuẩn chuẩn quốc tế. Cần làm app iOS? BoomOpen lập tức nạp luật Apple Core HIG. Cần build API chuẩn? Nó móc luật thiết kế SOLID RESTful ra kìm cương AI. Code sinh ra là để Deploy, không phải để vứt đi.

### 🧠 Kiến trúc Trí nhớ Sâu (.brain)
Khác với các phiên Chat AI thông thường cứ tắt trình duyệt là "mất trí nhớ", BoomOpen Workflow Kit cấy thẳng một hệ thần kinh nhân tạo vào dự án của bạn thông qua lõi `.brain/`:
- **Knowledge Items (Kho Bí kíp Dự án)**: Hệ thống duy trì một vùng nhớ `knowledge/` đóng vai trò là "Sách Thánh" lưu trữ các quyết định thiết kế và luồng Logic quan trọng. Mỗi khi AI làm việc, nó bị hệ thống cưỡng bức phải nạp lại Cẩm nang này đầu tiên để không bao giờ đi chệch quỹ đạo codebase.
- **Lưu trữ Ký ức Xuyên Phiên (Cross-Session Memory)**: Với các dự án kéo dài, bạn có thể chạy lệnh `/save` để AI tự động đóng băng toàn bộ luồng tư duy hiện tại vào ổ cứng. Ngày mai mở lại máy, chỉ việc gõ `/recap` là lập tức "hồi sinh" ngữ cảnh của ngày hôm qua.
- **Cơ chế Context Swap (Tráo Ngữ cảnh)**: Khi đoạn Chat quá dài dẫn đến hiện tượng quên trước quên sau, BoomOpen sẽ chủ động tạo ra giấy chuyển giao công tác `handover.md`, sau đó dọn dẹp sạch sẽ RAM của AI để duy trì IQ ở mức 100% nhưng vẫn bám sát mục tiêu.

### 💻 Các công cụ AI được Hỗ trợ
Hệ thống hiện tại hỗ trợ cài đặt toàn cục và tự động áp dụng các quy tắc cho:
- **Cursor** (`~/.cursor/`)
- **Antigravity - Gemini** (`~/.gemini/`)
- **Claude Code** (`~/.claude/`)
- **GitHub Copilot** (`~/.copilot/`)
- **Codex** (`~/.codex/`)

---

### ⚙️ Cài đặt

**1. Cài đặt trực tiếp qua NPX**
```bash
npx @boomopen/workflow-kit install cursor       # Cài đặt cho Cursor
npx @boomopen/workflow-kit install antigravity  # Cài đặt cho Gemini
npx @boomopen/workflow-kit install --all        # Cài đặt cho toàn bộ tools
```

**2. Cài đặt từ mã nguồn gốc (Source)**
```bash
# Tải mã nguồn về máy
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Chạy lệnh cài đặt thẳng vào môi trường Editor
node cli/install.js install cursor
node cli/install.js install --all
```

---

### 🚀 Khởi động nhanh (Cách sử dụng)
Sau khi cài đặt xong, hãy mở phần Chat của AI (vd: Cursor Chat) và gõ ngay các tập lệnh. Mỗi tập lệnh đi kèm các cấp độ (variants) khác nhau phụ thuộc vào độ khó của tác vụ:

- **`:fast`** — Dành cho các chỉnh sửa nhanh, thêm tính năng nhỏ hoặc sửa lỗi đơn giản trên 1 file. (vd: `/code:fast`)
- **`:hard`** — Dành cho các cụm tính năng nền tảng, hệ thống sửa đa file, đòi hỏi AI phải tư duy kiến trúc và quy trình chặt chẽ. (vd: `/plan:hard`)
- **`:team`** — Dành cho các siêu dự án (Epics) cần kết hợp và ủy quyền cho nhiều Đặc vụ AI chuyên biệt cùng xử lý. (vd: `/orchestrate:team`)

**Mẫu câu lệnh thực tế:**
- `/code:fast "thêm nút dark mode"` — Build tính năng nhanh và gọn.
- `/plan:hard "xây hệ thống thanh toán"` — Kích hoạt Master Planner lên kế hoạch tỉ mỉ trước khi code.
- `/debug:hard "lỗi xác thực đăng nhập"` — Gọi chuyên gia gỡ rối giải quyết tận gốc vấn đề theo phương pháp 5-Whys.
- `/test:hard "login flow"` — Đảm bảo tính năng được test theo tiêu chuẩn TDD v3.0.
- `/orchestrate "xây hẳn hệ thống SaaS"` — Kích hoạt toàn bộ đội ngũ Đặc vụ AI cùng làm việc nhóm.

---

### 🗑️ Gỡ cài đặt
```bash
npx @boomopen/workflow-kit uninstall cursor
# HOẶC từ source code:
node cli/install.js uninstall cursor
```

<br/>
<div align="center">
  <b>BoomOpen Workflow Kit</b> — <i>Code less. Architect more.</i>
</div>
