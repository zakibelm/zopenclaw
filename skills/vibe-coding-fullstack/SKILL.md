---
name: vibe-coding-fullstack
version: 1.0.0
description: Full-stack vibe coding solution - from idea to deployed production. Creates, tests, versions (GitHub), and deploys complete applications using multi-agent orchestration.
triggers:
  - "vibe coding"
  - "fullstack"
  - "créer une app"
  - "déployer"
  - "github repo"
  - "end-to-end"
  - "complete solution"
  - "from scratch"
---

# Vibe Coding Full-Stack 🚀

## Philosophy

**Vibe coding** = Décrire ce que tu veux en langage naturel, laisser les agents coder, tester, déployer.

**Cette skill orchestre tout le pipeline** : Architecture → Code → Tests → GitHub → Déploiement

---

## Architecture Multi-Agent

```
┌─────────────────────────────────────────────────────────┐
│           VIBE CODING ORCHESTRATOR (You)                │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │   agent-    │ │   agent-    │ │   agent-    │       │
│  │   architect │ │   frontend  │ │   backend   │       │
│  │   (Qwen3)   │ │   (Qwen3)   │ │   (Qwen3)   │       │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘       │
│         │                │                │              │
│         └────────────────┼────────────────┘              │
│                          ↓                               │
│              ┌─────────────────┐                        │
│              │ agent-code-     │                        │
│              │ reviewer        │                        │
│              │ (DeepSeek)      │                        │
│              └────────┬────────┘                        │
│                       ↓                                  │
│              ┌─────────────────┐                        │
│              │ agent-devops    │                        │
│              │ (Qwen3)         │                        │
│              └────────┬────────┘                        │
└───────────────────────┼─────────────────────────────────┘
                        ↓
                ┌───────────────┐
                │ Git + Deploy  │
                └───────────────┘
```

---

## Phase 1: Discovery & Architecture 🎯

### 1.1 Collecter les besoins

```yaml
Questions essentielles:
  - Quel type d'application ? (web, mobile, API, SaaS...)
  - Stack préféré ? (Next.js, React, Vue, Node, Python...)
  - Base de données ? (PostgreSQL, MongoDB, Redis...)
  - Auth ? (Clerk, Auth0, JWT custom...)
  - Où déployer ? (Vercel, Railway, Render, AWS...)
  - Tests ? (Unit, E2E, intégration...)
  - Budget/temps ? (MVP rapide vs production)
```

### 1.2 Générer l'Architecture

**Spawn**: `agent-frontend-coder` ou `agent-backend-coder` selon complexité

```javascript
// Exemple de spawn pour architecture
const architecture = await sessions_spawn({
  agentId: "agent-frontend-coder",
  task: `Conception architecture pour: [description app]
  
  OUTPUT JSON:
  {
    "appName": "string",
    "type": "web|mobile|api|fullstack",
    "frontend": {
      "framework": "nextjs|react|vue",
      "styling": "tailwind|css-modules|styled",
      "state": "zustand|redux|context|react-query"
    },
    "backend": {
      "runtime": "nodejs|python|bun",
      "framework": "express|fastify|fastapi|next-api",
      "database": "postgresql|mongodb|sqlite"
    },
    "auth": "clerk|auth0|jwt|none",
    "deployment": "vercel|railway|render|aws",
    "testing": ["vitest", "playwright", "jest"],
    "features": ["liste des features principales"],
    "fileStructure": { "tree des fichiers clés" }
  }`,
  timeoutSeconds: 120
});
```

---

## Phase 2: Génération Code 📝

### 2.1 Frontend

**Agent**: `agent-frontend-coder` (Qwen3-Coder-Next)

```bash
Stack recommandés:
• Next.js 14+ + Tailwind + shadcn/ui    ← Défaut
• React + Vite + Tailwind                 ← SPA simple
• Vue + Nuxt                            ← Alternative Vue
```

**Pattern de génération**:
1. **Router** → Layout + Navigation
2. **Pages** → Composants principaux
3. **Composants** → UI réutilisable
4. **Hooks** → Logique métier
5. **Types** → TypeScript interfaces

