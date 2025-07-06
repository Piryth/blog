package handlers

import (
	"blog/api-blog/database"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type CategoryHandler struct {
	Queries *database.Queries
}

func (h *CategoryHandler) ListCategories(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	categories, err := h.Queries.ListCategories(c, database.ListCategoriesParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if categories == nil {
		categories = []string{}
	}

	c.JSON(http.StatusOK, categories)
}

func (h *CategoryHandler) DeleteCategory(c *gin.Context) {
	name := c.Param("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category name is required"})
		return
	}

	err := h.Queries.DeleteCategory(c, name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
