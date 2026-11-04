<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Кроссплатформенная Smart-Hybrid ИИ-ОС для разработки — 21 агент-специалист, 17 команд «Золотого треугольника» и хранилище из 1 430+ навыков по требованию</strong></p>

  <p>
    <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases"><img src="https://img.shields.io/badge/Version-5.5.0-7c3aed.svg" alt="Version: 5.5.0" /></a>
    <a href="#platforms"><img src="https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg" alt="Platforms: 5 Unified" /></a>
    <a href="#agents"><img src="https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg" alt="Agents: 21 Specialists + 17 Teams" /></a>
    <a href="#pillars"><img src="https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C430%2B%20Library-f59e0b.svg" alt="Skills: 48 Core + 1,430+ Library" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg" alt="Node.js: >=18.0.0" /></a>
    <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  </p>

  <p>
    <a href="../README.md">🇬🇧 English</a> • <a href="./README.vi.md">🇻🇳 Tiếng Việt</a> • <a href="./README.zh-CN.md">🇨🇳 简体中文</a> • <a href="./README.zh-TW.md">🇹🇼 繁體中文</a> • <a href="./README.ja.md">🇯🇵 日本語</a> • <a href="./README.ko.md">🇰🇷 한국어</a> • <a href="./README.es.md">🇪🇸 Español</a> • <a href="./README.fr.md">🇫🇷 Français</a> • <a href="./README.de.md">🇩🇪 Deutsch</a><br/>
    <a href="./README.pt-BR.md">🇧🇷 Português</a> • <b>🇷🇺 Русский</b> • <a href="./README.hi.md">🇮🇳 हिन्दी</a> • <a href="./README.ar.md">🇸🇦 العربية</a> • <a href="./README.id.md">🇮🇩 Bahasa Indonesia</a> • <a href="./README.th.md">🇹🇭 ไทย</a> • <a href="./README.tr.md">🇹🇷 Türkçe</a> • <a href="./README.it.md">🇮🇹 Italiano</a>
  </p>
</div>

---

## 🎬 Официальный релизный трейлер (Full HD 1080p)

<div align="center">
  <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_en.mp4">
    <img src="../assets/media/poster_en.png" alt="Смотреть официальный трейлер BoomOpen Workflow Kit v5.5 (Full HD 1080p)" width="92%" />
  </a>
  <p>
    ▶️ <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_en.mp4"><b>Нажмите здесь, чтобы смотреть / стримить официальный трейлер в Full HD 1080p (MP4 со студийной озвучкой)</b></a>
  </p>
</div>

---

## 🌟 Что такое BoomOpen Workflow Kit v5.5?

**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** — это мультиагентная операционная система с открытым исходным кодом, превращающая одного ИИ-ассистента по программированию в слаженную инженерную организацию из **21 агента-специалиста**, **17 состязательных команд «Золотого треугольника» (Golden Triangle Teams)**, **48 базовых навыков (Core Skills)** и **более 1 430 узкоспециализированных навыков (`skills_library`)**.

В отличие от громоздких обёрток, создающих задержку холодного старта при каждом простом вопросе, BoomOpen v5.5 внедряет **2-режимный умный шлюз сложности (2-Mode Smart Complexity Threshold Gate)**:
- **⚡ Режим A — Прямое выполнение (0 с холодного старта)**: Вопросы и ответы (Q&A), объяснение кода, локальные исправления багов или понятные изменения в **≤ 3 файлах** (без вызова `/cmd`) выполняются, тестируются и проверяются **напрямую** основным агентом с соблюдением **Прагматичных двухуровневых стандартов кодирования** и **Настойчивого тестирования и исправления ошибок**.
- **🎻 Режим B — Строгая мультиагентная оркестрация**: Сложные задачи (**> 3 файлов** или **≥ 2 домена**) либо явные команды `/cmd` активируют режим строгого Оркестратора с **параллельным DAG-разветвлением (Parallel Fan-Out)**, **прямой передачей плана исполнителям (Direct Plan-to-Executor Dispatch)**, **контрактной блокировкой файлов (`SHARED_CONTRACT` + `OWNED_FILES`)** и **повторным использованием «тёплых» субагентов (`send_message`)**.

- **📚 Массивное хранилище из 1 430+ навыков без раздувания контекста**: объединяет **48 базовых навыков (`skills/`)** и **1 430+ узкоспециализированных навыков (`skills_library/`)**, предкомпилированных в `matrix-skills/compact-index.json` для двухшагового `O(1)` поиска — мгновенная экспертиза в Backend, Frontend, Mobile, GameDev (Unity/Unreal/Godot), AI/ML, BigQuery/Data, Cloud/DevOps и безопасности OWASP без засорения окна промпта.

---

## 🏗️ Архитектура Smart-Hybrid (v5.5)

