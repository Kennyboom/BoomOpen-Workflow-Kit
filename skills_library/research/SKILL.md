---
name: research
description: "Technical & Market Intelligence Search Engineering Playbook (2026). Multi-wave query crafting, domain-scoped operator patterns, quantitative benchmark extraction, cross-source verification, and zero-hallucination citation standards."
license: MIT
version: "5.5.0"
---

# 🧭 Technical & Market Intelligence Search Engineering Playbook (2026)

> **Strategic Search Query Engineering & Evidence Synthesis**
> Transform vague questions into high-signal, multi-wave search campaigns that extract verifiable 2026 technical specifications, quantitative benchmarks, and competitive market intelligence.

---

## 1. Core Principles (2026 Research Standard)

1. **No Arbitrary Tool-Call Caps**: Execute as many targeted `search_web` waves as needed to achieve high-confidence triangulation (`Wave 1 Discovery` → `Gap Reflection` → `Wave 2 Deep Dive` → `Wave 3 Adversarial Red-Team`).
2. **Primary Sources Over SEO Aggregators**: Prioritize vendor documentation, W3C/IETF RFCs, GitHub repositories, peer-reviewed papers (arXiv), and first-party engineering blogs over generic SEO content farms.
3. **2025–2026 Temporal Anchoring**: Always anchor queries to current 2025–2026 releases, changelogs, and benchmarks unless historical context is explicitly requested.
4. **Quantitative Over Qualitative**: Replace vague adjectives (*"fast"*, *"scalable"*, *"popular"*) with concrete metrics (`p99 latency`, `req/sec`, `MB RSS memory`, `GitHub stars/weekly npm downloads`, `$/1M tokens`).

---

## 2. Advanced Search Query Engineering Matrix

Craft surgical `search_web` queries using domain filters, exact-phrase quotes, and boolean operators:

| Research Objective | Query Construction Pattern | `domain` Parameter |
|--------------------|----------------------------|--------------------|
| **Official API & Config Schema** | `"<library>" "<function/config>" specification OR reference 2026` | `<official-docs-domain>` |
| **Breaking Changes & Migrations** | `"<library>" ("breaking changes" OR "migration guide" OR "deprecated") v<X> 2025 2026` | `github.com` or vendor domain |
| **Head-to-Head Benchmark** | `"<tech A>" vs "<tech B>" benchmark (latency OR throughput OR p99 OR memory) 2025 2026` | *(open or benchmark domain)* |
| **Production Post-Mortem / Case Study** | `"<tech>" ("post-mortem" OR "production lessons" OR "why we migrated" OR "at scale")` | *(engineering blogs)* |
| **Security Advisories & CVEs** | `"<package>" (CVE-2025 OR CVE-2026 OR GHSA OR "security advisory" OR vulnerability)` | `github.com` or `nvd.nist.gov` |
| **Market & Pricing Teardown** | `"<product/competitor>" pricing tiers limits enterprise unit economics 2026` | `<competitor-domain>` |
| **AI/LLM Model Capabilities & Cost** | `"<model-name>" context window pricing benchmark SWE-bench LMArena 2026` | `artificialanalysis.ai` |
| **Game Engine & Graphics Perf** | `"<Unity 6 / Godot 4 / WebGPU>" ("draw calls" OR "ECS" OR "frame time" OR "memory") benchmark` | *(engine docs / forums)* |

---

## 3. Multi-Wave Query Execution Protocol

### Phase 1: Query Decomposition (Before Calling `search_web`)
Break every complex user request into **3 distinct sub-questions**:
- **Sub-Question A (Architecture & Official Spec)**: What is the canonical 2026 way to build or configure this?
- **Sub-Question B (Empirical Performance & Economics)**: What are the measurable latency, resource, and cost trade-offs?
- **Sub-Question C (Failure Modes & Edge Cases)**: What breaks under load, edge inputs, or version upgrades?

### Phase 2: Parallel Multi-Query Dispatch
Launch `3–4` orthogonal `search_web` calls in Wave 1 rather than variations of the same phrase:
- **Bad (Redundant & Low-Signal)**:
  - `best react state management`
  - `top state management libraries react`
