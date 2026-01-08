# API Specification: REST Endpoints

**Feature Branch**: `001-phase2-todo-app`
**Created**: 2026-01-07
**Status**: Draft

## Overview

This document outlines the RESTful API endpoints for the Todo Full-Stack Web Application. All endpoints will follow a consistent `/api/` base path and adhere to standard HTTP methods for CRUD operations. Authentication via JWT is mandatory for most endpoints.

## Base Path: `/api/`

All API endpoints will be prefixed with `/api/`.

## Authentication & Authorization

-   All endpoints marked as "Authenticated" MUST include a valid JWT in the `Authorization: Bearer <JWT_TOKEN>` header.
-   The backend MUST verify the JWT's signature and expiration.
-   For task-related endpoints, the backend MUST extract the `user_id` from the JWT and ensure that the requested operation only applies to tasks owned by that `user_id`.
-   Requests without a valid JWT or invalid JWTs will receive a `401 Unauthorized` response.
-   Requests attempting to access resources belonging to other users will receive a `403 Forbidden` response.

## Error Handling

-   Standard HTTP status codes will be used to indicate the outcome of an API call.
-   Responses for errors will generally be in JSON format, including a clear error message.
    -   `200 OK`: Successful GET, PUT, PATCH, DELETE.
    -   `201 Created`: Successful POST.
    -   `204 No Content`: Successful DELETE where no content is returned.
    -   `400 Bad Request`: Invalid request payload, missing mandatory fields, or validation errors.
    -   `401 Unauthorized`: Authentication credentials are missing or invalid.
    -   `403 Forbidden`: Authenticated user does not have permission to access the resource.
    -   `404 Not Found`: The requested resource does not exist.
    -   `409 Conflict`: Resource already exists (e.g., email already registered).
    -   `500 Internal Server Error`: Generic server-side error.

## Endpoints

---

### User Authentication Endpoints

#### `POST /api/users/signup`

-   **Description**: Registers a new user account.
-   **Method**: `POST`
-   **Authentication**: None (public endpoint)
-   **Request Body (JSON)**:
    ```json
    {
      "email": "string (email format)",
      "password": "string (min 8 chars, strong complexity recommended)"
    }
    ```
-   **Response (201 Created) (JSON)**:
    ```json
    {
      "message": "User registered successfully",
      "user_id": "UUID",
      "email": "string"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: Invalid email/password format, or password not meeting complexity requirements.
    -   `409 Conflict`: Email already registered.

#### `POST /api/users/login`

-   **Description**: Authenticates a user and issues a JWT.
-   **Method**: `POST`
-   **Authentication**: None (public endpoint)
-   **Request Body (JSON)**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
-   **Response (200 OK) (JSON)**:
    ```json
    {
      "access_token": "string (JWT)",
      "token_type": "bearer"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: Missing email/password.
    -   `401 Unauthorized`: Invalid email or password.

---

### Task Management Endpoints

#### `GET /api/tasks`

-   **Description**: Retrieves a list of all tasks for the authenticated user.
-   **Method**: `GET`
-   **Authentication**: Required
-   **Query Parameters**: None (can be extended for filtering/pagination in future phases)
-   **Response (200 OK) (JSON Array)**:
    ```json
    [
      {
        "id": "UUID",
        "user_id": "UUID",
        "title": "string",
        "description": "string | null",
        "completed": "boolean",
        "created_at": "datetime (ISO 8601)",
        "updated_at": "datetime (ISO 8601)"
      },
      ...
    ]
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Missing or invalid JWT.
    -   `500 Internal Server Error`: Server-side issues.

#### `GET /api/tasks/{task_id}`

-   **Description**: Retrieves a single task by its ID for the authenticated user.
-   **Method**: `GET`
-   **Authentication**: Required
-   **Path Parameters**:
    -   `task_id`: `UUID` - The ID of the task to retrieve.
-   **Response (200 OK) (JSON)**:
    ```json
    {
      "id": "UUID",
      "user_id": "UUID",
      "title": "string",
      "description": "string | null",
      "completed": "boolean",
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Missing or invalid JWT.
    -   `403 Forbidden`: Task does not belong to the authenticated user.
    -   `404 Not Found`: Task with the given ID does not exist.

#### `POST /api/tasks`

-   **Description**: Creates a new task for the authenticated user.
-   **Method**: `POST`
-   **Authentication**: Required
-   **Request Body (JSON)**:
    ```json
    {
      "title": "string (min 1 char)",
      "description": "string | null (optional)"
    }
    ```
-   **Response (201 Created) (JSON)**:
    ```json
    {
      "id": "UUID",
      "user_id": "UUID",
      "title": "string",
      "description": "string | null",
      "completed": "boolean",
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: Missing or empty `title`.
    -   `401 Unauthorized`: Missing or invalid JWT.

#### `PUT /api/tasks/{task_id}`

-   **Description**: Updates an existing task for the authenticated user. This is a full replacement.
-   **Method**: `PUT`
-   **Authentication**: Required
-   **Path Parameters**:
    -   `task_id`: `UUID` - The ID of the task to update.
-   **Request Body (JSON)**:
    ```json
    {
      "title": "string (min 1 char)",
      "description": "string | null",
      "completed": "boolean"
    }
    ```
-   **Response (200 OK) (JSON)**:
    ```json
    {
      "id": "UUID",
      "user_id": "UUID",
      "title": "string",
      "description": "string | null",
      "completed": "boolean",
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: Missing or empty `title`, or invalid field types.
    -   `401 Unauthorized`: Missing or invalid JWT.
    -   `403 Forbidden`: Task does not belong to the authenticated user.
    -   `404 Not Found`: Task with the given ID does not exist.

#### `PATCH /api/tasks/{task_id}`

-   **Description**: Partially updates an existing task for the authenticated user.
-   **Method**: `PATCH`
-   **Authentication**: Required
-   **Path Parameters**:
    -   `task_id`: `UUID` - The ID of the task to partially update.
-   **Request Body (JSON)**:
    ```json
    {
      "title": "string (min 1 char, optional)",
      "description": "string | null (optional)",
      "completed": "boolean (optional)"
    }
    ```
-   **Response (200 OK) (JSON)**:
    ```json
    {
      "id": "UUID",
      "user_id": "UUID",
      "title": "string",
      "description": "string | null",
      "completed": "boolean",
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: Empty `title` provided for update, or invalid field types.
    -   `401 Unauthorized`: Missing or invalid JWT.
    -   `403 Forbidden`: Task does not belong to the authenticated user.
    -   `404 Not Found`: Task with the given ID does not exist.

#### `DELETE /api/tasks/{task_id}`

-   **Description**: Deletes a task by its ID for the authenticated user.
-   **Method**: `DELETE`
-   **Authentication**: Required
-   **Path Parameters**:
    -   `task_id`: `UUID` - The ID of the task to delete.
-   **Response (204 No Content)**: Empty response body.
-   **Error Responses**:
    -   `401 Unauthorized`: Missing or invalid JWT.
    -   `403 Forbidden`: Task does not belong to the authenticated user.
    -   `404 Not Found`: Task with the given ID does not exist.

## Assumptions

-   UUIDs are used for `user_id` and `task_id`.
-   Dates are represented in ISO 8601 format.
-   `Better Auth` is responsible for user registration and JWT issuance.
-   Backend will handle validation of input data (e.g., email format, password strength).

## Open Questions / Clarifications

-   [NEEDS CLARIFICATION: What is the maximum length for task titles and descriptions?]
-   [NEEDS CLARIFICATION: Are there any specific requirements for filtering or pagination for the `/api/tasks` endpoint in this phase?]