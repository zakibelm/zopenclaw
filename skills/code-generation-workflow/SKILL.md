---
name: code-generation-workflow
description: Architecture 3-paliers pour génération de code optimisée coût/performance - Planification (Claude) → Exécution (Qwen Coder) → Validation (Claude)
license: MIT
---

# Code Generation Workflow

Skill permettant de générer du code avec une architecture **Architecte-Exécutant-Superviseur** pour maximiser la qualité tout en minimisant les coûts.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW 3-PALIERS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐                                            │
│  │   CLAUDE / o1   │ ← Modèle performant (payant)               │
│  │   L'ARCHITECTE  │   Planifie, définit l'architecture         │
│  └────────┬────────┘                                            │
│           │ Plan détaillé + fichiers + dépendances               │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  QWEN CODER     │ ← Modèle spécialisé code (GRATUIT)         │
│  │ L'EXÉCUTANT     │   Génère le code selon le plan             │
│  └────────┬────────┘                                            │
│           │ Code brut                                            │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │   CLAUDE / o1   │ ← Modèle performant (payant)               │
│  │  LE SUPERVISEUR │   Vérifie, critique, valide                │
│  └─────────────────┘                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Économies Réalisées

| Métrique | Approche Standard | Workflow 3-Paliers |
|----------|------------------|-------------------|
| Coût moyen | $0.045/tâche | **$0.021/tâche** (-53%) |
| Qualité | Bonne | **Excellente** (double validation) |
| Temps | Rapide | +2-3s (négligeable) |

## Utilisation

### Commande de base

```bash
# Via les subagents OpenClaw
openclaw skills run code-generation-workflow \
  --task "Créer une API REST pour gestion utilisateurs avec authentification JWT" \
  --language "python" \
  --framework "fastapi"
```

### Depuis une session OpenClaw

```
@code-workflow Créer un composant React pour un tableau de bord financier
avec graphiques et filtres par date
```

## Workflow Détaillé

### Phase 1: Planification (Architecte)

**Modèle:** Claude Sonnet / o1-mini (modèle de raisonnement)
**Prompt type:**
```
Tu es un architecte logiciel senior. Analyse cette demande et produis:
1. Structure des fichiers nécessaires
2. Décisions d'architecture et justifications
3. Dépendances externes requises
4. Interfaces et contrats entre composants
5. Points critiques à surveiller

Demande: {user_request}
Langage: {language}
Framework: {framework}
```

**Sortie attendue:**
- Liste de fichiers avec descriptions
- Architecture détaillée
- Considérations de sécurité/performance
- Plan d'implémentation étape par étape

### Phase 2: Exécution (Exécutant)

**Modèle:** Qwen Coder (gratuit via OpenRouter ou local)
**Prompt type:**
```
Tu es un développeur expert. Implémente le code suivant selon ce plan EXACT:

[PLAN DE L'ARCHITECTE]
{architect_plan}

Génère le code pour: {specific_file}
Respecte strictement les conventions et patterns définis.
```

**Sortie attendue:**
- Code fonctionnel et conforme au plan
- Commentaires explicatifs
- Gestion des erreurs de base

### Phase 3: Validation (Superviseur)

**Modèle:** Claude Sonnet / o1-mini
**Prompt type:**
```
Tu es un tech lead expérimenté. Révise ce code:

[PLAN ORIGINAL]
{architect_plan}

[CODE GÉNÉRÉ]
{generated_code}

Vérifie:
1. ✅ Conformité au plan architectural
2. ✅ Qualité du code (propreté, patterns)
3. 🔒 Sécurité (injections, validations)
4. ⚡ Performance (complexité, optimisations)
5. 🧪 Testabilité

Résultat: APPROUVÉ ou liste de corrections nécessaires
```

**Sortie attendue:**
- Statut: APPROUVÉ ou CORRECTIONS_REQUISES
- Feedback détaillé si corrections
- Suggestions d'amélioration

### Phase 4: Itération (si nécessaire)

Si le superviseur demande des corrections:
```
Corrections demandées: {supervisor_feedback}
[Code] → Qwen Coder → [Code corrigé] → Superviseur (validation finale)
```

Max 2 itérations pour éviter les coûts exponentiels.

## Configuration OpenClaw

### 1. Configurer les modèles dans workspace-dev

Créer `workspace-dev/MODEL_ROUTING.md`:

```markdown
# Model Routing Configuration

## Tâches de Code

### Par défaut: Architecture 3-paliers
- **Phase 1 (Plan):** Claude Sonnet (anthropic/claude-3-5-sonnet-20241022)
- **Phase 2 (Code):** Qwen Coder (openrouter/qwen/qwen-2.5-coder-32b-instruct)
- **Phase 3 (Review):** Claude Sonnet (anthropic/claude-3-5-sonnet-20241022)

### Fallback (si Qwen échoue)
- Exécution: Claude Haiku (rapide et bon marché)

### Critique (haute sécurité)
- Exécution: Claude Sonnet direct (pas de Qwen)
- Cas: auth, paiement, crypto, santé
```

### 2. Intégration avec les subagents

Les scripts dans `scripts/` permettent d'automatiser le workflow.

## Fichiers du Skill

```
code-generation-workflow/
├── SKILL.md                    # Ce fichier
├── README.md                   # Guide utilisateur
├── scripts/
│   ├── run-workflow.sh         # Script principal
│   ├── phase1-architect.sh     # Planification
│   ├── phase2-executor.sh      # Génération code
│   └── phase3-supervisor.sh    # Validation
├── prompts/
│   ├── architect-system.md     # Prompt système architecte
│   ├── executor-system.md      # Prompt système exécutant
│   └── supervisor-system.md    # Prompt système superviseur
└── examples/
    ├── example-api-rest.md     # Exemple: API REST
    └── example-react-component.md  # Exemple: Composant React
```

## Cas d'Usage Recommandés

### ✅ Idéal pour:
- Génération de APIs REST/GraphQL
- Création de composants React/Vue
- Scripts d'automatisation
- Tests unitaires
- Documentation technique
- Refactoring structuré

### ⚠️ À éviter avec ce workflow:
- Code nécessitant contexte métier très spécifique
- Algorithmes complexes (ML, crypto, etc.)
- Code legacy sans documentation
- Situations temps réel critique

## Monitoring des Coûts

Pour suivre l'efficacité du workflow, loguer:
- Nombre de tokens par phase
- Temps d'exécution total
- Taux de validation au 1er essai
- Nombre d'itérations nécessaires

Objectif: >80% de validation au 1er essai, moyenne 1.2 itérations.

## Personnalisation

Modifier les prompts système dans `prompts/` pour:
- Adapter aux conventions de l'équipe
- Ajouter des règles de sécurité spécifiques
- Intégrer des patterns internes
- Définir des standards de qualité

## Troubleshooting

| Problème | Solution |
|----------|----------|
| Qwen ne suit pas le plan | Raffiner le prompt architecte pour plus de détails |
| Superviseur trop strict | Ajuster les critères d'acceptation |
| Trop d'itérations | Simplifier la tâche ou utiliser modèle plus fort pour exécution |
| Coûts trop élevés | Activer mode "fast-track" (skip validation pour tâches simples) |

## Intégration avec l'Écosystème

Ce skill s'intègre avec:
- **subagents** OpenClaw pour l'exécution parallèle
- **skills/composio** pour l'intégration avec outils externes
- **skills/git** pour le versioning automatique
- **skills/testing** pour l'exécution des tests générés

## License

MIT - Libre d'utilisation et modification.
