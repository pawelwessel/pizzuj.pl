import { Place } from "@/types";
import Image from "next/image";
// import Image from "next/image";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PlaceDetails({
  place,
  setOpenedResult,
}: {
  place: Place;
  setOpenedResult: any;
}) {
  async function getPlaceDetails(place_id: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getPlaceDetails/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_id }),
      }
    ).then((res) => res.json());
    return response;
  }
  async function openResult(place: any) {
    const result = await getPlaceDetails(place.place_id);
    setOpenedResult({ ...place, ...result });
  }
  return (
    <div
      onClick={() => openResult(place)}
      className="flex bg-gray-200 rounded-lg w-full mt-3"
    >
      {place.photos && (
        <div className="relative rounded-lg h-[150px] w-[150px] overflow-hidden">
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY}`}
            alt={place.name}
            width={400}
            height={300}
            className="rounded-lg absolute inset-0 object-cover w-full h-full"
          />
        </div>
      )}
      <div className="text-left flex flex-col items-start p-1.5">
        <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>

        {place.rating && <p className="text-gray-600">⭐ {place.rating} / 5</p>}
        <p>{place.formatted_address}</p>
      </div>
    </div>
  );
}
