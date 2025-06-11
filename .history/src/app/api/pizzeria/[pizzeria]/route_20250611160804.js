import { getDocuments } from "../../../../db/firebase";
import { NextResponse } from "next/server";

export async function GET(params, req) {
  const { pizzeria } = await req.params;
  const cities = await getDocuments("pages", pizzeria);
  // in each city is place array with places
  const places = cities.reduce((acc, city) => {
    // Add all places from current city to accumulator
    return [...acc, ...city.places];
  }, []);
  const place = places.find((place) => place.id === pizzeria);
  if (!place) {
    return NextResponse.json({ error: "Pizzeria not found" }, { status: 404 });
  }
  return NextResponse.json(place);
}
