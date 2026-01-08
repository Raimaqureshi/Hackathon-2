# Tasks: Phase II Todo Full-Stack Web Application

**Input**: Design documents from `specs/002-phase2-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/

**Tests**: Unit and integration tests will be generated as part of the implementation phases.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- All paths are relative to the project root (`E:\hackathon2\phase-2\to-do`).

## Phase 1: Project Setup (Shared Infrastructure)

**Purpose**: Initialize project structure, dependencies, and configuration for both frontend and backend.

- [ ] T001 Create `backend/` and `frontend/` root directories.
- [ ] T002 Create `backend/src/` and `frontend/src/` directories.
- [ ] T003 Initialize Python virtual environment and `backend/requirements.txt`.
- [ ] T004 Install FastAPI, Uvicorn, SQLModel, Psycopg2-binary in backend.
- [ ] T005 Initialize Next.js project in `frontend/` with TypeScript, ESLint, Prettier, and Tailwind CSS.
- [ ] T006 Configure Tailwind CSS for frontend.
- [ ] T007 Create `.env.example` file in project root with `DATABASE_URL`, `BETTER_AUTH_SECRET` placeholders.
- [ ] T008 Configure shared Git ignores in `.gitignore` for `node_modules`, `__pycache__`, `.venv`, `.env`, `dist`, `build`.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core backend infrastructure for database connection and a basic running FastAPI app.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Create `backend/src/main.py` with basic FastAPI app and `/health` route.
    ```python
    # backend/src/main.py
    from fastapi import FastAPI
    from typing import Dict

    app = FastAPI()

    @app.get("/health", response_model=Dict[str, str])
    async def health_check():
        return {"status": "ok"}
    ```
- [ ] T010 Implement database connection in `backend/src/db.py` using SQLModel and Neon PostgreSQL. (@specs/database/schema.md)
    ```python
    # backend/src/db.py
    from sqlmodel import create_engine, Session, SQLModel
    import os

    DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(DATABASE_URL)

    def create_db_and_tables():
        SQLModel.metadata.create_all(engine)

    def get_session():
        with Session(engine) as session:
            yield session
    ```
- [ ] T011 Define base SQLModel `SQLModel` models in `backend/src/db/models.py` (initially empty). (@specs/database/schema.md)
- [ ] T012 Create `backend/src/api/`, `backend/src/auth/`, `backend/src/services/` directories.
- [ ] T013 Create `backend/src/auth/jwt.py` for JWT utility functions (encoding/decoding).
- [ ] T014 Create `backend/src/auth/deps.py` for JWT authentication dependency placeholder.

## Phase 3: User Authentication (P1 from @specs/features/authentication.md) 🎯 MVP

**Goal**: Enable users to sign up, log in, and log out securely using JWT.

**Independent Test**: Users can successfully register, log in to receive a JWT, and then log out. Protected routes remain inaccessible without a valid JWT.

### Tests for User Authentication

- [ ] T015 [US1] Backend unit tests for password hashing/verification in `backend/tests/unit/test_security.py`.
- [ ] T016 [US1] Backend integration tests for `POST /api/auth/signup` in `backend/tests/api/test_auth.py`.
- [ ] T017 [US2] Backend integration tests for `POST /api/auth/login` in `backend/tests/api/test_auth.py`.
- [ ] T018 [US3] Backend integration tests for `POST /api/auth/logout` in `backend/tests/api/test_auth.py`.
- [ ] T019 [US1] Frontend unit tests for `SignupForm` component in `frontend/tests/unit/test_signup.tsx`.
- [ ] T020 [US2] Frontend unit tests for `LoginForm` component in `frontend/tests/unit/test_login.tsx`.
- [ ] T021 [US3] Frontend E2E tests for user signup flow in `frontend/tests/e2e/auth.spec.ts`.
- [ ] T022 [US3] Frontend E2E tests for user login/logout flow in `frontend/tests/e2e/auth.spec.ts`.

### Implementation for User Authentication

- [ ] T023 [US1] Implement `User` SQLModel in `backend/src/db/models.py`. (@specs/database/schema.md)
- [ ] T024 [US1] Implement password hashing/verification in `backend/src/auth/security.py`. (@specs/features/authentication.md)
- [ ] T025 [US1] Implement JWT token creation/decoding in `backend/src/auth/jwt.py`.
- [ ] T026 [US1] Implement `UserService` (for user creation, fetching) in `backend/src/services/auth.py`.
- [ ] T027 [US1] Implement `POST /api/auth/signup` endpoint in `backend/src/api/auth.py`. (@specs/api/rest-endpoints.md)
- [ ] T028 [US2] Implement `POST /api/auth/login` endpoint in `backend/src/api/auth.py`. (@specs/api/rest-endpoints.md)
- [ ] T029 [US3] Implement `POST /api/auth/logout` endpoint in `backend/src/api/auth.py`. (@specs/api/rest-endpoints.md)
- [ ] T030 [US1] Implement JWT authentication dependency `get_current_user` in `backend/src/auth/deps.py`.
- [ ] T031 [US1] Create `frontend/src/app/signup/page.tsx` for user registration. (@specs/ui/pages-and-components.md)
- [ ] T032 [US2] Create `frontend/src/app/login/page.tsx` for user login. (@specs/ui/pages-and-components.md)
- [ ] T033 [US1] Implement `AuthForm` component in `frontend/src/components/auth-form.tsx`.
- [ ] T034 [US1] Create frontend API client for authentication in `frontend/src/lib/auth-api.ts`.
- [ ] T035 [US1] Implement JWT storage (e.g., local storage) and attachment to API requests in `frontend/src/lib/auth-client.ts`.
- [ ] T036 [US1] Add protected route logic in Next.js `middleware.ts` or `app/` structure.
- [ ] T037 [US3] Implement logout functionality in frontend.

**Checkpoint**: User authentication (signup, login, logout) is fully functional end-to-end, and protected backend APIs require valid JWTs.

## Phase 4: Task CRUD (P1 & P2 from @specs/features/task-crud.md)

**Goal**: Enable authenticated users to create, view, update, toggle completion, and delete their own tasks.

**Independent Test**: Authenticated user can perform all CRUD operations on their tasks, and cannot access other users' tasks.

### Tests for Task CRUD

- [ ] T038 [US1] Backend integration tests for `POST /api/tasks` in `backend/tests/api/test_tasks.py`.
- [ ] T039 [US2] Backend integration tests for `GET /api/tasks` in `backend/tests/api/test_tasks.py`.
- [ ] T040 [US3] Backend integration tests for `PUT /api/tasks/{id}` in `backend/tests/api/test_tasks.py`.
- [ ] T041 [US4] Backend integration tests for `PATCH /api/tasks/{id}/complete` in `backend/tests/api/test_tasks.py`.
- [ ] T042 [US5] Backend integration tests for `DELETE /api/tasks/{id}` in `backend/tests/api/test_tasks.py`.
- [ ] T043 [US2] Frontend unit tests for `TaskList` component in `frontend/tests/unit/test_task-list.tsx`.
- [ ] T044 [US1] Frontend E2E tests for task creation flow in `frontend/tests/e2e/tasks.spec.ts`.
- [ ] T045 [US2] Frontend E2E tests for viewing tasks in `frontend/tests/e2e/tasks.spec.ts`.
- [ ] T046 [US3] Frontend E2E tests for updating tasks in `frontend/tests/e2e/tasks.spec.ts`.
- [ ] T047 [US4] Frontend E2E tests for toggling task completion in `frontend/tests/e2e/tasks.spec.ts`.
- [ ] T048 [US5] Frontend E2E tests for deleting tasks in `frontend/tests/e2e/tasks.spec.ts`.

### Implementation for Task CRUD

- [ ] T049 [US1] Implement `Task` SQLModel in `backend/src/db/models.py`. (@specs/database/schema.md)
- [ ] T050 [US1] Implement `TaskService` (for task CRUD logic with ownership enforcement) in `backend/src/services/task.py`.
- [ ] T051 [US1] Implement `POST /api/tasks` endpoint in `backend/src/api/tasks.py`. (@specs/api/rest-endpoints.md)
- [ ] T052 [US2] Implement `GET /api/tasks` endpoint in `backend/src/api/tasks.py`. (@specs/api/rest-endpoints.md)
- [ ] T053 [US3] Implement `GET /api/tasks/{id}` endpoint in `backend/src/api/tasks.py`. (@specs/api/rest-endpoints.md)
- [ ] T054 [US3] Implement `PUT /api/tasks/{id}` endpoint in `backend/src/api/tasks.py`. (@specs/api/rest-endpoints.md)
- [ ] T055 [US4] Implement `PATCH /api/tasks/{id}/complete` endpoint in `backend/src/api/tasks.py`. (@specs/api/rest-endpoints.md)
- [ ] T056 [US5] Implement `DELETE /api/tasks/{id}` endpoint in `backend/src/api/tasks.py`. (@specs/api/rest-endpoints.md)
- [ ] T057 [US1] Implement `TaskItem` component in `frontend/src/components/task-item.tsx`. (@specs/ui/pages-and-components.md)
- [ ] T058 [US2] Implement `TaskList` component in `frontend/src/components/task-list.tsx`. (@specs/ui/pages-and-components.md)
- [ ] T059 [US1] Implement task creation form/input in `frontend/src/app/dashboard/page.tsx`.
- [ ] T060 [US2] Implement `frontend/src/app/dashboard/page.tsx` for displaying tasks. (@specs/ui/pages-and-components.md)
- [ ] T061 [US3] Implement task editing functionality in `TaskItem` or a separate modal.
- [ ] T062 [US4] Implement task completion toggle in `TaskItem`.
- [ ] T063 [US5] Implement task deletion in `TaskItem`.
- [ ] T064 [US1] Create frontend API client for tasks in `frontend/src/lib/task-api.ts`.

**Checkpoint**: Task CRUD operations are fully functional end-to-end with proper user isolation.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Enhance user experience, ensure quality, and prepare for deployment.

- [ ] T065 [P] Implement consistent error handling and display for frontend (e.g., toast notifications).
- [ ] T066 [P] Implement loading and empty states for frontend UI components (e.g., `TaskList`).
- [ ] T067 [P] Review UI for responsiveness across various screen sizes.
- [ ] T068 [P] Conduct accessibility audit and implement necessary ARIA attributes.
- [ ] T069 Implement basic logging configuration for backend.
- [ ] T070 Update `README.md` with setup instructions, development environment, and deployment notes.
- [ ] T071 Implement initial CI/CD pipeline configuration (e.g., GitHub Actions for linting, testing, building).

## Dependencies & Execution Order

### Phase Dependencies

-   **Phase 1 (Setup)**: No dependencies - can start immediately.
-   **Phase 2 (Foundational)**: Depends on Phase 1 completion - BLOCKS all user stories.
-   **Phase 3 (User Authentication)**: Depends on Phase 2 completion.
-   **Phase 4 (Task CRUD)**: Depends on Phase 2 completion. Can run in parallel with parts of Phase 3 after backend auth is ready.
-   **Phase 5 (Polish & Cross-Cutting Concerns)**: Depends on completion of Phase 3 and 4.

### User Story Dependencies

*   **User Authentication** (P1): Can start after Foundational Phase.
*   **Task CRUD** (P1/P2): Can start after Foundational Phase. Backend Task APIs are dependent on Authentication's JWT verification. Frontend Task UI depends on Frontend Auth integration.

### Parallel Opportunities

-   Frontend UI development can proceed somewhat in parallel with Backend API development once contracts are clear.
-   Within each phase, tasks marked `[P]` can be executed in parallel.

## Implementation Strategy

### Incremental Delivery (Recommended)

1.  Complete Phase 1: Project Setup.
2.  Complete Phase 2: Foundational Backend.
3.  Complete Backend User Authentication (Part of Phase 3).
4.  Complete Frontend User Authentication (Part of Phase 3).
5.  **Checkpoint**: Fully functional user signup, login, logout end-to-end.
6.  Complete Backend Task CRUD (Part of Phase 4).
7.  Complete Frontend Task UI (Part of Phase 4).
8.  **Checkpoint**: Fully functional Task CRUD end-to-end.
9.  Complete Phase 5: Polish & Cross-Cutting Concerns.

## Notes

-   Each user story should be independently completable and testable.
-   Verify tests fail before implementing.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
