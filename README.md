# Task Manager — Full-Stack Node.js Application

A simple, lightweight, and professionally structured full-stack Task Manager application built with **Node.js, Express, PostgreSQL, HTML, CSS, and JavaScript**.

## Tech Stack

* **Frontend:** Plain HTML, CSS, and JavaScript — no frontend framework required
* **Backend:** Node.js + Express.js using an MVC architecture
* **Database:** PostgreSQL
* **Containerization:** Docker and Docker Compose
* **Architecture:** RESTful API with a clean separation of concerns

## Project Structure

```text
fullstack-app/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # Database connection pool
│   │   ├── controllers/          # Request handlers
│   │   ├── routes/               # API route definitions
│   │   ├── models/               # Database queries
│   │   ├── middleware/           # Error-handling middleware
│   │   └── app.js                # Express application setup
│   ├── server.js                 # Application entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── db/
│   └── init.sql                  # Database schema and seed data
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Features

* Create new tasks
* View all tasks
* View an individual task by ID
* Update existing tasks
* Delete tasks
* Mark tasks as completed or pending
* PostgreSQL-backed persistent storage
* RESTful API
* Health-check endpoint for monitoring and container orchestration
* Docker Compose setup for running the application and database together
* MVC-based backend structure for maintainability and scalability

---

## Getting Started

### Prerequisites

For the Docker-based setup, you only need:

* Docker
* Docker Compose

For running the application without Docker:

* Node.js
* npm
* PostgreSQL

---

## Run Locally with Docker Compose

Docker Compose provides the easiest way to run the application because it starts both the **Node.js application** and **PostgreSQL database** with a single command.

### 1. Start the application

From the project root directory, run:

```bash
docker compose up --build
```

Docker will build the application image and start the required services.

### 2. Open the application

Once the containers are running, open:

**http://localhost:3000**

### 3. Stop the application

Press:

```text
Ctrl+C
```

Alternatively, you can stop the services with:

```bash
docker compose down
```

> **Note:** Do not use the `-v` option if you want to keep the PostgreSQL data volume.

---

## Run Locally Without Docker

If you prefer to run the application directly on your machine, follow the steps below.

### 1. Set up PostgreSQL

Install PostgreSQL locally or use an existing PostgreSQL instance.

Create the database:

```bash
createdb taskdb
```

Initialize the database schema and seed data:

```bash
psql -d taskdb -f db/init.sql
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create your environment configuration file:

```bash
cp .env.example .env
```

Open `.env` and update the PostgreSQL connection details if your local configuration differs from the default values.

### 3. Install Dependencies

Install the backend dependencies:

```bash
npm install
```

### 4. Start the Backend

Start the application:

```bash
npm start
```

### 5. Open the Application

Open your browser and visit:

**http://localhost:3000**

---

## API Documentation

The application exposes a RESTful API for managing tasks.

### Available Endpoints

| Method   | Endpoint         | Description              |
| -------- | ---------------- | ------------------------ |
| `GET`    | `/api/tasks`     | Retrieve all tasks       |
| `GET`    | `/api/tasks/:id` | Retrieve a task by ID    |
| `POST`   | `/api/tasks`     | Create a new task        |
| `PUT`    | `/api/tasks/:id` | Update an existing task  |
| `DELETE` | `/api/tasks/:id` | Delete a task            |
| `GET`    | `/health`        | Check application health |

### Create or Update a Task

`POST /api/tasks`

or

`PUT /api/tasks/:id`

Request body:

```json
{
  "title": "Task title",
  "description": "Optional description",
  "is_done": false
}
```

### Request Fields

| Field         | Type    | Required | Description                             |
| ------------- | ------- | -------- | --------------------------------------- |
| `title`       | String  | Yes      | The title of the task                   |
| `description` | String  | No       | Optional task description               |
| `is_done`     | Boolean | No       | Indicates whether the task is completed |

---

## Health Check

The application provides a dedicated health-check endpoint:

