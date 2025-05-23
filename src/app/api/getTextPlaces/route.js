import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY;
const PLACES_TEXTSEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";

async function getCityFromPlaceId(placeId) {
  const detailsRes = await fetch(
    `${PLACE_DETAILS_URL}?place_id=${placeId}&key=${GOOGLE_API_KEY}`
  );
  const detailsData = await detailsRes.json();

  const components = detailsData.result?.address_components || [];

  // Try to find locality (city)
  const cityComponent = components.find((c) => c.types.includes("locality"));

  return cityComponent?.long_name || null;
}

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await fetch(
      `${PLACES_TEXTSEARCH_URL}?query=${data.search}&key=${GOOGLE_API_KEY}`
    ).then((res) => res.json());

    const limitedResults = response.results.slice(0, 4); // Adjust result count as needed

    const resultsWithCity = await Promise.all(
      limitedResults.map(async (place) => {
        const city = await getCityFromPlaceId(place.place_id);
        return {
          ...place,
          city,
        };
      })
    );

    return NextResponse.json(resultsWithCity);
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    return NextResponse.json(
      { error: "Failed to fetch places data" },
      { status: 500 }
    );
  }
}
