# Use the official Golang image for the backend
FROM golang:1.24.1-alpine AS backend

# Install necessary tools and dependencies
RUN apk add --no-cache git ca-certificates postgresql-client bash
RUN apk add --no-cache curl

# Install migrate
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate.linux-amd64 /usr/local/bin/migrate

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download Go dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the application
RUN go build -o /go/bin/app cmd/main.go

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["/go/bin/app"]