```http
GET /health
```

Example:

```text
http://localhost:3000/health
```

This endpoint can be used by Docker, Kubernetes, load balancers, or monitoring systems to verify that the application is running correctly.

It is also suitable for configuring **Kubernetes liveness and readiness probes**.

---

## Database

The application uses **PostgreSQL** for persistent task storage.

The database initialization script is located at:

```text
db/init.sql
```

This file contains:

* Database schema
* Table definitions
* Initial seed data

When using Docker Compose, the database is automatically initialized according to the configured Docker setup.

---

## Environment Variables

The backend uses environment variables for database configuration.

An example configuration is provided in:

```text
backend/.env.example
```

Create your local `.env` file using:

```bash
cp .env.example .env
```

Update the values according to your PostgreSQL environment.

> **Security:** Never commit your `.env` file or production credentials to Git. Use environment variables, Kubernetes Secrets, AWS Secrets Manager, HashiCorp Vault, or another appropriate secrets-management solution in production.

---

## Deployment

This application is designed to integrate easily with modern **CI/CD and containerized deployment workflows**.

It can be integrated with a pipeline such as:

```text
Git
  ↓
Jenkins
  ↓
Docker Build
  ↓
Container Registry
  ↓
Kubernetes
  ↓
Argo CD
  ↓
Prometheus / Grafana
```

### Kubernetes Deployment

The existing `/health` endpoint can be used for Kubernetes:

* **Liveness probes**
* **Readiness probes**

For a production Kubernetes deployment, PostgreSQL should be deployed or provisioned separately using one of the following approaches:

* PostgreSQL StatefulSet
* Dedicated PostgreSQL service
* Managed PostgreSQL database
* Amazon RDS
* Google Cloud SQL
* Azure Database for PostgreSQL
* Another managed PostgreSQL provider

The application container can then connect to PostgreSQL through Kubernetes configuration and Secrets.

---

## Production Considerations

Before deploying the application to production, consider the following:

### Environment Configuration

Keep production configuration outside the source code and inject it through environment variables or a secrets-management system.

### Database

Use a production-grade PostgreSQL deployment with:

* Persistent storage
* Automated backups
* Monitoring
* Appropriate connection limits
* High availability where required

### Secrets

Never commit credentials, API keys, database passwords, or other sensitive information to the repository.

Use:

* Kubernetes Secrets
* AWS Secrets Manager
* HashiCorp Vault
* Cloud-provider secret-management services

### Monitoring

The application can be integrated with monitoring systems such as:

* Prometheus
* Grafana
* Kubernetes health probes
* Container and infrastructure monitoring solutions

---

## Docker

Build and start the application using:

```bash
docker compose up --build
```

Stop the application with:

```bash
docker compose down
```

To remove containers, networks, and persistent volumes:

```bash
docker compose down -v
```

> **Warning:** Using `docker compose down -v` removes the associated Docker volumes and can result in the loss of locally persisted PostgreSQL data.

---

## Development Workflow

A typical development workflow is:

```text
1. Clone the repository
2. Configure environment variables
3. Start PostgreSQL
4. Initialize the database
5. Install backend dependencies
6. Start the Node.js application
7. Open the frontend
8. Use the REST API to manage tasks
```

For containerized development:

```text
1. Clone the repository
2. Run docker compose up --build
3. Open http://localhost:3000
```

---

## Project Goals

This project demonstrates how to build a clean and maintainable full-stack application using traditional web technologies and a lightweight backend architecture.

It is suitable for learning and demonstrating:

* Node.js development
* Express.js REST APIs
* MVC architecture
* PostgreSQL integration
* Docker containerization
* Docker Compose
* Kubernetes deployment
* CI/CD pipelines
* Git-based development workflows
* Application health monitoring

---

## License

This project is available for educational and development purposes. Add the appropriate license information here if the project is distributed publicly.

---

## Author

**Wajahat Kaleem**

For the latest source code and project updates, visit the project's GitHub repository.
