package handlers

import (
	"blog/api-blog/database"
	"context"
)

func AttachCategories(ctx context.Context, queries *database.Queries, postID int32, categories []string) error {
	for _, categoryName := range categories {
		// Check if the category exists
		category, err := queries.GetCategoryByName(ctx, categoryName)
		if err != nil {
			// If the category does not exist, create it
			category, err = queries.CreateCategory(ctx, categoryName)
			if err != nil {
				return err
			}
		}

		// Attach the category to the post
		_, err = queries.AttachCategory(ctx, database.AttachCategoryParams{
			PostID:     postID,
			CategoryID: category.ID,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