```mermaid
flowchart TD
    User["👤 Запрос пользователя / Slash-команда"] --> Gate{"🚦 2-режимный умный шлюз сложности"}
    Gate -->|"≤ 3 файлов, 1 домен, без /cmd"| ModeA["⚡ Режим A: Прямое выполнение (Tier 0)<br/>0с старт + Прагматичные 2-уровневые стандарты"]
    Gate -->|"> 3 файлов, ≥ 2 домена, или /cmd"| ModeB["🎻 Режим B: Мультиагентный оркестратор (Tier 1)<br/>Model: inherit (Pro High по умолчанию)"]

    ModeB --> FanOut["🔀 Фаза 1: Параллельный DAG Fan-Out<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 Фаза 2: Контрактное планирование (planner)<br/>Фиксация SHARED_CONTRACT + OWNED_FILES"]
    Plan --> Dispatch{"🎯 Вариант выполнения"}

    Dispatch -->|":fast / :hard"| Direct["⚡ Прямая передача плана инженерам<br/>(backend-engineer + frontend-engineer параллельно)"]
    Dispatch -->|":team"| Triangle["🔺 Команда «Золотого треугольника»<br/>(TechLead ⇄ Executor ⇄ Reviewer через MAILBOX)"]

    Direct --> Verify["🧪 Фаза 4: Верификация и тёплый цикл сессий<br/>tester + reviewer (send_message 0с цикл)"]
    Triangle --> Verify
```

---

## 🧠 6 ключевых столпов версии v5.5

1. **🌐 Единый паритет на 5 платформах (`platforms/*`)**:
   - Полноценная нативная поддержка **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor** и **GitHub Copilot** на базе единой унифицированной архитектуры.
2. **📏 Прагматичные двухуровневые стандарты кодирования (Анти-фрагментация)**:
   - **Уровень 1 — Строгое качество и безопасность (Нулевая терпимость)**: Принцип единственной ответственности (Single Responsibility), **ЗАПРЕТ явного `any`**, **ЗАПРЕТ оставленных отладочных `console.log`** в продакшене, обязательный `try/catch` + типизированные ошибки на границах async/API, константы в `SCREAMING_SNAKE_CASE`, DRY (`≥ 3`) и чистый порядок импортов.
   - **Уровень 2 — Гибкие структурные ориентиры (Связность важнее механической нарезки)**: Целевой размер связного файла — `~200–350 строк` с мягким потолком `~400–450 строк` (принудительное разделение только при `>500 строк` или смешении доменов; тесты, типы, CLI и документация освобождены). Функции логики `~20–40 строк` (`~40–80 строк` для UI/обработчиков).
3. **🎯 Прямая передача плана исполнителям и повторное использование тёплых субагентов (`send_message`)**:
   - После создания `PLAN-{feature}.md` Оркестратор направляет задачи **напрямую** профильным инженерам (`backend-engineer`, `frontend-engineer`, `database-architect` и др.) без лишнего промежуточного звена `tech-lead`.
   - Активные субагенты сохраняются в **Реестре активных сессий (`Role → conversationId`)** и повторно вызываются через `send_message` с **0 с холодного старта** и **100% сохранением контекста файлов**.
4. **🤝 Контрактная параллельная разработка (`SHARED_CONTRACT` + `OWNED_FILES`)**:
   - Мультидоменные планы заранее фиксируют API-эндпоинты, DTO-схемы и монопольные права записи файлов (`OWNED_FILES` против `READ_ONLY_FILES`) перед параллельным запуском инженеров, полностью исключая конфликты перезаписи.
5. **🔍 Поиск первопричины 5-Whys (SPIE v3.0) и 100% чистое дерево Git**:
   - `debugger` исследует каждый сбой через 3 ранжированные гипотезы и причинно-следственную цепочку **5-Whys** (`Почему 1 Симптом` → `Почему 5 Системная первопричина`). Временные артефакты (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) сохраняются в `<appDataDir>\brain\<conversation-id>\`, оставляя рабочее дерево Git идеально чистым.
6. **🩺 Встроенная CLI-диагностика (`doctor` & `check`) и O(1) индекс навыков**:
   - `npm run doctor` проверяет все 5 платформ, 21 агента, 51 файл команд, 72 команды и `matrix-skills/compact-index.json` (`1 430+` навыков). `npm run check <dir>` автоматически проверяет код на соответствие стандартам Уровня 1 и Уровня 2.

---

## 💻 Поддерживаемые ИИ-платформы

| Платформа | Уровень поддержки | Глобальная точка входа | Путь установки фреймворка |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ Нативно v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Нативно v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Нативно v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Нативно v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Нативно v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 Быстрый старт и установка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. Установить для вашего ИИ-ассистента (выберите один или --all для всех)
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # Установка сразу для всех 5 платформ

# 3. Проверить состояние установки, двухуровневые стандарты кода и запустить тесты
npm run doctor
npm run check ./cli
npm test
```

