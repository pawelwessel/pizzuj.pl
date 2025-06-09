"use client";
import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaTimes } from "react-icons/fa";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Navigation({ address, isOpen, onClose }) {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY,
    libraries: ["places"],
  });

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const getDirections = useCallback(async () => {
    if (!map) return;

    const directionsService = new window.google.maps.DirectionsService();

    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const geocoder = new window.google.maps.Geocoder();

          // Convert address to coordinates
          geocoder.geocode({ address }, async (results, status) => {
            if (status === "OK") {
              const destination = results[0].geometry.location;

              try {
                const result = await directionsService.route({
                  origin,
                  destination,
                  travelMode: window.google.maps.TravelMode.DRIVING,
                });
                setDirections(result);
              } catch (error) {
                console.error("Error fetching directions:", error);
              }
            }
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, [map, address]);

  if (!isLoaded) return null;

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Nawigacja do: {address}</h2>
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={options}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
          <button
            onClick={getDirections}
            className="mt-4 w-full py-3 px-6 bg-[#ffa920] text-white rounded-lg hover:bg-[#ec7308] transition-colors"
          >
            Pokaż trasę
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
