import { NextRequest, NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY; // Replace with your API Key
const PLACES_TEXTSEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const search = encodeURIComponent(data.search); // Encode search string for URL safety

    const response = await fetch(
      `${PLACES_TEXTSEARCH_URL}?query=manicure-${search}&key=${GOOGLE_API_KEY}`
    ).then((res) => res.json());

    // Extract only the first result
    // const firstResult = response.results?.[0] || null;

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    return NextResponse.json(
      { error: "Failed to fetch places data" },
      { status: 500 }
    );
  }
}
