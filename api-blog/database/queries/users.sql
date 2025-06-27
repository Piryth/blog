-- name: CreateUser :one
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING id, name, email, created_at, updated_at;

-- name: GetUser :one
SELECT id, name, email, created_at, updated_at
FROM users
WHERE id = $1
LIMIT 1;

-- name: ListUsers :many
SELECT id, name, email, created_at, updated_at
FROM users
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateUser :one
UPDATE users
SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP
WHERE id = $3
RETURNING id, name, email, created_at, updated_at;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;