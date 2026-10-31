# BoomOpen Workflow Kit CLI

Command-line installer for the BoomOpen Workflow Kit v5.1 Framework.

## Overview

This CLI tool installs the BoomOpen Workflow Kit framework across supported AI coding tools. It copies agents, commands, core skills, niche skill libraries, and rules to each platform's global configuration directory while resolving platform-specific path placeholders.

## Supported Tools

| Tool            | Install Location     | Description                 |
| --------------- | -------------------- | --------------------------- |
| **Cursor**      | `~/.cursor/`         | Cursor AI Editor            |
| **Copilot**     | `~/.copilot/skills/` | GitHub Copilot in VS Code   |
| **Antigravity** | `~/.gemini/`         | Google Antigravity / Gemini |
| **Claude**      | `~/.claude/`         | Anthropic Claude CLI        |
| **Codex**       | `~/.codex/`          | OpenAI Codex CLI            |

## Installation

### Option 1: Run directly from repository

```bash
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Install for a specific tool
node cli/install.js install antigravity
node cli/install.js install cursor
node cli/install.js install copilot

# Or install for all tools
node cli/install.js install --all
```

### Option 2: Using npm scripts

```bash
npm run install:antigravity
npm run install:cursor
npm run install:copilot
npm run install:all
```

## Usage

```
Usage: boomopen <command> [options]

Commands:
  install [tool]     Install for a specific tool (cursor, copilot, antigravity, claude, codex)
  install --all      Install for all supported tools
  uninstall [tool]   Uninstall from a specific tool
  list               List supported tools and installation status
  help               Show help message
```

## What Gets Installed

### For Antigravity 2.0 (Gemini)

| Content          | Location                                                        |
| ---------------- | --------------------------------------------------------------- |
| Global Rules     | `~/.gemini/GEMINI.md` (Smart-Hybrid Mode A / Mode B Entrypoint) |
| Agent Definition | `~/.gemini/agents/AntigravityGlobal.agent.md`                   |
| Core Framework   | `~/.gemini/config/skills/boomopen-workflow-kit/`                |
| Core Skills (48) | `~/.gemini/config/skills/`                                      |
| Library (1400+)  | `~/.gemini/config/skills_library/`                              |
| Workflows        | `~/.gemini/config/skills/boomopen-workflow-kit/commands/`       |

### For Cursor

| Content        | Location                                    |
| -------------- | ------------------------------------------- |
| Global Rules   | `~/.cursor/rules/boomopen-workflow-kit.mdc` |
| Commands       | `~/.cursor/commands/`                       |
| Skills         | `~/.cursor/skills/`                         |
| Agents         | `~/.cursor/agents/`                         |
| Core Framework | `~/.cursor/skills/boomopen-workflow-kit/`   |

### For GitHub Copilot

| Content          | Location                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| Agent Definition | `~/.copilot/skills/boomopen-workflow-kit/boomopen-workflow-kit.agent.md`|
| Core Framework   | `~/.copilot/skills/boomopen-workflow-kit/`                              |
| Skills           | `~/.copilot/skills/`                                                    |
| Native Agents    | `~/.copilot/skills/agents/`                                             |

### For Claude Code

| Content        | Location                                  |
| -------------- | ----------------------------------------- |
| Global Rules   | `~/.claude/CLAUDE.md`                     |
| Commands       | `~/.claude/commands/`                     |
| Skills         | `~/.claude/skills/`                       |
| Agents         | `~/.claude/agents/`                       |
| Core Framework | `~/.claude/skills/boomopen-workflow-kit/` |

### For Codex

| Content        | Location                                                     |
| -------------- | ------------------------------------------------------------ |
| Global Rules   | `~/.codex/AGENTS.md` (primary), `~/.codex/CODEX.md` (compat) |
| Commands       | `~/.codex/commands/`                                         |
| Skills         | `~/.codex/skills/`                                           |
| Agents         | `~/.codex/agents/`                                           |
| Core Framework | `~/.codex/skills/boomopen-workflow-kit/`                     |

## Requirements

- Node.js 18.0.0 or higher
- Write permissions to home directory

## License

MIT License - Part of the BoomOpen Workflow Kit Framework.
