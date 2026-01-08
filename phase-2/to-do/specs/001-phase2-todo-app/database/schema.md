# Database Schema Specification

**Feature Branch**: `001-phase2-todo-app`
**Created**: 2026-01-07
**Status**: Draft

## Overview

This document defines the database schema for the Todo Full-Stack Web Application, utilizing Neon Serverless PostgreSQL and SQLModel for ORM. The schema prioritizes user data isolation and efficient task management.

## Tables

### `users` Table

-   **Purpose**: Stores user account information.
-   **Fields**:
    -   `id`: `UUID` (Primary Key, automatically generated)
    -   `email`: `VARCHAR(255)` (Unique, Not Null) - User's email address, used for login.
    -   `password_hash`: `VARCHAR(255)` (Not Null) - Hashed and salted password.
    -   `created_at`: `TIMESTAMP` (Not Null, Default: current timestamp) - Timestamp of user registration.
    -   `updated_at`: `TIMESTAMP` (Not Null, Default: current timestamp, On Update: current timestamp) - Timestamp of last user profile update.
-   **Indexes**:
    -   `email` (Unique Index) - For fast lookup and uniqueness enforcement.

### `tasks` Table

-   **Purpose**: Stores individual to-do items.
-   **Fields**:
    -   `id`: `UUID` (Primary Key, automatically generated)
    -   `user_id`: `UUID` (Foreign Key, Not Null) - References `users.id`.
    -   `title`: `VARCHAR(255)` (Not Null) - The main description of the task.
    -   `description`: `TEXT` (Nullable) - Additional details for the task.
    -   `completed`: `BOOLEAN` (Not Null, Default: `FALSE`) - Indicates if the task is completed.
    -   `created_at`: `TIMESTAMP` (Not Null, Default: current timestamp) - Timestamp of task creation.
    -   `updated_at`: `TIMESTAMP` (Not Null, Default: current timestamp, On Update: current timestamp) - Timestamp of last task update.
-   **Indexes**:
    -   `user_id` (Index) - For efficient retrieval of tasks belonging to a specific user.
    -   `user_id, completed` (Compound Index) - Potentially useful for querying incomplete/complete tasks for a user.

## Relationships

-   **One-to-Many**: One `user` can have many `tasks`.
-   `tasks.user_id` is a Foreign Key referencing `users.id`.
    -   `ON DELETE CASCADE`: If a user is deleted, all their associated tasks will also be deleted.

## Task Ownership Rules

-   Every `task` record MUST be associated with a valid `user_id`.
-   All database queries for `tasks` MUST include a filter by `user_id` to ensure data isolation.
-   SQLModel will be used to enforce schema integrity and facilitate ORM operations.

## Assumptions

-   UUIDs are suitable for primary keys.
-   Standard timestamp handling for `created_at` and `updated_at` (auto-set on create/update).
-   Password hashing is handled at the application layer before storage in `password_hash`.

## Open Questions / Clarifications

-   [NEEDS CLARIFICATION: Are there specific length constraints for task titles and descriptions beyond typical VARCHAR/TEXT limits that should be enforced at the database level?]
-   [NEEDS CLARIFICATION: Are there any other fields or metadata required for users or tasks that are not currently specified?]