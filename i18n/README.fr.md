<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>Système d’Exploitation IA Hybride-Intelligent Multiplateforme & Framework d’Orchestration Multi-Agents</strong></p>

  [![Version: 5.5.0](https://img.shields.io/badge/Version-5.5.0-7c3aed.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases)
  [![Platforms: 5 Unified](https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg)](#)
  [![Agents: 21 Specialists + 17 Teams](https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg)](#)
  [![Skills: 48 Core + 1,430+ Library](https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C430%2B%20Library-f59e0b.svg)](#)
  [![Node.js: >=18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg)](https://nodejs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

  <p>
    [🇬🇧 English](../README.md) • [🇻🇳 Tiếng Việt](./README.vi.md) • [🇨🇳 简体中文](./README.zh-CN.md) • [🇹🇼 繁體中文](./README.zh-TW.md) • [🇯🇵 日本語](./README.ja.md) • [🇰🇷 한국어](./README.ko.md) • [🇪🇸 Español](./README.es.md) • **🇫🇷 Français** • [🇩🇪 Deutsch](./README.de.md)<br/>
    [🇧🇷 Português](./README.pt-BR.md) • [🇷🇺 Русский](./README.ru.md) • [🇮🇳 हिन्दी](./README.hi.md) • [🇸🇦 العربية](./README.ar.md) • [🇮🇩 Bahasa Indonesia](./README.id.md) • [🇹🇭 ไทย](./README.th.md) • [🇹🇷 Türkçe](./README.tr.md) • [🇮🇹 Italiano](./README.it.md)
  </p>
</div>

---

## 🎬 Official Launch Trailer (Full HD 1080p)

<div align="center">
  <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_en.mp4">
    <img src="../assets/media/poster_en.png" alt="Watch BoomOpen Workflow Kit v5.5 Official Launch Trailer" width="92%" />
  </a>
  <p>
    ▶️ <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_en.mp4"><b>Watch / Stream Full HD English Trailer (MP4)</b></a>
    &nbsp;|&nbsp;
    🇻🇳 <a href="https://github.com/Kennyboom/BoomOpen-Workflow-Kit/raw/main/assets/media/boomopen_v55_trailer_vi.mp4"><b>Xem Bản Tiếng Việt</b></a>
  </p>
</div>

---

## 🌟 Qu’est-ce que BoomOpen Workflow Kit v5.5 ?

**BoomOpen Workflow Kit v5.5 (Multi-Platform Unified & Smart-Hybrid Edition)** est un système d’exploitation multi-agents open-source qui transforme un simple assistant de codage IA en une véritable organisation d’ingénierie coordonnée réunissant **21 agents spécialistes**, **17 équipes contradictoires Golden Triangle**, **48 compétences clés (Core Skills)** et **plus de 1 430 compétences spécialisées (`skills_library`)**.

Contrairement aux modèles rigides ou aux surcouches lourdes qui imposent une latence de démarrage à froid à chaque question simple, BoomOpen v5.5 introduit une **Porte de Complexité Intelligente à 2 Modes (2-Mode Smart Complexity Threshold Gate)** :
- **⚡ Mode A — Exécution Directe (Démarrage à froid 0s)** : Les questions/réponses (Q&A), explications de code, corrections de bugs mono-domaine ou modifications ciblées touchant **≤ 3 fichiers** (sans commande `/cmd`) sont exécutées, testées et vérifiées **directement** par l’agent principal dans le respect des **Standards de Code Pragmatiques à 2 Niveaux** et des **Tests & Corrections Persistants**.
- **🎻 Mode B — Orchestration Multi-Agents Stricte** : Les fonctionnalités complexes (**> 3 fichiers** ou **≥ 2 domaines**) ou les commandes explicites `/cmd` activent le mode Orchestrateur strict avec **Déploiement Parallèle DAG (Parallel Fan-Out)**, **Distribution Directe du Plan à l’Exécutant**, **Verrouillage de Fichiers par Contrat (`SHARED_CONTRACT` + `OWNED_FILES`)** et **Réutilisation à Chaud des Sous-agents (`send_message`)**.

---

## 🏗️ Architecture Hybride-Intelligente (v5.5)

```mermaid
flowchart TD
    User["👤 Requête Utilisateur / Commande Slash"] --> Gate{"🚦 Porte de Complexité à 2 Modes"}
    Gate -->|"≤ 3 fichiers, 1 domaine, sans /cmd"| ModeA["⚡ Mode A : Exécution Directe (Tier 0)<br/>Démarrage 0s + Standards Pragmatiques 2 Niveaux"]
    Gate -->|"> 3 fichiers, ≥ 2 domaines, ou /cmd"| ModeB["🎻 Mode B : Orchestrateur Multi-Agents (Tier 1)<br/>Model: inherit (Pro High par défaut)"]

    ModeB --> FanOut["🔀 Phase 1 : Déploiement Parallèle DAG<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 Phase 2 : Planification par Contrat (planner)<br/>Verrouille SHARED_CONTRACT + OWNED_FILES"]
    Plan --> Dispatch{"🎯 Variante d’Exécution"}

    Dispatch -->|":fast / :hard"| Direct["⚡ Distribution Directe Plan vers Ingénieurs<br/>(backend-engineer + frontend-engineer en parallèle)"]
    Dispatch -->|":team"| Triangle["🔺 Équipe Contradictoire Golden Triangle<br/>(TechLead ⇄ Executor ⇄ Reviewer via MAILBOX)"]

    Direct --> Verify["🧪 Phase 4 : Vérification & Réutilisation à Chaud<br/>tester + reviewer (boucle send_message 0s)"]
    Triangle --> Verify
```

---

## 🧠 Les 6 Piliers Fondamentaux de la v5.5

1. **🌐 Parité Unifiée sur 5 Plateformes (`platforms/*`)** :
   - Installation native de premier ordre pour **Google Antigravity 2.0 (Gemini)**, **Claude Code**, **OpenAI Codex**, **Cursor** et **GitHub Copilot** à partir d’une architecture unique.
2. **📏 Standards de Code Pragmatiques à 2 Niveaux (Anti-Fragmentation)** :
   - **Niveau 1 — Qualité & Sécurité Strictes (Tolérance Zéro)** : Responsabilité Unique (Single Responsibility), **AUCUN `any` explicite**, **AUCUN `console.log` de débogage oublié** en production, gestion d’erreurs typée avec `try/catch` aux frontières async/API, constantes en `SCREAMING_SNAKE_CASE`, DRY (`≥ 3`) et imports triés.
   - **Niveau 2 — Directives Structurelles Flexibles (Priorité à la Cohésion)** : Cible de `~200–350 lignes/fichier` avec un plafond souple à `~400–450 lignes` pour un module cohésif (découpage obligatoire uniquement au-delà de `>500 lignes` ou multi-domaines ; tests, types, CLI et docs exemptés). Fonctions logiques `~20–40 lignes` (`~40–80 lignes` pour UI/Handlers).
3. **🎯 Distribution Directe du Plan à l’Exécutant & Réutilisation à Chaud (`send_message`)** :
   - Dès que `PLAN-{feature}.md` existe, l’Orchestrateur assigne les tâches **directement** aux ingénieurs de domaine (`backend-engineer`, `frontend-engineer`, `database-architect`, etc.) sans étape intermédiaire `tech-lead` superflue.
   - Les sous-agents actifs sont enregistrés dans un **Registre de Sessions Actives (`Role → conversationId`)** et réutilisés via `send_message` avec **0s de latence** et **100% du contexte fichier conservé**.
4. **🤝 Distribution Parallèle par Contrat (`SHARED_CONTRACT` + `OWNED_FILES`)** :
   - Les plans multi-domaines verrouillent les endpoints API, schémas DTO et la propriété exclusive des fichiers (`OWNED_FILES` vs `READ_ONLY_FILES`) avant de lancer les ingénieurs en parallèle, éliminant tout conflit d’écriture.
5. **🔍 Débogage Cause Racine 5-Whys (SPIE v3.0) & Arbre Git 100% Propre** :
   - `debugger` analyse chaque bug via 3 hypothèses classées et une chaîne causale **5-Whys** (`Pourquoi 1 Symptôme` → `Pourquoi 5 Cause Racine Systémique`). Les artefacts transitoires (`PLAN`, `DEBUG`, `TEST`, `REVIEW`, `MAILBOX`) sont écrits dans `<appDataDir>\brain\<conversation-id>\` afin de garder l’arbre Git 100% propre.
6. **🩺 Diagnostics CLI Intégrés (`doctor` & `check`) & Index de Compétences O(1)** :
   - `npm run doctor` valide les 5 plateformes, 21 agents, 51 fichiers d’équipe, 72 commandes et `matrix-skills/compact-index.json` (`1 430+` compétences indexées). `npm run check <dir>` audite les standards de code de Niveau 1 et Niveau 2.

---

## 💻 Plateformes IA Supportées

| Plateforme | Niveau de Support | Point d’Entrée Global | Chemin d’Installation du Framework |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ Natif v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ Natif v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ Natif v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ Natif v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ Natif v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 Démarrage Rapide & Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. Installer pour votre assistant IA (choisir une plateforme ou --all)
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # All 5 platforms

# 3. Vérifier la santé de l’installation, les standards 2 niveaux et la suite de tests
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

## 🎯 Référence des Commandes Slash

| Commande | Variantes | Objectif Principal |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | Développement complet de fonctionnalité (Recherche/Scout → Plan → Code Parallèle → Test → Revue) |
| **`/code`** | `:fast`, `:hard`, `:team` | Exécuter l’implémentation directement à partir d’un `PLAN-{feature}.md` existant |
| **`/plan`** | `:fast`, `:hard`, `:team` | Créer des plans d’implémentation avec `SHARED_CONTRACT`, `OWNED_FILES` et critères Given/When/Then |
| **`/fix`** | `:fast`, `:hard`, `:team` | Résolution de bugs à la racine avec vérification obligatoire par test de régression |
| **`/debug`** | `:fast`, `:hard`, `:team` | Investigation de cause racine via 3 hypothèses + chaîne causale **5-Whys (SPIE v3.0)** (`DEBUG-{issue}.md`) |
| **`/test`** | `:fast`, `:hard`, `:team` | Exécution parallèle DAG des suites de tests + détection des cas limites non couverts (`tester` + `scouter`) |
| **`/review`** | `:fast`, `:hard`, `:team` | Audit parallèle à 4 dimensions (Architecture, Qualité du Code, Sécurité OWASP, Performance) |
| **`/design`** | `:fast`, `:hard`, `:team` | Architecture système, schéma de base de données et spécification UI/UX (`DESIGN.md`) |
| **`/docs`** | `:core`, `:business`, `:audit` | Générer ou synchroniser la documentation structurée à 2 niveaux d’architecture et métier (`./documents/`) |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | Contrôles pré-déploiement, environnements de prévisualisation, mise en production et rollback sécurisé |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | Découverte socratique des besoins, analyse des compromis et idéation |
| **`/report`** | `:fast`, `:hard`, `:team` | Rapports de synthèse exécutifs et techniques avec métriques et diagrammes |
| **`/orchestrate`** | — | Orchestration de pipelines multi-agents personnalisés à travers plusieurs domaines |
| **`/save` / `/recap`** | — | Sauvegarder l’état de session (`SESSION-HANDOVER.md`) et restaurer le contexte complet en `< 5s` |

---

## 🤖 21 Agents Spécialistes & 17 Équipes Golden Triangle

| Catégorie | Agents Spécialistes (`agents/*.md`) | Équipes Golden Triangle (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **Ingénierie & Exécution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **Architecture & Planification** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **Qualité, Sécurité & Débogage** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **Recherche & Connaissances** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📂 Structure du Dépôt

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 définitions d’Agents Spécialistes + 17 Équipes Golden Triangle (51 fichiers de rôles)
├── cli/                     # Installateur (install.js), Docteur (doctor.js), Vérificateur 2 Niveaux (checker.js) & Tests
├── commands/                # 72 workflows de commandes Slash (:fast, :hard, :team) + protocoles _ref/
├── documents/               # Documentation à 2 niveaux (Architecture, Domaine, Base de Code & Standards)
├── i18n/                    # Documentation multilingue (16 traductions complètes du README)
├── matrix-skills/           # Matrices YAML de compétences par domaine + compact-index.json précompilé (1 430+ compétences)
├── platforms/               # Modèles unifiés pour les 5 plateformes (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # Règles Mode B chargées à la demande (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Scripts Python d’automatisation et de vérification (checklist.py, verify_all.py, etc.)
├── skills/                  # 48 Compétences Clés (clean-code, debugger, plan-writing, frontend-design, etc.)
├── skills_library/          # Plus de 1 430 compétences spécialisées chargées à la demande en 2 étapes
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 Licence & Sécurité

- **Licence** : Distribué sous [Licence MIT](../LICENSE). Copyright © 2026 **Kennyboom (BoomOpen)**.
- **Politique de Sécurité** : Consultez [SECURITY.md](../SECURITY.md) pour les garde-fous de sécurité intégrés et le signalement de vulnérabilités.
