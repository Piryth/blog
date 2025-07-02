ALTER TABLE postcategories
    ADD COLUMN post_id INTEGER NOT NULL DEFAULT 1;

ALTER TABLE postcategories
    ADD COLUMN category_id INTEGER NOT NULL DEFAULT 1;


ALTER TABLE postCategories
    ADD CONSTRAINT fk_post
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE;

ALTER TABLE postCategories
    ADD CONSTRAINT fk_category
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE;