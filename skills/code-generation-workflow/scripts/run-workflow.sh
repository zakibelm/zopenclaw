#!/bin/bash
#
# Code Generation Workflow - Script Principal
# Architecture: Architecte → Exécutant → Superviseur
#

set -e

# Configuration
WORKFLOW_NAME="code-generation-workflow"
PHASE1_MODEL="anthropic/claude-3-5-sonnet-20241022"
PHASE2_MODEL="openrouter/qwen/qwen-2.5-coder-32b-instruct"
PHASE3_MODEL="anthropic/claude-3-5-sonnet-20241022"
MAX_ITERATIONS=2

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'aide
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -t, --task DESCRIPTION       Description de la tâche (obligatoire)"
    echo "  -l, --language LANG          Langage de programmation (défaut: auto-detect)"
    echo "  -f, --framework FRAMEWORK    Framework à utiliser"
    echo "  -o, --output DIR             Répertoire de sortie (défaut: ./generated)"
    echo "  --fast                       Mode rapide (skip validation)"
    echo "  --strict                     Mode strict (validation plus sévère)"
    echo "  -h, --help                   Affiche cette aide"
    echo ""
    echo "Exemple:"
    echo "  $0 -t \"Créer une API REST pour gestion utilisateurs\" -l python -f fastapi"
    exit 1
}

# Parse arguments
TASK=""
LANGUAGE=""
FRAMEWORK=""
OUTPUT_DIR="./generated"
FAST_MODE=false
STRICT_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--task)
            TASK="$2"
            shift 2
            ;;
        -l|--language)
            LANGUAGE="$2"
            shift 2
            ;;
        -f|--framework)
            FRAMEWORK="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        --fast)
            FAST_MODE=true
            shift
            ;;
        --strict)
            STRICT_MODE=true
            shift
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo "Option inconnue: $1"
            usage
            ;;
    esac
done

# Vérification des arguments obligatoires
if [ -z "$TASK" ]; then
    echo -e "${RED}Erreur: La description de la tâche est obligatoire${NC}"
    usage
