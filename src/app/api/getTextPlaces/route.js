import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY;
const PLACES_TEXTSEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";

export async function POST(req) {
  try {
    const data = await req.json();
    const search = encodeURIComponent(data.search);

    // First get basic place results
    const placesResponse = await fetch(
      `${PLACES_TEXTSEARCH_URL}?query=pizza-${search}&key=${GOOGLE_API_KEY}`
    ).then((res) => res.json());

    // Get detailed info for each place, including 5 recent opinions (reviews) in Polish
    const detailedPlaces = await Promise.all(
      placesResponse.results.map(async (place) => {
        // Request reviews in Polish by setting language=pl
        const detailsResponse = await fetch(
          `${PLACE_DETAILS_URL}?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,opening_hours,photos,rating,reviews,website,price_level,user_ratings_total,geometry&language=pl&key=${GOOGLE_API_KEY}`
        ).then((res) => res.json());

        // Extract up to 5 most recent reviews (opinions) in Polish
        let recentOpinions = [];
        if (
          detailsResponse.result &&
          Array.isArray(detailsResponse.result.reviews)
        ) {
          // Filter reviews to only those in Polish (just in case), then sort and take the first 5
          recentOpinions = detailsResponse.result.reviews
            .filter((review) => review.language === "pl")
            .sort((a, b) => b.time - a.time)
            .slice(0, 5);
        }

        return {
          ...place,
          details: detailsResponse.result,
          city: search,
          address: place.formatted_address,
          recentOpinions, // add the 5 recent opinions in Polish
        };
      })
    );
    console.log({
      results: detailedPlaces,
      status: placesResponse.status,
      next_page_token: placesResponse.next_page_token,
    })
    return NextResponse.json({
      results: detailedPlaces,
      status: placesResponse.status,
      next_page_token: placesResponse.next_page_token,
    });
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    return NextResponse.json(
      { error: "Failed to fetch places data" },
      { status: 500 }
    );
  }
}
