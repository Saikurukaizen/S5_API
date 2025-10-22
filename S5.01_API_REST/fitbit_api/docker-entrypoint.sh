#!/bin/sh
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-3306}

echo "Esperando a que la base de datos ($DB_HOST:$DB_PORT) esté lista..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Esperando conexión con DB..."
  sleep 3
done
echo "Base de datos conectada ✔️"

# Generar clave APP si no existe o está vacía
if [ ! -f .env ] || ! grep -q "APP_KEY=" .env || grep -q "APP_KEY=$" .env; then
    echo "Generando clave de aplicación..."
    php artisan key:generate --force
fi

# Ejecutar migraciones
echo "Ejecutando migraciones..."
php artisan migrate --force

# Verificar si Passport ya está instalado (evitar duplicados)
PASSPORT_MARKER_FILE="/var/www/html/storage/.passport-installed"
PASSPORT_INSTALLED=false

# Verificar el archivo marcador
if [ -f "$PASSPORT_MARKER_FILE" ]; then
    echo "Passport ya fue instalado previamente (marcador encontrado) ✔️"
    PASSPORT_INSTALLED=true
fi

# Verificar si las llaves de Passport existen
if [ -f storage/oauth-private.key ] && [ -f storage/oauth-public.key ]; then
    echo "Llaves Passport ya existen ✔️"
    PASSPORT_INSTALLED=true
fi

# Solo instalar Passport si no está configurado
if [ "$PASSPORT_INSTALLED" = "false" ]; then
    echo "Configurando Passport por primera vez..."
    
    # NUNCA ejecutar passport:install (genera migraciones duplicadas)
    # En su lugar, solo generar las llaves
    php artisan passport:keys --force
    
    # Crear archivo marcador para evitar futuras instalaciones
    touch "$PASSPORT_MARKER_FILE"
    echo "Marcador de instalación creado en $PASSPORT_MARKER_FILE"
    
    echo "Passport configurado correctamente ✔️"
else
    echo "Passport ya está completamente configurado, omitiendo instalación ✔️"
fi

# Cachear configuración
echo "Cacheando configuración..."
php artisan config:cache
php artisan route:cache

echo "Iniciando PHP-FPM..."
exec "$@"
