#!/bin/sh

set -o errexit
set -o nounset

# Fix permissions for .next directory
sudo mkdir -p /app/.next
sudo chown -R nextjs:nodejs /app/.next
sudo chmod -R 775 /app/.next

exec "$@"
