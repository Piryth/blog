package handlers

import (
	"blog/api-blog/database"
	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
	"github.com/rs/zerolog/log"
	"net/http"
	"strconv"
)

type PostHandler struct {
	Queries *database.Queries
}

func (h *PostHandler) CreatePost(c *gin.Context) {
	var req struct {
		Title        string   `json:"title"`
		Content      string   `json:"content"`
		Description  string   `json:"description"`
		UserID       int32    `json:"user_id"`
		ThumbnailUrl *string  `json:"thumbnail_url"`
		Categories   []string `json:"categories"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slugTitle := slug.Make(req.Title)

	thumbnail := ""
	if req.ThumbnailUrl != nil {
		thumbnail = *req.ThumbnailUrl
	}

	post, err := h.Queries.CreatePost(c, database.CreatePostParams{
		Title:        req.Title,
		Content:      req.Content,
		UserID:       req.UserID,
		Description:  req.Description,
		Slug:         slugTitle,
		ThumbnailUrl: thumbnail,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Attach categories to the post
	err = AttachCategories(c, h.Queries, post.ID, req.Categories)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, post)
}

func (h *PostHandler) GetPost(c *gin.Context) {
	post, err := h.Queries.GetPost(c, c.Param("slug"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Error().Err(err).Msg("Failed to get post")
		return
	}

	c.JSON(http.StatusOK, post)
}

func (h *PostHandler) ListPosts(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	posts, err := h.Queries.ListPosts(c, database.ListPostsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Error().Err(err).Msg("Failed to list posts")
		return
	}

	if posts == nil {
		posts = []database.ListPostsRow{}
	}

	c.JSON(http.StatusOK, posts)
}

func (h *PostHandler) UpdatePost(c *gin.Context) {
	baseSlug := c.Param("slug")
	log.Info().Msg(baseSlug + " is the slug")

	var req struct {
		Title        string   `json:"title"`
		Content      string   `json:"content"`
		ThumbnailUrl *string  `json:"thumbnail_url"`
		Categories   []string `json:"categories"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slugTitle := slug.Make(req.Title)

	thumbnail := ""
	if req.ThumbnailUrl != nil {
		thumbnail = *req.ThumbnailUrl
	}

	post, err := h.Queries.UpdatePost(c, database.UpdatePostParams{
		Title:        req.Title,
		Content:      req.Content,
		Slug:         slugTitle,
		Slug_2:       baseSlug,
		ThumbnailUrl: thumbnail,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Error().Err(err).Msg("Failed to update post")
		return
	}

	// Attach categories to the post
	err = AttachCategories(c, h.Queries, post.ID, req.Categories)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}

func (h *PostHandler) DeletePost(c *gin.Context) {
	baseSlug := c.Param("slug")

	err := h.Queries.DeletePost(c, baseSlug)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
