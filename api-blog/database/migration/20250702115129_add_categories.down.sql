-- Remove the categories column from the posts table
ALTER TABLE posts
    DROP COLUMN categories;