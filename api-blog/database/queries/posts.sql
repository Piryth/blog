-- name: CreatePost :one
INSERT INTO posts (title, description, content, slug, thumbnail_url, user_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, title, content, thumbnail_url, user_id, created_at, updated_at;

-- name: GetPost :one
SELECT p.id,
       p.title,
       p.description,
       p.content,
       p.slug,
       p.thumbnail_url,
       p.user_id,
       p.created_at,
       p.updated_at,
       u.name AS author_name,
       array_agg(c.name) AS categories
FROM posts p
         JOIN users u ON p.user_id = u.id
         LEFT JOIN postcategories pc ON p.id = pc.post_id
         LEFT JOIN categories c ON pc.category_id = c.id
WHERE p.slug = $1
GROUP BY p.id, u.name
LIMIT 1;

-- name: ListPosts :many
SELECT p.id,
       p.title,
       p.description,
       p.slug,
       p.thumbnail_url,
       p.user_id,
       p.created_at,
       p.updated_at,
       u.name AS author_name,
       array_agg(c.name) AS categories
FROM posts p
         JOIN users u ON p.user_id = u.id
         LEFT JOIN postcategories pc ON p.id = pc.post_id
         LEFT JOIN categories c ON pc.category_id = c.id
GROUP BY p.id, u.name
ORDER BY p.created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdatePost :one
UPDATE posts
SET title         = $1,
    content       = $2,
    slug          = $3,
    thumbnail_url = $4,
    updated_at    = CURRENT_TIMESTAMP
WHERE slug = $5
RETURNING id, title, description, content, slug, thumbnail_url, user_id, created_at, updated_at;

-- name: DeletePost :exec
DELETE
FROM posts
WHERE slug = $1;
