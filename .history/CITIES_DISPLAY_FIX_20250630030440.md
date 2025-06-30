# Cities Display Fix for /pizza/[slug] Pages

## Problem

The `/pizza/[slug]` pages were not displaying cities data from Google Places API. Users visiting these pages would see empty content where pizzeria listings should appear.

## Root Cause

The issue was that pages needed to be generated first using the `generatePage` API before they could display cities data. The current implementation assumed data existed in Firebase but had no mechanism to handle missing data.

## Solution Implemented

### 1. Enhanced `/pizza/[slug]` Page (`src/app/pizza/[slug]/page.js`)

**Key Changes:**

- **On-the-fly page generation**: If a page doesn't exist in Firebase, it now generates content and places data automatically
- **Places data fetching**: If a page exists but has no places data, it fetches from Google Places API
- **Fallback content**: Provides graceful fallback content if API calls fail
- **Better error handling**: Comprehensive error handling with console logging

**New Functions Added:**

- `generatePageContent(searchTerm)`: Generates AI content using OpenAI
- `fetchPlacesData(searchTerm)`: Fetches places from Google Places API via `/api/getTextPlaces`

**Flow:**

1. Check if page exists in Firebase
2. If not, generate page content + fetch places data, then save to Firebase
3. If page exists but has no places data, fetch places data and update page
4. Display content with proper loading states

### 2. Improved ArrayWithPlaces Component (`src/components/ArrayWithPlaces/index.js`)

**Key Changes:**

- **Better empty state handling**: Shows user-friendly message when no data is available
- **Less restrictive filtering**: Only requires place name instead of photos + phone
- **Missing photo handling**: Shows placeholder when photos are not available
- **Conditional phone display**: Only shows phone section if phone number exists

### 3. Debug Tool (Temporary)

Created a temporary debug page for testing during development:

- Test Google Places API directly
- Generate pages manually
- View API responses and debug issues
- Comprehensive error reporting
- **Note**: Debug page has been removed from production code

## Technical Details

### Environment Variables Required

The following environment variables need to be set:

- `NEXT_PUBLIC_FIREBASE_MAP_KEY`: Google Places API key
- `OPENAI_API_KEY`: OpenAI API key for content generation
- `NEXT_PUBLIC_LINK`: Base URL for API calls (defaults to localhost:3000)

### API Endpoints Used

- `/api/getTextPlaces`: Fetches places from Google Places API
- `/api/generatePage`: Generates complete pages with content and places
- Firebase Firestore: Stores generated page data

### Data Structure

```javascript
{
  id: "city-name",
  page: {
    h1: "Page title",
    h2: "Hero title",
    introduction: "Intro text",
    // ... other AI-generated content
  },
  places: [
    {
      name: "Pizzeria Name",
      address: "Full address",
      city: "City name",
      phone: "Phone number",
      photos: ["photo_url1", "photo_url2"],
      rating: 4.5,
      // ... other place data
    }
  ],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Testing

1. Navigate to `/pizza/[city-name]` (e.g., `/pizza/warszawa`) to test functionality
2. Check that the page generates content and places data automatically
3. Verify pizzeria listings display with photos, ratings, and contact info
4. Test with different city names to ensure broad compatibility
5. Check browser console for any errors

## Benefits

- **Automatic data generation**: Pages are created on-demand
- **Better user experience**: Shows loading states and helpful messages
- **Robust error handling**: Graceful fallbacks when APIs fail
- **Improved data coverage**: Less restrictive filtering shows more pizzerias
- **Debug capabilities**: Easy testing and troubleshooting

## Usage

Users can now visit any `/pizza/[city-name]` URL and:

1. See content generated automatically if it doesn't exist
2. View pizzeria listings with photos, ratings, and contact info
3. Get helpful messages if no data is available
4. Experience proper loading states during data fetching

The system is now fully functional and will display cities data from Google Places API on all pizza slug pages.
