# Implementation Plan: Phase II Todo Full-Stack Web Application

**Branch**: `002-phase2-todo-app` | **Date**: 2026-01-08 | **Spec**: @specs/002-phase2-todo-app/overview.md
**Input**: Feature specification from `specs/002-phase2-todo-app/`

## Summary

This plan details the implementation strategy for Phase II of the Todo Full-Stack Web Application. It outlines the technical context, validates against the project constitution, and defines the phased approach for developing a secure, multi-user application with core task management and authentication features. The project is a greenfield initiative built with a modern web technology stack, ensuring adherence to spec-driven development principles.

## Technical Context

**Language/Version**: Python 3.11+, TypeScript 5.x+
**Primary Dependencies**:
*   **Frontend**: Next.js 16+ (App Router), React, Tailwind CSS
*   **Backend**: FastAPI, SQLModel
*   **Authentication**: Better Auth (JWT-based)
**Storage**: Neon Serverless PostgreSQL
**Testing**: (NEEDS CLARIFICATION: Specific testing frameworks like Playwright for E2E, Pytest for backend, Jest/React Testing Library for frontend)
**Target Platform**: Web application (browsers)
**Project Type**: Web application (Frontend + Backend)
**Performance Goals**:
*   API response times for critical operations (login, task CRUD) under 200ms p95.
*   Frontend initial load time under 3 seconds.
**Constraints**:
*   All APIs MUST be secured with JWT.
*   Task ownership MUST be enforced at the backend.
*   UI MUST be responsive and accessible.
**Scale/Scope**: Multi-user, supports hundreds of concurrent users. Focus on core task management and authentication as defined in the specifications.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The following project constitution rules are directly addressed and will be enforced throughout the implementation:

*   **Greenfield Project**: All implementation will be from scratch, no reuse of Phase I. (Mandatory Rule 1)
*   **Specs as Source of Truth**: All implementation will strictly follow the generated specifications. (Mandatory Rule 2)
*   **Fixed Technology Stack**: Adherence to Next.js, FastAPI, SQLModel, Neon PostgreSQL, Better Auth. (Fixed Technology Stack)
*   **Authentication Required from Day One**: Critical security aspect, integrated early. (Authentication & Security 1)
*   **JWT Enforcement**: Backend MUST verify JWTs, and frontend MUST attach them. (Authentication & Security 4 & 5)
*   **Task Ownership**: Backend MUST enforce task ownership on every operation. (Authentication & Security 5 & Database Rules 3)
*   **RESTful APIs**: All endpoints will be RESTful with `/api/` base path. (API Rules 1 & 2)
*   **Database Schema Adherence**: Follow `@specs/database/schema.md`. (Database Rules 1)
*   **SQLModel for DB Operations**: All DB operations via SQLModel. (Database Rules 4)
*   **Next.js App Router & Server Components**: Frontend architecture. (Frontend Rules 1 & 2)
*   **FastAPI Dependencies for JWT**: Backend verification mechanism. (Backend Rules 1)
*   **Never Trust Client IDs**: User identity from JWT only. (Backend Rules 2)
*   **Pydantic Models for Validation**: Backend input validation. (Backend Rules 3)

## Project Structure

### Documentation (this feature)

```text
specs/002-phase2-todo-app/
├── plan.md                       # This file (/sp.plan command output)
├── overview.md                   # Overall project summary and scope
├── features/
│   ├── task-crud.md              # Task management feature specification
│   └── authentication.md         # User authentication feature specification
├── api/
│   └── rest-endpoints.md         # Detailed API endpoint specifications
├── database/
│   └── schema.md                 # Database schema definition
├── ui/
│   └── pages-and-components.md   # UI pages and reusable components specification
├── research.md                   # Phase 0 output (if generated)
├── data-model.md                 # Phase 1 output (if generated)
├── quickstart.md                 # Phase 1 output (if generated)
└── contracts/                    # Phase 1 output (if generated)
```

### Source Code (repository root)

Given the "Frontend + Backend" detected in the constitution and specs, "Option 2: Web application" is the chosen structure.

