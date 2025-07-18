"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FaMapMarkerAlt, FaTimes, FaMap, FaSearch } from "react-icons/fa";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  loadGoogleMapsAPI,
  initGoogleMapsServices,
} from "../../lib/googleMapsLoader";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 52.2296756, // Warsaw, Poland
  lng: 21.0122287,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const LocationSearchInput = ({
  value,
  onChange,
  onLocationSelect,
  placeholder = "Kliknij na mapę, aby wybrać lokalizację...",
}) => {
  const [searchInput, setSearchInput] = useState(value || "");
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const geocoder = useRef(null);
  const autocompleteService = useRef(null);
  const mapRef = useRef(null);

  // Initialize Google Maps services
  const initServices = useCallback(() => {
    const services = initGoogleMapsServices();
    if (services) {
      geocoder.current = services.geocoder;
      autocompleteService.current = services.autocompleteService;
    }
  }, []);

  useEffect(() => {
    // Load Google Maps API using centralized loader
    loadGoogleMapsAPI()
      .then(() => {
        initServices();
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
      });
  }, [initServices]);

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 2 && autocompleteService.current) {
      setIsSearching(true);
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "pl" },
          types: ["geocode"],
        },
        (predictions, status) => {
          setIsSearching(false);
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
            setShowPredictions(true);
          } else {
            setPredictions([]);
            setShowPredictions(false);
          }
        }
      );
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  };

  // Handle prediction selection
  const handlePredictionSelect = async (prediction) => {
    if (!geocoder.current) return;

    setIsLoading(true);
    setShowPredictions(false);

    try {
      geocoder.current.geocode(
        { placeId: prediction.place_id },
        (results, status) => {
          setIsLoading(false);
          if (status === "OK" && results && results[0]) {
            const place = results[0];
            const location = place.geometry.location;

            // Extract address components
            const addressComponents = place.address_components;
            let city = "";

            addressComponents.forEach((component) => {
              const types = component.types;
              if (types.includes("locality")) {
                city = component.long_name;
              }
            });

            const exactAddress = place.formatted_address;
            const lat = location.lat();
            const lng = location.lng();

            // Update map center and selected location
            const newLocation = { lat, lng };
            setSelectedLocation(newLocation);
            setMapCenter(newLocation);

            // Update the form with location data
            const locationData = {
              address: exactAddress,
              lat,
              lng,
              exactAddress,
              city,
            };

            setSearchInput(exactAddress);
            onChange(exactAddress);

            if (onLocationSelect) {
              onLocationSelect(locationData);
            }
          }
        }
      );
    } catch (error) {
      console.error("Error getting place details:", error);
      setIsLoading(false);
    }
  };

  // Handle map click
  const handleMapClick = useCallback(
    async (event) => {
      if (!geocoder.current) return;

      setIsLoading(true);
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setSelectedLocation(location);
      setMapCenter(location);

      try {
        geocoder.current.geocode({ location }, (results, status) => {
          setIsLoading(false);
          if (status === "OK" && results && results[0]) {
            const place = results[0];
            const exactAddress = place.formatted_address;

            // Extract address components
            const addressComponents = place.address_components;
            let city = "";

            addressComponents.forEach((component) => {
              const types = component.types;
              if (types.includes("locality")) {
                city = component.long_name;
              }
            });

            const locationData = {
              address: exactAddress,
              lat: location.lat,
              lng: location.lng,
              exactAddress,
              city,
            };

            setSearchInput(exactAddress);
            onChange(exactAddress);

            if (onLocationSelect) {
              onLocationSelect(locationData);
            }
          } else {
            console.error("Geocoder failed due to:", status);
            // Use coordinates as fallback
            const locationData = {
              address: `Lat: ${location.lat.toFixed(
                6
              )}, Lng: ${location.lng.toFixed(6)}`,
              lat: location.lat,
              lng: location.lng,
              exactAddress: `Lat: ${location.lat.toFixed(
                6
              )}, Lng: ${location.lng.toFixed(6)}`,
              city: "",
            };

            setSearchInput(locationData.address);
            onChange(locationData.address);

            if (onLocationSelect) {
              onLocationSelect(locationData);
            }
          }
        });
      } catch (error) {
        console.error("Error geocoding clicked location:", error);
        setIsLoading(false);
      }
    },
    [geocoder, onChange, onLocationSelect]
  );

  // Handle manual address input
  const handleManualAddress = () => {
    if (searchInput.trim()) {
      const locationData = {
        address: searchInput,
        lat: null,
        lng: null,
        exactAddress: searchInput,
        city: "",
      };

      if (onLocationSelect) {
        onLocationSelect(locationData);
      }
    }
  };

  // Handle input focus - show map
  const handleInputFocus = () => {
    setShowMap(true);
  };

  // Handle close map
  const handleCloseMap = () => {
    setShowMap(false);
    setShowPredictions(false);
  };

  // Handle input change for manual entry
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onChange(value);
  };

  return (
    <div className="relative">
      {/* Input Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full p-3 pl-10 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
          ) : (
            <FaMap className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Wybierz lokalizację
              </h3>
              <button
                onClick={handleCloseMap}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  placeholder="Wyszukaj adres..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                  ) : (
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Search Predictions */}
              {showPredictions && predictions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {predictions.map((prediction, index) => (
                    <button
                      key={prediction.place_id}
                      onClick={() => handlePredictionSelect(prediction)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {prediction.structured_formatting.main_text}
                          </div>
                          <div className="text-sm text-gray-500">
                            {prediction.structured_formatting.secondary_text}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <div className="flex items-center gap-2 text-blue-700">
                <FaMapMarkerAlt className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Kliknij na mapę lub wyszukaj adres, aby wybrać lokalizację
                  pizzerii
                </span>
              </div>
            </div>

            {/* Map */}
            <div className="p-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-300">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                      <span className="text-sm text-gray-600">
                        Ładowanie lokalizacji...
                      </span>
                    </div>
                  </div>
                )}
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={12}
                  center={mapCenter}
                  options={mapOptions}
                  onClick={handleMapClick}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                >
                  {selectedLocation && <Marker position={selectedLocation} />}
                </GoogleMap>
              </div>

              {/* Selected location info */}
              {selectedLocation && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <FaMapMarkerAlt className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Wybrana lokalizacja:
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-green-600">
                    {searchInput ||
                      `Lat: ${selectedLocation.lat.toFixed(
                        6
                      )}, Lng: ${selectedLocation.lng.toFixed(6)}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