- **Good (Orthogonal 2026 Engineering Queries)**:
  - `React 19 Next.js 15 Server Actions vs TanStack Query v5 state architecture 2026`
  - `Zustand v5 vs Jotai bundle size re-render benchmark React 19`
  - `site:github.com/pmndrs/zustand releases breaking changes v5`

### Phase 3: Conflict Resolution & Cross-Verification
When two sources disagree (e.g., different API signatures or conflicting benchmarks):
1. **Check Release Dates & Version Numbers**: A 2026 release note overrides a 2023 blog post 100% of the time.
2. **Check Source Authority Hierarchy**:
   - **Rank 1**: Local installed SDK `.d.ts` / source files & official GitHub repo (`main` branch / release tags)
   - **Rank 2**: Official vendor documentation & `/llms.txt` specifications
   - **Rank 3**: Reproducible, open-source benchmark suites & CVE databases
   - **Rank 4**: First-party engineering post-mortems (Cloudflare, Stripe, Discord, Netflix, Figma, Vercel)
   - **Rank 5**: Community tutorials, forums, and secondary blog posts
3. **Document the Discrepancy Explicitly**: Note why older tutorials fail (e.g., *"Pre-v4 tutorials use `tailwind.config.js`, which was replaced by `@theme` in Tailwind v4.0"*).

---

## 4. Quantitative Evidence Extraction Checklist

For every candidate technology, architecture, or product option evaluated, extract at least **4 quantitative data points**:
- [ ] **Version & Release Cadence**: Latest stable version + date of most recent release.
- [ ] **Performance Metric**: Latency (`p50`/`p95`/`p99`), throughput (`ops/sec`), cold-start time, or bundle size (`kB gzipped`).
- [ ] **Ecosystem Health**: Weekly downloads, active maintainers, GitHub stars/issues velocity, or enterprise backing.
- [ ] **Economic / Operational Cost**: Licensing (MIT/Apache-2.0 vs. BSL/Proprietary), cloud/token unit cost, or infrastructural complexity.

---

## 5. High-Signal Report Structure & Decision Synthesis

Structure research outputs so engineers and product leads can act immediately:

```markdown
# 🧭 Research Synthesis: [Topic]
**Date**: YYYY-MM-DD | **Scope**: [Technical / Market / Hybrid] | **Confidence**: [HIGH / MEDIUM / LOW]

## 1. Executive Summary & Decision Verdict
- **Recommended Choice**: [Option Name + Version]
- **Core Rationale**: [3 concise, evidence-backed reasons]
- **Disqualifiers / When to Choose Alternative**: [Explicit trade-off boundary]

## 2. Quantitative Comparison Matrix
| Dimension | Option A | Option B | Option C | Verified Source |
|-----------|----------|----------|----------|-----------------|
| Latest Stable Version | `...` | `...` | `...` | GitHub Releases (2026) |
| Performance / Latency | `...` | `...` | `...` | Benchmark / Docs |
| License & Cost Model | `...` | `...` | `...` | Vendor Pricing / Repo |
| Lock-in & Migration Risk | `...` | `...` | `...` | Architecture Review |

## 3. Technical Architecture & Verified Code Patterns
[Mermaid architecture diagram + minimal, copy-pasteable 2026 code/configuration snippet]

## 4. Production Risks, Security & Breaking Changes
- **Known Pitfalls / CVEs**: [Specific failure modes and mitigations]
- **Deprecation Warnings**: [APIs to avoid in 2026]

## 5. Sources & Audit Trail
- [1] `[Tier 3]` Official Docs / Release Notes — `<domain/url>`
- [2] `[Tier 4]` Benchmark / Engineering Post-Mortem — `<domain/url>`
```

---

## 6. Zero-Hallucination Citation & Reporting Standards

