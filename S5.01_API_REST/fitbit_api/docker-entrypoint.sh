#!/bin/sh
set -e

echo "Esperando a que la base de datos (MySQL) esté lista..."
until nc -z db 3306; do
  echo "Esperando conexión con DB..."
  sleep 3
done
echo "Base de datos conectada ✔️"

# Generar clave APP si no existe
php artisan key:generate --force || true

# Ejecutar migraciones y Passport (si aplica)
php artisan migrate --force || true
php artisan passport:install --force || true

# Cachear configuración
php artisan config:cache || true
php artisan route:cache || true

echo "Iniciando PHP-FPM..."
exec "$@"
