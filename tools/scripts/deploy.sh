#!/bin/bash

#
# Agency Platform - Deployment Script
#
# Usage:
#   ./deploy.sh                    # Deploy to Vercel (preview)
#   ./deploy.sh --prod             # Deploy to production
#   ./deploy.sh --railway          # Deploy to Railway
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check for required tools
check_requirements() {
    log_info "Checking requirements..."

    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi

    log_success "Requirements satisfied"
}

# Build project
build_project() {
    log_info "Building project..."

    npm run build

    if [ $? -eq 0 ]; then
        log_success "Build completed successfully"
    else
        log_error "Build failed"
        exit 1
    fi
}

# Deploy to Vercel
deploy_vercel() {
    local prod_flag=""

    if [ "$1" == "--prod" ]; then
        prod_flag="--prod"
        log_info "Deploying to Vercel (production)..."
    else
        log_info "Deploying to Vercel (preview)..."
    fi

    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi

    vercel $prod_flag

    if [ $? -eq 0 ]; then
        log_success "Deployed to Vercel successfully"
    else
        log_error "Vercel deployment failed"
        exit 1
    fi
}

# Deploy to Railway
deploy_railway() {
    log_info "Deploying to Railway..."

    if ! command -v railway &> /dev/null; then
        log_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi

    railway up

    if [ $? -eq 0 ]; then
        log_success "Deployed to Railway successfully"
    else
        log_error "Railway deployment failed"
        exit 1
    fi
}

# Main
main() {
    echo ""
    echo "  🚀 Agency Platform Deployment"
    echo "  ─────────────────────────────"
    echo ""

    check_requirements
    build_project

    case "$1" in
        --prod)
            deploy_vercel "--prod"
            ;;
        --railway)
            deploy_railway
            ;;
        *)
            deploy_vercel
            ;;
    esac

    echo ""
    log_success "Deployment complete!"
    echo ""
}

main "$@"
