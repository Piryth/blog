migrateup:
	migrate -path database/migrations -database "postgresql://admin:admin@localhost:5432/database-blog?sslmode=disable" -verbose up

migratedown:
	migrate -path database/migrations -database "postgresql://admin:admin@localhost:5432/database-blog?sslmode=disable" -verbose down

sqlc:
	sqlc generate