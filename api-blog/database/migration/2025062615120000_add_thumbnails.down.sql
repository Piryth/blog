-- Remove the thumbnail_url column from the posts table
ALTER TABLE posts
    DROP COLUMN thumbnail_url;