"use client";
import Image from "next/image";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Link from "next/link";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
export default function ArrayWithPlaces({ placesData }) {
  return (
    <div className="w-full">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 mx-auto mt-12">
        {placesData?.map((place, index) => (
          <li
            key={index}
            className={`${
              place.photos ? "" : "hidden"
            } rounded-xl relative w-full`}
          >
            <div className="flex flex-col xl:flex-row w-full">
              <div className="w-full lg:min-w-60">
                <Image
                  src={place.photos[0]}
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
                </div>
                <div className="w-max text-xs rounded golden text-white flex items-center golden p-1.5 px-3 mt-1.5 gap-2">
                  <FaPhone />
                  <Link href={`tel:${place.phone}`}>{place.phone}</Link>
                </div>
                <div className="flex mt-3">
                  <div className="golden h-full p-2 rounded-tl-xl rounded-br-xl text-white">
                    Idź do
                  </div>
                  <div className="pl-2">
                    <p className="flex items-center gap-2">{place.city}</p>
                    <p className="flex items-center gap-2 font-sans font-light text-sm mb-6">
                      {place.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
