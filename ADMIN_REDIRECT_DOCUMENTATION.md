# Admin Redirect System Documentation

## Overview
This system automatically redirects users with admin or owner roles to the `/admin` panel instead of the regular `/user` dashboard after login.

## Features
- Automatic role-based redirection for admin and owner users
- Secure admin panel with role verification
- Admin role management API
- Utility functions for setting admin roles

## File Structure
```
src/
├── app/
│   ├── admin/
│   │   └── page.js                    # Admin dashboard page
│   └── api/
│       └── admin/
│           └── setUserRole/
│               └── route.js           # API for setting user roles
├── hooks/
│   └── useAdminRedirect.js           # Custom hook for admin redirect logic
├── lib/
│   └── setAdminRole.js              # Utility functions for setting admin roles
└── db/
    └── firebase/
        └── index.js                  # Updated with role management functions
```

## User Roles
- **user**: Regular user (default)
- **admin**: Administrator with admin panel access
- **owner**: Owner with full admin access

## How It Works

### 1. Authentication Flow
When a user logs in (via email/password or Google), the system:
1. Checks the user's role in the Firebase database
2. If role is "admin" or "owner", redirects to `/admin`
3. If role is "user" or undefined, redirects to `/user`

### 2. Admin Panel Protection
The admin panel (`/admin`) automatically:
- Checks if the user is authenticated
- Verifies the user has admin or owner role
- Redirects unauthorized users to `/user`

### 3. Database Schema
Users in Firebase have the following role-related fields:
```javascript
{
  uid: "user-uid",
  name: "User Name",
  email: "user@example.com",
  role: "admin" | "owner" | "user", // Optional field
  // ... other user fields
}
```

## Setting Admin Roles

### Method 1: Using the Utility Script (Development)
```javascript
import { setAdminRole, setOwnerRole } from "../lib/setAdminRole";

// Set admin role
await setAdminRole("user-uid-here", "admin");

// Set owner role
await setOwnerRole("user-uid-here");
```

### Method 2: Using the API Endpoint (Production)
```javascript
const response = await fetch('/api/admin/setUserRole', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 'current-admin-uid',        // Admin making the request
    targetUserId: 'target-user-uid',    // User to modify
    role: 'admin'                       // New role: 'user', 'admin', or 'owner'
  })
});
```

### Method 3: Direct Database Update (Manual)
Manually update the user document in Firebase:
```javascript
// In Firebase Console or using admin SDK
await updateDoc(doc(db, "users", "user-uid"), {
  role: "admin",
  updatedAt: new Date().toISOString()
});
```

## API Reference

### POST /api/admin/setUserRole
Updates a user's role. Only admin/owner users can use this endpoint.

**Request Body:**
```json
{
  "userId": "current-admin-uid",
  "targetUserId": "target-user-uid", 
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User target-user-uid role updated to admin",
  "targetUser": {
    "id": "target-user-uid",
    "name": "Target User",
    "email": "target@example.com",
    "newRole": "admin"
  }
}
```

## Functions Reference

### useAdminRedirect()
Custom hook that provides admin redirect functionality.

**Returns:**
- `user`: Current authenticated user
- `userData`: User data from database
- `isAdmin`: Boolean indicating if user is admin/owner
- `isLoading`: Loading state
- `redirectToAdmin()`: Function to redirect to admin panel
- `redirectToUser()`: Function to redirect to user dashboard

### checkAdminRole(userData)
Utility function to check if user has admin privileges.

**Parameters:**
- `userData`: User data object

**Returns:** Boolean indicating admin status

### Firebase Functions
- `updateUserRole(userId, role)`: Update user's role
- `getUserRole(userId)`: Get user's current role
- `isUserAdmin(userId)`: Check if user is admin/owner

## Testing the System

1. **Create a test user:**
   - Register a new account or use existing account
   - Note the user's UID from Firebase console

2. **Set admin role:**
   ```javascript
   import { setAdminRole } from "../lib/setAdminRole";
   await setAdminRole("your-user-uid", "admin");
   ```

3. **Test redirect:**
   - Log out and log back in
   - Should redirect to `/admin` instead of `/user`

## Security Considerations

- Admin roles are stored in Firebase and verified on both client and server
- Admin panel has built-in role verification
- API endpoints validate admin permissions before executing
- All role changes are logged with timestamps

## Troubleshooting

### User not redirecting to admin panel
1. Check if user has correct role in Firebase database
2. Verify role is set as "admin" or "owner" (case-sensitive)
3. Check browser console for any errors
4. Clear browser cache and cookies

### API role setting not working
1. Verify requesting user has admin/owner role
2. Check that target user exists in database
3. Ensure role value is valid ("user", "admin", or "owner")
4. Check server logs for detailed error messages

### Admin panel showing "no access"
1. Verify user is logged in
2. Check user's role in database
3. Ensure Firebase connection is working
4. Check if user document exists in database

## Future Enhancements

- Role-based permissions within admin panel
- Audit logging for admin actions
- Role expiration dates
- Multi-tenant role management
- Admin invitation system