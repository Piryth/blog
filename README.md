# Blog Deployment

This document describes how to deploy the blog application using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose
- Go
- A Google Cloud Platform project with a service account key

## Deployment

To deploy the application, you can use the provided `docker-compose.yml` file. This will build the Docker images for the `api` and `front` services and run them in containers.

### Steps

1.  **Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable:**

    Before running the application, you need to set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your Google Cloud service account key file.

    ```sh
    export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/gcp-credentials.json
    ```

2.  **Create an API Key File:**

    The `docker-compose.yml` file uses a secret to manage the API key. Create a file named `api_key.txt` in the root of the project and add your desired API key to it.

    ```sh
    echo "your-secret-api-key" > api_key.txt
    ```

3.  **Build and Run the Application:**

    You can build and run the application using the following command:

    ```sh
    docker-compose up --build
    ```

    This will build the images for the `api` and `front` services and start the containers. The `--build` flag is only necessary the first time you run the command, or if you have made changes to the Dockerfiles.

    Alternatively, you can use the provided `run.sh` script, which will run the `docker-compose up` command for you.

    ```sh
    ./run.sh
    ```

4.  **Access the Application:**

    Once the containers are running, you can access the application at the following URLs:

    -   Frontend: http://localhost:3000
    -   Backend: http://localhost:8080

### Docker Compose Explained

The `docker-compose.yml` file defines three services:

-   `db`: A PostgreSQL database container.
-   `api`: The Go backend API.
-   `front`: The Next.js frontend.

The `depends_on` option ensures that the services are started in the correct order. The `volumes` are used to persist the database data and to mount the application code into the containers for development. The `secrets` are used to securely manage the API key.
