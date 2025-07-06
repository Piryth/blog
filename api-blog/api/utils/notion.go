package utils

import (
	"context"
	"github.com/dstotijn/go-notion"
	"os"
)

func SendToNotion(name, email, message string) error {
	client := notion.NewClient(os.Getenv("NOTION_API_KEY"))
	databaseID := os.Getenv("NOTION_DATABASE_ID")

	properties := &notion.DatabasePageProperties{
		"Name": notion.DatabasePageProperty{
			Title: []notion.RichText{
				{
					Text: &notion.Text{
						Content: name,
					},
				},
			},
		},
		"Email": notion.DatabasePageProperty{
			Email: &email,
		},
		"Message": notion.DatabasePageProperty{
			RichText: []notion.RichText{
				{
					Text: &notion.Text{
						Content: message,
					},
				},
			},
		},
	}

	params := notion.CreatePageParams{
		ParentType:             notion.ParentTypeDatabase,
		ParentID:               databaseID,
		DatabasePageProperties: properties,
	}

	_, err := client.CreatePage(context.Background(), params)
	return err
}
