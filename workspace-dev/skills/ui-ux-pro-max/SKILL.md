# UI UX Pro Max Skill

Moteur de génération de systèmes de design et analyse UI/UX avancée.

## Fonctions principales

1. **Génération de Design System** : Crée des palettes de couleurs, typographies, patterns et styles (glassmorphism, bento, etc.).
2. **Analyse Industrie** : Applique des règles de design spécifiques à chaque secteur (fintech, spa, saas, etc.).
3. **Checklist Anti-Patterns** : Vérifie le respect des bonnes pratiques UX.

## Utilisation (via CLI sur le VPS)

```bash
python3 /home/node/.openclaw/workspace/skills/ui-ux-pro-max/scripts/search.py "Ton Secteur" --design-system -p "NomProjet"
```

## Structure

- `data/` : Bases de données CSV de styles, couleurs, et typographies.
- `scripts/` : Logique de recherche et de génération.
- `templates/` : Modèles de sortie pour différents agents.
