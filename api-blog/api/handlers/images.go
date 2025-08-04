package handlers

import (
	"cloud.google.com/go/storage"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"io"
	"net/http"
	"os"
	"time"
)

type ImageHandler struct {
	GCSClient *storage.Client
}

func (h *ImageHandler) UploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file"})
		return
	}

	// Open the file
	src, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	defer src.Close()

	// Get the GCS bucket name from environment variables
	bucketName := os.Getenv("GCS_BUCKET_NAME")
	if bucketName == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "GCS bucket name not set"})
		return
	}

	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*50)
	defer cancel()

	// Upload the file to GCS
	obj := h.GCSClient.Bucket(bucketName).Object(file.Filename)
	wc := obj.NewWriter(ctx)
	if _, err := io.Copy(wc, src); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file"})
		return
	}
	if err := wc.Close(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to close writer "})
		log.Error().Err(err).Msg("Failed to close writer")
		return
	}

	// Get the public URL of the uploaded file
	url := fmt.Sprintf("https://storage.googleapis.com/%s/%s", bucketName, file.Filename)

	c.JSON(http.StatusOK, gin.H{"url": url})
}