---

## 🎛️ Единый центр настроек и выбора режима (`/settings` Control Center)

BoomOpen v5.5 включает **Единый центр управления с нулевой задержкой**, позволяющий переключать режимы выполнения (`auto`, `mode_a`, `mode_b`, `team`), 4 пресета и 12 системных параметров сразу на всех **5 платформах** менее чем за `< 10 мс` (**0 мс задержки на первом шаге**):

| Профиль (`Preset`) | Режим выполнения (`execution.mode`) | Вариант `/cmd` | Исследование на естественном языке (`naturalLanguageResearchTrigger`) | Стандарты кода (`codingStandards`) | Когда использовать |
|:---|:---|:---:|:---:|:---:|:---|
| **⚡ `smart-hybrid`** *(Рекомендуется по умолчанию)* | **`auto`** (`≤ 3 файлов` → Mode A напрямую; `> 3 файлов` или `/cmd` → Mode B) | `auto` | **`auto_team`** *(Авто-маршрутизация идей и ресёрча в `/brainstorm:team` Golden Triangle)* | `pragmatic` (`400/500` строк) | Ежедневная full-stack разработка: мгновенно на малых задачах, глубоко на сложной архитектуре |
| **🚀 `solo-fast`** | **`mode_a`** *(Принудительный прямой режим без запуска субагентов, 0 с)* | `fast` | `off` *(Прямой ответ в чате, если не вызван `/brainstorm`)* | `relaxed` (`600/800` строк) | Срочные хотфиксы, быстрое прототипирование, скрипты и экономия токенов |
| **🧠 `deep-architect`** | **`mode_b`** *(Принудительная мультиагентная оркестрация Mode B для всех задач)* | `hard` | `auto_hard` *(Авто-запуск глубокого анализа `/brainstorm:hard` по 5 линзам)* | `strict` (`300/400` строк) | Проектирование сложной архитектуры, новые проекты и кросс-доменный рефакторинг |
| **🔺 `adversarial-team`** | **`team`** *(Принудительный режим состязательной тройки `:team` Golden Triangle)* | `team` | **`auto_team`** *(Перекрёстная проверка 3 агентами через `MAILBOX`)* | `strict` (`300/400` строк) | Критически важный продакшен-код, аудит безопасности и релизы без дефектов |

### Три способа переключения режимов (Чат `/settings`, локальная Web-панель и CLI)

```bash
# 1. Слэш-команда в чате (Интерактивное меню или быстрая команда)
/settings                                     # Открыть интерактивное меню (ask_question UI)
/settings preset smart-hybrid                 # Переключить на рекомендуемый режим (Auto Mode A/B + auto_team)
/settings preset solo-fast                    # Переключить на быстрый прямой режим (Mode A)
/settings preset deep-architect               # Переключить на мультиагентный оркестратор (Mode B)
/settings preset adversarial-team             # Переключить на команду Golden Triangle из 3 агентов (:team)
/settings mode auto | mode_a | mode_b | team  # Напрямую задать режим выполнения (execution.mode)

# 2. Локальная веб-панель управления (http://127.0.0.1:4567)
npm run settings:ui

# 3. Терминал CLI (Глобально ~/.boomopen/settings.json и для проекта ./.boomopen.json)
npm run settings -- status
npm run settings -- preset adversarial-team
npm run settings -- reset
```

---

## 🎯 Справочник Slash-команд

| Команда | Варианты | Основное назначение |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | Полный цикл разработки функции (Исследование/Разведка → План → Параллельный код → Тесты → Ревью) |
| **`/code`** | `:fast`, `:hard`, `:team` | Прямая реализация кода по готовому плану `PLAN-{feature}.md` |
| **`/plan`** | `:fast`, `:hard`, `:team` | Создание технических планов с `SHARED_CONTRACT`, `OWNED_FILES` и критериями Given/When/Then |
| **`/fix`** | `:fast`, `:hard`, `:team` | Устранение первопричины бага с обязательной проверкой регрессионными тестами |
| **`/debug`** | `:fast`, `:hard`, `:team` | Расследование первопричины по 3 гипотезам + цепочке **5-Whys (SPIE v3.0)** (`DEBUG-{issue}.md`) |
| **`/test`** | `:fast`, `:hard`, `:team` | Параллельный DAG-запуск тестов + поиск непокрытых граничных случаев (`tester` + `scouter`) |
| **`/review`** | `:fast`, `:hard`, `:team` | 4-сторонний параллельный аудит (Архитектура, Качество кода, Безопасность OWASP, Производительность) |
| **`/design`** | `:fast`, `:hard`, `:team` | Проектирование системной архитектуры, схемы БД и спецификации UI/UX (`DESIGN.md`) |
| **`/docs`** | `:core`, `:business`, `:audit` | Генерация и синхронизация двухуровневой архитектурной и бизнес-документации (`./documents/`) |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | Предрелизные проверки, preview-окружения, выкатка в продакшен и безопасный откат |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | Сократовское выявление требований, анализ компромиссов и генерация идей |
| **`/report`** | `:fast`, `:hard`, `:team` | Итоговые технические и управленческие отчёты с метриками и диаграммами |
| **`/orchestrate`** | — | Пользовательская оркестрация мультиагентных конвейеров между несколькими доменами |
| **`/settings` / `/config`** | `preset`, `mode`, `set`, `ui` | Единый центр управления: переключение `Auto` / `Mode A` / `Mode B` / `Team`, пресетов или запуск Web UI (`--ui`) |
| **`/save` / `/recap`** | — | Сохранение состояния сессии (`SESSION-HANDOVER.md`) и полное восстановление контекста за `< 5 с` |

