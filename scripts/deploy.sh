#!/bin/bash

# =============================================================================
# CITL - Script de déploiement FTP basé sur Git
# =============================================================================
# Usage: ./scripts/deploy.sh [options]
# Options:
#   --all             Déployer tous les fichiers
#   --build           Construire les assets avant le déploiement
#   --commits=N       Fichiers des N derniers commits (défaut: 1)
#   --diff=BRANCH     Fichiers différents par rapport à une branche
# =============================================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
BOLD='\033[1m'
NC='\033[0m'

# Répertoires
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Charger les variables FTP depuis .env
if [ -f ".env" ]; then
    export $(grep -E '^FTP_' .env | xargs)
else
    echo -e "${RED}Erreur: Fichier .env non trouvé${NC}"
    exit 1
fi

# Vérifier les variables FTP
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASSWORD" ]; then
    echo -e "${RED}Erreur: Variables FTP manquantes dans .env${NC}"
    echo "Configurez: FTP_HOST, FTP_USER, FTP_PASSWORD"
    exit 1
fi

FTP_PORT=${FTP_PORT:-21}
FTP_REMOTE_PATH=${FTP_REMOTE_PATH:-/public_html}

# Options par défaut
DEPLOY_ALL=false
BUILD_ASSETS=false
COMMITS=1
DIFF_BRANCH=""

# Parser les arguments
for arg in "$@"; do
    case $arg in
        --all)
            DEPLOY_ALL=true
            ;;
        --build)
            BUILD_ASSETS=true
            ;;
        --commits=*)
            COMMITS="${arg#*=}"
            ;;
        --diff=*)
            DIFF_BRANCH="${arg#*=}"
            ;;
        --help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --all             Déployer tous les fichiers"
            echo "  --build           Construire les assets avant"
            echo "  --commits=N       Fichiers des N derniers commits (défaut: 1)"
            echo "  --diff=BRANCH     Fichiers différents par rapport à une branche"
            echo ""
            echo "Exemples:"
            echo "  $0                      # Fichiers du dernier commit"
            echo "  $0 --commits=3          # Fichiers des 3 derniers commits"
            echo "  $0 --diff=main          # Différences avec la branche main"
            echo "  $0 --build              # Build + déployer le dernier commit"
            echo "  $0 --build --all        # Build + déployer tout"
            exit 0
            ;;
    esac
done

# Header
clear
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}          ${BOLD}CITL - Déploiement en Production${NC}               ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GRAY}Serveur:${NC} ${CYAN}$FTP_HOST${NC}"
echo -e "${GRAY}Chemin:${NC}  ${CYAN}$FTP_REMOTE_PATH${NC}"

# Afficher les derniers commits
echo ""
echo -e "${BOLD}📋 Derniers commits:${NC}"
echo -e "${GRAY}────────────────────────────────────────────────────────────${NC}"
git log --oneline -5 --format="${GRAY}%h${NC} %s ${CYAN}(%cr)${NC}"
echo -e "${GRAY}────────────────────────────────────────────────────────────${NC}"
echo ""

# Build si demandé
if [ "$BUILD_ASSETS" = true ]; then
    echo -e "${YELLOW}📦 Construction des assets...${NC}"
    npm run build
    echo -e "${GREEN}✓ Assets construits${NC}"
    echo ""
fi

# Créer la liste des fichiers
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

# Répertoires à inclure dans le déploiement
DEPLOY_PATTERNS="public/build|resources/js|resources/css|app|routes|config|database/migrations|database/seeders"

echo -e "${YELLOW}🔍 Recherche des fichiers modifiés...${NC}"

if [ "$DEPLOY_ALL" = true ]; then
    echo -e "${GRAY}   Mode: Tous les fichiers${NC}"

    # Lister tous les fichiers trackés par git
    git ls-files | grep -E "^($DEPLOY_PATTERNS)" > "$TEMP_FILE"

elif [ -n "$DIFF_BRANCH" ]; then
    echo -e "${GRAY}   Mode: Différences avec la branche '$DIFF_BRANCH'${NC}"

    # Fichiers différents par rapport à une branche
    git diff --name-only "$DIFF_BRANCH"...HEAD | grep -E "^($DEPLOY_PATTERNS)" > "$TEMP_FILE" 2>/dev/null || true

else
    echo -e "${GRAY}   Mode: $COMMITS dernier(s) commit(s)${NC}"

    # Fichiers modifiés dans les N derniers commits
    git diff --name-only HEAD~"$COMMITS"..HEAD | grep -E "^($DEPLOY_PATTERNS)" > "$TEMP_FILE" 2>/dev/null || true

    # Ajouter les fichiers non commités (staged + unstaged)
    git diff --name-only HEAD | grep -E "^($DEPLOY_PATTERNS)" >> "$TEMP_FILE" 2>/dev/null || true

    # Supprimer les doublons
    sort -u "$TEMP_FILE" -o "$TEMP_FILE"
fi

# Ajouter public/build si --build a été utilisé
if [ "$BUILD_ASSETS" = true ]; then
    find public/build -type f 2>/dev/null >> "$TEMP_FILE" || true
    sort -u "$TEMP_FILE" -o "$TEMP_FILE"
fi

# Filtrer les fichiers qui n'existent pas
FILTERED_FILE=$(mktemp)
while IFS= read -r file; do
    if [ -f "$file" ]; then
        echo "$file" >> "$FILTERED_FILE"
    fi
done < "$TEMP_FILE"
mv "$FILTERED_FILE" "$TEMP_FILE"

