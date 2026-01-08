## Question 1: Password Complexity Requirements

**Context**: From `specs/001-phase2-todo-app/features/authentication.md`:
"**FR-AUTH-003**: The system MUST enforce password complexity requirements during signup (e.g., minimum length, character types - [NEEDS CLARIFICATION: exact password complexity rules?])."

**What we need to know**: What are the specific password complexity requirements for new user signup (e.g., minimum length, required character types)?

**Suggested Answers**:

| Option | Answer | Implications |
|---|---|---|
| A | Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character. | Provides strong security, might impact user signup experience due to strictness. |
| B | Minimum 8 characters. | Basic security, easier user experience. |
| C | Minimum 12 characters, no other specific character types required. | Prioritizes length over character variety, good balance for security and usability. |
| Custom | Provide your own answer | Define specific rules (e.g., "Minimum 10 characters, at least one number and one special character"). |

**Your choice**: _[Wait for user response]_

---

## Question 2: JWT Token Storage Strategy on Frontend

**Context**: From `specs/001-phase2-todo-app/features/authentication.md`:
"**FR-AUTH-011**: The frontend MUST securely store the issued JWT and include it in the `Authorization: Bearer <JWT_TOKEN>` header for all authenticated API requests.
[NEEDS CLARIFICATION: What is the preferred JWT token storage strategy on the frontend for security and user experience (e.g., HttpOnly cookies, localStorage with XSS protection)?]"

**What we need to know**: What is the preferred JWT token storage strategy on the frontend for security and user experience?

**Suggested Answers**:

| Option | Answer | Implications |
|---|---|---|
| A | HttpOnly cookies. | High resistance to XSS attacks, requires backend to set cookies, might be complex for SPAs. |
| B | localStorage with robust XSS protection. | Easier to implement in SPAs, vulnerable to XSS if protection is insufficient. |
| C | Session Storage. | Limited to session lifetime, good for short-term tokens, but user has to re-login on browser close. |
| Custom | Provide your own answer | Define a specific combination or alternative (e.g., "localStorage with a short-lived token and refresh token in HttpOnly cookie"). |

**Your choice**: _[Wait for user response]_

---

## Question 3: Maximum Length for Task Titles and Descriptions

**Context**: From `specs/001-phase2-todo-app/api/rest-endpoints.md`:
"[NEEDS CLARIFICATION: What is the maximum length for task titles and descriptions?]"
And from `specs/001-phase2-todo-app/database/schema.md`:
"[NEEDS CLARIFICATION: Are there specific length constraints for task titles and descriptions beyond typical VARCHAR/TEXT limits that should be enforced at the database level?]"

**What we need to know**: What is the maximum length for task titles and descriptions, both for UI display and database storage?

**Suggested Answers**:

| Option | Answer | Implications |
|---|---|---|
| A | Title: 100 characters, Description: 500 characters. | Common lengths, good balance for usability and storage. |
| B | Title: 255 characters, Description: unlimited (TEXT type). | Maximizes flexibility for users, potential for very long descriptions. |
| C | Title: 50 characters, Description: 200 characters. | More restrictive, good for concise tasks, might limit user expression. |
| Custom | Provide your own answer | Define specific character limits for each. |

**Your choice**: _[Wait for user response]_
