import { NextResponse } from "next/server";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY; // Replace with your API Key
const PLACES_API_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
export async function POST(req) {
  const data = await req.json();
  const search = data.search;
  const response = await fetch(
    `${PLACES_API_URL}?location=${search}&radius=5000&type=pizza&keyword=${data.city}&key=${GOOGLE_API_KEY}&rankby=distance`
  ).then((res) => res.json());
  return NextResponse.json(response.results[0]);
}
