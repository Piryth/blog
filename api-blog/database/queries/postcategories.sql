-- name: AttachCategory :one
INSERT INTO postcategories (post_id, category_id)
VALUES ($1,$2)
RETURNING id, post_id, category_id;

-- name: DetachCategory :exec
delete from postcategories
    WHERE post_id = $1 and category_id = $2;