-- Drop the foreign key constraints from postCategories table
ALTER TABLE postCategories DROP CONSTRAINT fk_post;
ALTER TABLE postCategories DROP CONSTRAINT fk_category;

-- Drop the foreign key constraint from posts table
ALTER TABLE posts DROP CONSTRAINT fk_user;

-- Drop the postCategories table
DROP TABLE IF EXISTS postCategories;

-- Drop the categories table
DROP TABLE IF EXISTS categories;

-- Drop the posts table
DROP TABLE IF EXISTS posts;

-- Drop the users table
DROP TABLE IF EXISTS users;