# UI Specification: Components

**Feature Branch**: `001-phase2-todo-app`
**Created**: 2026-01-07
**Status**: Draft

## Overview

This document details the reusable UI components that will form the building blocks of the Todo Full-Stack Web Application. Components are defined by their purpose, key props, visual states, and accessibility considerations.

## Components

---

### 1. Header Component

-   **Purpose**: Displays application title and global actions like Logout.
-   **Props**:
    -   `title`: `string` - The main title to display (e.g., "My Tasks").
    -   `onLogout`: `() => void` - Callback function for the logout action.
-   **Visual States**:
    -   Default: Title and Logout button visible.
-   **Accessibility**:
    -   Semantic HTML (`<header>` element).
    -   Logout button is clearly labeled and keyboard accessible.

---

### 2. Task Input (Add Task) Component

-   **Purpose**: Allows users to input a new task title and submit it.
-   **Props**:
    -   `onAddTask`: `(title: string) => void` - Callback function to handle adding a new task.
    -   `isLoading`: `boolean` (optional) - Indicates if an add task operation is in progress.
-   **Visual States**:
    -   Default: Empty input field, active "Add" button.
    -   Loading: Input field disabled, "Add" button shows a loading spinner or is disabled.
    -   Error: Input field might show a red border, and an error message appears below.
-   **Accessibility**:
    -   Input field has a clear label or `aria-label`.
    -   "Add" button is keyboard accessible.

---

### 3. TaskList Component

-   **Purpose**: Displays a collection of `TaskItem` components.
-   **Props**:
    -   `tasks`: `Task[]` - An array of task objects to display.
    -   `isLoading`: `boolean` (optional) - Indicates if the task list is currently loading.
    -   `error`: `string | null` (optional) - Error message to display if tasks fail to load.
-   **Visual States**:
    -   Default: Displays `TaskItem` components.
    -   Loading: Displays a loading spinner or skeleton UI.
    -   Error: Displays the `error` message prominently.
    -   Empty: Displays a message like "No tasks yet!" (as defined in Dashboard page).
-   **Accessibility**:
    -   Semantic list structure (`<ul>`).
    -   Proper heading for the list (e.g., `<h2>My Tasks</h2>`).

---

### 4. TaskItem Component

-   **Purpose**: Renders a single task with its details and actions.
-   **Props**:
    -   `task`: `Task` - The task object containing `id`, `title`, `description`, `completed`.
    -   `onToggleComplete`: `(id: string) => void` - Callback to toggle task completion.
    -   `onEditTask`: `(id: string, newTitle: string, newDescription: string) => void` - Callback to edit task details.
    -   `onDeleteTask`: `(id: string) => void` - Callback to delete a task.
    -   `isEditing`: `boolean` (optional) - Controls if the item is in edit mode.
    -   `isLoading`: `boolean` (optional) - Indicates if an operation on *this specific task* is in progress.
-   **Visual States**:
    -   Default: Displays title, description (if any), checkbox/toggle for completion. Edit and Delete buttons/icons.
    -   Completed: Title might be struck through or visually dimmed.
    -   Editing: Title and description become editable input fields. Save/Cancel buttons appear.
    -   Loading: Specific actions (e.g., toggle, delete) might show a small spinner, or the entire item might be dimmed.
-   **Accessibility**:
    -   Checkbox/toggle has `aria-label` for its purpose.
    -   Edit/Delete buttons have accessible names.
    -   Keyboard accessible for all actions.

---

### 5. Button Component

-   **Purpose**: Reusable button element for various actions.
-   **Props**:
    -   `children`: `ReactNode` - The content of the button (e.g., "Login", "Add Task").
    -   `onClick`: `() => void` - Callback function for click event.
    -   `variant`: `'primary' | 'secondary' | 'danger'` (optional) - Visual styling preset.
    -   `type`: `'button' | 'submit'` (optional) - HTML button type.
    -   `disabled`: `boolean` (optional) - Disables the button and changes its appearance.
    -   `isLoading`: `boolean` (optional) - Displays a loading indicator within the button.
-   **Visual States**:
    -   Default, Hover, Focus, Active, Disabled, Loading.
-   **Accessibility**:
    -   Semantic `<button>` tag.
    -   Accessible names from `children` or `aria-label`.
    -   Keyboard navigable.

---

### 6. InputField Component

-   **Purpose**: Reusable input element for text entry (email, password, task title).
-   **Props**:
    -   `label`: `string` - Displayed label for the input.
    -   `type`: `'text' | 'email' | 'password'` - HTML input type.
    -   `value`: `string` - Current value of the input.
    -   `onChange`: `(e: React.ChangeEvent<HTMLInputElement>) => void` - Callback for value changes.
    -   `placeholder`: `string` (optional) - Placeholder text.
    -   `error`: `string | null` (optional) - Error message to display.
    -   `id`: `string` (mandatory) - Unique ID for label association.
-   **Visual States**:
    -   Default, Focus, Error.
-   **Accessibility**:
    -   `label` element associated with input via `htmlFor` and `id`.
    -   `aria-describedby` for error messages.
    -   Keyboard accessible.

---

### 7. Modal Component (for confirmations/edits)

-   **Purpose**: Displays content in an overlay, typically for critical actions like delete confirmation or complex edits (if not inline).
-   **Props**:
    -   `isOpen`: `boolean` - Controls modal visibility.
    -   `onClose`: `() => void` - Callback to close the modal.
    -   `children`: `ReactNode` - Content to display inside the modal.
    -   `title`: `string` (optional) - Title of the modal.
-   **Visual States**:
    -   Open, Closed.
-   **Accessibility**:
    -   Proper `aria-modal` and `role="dialog"` attributes.
    -   Focus management (focus trapped within modal when open).
    -   Keyboard accessibility (e.g., Esc key to close).

## Assumptions

-   Components will be built with React.
-   Styling will primarily use Tailwind CSS classes.

## Open Questions / Clarifications

-   [NEEDS CLARIFICATION: Are there any specific iconography or UI kits to integrate with components?]
-   [NEEDS CLARIFICATION: Should all form submissions have client-side validation in addition to server-side?] (Assuming yes for better UX).