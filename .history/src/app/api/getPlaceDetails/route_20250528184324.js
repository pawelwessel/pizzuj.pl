import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY;
const PLACES_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const PLACES_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

export async function POST(req) {
  try {
    const data = await req.json();
    const placeId = data.place_id;

    if (!placeId) {
      return NextResponse.json({ error: "Missing place_id" }, { status: 400 });
    }

    // Fetch place details, including photos
    const response = await fetch(
      `${PLACES_DETAILS_URL}?place_id=${placeId}&fields=website,url,formatted_phone_number,international_phone_number,photos&key=${GOOGLE_API_KEY}`
    ).then((res) => res.json());

    if (!response.result) {
      return NextResponse.json(
        { error: "No place details found" },
        { status: 404 }
      );
    }

    // Extract photo references and build image URLs
    const photos = response.result.photos
      ? response.result.photos.map(
          (photo: any) =>
            `${PLACES_PHOTO_URL}?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
        )
      : [];

    return NextResponse.json({
      website: response.result.website || null,
      googleMapsUrl: response.result.url || null,
      phoneNumber: response.result.formatted_phone_number || null,
      internationalPhoneNumber:
        response.result.international_phone_number || null,
      photos,
    });
  } catch (error) {
    console.error("Error fetching place details:", error);
    return NextResponse.json(
      { error: "Failed to fetch place details" },
      { status: 500 }
    );
  }
}
