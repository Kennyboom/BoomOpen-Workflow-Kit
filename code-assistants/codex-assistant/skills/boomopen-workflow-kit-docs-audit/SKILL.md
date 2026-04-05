---
name: boomopen-workflow-kit-docs-audit
description: "ðŸ”’ Audit Docs â€” Security and compliance documentation. Use when user types /docs:audit."
---

# /docs:audit

> Activates BoomOpen Workflow Kit `/docs:audit` workflow.

## Rules

1. **Load first**: `~/.codex/skills/boomopen-workflow-kit/rules/CORE.md` â€” follow all 10 Laws
2. **Agents**: Spawn via Codex native multi-agent (`~/.codex/agents/`)
3. **Skills**: Resolve from `~/.codex/skills/boomopen-workflow-kit/matrix-skills/`

## Workflow

**Load and follow**: `~/.codex/skills/boomopen-workflow-kit/commands/docs-audit.md`
