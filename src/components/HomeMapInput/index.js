import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  loadGoogleMapsAPI,
  initGoogleMapsServices,
} from "../../lib/googleMapsLoader";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const defaultCenter = {
  lat: 52.2296756, // Default latitude
  lng: 21.0122287, // Default longitude
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export const HomeMapInput = ({
  data,
  locationDetails,
  setLocationDetails,
  setData,
  loadError,
  isLoaded,
  setResults,
}) => {
  const mapRef = useRef(null);
  const geocoder = useRef(null);
  const autocompleteService = useRef(null);

  const [selected, setSelected] = useState(data.location || null);
  const [mapCenter, setMapCenter] = useState(data.location || defaultCenter);
  const [address, setAddress] = useState(data.location?.address || "");
  const [searchInput, setSearchInput] = useState("");

  // Initialize Geocoder and AutocompleteService
  const initGeocoder = useCallback(() => {
    const services = initGoogleMapsServices();
    if (services) {
      geocoder.current = services.geocoder;
      autocompleteService.current = services.autocompleteService;
    }
  }, []);

  // Load Google Maps API
  useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => {
        initGeocoder();
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
      });
  }, [initGeocoder]);

  async function getPlace(search) {
    if (search) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/getTextPlaces/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
        }
      ).then((res) => res.json());
      return response;
    } else {
      return;
    }
  }

  const handleSearch = useCallback(() => {
    if (autocompleteService.current && searchInput) {
      autocompleteService.current.getPlacePredictions(
        { input: searchInput },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions?.length
          ) {
            const placeId = predictions[0].place_id;
            const placesService = new google.maps.places.PlacesService(
              mapRef.current
            );

            placesService.getDetails({ placeId }, (place, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                place?.geometry?.location
              ) {
                const location = {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                };
                setSelected(location);
                setMapCenter(location);
                setAddress(place.formatted_address || "Unknown location");
                setLocationDetails({
                  ...locationDetails,
                  place: place.formatted_address,
                });
                setData({ ...data, name: place.formatted_address });
              }
            });
          }
        }
      );
    }
  }, [searchInput]);

  const handleClick = useCallback(
    async (event) => {
      if (event.latLng && geocoder.current) {
        const location = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        setSelected(location);
        setMapCenter(location);

        geocoder.current.geocode({ location }, async (results, status) => {
          if (status === "OK" && results && results[0]) {
            const newAddress = results[0].formatted_address;
            getPlace(newAddress).then((res) => setResults(res));
            setAddress(newAddress);
            setLocationDetails({
              ...locationDetails,
              place: newAddress,
            });
            setData({ ...data, name: newAddress });
          } else {
            console.error("Geocoder failed due to: " + status);
            setAddress("Unknown location");
          }
        });
      }
    },
    [geocoder]
  );

  // Update Redux State
  useEffect(() => {
    if (selected && address) {
      setData({
        ...data,
        location: {
          lng: selected.lng,
          lat: selected.lat,
          address: address,
        },
      });
    }
  }, [selected, address]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a location"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="relative rounded-lg overflow-hidden border border-gray-300">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={mapCenter}
          options={options}
          onClick={handleClick}
          onLoad={(map) => {
            mapRef.current = map;
            initGeocoder();
          }}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </div>
  );
};
