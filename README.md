# Docker Node.js Application Guide

A simple Node.js application built with Express.js, containerized with Docker. This project demonstrates Dockerizing a Node.js web application with development and production configurations.

## Prerequisites

- Node.js 18+ (for local development)
- Docker 20+
- Docker Compose 2+

## Project Structure

```
node-app/
├── src/
│   ├── main.js          # Express application entry point
│   └── pages/
│       └── home.html    # Static HTML page
├── Dockerfile           # Production Docker configuration
├── docker-compose.yml   # Development Docker configuration
├── .dockerignore        # Files excluded from Docker builds
├── package.json         # Node.js dependencies and scripts
└── README.md            # This file
```

## Quick Start

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start the development server with auto-reload
npm run dev

# The application will be available at http://localhost:8080
```

### Docker Development

```bash
# Build and start the development container
docker-compose up --build

# Or in detached mode
docker-compose up -d --build

# The application will be available at http://localhost:8080
# With auto-reload enabled for code changes
```

### Docker Production

```bash
# Build the production image
docker build -t node-app .

# Run the production container
docker run -p 8080:8080 -d node-app

# The application will be available at http://localhost:8080
```

## Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start development container in detached mode |
| `docker-compose down` | Stop and remove development containers |
| `docker-compose build` | Rebuild the development image |
| `docker-compose logs -f` | View real-time logs |
| `docker-compose exec app sh` | Access container shell |
| `docker build -t node-app .` | Build production image |
| `docker run -p 8080:8080 node-app` | Run production container |

## Application Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serves the home page (home.html) |
| `/health` | GET | Health check endpoint returning service status |

### Health Check Response

```json
{
  "status": "ok",
  "statusCode": 200,
  "message": "Service is healthy",
  "service": "docker-guide",
  "uptime": 123.456,
  "timestamp": "2026-09-29T23:06:00.000Z"
}
```

## Development vs Production

### Development Configuration
- Uses `docker-compose.yml`
- Mounts local directory for live code reloading
- Runs with `--watch` flag for auto-reload
- Maps port 8080 to host
- Uses `NODE_ENV=development`

### Production Configuration
- Uses `Dockerfile`
- Installs production dependencies only (`--omit=dev`)
- Runs as non-root user (`node`)
- Uses `NODE_ENV=production`
- Exposes port 8080

## Docker Configuration Details

### Dockerfile
- Base image: `node:22-alpine` (lightweight Alpine Linux)
- Working directory: `/app`
- Copies `package.json` and `package-lock.json` first for layer caching
- Installs dependencies with `npm ci --omit=dev`
- Copies all files
- Sets environment variable `NODE_ENV=production`
- Exposes port 8080
- Runs as user `node` for security
- Starts with `node src/main.js`

### docker-compose.yml
- Service name: `app`
- Builds from current directory
- Maps port 8080 host to 8080 container
- Mounts local directory as volume for live reload
- Mounts `node_modules` as separate volume to prevent host override
- Sets `NODE_ENV=development`
- Overrides command to use `npm run dev` (with --watch)

## Tips

1. **Development Workflow**: Use `docker-compose up` for development. Your code changes will be reflected immediately without rebuilding the container.

2. **Production Build**: For production, use `docker build` and `docker run` directly. The production image is optimized with only necessary dependencies.

3. **Environment Variables**: Add a `.env` file for custom environment variables. This file is excluded from Docker builds via `.dockerignore`.

4. **Debugging**: To debug inside a running container:
   ```bash
   docker-compose exec app sh
   ```

5. **Cleanup**: To remove all Docker resources:
   ```bash
   docker-compose down -v  # Removes containers and volumes
   docker rmi node-app    # Removes built image
   ```

## License

ISC
