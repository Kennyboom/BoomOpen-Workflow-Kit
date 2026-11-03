<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Sistema Operativo de Fuerza Laboral IA Híbrido-Inteligente Multiplataforma y Framework de Orquestación Multi-Agente</strong></p>

  [![Version: 5.5.0](https://img.shields.io/badge/Version-5.5.0-7c3aed.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases)
  [![Platforms: 5 Unified](https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg)](#)
  [![Agents: 21 Specialists + 17 Teams](https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg)](#)
  [![Skills: 48 Core + 1,430+ Library](https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C430%2B%20Library-f59e0b.svg)](#)
  [![Node.js: >=18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg)](https://nodejs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

  <p>
    [🇬🇧 English](../README.md) • [🇻🇳 Tiếng Việt](./README.vi.md) • [🇨🇳 简体中文](./README.zh-CN.md) • [🇹🇼 繁體中文](./README.zh-TW.md) • [🇯🇵 日本語](./README.ja.md) • [🇰🇷 한국어](./README.ko.md) • **🇪🇸 Español** • [🇫🇷 Français](./README.fr.md) • [🇩🇪 Deutsch](./README.de.md)<br/>
    [🇧🇷 Português](./README.pt-BR.md) • [🇷🇺 Русский](./README.ru.md) • [🇮🇳 हिन्दी](./README.hi.md) • [🇸🇦 العربية](./README.ar.md) • [🇮🇩 Bahasa Indonesia](./README.id.md) • [🇹🇭 ไทย](./README.th.md) • [🇹🇷 Türkçe](./README.tr.md) • [🇮🇹 Italiano](./README.it.md)
  </p>
</div>

---

## 🌟 ¿Qué es BoomOpen Workflow Kit v5.5?

**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** es un sistema operativo multi-agente de código abierto que transforma un asistente de programación IA individual en una organización de ingeniería coordinada compuesta por **21 agentes especialistas**, **17 equipos adversarios Golden Triangle**, **48 habilidades principales (Core Skills)** y **más de 1,430 habilidades especializadas (`skills_library`)**.

A diferencia de las plantillas rígidas o los contenedores pesados que añaden latencia en frío a cada consulta simple, BoomOpen v5.5 introduce una **Compuerta Inteligente de Complejidad de 2 Modos (2-Mode Smart Complexity Threshold Gate)**:
- **⚡ Modo A — Ejecución Directa (0s de Arranque en Frío)**: Preguntas frecuentes (Q&A), explicaciones de código, correcciones de errores de un solo dominio o cambios claros que toquen **≤ 3 archivos** (sin comando `/cmd`) se ejecutan, prueban y verifican **directamente** aplicando los **Estándares de Codificación Pragmáticos de 2 Niveles** y **Pruebas y Corrección Persistente de Errores**.
- **🎻 Modo B — Orquestación Multi-Agente Estricta**: Las funcionalidades complejas (**> 3 archivos** o **≥ 2 dominios**) o los comandos explícitos `/cmd` activan el modo Orquestador estricto con **Abanico Paralelo DAG (Parallel Fan-Out)**, **Despacho Directo del Plan al Ejecutor**, **Bloqueos de Archivos por Contrato (`SHARED_CONTRACT` + `OWNED_FILES`)** y **Reutilización de Sub-agentes en Caliente (`send_message`)**.

---

## 🏗️ Arquitectura Híbrida-Inteligente (v5.5)

```mermaid
flowchart TD
    User["👤 Solicitud del Usuario / Comando Slash"] --> Gate{"🚦 Compuerta Inteligente de 2 Modos"}
    Gate -->|"≤ 3 archivos, 1 dominio, sin /cmd"| ModeA["⚡ Modo A: Ejecución Directa (Tier 0)<br/>0s Arranque + Estándares Pragmáticos 2 Niveles"]
    Gate -->|"> 3 archivos, ≥ 2 dominios, o /cmd"| ModeB["🎻 Modo B: Orquestador Multi-Agente (Tier 1)<br/>Model: inherit (Pro High por defecto)"]

    ModeB --> FanOut["🔀 Fase 1: Abanico Paralelo DAG<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 Fase 2: Planificación por Contrato (planner)<br/>Bloquea SHARED_CONTRACT + OWNED_FILES"]
    Plan --> Dispatch{"🎯 Variante de Ejecución"}

    Dispatch -->|":fast / :hard"| Direct["⚡ Despacho Directo Plan a Ingeniero<br/>(backend-engineer + frontend-engineer en paralelo)"]
    Dispatch -->|":team"| Triangle["🔺 Equipo Adversario Golden Triangle<br/>(TechLead ⇄ Executor ⇄ Reviewer vía MAILBOX)"]

    Direct --> Verify["🧪 Fase 4: Verificación y Reutilización en Caliente<br/>tester + reviewer (send_message bucle 0s)"]
    Triangle --> Verify
```

---

## 🧠 Los 6 Pilares Principales de v5.5

1. **🌐 Paridad Unificada en 5 Plataformas (`platforms/*`)**:
   - Instalación nativa de primera clase para **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor** y **GitHub Copilot** desde una única arquitectura unificada.
2. **📏 Estándares de Codificación Pragmáticos de 2 Niveles (Anti-Fragmentación)**:
   - **Nivel 1 — Calidad y Seguridad Estrictas (Tolerancia Cero)**: Responsabilidad Única (Single Responsibility), **PROHIBIDO `any` explícito**, **PROHIBIDO dejar `console.log` de depuración** en producción, manejo de errores tipado con `try/catch` en límites async/API, constantes en `SCREAMING_SNAKE_CASE`, DRY (`≥ 3`) e importaciones limpias y ordenadas.
   - **Nivel 2 — Guías Estructurales Flexibles (Cohesión Primero)**: Los archivos cohesivos apuntan a `~200–350 líneas` con un techo flexible de `~400–450 líneas` (división obligatoria solo a `>500 líneas` o múltiples dominios; pruebas, tipos, CLI y docs exentos). Funciones de lógica `~20–40 líneas` (`~40–80 líneas` para UI/Handlers).
3. **🎯 Despacho Directo del Plan al Ejecutor y Reutilización en Caliente (`send_message`)**:
   - Una vez que existe `PLAN-{feature}.md`, el Orquestador envía las tareas **directamente** a los ingenieros de dominio (`backend-engineer`, `frontend-engineer`, `database-architect`, etc.) sin pasar por un intermediario `tech-lead` redundante.
   - Los sub-agentes activos se registran en un **Registro de Sesiones Activas (`Role → conversationId`)** y se reutilizan mediante `send_message` con **0s de arranque en frío** y **100% del contexto preservado**.
4. **🤝 Despacho Paralelo Basado en Contratos (`SHARED_CONTRACT` + `OWNED_FILES`)**:
   - Los planes multidominio bloquean los endpoints API, esquemas DTO y la propiedad exclusiva de archivos (`OWNED_FILES` frente a `READ_ONLY_FILES`) antes de lanzar ingenieros en paralelo, eliminando colisiones de escritura.
5. **🔍 Depuración de Causa Raíz 5-Whys (SPIE v3.0) y Árbol Git 100% Limpio**:
   - `debugger` analiza cada error mediante 3 hipótesis clasificadas y una cadena causal **5-Whys** (`Por qué 1 Síntoma` → `Por qué 5 Causa Raíz Sistémica`). Los artefactos transitorios (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) se guardan en `<appDataDir>\brain\<conversation-id>\` manteniendo el árbol Git 100% limpio.
6. **🩺 Diagnóstico CLI Integrado (`doctor` & `check`) e Índice de Habilidades O(1)**:
   - `npm run doctor` valida los 5 paquetes de plataforma, 21 agentes, 51 archivos de equipo, 72 comandos y `matrix-skills/compact-index.json` (`1,430+` habilidades). `npm run check <dir>` audita los estándares de Nivel 1 y Nivel 2.

---

## 💻 Plataformas de IA Soportadas

| Plataforma | Nivel de Soporte | Punto de Entrada Global | Ruta de Instalación del Framework |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ Nativo v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Nativo v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Nativo v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Nativo v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Nativo v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 Inicio Rápido e Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. Instalar para tu asistente de IA (elige uno o --all para todos)
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # All 5 platforms

# 3. Verificar salud de la instalación, estándares de código de 2 niveles y suite de pruebas
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

## 🎯 Referencia de Comandos Slash

| Comando | Variantes | Propósito Principal |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | Desarrollo de funcionalidades de extremo a extremo (Investigación/Scout → Plan → Código Paralelo → Test → Revisión) |
| **`/code`** | `:fast`, `:hard`, `:team` | Ejecutar la implementación directamente desde un `PLAN-{feature}.md` existente |
| **`/plan`** | `:fast`, `:hard`, `:team` | Crear planos de implementación con `SHARED_CONTRACT`, `OWNED_FILES` y criterios Given/When/Then |
| **`/fix`** | `:fast`, `:hard`, `:team` | Resolución de errores de causa raíz con verificación obligatoria de pruebas de regresión |
| **`/debug`** | `:fast`, `:hard`, `:team` | Investigación de causa raíz con 3 hipótesis + cadena causal **5-Whys (SPIE v3.0)** (`DEBUG-{issue}.md`) |
| **`/test`** | `:fast`, `:hard`, `:team` | Ejecución paralela DAG de suites de pruebas + exploración de casos límite no cubiertos (`tester` + `scouter`) |
| **`/review`** | `:fast`, `:hard`, `:team` | Auditoría paralela en 4 dimensiones (Arquitectura, Calidad de Código, Seguridad OWASP, Rendimiento) |
| **`/design`** | `:fast`, `:hard`, `:team` | Arquitectura del sistema, esquema de base de datos y especificación UI/UX (`DESIGN.md`) |
| **`/docs`** | `:core`, `:business`, `:audit` | Generar o sincronizar documentación estructurada de arquitectura y negocio de 2 niveles (`./documents/`) |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | Puertas de preparación pre-despliegue, entornos preview, despliegue a producción y rollback seguro |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | Descubrimiento socrático de requisitos, análisis de compensaciones e ideación |
| **`/report`** | `:fast`, `:hard`, `:team` | Informes ejecutivos y técnicos de síntesis con métricas y diagramas |
| **`/orchestrate`** | — | Orquestación personalizada de tuberías multi-agente a través de múltiples dominios |
| **`/save` / `/recap`** | — | Persistir el estado de la sesión (`SESSION-HANDOVER.md`) y restaurar el contexto completo en `< 5s` |

---

## 🤖 21 Agentes Especialistas y 17 Equipos Golden Triangle

| Categoría | Agentes Especialistas (`agents/*.md`) | Equipos Golden Triangle (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **Ingeniería y Ejecución** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **Arquitectura y Planificación** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **Calidad, Seguridad y Depuración** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **Investigación y Conocimiento** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📂 Estructura del Repositorio

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 definiciones de Agentes Especialistas + 17 Equipos Golden Triangle (51 archivos de rol)
├── cli/                     # Instalador (install.js), Doctor de Salud (doctor.js), Verificador de 2 Niveles (checker.js) y Tests
├── commands/                # 72 flujos de trabajo de comandos Slash (:fast, :hard, :team) + protocolos _ref/
├── documents/               # Documentación de 2 niveles de Arquitectura, Dominio, Código Base y Estándares
├── i18n/                    # Documentación internacionalizada (16 traducciones completas de README)
├── matrix-skills/           # Matrices YAML de habilidades por dominio + compact-index.json precompilado (1,430+ habilidades)
├── platforms/               # Plantillas unificadas para las 5 plataformas (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # Reglas bajo demanda del Modo B (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Ejecutores de verificación y automatización en Python (checklist.py, verify_all.py, etc.)
├── skills/                  # 48 Habilidades Principales (clean-code, debugger, plan-writing, frontend-design, etc.)
├── skills_library/          # Más de 1,430 habilidades especializadas cargadas bajo demanda mediante búsqueda en 2 pasos
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 Licencia y Seguridad

- **Licencia**: Distribuido bajo la [Licencia MIT](../LICENSE). Copyright © 2026 **Kennyboom (BoomOpen)**.
- **Política de Seguridad**: Consulta [SECURITY.md](../SECURITY.md) para conocer las protecciones integradas y el procedimiento de reporte de vulnerabilidades.
