import React from "react";

// Centralized Google Maps API loader
let isLoaded = false;
let isLoading = false;
let loadPromise = null;

export const loadGoogleMapsAPI = () => {
  // If already loaded, return resolved promise
  if (isLoaded && window.google && window.google.maps) {
    return Promise.resolve();
  }

  // If currently loading, return existing promise
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  // If script already exists in DOM, wait for it to load
  const existingScript = document.querySelector(
    'script[src*="maps.googleapis.com/maps/api/js"]'
  );
  if (existingScript) {
    isLoading = true;
    loadPromise = new Promise((resolve, reject) => {
      const checkLoaded = () => {
        if (window.google && window.google.maps) {
          isLoaded = true;
          isLoading = false;
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
    });
    return loadPromise;
  }

  // Load the API
  isLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      resolve();
    };

    script.onerror = () => {
      isLoading = false;
      reject(new Error("Failed to load Google Maps API"));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

// Hook for React components
export const useGoogleMapsAPI = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => setIsReady(true))
      .catch((err) => setError(err));
  }, []);

  return { isReady, error };
};

// Initialize services after API is loaded
export const initGoogleMapsServices = () => {
  if (typeof window !== "undefined" && window.google && window.google.maps) {
    try {
      return {
        geocoder: new window.google.maps.Geocoder(),
        autocompleteService:
          new window.google.maps.places.AutocompleteService(),
        placesService: (map) =>
          new window.google.maps.places.PlacesService(map),
      };
    } catch (error) {
      console.error("Error initializing Google Maps services:", error);
      return null;
    }
  }
  return null;
};
