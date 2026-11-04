<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Sistema Operativo IA Smart-Hybrid Multi-Piattaforma — 21 Agenti Specialisti, 17 Team Triangolo d&#39;Oro e Caveau di 1.450+ Competenze On-Demand</strong></p>

  <p>
    <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases"><img src="https://img.shields.io/badge/Version-5.5.0-7c3aed.svg" alt="Version: 5.5.0" /></a>
    <a href="#platforms"><img src="https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg" alt="Platforms: 5 Unified" /></a>
    <a href="#agents"><img src="https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg" alt="Agents: 21 Specialists + 17 Teams" /></a>
    <a href="#pillars"><img src="https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C450%2B%20Library-f59e0b.svg" alt="Skills: 48 Core + 1,450+ Library" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg" alt="Node.js: >=18.0.0" /></a>
    <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  </p>

  <p>
    <a href="../README.md">🇬🇧 English</a> • <a href="./README.vi.md">🇻🇳 Tiếng Việt</a> • <a href="./README.zh-CN.md">🇨🇳 简体中文</a> • <a href="./README.zh-TW.md">🇹🇼 繁體中文</a> • <a href="./README.ja.md">🇯🇵 日本語</a> • <a href="./README.ko.md">🇰🇷 한국어</a> • <a href="./README.es.md">🇪🇸 Español</a> • <a href="./README.fr.md">🇫🇷 Français</a> • <a href="./README.de.md">🇩🇪 Deutsch</a><br/>
    <a href="./README.pt-BR.md">🇧🇷 Português</a> • <a href="./README.ru.md">🇷🇺 Русский</a> • <a href="./README.hi.md">🇮🇳 हिन्दी</a> • <a href="./README.ar.md">🇸🇦 العربية</a> • <a href="./README.id.md">🇮🇩 Bahasa Indonesia</a> • <a href="./README.th.md">🇹🇭 ไทย</a> • <a href="./README.tr.md">🇹🇷 Türkçe</a> • <b>🇮🇹 Italiano</b>
  </p>
</div>

---

## 🎬 Trailer Ufficiale di Lancio (Full HD 1080p)

<div align="center">
  <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_en.mp4">
    <img src="../assets/media/poster_en.png" alt="Guarda il Trailer Ufficiale di Lancio di BoomOpen Workflow Kit v5.5 (Full HD 1080p)" width="92%" />
  </a>
  <p>
    ▶️ <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_en.mp4"><b>Clicca qui per guardare / riprodurre il Trailer Ufficiale in Full HD 1080p (MP4 con voiceover da studio)</b></a>
  </p>
</div>

---

## 🌟 Cos’è BoomOpen Workflow Kit v5.5?

**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** è un sistema operativo multi-agente open-source che trasforma un singolo assistente di programmazione AI in un’organizzazione di ingegneria del software coordinata composta da **21 agenti specialisti**, **17 team avversari Golden Triangle**, **48 competenze chiave (Core Skills)** e **oltre 1.450 competenze specialistiche di libreria (`skills_library`)**.

A differenza dei template rigidi o dei wrapper pesanti che introducono latenza di avvio a freddo ad ogni semplice domanda, BoomOpen v5.5 introduce un **Gate Intelligente di Complessità a 2 Modalità (2-Mode Smart Complexity Threshold Gate)**:
- **⚡ Modalità A — Esecuzione Diretta (Cold-Start 0s)**: Domande e risposte (Q&A), spiegazioni del codice, bugfix su singolo dominio o modifiche chiare che toccano **≤ 3 file** (senza comandi `/cmd`) vengono eseguite, testate e verificate **direttamente** dall’agente principale applicando gli **Standard di Codifica Pragmatici a 2 Livelli** e **Test e Risoluzione Persistente dei Bug**.
- **🎻 Modalità B — Orchestrazione Multi-Agente Rigorosa**: Funzionalità complesse (**> 3 file** o **≥ 2 domini**) o comandi espliciti `/cmd` attivano la modalità Orchestratore rigorosa con **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Blocchi di Proprietà dei File basati su Contratto (`SHARED_CONTRACT` + `OWNED_FILES`)** e **Riutilizzo a Caldo dei Sub-agenti (`send_message`)**.