---

## 🤖 21 агент-специалист и 17 команд «Золотого треугольника»

| Категория | Агенты-специалисты (`agents/*.md`) | Команды «Золотого треугольника» (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **Инженерия и реализация** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **Архитектура и планирование** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **Качество, безопасность и отладка** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **Исследования и знания** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📚 Хранилище из 1 430+ навыков (48 базовых + 1 430+ библиотечных)

BoomOpen включает одну из крупнейших в open-source коллекций инженерных навыков с **нулевым расходом токенов в простое** благодаря **двухшаговому прогрессивному разрешению навыков O(1)** (`<skills>` → `matrix-skills/compact-index.json` → точечная загрузка `SKILL.md` по требованию):

| Уровень / Домен навыков | Кол-во | Ключевые навыки и возможности | Механизм загрузки |
|:---|:---:|:---|:---|
| **⚡ Уровень 1: Базовые навыки (`skills/`)** | **48** | `clean-code`, `systematic-debugging`, `plan-writing`, `brainstorming`, `frontend-design`, `api-patterns`, `database-design`, `testing-patterns`, `vulnerability-scanner`, `skill-seeker` | Прединдексированы в `<skills>` для мгновенного доступа на 1-м ходу |
| **🌐 Web, Backend и распределённые системы** | **380+** | Next.js/React 19, FastAPI, NestJS, микросервисы Go/Rust, GraphQL, gRPC, событийная архитектура Redis/Kafka, мультитенантные SaaS | По требованию через `compact-index.json` (`skills_library/`) |
| **🤖 ИИ, LLM-агенты и инженерия данных** | **310+** | RAG-пайплайны, серверы LangGraph/MCP, промпт-инжиниринг, Vertex AI, аналитика BigQuery, dbt, Spark, векторные БД | По требованию через `compact-index.json` (`skills_library/`) |
| **☁️ Облако, DevOps, Kubernetes и безопасность** | **290+** | Terraform/OpenTofu, AWS/GCP/Azure, Docker/K8s GitOps, CI/CD, аудит OWASP Top 10, Zero-Trust аутентификация | По требованию через `compact-index.json` (`skills_library/`) |
| **📱 Мобайл, игровые движки и спецдомены** | **450+** | iOS Swift/SwiftUI, Android Kotlin, React Native, Flutter, Unity 6, Unreal Engine 5, Godot 4, WebGL/Three.js, Quant Finance, Web3 | По требованию через `compact-index.json` (`skills_library/`) |

---

## 📂 Структура репозитория

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 профиль агентов-специалистов + 17 команд «Золотого треугольника» (51 файл ролей)
├── cli/                     # Установщик (install.js), Диагностика (doctor.js), 2-уровневый чекер (checker.js) и тесты
├── commands/                # 72 рабочих процесса Slash-команд (:fast, :hard, :team) + протоколы _ref/
├── documents/               # Двухуровневая документация по архитектуре, доменам, кодовой базе и стандартам
├── i18n/                    # Многоязычная документация (16 полных переводов README)
├── matrix-skills/           # YAML-матрицы навыков по доменам + предкомпилированный compact-index.json (1 430+ навыков)
├── platforms/               # Унифицированные шаблоны для 5 платформ (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # Правила Режима B по требованию (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Python-скрипты автоматизации и верификации (checklist.py, verify_all.py и др.)
├── skills/                  # 48 базовых навыков (clean-code, debugger, plan-writing, frontend-design и др.)
├── skills_library/          # 1 430+ специализированных навыков, загружаемых за 2 шага по требованию
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 Лицензия и безопасность

- **Лицензия**: Распространяется по [лицензии MIT](../LICENSE). Copyright © 2026 **Kennyboom (BoomOpen)**.
- **Политика безопасности**: Ознакомьтесь с [SECURITY.md](../SECURITY.md) для информации о встроенных механизмах защиты и порядке сообщения об уязвимостях.
