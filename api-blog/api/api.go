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
	categoryHandler := &handlers.CategoryHandler{Queries: queries}

	v1 := r.Group("/api/v1")
	v1.Use(handlers.AuthMiddleware())

	// Define the routes
	v1.POST("/posts", postHandler.CreatePost)
	v1.GET("/posts/:slug", postHandler.GetPost)
	v1.GET("/posts", postHandler.ListPosts)
	v1.PUT("/posts/:slug", postHandler.UpdatePost)
	v1.DELETE("/posts/:slug", postHandler.DeletePost)

	v1.POST("/users", userHandler.CreateUser)
	v1.GET("/users/:id", userHandler.GetUser)
	v1.GET("/users", userHandler.ListUsers)
	v1.PUT("/users/:id", userHandler.UpdateUser)
	v1.DELETE("/users/:id", userHandler.DeleteUser)

	v1.POST("/images/upload", imageHandler.UploadImage)

	v1.POST("contact/send", sendHandler.SendMessage)

	v1.GET("/categories", categoryHandler.ListCategories)
	v1.DELETE("/categories/:name", categoryHandler.DeleteCategory)

}