- **📚 Caveau Massivo di 1.450+ Competenze a Zero Gonfiore di Contesto**: Unisce **48 Competenze Core (`skills/`)** e **1.450+ Competenze Specialistiche (`skills_library/`)** precompilate in `matrix-skills/compact-index.json` per una ricerca `O(1)` in 2 passaggi — offrendo padronanza istantanea in Backend, Frontend, Mobile, Game Dev (Unity/Unreal/Godot), IA/ML, BigQuery/Data, Cloud/DevOps e Sicurezza OWASP senza appesantire la finestra di prompt.

---

## 🏗️ Architettura Smart-Hybrid (v5.5)

```mermaid
flowchart TD
    User["👤 Richiesta Utente / Comando Slash"] --> Gate{"🚦 Gate Intelligente a 2 Modalità"}
    Gate -->|"≤ 3 file, 1 dominio, nessun /cmd"| ModeA["⚡ Modalità A: Esecuzione Diretta (Tier 0)<br/>Avvio 0s + Standard Pragmatici a 2 Livelli"]
    Gate -->|"> 3 file, ≥ 2 domini, o /cmd"| ModeB["🎻 Modalità B: Orchestratore Multi-Agente (Tier 1)<br/>Model: inherit (Predefinito Pro High)"]

    ModeB --> FanOut["🔀 Fase 1: DAG Parallel Fan-Out<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 Fase 2: Pianificazione basata su Contratto (planner)<br/>Blocca SHARED_CONTRACT + OWNED_FILES"]
    Plan --> Dispatch{"🎯 Variante di Esecuzione"}

    Dispatch -->|":fast / :hard"| Direct["⚡ Smistamento Diretto dal Piano agli Ingegneri<br/>(backend-engineer + frontend-engineer in parallelo)"]
    Dispatch -->|":team"| Triangle["🔺 Team Avversario Golden Triangle<br/>(TechLead ⇄ Executor ⇄ Reviewer via MAILBOX)"]

    Direct --> Verify["🧪 Fase 4: Verifica e Riutilizzo Sessioni a Caldo<br/>tester + reviewer (ciclo send_message 0s)"]
    Triangle --> Verify
```

---

## 🧠 I 6 Pilastri Fondamentali della v5.5

1. **🌐 Parità Unificata su 5 Piattaforme (`platforms/*`)**:
   - Installazione nativa di prima classe per **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor** e **GitHub Copilot** da un’unica architettura unificata.
2. **📏 Standard di Codifica Pragmatici a 2 Livelli (Anti-Frammentazione)**:
   - **Livello 1 — Qualità e Sicurezza Rigorose (Tolleranza Zero)**: Singola Responsabilità (Single Responsibility), **VIETATO `any` esplicito**, **VIETATO lasciare `console.log` di debug** nel codice di produzione, gestione errori tipizzata con `try/catch` ai confini async/API, costanti in `SCREAMING_SNAKE_CASE`, DRY (`≥ 3`) e import ordinati.
   - **Livello 2 — Linee Guida Strutturali Flessibili (Coesione Prima del Taglio Meccanico)**: I file coesi puntano a `~200–350 righe` con un tetto flessibile di `~400–450 righe` (divisione obbligatoria solo oltre `>500 righe` o se mescolano più domini; test, tipi, CLI e docs sono esenti). Funzioni logiche `~20–40 righe` (`~40–80 righe` per UI/Handler).
3. **🎯 Smistamento Diretto dal Piano all’Esecutore e Riutilizzo a Caldo (`send_message`)**:
   - Una volta creato `PLAN-{feature}.md`, l’Orchestratore assegna i task **direttamente** agli ingegneri di dominio (`backend-engineer`, `frontend-engineer`, `database-architect`, ecc.) senza passaggi intermedi superflui tramite `tech-lead`.
   - I sub-agenti attivi vengono salvati nel **Registro delle Sessioni Attive (`Role → conversationId`)** e riutilizzati tramite `send_message` con **latenza di avvio 0s** e **100% del contesto file preservato**.
