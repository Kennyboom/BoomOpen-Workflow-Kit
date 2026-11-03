---
description: "🎛️ Settings & Control Center — Configure BoomOpen presets, Mode A/B threshold, auto_team NL research trigger, model policy, and coding standards across all 5 platforms."
version: "5.5"
category: configuration
execution-mode: execute
aliases: [config]
---

# /settings (`/config`) — Unified Settings & Control Center (v5.5)

> **DIRECTIVE**: Manage BoomOpen's 2-tier settings (`~/.boomopen/settings.json` Global & `./.boomopen.json` Workspace) and hot-sync the active `<!-- BOOMOPEN-SETTINGS-START --> ... <!-- BOOMOPEN-SETTINGS-END -->` block across all 5 platforms (`Antigravity`, `Claude Code`, `OpenAI Codex`, `Cursor`, `GitHub Copilot`) in `< 10ms`.

<arguments>$ARGUMENTS</arguments>

---

## 🛠️ CLI ENGINE RESOLUTION

Resolve `<SETTINGS_CLI>` to the first available path:
1. `./cli/install.js` (if running inside the `BoomOpen-Workflow-Kit` repository)
2. `~/.gemini/config/skills/boomopen-workflow-kit/cli/install.js` (Antigravity)
3. `~/.{TOOL}/skills/boomopen-workflow-kit/cli/install.js` (`claude`, `codex`, `cursor`, `copilot`)
4. `npx @boomopen/workflow-kit` (global fallback)

---

## ⚡ MODE 1: FAST-TRACK ARGUMENT EXECUTION (When `$ARGUMENTS` is provided)

If the user passes subcommands or flags in `<arguments>`, execute immediately **without** asking questions:

| User Input | CLI Command to Execute |
|:-----------|:-----------------------|
| `/settings status` | `node <SETTINGS_CLI> settings status` |
| `/settings preset <smart-hybrid\|solo-fast\|deep-architect\|adversarial-team> [--project]` | `node <SETTINGS_CLI> settings preset <name> [--project]` |
| `/settings mode <auto\|mode_a\|mode_b\|team> [--project]` | `node <SETTINGS_CLI> settings set execution.mode <mode> [--project]` |
| `/settings get [dotted.key] [--json]` | `node <SETTINGS_CLI> settings get [dotted.key] [--json]` |
| `/settings set <dotted.key> <value> [--project]` | `node <SETTINGS_CLI> settings set <dotted.key> <value> [--project]` |
| `/settings reset [--project]` | `node <SETTINGS_CLI> settings reset [--project]` |
| `/settings ui [--port 4567]` or `/settings --ui` | `node <SETTINGS_CLI> settings --ui [--port 4567]` |

After running the CLI command, display the updated **Active Settings Summary Table** and confirm which platform entrypoints were hot-synced (`< 10ms`).

---

## 💬 MODE 2: INTERACTIVE CONTROL PANEL (When `$ARGUMENTS` is empty)

When the user types `/settings` (or `/config`) with no arguments, or asks in natural language to open/change BoomOpen settings:

### Step 1 — Inspect & Display Current Active Settings
Run `node <SETTINGS_CLI> settings status` (or read `~/.boomopen/settings.json` + `./.boomopen.json`) and render the **Active Settings Status Table**:

```markdown
### 🎛️ BoomOpen Control Center (v5.5.0)
| Category | Setting Key | Active Value | Description |
|:---------|:------------|:-------------|:------------|
| **Preset & Scope** | `preset` / `scope` | `⚡ smart-hybrid` (`global`) | Active profile & persistence tier (`global` or `project`) |
| **1. Orchestration** | `execution.mode` | `auto` | `auto` (`≤3` files Mode A) \| `mode_a` \| `mode_b` \| `team` |
| **1. Orchestration** | `execution.modeAThresholdFiles` | `3` | Max files for Mode A direct execution (`1` \| `3` \| `5` \| `10`) |
| **1. Orchestration** | `workflows.defaultVariant` | `auto` | Default `/cmd` variant (`auto` \| `fast` \| `hard` \| `team` \| `ask`) |
| **1. Orchestration** | `workflows.naturalLanguageResearchTrigger` | `auto_team` | NL research/ideation → `/brainstorm:team` (`auto_team` \| `auto_hard` \| `ask_first` \| `off`) |
| **2. Intelligence** | `models.subagentPolicy` | `quality_first` | `quality_first` (`inherit` Pro High) \| `strict_inherit` \| `balanced_speed` |
| **2. Intelligence** | `research.depth` | `5_lens_deep` | `5_lens_deep` \| `standard` \| `quick_brief` |
| **2. Intelligence** | `clarification.style` | `autonomous_first` | `autonomous_first` \| `interactive_ask` \| `zero_questions` |
| **2. Intelligence** | `teams.maxDebateRounds` | `3` | Max Golden Triangle debate rounds (`1` \| `2` \| `3`) |
| **3. Standards** | `codingStandards.preset` | `pragmatic` | `pragmatic` (`400/500`) \| `strict` (`300/400`) \| `relaxed` (`600/800`) |
| **3. Standards** | `verification.level` | `strict_e2e` | `strict_e2e` \| `fast_check` \| `manual` |
| **4. Deliverables** | `deliverables.routing` | `brain_artifacts` | `brain_artifacts` \| `workspace_reports` \| `both` |
| **4. Deliverables** | `language.response` | `auto` | `auto` \| `vi` \| `en` \| `ja` \| `ko` \| `zh-CN` |
```

