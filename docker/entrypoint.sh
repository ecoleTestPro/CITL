#!/bin/bash

echo "=== CITL App Entrypoint ==="

# Set permissions for all app files
echo "Setting permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Create storage subdirectories
mkdir -p /var/www/storage/framework/cache/data
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/logs
mkdir -p /var/www/bootstrap/cache

# Set permissions again
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
max_tries=30
counter=0
while ! php -r "try { new PDO('mysql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: 3306), getenv('DB_USERNAME'), getenv('DB_PASSWORD')); exit(0); } catch (Exception \$e) { exit(1); }" 2>/dev/null; do
    counter=$((counter + 1))
    if [ $counter -gt $max_tries ]; then
        echo "MySQL connection failed after $max_tries attempts"
        exit 1
    fi
    echo "MySQL not ready, waiting... ($counter/$max_tries)"
    sleep 2
done
echo "MySQL is ready!"

# Clear caches
echo "Clearing caches..."
cd /var/www
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Check if migrations table exists
TABLES=$(php -r "
try {
    \$pdo = new PDO(
        'mysql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: 3306) . ';dbname=' . getenv('DB_DATABASE'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
    );
    \$result = \$pdo->query(\"SHOW TABLES LIKE 'migrations'\");
    echo \$result->rowCount();
} catch (Exception \$e) {
    echo '0';
}
")

if [ "$TABLES" = "0" ]; then
    echo "Database is empty. Running migrations and seeders..."
    php artisan migrate --seed --force
    echo "Migrations and seeders completed!"
else
    echo "Database already initialized. Running pending migrations..."
    php artisan migrate --force
fi

# Cache config for production
if [ "$APP_ENV" = "production" ]; then
    echo "Caching config for production..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

echo "=== App ready! ==="

# Execute the main command
exec "$@"