```text
/
├── backend/
│   ├── src/
│   │   ├── api/                  # FastAPI routers/endpoints
│   │   ├── auth/                 # Authentication logic (JWT handling, password hashing)
│   │   ├── db/                   # Database connection, models (SQLModel)
│   │   ├── services/             # Business logic (e.g., UserService, TaskService)
│   │   └── main.py               # Main FastAPI application entry point
│   └── tests/
│       ├── unit/                 # Unit tests for functions/classes
│       ├── integration/          # Integration tests for database/service interactions
│       └── api/                  # API endpoint tests
│
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages and layouts
│   │   ├── components/           # Reusable React components (e.g., TaskItem, Input)
│   │   ├── lib/                  # Utility functions, API client setup
│   │   ├── hooks/                # Custom React hooks
│   │   └── styles/               # Tailwind CSS configuration, global styles
│   └── tests/
│       ├── unit/                 # Unit tests for components/hooks
│       └── e2e/                  # End-to-end tests (e.g., Playwright)
│
├── .env.example                  # Environment variables template
├── package.json                  # Frontend dependencies
├── requirements.txt              # Backend dependencies
├── README.md                     # Project overview
└── tsconfig.json                 # TypeScript configuration
```

**Structure Decision**: The project will adopt a monorepo structure with distinct `backend/` and `frontend/` directories at the root, reflecting the full-stack nature and fixed technology choices. This provides clear separation of concerns while allowing for shared configuration or tooling in the future if needed.

## Complexity Tracking

No immediate complexity violations or unaddressed tradeoffs identified. The greenfield nature and detailed specifications mitigate early complexity.

## Phase 0: Outline & Research

Given the comprehensive specifications and fixed technology stack defined in the constitution, extensive Phase 0 research is not immediately required. All major technical decisions have been pre-determined.

However, specific best practices for integrating "Better Auth" with FastAPI and Next.js, and detailed setup for Neon Serverless PostgreSQL with SQLModel will be explored during initial setup. This will primarily involve reviewing official documentation and established patterns.

**Output**: `research.md` (will contain consolidated best practices for integration)

## Phase 1: Design & Contracts

### 1. Extract entities from feature spec → `data-model.md`

Based on `@specs/database/schema.md`, the primary entities are `User` and `Task`.

**User Entity**:
*   `id`: `UUID` (Primary Key)
*   `email`: `VARCHAR(255)` (Unique, Not Null)
*   `hashed_password`: `VARCHAR(255)` (Not Null)
*   `created_at`: `TIMESTAMP WITH TIME ZONE`
*   `updated_at`: `TIMESTAMP WITH TIME ZONE`

**Task Entity**:
*   `id`: `UUID` (Primary Key)
*   `description`: `VARCHAR(255)` (Not Null, max 255 characters, not empty) - The content of the task.
*   `is_complete`: `BOOLEEN` (Not Null, Default: `false`) - Indicates whether the task is completed.
*   `user_id`: `UUID` (Foreign Key to `User.id`, Not Null) - The ID of the user who owns this task.
*   `created_at`: `TIMESTAMP WITH TIME ZONE`
*   `updated_at`: `TIMESTAMP WITH TIME ZONE`

Validation rules for these entities (e.g., email format, password strength, task description length) are detailed in `features/authentication.md` and `features/task-crud.md`. SQLModel will be used to define these models, including relationships and automatic timestamping.

**Output**: `data-model.md`

### 2. Generate API contracts from functional requirements → `/contracts/`

The API contracts are extensively defined in `@specs/api/rest-endpoints.md`.
This will involve:
*   Defining Pydantic models for request and response bodies for each endpoint (signup, login, logout, task CRUD).
*   Generating OpenAPI schema (FastAPI automatically does this, but it will be explicitly validated).
*   Enforcing HTTP status codes and consistent error response format as specified.

**Output**: `contracts/api-schema.json` (OpenAPI/Swagger)

### 3. Update agent context

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini` to ensure the agent's knowledge base includes the newly defined technologies and project structure.

**Output**: `agent-context.md` (or relevant agent config file)
