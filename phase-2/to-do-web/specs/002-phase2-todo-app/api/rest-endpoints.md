# Feature Specification: API REST Endpoints

**Feature Branch**: `002-phase2-todo-app`  
**Created**: 2026-01-08  
**Status**: Draft  
**Input**: User description for Phase II specification.

## Overview

This document details the RESTful API endpoints for the Todo Full-Stack Web Application. All endpoints will follow REST principles, use JSON for request and response bodies, and enforce JWT-based authentication for protected routes. The base path for all APIs will be `/api/`.

## General API Rules

*   **Base Path**: `/api/`
*   **Authentication**: All protected endpoints MUST require a valid JWT provided in the `Authorization: Bearer <TOKEN>` header.
*   **Authorization**: The backend MUST verify the `user_id` from the JWT and ensure it matches the owner of the resource being accessed/modified.
*   **Request/Response Format**: JSON (`application/json`) for all request bodies and successful responses.
*   **Error Handling**: Standard HTTP status codes will be used. Error responses will follow a consistent JSON format:
    ```json
    {
      "detail": "Error message description",
      "code": "ERROR_CODE_ENUM_OR_STRING",
      "fields": {
        "field_name": "Validation error for this field"
      }
    }
    ```
    *   `400 Bad Request`: For invalid input, validation errors.
    *   `401 Unauthorized`: For missing or invalid authentication credentials (JWT).
    *   `403 Forbidden`: For valid credentials but insufficient permissions (e.g., accessing another user's task).
    *   `404 Not Found`: For resource not found.
    *   `422 Unprocessable Entity`: For validation errors in FastAPI.
    *   `500 Internal Server Error`: For unexpected server-side errors.
*   **Rate Limiting**: (Out of scope for Phase II, but noted for future consideration).

## Authentication Endpoints

### `POST /api/auth/signup`

*   **Description**: Registers a new user account.
*   **Authentication**: None (public endpoint).
*   **Request Body**:
    ```json
    {
      "email": "string (email format)",
      "password": "string (min 8 chars, strong password)"
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "message": "User registered successfully",
      "user_id": "uuid"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Invalid email/password format, password not strong enough.
    *   `409 Conflict`: Email already registered.

### `POST /api/auth/login`

*   **Description**: Authenticates a user and issues a JWT.
*   **Authentication**: None (public endpoint).
*   **Request Body**:
    ```json
    {
      "email": "string (email format)",
      "password": "string"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "access_token": "string (JWT)",
      "token_type": "bearer"
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`: Invalid credentials.

### `POST /api/auth/logout`

*   **Description**: Invalidates the current user's JWT/session.
*   **Authentication**: Required (valid JWT).
*   **Request Body**: None.
*   **Response (200 OK)**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`: Missing or invalid JWT.

## Task Endpoints

### `POST /api/tasks`

*   **Description**: Creates a new task for the authenticated user.
*   **Authentication**: Required (valid JWT).
*   **Request Body**:
    ```json
    {
      "description": "string (max 255 chars, not empty)"
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "id": "uuid",
      "description": "string",
      "is_complete": false,
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Invalid description.
    *   `401 Unauthorized`: Missing or invalid JWT.

### `GET /api/tasks`

*   **Description**: Retrieves all tasks for the authenticated user.
*   **Authentication**: Required (valid JWT).
*   **Query Parameters**:
    *   `skip`: `integer` (optional, default 0) - Number of items to skip.
    *   `limit`: `integer` (optional, default 100) - Maximum number of items to return.
*   **Response (200 OK)**:
    ```json
    [
      {
        "id": "uuid",
        "description": "string",
        "is_complete": false,
        "created_at": "datetime (ISO 8601)",
        "updated_at": "datetime (ISO 8601)"
      },
      ...
    ]
    ```
*   **Error Responses**:
    *   `401 Unauthorized`: Missing or invalid JWT.

### `GET /api/tasks/{task_id}`

*   **Description**: Retrieves a specific task by ID for the authenticated user.
*   **Authentication**: Required (valid JWT).
*   **Path Parameters**:
    *   `task_id`: `uuid` - The ID of the task.
*   **Response (200 OK)**:
    ```json
    {
      "id": "uuid",
      "description": "string",
      "is_complete": false,
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`: Missing or invalid JWT.
    *   `403 Forbidden`: User attempts to access a task not owned by them.
    *   `404 Not Found`: Task with the given `task_id` does not exist or is not owned by the user.

### `PUT /api/tasks/{task_id}`

*   **Description**: Updates a specific task's description for the authenticated user.
*   **Authentication**: Required (valid JWT).
*   **Path Parameters**:
    *   `task_id`: `uuid` - The ID of the task to update.
*   **Request Body**:
    ```json
    {
      "description": "string (max 255 chars, not empty)"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "id": "uuid",
      "description": "string",
      "is_complete": false,
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Invalid description.
    *   `401 Unauthorized`: Missing or invalid JWT.
    *   `403 Forbidden`: User attempts to modify a task not owned by them.
    *   `404 Not Found`: Task with the given `task_id` does not exist or is not owned by the user.

### `PATCH /api/tasks/{task_id}/complete`

*   **Description**: Toggles the completion status of a specific task for the authenticated user.
*   **Authentication**: Required (valid JWT).
*   **Path Parameters**:
    *   `task_id`: `uuid` - The ID of the task to update.
*   **Request Body**:
    ```json
    {
      "is_complete": "boolean"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "id": "uuid",
      "description": "string",
      "is_complete": true,
      "created_at": "datetime (ISO 8601)",
      "updated_at": "datetime (ISO 8601)"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Invalid `is_complete` value.
    *   `401 Unauthorized`: Missing or invalid JWT.
    *   `403 Forbidden`: User attempts to modify a task not owned by them.
    *   `404 Not Found`: Task with the given `task_id` does not exist or is not owned by the user.

### `DELETE /api/tasks/{task_id}`

*   **Description**: Deletes a specific task by ID for the authenticated user.
*   **Authentication**: Required (valid JWT).
*   **Path Parameters**:
    *   `task_id`: `uuid` - The ID of the task to delete.
*   **Response (204 No Content)**: Empty response.
*   **Error Responses**:
    *   `401 Unauthorized`: Missing or invalid JWT.
    *   `403 Forbidden`: User attempts to delete a task not owned by them.
    *   `404 Not Found`: Task with the given `task_id` does not exist or is not owned by the user.
