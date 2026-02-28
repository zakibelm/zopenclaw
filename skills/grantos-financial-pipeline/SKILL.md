---
name: grantos-financial-pipeline
description: Pipeline d'analyse financière 3-paliers optimisé coût/performance - Analyste (Claude) → Rechercheur (DeepSeek V3.2 gratuit) → Validateur (Claude)
license: MIT
target: @Zakcpa_bot
---

# GrantOS Financial Pipeline

Pipeline d'analyse financière 3-paliers pour le bot @Zakcpa_bot.

## Architecture

```
Demande Utilisateur
        ↓
┌──────────────────────────────────────────────────────────────┐
│  PHASE 1: ANALYSTE (Claude Sonnet)                          │
│  • Comprendre le contexte                                    │
│  • Identifier les besoins d'analyse                          │
│  • Planifier les calculs nécessaires                          │
│  • Détecter les red flags                                    │
│  Coût: ~$0.008                                              │
└──────────────────────────────────────────────────────────────┘
                            ↓ Plan d'analyse
┌──────────────────────────────────────────────────────────────┐
│  PHASE 2: RECHERCHEUR (DeepSeek V3.2 - GRATUIT)              │
│  • Calculs financiers                                        │
│  • Recherche de subventions                                  │
│  • Analyse de tendances                                      │
│  • Extraction de données                                     │
│  Coût: $0 🎉                                                │
└──────────────────────────────────────────────────────────────┘
                            ↓ Résultats bruts
┌──────────────────────────────────────────────────────────────┐
│  PHASE 3: VALIDATEUR (Claude Sonnet)                        │
│  • Vérifier les calculs                                      │
│  • Valider les recommandations                                │
│  • Conformité réglementaire                                  │
│  • Formuler la réponse finale                                 │
│  Coût: ~$0.012                                              │
└──────────────────────────────────────────────────────────────┘
                            ↓
                    ✅ Réponse utilisateur
```

## Économies

| Approche | Coût/analyse | Qualité |
|----------|-------------|---------|
| Tout Claude | ~$0.035 | Bonne |
| Pipeline DeepSeek | **~$0.020** | **Excellente** |
| **Économie** | **-43%** | **+ validation** |

## Modèles Utilisés

| Phase | Modèle | ID OpenRouter | Rôle |
|-------|--------|---------------|------|
| 1 | Claude 3.5 Sonnet | `anthropic/claude-3-5-sonnet-20241022` | Planification |
| 2 | **DeepSeek V3.2** | `openrouter/deepseek/deepseek-v3` | **Recherche/Calculs** |
| 3 | Claude 3.5 Sonnet | `anthropic/claude-3-5-sonnet-20241022` | Validation |

## Pourquoi DeepSeek V3.2 ?

### Avantages pour analyse financière :

1. **Raisonnement mathématique supérieur**
   - Calculs de ratios précis
   - Analyse temporelle rigoureuse
   - Vérification croisée automatique

2. **Structure de réponse stricte**
   - Suit les instructions format précisément
   - Respecte les templates demandés
   - Pas d'hallucinations sur les chiffres

3. **Optimisé pour l'analyse**
   - Entraîné sur données financières
   - Capacité d'analyse multivariée
   - Extraction d'informations structurées

4. **Gratuit via OpenRouter**
   - Pas de coût pour la phase 2
   - Disponibilité élevée

## Workflow Détaillé

### Phase 1: Analyse du Contexte (Analyste)

**Entrée:** Demande utilisateur + historique
**Sortie:** Plan d'analyse détaillé

```
Analyse:
├── Type de demande [bilans|subventions|ratios|comparaison]
├── Documents nécessaires
├── Calculs requis
├── Recherches externes nécessaires
├── Red flags potentiels à vérifier
└── Format de sortie attendu
```

### Phase 2: Recherche & Calculs (DeepSeek V3.2)

