# Backend API for EFile2

This is the backend server for EFile2 application, handling file uploads, user management, and authentication.

## Project Structure

```
backend/
├── config/              # Configuration files
│   ├── constants.js     # Constants and configuration options
│   └── supabase.js      # Supabase client initialization
├── middleware/          # Middleware functions
│   ├── auth.js          # Authentication and authorization
│   └── upload.js        # File upload configuration
├── routes/              # Route handlers
│   ├── health.js        # Health check endpoint
│   ├── upload.js        # File upload endpoints
│   └── users.js         # User management endpoints
└── server.js            # Main application entry point
```

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env` file in the `backend/` folder:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   PORT=5000
   ```

   **How to get these values:**
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Settings** → **API**
   - Copy the **Project URL** → This is your `SUPABASE_URL`
   - Copy the **service_role** key (NOT the anon key) → This is your `SUPABASE_SERVICE_ROLE_KEY`

3. **Start the server:**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

## API Endpoints

All endpoints require authentication via Bearer token in the Authorization header.

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### POST `/api/upload`
Upload a file for the authenticated user.

**Headers:**
```
Authorization: Bearer <user_jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `file`: The file to upload

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "document_1234567890.docx",
    "originalname": "document.docx",
    "path": "/path/to/file",
    "size": 12345,
    "userName": "John_Doe"
  }
}
```

### GET `/api/upload/files/:userName`
Get all files for a specific user.

**Headers:**
```
Authorization: Bearer <user_jwt_token>
```

**Response:**
```json
{
  "files": [
    {
      "filename": "document_1234567890.docx",
      "size": 12345,
      "uploadDate": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### GET `/api/users`
Get all users (admin only).

**Headers:**
```
Authorization: Bearer <user_jwt_token>
```

**Response:**
```json
{
  "users": [...]
}
```

### GET `/api/users/search?email=example@email.com`
Search users by email (admin only).

**Headers:**
```
Authorization: Bearer <user_jwt_token>
```

**Response:**
```json
{
  "users": [...]
}
```

### GET `/api/users/stats`
Get user statistics (admin only).

**Headers:**
```
Authorization: Bearer <user_jwt_token>
```

**Response:**
```json
{
  "stats": {
    "total_users": 10,
    "confirmed_users": 8,
    "unconfirmed_users": 2,
    "confirmed_today": 3
  }
}
```

### PUT `/api/users/:id/role`
Update a user's role (admin only).

**Headers:**
```
Authorization: Bearer <user_jwt_token>
```

**Body:**
```json
{
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User role updated successfully"
}
```

## Security Notes

⚠️ **Important:**
- Keep your `.env` file secure and never commit it to git
- The `service_role` key has admin privileges - only use it server-side
- All endpoints verify that the requesting user is an admin
- The server authenticates incoming requests using the user's JWT token

