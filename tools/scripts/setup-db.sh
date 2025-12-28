#!/bin/bash

#
# Agency Platform - Database Setup Script
#
# Usage:
#   ./setup-db.sh                  # Setup local PostgreSQL
#   ./setup-db.sh --neon           # Setup Neon (serverless Postgres)
#   ./setup-db.sh --supabase       # Setup Supabase
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Check if .env.local exists
check_env() {
    if [ ! -f .env.local ]; then
        log_warning ".env.local not found. Creating from .env.example..."
        if [ -f .env.example ]; then
            cp .env.example .env.local
            log_success "Created .env.local"
        else
            log_error "No .env.example found"
            exit 1
        fi
    fi
}

# Setup local PostgreSQL
setup_local() {
    log_info "Setting up local PostgreSQL..."

    # Check if PostgreSQL is running
    if command -v pg_isready &> /dev/null; then
        if pg_isready -q; then
            log_success "PostgreSQL is running"
        else
            log_warning "PostgreSQL is not running. Please start it first."
            exit 1
        fi
    else
        log_warning "pg_isready not found. Please ensure PostgreSQL is installed."
    fi

    # Run Drizzle migrations
    log_info "Running database migrations..."
    npm run db:push

    log_success "Local database setup complete"
}

# Setup Neon
setup_neon() {
    log_info "Setting up Neon (serverless Postgres)..."

    echo ""
    echo "  To set up Neon:"
    echo "  1. Go to https://neon.tech and create a project"
    echo "  2. Copy your connection string"
    echo "  3. Add it to .env.local as DATABASE_URL"
    echo ""

    read -p "Enter your Neon DATABASE_URL: " db_url

    if [ -n "$db_url" ]; then
        # Update .env.local
        if grep -q "DATABASE_URL=" .env.local; then
            sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"$db_url\"|" .env.local
        else
            echo "DATABASE_URL=\"$db_url\"" >> .env.local
        fi
        log_success "DATABASE_URL updated in .env.local"

        # Run migrations
        log_info "Running database migrations..."
        npm run db:push
        log_success "Neon database setup complete"
    else
        log_error "No DATABASE_URL provided"
        exit 1
    fi
}

# Setup Supabase
setup_supabase() {
    log_info "Setting up Supabase..."

    echo ""
    echo "  To set up Supabase:"
    echo "  1. Go to https://supabase.com and create a project"
    echo "  2. Go to Settings > Database > Connection string"
    echo "  3. Copy the URI connection string"
    echo ""

    read -p "Enter your Supabase DATABASE_URL: " db_url

    if [ -n "$db_url" ]; then
        if grep -q "DATABASE_URL=" .env.local; then
            sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"$db_url\"|" .env.local
        else
            echo "DATABASE_URL=\"$db_url\"" >> .env.local
        fi
        log_success "DATABASE_URL updated in .env.local"

        npm run db:push
        log_success "Supabase database setup complete"
    else
        log_error "No DATABASE_URL provided"
        exit 1
    fi
}

# Main
main() {
    echo ""
    echo "  🗄️  Agency Platform Database Setup"
    echo "  ───────────────────────────────────"
    echo ""

    check_env

    case "$1" in
        --neon)
            setup_neon
            ;;
        --supabase)
            setup_supabase
            ;;
        *)
            setup_local
            ;;
    esac
}

main "$@"