4. **🤝 Esecuzione Parallela basata su Contratto (`SHARED_CONTRACT` + `OWNED_FILES`)**:
   - I piani multidominio bloccano gli endpoint API, gli schemi DTO e la proprietà esclusiva di scrittura dei file (`OWNED_FILES` vs. `READ_ONLY_FILES`) prima di avviare gli ingegneri in parallelo, eliminando ogni conflitto di scrittura.
5. **🔍 Debugging della Causa Radice 5-Whys (SPIE v3.0) e Albero Git Pulito al 100%**:
   - `debugger` analizza ogni bug attraverso almeno 3 ipotesi classificate e una catena causale **5-Whys** (`Perché 1 Sintomo` → `Perché 5 Causa Radice Sistemica`). Gli artefatti temporanei (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) vengono salvati in `<appDataDir>\brain\<conversation-id>\` mantenendo l’albero di lavoro Git pulito al 100%.
6. **🩺 Diagnostica CLI Integrata (`doctor` & `check`) e Indice Competenze O(1)**:
   - `npm run doctor` convalida tutti i 5 pacchetti piattaforma, 21 agenti, 51 file di team, 72 comandi e `matrix-skills/compact-index.json` (`1.450+` competenze indicizzate). `npm run check <dir>` verifica automaticamente gli standard di Livello 1 e Livello 2.

---

## 💻 Piattaforme AI Supportate

| Piattaforma | Livello di Supporto | Entrypoint Globale | Percorso di Installazione del Framework |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ Nativo v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Nativo v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Nativo v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Nativo v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Nativo v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 Avvio Rapido e Installazione

```bash
# 1. Clona il repository
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. Installa per il tuo assistente di programmazione AI (scegline uno o --all)
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # Installa su tutte le 5 piattaforme contemporaneamente

# 3. Verifica lo stato dell’installazione, gli standard a 2 livelli e la suite di test
npm run doctor
npm run check ./cli
npm test
```

---

## 🎛️ Impostazioni Unificate e Selezione Modalità (`/settings` Control Center)

BoomOpen v5.5 include un **Centro di Controllo Unificato a Latenza Zero** che permette di cambiare modalità di esecuzione (`auto`, `mode_a`, `mode_b`, `team`), 4 profili predefiniti e 12 impostazioni di sistema su tutte le **5 piattaforme** in `< 10ms` (**0ms di latenza al Turno 1**):

| Profilo (`Preset`) | Modalità di Esecuzione (`execution.mode`) | Variante Predefinita | Ricerca in Linguaggio Naturale (`naturalLanguageResearchTrigger`) | Standard di Codice (`codingStandards`) | Utilizzo Ideale |
|:---|:---|:---:|:---:|:---:|:---|
| **⚡ `smart-hybrid`** *(Consigliato Predefinito)* | **`auto`** (`≤ 3 file` → Mode A Diretto; `> 3 file` o `/cmd` → Mode B) | `auto` | **`auto_team`** *(Indirizza automaticamente ricerca/ideazione a `/brainstorm:team` Golden Triangle)* | `pragmatic` (`400/500` righe) | Sviluppo full-stack quotidiano: istantaneo sui piccoli task, profondo sulle architetture complesse |
| **🚀 `solo-fast`** | **`mode_a`** *(Forza l’esecuzione diretta in solitaria, 0s di latenza sub-agent)* | `fast` | `off` *(Risposta diretta in chat salvo digitazione di `/brainstorm`)* | `relaxed` (`600/800` righe) | Hotfix urgenti, prototipazione rapida, script e massimo risparmio di token |
| **🧠 `deep-architect`** | **`mode_b`** *(Forza l’Orchestratore Multi-Agente Mode B su ogni attività)* | `hard` | `auto_hard` *(Avvia automaticamente `/brainstorm:hard` a 5 lenti)* | `strict` (`300/400` righe) | Architettura di sistemi complessi, progetti greenfield e refactoring multi-dominio |
| **🔺 `adversarial-team`** | **`team`** *(Forza il team avversario a 3 agenti Golden Triangle `:team`)* | `team` | **`auto_team`** *(Dibattito e revisione incrociata a 3 agenti via `MAILBOX`)* | `strict` (`300/400` righe) | Codice di produzione mission-critical, audit di sicurezza e rilasci zero-defect |

### Tre Modi per Cambiare Modalità (Chat `/settings`, Dashboard Web Locale e CLI)

```bash
# 1. Comando Slash in Chat (Menu interattivo o comando rapido)
/settings                                     # Apri il menu interattivo (ask_question UI)
/settings preset smart-hybrid                 # Passa alla modalità predefinita consigliata (Auto Mode A/B + auto_team)
/settings preset solo-fast                    # Passa all’esecuzione diretta veloce (Mode A)
/settings preset deep-architect               # Passa all’Orchestratore Multi-Agente (Mode B)
/settings preset adversarial-team             # Passa al team Golden Triangle a 3 agenti (:team)
/settings mode auto | mode_a | mode_b | team  # Sovrascrivi direttamente la modalità di esecuzione

