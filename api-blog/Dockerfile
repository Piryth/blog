# --- Builder Stage ---
FROM golang:1.24.1-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code into the container
COPY . .

# Verify the contents of the working directory (for debugging)
RUN ls -la /app

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main ./cmd/main.go

# Verify the binary was built (for debugging)
RUN ls -la /app/main

# --- Final Stage ---
FROM alpine:latest

# Install CA certificates for HTTPS support
RUN apk --no-cache add ca-certificates

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Verify the binary was copied (for debugging)
RUN ls -la /app/main

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["/app/main"]
