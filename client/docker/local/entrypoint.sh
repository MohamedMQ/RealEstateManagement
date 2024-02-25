#!/bin/sh

set -o errexit
set -o nounset

# Fix permissions for the entire /app directory
sudo chown -R nextjs:nodejs /app
sudo chmod -R 775 /app

exec "$@"