**Entrée:** Plan d'analyse + données brutes
**Sortie:** Calculs et analyses structurées

```
Résultats:
├── Calculs effectués (étape par étape)
├── Résultats chiffrés
├── Benchmarks comparatifs
├── Opportunités identifiées
└── Notes de méthodologie
```

### Phase 3: Validation & Formulation (Validateur)

**Entrée:** Plan + Résultats bruts
**Sortie:** Réponse finale validée

```
Validation:
├── Vérification des calculs critiques
├── Confirmation des recommandations
├── Ajout des mises en garde
├── Formulation claire
└── Sources et références
```

## Intégration OpenClaw

### Configuration des modèles

```yaml
# Dans config OpenClaw
models:
  grantos_analyst:
    provider: openrouter
    model: anthropic/claude-3-5-sonnet-20241022
    max_tokens: 4096
    
  grantos_researcher:
    provider: openrouter
    model: openrouter/deepseek/deepseek-v3  # DeepSeek V3.2
    max_tokens: 8192
    temperature: 0.1  # Très précis pour calculs
    
  grantos_validator:
    provider: openrouter
    model: anthropic/claude-3-5-sonnet-20241022
    max_tokens: 4096
```

### Routing automatique

Les messages seront routés automatiquement selon la complexité:

- **Simple:** DeepSeek direct (gratuit)
- **Complexe:** Pipeline 3-paliers
- **Critique:** Claude direct (sécurité)

## Utilisation

### Depuis @Zakcpa_bot

```
@Zakcpa_bot
Analyse ce bilan:
[document]
→ Pipeline 3-paliers activé

@Zakcpa_bot  
Calcule le ratio de liquidité rapide
→ DeepSeek direct (gratuit)
```

### Commandes spécifiques

```
/analyse [document] → Pipeline complet
/calculate [ratio] → DeepSeek direct
/subvention [secteur] → Pipeline recherche
/validate [calcul] → Claude validation
```

## Prompts Système

Voir fichiers dans `prompts/`:
- `analyst-system.md` - Phase 1
- `researcher-deepseek-system.md` - Phase 2 (DeepSeek)
- `validator-system.md` - Phase 3

## Exemple de Session

### Demande
> "Analyse la santé financière de cette entreprise à partir de son bilan"

### Phase 1: Planification (Claude)
```
Plan généré:
- Calculer ratios fondamentaux (liquidité, solvabilité, rentabilité)
- Analyser évolution sur 3 ans si données disponibles
- Identifier points de vigilance
- Comparer aux standards du secteur
- Recommandations générales
```

### Phase 2: Calculs (DeepSeek V3.2)
```
Résultats calculés:
✓ Ratio de liquidité: 1.85 (sain)
✓ Ratio de solvabilité: 0.42 (à surveiller)
✓ ROE: 12.3% (bon)
✓ Evolution CA: +8%/+12%/+5%
```

### Phase 3: Validation (Claude)
```
Réponse finale:
💰 Analyse de santé financière

✅ Points positifs:
   • Liquidité confortable (1.85)
   • Rentabilité correcte (ROE 12.3%)
   • Croissance régulière

⚠️ Points d'attention:
   • Endettement élevé (solvabilité 0.42)
   • Ralentissement croissance année 3

📊 Recommandations:
   • Surveiller la dette à long terme
   • Identifier causes ralentissement
   • Maintenir politique trésorerie

*Analyse automatique - Valider avec CPA pour décisions critiques*
```

## Monitoring

Suivre les métriques:
- Taux de validation au 1er essai (>85%)
- Coût moyen par analyse
- Temps de réponse
- Satisfaction utilisateur

## Roadmap

- [ ] Intégration avec stockage documents
- [ ] Cache des analyses fréquentes
- [ ] Mode "expert" (validation plus stricte)
- [ ] Historique analyses par client

## License

MIT - Adaptation du workflow code-generation pour analyse financière.
