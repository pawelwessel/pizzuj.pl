"use client";
import Image from "next/image";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Link from "next/link";
import { useState } from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
import pizza from "../../../public/assets/pizza.png";
export default function ArrayWithPlaces({ placesData }) {
  const [places, setPlaces] = useState(placesData || []);

  return (
    <div className="w-full">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 mx-auto mt-12">
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
            <div className="flex flex-col xl:flex-row w-full">
              <div className="w-full lg:min-w-60">
                <Image
                  src={place.photoUrl || pizza}
                  alt={place.name}
                  width={400}
                  height={400}
                  className="border-[#ffa920] border-b-[6px] xl:border-b-0 xl:border-r-[6px] rounded-t-lg xl:rounded-t-none xl:rounded-l-lg w-full h-60 sm:h-[400px] xl:h-60 object-cover"
                />
              </div>
              <div className="p-3 w-full">
                <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-3">
                  <Link
                    href={`/pizza/${createLinkFromText(
                      place.city
                    )}/${createLinkFromText(place.name)}`}
                    className="text-left block text-lg font-bold"
                  >
                    {place.name}
                  </Link>
                  <p className="flex items-center gap-2">
                    <FaLocationArrow className="text-[#ec7308]" />
                    {place.city}
                  </p>
                </div>
                <p className="flex items-center gap-2">
                  <FaStar className="text-[#ec7308]" />
                  {place.rating}/5
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
