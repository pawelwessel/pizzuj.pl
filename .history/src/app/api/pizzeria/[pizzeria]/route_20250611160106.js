import { NextResponse } from "next/server";
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
