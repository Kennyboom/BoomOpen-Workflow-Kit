<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Çok Platformlu Akıllı-Hibrit (Smart-Hybrid) Yapay Zeka İş Gücü İşletim Sistemi ve Çoklu Ajan Orkestrasyon Çerçevesi</strong></p>

  [![Version: 5.5.0](https://img.shields.io/badge/Version-5.5.0-7c3aed.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases)
  [![Platforms: 5 Unified](https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg)](#)
  [![Agents: 21 Specialists + 17 Teams](https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg)](#)
  [![Skills: 48 Core + 1,430+ Library](https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C430%2B%20Library-f59e0b.svg)](#)
  [![Node.js: >=18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg)](https://nodejs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

  <p>
    [🇬🇧 English](../README.md) • [🇻🇳 Tiếng Việt](./README.vi.md) • [🇨🇳 简体中文](./README.zh-CN.md) • [🇹🇼 繁體中文](./README.zh-TW.md) • [🇯🇵 日本語](./README.ja.md) • [🇰🇷 한국어](./README.ko.md) • [🇪🇸 Español](./README.es.md) • [🇫🇷 Français](./README.fr.md) • [🇩🇪 Deutsch](./README.de.md)<br/>
    [🇧🇷 Português](./README.pt-BR.md) • [🇷🇺 Русский](./README.ru.md) • [🇮🇳 हिन्दी](./README.hi.md) • [🇸🇦 العربية](./README.ar.md) • [🇮🇩 Bahasa Indonesia](./README.id.md) • [🇹🇭 ไทย](./README.th.md) • **🇹🇷 Türkçe** • [🇮🇹 Italiano](./README.it.md)
  </p>
</div>

---

## 🌟 BoomOpen Workflow Kit v5.5 Nedir?

**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)**, tek bir yapay zeka kodlama asistanını **21 uzman ajan (Specialist Agents)**, **17 çapraz denetimli Altın Üçgen ekibi (Golden Triangle Teams)**, **48 temel yetenek (Core Skills)** ve **1.430’dan fazla niş kütüphane yeteneğinden (`skills_library`)** oluşan koordine bir mühendislik organizasyonuna dönüştüren açık kaynaklı bir çoklu ajan işletim sistemidir.

Her basit soruda soğuk başlatma gecikmesine yol açan hantal ajan sarmalayıcılarının aksine, BoomOpen v5.5 **2 Modlu Akıllı Karmaşıklık Eşik Kapısını (2-Mode Smart Complexity Threshold Gate)** sunar:
- **⚡ Mod A — Doğrudan Yürütme (0 sn Soğuk Başlatma)**: Basit soru-cevaplar (Q&A), kod açıklamaları, tek alanlı hata düzeltmeleri veya **≤ 3 dosyaya** dokunan net değişiklikler (`/cmd` komutu olmadan), **Pragmatik 2 Katmanlı Kodlama Standartları** ve **Kalıcı Test ve Hata Düzeltme** kuralları uygulanarak ana ajan tarafından **doğrudan** yürütülür, test edilir ve doğrulanır.
- **🎻 Mod B — Katı Çoklu Ajan Orkestrasyonu**: Karmaşık özellikler (**> 3 dosya** veya **≥ 2 alan**) ya da açık `/cmd` iş akışı komutları; **DAG Paralel Dağıtım (Parallel Fan-Out)**, **Plandan Uygulayıcıya Doğrudan Görevlendirme**, **Sözleşme Öncelikli Dosya Kilitleri (`SHARED_CONTRACT` + `OWNED_FILES`)** ve **Sıcak Alt Ajan Yeniden Kullanımı (`send_message`)** özelliklerine sahip katı Orkestratör modunu etkinleştirir.

---

## 🏗️ Akıllı-Hibrit Mimari (v5.5)

```mermaid
flowchart TD
    User["👤 Kullanıcı İsteği / Slash Komutu"] --> Gate{"🚦 2 Modlu Akıllı Karmaşıklık Kapısı"}
    Gate -->|"≤ 3 dosya, 1 alan, /cmd yok"| ModeA["⚡ Mod A: Doğrudan Yürütme (Tier 0)<br/>0sn Başlatma + Pragmatik 2 Katmanlı Standartlar"]
    Gate -->|"> 3 dosya, ≥ 2 alan, veya /cmd"| ModeB["🎻 Mod B: Çoklu Ajan Orkestratörü (Tier 1)<br/>Model: inherit (Varsayılan Pro High)"]

    ModeB --> FanOut["🔀 Faz 1: DAG Paralel Dağıtım<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 Faz 2: Sözleşme Öncelikli Planlama (planner)<br/>SHARED_CONTRACT + OWNED_FILES Kilitler"]
    Plan --> Dispatch{"🎯 Yürütme Varyantı"}

    Dispatch -->|":fast / :hard"| Direct["⚡ Plandan Mühendise Doğrudan Paralel Görevlendirme<br/>(backend-engineer + frontend-engineer)"]
    Dispatch -->|":team"| Triangle["🔺 Altın Üçgen Çapraz Denetim Ekibi<br/>(TechLead ⇄ Executor ⇄ Reviewer via MAILBOX)"]

    Direct --> Verify["🧪 Faz 4: Doğrulama ve Sıcak Oturum Yeniden Kullanımı<br/>tester + reviewer (send_message 0sn döngü)"]
    Triangle --> Verify
```

---

## 🧠 v5.5 Sürümünün 6 Temel Sütunu

1. **🌐 5 Platformda Tam Birleşik Uyum (`platforms/*`)**:
   - Tek bir birleşik mimariden **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor** ve **GitHub Copilot** için birinci sınıf yerel (native) kurulum.
2. **📏 Pragmatik 2 Katmanlı Kodlama Standartları (Parçalanmayı Önleme)**:
   - **Katman 1 — Katı Kalite ve Güvenlik Kuralları (Sıfır Tolerans)**: Tek Sorumluluk İlkesi (Single Responsibility), **açık `any` kullanımına KESİNLİKLE İZİN VERİLMEZ**, **üretim kodunda unutulmuş debug `console.log` yasaktır**, async/API sınırlarında `try/catch` + tipli hata yönetimi zorunludur, sabitler `SCREAMING_SNAKE_CASE` olmalıdır, DRY (`≥ 3`) ve temiz sıralanmış importlar.
   - **Katman 2 — Esnek Yapısal Yönergeler (Mekanik Satır Bölme Yerine Bütünlük)**: Bütünlüklü dosyalar `~200–350 satır` hedefler ve `~400–450 satır` esnek üst sınıra sahiptir (yalnızca `>500 satırı` aşan veya birden fazla alanı karıştıran dosyalar bölünür; test, tip, CLI ve dokümanlar muaftır). Mantık fonksiyonları `~20–40 satır` (UI/Handler `~40–80 satır`).
3. **🎯 Plandan Uygulayıcıya Doğrudan Görevlendirme ve Sıcak Alt Ajan Yeniden Kullanımı (`send_message`)**:
   - `PLAN-{feature}.md` oluşturulduktan sonra Orkestratör, gereksiz bir `tech-lead` ara adımına ihtiyaç duymadan görevleri **doğrudan** alan mühendislerine (`backend-engineer`, `frontend-engineer`, `database-architect` vb.) iletir.
   - Aktif alt ajanlar **Aktif Oturum Kayıt Defterine (`Role → conversationId`)** kaydedilir ve `send_message` aracılığıyla **0 sn soğuk başlatma** ve **%100 korunan dosya bağlamıyla** yeniden kullanılır.
4. **🤝 Sözleşme Öncelikli Paralel Görevlendirme (`SHARED_CONTRACT` + `OWNED_FILES`)**:
   - Çok alanlı planlar, paralel mühendisleri başlatmadan önce API uç noktalarını, DTO şemalarını ve özel dosya yazma sahipliğini (`OWNED_FILES` ve `READ_ONLY_FILES`) kilitleyerek yazma çakışmalarını tamamen ortadan kaldırır.
5. **🔍 5-Whys (SPIE v3.0) Kök Neden Hata Ayıklama ve %100 Temiz Git Ağacı**:
   - `debugger`, her hatayı en az 3 derecelendirilmiş hipotez ve **5-Whys nedensellik zinciri** (`Neden 1 Belirti` → `Neden 5 Sistemik Kök Neden`) üzerinden izler. Geçici çıktılar (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) öncelikle `<appDataDir>\brain\<conversation-id>\` dizinine yazılarak Git çalışma ağacı %100 temiz tutulur.
6. **🩺 Yerleşik CLI Tanılama (`doctor` & `check`) ve O(1) Yetenek İndeksi**:
   - `npm run doctor` tüm 5 platform paketini, 21 ajanı, 51 ekip dosyasını, 72 komutu ve `matrix-skills/compact-index.json` (`1.430+` yetenek) dosyasını doğrular. `npm run check <dir>` Katman 1 ve Katman 2 standartlarını otomatik olarak denetler.

---

## 💻 Desteklenen Yapay Zeka Platformları

| Platform | Destek Düzeyi | Küresel Giriş Noktası | Framework Kurulum Yolu |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ Yerel v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Yerel v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Yerel v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Yerel v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Yerel v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 Hızlı Başlangıç ve Kurulum

```bash
# 1. Depoyu klonlayın
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. Yapay zeka kodlama asistanınız için kurun (birini seçin veya --all)
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # All 5 platforms

# 3. Kurulum sağlığını, 2 katmanlı kod standartlarını ve test paketini doğrulayın
npm run doctor
npm run check ./cli
npm test
```

---

## 🎛️ Unified Settings & Mode Selection (`/settings` Control Center)

Switch execution modes (`auto` | `mode_a` | `mode_b` | `team`), 4 one-click presets (`smart-hybrid`, `solo-fast`, `deep-architect`, `adversarial-team`), and 12 system settings across all 5 platforms in `< 10ms` with **0ms Turn-1 latency**:

```bash
# 1. In-Chat Slash Command (Interactive UI Widget or One-Liner)
/settings                                     # Open interactive ask_question menu
/settings preset smart-hybrid                 # Default Recommended (Auto Mode A/B + auto_team)
/settings preset solo-fast                    # Force Mode A Direct Fast Execution
/settings preset deep-architect               # Force Mode B Multi-Agent Orchestrator
/settings preset adversarial-team             # Force Golden Triangle 3-Agent (:team)
/settings mode auto | mode_a | mode_b | team  # Override execution.mode directly

# 2. Local Web Control Center Dashboard (http://127.0.0.1:4567)
npm run settings:ui

# 3. Terminal CLI (Global ~/.boomopen/settings.json & Project ./.boomopen.json)
npm run settings -- status
npm run settings -- preset adversarial-team
npm run settings -- reset
```

---

## 🎯 Slash Komutları Başvuru Tablosu

| Komut | Varyantlar | Temel Amaç |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | Uçtan uca özellik geliştirme (Araştırma/Keşif → Plan → Paralel Kod → Test → İnceleme) |
| **`/code`** | `:fast`, `:hard`, `:team` | Mevcut bir `PLAN-{feature}.md` üzerinden doğrudan kodlama ve doğrulama yürütme |
| **`/plan`** | `:fast`, `:hard`, `:team` | `SHARED_CONTRACT`, `OWNED_FILES` ve Given/When/Then kriterleriyle uygulama planları oluşturma |
| **`/fix`** | `:fast`, `:hard`, `:team` | Zorunlu regresyon testi doğrulamasıyla kök neden hata çözümü |
| **`/debug`** | `:fast`, `:hard`, `:team` | 3 Hipotez + **5-Whys (SPIE v3.0)** nedensellik zinciriyle kök neden araştırması (`DEBUG-{issue}.md`) |
| **`/test`** | `:fast`, `:hard`, `:team` | DAG Paralel Fan-Out test yürütme + kapsanmayan uç durumların keşfi (`tester` + `scouter`) |
| **`/review`** | `:fast`, `:hard`, `:team` | 4 yönlü paralel kod denetimi (Mimari, Kod Kalitesi, OWASP Güvenliği, Performans) |
| **`/design`** | `:fast`, `:hard`, `:team` | Sistem mimarisi, veritabanı şeması ve UI/UX teknik şartnamesi (`DESIGN.md`) |
| **`/docs`** | `:core`, `:business`, `:audit` | 2 katmanlı yapılandırılmış mimari ve iş dokümantasyonu oluşturma veya senkronize etme (`./documents/`) |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | Dağıtım öncesi hazırlık kapıları, önizleme ortamları, canlıya alma ve güvenli geri alma (rollback) |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | Sokratik gereksinim keşfi, ödünleşim (trade-off) analizi ve fikir geliştirme |
| **`/report`** | `:fast`, `:hard`, `:team` | Metrikler ve diyagramlar içeren yönetici ve teknik sentez raporları |
| **`/orchestrate`** | — | Birden fazla alanda özel çoklu ajan iş hattı orkestrasyonu |
| **`/save` / `/recap`** | — | Oturum durumunu (`SESSION-HANDOVER.md`) kaydetme ve `< 5 sn` içinde tüm bağlamı geri yükleme |

---

## 🤖 21 Uzman Ajan ve 17 Altın Üçgen Ekibi

| Kategori | Uzman Ajanlar (`agents/*.md`) | Altın Üçgen Ekipleri (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **Mühendislik ve Uygulama** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **Mimari ve Planlama** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **Kalite, Güvenlik ve Hata Ayıklama** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **Araştırma ve Bilgi Yönetimi** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📂 Depo Yapısı

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 Uzman Ajan tanımı + 17 Altın Üçgen Ekibi (51 rol dosyası)
├── cli/                     # Kurucu (install.js), Sağlık Doktoru (doctor.js), 2 Katmanlı Kod Denetleyici (checker.js) ve Testler
├── commands/                # 72 Slash komutu iş akışı (:fast, :hard, :team) + _ref/ protokolleri
├── documents/               # 2 katmanlı Mimari, Alan, Kaynak Kod ve Kodlama Standartları dokümantasyonu
├── i18n/                    # Çok dilli dokümantasyon (16 dilde eksiksiz README çevirisi)
├── matrix-skills/           # Alan bazlı YAML yetenek matrisleri + önceden derlenmiş compact-index.json (1.430+ yetenek)
├── platforms/               # 5 platform için birleşik şablonlar (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # İsteğe bağlı yüklenen Mod B kuralları (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Python otomasyon ve doğrulama betikleri (checklist.py, verify_all.py vb.)
├── skills/                  # 48 Temel Yetenek (clean-code, debugger, plan-writing, frontend-design vb.)
├── skills_library/          # 2 adımlı hızlı arama ile isteğe bağlı yüklenen 1.430+ niş yetenek kütüphanesi
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 Lisans ve Güvenlik

- **Lisans**: [MIT Lisansı](../LICENSE) altında dağıtılmaktadır. Telif Hakkı © 2026 **Kennyboom (BoomOpen)**.
- **Güvenlik Politikası**: Yerleşik güvenlik korumaları ve güvenlik açığı bildirim yönergeleri için [SECURITY.md](../SECURITY.md) dosyasına bakın.
