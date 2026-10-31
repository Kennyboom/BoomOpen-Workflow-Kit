---
name: skill-seeker
description: "Core skill used to search and discover the other 1,430+ niche skills stored in the library."
version: "5.5"
---

# Skill Seeker (v5.5 2-Step Fast Lookup)

The Agent has **1,430+ specialized skills** stored in the dormant skill library (`~/.{TOOL}/skills_library/`). They are not loaded into the context window by default to prevent token limit issues and context budget saturation.

## When to Use
Use this capability whenever the user asks for:
- A niche framework, tool, or library not present in the current active skills (e.g., Ansible, Terraform, specialized AI models, hardware rules, FDA compliance rules, specific language syntax like Haskell or Rust, etc.).
- A capability that you suspect exists but isn't explicitly listed in `<skills>`.

## 2-Step Fast Lookup Protocol
1. **Step 1 — Check Pre-Compiled Compact Index First**:
   - Inspect `~/.{TOOL}/skills/boomopen-workflow-kit/matrix-skills/compact-index.json` (or search by keyword in `~/.{TOOL}/skills_library/`) to locate the exact skill ID and relative path in O(1) time.
2. **Step 2 — Load Only the Matched `SKILL.md`**:
   - Read `~/.{TOOL}/skills_library/<skill-id>/SKILL.md` (where `{TOOL}` resolves to `gemini/config`, `claude`, `codex`, `cursor`, or `copilot`).
   - Apply the loaded skill's rules and patterns directly to the current task.
