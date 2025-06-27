package utils

import (
	"context"
	"github.com/dstotijn/go-notion"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func pageBlocksToMarkdown() {

	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	client := notion.NewClient(os.Getenv("NOTION_API_KEY"))

	pagination := notion.PaginationQuery{
		"",
		50,
	}

	blocks, err := client.FindBlockChildrenByID(context.Background(), "21682ad536ce805bb798e59dd58af036", &pagination)

	log.Println(blocks)
	// INPUT : page id

	// QUERY : get block children

	// TREATMENT : iterate over each block

	// FOR EACH : convert the bloc into markdown append it

	// OUTPUT : markdown formatted text

}
