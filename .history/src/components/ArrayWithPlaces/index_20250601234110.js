"use client";
import Image from "next/image";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
import pizza from "../../../public/assets/pizza.png";
export default function ArrayWithPlaces({ placesData }) {
  const [places, setPlaces] = useState(placesData || []);
  const pathname = usePathname();
  async function getPlace() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LINK}/api/getTextPlaces/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: `Pizza ${pathname}` }), // Extract search term from URL
      }
    ).then((res) => res.json());
    return response;
  }
  async function getPlaceDetails(id) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LINK}/api/getPlaceDetails/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_id: id }), // Extract search term from URL
      }
    ).then((res) => res.json());
    return response;
  }

  useEffect(() => {
    async function fetchPlaces() {
      const response = await getPlace(pathname); // Extract search term from URL
      setPlaces(response.sort((a, b) => b.rating - a.rating)); // Assuming each place has a `rating` property
    }
    if (!placesData) {
      fetchPlaces();
      console.log("fetched");
    }
  }, []);

  return (
    <div className="w-full">
      <ul className="w-full grid grid-cols-1 gap-8 xl:gap-12 mx-auto mt-12">
        {places?.map((place, index) => (
          <li
            key={index}
            onClick={() => {
              getPlaceDetails(place.place_id).then((res) => console.log(res));
            }}
            className={`relative w-full ${!place.photoUrl ? "hidden" : ""}`}
          >
            <div className="flex items-start w-full">
              <Image
                src={place.photoUrl || pizza}
                alt={place.name}
                width={400}
                height={400}
                className="rounded-md w-full h-64 md:h-[400px] object-cover"
              />
              <div className="w-full flex justify-between items-end">
                <Link
                  href={`/pizza/${createLinkFromText(
                    place.city
                  )}/${createLinkFromText(place.name)}`}
                  className="p-3 drop-shadow-lg rounded-sm shadow-black text-white block w-max max-w-full truncate"
                >
                  {place.name}
                </Link>
              </div>
              <p className="flex items-center gap-2 text-sm text-white bg-black/50 p-2 rounded">
                <FaStar className="text-yellow-500" />
                {place.rating}/5
              </p>
              <p className="flex items-center gap-2 text-sm text-white bg-black/50 p-2 rounded">
                <FaLocationArrow className="text-yellow-500" />
                {place.city}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
