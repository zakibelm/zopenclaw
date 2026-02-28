# 🚀 Vibe Coding Full-Stack

> **De l'idée à la production en quelques heures.**

## 🎯 Qu'est-ce que c'est ?

Une solution **end-to-end** pour créer, tester, versionner et déployer des applications full-stack avec un minimum d'effort manuel.

**Workflow**:  
`Ton idée → Agents IA → Code → Tests → GitHub → Production`

---

## ⚡ Quick Start

```bash
# 1. Décrire ton projet
"Je veux une app de todo collaborative"

# 2. Choisir ton niveau
├── MVP Rapide (1-2h)      → Next.js + SQLite + Vercel
├── Production (4-8h)       → Tests + Review + CI/CD  
└── Scale (1-2j)          → Microservices + k8s

# 3. Laisser les agents travailler
🤖 agent-frontend  → UI/UX
🤖 agent-backend   → API/Logic
🤖 agent-database  → Data
🤖 agent-reviewer  → QA/Security
🤖 agent-devops    → Deploy
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           TOI (User)                            │
│  "Je veux une app de notes"                      │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│      VIBE CODING ORCHESTRATOR                   │
│         (This Skill)                            │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ Frontend│  │ Backend │  │ Database│         │
│  │ (Qwen3) │  │ (Qwen3) │  │ (Qwen3) │         │
│  └────┬────┘  └────┬────┘  └────┬────┘         │
│       └─────────────┼─────────────┘            │
│                     ↓                            │
│           ┌─────────────────┐                   │
│           │ Code Reviewer     │                   │
│           │ (DeepSeek)        │                   │
│           └────────┬────────┘                   │
│                    ↓                             │
│           ┌─────────────────┐                   │
│           │ DevOps          │                   │
│           │ (Qwen3)         │                   │
│           └────────┬────────┘                   │
│                    ↓                             │
│        ┌─────────────────────┐                │
│        │ GitHub + Production │                │
│        └─────────────────────┘                │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📁 Structure du Skill

```
vibe-coding-fullstack/
├── SKILL.md                    ← Ce fichier (instructions)
├── workflows/
│   ├── mvp-rapid.json         ← Workflow 1-2h
│   ├── production.json        ← Workflow 4-8h
│   └── scale-enterprise.json  ← Workflow 1-2j
├── templates/
│   ├── nextjs-fullstack/      ← Template Next.js complet
│   ├── .github/workflows/     ← CI/CD templates
│   └── docker/                ← Docker configs
├── examples/
│   ├── todo-app/              ← Exemple: Todo
│   ├── blog-cms/              ← Exemple: Blog
│   └── saas-starter/          ← Exemple: SaaS
└── docs/
    ├── best-practices.md
    ├── troubleshooting.md
    └── deployment-guides/
```

---

## 🎮 Usage

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `vibe mvp "description"` | Mode rapide, 1-2h |
| `vibe prod "description"` | Mode production, 4-8h |
| `vibe scale "description"` | Mode entreprise, 1-2j |
| `vibe continue` | Reprendre workflow interrompu |
| `vibe status` | Voir progression |

### Exemples de prompts

```
"Vibe code une app de recettes avec recherche"
"Crée-moi un dashboard analytics avec charts"
"Fullstack: SaaS de facturation avec Stripe"
"MVP: Réseau social pour développeurs"
```

---

## 🔄 Workflows

### Workflow MVP Rapide (1-2h)

```yaml
Étapes:
  1. Discovery (10min)
  2. Architecture (15min) 
  3. Frontend (30min)
  4. Backend (20min)
  5. Integration (10min)
  6. GitHub (10min)
  7. Deploy (10min)

Skip:
  - Tests complets
  - Code review
  - Staging

Stack: Next.js + SQLite + Vercel
```

### Workflow Production (4-8h)

```yaml
Étapes:
  1. Discovery détaillé (30min)
  2. Architecture (45min)
  3. Database (30min)
  4. Backend (60min) + tests
  5. Frontend (90min) + E2E
  6. Code review (30min)
  7. Fix issues (si besoin)
  8. GitHub + CI/CD (50min)
  9. Staging (15min)
  10. Production (15min)
  11. Docs (20min)

Stack: Next.js + PostgreSQL + Prisma + Tests + CI/CD
```

---

## 🛡️ Quality Gates

### Code Review (DeepSeek)

| Critère | Seuil |
|---------|-------|
| Security | 0 critical |
| Performance | Score > 70 |
| Maintainability | Score > 70 |
| **Global** | **Score >= 80** |

### Tests

| Type | Coverage | Tool |
|------|----------|------|
| Unit | > 70% | Vitest |
| Integration | Smoke tests | Supertest |
| E2E | 5+ flows | Playwright |

---

## 🚀 Déploiement

### Plateformes supportées

| Platform | Type | Usage |
|----------|------|-------|
| **Vercel** | Frontend | Défaut Next.js |
| **Railway** | Fullstack | API + DB |
| **Render** | API + DB | Alternative |
| **Docker** | Self-hosted | VPS/Cloud |
| **AWS/GCP** | Scale | Entreprise |

### Environments

```
develop  → Staging (auto-deploy)
main     → Production (auto-deploy)
feature/* → Preview (Vercel)
```

---

## 📊 Monitoring

Post-déploiement:
- ✅ Health check endpoint
- ✅ Error tracking (Sentry)
- ✅ Analytics (PostHog)
- ✅ Uptime monitoring

---

## 🎯 Success Metrics

| Métrique | Target |
|----------|--------|
| Time to MVP | < 2h |
| Code review score | >= 80 |
| Test coverage | > 70% |
| Deploy success rate | > 95% |
| User satisfaction | 🎉 |

---

## 🔧 Configuration

### Variables d'environnement

```bash
# .env.local (dev)
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# .env.production
DATABASE_URL="${{ secrets.DATABASE_URL }}"
NEXTAUTH_SECRET="${{ secrets.NEXTAUTH_SECRET }}"
```

### Secrets GitHub requis

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID_PROD`
- `VERCEL_PROJECT_ID_STAGING`

---

## 🆘 Troubleshooting

### Si agent échoue

```
1. Retry avec prompt plus clair (max 2x)
2. Fallback vers approche plus simple
3. Escalade humaine si critique
```

### Si déploiement échoue

```
1. Check logs via exec/logs
2. Fix config/env manquants
3. Retry deploy
4. Rollback si nécessaire
```

---

## 📚 Ressources

- [Next.js Best Practices](./docs/nextjs-best-practices.md)
- [Database Schema Patterns](./docs/database-patterns.md)
- [Security Checklist](./docs/security-checklist.md)
- [Deployment Guides](./docs/deployment/)

---

## 🤝 Contribution

Ce skill est maintenu par la communauté OpenClaw.

**Roadmap**:
- [ ] Support Flutter (mobile)
- [ ] Support Python/FastAPI backend
- [ ] Templates SaaS complets (auth, billing, admin)
- [ ] Integration Stripe automatique
- [ ] Support multi-tenant

---

**Version**: 1.0.0  
**License**: MIT  
**Maintainers**: OpenClaw Community
