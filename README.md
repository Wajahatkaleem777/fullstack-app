# Task Manager — Full-Stack Node.js App

Simple, professional-structured full-stack app:

- **Frontend:** Plain HTML/CSS/JS (no framework needed, fast and lightweight)
- **Backend:** Node.js + Express (MVC structure)
- **Database:** PostgreSQL

```
fullstack-app/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # DB connection pool
│   │   ├── controllers/          # request handlers
│   │   ├── routes/               # API routes
│   │   ├── models/               # SQL queries
│   │   ├── middleware/           # error handler
│   │   └── app.js                # express app setup
│   ├── server.js                 # entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── db/init.sql                   # schema + seed data
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Run locally (easiest way — Docker Compose)

Ye ek command se app + database dono chala dega:

```bash
docker compose up --build
```

Phir browser mein kholo: **http://localhost:3000**

Rokne ke liye: `Ctrl+C`, aur remove karne ke liye: `docker compose down` (data volume rakhne ke liye `-v` mat lagana).

## Run locally (without Docker)

1. PostgreSQL local install karo, ya koi bhi Postgres instance chalao.
2. Database aur schema banao:
   ```bash
   createdb taskdb
   psql -d taskdb -f db/init.sql
   ```
3. Backend setup:
   ```bash
   cd backend
   cp .env.example .env
   # .env mein apni DB credentials daalo agar defaults se alag hain
   npm install
   npm start
   ```
4. Browser: **http://localhost:3000**

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|-----------------------|
| GET    | /api/tasks        | Sab tasks list        |
| GET    | /api/tasks/:id    | Ek task by id         |
| POST   | /api/tasks        | Naya task banao       |
| PUT    | /api/tasks/:id    | Task update karo      |
| DELETE | /api/tasks/:id    | Task delete karo      |
| GET    | /health           | Health check          |

Request body for POST/PUT (JSON):
```json
{
  "title": "Task title",
  "description": "Optional description",
  "is_done": false
}
```

## Notes for deployment

- Ye app pehle wale CI/CD project (Jenkins → Docker → Kubernetes → ArgoCD → Prometheus/Grafana) ke sath directly compatible hai — bas `Dockerfile` isi repo ka use karna, aur Kubernetes deployment mein database ke liye ek alag Postgres service/StatefulSet ya managed DB (RDS, Cloud SQL, etc.) add karna hoga.
- `/health` endpoint already Kubernetes liveness/readiness probes ke liye ready hai.
- Production mein `.env` file kabhi commit mat karo — secrets Kubernetes Secrets ya vault mein rakho.