### 2.2 Backend

**Agent**: `agent-backend-coder` (Qwen3-Coder-Next)

```bash
Stacks recommandés:
• Next.js API Routes + Prisma + PostgreSQL  ← Fullstack Next
• Express + TypeScript + PostgreSQL         ← API séparée
• FastAPI + SQLAlchemy + PostgreSQL         ← Python

Services essentiels:
• Database layer (Prisma/TypeORM/Drizzle)
• Auth middleware
• Routes API RESTful / GraphQL
• Validation (Zod/Yup/Joi)
• Error handling
```

### 2.3 Database

**Agent**: `agent-database-coder` (Qwen3-Coder-Next)

```yaml
Tâches:
  - Schema Prisma/TypeORM (models, relations)
  - Migrations initiales
  - Seed data pour dev
  - Queries optimisées
  - Indexes stratégiques
```

---

## Phase 3: Review & Qualité 🔍

### 3.1 Code Review Multi-aspect

**Agent**: `agent-code-reviewer` (DeepSeek - Supervisor)

```javascript
const review = await sessions_spawn({
  agentId: "agent-code-reviewer",
  task: JSON.stringify({
    code: { frontend, backend, database },
    checks: [
      "security",
      "performance", 
      "maintainability",
      "accessibility",
      "type-safety",
      "tests-coverage"
    ]
  }),
  timeoutSeconds: 180
});

// Decision: approved (score >= 80) → continue
//           rejected (issues.critical > 0) → fix
```

### 3.2 Correction automatique

Si non approuvé, fix par l'agent d'origine + re-review (max 3 cycles).

---

## Phase 4: Tests 🧪

### 4.1 Test Strategy

| Type | Outil | Agent |
|------|-------|-------|
| Unit | Vitest/Jest | Agent d'origine |
| Integration | Vitest + test DB | agent-backend-coder |
| E2E | Playwright | agent-frontend-coder |
| API | Supertest/Pytest | agent-backend-coder |

### 4.2 Pattern TDD (optionnel)

```
RED → GREEN → REFACTOR
Tests d'abord → Code minimal → Optimisation
```

Activer si l'utilisateur veut une qualité "entreprise".

---

## Phase 5: GitHub & Versioning 🌐

### 5.1 Création Repo

```javascript
// Via GitHub CLI ou MCP
const repo = await exec({
  command: `gh repo create ${appName} \\
    --public \\
    --description "${description}" \\
    --add-readme`
});
```

### 5.2 Structure Git

```
main                    → Production
├── develop            → Intégration
├── feature/*          → Nouvelles features
└── hotfix/*           → Fixes urgents
```

### 5.3 CI/CD GitHub Actions

**Agent**: `agent-devops-coder`

Créer workflows pour:
- ✅ Tests auto sur PR
- 🔒 Security scanning
- 🚀 Deploy auto (main → prod, develop → staging)
- 📊 Coverage reporting

```yaml
// .github/workflows/ci.yml
name: CI + Deploy
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:ci
      - run: npm run build
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: test
    steps:
      - run: npm run deploy:prod
```

---

## Phase 6: Déploiement 🚀

### 6.1 Platform Matrix

| Plateforme | Type | Commande |
|------------|------|----------|
| **Vercel** | Frontend (Next.js) | `vercel --prod` |
| **Railway** | Fullstack/Backend | `railway up` |
| **Render** | API + DB | `render deploy` |
| **Docker** | Auto-hébergement | `docker-compose up` |
| **AWS** | Scale entreprise | CDK/SAM |

### 6.2 Environment Variables

```bash
# .env.production
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
GITHUB_CLIENT_ID=...
API_BASE_URL=https://api...
```

### 6.3 Health Checks

```bash
# Post-deploy verification
curl https://app.vercel.app/api/health
echo "✅ Déploiement OK"
```

---

## Phase 7: Monitoring & Feedback 📊

### 7.1 Observability

```yaml
À configurer:
  - Logging structuré (Winston/Pino)
  - Error tracking (Sentry)
  - Analytics (PostHog/Plausible)
  - Uptime monitoring (BetterUptime)
```

