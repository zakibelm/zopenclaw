# Exemple: Créer une Todo App avec Vibe Coding

## 🎯 Objectif

Créer une application de todo list complète avec:
- ✅ Frontend Next.js + Tailwind
- ✅ Backend API REST
- ✅ PostgreSQL database
- ✅ Auth (Clerk)
- ✅ Tests
- ✅ GitHub repo
- ✅ Déploiement Vercel + Railway

## 🚀 Commande

```javascript
// Lancer l'orchestrateur
const project = await sessions_spawn({
  agentId: "agent-vibe-coding-orchestrator",
  task: `Créer une application de todo list collaborative
    
    FEATURES:
    - CRUD todos (créer, lire, mettre à jour, supprimer)
    - Marquer comme complété
    - Filtres (tous/actifs/complétés)
    - Drag & drop pour réordonner
    - Authentification utilisateur (Clerk)
    - Partage de listes (optionnel v2)
    
    DESIGN:
    - Minimaliste et moderne
    - Dark mode support
    - Responsive mobile
    
    STACK:
    - Next.js 14 (App Router)
    - Tailwind CSS + shadcn/ui
    - PostgreSQL + Prisma ORM
    - Clerk Auth
    
    WORKFLOW: production
    
    DEPLOY:
    - Vercel (frontend)
    - Railway (PostgreSQL + backend si séparé)
    
    REPO: github.com/user/todo-app-vibe
  `,
  timeoutSeconds: 3600  // 1h max
});
```

## 📋 Ce qui va se passer

### Phase 1: Discovery (30min)
- 🤖 Orchestrateur analyse la demande
- Clarifie features prioritaires
- Confirme stack technique

### Phase 2: Architecture (45min)
- 🤖 `agent-frontend-coder` génère:
  - Structure pages/routes
  - Composants UI (TodoItem, TodoList, Filters)
  - Hooks (useTodos, useAuth)
  
- 🤖 `agent-database-coder` génère:
  - Schema Prisma (User, Todo, List)
  - Migrations
  - Queries optimisées

- 🤖 `agent-backend-coder` génère:
  - API routes (/api/todos/*)
  - Middleware auth
  - Validation Zod
  - Error handling

### Phase 3: Intégration (30min)
- 🤖 `agent-frontend-coder` connecte frontend ↔ backend
- Gestion état (React Query / SWR)
- Error boundaries
- Loading states

### Phase 4: Code Review (30min)
- 🤖 `agent-code-reviewer` (DeepSeek) analyse:
  - Security (SQL injection, XSS, auth)
  - Performance (N+1 queries, bundle size)
  - Maintainability (clean code, patterns)
  - TypeScript strictness
  
- **Gate**: Score >= 80 ✅ ou fix requis

### Phase 5: Tests (45min)
```
Unit tests (Vitest):
  ✓ Todo service (CRUD)
  ✓ Auth helpers
  ✓ Validation schemas

E2E tests (Playwright):
  ✓ Create todo flow
  ✓ Complete/uncomplete
  ✓ Filter todos
  ✓ Drag & drop reorder
  ✓ Auth flow
```

### Phase 6: GitHub (20min)
- 🤖 `agent-devops-coder`:
  ```bash
  git init
  gh repo create todo-app-vibe --public
  git add .
  git commit -m "feat: initial todo app"
  git push origin main
  ```
- Setup `.gitignore` (node_modules, .env, etc.)
- Branch protection rules

### Phase 7: CI/CD (30min)
- 🤖 `agent-devops-coder` crée:
  ```
  .github/workflows/
  ├── ci.yml         → Tests + Build
  ├── staging.yml    → Deploy develop
  └── production.yml → Deploy main
  ```

### Phase 8: Déploiement (30min)
- 🤖 `agent-devops-coder`:
  1. **Staging** (develop branch):
     - Vercel: https://todo-app-vibe-staging.vercel.app
     - Railway DB: staging-db
     - Smoke tests ✅
  
  2. **Production** (main branch):
     - Vercel: https://todo-app-vibe.vercel.app
     - Railway DB: prod-db
     - Health check ✅
     - Sentry monitoring ✅

## 📦 Output final

```json
{
  "projectName": "todo-app-vibe",
  "status": "success",
  "urls": {
    "github": "https://github.com/user/todo-app-vibe",
    "production": "https://todo-app-vibe.vercel.app",
    "staging": "https://todo-app-vibe-staging.vercel.app"
  },
  "stack": {
    "frontend": "Next.js 14 + Tailwind + shadcn/ui",
    "backend": "Next.js API Routes",
    "database": "PostgreSQL + Prisma",
    "auth": "Clerk",
    "deploy": "Vercel + Railway"
  },
  "quality": {
    "codeReviewScore": 87,
    "testCoverage": 78,
    "deployStatus": "success"
  },
  "featuresDelivered": [
    "CRUD todos",
    "Complete/uncomplete",
    "Filters (all/active/completed)",
    "Drag & drop",
    "Auth with Clerk",
    "Dark mode",
    "Responsive"
  ],
  "documentation": {
    "readme": "README.md",
    "architecture": "docs/ARCHITECTURE.md",
    "api": "docs/API.md",
    "deployment": "docs/DEPLOYMENT.md"
  }
}
```

## 🎉 Résultat

Tu as maintenant:
- ✅ Code source sur GitHub
- ✅ App live en production
- ✅ Tests automatisés
- ✅ CI/CD fonctionnel
- ✅ Documentation
- ✅ Monitoring

**Temps total estimé: 4-5h** (vs 2-3 jours manuellement)

## 🔄 Prochaines étapes suggérées

```javascript
// Amélioration: ajouter partage de listes
await sessions_spawn({
  agentId: "agent-vibe-coding-orchestrator",
  task: `Ajouter feature "partage de listes" à todo-app-vibe
    - Inviter utilisateur par email
    - Permissions (lecture/écriture)
    - Real-time sync (Socket.io)`
});

// OU: Feature "due dates & reminders"
await sessions_spawn({
  agentId: "agent-frontend-coder",
  task: `Ajouter dates d'échéance aux todos
    - Date picker
    - Notifications email
    - Vue calendrier`
});
```

## 💡 Tips

1. **Commits fréquents**: L'orchestrateur commit à chaque phase majeure
2. **Review les PRs**: Vérifie les changements avant merge main→prod
3. **Monitoring**: Check Sentry pour erreurs en production
4. **Scaling**: Si traffic ↑, scale Railway DB plan

---

**Questions?** Le skill est là pour t'aider! 🤖
