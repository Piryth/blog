package handlers

import (
	"blog/api-blog/api/utils"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"net/http"
)

type SendHandler struct{}

func (h *SendHandler) SendMessage(c *gin.Context) {
	var req struct {
		Name    string `json:"name"`
		Email   string `json:"email"`
		Message string `json:"message"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := utils.SendToNotion(req.Name, req.Email, req.Message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Error().Err(err).Msg("Failed to send message to Notion")
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "message sent"})
}
