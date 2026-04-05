---
description: "📊 Intelligence Report Template + Recon Steps — Referenced by docs-core.md"
version: "1.0"
type: reference
---

# Phase 1: Deep Codebase Reconnaissance — Full Protocol

## Step 1.0: PRE-FLIGHT — Mode Detection

BEFORE any scanning, check `./documents/`:

| Knowledge Area | Folder Exists | Flat File Exists | Mode |
|----------------|---------------|------------------|------|
| knowledge-overview/ | Yes/No | Yes/No | CREATE/UPDATE/MIGRATE |
| knowledge-architecture/ | Yes/No | Yes/No | CREATE/UPDATE/MIGRATE |
| knowledge-domain/ | Yes/No | Yes/No | CREATE/UPDATE/MIGRATE |
| knowledge-source-base/ | Yes/No | Yes/No | CREATE/UPDATE/MIGRATE |
| knowledge-standards/ | Yes/No | Yes/No | CREATE/UPDATE/MIGRATE |

Mode rules:
- Folder exists with sub-files → **UPDATE** (check each sub-file for staleness)
- Flat file exists (no folder) → **MIGRATE** (convert to folder structure)
- Nothing exists → **CREATE** (generate from scratch)

## Step 1.1: Structure Scan
- List all top-level directories and files
- Recursively map directory tree (depth 3-4)
- Identify entry points: `main.*`, `index.*`, `app.*`, `server.*`, `package.json`, `Dockerfile`
- **Direct-read minimum**: README*, CHANGELOG*, package.json, at least ONE entry-point file per runtime surface

## Step 1.2: Tech Stack Detection
- Parse package manifests for dependencies
- Detect frameworks from imports/config
- Identify databases from connection strings, ORM config, migration files
- Detect CI/CD and containerization

## Step 1.3: Architecture Pattern Discovery
Run targeted search passes:
- Architecture: `controller|service|repository|use-case|domain|module|adapter|middleware|handler`
- API surface: `router|route|endpoint|graphql|openapi|swagger|trpc`
- Data model: `model|schema|entity|migration|prisma|typeorm|sequelize|mongoose|sql`
- Standards: `eslint|prettier|editorconfig|commitlint|husky|lint-staged|test`

## Step 1.4: Domain Intelligence
- Locate data models, API definitions, business logic
- Map entity relationships from foreign keys, references, imports

## Step 1.5: Context-Window Optimization (Large Codebases)
- Run `bash skills/docs-core/scripts/scan-project.sh [project-root]` first
- Read selectively: config → entry points → routes → models → tests
- Use grep for pattern search instead of reading entire files

---

## Intelligence Report Template

```markdown
## Intelligence Report

### Execution Plan
| Knowledge Area | Mode | Reason |
|----------------|------|--------|
| knowledge-overview/ | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-architecture/ | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-domain/ | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-source-base/ | CREATE/UPDATE/MIGRATE | {why} |
| knowledge-standards/ | CREATE/UPDATE/MIGRATE | {why} |

### Project Scale Assessment
| Metric | Value |
|--------|-------|
| Total files | {N} |
| Total directories | {N} |
| Primary language | {lang} |
| Complexity | Small (<100) / Medium (100-500) / Large (500+) |

### Tech Stack Map
| Layer | Technology | Version | Evidence File |
|-------|-----------|---------|---------------|
| Runtime | {e.g. Node.js} | {ver} | {package.json} |
| Framework | {e.g. Next.js} | {ver} | {package.json} |
| Database | {e.g. PostgreSQL} | {ver} | {docker-compose.yml} |

### Architecture Signals
| Signal | Evidence | Pattern |
|--------|----------|---------|
| {e.g. src/controllers/} | {path} | MVC — controller layer |

### Domain Signals
| Entity/Model | Location | Type | Relationships |
|-------------|----------|------|---------------|
| {e.g. User} | {path} | ORM Model | -> Posts, -> Orders |

### API Surface
| Method | Path | Handler | Auth |
|--------|------|---------|------|
| GET | /api/users | {file:line} | {type} |

### Evidence Ledger (BLOCKING — Phase 2 uses this)
| Claim Area | Evidence Files | Confidence |
|------------|---------------|------------|
| Architecture | {paths} | High/Medium/Low |
| Domain/Data | {paths} | High/Medium/Low |
```

## Anti-Shallow Guardrails
- NEVER generate content from script output alone — must verify with direct file reads
- Each knowledge area must have at least 3 evidence files in the ledger
- If evidence is weak, explicitly state it — do NOT guess
