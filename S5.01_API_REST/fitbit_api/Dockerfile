FROM php:8.3-fpm-alpine

# Instala dependencias necesarias
RUN apk add --no-cache \
    bash git curl zip unzip libpng-dev libjpeg-turbo-dev libfreetype-dev \
    oniguruma-dev zlib-dev icu-dev autoconf g++ make \
    libzip-dev netcat-openbsd

# Extensiones PHP requeridas por Laravel
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo pdo_mysql mbstring gd exif pcntl bcmath opcache

# Instala Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia archivos
COPY . .

# Instala dependencias PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || true

# Permisos correctos
RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copia el entrypoint personalizado
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]
