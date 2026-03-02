FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    bash git curl zip unzip libpng-dev libjpeg-turbo-dev freetype-dev \
    oniguruma-dev zlib-dev libzip-dev netcat-openbsd mysql-client

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo pdo_mysql mbstring gd exif pcntl bcmath opcache

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 👇 ahora el contexto ya está en S5.01_API_REST/fitbit_api, no repitas la ruta
COPY . /var/www/html/

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["docker-entrypoint.sh"]
