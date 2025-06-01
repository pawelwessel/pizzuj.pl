import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY;
const PLACES_TEXTSEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

async function getCityFromPlaceId(placeId) {
  const detailsRes = await fetch(
    `${PLACE_DETAILS_URL}?place_id=${placeId}&key=${GOOGLE_API_KEY}`
  );
  const detailsData = await detailsRes.json();

  const components = detailsData.result?.address_components || [];
  const cityComponent = components.find((c) => c.types.includes("locality"));
  return cityComponent?.long_name || null;
}

function getPhotoUrl(photoReference, maxwidth = 400) {
  if (!photoReference) return null;
  return `${PLACE_PHOTO_URL}?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
}

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await fetch(
      `${PLACES_TEXTSEARCH_URL}?query=pizza ${data.search}&key=${GOOGLE_API_KEY}`
    ).then((res) => res.json());

    const resultsWithCityAndPhoto = await Promise.all(
      response.results.map(async (place) => {
        const city = await getCityFromPlaceId(place.place_id);
        const photoReference = place.photos?.[0]?.photo_reference;
        const photoUrl = getPhotoUrl(photoReference);
        return {
          ...place,
          city,
          photoUrl,
        };
      })
    );
    return NextResponse.json(resultsWithCityAndPhoto);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch places data" });
  }
}
