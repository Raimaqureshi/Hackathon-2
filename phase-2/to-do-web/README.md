# Todo Full-Stack Web Application (Phase II)

This project implements a full-stack Todo web application with user authentication and task management functionalities.

## Table of Contents

-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Setup Instructions](#setup-instructions)
-   [Development Environment](#development-environment)
-   [Deployment Notes](#deployment-notes)
-   [API Endpoints](#api-endpoints)

## Features

-   User Authentication (Signup, Login, Logout)
-   JWT-based authentication with refresh tokens
-   Rate limiting on authentication endpoints
-   Task Management (Create, Read, Update, Delete)
-   User-specific task ownership
-   Responsive UI with dark mode support
-   Offline support with service worker
-   Enhanced error handling and validation
-   Configurable API endpoints
-   Request retry logic with exponential backoff
-   Centralized configuration management

## Technology Stack

### Backend

-   **Framework**: FastAPI
-   **ORM**: SQLModel
-   **Database**: PostgreSQL (via Neon Serverless)
-   **Authentication**: JWT (JSON Web Tokens)
-   **Language**: Python 3.11+

### Frontend

-   **Framework**: Next.js 14+ (App Router)
-   **UI Library**: React
-   **Styling**: Tailwind CSS
-   **Language**: TypeScript 5.x+
-   **Authentication**: `js-cookie` for JWT storage

## Setup Instructions

### Prerequisites

-   Python 3.11+
-   Node.js 18+ and npm
-   A PostgreSQL database (e.g., a Neon Serverless project)
-   Git

### 1. Clone the repository

```bash
git clone <repository_url>
cd to-do
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the project root (`to-do/.env`) with your database URL and JWT secret:

```
DATABASE_URL="postgresql+psycopg2://user:password@host:port/dbname"
BETTER_AUTH_SECRET="your-super-secret-jwt-key"
```
Replace `your-super-secret-jwt-key` with a strong, random string.

Run database migrations (This will create tables if they don't exist):

```bash
python src/main.py # The tables will be created on startup
```
For production, you might want to use a dedicated migration tool like Alembic.

Run the backend server:

```bash
uvicorn src.main:app --reload
```

The backend API will be available at `http://localhost:8000`.

### 3. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Ensure your `.env` file in the project root contains `NEXT_PUBLIC_API_URL` if your backend is not running on `http://localhost:8000`:

```
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

Run the frontend development server:

```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`.

## Development Environment

### Recommended Tools

-   **IDE**: VS Code (with Python, Pylance, ESLint, Prettier extensions)
-   **Database Client**: DBeaver, pgAdmin, or a command-line client for PostgreSQL.

### Scripts

-   **Backend**:
    -   `uvicorn src.main:app --reload`: Runs the FastAPI development server.
    -   `pip install -r requirements.txt`: Installs backend dependencies.
-   **Frontend**:
    -   `npm install`: Installs frontend dependencies.
    -   `npm run dev`: Runs the Next.js development server.
    -   `npm run build`: Builds the Next.js application for production.
    -   `npm start`: Starts the Next.js production server.

## Deployment Notes

### Backend

-   **Containerization**: Recommended to containerize the FastAPI application using Docker.
-   **Hosting**: Can be deployed to platforms like Heroku, Vercel (for serverless functions), AWS EC2, Google Cloud Run, etc.
-   **Environment Variables**: Ensure `DATABASE_URL` and `BETTER_AUTH_SECRET` are securely configured in your deployment environment.
-   **WSGI Server**: Use a production-ready WSGI server like Gunicorn with Uvicorn workers (e.g., `gunicorn -w 4 -k uvicorn.workers.UvicornWorker src.main:app`).

### Frontend

-   **Hosting**: Next.js applications are commonly deployed to Vercel, Netlify, or self-hosted Node.js servers.
-   **Environment Variables**: Ensure `NEXT_PUBLIC_API_URL` is set to your deployed backend API URL.

## API Endpoints

### Authentication

-   `POST /api/auth/signup`: Register a new user.
-   `POST /api/auth/login`: Authenticate user and get JWT. (Rate limited: 5 requests/minute)
-   `POST /api/auth/logout`: (Client-side token removal) Backend endpoint is a placeholder.

### Tasks

-   `POST /api/tasks`: Create a new task. (Requires authentication)
-   `GET /api/tasks`: Get all tasks for the authenticated user. (Requires authentication)
-   `GET /api/tasks/{id}`: Get a specific task by ID for the authenticated user. (Requires authentication)
-   `PUT /api/tasks/{id}`: Update a specific task by ID for the authenticated user. (Requires authentication)
-   `PATCH /api/tasks/{id}/complete`: Toggle completion status of a task by ID for the authenticated user. (Requires authentication)
-   `DELETE /api/tasks/{id}`: Delete a specific task by ID for the authenticated user. (Requires authentication)

### Health Checks

-   `GET /health`: Application health check
-   `GET /ready`: Application readiness check
