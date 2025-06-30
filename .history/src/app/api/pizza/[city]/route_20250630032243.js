import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY;
const PLACES_TEXTSEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

// Get full city name from address components
async function getCityFromPlaceId(placeId) {
  const res = await fetch(
    `${PLACE_DETAILS_URL}?place_id=${placeId}&fields=address_components&key=${GOOGLE_API_KEY}`
  );
  const data = await res.json();
  const components = data.result?.address_components || [];
  const city = components.find((c) => c.types.includes("locality"));
  return city?.long_name || null;
}

// Get photo URL by photo reference
function getPhotoUrls(photos = [], maxwidth = 1024) {
  return photos.map((p) => {
    return `${PLACE_PHOTO_URL}?maxwidth=${maxwidth}&photoreference=${p.photo_reference}&key=${GOOGLE_API_KEY}`;
  });
}

async function getPlaceDetails(placeId) {
  const fields = [
    "name",
    "formatted_address",
    "formatted_phone_number",
    "opening_hours",
    "website",
    "price_level",
    "rating",
    "user_ratings_total",
    "reviews",
    "photos",
  ].join(",");

  const res = await fetch(
    `${PLACE_DETAILS_URL}?place_id=${placeId}&fields=${fields}&language=pl&key=${GOOGLE_API_KEY}`
  );
  const data = await res.json();
  return data.result;
}

export async function GET(params, req) {
  try {
    const { city } = await req.params;
    console.log("Searching for pizza places in:", city);

    // Decode city name in case it has special characters
    const decodedCity = decodeURIComponent(city);

    // Step 1: Text search to get place IDs for pizza places in the specified city
    const searchRes = await fetch(
      `${PLACES_TEXTSEARCH_URL}?query=pizza ${decodedCity}&key=${GOOGLE_API_KEY}`
    );
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return NextResponse.json(
        { error: "No pizza places found in this city" },
        { status: 404 }
      );
    }

    // Step 2: For each result, get details
    const detailedPlaces = await Promise.all(
      searchData.results.map(async (place) => {
        const cityName = await getCityFromPlaceId(place.place_id);
        const details = await getPlaceDetails(place.place_id);
        const photoUrls = getPhotoUrls(details.photos);

        return {
          name: details.name,
          address: details.formatted_address,
          city: cityName,
          phone: details.formatted_phone_number || null,
          website: details.website || null,
          opening_hours: details.opening_hours || null,
          price_level: details.price_level || null,
          rating: details.rating,
          user_ratings_total: details.user_ratings_total,
          reviews: details.reviews || [],
          photos: photoUrls,
          place_id: place.place_id,
          geometry: place.geometry,
        };
      })
    );

    return NextResponse.json({
      city: decodedCity,
      places: detailedPlaces,
      total: detailedPlaces.length,
    });
  } catch (error) {
    console.error("Error fetching pizza places for city:", error);
    return NextResponse.json(
      { error: "Failed to fetch pizza places data" },
      { status: 500 }
    );
  }
}
