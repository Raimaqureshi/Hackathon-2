# Data Model: Phase II Todo Full-Stack Web Application

**Feature Branch**: `002-phase2-todo-app`  
**Created**: 2026-01-08  
**Source**: `@specs/database/schema.md`

## Overview

This document defines the primary data entities for the Todo Full-Stack Web Application, as derived from the database schema specification. These models will be implemented using SQLModel, ensuring a unified approach for data definition and interaction.

## Entities

### Entity: `User`

*   **Description**: Represents an application user.
*   **Attributes**:
    *   `id`: `UUID` (Primary Key, automatically generated) - Unique identifier for the user.
    *   `email`: `str` (Unique, Not Null) - User's email address, serves as login identifier.
    *   `hashed_password`: `str` (Not Null) - Securely stored hashed password.
    *   `created_at`: `datetime` (Not Null, Default: current timestamp) - Timestamp of user creation.
    *   `updated_at`: `datetime` (Not Null, Default: current timestamp, On Update: current timestamp) - Timestamp of last update.
*   **Relationships**:
    *   Has many `Task`s (one-to-many relationship).
*   **Validation Rules**:
    *   `email`: Must be a valid email format, unique.
    *   `hashed_password`: Must meet password strength requirements (min 8 chars, 1 uppercase, 1 lowercase, 1 number).

### Entity: `Task`

*   **Description**: Represents a single to-do item.
*   **Attributes**:
    *   `id`: `UUID` (Primary Key, automatically generated) - Unique identifier for the task.
    *   `description`: `str` (Not Null, max 255 characters, not empty) - The content of the task.
    *   `is_complete`: `bool` (Not Null, Default: `false`) - Indicates whether the task is completed.
    *   `user_id`: `UUID` (Foreign Key to `User.id`, Not Null) - The ID of the user who owns this task.
    *   `created_at`: `datetime` (Not Null, Default: current timestamp) - Timestamp of task creation.
    *   `updated_at`: `datetime` (Not Null, Default: current timestamp, On Update: current timestamp) - Timestamp of last update.
*   **Relationships**:
    *   Belongs to one `User` (many-to-one relationship).
*   **Validation Rules**:
    *   `description`: Must not be empty, maximum length of 255 characters.

## Relationships

*   **User to Task**: A `User` can have multiple `Task`s, but each `Task` belongs to exactly one `User`. This relationship is enforced via the `user_id` foreign key in the `tasks` table.
*   **Ownership Enforcement**: All operations on `Task` entities will be filtered by the `user_id` of the authenticated user, ensuring strict data isolation.
