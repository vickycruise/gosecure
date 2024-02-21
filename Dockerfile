# Use an official PHP image as the base image
FROM php:8.2-apache

# Update package lists and install required dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip

# Configure and install GD extension
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip

# Enable Apache modules
RUN a2enmod rewrite

# Copy existing application directory contents
COPY . /var/www/html/

# Change Apache document root
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf

# Set Apache user and group to match the host user/group
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# Expose port 80
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