### 7.2 Runbook

Créer `RUNBOOK.md` avec:
- Architecture diagram
- Variables d'env
- Commandes de debug
- Rollback procedure

---

## Workflows Prédéfinis ⚡

### Workflow A: MVP Rapide (1-2h)

```
1. Architecture simple (chat)
2. Next.js + Tailwind + SQLite
3. Tests basiques
4. GitHub public
5. Vercel auto-deploy
```

### Workflow B: Production (2-4h)

```
1. Architecture détaillée (agent-architect)
2. Next.js + PostgreSQL + Prisma
3. Tests complets (unit + E2E)
4. Code review (DeepSeek)
5. GitHub + Actions
6. Railway/Vercel + monitoring
```

### Workflow C: Scale Entreprise (1-2j)

```
1. Multi-agents parallèles (frontend/backend/DB)
2. Microservices / multi-repo
3. Tests exhaustive + coverage minimale
4. Security audit
5. CI/CD multi-env (dev/staging/prod)
6. Docker + k8s / AWS
```

---

## Commandes Utilisateur 🎮

### Usage simple

```
"Je veux une todo app en Next.js"
→ Détecte SKILL → Lance workflow MVP

"Crée-moi un SaaS complet avec auth"
→ Détecte complexity → Lève niveau

"Vibe code une app de réservation"
→ Extrapole features → Architecture → Code → Deploy
```

### Paramètres de contrôle

| Option | Description |
|--------|-------------|
| `--quick` | Skip tests/review, MVP only |
| `--strict` | Full TDD + review obligatoire |
| `--staging` | Deploy sur staging, pas prod |
| `--private` | Repo GitHub privé |

---

## Error Handling & Recovery 🛡️

### Si agent échoue

```
1. Retry with clearer prompt (max 2x)
2. Fallback to simpler approach
3. Escalate to human if needed
```

### Si déploiement échoue

```
1. Check logs via `exec`
2. Fix config/env
3. Retry deploy
4. Rollback si critique
```

---

## Exemple Complet 💻

```yaml
# User request: "Vibe code une app de notes collaborative"

Step 1 - Architecture:
  Type: Real-time collaborative notes
  Stack: Next.js + Socket.io + PostgreSQL + Prisma
  Auth: Clerk
  Deploy: Vercel (frontend) + Railway (API + DB)

Step 2 - Generate:
  Frontend: Dashboard, Note editor (TipTap), Sharing UI
  Backend: WebSocket server, CRUD API, Auth hooks
  Database: User, Note, Collaboration tables

Step 3 - Review:
  Agent-code-reviewer: Score 85 ✅
  Issues mineures: 2 warnings → Auto-fix

Step 4 - Tests:
  Unit: 45 tests ✅
  E2E: 5 flows critiques ✅

Step 5 - GitHub:
  Repo: github.com/user/collab-notes
  Actions: CI + Preview deploys ✅

Step 6 - Deploy:
  Staging: ✅ Testé
  Prod: ✅ Live!

Step 7 - Runbook:
  → Documentation complète créée
```

---

## Agents Associés 🎯

| Agent | Rôle | Quand l'utiliser |
|-------|------|-----------------|
| `agent-frontend-coder` | UI/UX | Pages, composants, styles |
| `agent-backend-coder` | API/Logic | Routes, services, auth |
| `agent-database-coder` | Data | Schema, queries, migrations |
| `agent-devops-coder` | Infra | Docker, CI/CD, config |
| `agent-code-reviewer` | QA | Review après génération |
| `agent-architect` | Design | Complex apps, microservices |

---

## Ressources 📚

- `/docs/vibe-coding-examples/` - Templates ready-to-use
- `/agents/` - Configs agents optimisées
- `/workflows/` - Workflows pré-configurés

---

## Métriques Success 🏆

| Mesure | Target |
|--------|--------|
| Time to MVP | < 2h |
| Code review score | >= 80 |
| Test coverage | > 70% |
| Deploy success | > 95% |
| User satisfaction | 😊🎉 |

---

**Version**: 1.0.0  
**Author**: OpenClaw Community  
**License**: MIT
