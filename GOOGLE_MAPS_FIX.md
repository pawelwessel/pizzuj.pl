# Google Maps API Loading Fix

## Problem

The website was loading the Google Maps JavaScript API multiple times, causing the error:
"You have included the Google Maps JavaScript API multiple times on this page. This may cause unexpected errors."

## Root Cause

Multiple components were independently loading the Google Maps API:

1. **LocationSearchInput.js** - Used `document.createElement('script')` to load the API
2. **Form/index.js** - Used `document.createElement('script')` to load the API
3. **Navigation/index.js** - Used `useJsApiLoader` from `@react-google-maps/api`
4. **HomeMapInput/index.js** - Expected the API to be already loaded

## Solution

Created a centralized Google Maps API loader (`src/lib/googleMapsLoader.js`) that:

### Features

- **Singleton Pattern**: Ensures the API is loaded only once
- **Promise-based**: Returns the same promise for multiple calls
- **Script Detection**: Checks if a Google Maps script already exists in the DOM
- **Error Handling**: Proper error handling for failed loads
- **Service Initialization**: Centralized service initialization (Geocoder, AutocompleteService, etc.)

### Key Functions

- `loadGoogleMapsAPI()` - Main function that loads the API only once
- `useGoogleMapsAPI()` - React hook for components
- `initGoogleMapsServices()` - Initializes Google Maps services after API loads

### Implementation Details

#### Before (Multiple API loads):

```javascript
// Each component loaded the API independently
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
document.head.appendChild(script);
```

#### After (Centralized loading):

```javascript
// Components use the centralized loader
import {
  loadGoogleMapsAPI,
  initGoogleMapsServices,
} from "../../lib/googleMapsLoader";

useEffect(() => {
  loadGoogleMapsAPI()
    .then(() => {
      const services = initGoogleMapsServices();
      // Use services...
    })
    .catch((error) => console.error("Failed to load API:", error));
}, []);
```

## Components Updated

1. **LocationSearchInput.js**

   - Removed direct script loading
   - Uses centralized loader
   - Simplified service initialization

2. **Form/index.js**

   - Removed direct script loading
   - Uses centralized loader
   - Simplified service initialization

3. **Navigation/index.js**

   - Replaced `useJsApiLoader` with centralized loader
   - Added manual loading state management

4. **HomeMapInput/index.js**
   - Added centralized loader
   - Simplified service initialization

## Benefits

1. **No More Multiple API Loads**: The API is loaded only once regardless of how many components use it
2. **Better Performance**: Reduced network requests and script loading overhead
3. **Consistent Error Handling**: Centralized error handling for API loading failures
4. **Easier Maintenance**: Single point of control for Google Maps API loading
5. **Future-proof**: Easy to add new components that need Google Maps without worrying about multiple loads

## Testing

A test file (`src/lib/googleMapsLoader.test.js`) was created to verify:

- Multiple calls return the same promise
- Only one script is added to the DOM
- Proper error handling

## Usage

For new components that need Google Maps:

```javascript
import {
  loadGoogleMapsAPI,
  initGoogleMapsServices,
} from "../../lib/googleMapsLoader";

useEffect(() => {
  loadGoogleMapsAPI()
    .then(() => {
      const services = initGoogleMapsServices();
      if (services) {
        // Use services.geocoder, services.autocompleteService, etc.
      }
    })
    .catch((error) => console.error("Failed to load API:", error));
}, []);
```

This fix ensures that the Google Maps API is loaded only once across the entire application, eliminating the multiple API loading error.
