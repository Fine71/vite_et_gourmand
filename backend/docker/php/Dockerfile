FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
        git \
        unzip \
        icu-dev \
        libzip-dev \
<<<<<<< HEAD:backend/Vite_GourmandBackEnd/docker/php/Dockerfile
        libssl-dev \
=======
>>>>>>> 256b53b30458a18199d77c378650b59b05ed0090:backend/docker/php/Dockerfile
        oniguruma-dev \
        autoconf \
        g++ \
        make \
        openssl-dev \
        pkgconfig \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        intl \
        zip \
        opcache \
        mbstring \
    # Extension MongoDB (compilée via PECL)
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    # Nettoyage des outils de compilation (image plus légère)
    && apk del autoconf g++ make pkgconfig
<<<<<<< HEAD:backend/Vite_GourmandBackEnd/docker/php/Dockerfile
    
# Dépendances système nécessaires à la compilation de l'extension mongodb
RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config \
    git \
    unzip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Extensions PHP classiques nécessaires à Symfony/Doctrine (MySQL)
RUN docker-php-ext-install pdo pdo_mysql
=======
>>>>>>> 256b53b30458a18199d77c378650b59b05ed0090:backend/docker/php/Dockerfile

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY php.ini /usr/local/etc/php/conf.d/symfony.ini

EXPOSE 9000
CMD ["php-fpm"]
