#!/bin/sh
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-3306}

echo "Esperando DB en $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 2
done
echo "✔️ DB conectada"

# Crear .env si no existe
if [ ! -f .env ]; then
    echo "Creando archivo .env..."
    cp .env.example .env 2>/dev/null || touch .env
fi

php artisan key:generate --force
php artisan config:clear
php artisan migrate --force

if [ ! -f storage/oauth-private.key ]; then
    php artisan passport:keys --force
fi

php artisan config:cache
php artisan route:cache

exec "$@"