---
id: 0003
title: Provide a way to view user data
stage: green
date: 2026-01-11
surface: agent
model: gemini-pro
feature: 002-phase2-todo-app
branch: main
user: HASSAN
command: run_shell_command
labels: ["backend", "database"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/show_users.py
tests:
  - none
---

## Prompt

Okay, tell me how I can see all the users’ data that is saved in the database — from this URL on the backend, or do I need to run something in the terminal?

## Response snapshot

The database is currently empty. Please sign up for a new account in the application at http://localhost:3001/signup. After you have created an account, you can run the command again to see the user data.

## Outcome

- ✅ Impact: The user now has a way to view the user data in the database and understands why no data was initially present.
- 🧪 Tests: none
- 📁 Files: `backend/show_users.py`
- 🔁 Next prompts: The user can now create a user and then view the user data.
- 🧠 Reflection: The user was not aware that the database was empty. Providing a script to view the data and an explanation of why it was empty was a good way to guide the user.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