# 2. Dashboard Web Locale del Centro di Controllo (http://127.0.0.1:4567)
npm run settings:ui

# 3. Terminale CLI (Globale ~/.boomopen/settings.json e Progetto ./.boomopen.json)
npm run settings -- status
npm run settings -- preset adversarial-team
npm run settings -- reset
```

---

## 🎯 Riferimento Comandi Slash

| Comando | Varianti | Scopo Principale |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | Sviluppo completo di funzionalità end-to-end (Ricerca/Scout → Piano → Codice Parallelo → Test → Revisione) |
| **`/code`** | `:fast`, `:hard`, `:team` | Esegue l’implementazione direttamente a partire da un `PLAN-{feature}.md` esistente |
| **`/plan`** | `:fast`, `:hard`, `:team` | Crea blueprint di implementazione con `SHARED_CONTRACT`, `OWNED_FILES` e criteri Given/When/Then |
| **`/fix`** | `:fast`, `:hard`, `:team` | Risoluzione dei bug alla radice con verifica obbligatoria tramite test di regressione |
| **`/debug`** | `:fast`, `:hard`, `:team` | Indagine della causa radice con 3 ipotesi + catena causale **5-Whys (SPIE v3.0)** (`DEBUG-{issue}.md`) |
| **`/test`** | `:fast`, `:hard`, `:team` | Esecuzione parallela DAG delle suite di test + ricerca di casi limite non coperti (`tester` + `scouter`) |
| **`/review`** | `:fast`, `:hard`, `:team` | Audit parallelo a 4 dimensioni (Architettura, Qualità del Codice, Sicurezza OWASP, Prestazioni) |
| **`/design`** | `:fast`, `:hard`, `:team` | Architettura di sistema, schema del database e specifiche UI/UX (`DESIGN.md`) |
| **`/docs`** | `:core`, `:business`, `:audit` | Genera o sincronizza la documentazione strutturata a 2 livelli di architettura e business (`./documents/`) |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | Controlli pre-deploy, ambienti di anteprima, rilascio in produzione e rollback sicuro |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | Scoperta socratica dei requisiti, analisi dei trade-off e ideazione |
| **`/report`** | `:fast`, `:hard`, `:team` | Report di sintesi esecutivi e tecnici completi di metriche e diagrammi |
| **`/orchestrate`** | — | Orchestrazione personalizzata di pipeline multi-agente attraverso più domini |
| **`/settings` / `/config`** | `preset`, `mode`, `set`, `ui` | Centro di Controllo Unificato: cambia `Auto` / `Mode A` / `Mode B` / `Team`, preset o apri Web UI (`--ui`) |
| **`/save` / `/recap`** | — | Salva lo stato della sessione (`SESSION-HANDOVER.md`) e ripristina l’intero contesto in `< 5s` |

---

## 🤖 21 Agenti Specialisti e 17 Team Golden Triangle

| Categoria | Agenti Specialisti (`agents/*.md`) | Team Golden Triangle (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **Ingegneria ed Esecuzione** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **Architettura e Pianificazione** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **Qualità, Sicurezza e Debugging** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **Ricerca e Conoscenza** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📚 Caveau di 1.450+ Competenze (48 Core + 1.450+ di Libreria)

BoomOpen include uno dei più vasti ecosistemi open source di competenze ingegneristiche, progettato per **0 consumo di token a riposo** tramite **Risoluzione Progressiva O(1) in 2 Passaggi** (`<skills>` → `matrix-skills/compact-index.json` → caricamento mirato di `SKILL.md` su richiesta):

| Livello / Dominio di Competenza | Numero | Competenze e Capacità Rappresentative | Meccanismo di Caricamento |
|:---|:---:|:---|:---|
| **⚡ Livello 1: Competenze Core (`skills/`)** | **48** | `clean-code`, `systematic-debugging`, `plan-writing`, `brainstorming`, `frontend-design`, `api-patterns`, `database-design`, `testing-patterns`, `vulnerability-scanner`, `skill-seeker` | Pre-indicizzato in `<skills>` per accesso istantaneo al Turno 1 |
| **🌐 Web, Backend e Sistemi Distribuiti** | **380+** | Next.js/React 19, FastAPI, NestJS, microservizi Go/Rust, GraphQL, gRPC, architettura event-driven Redis/Kafka, SaaS multi-tenant | Su richiesta via `compact-index.json` (`skills_library/`) |
| **🤖 IA, Agenti LLM e Data Engineering** | **310+** | Pipeline RAG, server LangGraph/MCP, prompt engineering, Vertex AI, analisi BigQuery, dbt, Spark, database vettoriali | Su richiesta via `compact-index.json` (`skills_library/`) |
| **☁️ Cloud, DevOps, Kubernetes e Sicurezza** | **290+** | Terraform/OpenTofu, architettura AWS/GCP/Azure, Docker/K8s GitOps, pipeline CI/CD, audit OWASP Top 10, autenticazione Zero-Trust | Su richiesta via `compact-index.json` (`skills_library/`) |
| **📱 Mobile, Game Engine e Domini Specializzati** | **450+** | iOS Swift/SwiftUI, Android Kotlin, React Native, Flutter, Unity 6, Unreal Engine 5, Godot 4, WebGL/Three.js, Finanza Quantitativa, Web3 | Su richiesta via `compact-index.json` (`skills_library/`) |

---

## 📂 Struttura del Repository

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 definizioni di Agenti Specialisti + 17 Team Golden Triangle (51 file di ruolo)
├── cli/                     # Installer (install.js), Health Doctor (doctor.js), Verificatore a 2 Livelli (checker.js) e Test
├── commands/                # 72 workflow di comandi Slash (:fast, :hard, :team) + protocolli _ref/
├── documents/               # Documentazione a 2 livelli di Architettura, Dominio, Codice Sorgente e Standard
├── i18n/                    # Documentazione multilingue (16 traduzioni complete del README)
├── matrix-skills/           # Matrici YAML delle competenze per dominio + compact-index.json precompilato (1.450+ competenze)
├── platforms/               # Template unificati per le 5 piattaforme (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # Regole Modalità B caricate su richiesta (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Script Python di automazione e verifica (checklist.py, verify_all.py, ecc.)
├── skills/                  # 48 Competenze Chiave (clean-code, debugger, plan-writing, frontend-design, ecc.)
├── skills_library/          # Oltre 1.450 competenze specialistiche caricate su richiesta tramite ricerca rapida in 2 passaggi
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 Licenza e Sicurezza

- **Licenza**: Distribuito sotto [Licenza MIT](../LICENSE). Copyright © 2026 **Kennyboom (BoomOpen)**.
- **Politica di Sicurezza**: Consulta [SECURITY.md](../SECURITY.md) per le protezioni di sicurezza integrate e le linee guida sulla segnalazione delle vulnerabilità.