FILE_COUNT=$(wc -l < "$TEMP_FILE" | tr -d ' ')

if [ "$FILE_COUNT" -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Aucun fichier modifié à déployer${NC}"
    echo ""
    exit 0
fi

echo ""

# Afficher les fichiers avec leurs infos
echo -e "${BOLD}📁 Fichiers à déployer (${FILE_COUNT} fichiers):${NC}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────────────────────${NC}"

COUNT=0
while IFS= read -r file; do
    if [ -f "$file" ]; then
        COUNT=$((COUNT + 1))

        # Statut git du fichier
        GIT_STATUS=$(git status --porcelain "$file" 2>/dev/null | cut -c1-2)
        case "$GIT_STATUS" in
            "M "*|" M") STATUS="${YELLOW}[M]${NC}" ;;  # Modifié
            "A "*|"??") STATUS="${GREEN}[+]${NC}" ;;   # Ajouté
            "D "*) STATUS="${RED}[-]${NC}" ;;          # Supprimé
            *) STATUS="${CYAN}[C]${NC}" ;;             # Commité
        esac

        # Taille du fichier
        SIZE=$(stat -c "%s" "$file" 2>/dev/null || echo "0")
        if [ "$SIZE" -gt 1048576 ]; then
            SIZE_STR="$(echo "scale=1; $SIZE/1048576" | bc)M"
        elif [ "$SIZE" -gt 1024 ]; then
            SIZE_STR="$(echo "scale=1; $SIZE/1024" | bc)K"
        else
            SIZE_STR="${SIZE}B"
        fi

        # Couleur selon le type
        if [[ "$file" == *.js ]]; then
            COLOR="${YELLOW}"
        elif [[ "$file" == *.css ]]; then
            COLOR="${CYAN}"
        elif [[ "$file" == *.php ]]; then
            COLOR="${GREEN}"
        elif [[ "$file" == *.json ]]; then
            COLOR="${BLUE}"
        elif [[ "$file" == *.tsx ]]; then
            COLOR="${BLUE}"
        elif [[ "$file" == *.ts ]]; then
            COLOR="${BLUE}"
        else
            COLOR="${NC}"
        fi

        printf "%s ${GRAY}%4d.${NC} ${COLOR}%-55s${NC} ${GRAY}%7s${NC}\n" "$STATUS" "$COUNT" "$file" "$SIZE_STR"
    fi
done < "$TEMP_FILE"

echo -e "${GRAY}──────────────────────────────────────────────────────────────────────────────${NC}"
echo ""

# Légende
echo -e "${GRAY}Légende: ${CYAN}[C]${GRAY}=Commité ${YELLOW}[M]${GRAY}=Modifié ${GREEN}[+]${GRAY}=Ajouté${NC}"
echo ""

# Résumé
TOTAL_SIZE=0
while IFS= read -r file; do
    if [ -f "$file" ]; then
        SIZE=$(stat -c "%s" "$file" 2>/dev/null || echo "0")
        TOTAL_SIZE=$((TOTAL_SIZE + SIZE))
    fi
done < "$TEMP_FILE"

if [ "$TOTAL_SIZE" -gt 1048576 ]; then
    TOTAL_SIZE_STR="$(echo "scale=2; $TOTAL_SIZE/1048576" | bc) Mo"
elif [ "$TOTAL_SIZE" -gt 1024 ]; then
    TOTAL_SIZE_STR="$(echo "scale=2; $TOTAL_SIZE/1024" | bc) Ko"
else
    TOTAL_SIZE_STR="$TOTAL_SIZE octets"
fi
echo -e "${BOLD}Résumé:${NC} ${FILE_COUNT} fichiers (${TOTAL_SIZE_STR})"
echo ""

# Demande de confirmation
echo -e "${BOLD}Voulez-vous déployer ces fichiers ?${NC}"
echo -e "${GRAY}(o)ui / (n)on${NC}"
echo -n "> "
read -r REPLY

case $REPLY in
    o|O|oui|OUI|y|Y|yes|YES)
        ;;
    *)
        echo -e "${YELLOW}Déploiement annulé${NC}"
        exit 0
        ;;
esac

echo ""
echo -e "${YELLOW}🚀 Déploiement en cours...${NC}"
echo ""

# Déployer avec curl (FTP)
SUCCESS=0
ERRORS=0

while IFS= read -r file; do
    if [ -f "$file" ]; then
        REMOTE_PATH="$FTP_REMOTE_PATH/$file"

        # Upload avec curl
        curl -s --ftp-create-dirs \
            -T "$file" \
            "ftp://$FTP_USER:$FTP_PASSWORD@$FTP_HOST:$FTP_PORT$REMOTE_PATH" \
            2>/dev/null

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}  ✓${NC} $file"
            SUCCESS=$((SUCCESS + 1))
        else
            echo -e "${RED}  ✗${NC} $file"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done < "$TEMP_FILE"

# Résultat final
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
if [ "$ERRORS" -eq 0 ]; then
    echo -e "${BLUE}║${NC}        ${GREEN}✓ Déploiement terminé avec succès${NC}              ${BLUE}║${NC}"
else
    echo -e "${BLUE}║${NC}        ${YELLOW}⚠ Déploiement terminé avec erreurs${NC}             ${BLUE}║${NC}"
fi
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Fichiers déployés: ${GREEN}$SUCCESS${NC}"
if [ "$ERRORS" -gt 0 ]; then
    echo -e "  Erreurs:           ${RED}$ERRORS${NC}"
fi
echo ""
