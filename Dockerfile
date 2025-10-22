# Este Dockerfile "proxy" simplemente reenvía el build al Dockerfile real de fitbit_api

# Copiamos el contenido de la subcarpeta de la API
FROM php:8.2-fpm

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev curl git \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Copiamos el código de la API desde la subcarpeta
COPY S5.01_API_REST/fitbit_api/ /var/www

WORKDIR /var/www

# Instalamos composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Copiamos el entrypoint original
COPY S5.01_API_REST/fitbit_api/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8000
CMD ["php-fpm"]