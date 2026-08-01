FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
        git \
        unzip \
        icu-dev \
        libzip-dev \
        oniguruma-dev \
        autoconf \
        g++ \
        make \
        openssl-dev \
        $PHPIZE_DEPS \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        intl \
        zip \
        opcache \
        mbstring \
    # Extension MongoDB (compilée via PECL)
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && apk del --no-cache $PHPIZE_DEPS
            
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY php.ini /usr/local/etc/php/conf.d/symfony.ini

EXPOSE 9000
CMD ["php-fpm"]
