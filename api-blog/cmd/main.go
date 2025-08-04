package main

import (
	"blog/api-blog/api"
	"blog/api-blog/api/middleware"
	"blog/api-blog/database"
	"blog/api-blog/logger"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
	"net/http"
	"os"
)

func main() {
	logger.Init()

    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal().Err(err).Msg("Error loading .env file")
    }

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	connStr := fmt.Sprintf("user=%s dbname=%s sslmode=disable password=%s host=%s port=%s",
		dbUser, dbName, dbPassword, dbHost, dbPort)
	pool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to connect to database")
	}
	defer pool.Close()

	queries := database.New(pool)

	r := gin.New()
	r.Use(CorsMiddleware())
	r.Use(gin.Recovery())
	r.Use(middleware.Logger())

	api.SetupRoutes(r, queries)

	err = r.Run(":8080")
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to start server")
	}
}

func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH, DELETE, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}