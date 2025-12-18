#!/bin/bash

# Set permissions for storage and cache
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Create storage subdirectories if they don't exist
mkdir -p /var/www/storage/framework/cache/data
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/logs
mkdir -p /var/www/bootstrap/cache

# Set permissions again after creating directories
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
while ! php -r "try { new PDO('mysql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: 3306), getenv('DB_USERNAME'), getenv('DB_PASSWORD')); echo 'ok'; } catch (Exception \$e) { exit(1); }" 2>/dev/null; do
    sleep 2
done
echo "MySQL is ready!"

# Check if migrations need to run (check if migrations table exists)
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
    cd /var/www
    php artisan migrate --seed --force
    echo "Migrations and seeders completed!"
else
    echo "Database already initialized. Skipping migrations."
fi

# Execute the main command
exec "$@"
