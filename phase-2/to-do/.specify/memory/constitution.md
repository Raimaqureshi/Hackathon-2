<!--
Sync Impact Report:
Version change: None (initial creation) -> 0.1.0
List of modified principles: All principles are newly defined.
Added sections: All sections are newly defined.
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending
  - .specify/templates/spec-template.md: ⚠ pending
  - .specify/templates/tasks-template.md: ⚠ pending
  - .specify/commands/sp.adr.toml: ⚠ pending
  - .specify/commands/sp.analyze.toml: ⚠ pending
  - .specify/commands/sp.checklist.toml: ⚠ pending
  - .specify/commands/sp.clarify.toml: ⚠ pending
  - .specify/commands/sp.constitution.toml: ✅ updated
  - .specify/commands/sp.git.commit_pr.toml: ⚠ pending
  - .specify/commands/sp.implement.toml: ⚠ pending
  - .specify/commands/sp.phr.toml: ⚠ pending
  - .specify/commands/sp.plan.toml: ⚠ pending
  - .specify/commands/sp.reverse-engineer.toml: ⚠ pending
  - .specify/commands/sp.specify.toml: ⚠ pending
  - .specify/commands/sp.tasks.toml: ⚠ pending
  - .specify/commands/sp.taskstoissues.toml: ⚠ pending
Follow-up TODOs: Ensure all dependent templates and command files are updated to align with the new constitution principles and technology stack.
-->
# Spec-Kit Constitution — Phase II

You are Claude Code operating under Spec-Driven Development rules.

## Project
- **Name**: Todo Full-Stack Web Application
- **Constitution Version**: 0.1.0
- **Ratification Date**: 2026-01-07
- **Last Amended Date**: 2026-01-07

## Phase Context
Current Phase: Phase II — Todo Full-Stack Web Application
Start Mode: Fresh Start

All functionality is implemented directly as a web application.

## Core Objective
Build a secure, multi-user, full-stack Todo web application from scratch using modern web technologies and persistent storage.

## Mandatory Rules
1. Treat this as a greenfield project.
2. Specs are the single source of truth.
3. Always read relevant specs before implementation.
4. If implementation conflicts with specs, fix the code — not the spec (unless told otherwise).
5. Do not implement features not explicitly defined in specs.

## Fixed Technology Stack
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT-based)
- Spec System: GitHub Spec-Kit Plus + Claude Code

## Authentication & Security (Critical)
1. Authentication is REQUIRED from day one.
2. Better Auth runs ONLY on the frontend.
3. Better Auth MUST issue JWT tokens.
4. Every API request MUST include:
   Authorization: Bearer <JWT_TOKEN>
5. Backend MUST:
   - Verify JWT using BETTER_AUTH_SECRET
   - Decode token and extract user_id
   - Reject requests without valid JWT (401)
   - Enforce task ownership on every operation

## API Rules
1. All endpoints must be RESTful.
2. Base path: `/api/`
3. API behavior must follow:
   @specs/api/rest-endpoints.md
4. user_id from JWT is the source of truth.
5. user_id in URL must match authenticated user.

## Database Rules
1. Follow schema defined in:
   @specs/database/schema.md
2. Tasks MUST include user_id.
3. All queries MUST be filtered by authenticated user_id.
4. Use SQLModel for all DB operations.

## Frontend Rules
1. Use Next.js App Router.
2. Server Components by default.
3. Client Components only for interactivity and auth.
4. Centralized API client is mandatory.
5. Attach JWT token to all API requests.
6. UI must be responsive and accessible.

## Backend Rules
1. Use FastAPI dependencies or middleware for JWT verification.
2. Never trust client-provided user identifiers.
3. Use Pydantic models for validation.
4. Handle all errors with proper HTTP status codes.

## Feature Scope — Phase II Only
Allowed:
- User signup & signin
- Task CRUD operations
- Toggle task completion
- User-specific task isolation

Not Allowed:
- Console application logic
- AI chatbot
- Task sharing
- Admin roles

## Development Workflow
1. Write or read spec → @specs/features/*.md
2. Implement backend first
3. Implement frontend next
4. Verify spec compliance
5. Iterate only via spec updates

## Output Expectations
- Clean and readable code
- No legacy or console-based logic
- Environment variables for secrets
- Production-ready structure
- Clear separation between frontend and backend

You must strictly follow this constitution for all Phase II work.

---
Governance:
This constitution may be amended by mutual agreement of the project architects.
Version changes will follow semantic versioning.
Compliance will be reviewed at the beginning of each phase.