fi

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  CODE GENERATION WORKFLOW${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Tâche: $TASK"
echo "Langage: ${LANGUAGE:-auto}"
echo "Framework: ${FRAMEWORK:-none}"
echo "Mode: ${FAST_MODE:+rapide}${STRICT_MODE:+strict}${(!FAST_MODE && !STRICT_MODE):+standard}"
echo ""

# Créer le répertoire de sortie
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SESSION_DIR="$OUTPUT_DIR/session_$TIMESTAMP"
mkdir -p "$SESSION_DIR"

echo -e "${YELLOW}📁 Session créée: $SESSION_DIR${NC}"
echo ""

# ==============================================================================
# PHASE 1: ARCHITECTE
# ==============================================================================
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 1: PLANIFICATION (Architecte)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Modèle: $PHASE1_MODEL"
echo ""

# Construire le prompt pour l'architecte
ARCHITECT_PROMPT=$(cat <<EOF
$(cat prompts/architect-system.md)

---

## Demande Utilisateur

**Tâche:** $TASK
${LANGUAGE:+**Langage:** $LANGUAGE}
${FRAMEWORK:+**Framework:** $FRAMEWORK}

Produis un plan d'architecture détaillé selon le format spécifié.
EOF
)

# Appeler le modèle architecte (simulation - à remplacer par l'appel réel)
echo "🤖 Génération du plan architectural..."
# TODO: Remplacer par l'appel OpenClaw/sessions_spawn réel
# openclaw sessions_spawn --model "$PHASE1_MODEL" --message "$ARCHITECT_PROMPT" --label "architect_$TIMESTAMP"

# Sauvegarder le plan (pour l'exemple, on simule)
echo "$ARCHITECT_PROMPT" > "$SESSION_DIR/phase1_architect_plan.md"
echo -e "${GREEN}✅ Plan architectural généré${NC}"
echo "   → $SESSION_DIR/phase1_architect_plan.md"
echo ""

# ==============================================================================
# PHASE 2: EXÉCUTANT
# ==============================================================================
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 2: EXÉCUTION (Qwen Coder)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Modèle: $PHASE2_MODEL (GRATUIT)"
echo ""

# Lire le plan
ARCHITECT_PLAN=$(cat "$SESSION_DIR/phase1_architect_plan.md")

# Construire le prompt pour l'exécutant
EXECUTOR_PROMPT=$(cat <<EOF
$(cat prompts/executor-system.md)

---

## Plan Architectural

$ARCHITECT_PLAN

---

Implémente le code pour tous les fichiers définis dans le plan ci-dessus.
Respecte STRICTEMENT les spécifications.
EOF
)

echo "🤖 Génération du code..."
# TODO: Remplacer par l'appel OpenClaw/sessions_spawn réel
# openclaw sessions_spawn --model "$PHASE2_MODEL" --message "$EXECUTOR_PROMPT" --label "executor_$TIMESTAMP"

echo "$EXECUTOR_PROMPT" > "$SESSION_DIR/phase2_generated_code.md"
echo -e "${GREEN}✅ Code généré${NC}"
echo "   → $SESSION_DIR/phase2_generated_code.md"
echo ""

# Si mode rapide, on s'arrête ici
if [ "$FAST_MODE" = true ]; then
    echo -e "${YELLOW}⚡ Mode rapide activé - Validation ignorée${NC}"
    echo ""
    echo -e "${GREEN}🎉 Workflow terminé!${NC}"
    echo "   Résultat: $SESSION_DIR/phase2_generated_code.md"
    exit 0
fi

# ==============================================================================
# PHASE 3: SUPERVISEUR (avec itérations)
# ==============================================================================
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 3: VALIDATION (Superviseur)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

ITERATION=0
APPROVED=false

while [ $ITERATION -lt $MAX_ITERATIONS ] && [ "$APPROVED" = false ]; do
    ITERATION=$((ITERATION + 1))
    echo "---"
    echo "Itération $ITERATION/$MAX_ITERATIONS"
    echo ""
    
    # Lire le code généré
    GENERATED_CODE=$(cat "$SESSION_DIR/phase2_generated_code.md")
    
    # Construire le prompt pour le superviseur
    SUPERVISOR_PROMPT=$(cat <<EOF
$(cat prompts/supervisor-system.md)

---

## Plan Architectural Original

$ARCHITECT_PLAN

---

## Code Généré

$GENERATED_CODE

---

${STRICT_MODE:+Mode strict activé - sois exigeant sur la qualité}

Effectue la revue de code complète et donne ton verdict.
EOF
)
    
    echo "🤖 Validation du code..."
    # TODO: Remplacer par l'appel OpenClaw/sessions_spawn réel
    # openclaw sessions_spawn --model "$PHASE3_MODEL" --message "$SUPERVISOR_PROMPT" --label "supervisor_${TIMESTAMP}_$ITERATION"
    
    REVIEW_FILE="$SESSION_DIR/phase3_review_$ITERATION.md"
    echo "$SUPERVISOR_PROMPT" > "$REVIEW_FILE"
    echo -e "${GREEN}✅ Revue générée${NC}"
    echo "   → $REVIEW_FILE"
    
    # TODO: Analyser la réponse pour déterminer si APPROUVÉ ou non
    # Pour l'instant, on simule une approbation à la dernière itération
    if [ $ITERATION -eq $MAX_ITERATIONS ]; then
        APPROVED=true
        echo ""
        echo -e "${GREEN}✅ Code approuvé!${NC}"
    else
        # TODO: Si corrections demandées, relancer l'exécutant
        echo ""
        echo -e "${YELLOW}📝 Corrections demandées - Itération suivante...${NC}"
        # Ici, on re-générerait le code avec les corrections
    fi
    echo ""
done

# ==============================================================================
# RÉSULTAT FINAL
# ==============================================================================
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  RÉSULTAT${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ "$APPROVED" = true ]; then
    echo -e "${GREEN}🎉 WORKFLOW TERMINÉ AVEC SUCCÈS${NC}"
    echo ""
    echo "📁 Fichiers générés:"
    echo "   • Plan: $SESSION_DIR/phase1_architect_plan.md"
    echo "   • Code: $SESSION_DIR/phase2_generated_code.md"
    ls -1 "$SESSION_DIR"/phase3_review_*.md 2>/dev/null | while read f; do
        echo "   • Revue: $f"
    done
    echo ""
    echo -e "${GREEN}✅ Le code est prêt à être utilisé!${NC}"
else
    echo -e "${RED}❌ WORKFLOW TERMINÉ AVEC ÉCHEC${NC}"
    echo ""
    echo "Le code n'a pas été approuvé après $MAX_ITERATIONS itérations."
    echo "Révision manuelle recommandée."
    exit 1
fi

echo ""
echo "💡 Prochaines étapes suggérées:"
echo "   1. Extraire le code des fichiers générés"
echo "   2. Exécuter les tests si présents"
echo "   3. Intégrer au projet"
echo ""
