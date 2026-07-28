FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
        git \
        unzip \
        icu-dev \
        libzip-dev \
        libssl-dev \
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

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY php.ini /usr/local/etc/php/conf.d/symfony.ini

EXPOSE 9000
CMD ["php-fpm"]
