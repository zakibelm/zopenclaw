# GrantOS Skill - Système de Recherche de Financement Agentique

Ce skill permet à un agent d'orchestrer la recherche et l'analyse de programmes de financement (subventions, crédits d'impôt, prêts) pour entreprises canadiennes (fédéral et provincial).

## Architecture Agentique

### Phase 1: Reconnaissance Parallèle (Scouts)
- **Federal_Scout**: Expert en programmes fédéraux canadiens
- **Quebec_Scout**: Expert en programmes québécois (Investissement Québec, etc.)
- **Tax_Credit_Specialist**: Fiscaliste spécialisé en crédits d'impôt salariaux
- **Financial_Programs_Scout**: Expert en financement BDC/EDC

### Phase 2: Audit de Qualité (Sécurité ZAKI)
- **Quality_Auditor**: Validation des sources, dédoublonnage, vérification éligibilité
- Utilise Gemini Pro pour le raisonnement critique

### Phase 3: Synthèse Stratégique
- **Grant_Strategist**: Composition du rapport final avec recommandations priorisées

## Capacités Techniques
- **Multi-Model Routing**: Flash pour vitesse, Pro pour raisonnement critique
- **Validation de Schémas**: Sécurité ZAKI avec TypeScript strict
- **Visualisation**: Dashboard Recharts avec badges GO/CONDITIONAL_GO/NO-GO
- **Audit Trail**: Traçabilité complète des décisions agents

## Instructions d'Utilisation
L'agent doit collecter:
1. Profil client (structure juridique, secteur, employés, revenus)
2. Projets (coûts, timeline, objectifs)
3. Contraintes (timeline, tolérance risque, documents disponibles)

Puis orchestrer les agents en parallèle pour générer un rapport stratégique complet.
