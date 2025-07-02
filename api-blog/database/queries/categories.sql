-- name: CreateCategory :one
INSERT INTO categories (name)
VALUES ($1)
RETURNING id, name;

-- name: ListCategories :many
SELECT name
FROM categories
LIMIT $1 OFFSET $2;

-- name: UpdateCategory :one
UPDATE categories
SET name = $1
WHERE id = $2
RETURNING id, name;

-- name: DeleteCategory :exec
DELETE FROM categories
WHERE name = $1;
