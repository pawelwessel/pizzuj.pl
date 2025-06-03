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
      <ul className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 mx-auto mt-12">
        {places?.map((place, index) => (
          <li
            key={index}
            onClick={() => {
              getPlaceDetails(place.place_id).then((res) => console.log(res));
            }}
            className={`bg-gray-200 rounded-xl relative w-full ${
              !place.photoUrl ? "hidden" : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row  w-full">
              <div className="w-full lg:w-60">
                <Image
                  src={place.photoUrl || pizza}
                  alt={place.name}
                  width={400}
                  height={400}
                  className="border-[#ffa920] border-b-[6px] lg:border-b-0 lg:border-r-[6px] rounded-t-lg lg:rounded-l-lg w-full h-60 object-cover"
                />
              </div>
              <div className="pl-3">
                <Link
                  href={`/pizza/${createLinkFromText(
                    place.city
                  )}/${createLinkFromText(place.name)}`}
                  className="text-left block text-lg font-bold"
                >
                  {place.name}
                </Link>
                <p className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  {place.rating}/5
                </p>
                <p className="flex items-center gap-2">
                  <FaLocationArrow className="text-yellow-500" />
                  {place.city}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
