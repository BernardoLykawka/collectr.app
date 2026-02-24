# Collectr

Collectr is a full‑stack web application for managing personal collections (coins, stamps, trading cards, games, books, etc.) and the items inside them. Authenticated users can create private or public collections, add rich item details (condition, value, status, etc.), and browse or search public collections created by others.

---

## Features

- User authentication with JWT‑based login and signup
- Create, edit, and delete collections of different types (coins, stamps, cards, games, and more)
- Mark collections as **public** or **private**
- Add detailed items to collections (condition, situation, manufacturer, release year, prices, images)
- Browse and search public collections
- View and quickly access recently edited collections
- REST API documented with OpenAPI/Swagger

---

## Tech Stack

### Frontend

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** TailwindCSS 4
- **UI Components:** Radix UI, lucide‑react icons
- **State & Data:**
  - Auth context with JWT stored client‑side
  - API wrapper and domain services for auth, collections, and items
- **Location:** `frontend/collectr`

### Backend

- **Runtime:** Java 20
- **Framework:** Spring Boot (REST API)
- **Persistence:** Spring Data JPA, Hibernate, PostgreSQL
- **Security:** Spring Security with JWT (jjwt)
- **Documentation:** springdoc‑openapi with Swagger UI
- **Testing:** Spring Boot Test, JUnit 5, Mockito, H2 (in‑memory)
- **Location:** `backend`

### Infra / DevOps

- Docker and Docker Compose for PostgreSQL + backend
- Multi‑stage Dockerfile for the backend application
- Maven Wrapper (`mvnw`, `mvnw.cmd`) for consistent builds

---

## Architecture Overview

- **Backend**
  - Spring Boot app exposing REST endpoints for:
    - Users & authentication
    - Collections
    - Items
  - Runs by default on `http://localhost:8080`
  - Exposes interactive API docs at `http://localhost:8080/docs`

- **Frontend**
  - Next.js app running by default on `http://localhost:3000`
  - All requests to `/api/*` from the frontend are proxied to the backend at `http://localhost:8080/api/*` (configured via `next.config.ts`)

- **Database**
  - PostgreSQL instance used by the Spring Boot application
  - Can be started via Docker Compose or managed manually

---

## Prerequisites

You can run the project either with Docker Compose or entirely with local tools.

### For Docker‑based setup

- Docker
- Docker Compose (or Docker Desktop with Compose support)

### For local (non‑Docker) setup

- **Backend:**
  - Java 20 (or compatible JDK)
  - Maven (optional, because the Maven Wrapper is included)
  - PostgreSQL (if you don't want to use Docker for the database)
- **Frontend:**
  - Node.js (LTS recommended)
  - npm or Yarn

---

## Environment Variables

At the project root, there is a `.env` file used primarily by Docker Compose. It should define (example names):

```env
POSTGRES_USER=collectr
POSTGRES_PASSWORD=collectr
POSTGRES_DB=collectr
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=86400000   
```

---

## Running with Docker Compose (Backend + Database)

From the repository root:

1. Make sure the `.env` file exists and has valid values (see above).
2. Build and start the services:

   ```bash
   docker compose up --build
   ```

3. Once everything is up:
   - Backend: `http://localhost:8080`
   - API docs (Swagger UI): `http://localhost:8080/docs`

By default, this setup starts the PostgreSQL database and the Spring Boot backend. A separate Docker image for the frontend is planned but not yet provided in this repository, so the frontend should be run locally (see below).

---

## Running the Backend Locally (Without Docker for the App)

You can run the backend directly with Java/Maven and either:
- Use Docker *only* for PostgreSQL, or
- Use a locally installed PostgreSQL instance.

### 1. Start PostgreSQL

Ensure a PostgreSQL instance is running and matches the credentials and database name in your environment variables (or `application.yml`). For example, using Docker:

```bash
docker run --name collectr-postgres -e POSTGRES_USER=collectr -e POSTGRES_PASSWORD=collectr -e POSTGRES_DB=collectr -p 5432:5432 -d postgres:16-alpine
```

### 2. Configure environment variables for the backend

Set the same variables used in `.env`, or configure equivalent Spring properties (e.g., `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION`).

### 3. Start the Spring Boot application

From the `backend` directory:

On **Windows**:

```bash
mvnw.cmd spring-boot:run
```

On **Linux / macOS**:

```bash
./mvnw spring-boot:run
```

After the app starts:

- Backend: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/docs`

---

## Running the Frontend Locally

The frontend is a Next.js application located in `frontend/collectr`.

1. Install dependencies:

   ```bash
   cd frontend/collectr
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser:

   - Frontend: `http://localhost:3000`

4. Make sure the backend is running on `http://localhost:8080`.
   - The Next.js app proxies all requests from `/api/*` to `http://localhost:8080/api/*` (configured in `next.config.ts`).

### Production build (optional)

To build and run the frontend in production mode:

```bash
cd frontend/collectr
npm run build
npm start
```

This will start the Next.js server (by default on port `3000`). The backend URL is still expected to be `http://localhost:8080` unless you change the proxy configuration.

---

## Project Structure (High Level)

```text
collectr.app/
├─ backend/                # Spring Boot backend (Java, Spring Data, Security, JWT)
│  ├─ src/main/java/...    # Application, controllers, services, models
│  ├─ src/main/resources/  # application.yml and other resources
│  ├─ pom.xml              # Maven build configuration
│  └─ Dockerfile           # Multi‑stage image for the backend
│
├─ frontend/
│  └─ collectr/            # Next.js app (App Router)
│     ├─ app/              # Routes and layout
│     ├─ components/       # UI and feature components
│     ├─ contexts/         # React contexts (e.g., auth)
│     ├─ lib/              # API client & domain services
│     └─ package.json      # Frontend dependencies & scripts
│
├─ compose.yaml            # Docker Compose for backend + PostgreSQL (and future frontend)
└─ .env                    # Environment variables for Docker Compose
```

---

## API Documentation

When the backend is running, you can explore all available endpoints via Swagger UI:

- `http://localhost:8080/docs`

This documentation includes operations for:

- User registration and authentication
- Creating, updating, listing, and deleting collections
- Creating, updating, listing, and deleting items within collections

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with improvements, bug fixes, or new features.

---
