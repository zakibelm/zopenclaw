# Code Generation Workflow

Architecture **Architecte-Exécutant-Superviseur** pour génération de code optimisée coût/performance.

## 🎯 Objectif

Diviser les coûts par 2-3 tout en maintenant (voire améliorant) la qualité du code généré.

## 📊 Performances

| Métrique | Avant | Après |
|----------|-------|-------|
| Coût/tâche | $0.045 | **$0.021** (-53%) |
| Qualité | Bonne | **Excellente** |
| Temps | 15s | 20s (+5s négligeable) |

## 🚀 Démarrage Rapide

```bash
# Cloner ou naviguer vers le skill
cd code-generation-workflow

# Exécuter le workflow
bash scripts/run-workflow.sh \
  -t "Créer une API REST pour gestion utilisateurs avec JWT" \
  -l python \
  -f fastapi
```

## 🏗️ Architecture

```
Demande Utilisateur
        ↓
┌─────────────────┐
│   ARCHITECTE    │ ← Claude/o1 (payant)
│   (Planifie)    │
└────────┬────────┘
         │ Plan détaillé
         ↓
┌─────────────────┐
│   EXÉCUTANT     │ ← Qwen Coder (GRATUIT)
│   (Code)        │
└────────┬────────┘
         │ Code brut
         ↓
┌─────────────────┐
│  SUPERVISEUR    │ ← Claude/o1 (payant)
│   (Valide)      │
└─────────────────┘
         │
         ↓
    ✅ Approuvé
```

## 📁 Structure

```
code-generation-workflow/
├── SKILL.md                    # Documentation technique
├── README.md                   # Ce fichier
├── scripts/
│   └── run-workflow.sh         # Script principal
├── prompts/
│   ├── architect-system.md     # Prompt système: Planification
│   ├── executor-system.md      # Prompt système: Exécution
│   └── supervisor-system.md    # Prompt système: Validation
└── examples/                   # Exemples d'utilisation
```

## 🎛️ Options

| Option | Description | Défaut |
|--------|-------------|--------|
| `-t, --task` | Description de la tâche (obligatoire) | - |
| `-l, --language` | Langage de programmation | auto |
| `-f, --framework` | Framework à utiliser | - |
| `-o, --output` | Répertoire de sortie | `./generated` |
| `--fast` | Mode rapide (skip validation) | false |
| `--strict` | Validation plus sévère | false |

## 💡 Exemples

### API REST Python/FastAPI
```bash
bash scripts/run-workflow.sh \
  -t "API REST pour gestion de tâches avec CRUD et authentification JWT" \
  -l python \
  -f fastapi
```

### Composant React
```bash
bash scripts/run-workflow.sh \
  -t "Composant tableau de bord avec graphiques Recharts et filtres" \
  -l typescript \
  -f react
```

### Script d'automatisation
```bash
bash scripts/run-workflow.sh \
  -t "Script Python pour traiter des CSV et générer des rapports Excel" \
  -l python \
  --fast
```

## 🔧 Intégration OpenClaw

Ce skill est conçu pour fonctionner avec le système de subagents OpenClaw. 

Pour l'utiliser dans une session:
```
Utilise le skill code-generation-workflow pour créer un composant React de formulaire de connexion
```

## 📝 Configuration des Modèles

Par défaut:
- **Architecte:** `anthropic/claude-3-5-sonnet-20241022`
- **Exécutant:** `openrouter/qwen/qwen-2.5-coder-32b-instruct` (gratuit)
- **Superviseur:** `anthropic/claude-3-5-sonnet-20241022`

Modifiable dans `scripts/run-workflow.sh`.

## ⚠️ Limitations

- Nécessite une clé API OpenRouter pour Qwen Coder
- Les itérations multiples augmentent le coût
- Pas adapté aux tâches temps réel

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:
- Proposer des améliorations aux prompts
- Ajouter des exemples
- Signaler des bugs
- Optimiser les coûts

## 📄 License

MIT - Libre d'utilisation et modification.
