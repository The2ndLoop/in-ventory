FROM php:fpm-bullseye AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    git zip unzip nodejs npm 
    # Use nodejs only for n instalation.

# Delete node. Use n for nodejs environment.
RUN npm install n -g \
    && n stable \
    && apt purge -y nodejs npm \
    && apt autoremove -y

# Use MySQL for db.
RUN docker-php-ext-install pdo_mysql

# This way of installing composer is better because we don't have to check the latest hash of composer.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# If you would like to use some packages in local, add them to here.
FROM base AS local
RUN apt-get install -y --no-install-recommends \
    wget vim 

# Use Xdebug for debug and testing.
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Copy ini files to a container to use some local settings.
COPY php.local.ini /usr/local/etc/php/php.ini

# Clean Images
RUN apt-get clean && rm -rf /var/lib/apt/lists/* 


# If you would like to use some packages in stg, add them to here.
FROM base AS stg 
# Copy ini files to a container to use some local settings.
COPY php.ini /usr/local/etc/php/php.ini

# Clean Images
RUN apt-get clean && rm -rf /var/lib/apt/lists/* 

WORKDIR /var/www
