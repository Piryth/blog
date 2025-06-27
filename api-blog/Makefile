migrateup:
	migrate -path database/migration -database "postgresql://admin:admin@localhost:5432/database-blog?sslmode=disable" -verbose up

migratedown:
	migrate -path database/migration -database "postgresql://admin:admin@localhost:5432/database-blog?sslmode=disable" -verbose down

sqlc:
	sqlc generate