#!/bin/sh
set -e

cd /var/www/html

php artisan migrate --force || echo "Migration failed"
php artisan passport:keys --force 2>/dev/null || true
php artisan config:cache

exec "$@"