--- 
id: 0001
title: Update project constitution for Phase II
stage: constitution
date: 2026-01-08
surface: agent
model: gemini
feature: none
branch: 001-phase2-todo-app
user: unknown
command: /sp.constitution
labels: ["constitution", "phase-II"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

This is the Gemini CLI. We are setting up the context for our chat.
Today's date is Thursday, January 8, 2026 (formatted according to the user's locale).
My operating system is: win32
The project's temporary directory is: C:\Users\HASSAN COMPUTER\.gemini\tmp\d8831fd8814b4ad76290c6334d3696c9e4990f05e855224521adad20b76b71e7
I'm currently working in the directory: E:\hackathon2\phase-2\to-do
Here is the folder structure of the current working directories:

Showing up to 200 items (files + folders).

E:\hackathon2\phase-2\to-do\
├───GEMINI.md
├───.gemini\
│   └───commands\
│       ├───sp.adr.toml
│       ├───sp.analyze.toml
│       ├───sp.checklist.toml
│       ├───sp.clarify.toml
│       ├───sp.constitution.toml
│       ├───sp.git.commit_pr.toml
│       ├───sp.implement.toml
│       ├───sp.phr.toml
│       ├───sp.plan.toml
│       ├───sp.reverse-engineer.toml
│       ├───sp.specify.toml
│       ├───sp.tasks.toml
│       └───sp.taskstoissues.toml
└───.specify\
    ├───memory\
    │   └───constitution.md
    ├───scripts\
    │   └───powershell\
    │       ├───check-prerequisites.ps1
    │       ├───common.ps1
    │       ├───create-new-feature.ps1
    │       ├───setup-plan.ps1
    │       └───update-agent-context.ps1
    └───templates\
        ├───adr-template.md
        ├───agent-file-template.md
        ├───checklist-template.md
        ├───phr-template.prompt.md
        ├───plan-template.md
        ├───spec-template.md
        └───tasks-template.md

Reminder: Do not return an empty response when a tool call is required.

My setup is complete. I will provide my first command in the next turn.--- 
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.
handoffs: 
  - label: Build Specification
    agent: sp.specify
    prompt: Implement the feature specification based on the updated constitution. I want to build...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage: 
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution # Spec-Kit Constitution — Phase II 

You are Claude Code operating under Spec-Driven Development rules.

## Phase Context
Current Phase: Phase II — Todo Full-Stack Web Application  

This project does NOT reuse or transform Phase I (console app).
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
- Environment variables for secrets
- Production-ready structure
- Clear separation between frontend and backend

You must strictly follow this constitution for all Phase II work.

```