# --- Builder Stage ---
FROM golang:1.24.1-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git ca-certificates

WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application statically
# CGO_ENABLED=0 is important for creating a static binary that can run in a minimal image
# -ldflags="-w -s" strips debug information, reducing the binary size
RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o /go/bin/app cmd/main.go

# --- Final Stage ---
FROM alpine:latest

# Install runtime dependencies
# Only postgresql-client is needed to check if the database is ready
RUN apk add --no-cache postgresql-client bash

# Install migrate
RUN apk add --no-cache curl && \
    curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate.linux-amd64 /usr/local/bin/migrate && \
    apk del curl

WORKDIR /app

# Copy the entrypoint script and migrations from the builder stage
COPY --from=builder /app/entrypoint.sh .
COPY --from=builder /app/database/migrations ./database/migrations

# Copy the built application from the builder stage
COPY --from=builder /go/bin/app .

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["./entrypoint.sh"]