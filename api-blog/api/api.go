package api

import (
	"blog/api-blog/api/handlers"
	"blog/api-blog/database"
	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, queries *database.Queries, gcsClient *storage.Client) {
	// Initialize the PostHandler
	postHandler := &handlers.PostHandler{Queries: queries}
	userHandler := &handlers.UserHandler{Queries: queries}
	imageHandler := &handlers.ImageHandler{GCSClient: gcsClient}
	sendHandler := &handlers.SendHandler{}

	// Define the routes
	r.POST("/posts", postHandler.CreatePost)
	r.GET("/posts/:slug", postHandler.GetPost)
	r.GET("/posts", postHandler.ListPosts)
	r.PUT("/posts/:slug", postHandler.UpdatePost)
	r.DELETE("/posts/:slug", postHandler.DeletePost)

	r.POST("/users", userHandler.CreateUser)
	r.GET("/users/:id", userHandler.GetUser)
	r.GET("/users", userHandler.ListUsers)
	r.PUT("/users/:id", userHandler.UpdateUser)
	r.DELETE("/users/:id", userHandler.DeleteUser)

	r.POST("/images/upload", imageHandler.UploadImage)

	r.POST("/send", sendHandler.SendMessage)

}

