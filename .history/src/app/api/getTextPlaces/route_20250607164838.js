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
export async function POST(req) {
  try {
    const { search } = await req.json();

    // Step 1: Text search to get place IDs
    const searchRes = await fetch(
      `${PLACES_TEXTSEARCH_URL}?query=pizza ${search}&key=${GOOGLE_API_KEY}`
    );
    const searchData = await searchRes.json();

    // Step 2: For each result, get details
    const detailedPlaces = await Promise.all(
      searchData.results.map(async (place) => {
        const city = await getCityFromPlaceId(place.place_id);
        const details = await getPlaceDetails(place.place_id);
        const photoUrls = getPhotoUrls(details.photos);

        return {
          name: details.name,
          address: details.formatted_address,
          city,
          phone: details.formatted_phone_number || null,
          website: details.website || null,
          opening_hours: details.opening_hours || null,
          price_level: details.price_level || null,
          rating: details.rating,
          user_ratings_total: details.user_ratings_total,
          reviews: details.reviews || [],
          photos: photoUrls,
        };
      })
    );

    return NextResponse.json(detailedPlaces);
  } catch (error) {
    console.error("Error fetching place details:", error);
    return NextResponse.json({ error: "Failed to fetch places data" });
  }
}