1. **Inline Evidence Attribution**: Tag key facts with their source tier and domain/URL (e.g., `[Source: Cloudflare Workers Docs, 2026]`).
2. **Confidence Grading**:
   - **`[HIGH]`**: Verified across `≥ 2` authoritative sources (e.g., Official Docs + Local SDK/GitHub Release).
   - **`[MEDIUM]`**: Verified in 1 authoritative source or multiple independent engineering reports.
   - **`[LOW — Unverified]`**: Inferred or single secondary source; must be flagged for prototype verification.
3. **Actionable Decision Tables**: Every research synthesis must culminate in a weighted **Trade-Off & Decision Matrix** and a concrete **Step-by-Step Implementation Plan**.
4. **Clean Artifact Routing**: Save transient research reports to `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` by default; write to `./reports/{topic}/` only when explicitly requested by the user or `/docs`.

---

## 7. Worked Playbook: 3-Wave Technical & Market Intelligence Campaign

### Scenario: Evaluating Real-Time Multiplayer / Collaborative Sync Engines in 2026
1. **Wave 1 — Broad & Official Spec Discovery (`3 queries`)**:
   - `search_web(query: "Cloudflare Durable Objects WebSockets Hibernation API pricing limits 2026", domain: "developers.cloudflare.com")`
   - `search_web(query: "Liveblocks vs PartyKit vs Yjs Hocuspocus vs Supabase Realtime architecture 2026")`
   - `search_web(query: "Colyseus 0.15 vs Hathora multiplayer state sync benchmark latency")`
2. **Gap Reflection Gate**:
   - *Unknowns identified*: What is the exact memory ceiling per Cloudflare Durable Object isolate, and how does WebSocket hibernation billing compare at 50,000 concurrent connections?
3. **Wave 2 — Multi-Hop Internals & Quantitative Benchmarks (`3 queries`)**:
   - `search_web(query: "Durable Objects 128MB memory limit WebSocket hibernation billing duration 2026", domain: "developers.cloudflare.com")`
   - `search_web(query: "Yjs CRDT memory overhead large documents garbage collection benchmark")`
   - `search_web(query: "site:github.com/colyseus/colyseus/releases v0.15 v0.16 schema delta compression", domain: "github.com")`
4. **Wave 3 — Adversarial Counter-Evidence & Failure Modes (`2 queries`)**:
   - `search_web(query: "\"Durable Objects\" (\"single thread bottleneck\" OR \"rate limit\" OR \"cold start\" OR \"post-mortem\")")`
   - `search_web(query: "Yjs CRDT out of memory OR sync conflict production post-mortem")`

---

## 8. Final Quality Gate Checklist

- [ ] **Multi-Wave Executed?** At least 2–3 distinct search waves (`Discovery` → `Deep Dive` → `Adversarial`) were executed.
- [ ] **Quantitative Metrics Present?** Includes concrete latency, memory, throughput, or pricing numbers rather than vague claims.
- [ ] **2025–2026 Currency Verified?** No outdated pre-2025 syntax or deprecated packages are recommended.
- [ ] **Counter-Evidence Addressed?** Explicit failure modes, lock-in risks, and "When NOT to use" boundaries are documented.
- [ ] **Audit Trail Complete?** Every key claim maps to a verified Tier 1–4 source in the report's audit table.

### Related Research & Discovery Skills
- **`deep-research` (`skills/deep-research/SKILL.md`)**: Full 4-Source Triangulation, 3-Wave Iterative Multi-Hop Loop, Stanford STORM 3-vector fan-out, and Dual-Track 5-Lens report schema.
- **`docs-seeker` (`skills_library/docs-seeker/SKILL.md`)**: Autonomous `/llms.txt`, official vendor documentation, GitHub release/changelog, and local `.d.ts` type-definition hunter.
- **`brainstorming` (`skills/brainstorming/SKILL.md`)**: Socratic discovery, Golden Triangle adversarial ideation (`/brainstorm:team`), and product/architecture option matrices.
- **`skill-seeker` (`skills/skill-seeker/SKILL.md`)**: Fast 2-step lookup across `matrix-skills/compact-index.json` (`1,471+` domain skills).

> **Remember**: Great engineering and product decisions come from triangulated, quantitative evidence—never from first-page SEO summaries.
