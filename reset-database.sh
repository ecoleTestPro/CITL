#!/bin/bash

# Script to reset SQLite database
# Usage: bash reset-database.sh

set -e

echo "🗑️  Removing old database..."
rm -f database/database.sqlite

echo "✨ Creating new empty database..."
touch database/database.sqlite
