# Feature Specification: Database Schema

**Feature Branch**: `002-phase2-todo-app`  
**Created**: 2026-01-08  
**Status**: Draft  
**Input**: User description for Phase II specification.

## Overview

This document defines the database schema for the Todo Full-Stack Web Application, utilizing Neon Serverless PostgreSQL and SQLModel for ORM. The schema ensures data integrity, proper relationships between entities, and task ownership enforcement.

## General Database Rules

*   **Database**: Neon Serverless PostgreSQL.
*   **ORM**: SQLModel.
*   **Timestamping**: All tables MUST include `created_at` and `updated_at` columns, automatically managed.
*   **Primary Keys**: All tables MUST have a UUID primary key.
*   **Foreign Keys**: Relationships between tables MUST be enforced with foreign keys.
*   **Task Ownership**: Every task MUST be associated with a `user_id`. All queries for tasks MUST be filtered by the authenticated `user_id`.

## Table: `users`

*   **Purpose**: Stores user account information.
*   **Columns**:
    *   `id`: `UUID` (Primary Key) - Unique identifier for the user.
    *   `email`: `VARCHAR(255)` (Unique, Not Null) - User's email address, used for login.
    *   `hashed_password`: `VARCHAR(255)` (Not Null) - Hashed password for security.
    *   `created_at`: `TIMESTAMP WITH TIME ZONE` (Not Null, Default: current timestamp) - Timestamp of user creation.
    *   `updated_at`: `TIMESTAMP WITH TIME ZONE` (Not Null, Default: current timestamp, On Update: current timestamp) - Timestamp of last update.
*   **Indexes**:
    *   `idx_users_email`: B-tree index on `email` (for fast lookups and unique constraint enforcement).
*   **Relationships**:
    *   One-to-many with `tasks` table (`users.id` -> `tasks.user_id`).

## Table: `tasks`

*   **Purpose**: Stores individual to-do items.
*   **Columns**:
    *   `id`: `UUID` (Primary Key) - Unique identifier for the task.
    *   `description`: `VARCHAR(255)` (Not Null) - The content of the task.
    *   `is_complete`: `BOOLEAN` (Not Null, Default: `false`) - Indicates if the task is completed.
    *   `user_id`: `UUID` (Foreign Key to `users.id`, Not Null) - The ID of the user who owns this task.
    *   `created_at`: `TIMESTAMP WITH TIME ZONE` (Not Null, Default: current timestamp) - Timestamp of task creation.
    *   `updated_at`: `TIMESTAMP WITH TIME ZONE` (Not Null, Default: current timestamp, On Update: current timestamp) - Timestamp of last update.
*   **Indexes**:
    *   `idx_tasks_user_id`: B-tree index on `user_id` (for fast retrieval of a user's tasks).
    *   `idx_tasks_is_complete`: B-tree index on `is_complete` (for filtering completed/incomplete tasks).
*   **Relationships**:
    *   Many-to-one with `users` table (`tasks.user_id` -> `users.id`).

## Task Ownership Rules

*   **Enforcement**: All database operations (create, read, update, delete) on the `tasks` table MUST implicitly or explicitly include a filter for the authenticated `user_id`.
*   **Integrity**: When a user is deleted, all associated tasks for that user SHOULD also be deleted (cascading delete or equivalent ORM behavior). (This will be handled by SQLModel's relationship configuration).

## Data Types & Constraints

*   **UUID**: Used for primary and foreign keys to ensure global uniqueness.
*   **VARCHAR(255)**: Standard length for text fields like email and description. Adjust as needed if longer descriptions are allowed in the future.
*   **TIMESTAMP WITH TIME ZONE**: Ensures consistent time handling across different timezones.
*   **Boolean**: For simple true/false flags like `is_complete`.

## Migrations

*   Database schema changes will be managed using a migration tool (e.g., Alembic, integrated with SQLModel if applicable).
*   All schema changes MUST be versioned and reversible.
