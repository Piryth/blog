#!/bin/sh

# Generate API key
go run api-blog/private/generate_api_key.go >> api_key.txt

# Start services
docker-compose up -d
