# Admin Role System Implementation

## Overview
This document explains the admin role-based access control system implemented in the application. The system redirects users with admin role to an admin panel instead of the regular user dashboard after login.

## Implementation Details

### 1. Role-Based Authentication Flow
- **Login Process**: After successful authentication (email/password or Google), the system checks the user's role
- **Admin Users**: Users with `role: "admin"` are redirected to `/admin`
- **Regular Users**: Users with `role: "user"` or no role are redirected to `/user`

### 2. Files Modified/Created

#### New Files:
- `src/app/admin/page.js` - Admin dashboard page
- `src/utils/roleUtils.js` - Role checking and redirect utilities
- `src/utils/adminUtils.js` - Admin promotion/demotion utilities

#### Modified Files:
- `src/app/login/Login.js` - Updated to use role-based redirection
- `src/components/Auth/GoogleButton.js` - Updated to use role-based redirection and add role field
- `src/app/register/page.js` - Updated to create user document with role field
- `src/app/user/page.js` - Updated to redirect admin users to admin panel

### 3. Database Structure
Each user document in Firestore now includes:
```javascript
{
  uid: "firebase-user-id",
  name: "User Name",
  email: "user@example.com",
  photoURL: "profile-image-url",
  isPremium: false,
  emailVerified: false,
  achievements: [],
  joinDate: "2024-01-01T00:00:00.000Z",
  role: "user" // or "admin"
}
```

### 4. Role Checking Functions

#### `roleUtils.js`
- `isUserAdmin(userId)` - Returns boolean if user is admin
- `getUserRole(userId)` - Returns user's role string
- `redirectByRole(router, userId)` - Redirects based on user role

#### `adminUtils.js`
- `promoteToAdmin(userId)` - Promotes user to admin role
- `demoteFromAdmin(userId)` - Demotes admin to regular user

### 5. Admin Panel Features
The admin panel (`/admin`) includes:
- **Access Control**: Only users with `role: "admin"` can access
- **Dashboard Overview**: System statistics and metrics
- **User Management**: (Placeholder for future implementation)
- **Pizzeria Management**: (Placeholder for future implementation)
- **Logout Functionality**: Secure logout with redirect

### 6. Security Features
- **Route Protection**: Admin panel checks user role before rendering
- **Automatic Redirection**: Admin users accessing `/user` are redirected to `/admin`
- **Regular User Protection**: Regular users accessing `/admin` are redirected to `/user`
- **Authentication Check**: Unauthenticated users are redirected to login

## Usage Instructions

### For Developers

#### 1. Creating the First Admin User
Since new users are created with `role: "user"` by default, you need to manually promote a user to admin:

**Option A: Using Browser Console**
1. Register/login as a regular user
2. Open browser console
3. Run: `promoteUserToAdmin("your-firebase-user-id")`

**Option B: Using Firebase Console**
1. Go to Firebase Firestore
2. Navigate to the `users` collection
3. Find the user document
4. Add/update the `role` field to `"admin"`

#### 2. Promoting Additional Users
```javascript
import { promoteToAdmin } from '../utils/adminUtils';

// Promote user to admin
await promoteToAdmin("firebase-user-id");

// Demote admin to regular user
await demoteFromAdmin("firebase-user-id");
```

### For End Users

#### Admin Access
1. Login with your credentials
2. If you have admin role, you'll be automatically redirected to the admin panel
3. Access admin features through the tabbed interface

#### Regular User Access
1. Login with your credentials
2. Access your user dashboard with profile management and pizzeria features

## Testing the Implementation

### Test Cases
1. **New User Registration**: Should create user with `role: "user"` and redirect to `/user`
2. **Regular User Login**: Should redirect to `/user` dashboard
3. **Admin User Login**: Should redirect to `/admin` panel
4. **Admin Accessing User Page**: Should redirect to `/admin`
5. **Regular User Accessing Admin Page**: Should redirect to `/user`
6. **Unauthenticated Access**: Should redirect to login page

### Verification Steps
1. Register a new user - verify they access user dashboard
2. Promote user to admin using console or adminUtils
3. Logout and login again - verify admin is redirected to admin panel
4. Try accessing `/user` as admin - verify redirect to admin panel
5. Try accessing `/admin` as regular user - verify redirect to user dashboard

## Future Enhancements
- Implement user management features in admin panel
- Add pizzeria management capabilities
- Create role-based permissions for different admin functions
- Add audit logging for admin actions
- Implement multi-level roles (super admin, moderator, etc.)

## Security Considerations
- Admin role assignment should be done server-side in production
- Consider implementing Firebase Admin SDK for secure role management
- Add rate limiting for admin functions
- Implement proper error handling and logging
- Consider adding two-factor authentication for admin accounts