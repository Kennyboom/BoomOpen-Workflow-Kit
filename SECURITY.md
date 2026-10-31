# Security Policy

## Supported Versions

Only the latest major/minor release line of **BoomOpen Workflow Kit** receives active security updates and patches:

| Version | Supported |
| ------- | --------- |
| **5.5.x** | ✅ Supported |
| **5.4.x** | ⚠️ Maintenance only |
| **< 5.4.0** | ❌ Unsupported |

---

## Built-In Security Architecture (v5.5)

1. **Destructive Command Guard Hook (`platforms/antigravity/hooks/validate-tool-call.mjs`)**:
   - Intercepts and blocks catastrophic shell operations (e.g., `rm -rf /`, recursive root deletions, unconfirmed disk formatting) before execution.
2. **Zero Telemetry & Zero Credential Storage**:
   - BoomOpen Workflow Kit operates 100% locally inside your AI coding assistant (`~/.gemini`, `~/.claude`, `~/.codex`, `~/.cursor`, `~/.copilot`). It never transmits telemetry, source code, or environment variables to external servers.
3. **Contract-First File Ownership Locks (`OWNED_FILES` vs. `READ_ONLY_FILES`)**:
   - In multi-agent workflows (Mode B), each spawned sub-agent is restricted to its assigned `OWNED_FILES` boundary and prohibited from mutating files outside its scope.
4. **Accidental Data Loss Prevention Skill (`skills/accidental-data-loss-prevention`)**:
   - Enforces explicit user confirmation before executing destructive SQL (`DROP`, `TRUNCATE`), cloud storage deletions, or infrastructure teardown commands.

---

## Reporting a Vulnerability

If you discover a security vulnerability, credential exposure risk, or unsafe command execution pattern in BoomOpen Workflow Kit:

1. **Do NOT open a public issue with exploit details.**
2. Report the finding privately via [GitHub Security Advisories](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/security/advisories/new) or open a redacted security issue at [https://github.com/Kennyboom/BoomOpen-Workflow-Kit/issues](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/issues).
3. Include:
   - Affected file path(s) and platform (`antigravity`, `claude`, `codex`, `cursor`, `copilot`)
   - Reproduction steps or proof-of-concept
   - Recommended mitigation (if known)