### Step 2 — Launch Native Interactive `ask_question` UI Widget
Invoke the platform's native **`ask_question`** tool (or numbered Markdown menu if `ask_question` is unavailable) with these structured choices:

1. **Question 1 — Preset Profile or Execution Mode**:
   - `⚡ Preset: smart-hybrid (Default: Mode A ≤3 files, NL Research → /brainstorm:team)`
   - `🚀 Preset: solo-fast (Force Mode A Direct Execution, :fast variant, relaxed 600/800 lines)`
   - `🧠 Preset: deep-architect (Force Mode B Orchestrator, :hard variant, strict 300/400 lines)`
   - `🔺 Preset: adversarial-team (Force Golden Triangle :team on all workflows, strict E2E)`
   - `🛠️ Custom: Keep current preset and customize individual settings below`

2. **Question 2 — Natural-Language Research Trigger & Default Variant**:
   - `🔺 NL Research → auto_team (/brainstorm:team Golden Triangle) + Variant: auto (Recommended Default)`
   - `🧠 NL Research → auto_hard (/brainstorm:hard 5-Lens) + Variant: hard`
   - `❓ NL Research → ask_first (Ask before launching research subagents) + Variant: ask`
   - `⚡ NL Research → off (Direct chat reply unless /brainstorm is typed) + Variant: fast`

3. **Question 3 — Coding Standards, Model Policy & Control Surface**:
   - `📏 Pragmatic (400/500 lines) + Quality-First (inherit) + Brain Artifacts (Clean Git)`
   - `🛡️ Strict (300/400 lines) + Strict Inherit + Workspace Reports (./reports/{topic}/)`
   - `🧪 Relaxed (600/800 lines) + Balanced Speed + Brain Artifacts`
   - `🌐 Launch Local Web Control Center UI (http://127.0.0.1:4567)`

### Step 3 — Persist & Hot-Sync Across All 5 Platforms (`< 10ms`)
1. Translate the user's selections into CLI calls:
   - Preset selected → `node <SETTINGS_CLI> settings preset <preset-name>`
   - Custom overrides → `node <SETTINGS_CLI> settings set <key> <value>`
   - Web UI selected → `node <SETTINGS_CLI> settings --ui`
2. Output a concise confirmation showing the saved file (`~/.boomopen/settings.json` or `./.boomopen.json`), the synced platforms (`GEMINI.md`, `CLAUDE.md`, `CODEX.md`, `CURSOR.md`, `COPILOT.md`), and the active settings summary.

---

## 📦 FOUR BUILT-IN PRESET PROFILES (REFERENCE)

| Setting Key | `smart-hybrid` (Default) | `solo-fast` | `deep-architect` | `adversarial-team` |
|:------------|:------------------------:|:-----------:|:----------------:|:------------------:|
| `execution.mode` | `auto` | `mode_a` | `mode_b` | `team` |
| `execution.modeAThresholdFiles` | `3` | `10` | `1` | `1` |
| `workflows.defaultVariant` | `auto` | `fast` | `hard` | `team` |
| `workflows.naturalLanguageResearchTrigger` | **`auto_team`** | `off` | `auto_hard` | **`auto_team`** |
| `models.subagentPolicy` | `quality_first` | `balanced_speed` | `strict_inherit` | `strict_inherit` |
| `research.depth` | `5_lens_deep` | `quick_brief` | `5_lens_deep` | `5_lens_deep` |
| `clarification.style` | `autonomous_first` | `zero_questions` | `interactive_ask` | `interactive_ask` |
| `teams.maxDebateRounds` | `3` | `1` | `3` | `3` |
| `codingStandards.preset` | `pragmatic` (`400/500`) | `relaxed` (`600/800`) | `strict` (`300/400`) | `strict` (`300/400`) |
| `verification.level` | `strict_e2e` | `fast_check` | `strict_e2e` | `strict_e2e` |
| `deliverables.routing` | `brain_artifacts` | `brain_artifacts` | `brain_artifacts` | `both` |
| `language.response` | `auto` | `auto` | `auto` | `auto` |
