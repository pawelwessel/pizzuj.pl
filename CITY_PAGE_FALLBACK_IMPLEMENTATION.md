# City Page Fallback Implementation

## Overview

Extended the `/najlepsze-pizzerie-na-dowoz/[city]` pages to show three pizzerias from `getTextPlaces` API instead of displaying the empty state message when no pizzerias are found in the main database.

## Changes Made

### 1. Updated City Page (`src/app/najlepsze-pizzerie-na-dowoz/[city]/page.js`)

**New Function Added:**

- `fetchTextPlaces(cityName)`: Fetches pizzerias from Google Places API via `/api/getTextPlaces` endpoint

**Modified Logic:**

- Changed from `const pizzerias` to `let pizzerias` to allow reassignment
- Added fallback logic: if no pizzerias found in main database, fetch from `getTextPlaces`
- Transform `getTextPlaces` data structure to match expected format
- Limited fallback results to first 3 pizzerias for better performance
- Removed empty state content from page configuration

**Flow:**

1. Try to fetch pizzerias from main database (`/api/pizzeria/[city]`)
2. If no results or error, fetch from `getTextPlaces` API
3. If `getTextPlaces` returns data, transform to expected structure and use first 3 results
4. If no data from either source, return 404 (notFound)

### 2. Updated RankingSection Component (`src/components/CityPizzeriaPage/RankingSection.js`)

**Changes Made:**

- Removed empty state handling since we now always have data
- Updated address display to handle both `vicinity` and `address` fields
- Enhanced rating display to work with both direct rating and nested details structure
- Updated opening hours handling to work with both data structures
- Simplified conditional rendering to only show content when pizzerias exist

**Data Structure Compatibility:**

- Handles both Firebase data structure and Google Places API structure
- Supports nested `details` object from `getTextPlaces` response
- Gracefully handles missing fields

### 3. Added Client Wrappers for SSR Compatibility

**New Components:**

- `ClientWrapper.js`: Wraps all client-side components to prevent SSR errors
- `LegacyWrapper.js`: Wraps legacy components (ArrayWithPlaces, AdvertiseYourself, CtaButton)

**SSR Fix:**

- Prevents "Cannot read properties of null (reading 'useContext')" errors
- Uses `useState` and `useEffect` to ensure client-side rendering
- Provides loading states during server-side rendering

### 3. Removed Empty State Content

**From Page Configuration:**

- Removed `emptyState` object from ranking content
- Simplified content structure since empty state is no longer needed

## Technical Details

### API Endpoints Used

1. **Primary**: `/api/pizzeria/[city]` - Firebase-based pizzerias
2. **Fallback**: `/api/getTextPlaces` - Google Places API integration

### Data Structure Handling

**Firebase Structure:**

```javascript
{
  name: "Pizzeria Name",
  address: "Full address",
  rating: 4.5,
  opening_hours: { open_now: true }
}
```

**Google Places Structure (Raw):**

```javascript
{
  name: "Pizzeria Name",
  address: "Full address",
  details: {
    rating: 4.5,
    opening_hours: { open_now: true },
    photos: [{ photo_reference: "..." }],
    formatted_phone_number: "+48..."
  }
}
```

**Transformed Structure (for compatibility):**

```javascript
{
  name: "Pizzeria Name",
  address: "Full address",
  city: "City Name",
  phone: "+48...",
  photos: ["https://maps.googleapis.com/maps/api/place/photo?..."],
  rating: 4.5,
  opening_hours: { open_now: true },
  place_id: "ChIJ..."
}
```

### Error Handling

- Graceful fallback between data sources
- Proper error logging for debugging
- 404 page for cities with no available data
- Null-safe field access for different data structures

## Benefits

1. **Better User Experience**: No more empty state messages
2. **Increased Data Coverage**: Fallback to Google Places API
3. **Consistent Interface**: Same UI regardless of data source
4. **Performance Optimized**: Limited to 3 results for fallback
5. **Robust Error Handling**: Multiple fallback layers
6. **SSR Compatible**: No more "useContext" errors during server-side rendering

## Testing

To test the implementation:

1. Visit a city page that has no data in Firebase (e.g., `/najlepsze-pizzerie-na-dowoz/test-city`)
2. Verify that 3 pizzerias from Google Places API are displayed
3. Check that the UI works correctly with the fallback data
4. Verify that ratings, addresses, and opening hours display properly

## Environment Variables Required

- `NEXT_PUBLIC_FIREBASE_MAP_KEY`: Google Places API key
- `NEXT_PUBLIC_LINK`: Base URL for API calls

## Future Improvements

1. Cache fallback results to reduce API calls
2. Add loading states during fallback data fetching
3. Implement more sophisticated data merging between sources
4. Add analytics to track fallback usage
