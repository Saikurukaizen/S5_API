#!/bin/sh
set -e

cd /var/www/html

# Esperar a que MySQL esté listo
echo "Waiting for database..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection..."
  sleep 2
done

echo "Database is ready!"

# Ejecutar migraciones y seeders
echo "Running migrations and seeders..."
php artisan migrate:fresh --seed --force

# Generar claves de Passport (si lo usas)
php artisan passport:keys --force 2>/dev/null || true

# Cachear configuración
php artisan config:cache
php artisan route:cache

echo "Application is ready!"

# Iniciar el servidor
exec php artisan serve --host=0.0.0.0 --port=8080
```
