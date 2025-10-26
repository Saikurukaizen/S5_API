#!/bin/sh
set -e

# Usar variables de entorno de Railway/Laravel
DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-fitbit}
DB_USERNAME=${DB_USERNAME:-fitbit_user}
DB_PASSWORD=${DB_PASSWORD:-fitbit_pass}

echo "🔍 DEBUG - Configuración de DB:"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_DATABASE: $DB_DATABASE"
echo "DB_USERNAME: $DB_USERNAME"
echo "DB_PASSWORD: ********"

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

# Limpiar cache de configuración antes de migrar (IMPORTANTE)
echo "Limpiando cache de configuración..."
php artisan config:clear

# Verificar conexión a base de datos
echo "Verificando conexión a base de datos..."
php artisan db:show 2>&1 || {
    echo "❌ Error: No se puede conectar a la base de datos"
    echo "Intentando con variables de entorno directamente..."
    php artisan config:clear
    php artisan migrate --force
} && {
    # Si la verificación fue exitosa, ejecutar migraciones
    echo "Ejecutando migraciones..."
    php artisan migrate --force
}

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
    
    # Solo generar las llaves
    php artisan passport:keys --force
    
    # Crear archivo marcador para evitar futuras instalaciones
    touch "$PASSPORT_MARKER_FILE"
    echo "Marcador de instalación creado en $PASSPORT_MARKER_FILE"
    
    echo "Passport configurado correctamente ✔️"
else
    echo "Passport ya está completamente configurado, omitiendo instalación ✔️"
fi

# Cachear configuración AL FINAL
echo "Cacheando configuración..."
php artisan config:cache
php artisan route:cache

echo "Iniciando PHP-FPM..."
exec "$@"