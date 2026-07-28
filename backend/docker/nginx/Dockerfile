FROM nginx:alpine

RUN apk add --no-cache \
        openssl \
        bash \
        curl \
        git \
        unzip \
    && rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /var/www/html

