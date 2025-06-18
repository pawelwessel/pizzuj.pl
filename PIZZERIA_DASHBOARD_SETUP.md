# Pizzeria Dashboard Implementation

This implementation provides a complete user dashboard for managing pizzeria information with Firebase database integration.

## Features Implemented

### 1. Firebase Database Extensions
- **Added pizzeria management functions** in `src/db/firebase/index.js`:
  - `createPizzeria(userId, pizzeriaData)` - Create new pizzeria
  - `updatePizzeria(pizzeriaId, updateData)` - Update pizzeria information
  - `getUserPizzerias(userId)` - Get all pizzerias owned by user
  - `deletePizzeria(pizzeriaId)` - Delete a pizzeria
  - `updateUserProfile(userId, updateData)` - Update user profile

### 2. Dashboard Component
- **Created `src/components/PizzeriaDashboard/index.js`** with:
  - Form to add new pizzerias
  - List view of existing pizzerias
  - Edit functionality for each pizzeria
  - Delete functionality with confirmation
  - Comprehensive form fields:
    - Name (required)
    - Address (required)
    - Phone
    - Email
    - Website
    - Description
    - Opening hours
    - Cuisine type
    - Price range

### 3. Enhanced User Profile Page
- **Updated `src/app/user/page.js`** with:
  - Tab-based navigation (Profile / Pizzerias)
  - Profile editing functionality
  - Integration with pizzeria dashboard
  - Modern UI with improved layout

### 4. API Routes
- **Created secure API endpoints**:
  - `GET/POST /api/user/pizzerias` - List and create pizzerias
  - `PUT/DELETE /api/user/pizzerias/[id]` - Update and delete specific pizzerias
  - Server-side authentication with Firebase Admin SDK
  - Ownership verification for security

## Database Structure

### User Pizzerias Collection (`user_pizzerias`)
```javascript
{
  id: "userId_timestamp",
  ownerId: "user_uid",
  name: "Pizza Palace",
  address: "123 Main St, City",
  phone: "+1234567890",
  email: "info@pizzapalace.com",
  website: "https://pizzapalace.com",
  description: "Best pizza in town",
  openingHours: "Mon-Sun: 11:00-23:00",
  cuisine: "neapolitan",
  priceRange: "$$",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## Environment Variables Required

For the Firebase Admin SDK to work properly, add these environment variables to your `.env.local`:

```env
# Existing Firebase client config
NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_APP_ID=your_app_id
NEXT_PUBLIC_MEASURMENT_ID=your_measurement_id

# Firebase Admin SDK (NEW - Required for API routes)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

## Getting Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Extract `client_email` and `private_key` from the JSON

⚠️ **Important**: Keep the private key secure and never commit it to version control.

## Usage

### For Users:
1. Navigate to `/user` after logging in
2. Click on the "Moje Pizzerie" (My Pizzerias) tab
3. Click "Dodaj pizzerię" (Add Pizzeria) to create a new one
4. Fill in the form with pizzeria details
5. Use the edit (pencil) and delete (trash) buttons to manage existing pizzerias

### For Developers:
The pizzeria dashboard is fully integrated with Firebase and provides:
- Real-time updates
- Form validation
- Error handling with toast notifications
- Responsive design
- Secure API endpoints with authentication

## Security Features

- **Authentication Required**: All API endpoints require valid Firebase authentication
- **Ownership Verification**: Users can only modify their own pizzerias
- **Input Validation**: Both client-side and server-side validation
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Dependencies Added

- `firebase-admin` - For server-side Firebase authentication

## Next Steps

To extend the functionality, consider adding:
- Image upload for pizzeria photos
- Menu management
- Operating hours management with complex schedules
- Integration with Google Places API for address validation
- Reviews and ratings system
- Analytics dashboard for pizzeria owners