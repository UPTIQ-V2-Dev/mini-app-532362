# API SPECIFICATION

## Database Models

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}
```

## Authentication APIs

EP: POST /v1/auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Duplicate email or validation error", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"},"tokens":{"access":{"token":"eyJhbG...","expires":"2025-11-12T11:30:00Z"},"refresh":{"token":"eyJhbG...","expires":"2025-11-19T10:30:00Z"}}}

---

EP: POST /v1/auth/login
DESC: Login with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Invalid input", "401":"Invalid email or password", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"},"tokens":{"access":{"token":"eyJhbG...","expires":"2025-11-12T11:30:00Z"},"refresh":{"token":"eyJhbG...","expires":"2025-11-19T10:30:00Z"}}}

---

EP: POST /v1/auth/logout
DESC: Logout and invalidate refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"400":"Invalid input", "404":"Token not found", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbG..."}'
EX_RES_204: {}

---

EP: POST /v1/auth/refresh-tokens
DESC: Refresh access tokens using refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}
ERR: {"400":"Invalid input", "401":"Invalid refresh token", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbG..."}'
EX_RES_200: {"access":{"token":"eyJhbG...","expires":"2025-11-12T11:30:00Z"},"refresh":{"token":"eyJhbG...","expires":"2025-11-19T10:30:00Z"}}

---

EP: POST /v1/auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"400":"Invalid email format", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /v1/auth/reset-password
DESC: Reset password using reset token.
IN: query:{token:str!} body:{password:str!}
OUT: 204:{}
ERR: {"400":"Invalid input", "401":"Invalid or expired token", "500":"Internal server error"}
EX_REQ: curl -X POST '/v1/auth/reset-password?token=resetToken123' -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /v1/auth/verify-email
DESC: Verify user email using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"400":"Invalid token", "401":"Token expired or invalid", "500":"Internal server error"}
EX_REQ: curl -X POST '/v1/auth/verify-email?token=verifyToken123'
EX_RES_204: {}

---

EP: POST /v1/auth/send-verification-email
DESC: Send email verification link to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/auth/send-verification-email -H "Authorization: Bearer eyJhbG..."
EX_RES_204: {}

## User Management APIs

EP: POST /v1/users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!} body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email or validation error", "401":"Unauthorized", "403":"Insufficient permissions", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/users -H "Authorization: Bearer eyJhbG..." -H "Content-Type: application/json" -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Smith","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:35:00Z","updatedAt":"2025-11-12T10:35:00Z"}

---

EP: GET /v1/users
DESC: Get paginated list of users (admin only).
IN: headers:{Authorization:str!} query:{name:str, role:str, sortBy:str, limit:int, page:int}
OUT: 200:{results:arr[{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "500":"Internal server error"}
EX_REQ: curl -X GET '/v1/users?page=1&limit=10&role=USER' -H "Authorization: Bearer eyJhbG..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /v1/users/:userId
DESC: Get user by ID (admin or own profile).
IN: headers:{Authorization:str!} params:{userId:int!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /v1/users/1 -H "Authorization: Bearer eyJhbG..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"}

---

EP: PATCH /v1/users/:userId
DESC: Update user information (admin or own profile).
IN: headers:{Authorization:str!} params:{userId:int!} body:{name:str, email:str, password:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Validation error or duplicate email", "401":"Unauthorized", "403":"Insufficient permissions", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X PATCH /v1/users/1 -H "Authorization: Bearer eyJhbG..." -H "Content-Type: application/json" -d '{"name":"John Updated"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Updated","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:35:00Z"}

---

EP: DELETE /v1/users/:userId
DESC: Delete user (admin or own profile).
IN: headers:{Authorization:str!} params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /v1/users/1 -H "Authorization: Bearer eyJhbG..."
EX_RES_200: {}

## Profile APIs

EP: GET /profile
DESC: Get current user's profile information.
IN: headers:{Authorization:str!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /profile -H "Authorization: Bearer eyJhbG..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"}

---

EP: PUT /profile
DESC: Update current user's profile information.
IN: headers:{Authorization:str!} body:{name:str, email:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Validation error or duplicate email", "401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X PUT /profile -H "Authorization: Bearer eyJhbG..." -H "Content-Type: application/json" -d '{"name":"John Updated","email":"johnupdated@example.com"}'
EX_RES_200: {"id":1,"email":"johnupdated@example.com","name":"John Updated","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:40:00Z"}

---

EP: PUT /profile/password
DESC: Change current user's password.
IN: headers:{Authorization:str!} body:{currentPassword:str!, newPassword:str!, confirmPassword:str!}
OUT: 200:{}
ERR: {"400":"Invalid input or passwords don't match", "401":"Unauthorized or invalid current password", "500":"Internal server error"}
EX_REQ: curl -X PUT /profile/password -H "Authorization: Bearer eyJhbG..." -H "Content-Type: application/json" -d '{"currentPassword":"oldPassword123","newPassword":"newPassword123","confirmPassword":"newPassword123"}'
EX_RES_200: {}

## Dashboard APIs

EP: GET /dashboard
DESC: Get dashboard data including stats and recent activity.
IN: headers:{Authorization:str!}
OUT: 200:{stats:{totalUsers:int, totalRevenue:int, activeProjects:int, completionRate:int}, recentActivity:arr[{id:str, type:str, title:str, description:str, timestamp:str, user:obj}], quickActions:arr[{id:str, title:str, description:str, icon:str, href:str}]}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /dashboard -H "Authorization: Bearer eyJhbG..."
EX_RES_200: {"stats":{"totalUsers":2547,"totalRevenue":125430,"activeProjects":18,"completionRate":87},"recentActivity":[{"id":"1","type":"user","title":"New user registered","description":"Sarah Johnson joined the platform","timestamp":"2025-11-12T10:00:00Z","user":{"name":"Sarah Johnson"}}],"quickActions":[{"id":"1","title":"Create Project","description":"Start a new project","icon":"Plus","href":"/projects/new"}]}

## MCP (Model Context Protocol) APIs

EP: POST /v1/mcp
DESC: Handle MCP POST requests with authentication.
IN: headers:{Authorization:str!} body:{obj}
OUT: 200:{obj}
ERR: {"401":"Unauthorized", "400":"Invalid request", "500":"Internal server error"}
EX_REQ: curl -X POST /v1/mcp -H "Authorization: Bearer eyJhbG..." -H "Content-Type: application/json" -d '{"method":"tools/list","params":{}}'
EX_RES_200: {"jsonrpc":"2.0","id":1,"result":{"tools":[]}}

---

EP: GET /v1/mcp
DESC: Handle MCP GET requests with authentication.
IN: headers:{Authorization:str!} query:{obj}
OUT: 200:{obj}
ERR: {"401":"Unauthorized", "400":"Invalid request", "500":"Internal server error"}
EX_REQ: curl -X GET /v1/mcp -H "Authorization: Bearer eyJhbG..."
EX_RES_200: {"jsonrpc":"2.0","id":1,"result":{}}

---

EP: DELETE /v1/mcp
DESC: Handle MCP DELETE requests with authentication.
IN: headers:{Authorization:str!} body:{obj}
OUT: 200:{obj}
ERR: {"401":"Unauthorized", "400":"Invalid request", "500":"Internal server error"}
EX_REQ: curl -X DELETE /v1/mcp -H "Authorization: Bearer eyJhbG..." -H "Content-Type: application/json" -d '{"method":"session/end","params":{}}'
EX_RES_200: {"jsonrpc":"2.0","id":1,"result":{"success":true}}