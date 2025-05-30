"use client";
import Image from "next/image";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
export default function ArrayWithPlaces() {
  const [places, setPlaces] = useState([]);

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
    fetchPlaces();
  }, []);

  return (
    <div className="w-full">
      <ul className="w-full flex flex-wrap gap-4 mx-auto mt-12">
        {places.map((place, index) => (
          <li
            key={index}
            onClick={() => {
              getPlaceDetails(place.place_id).then((res) => console.log(res));
            }}
            className="relative flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
          >
            <>
              <Image
                src={place.photoUrl}
                alt={place.name}
                width={400}
                height={400}
                className="rounded-md w-full h-48 object-cover"
              />
              <div className="w-full h-max left-0 bottom-0 rounded-b-md absolute flex justify-between items-end bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <Link
                  href={`/pizzerie-w-miastach/${createLinkFromText(
                    place.city
                  )}/${createLinkFromText(place.name)}`}
                  className="bg-black/50 p-3 drop-shadow-lg rounded-sm shadow-black text-white block w-max max-w-full truncate"
                >
                  {place.name}
                </Link>
              </div>
              <p className="absolute right-0 top-0 flex items-center gap-2 text-sm text-white bg-black/50 p-2 rounded">
                <FaStar className="text-yellow-500" />
                {place.rating}/5
              </p>
              <p className="absolute left-0 top-0 flex items-center gap-2 text-sm text-white bg-black/50 p-2 rounded">
                <FaLocationArrow className="text-yellow-500" />
                {place.city}
              </p>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
}
