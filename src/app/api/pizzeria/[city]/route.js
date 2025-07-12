import data from "polskie-miejscowosci";
import { getDocuments } from "../../../../db/firebase";
import { NextResponse } from "next/server";
import { createLinkFromText } from "../../../../lib/createLinkFromText";

export async function GET(req, { params }) {
  const { city } = params;
  // Normalize city slug using polskie-miejscowosci and createLinkFromText
  const cityData = data.find(
    (c) => createLinkFromText(c.Name) === city && c.Type !== "village"
  );
  if (!cityData) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }
  // Fetch pizzerias for the city from Firebase (pages collection)
  const citySlug = createLinkFromText(cityData.Name);
  const page = await getDocuments("pages", citySlug);
  // page.places should contain pizzerias for the city
  if (!page || !page[0] || !page[0].places) {
    return NextResponse.json(
      { error: "No pizzerias found for this city" },
      { status: 404 }
    );
  }
  return NextResponse.json(page[0].places);
}
