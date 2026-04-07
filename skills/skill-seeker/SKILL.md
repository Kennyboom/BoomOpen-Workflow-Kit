---
name: skill-seeker
description: "Core skill used to search and discover the other 1400+ niche skills stored in the library."
---

# Skill Seeker

The Agent has 1400+ specialized skills stored in a dormant library. They are not loaded into the context window by default to prevent token limit issues and context budget saturation.

## When to use
Use this capability whenever the user asks for:
- A niche framework, tool, or library not present in the current active skills (e.g., Ansible, Terraform, specialized AI models, hardware rules, FDA compliance rules, specific language syntax like Haskell or Rust, etc.).
- A capability that you suspect exists but isn't explicitly listed in `<skills>`.

## How to use
The dormant skills are located at:
`C:\Users\Kelly Clark\.gemini\antigravity\skills_library\`

1. Use the `grep_search` tool searching in `C:\Users\Kelly Clark\.gemini\antigravity\skills_library` to find relevant skills.
2. Search for the specific keyword (e.g., `ansible` or `fda` or `seo`).
3. Once you identify a matching skill directory, read the `SKILL.md` inside that directory to load its rules into your working memory.
4. Apply the rules exactly as if they were natively loaded in the context window.
