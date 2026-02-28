# Vibe Coding Full-Stack - Troubleshooting

## 🔧 Problèmes courants

### 1. Agent timeout

**Symptôme**: `sessions_spawn` retourne timeout après 120s

**Solutions**:
```javascript
// Augmenter timeout
await sessions_spawn({
  agentId: "agent-xxx",
  task: "...",
  timeoutSeconds: 300  // 5min
});

// Ou splitter la tâche
const part1 = await sessions_spawn({
  agentId: "agent-frontend-coder",
  task: "Créer juste le layout et navigation"
});
const part2 = await sessions_spawn({
  agentId: "agent-frontend-coder",
  task: "Créer les composants restants"
});
```

### 2. Code review échoue (score < 80)

**Symptôme**: Reviewer rejette avec score 65

**Solutions**:
```javascript
// Cycle fix automatique
if (!review.approved && review.issues.critical > 0) {
  const fixed = await sessions_spawn({
    agentId: review.agentOrigin,  // Celui qui a généré
    task: `Corriger ces issues critiques:
      ${JSON.stringify(review.issues.critical)}`
  });
  
  // Re-review (max 3 cycles)
  const review2 = await sessions_spawn({
    agentId: "agent-code-reviewer",
    task: JSON.stringify({ code: fixed, language })
  });
}

// OU: Abaisser le seuil pour MVP rapide
qualityGates: {
  codeReview: { minScore: 70 }  // vs 80
}
```

### 3. Déploiement échoue

**Symptôme**: Vercel build failed

**Debug**:
```bash
# 1. Vérifier logs
vercel logs --json

# 2. Check env vars manquantes
vercel env ls

# 3. Build local
npm run build

# 4. Fix & redeploy
```

**Automatique**:
```javascript
const deploy = await sessions_spawn({
  agentId: "agent-devops-coder",
  task: `Déployer corrigé:
    - Check logs: vercel logs
    - Fix erreurs
    - Redeploy`
});
```

### 4. Database connection failed

**Symptôme**: Prisma can't connect

**Check**:
- [ ] `DATABASE_URL` dans env
- [ ] Railway/Render DB running
- [ ] IP whitelist (si applicable)
- [ ] Migrations applied: `npx prisma migrate deploy`

### 5. Auth ne fonctionne pas

**Symptômes**: Login redirect loop / 401 errors

**Checklist**:
- [ ] Clerk/NEXTAUTH_SECRET set
- [ ] NEXTAUTH_URL correct
- [ ] Callback URLs configurés dans provider
- [ ] Middleware auth exclusions OK

## 🛡️ Prévention

### Tests de smoke automatiques

```javascript
// Post-deploy check
const health = await exec({
  command: `curl -sf https://${appUrl}/api/health`
});

if (!health.ok) {
  await sessions_spawn({
    agentId: "agent-devops-coder",
    task: "Rollback + investigate"
  });
}
```

### Monitoring basique

```yaml
# À configurer dans Sentry/LogRocket
alerts:
  - error_rate > 1%
  - api_p95_latency > 2s
  - 5xx_errors > 10/min
```

## 📞 Escalade

Quand appeler l'humain:

| Situation | Action |
|-----------|--------|
| 3 retries échoués | Escalade |
| Coût déploiement > budget | Validation humaine |
| Security issue critique | Stop + notification |
| Architecture complexe non prévue | Workshop |

---

## 💬 Feedback loop

Si workflow échoue:
1. **Log** l'erreur complète
2. **Analyse** root cause
3. **Update** le skill avec fix
4. **Retry** avec amélioration

```javascript
// Exemple: Retry intelligent
async function vibeCodingWithRetry(description, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await runVibeCoding(description);
    } catch (error) {
      console.log(`Attempt ${i+1} failed:`, error.message);
      
      if (i === maxRetries - 1) {
        await notifyHuman({
          task: description,
          error: error.message,
          logs: error.logs
        });
        throw error;
      }
      
      // Attendre avant retry
      await sleep(5000 * (i + 1));
    }
  }
}
```
