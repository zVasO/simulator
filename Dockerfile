# Utiliser l'image PHP officielle avec Apache
FROM php:8.2-apache

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer les modules Apache requis
RUN a2enmod rewrite

# Configurer le répertoire de travail
WORKDIR /var/www/html

# Copier le fichier de configuration d'Apache
COPY ./apache/vhost.conf /etc/apache2/sites-available/000-default.conf

# Copier le code de l'application
COPY . .

# Installer les dépendances PHP de l'application
RUN composer install --no-dev --optimize-autoloader

# Exposer le port 80
EXPOSE 80
