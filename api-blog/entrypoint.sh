#!/bin/sh

# Wait for the database to be ready
until pg_isready -h db -p 5432 -U admin; do
  echo "Waiting for database..."
  sleep 2
done

# Run migrations
/usr/local/bin/migrate -path /app/database/migrations -database "postgresql://admin:admin@db:5432/database-blog?sslmode=disable" -verbose up

# Run the command passed as arguments
exec /app/app
