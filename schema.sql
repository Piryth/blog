-- Create the users table
CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR NOT NULL,
    email      VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the posts table
CREATE TABLE IF NOT EXISTS posts
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR NOT NULL,
    slug        VARCHAR NOT NULL,
    content     TEXT    NOT NULL,
    description VARCHAR NOT NULL,
    thumbnail_url VARCHAR NOT NULL,
    user_id INTEGER NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS postCategories
(
    id      SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL
);

-- Add foreign key constraint to posts table
ALTER TABLE posts
    ADD CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE postCategories
    ADD CONSTRAINT fk_post
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE;

ALTER TABLE postCategories
    ADD CONSTRAINT fk_category
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE;
