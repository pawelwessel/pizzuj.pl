# Search Popup Feature Implementation

## Overview

Modified the search functionality to display a popup with three pizzerias instead of generating a page when a search is submitted.

## Changes Made

### 1. Modified Search Handler (`handleSearch`)

- **Before**: Generated a page and navigated to `/pizza/[city]`
- **After**: Fetches pizzerias and displays them in a popup

### 2. Added New State

- `showPizzeriasPopup`: Controls the visibility of the pizzerias popup

### 3. Created New Component

- `PizzeriasPopup`: Displays three pizzerias in a grid layout
  - Shows pizzeria name, rating, address, phone, and website
  - Clicking on a pizzeria opens the detailed `PizzeriaPopup`
  - Responsive design (1 column on mobile, 3 columns on desktop)

### 4. Updated Loading State

- Removed complex loading screen with animations
- Added simple loading spinner with "Wyszukiwanie pizzerii..." text

## Features

### Pizzerias Popup

- **Grid Layout**: 3 pizzerias displayed in a responsive grid
- **Pizzeria Cards**: Each card shows:
  - Pizzeria name
  - Rating with star icon
  - Address with map marker icon
  - Phone number (clickable)
  - Website link (clickable)
- **Click Interaction**: Clicking a pizzeria card opens detailed popup
- **Close Functionality**: X button to close the popup

### Detailed Pizzeria Popup

- **Comprehensive Information**:
  - Rating and review count
  - Full address
  - Phone number
  - Website link
  - Opening hours (if available)
  - Recent opinions (if available)
- **Interactive Elements**: Clickable phone and website links

## User Flow

1. **User enters city name** in search input
2. **User clicks search button** or presses Enter
3. **Loading spinner** appears briefly
4. **Pizzerias popup** opens showing 3 best pizzerias
5. **User clicks on a pizzeria** to see detailed information
6. **Detailed popup** opens with comprehensive pizzeria information
7. **User can close** either popup using X button

## Technical Implementation

### State Management

```javascript
const [state, setState] = useState({
  // ... existing state
  showPizzeriasPopup: false, // New state for pizzerias popup
});
```

### Search Handler

```javascript
const handleSearch = useCallback(async () => {
  // Validation
  if (!state.searchTerm || state.searchTerm.trim() === "") {
    setState((prev) => ({ ...prev, error: "Proszę wpisać miasto." }));
    return;
  }

  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
  }));

  try {
    // Fetch pizzerias for the searched city
    const pizzeriasData = await getTextPlaces(state.searchTerm);
    if (pizzeriasData && pizzeriasData.results) {
      setState((prev) => ({
        ...prev,
        pizzerias: pizzeriasData.results.slice(0, 3), // Show only 3 pizzerias
        showPizzeriasPopup: true,
        isLoading: false,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        error: "Nie znaleziono pizzerii w tym mieście.",
        isLoading: false,
      }));
    }
  } catch (error) {
    setState((prev) => ({
      ...prev,
      error: "Wystąpił błąd podczas wyszukiwania.",
      isLoading: false,
    }));
  }
}, [state.searchTerm]);
```

### Popup Components

- `PizzeriasPopup`: Main popup with 3 pizzerias
- `PizzeriaPopup`: Detailed popup for individual pizzeria
- Both use consistent styling and close functionality

## Benefits

1. **Faster User Experience**: No page generation, immediate results
2. **Better UX**: Users can quickly see top 3 pizzerias
3. **Detailed Information**: Click to see comprehensive pizzeria details
4. **Responsive Design**: Works well on mobile and desktop
5. **Consistent Styling**: Matches existing design patterns

## Error Handling

- **Empty Search**: Shows "Proszę wpisać miasto."
- **Short Search**: Shows "Miasto musi mieć co najmniej 3 znaki."
- **No Results**: Shows "Nie znaleziono pizzerii w tym mieście."
- **API Error**: Shows "Wystąpił błąd podczas wyszukiwania."

This implementation provides a much more user-friendly experience by showing immediate results in a popup instead of generating pages.
