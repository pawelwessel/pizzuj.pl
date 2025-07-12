/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Hero from "../Hero";
import image1 from "../../public/lukiery.png";
import { Place } from "@/types";
// import PlaceDetails from "../PlaceDetails";
import { FaCrown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
export default async function SecondLandingPage({
  place,
  data,
}: {
  place: Place;
  data: any;
}) {
  return (
    <div>
      <Hero />
      <div className="relative p-4 max-w-[90%] lg:max-w-3xl mx-auto bg-[#B67280] rounded-xl mt-12 text-white">
        <FaCrown className="absolute left-3 -rotate-[30deg] top-3 text-3xl" />
        <h1 className="text-center text-3xl font-tenor px-4 max-w-2xl mx-auto">
          {data.page.h1.toUpperCase()}
        </h1>
        <p className="text-lg mx-auto max-w-2xl font-tenor text-center mt-4">
          {data.page.rankingSection}
        </p>
        <p className="text-lg mx-auto max-w-2xl text-yellow-200 text-center italic font-extralight">
          Manicure Blisko {data.page.address}
        </p>
      </div>
      <div className="p-4 z-[125] rounded-lg">
        <ul>
          <li key={place.place_id} className="mb-4 p-4 rounded-lg">
            {/* <PlaceDetails place={place} /> */}
          </li>
        </ul>
      </div>
      <h2 className="text-center text-3xl font-tenor px-4 max-w-2xl mx-auto">
        {data.page.testimonialSection}
      </h2>
      <ul className="mt-8 px-4 flex flex-col space-y-6 mb-12 max-w-2xl mx-auto">
        <li className="flex">
          <div className="rounded-lg flex items-center justify-center h-12 mr-3 aspect-square bg-rose-300">
            <FaHeart className="text-white text-xl" />
          </div>
          <p>{data.page.opinion1}</p>
        </li>
        <li className="flex">
          <div className="rounded-lg flex items-center justify-center h-12 mr-3 aspect-square bg-rose-300">
            <FaHeart className="text-white text-xl" />
          </div>
          <p>{data.page.opinion2}</p>
        </li>
        <li className="flex">
          <div className="rounded-lg flex items-center justify-center h-12 mr-3 aspect-square bg-rose-300">
            <FaHeart className="text-white text-xl" />
          </div>
          <p>{data.page.opinion3}</p>
        </li>
        <li className="flex">
          <div className="rounded-lg flex items-center justify-center h-12 mr-3 aspect-square bg-rose-300">
            <FaHeart className="text-white text-xl" />
          </div>
          <p>{data.page.opinion4}</p>
        </li>
      </ul>
      <div className="w-full h-12 bg-[#E7C1C6]"></div>
      <div className="h-max py-12 lg:h-screen w-full lg:px-12 mx-auto bg-[#CFACAC] flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <Image
          src={image1}
          alt="Lakiery do manicure"
          className="w-full px-12 lg:px-0 lg:w-1/2"
        />
        <div className="px-6 2xl:px-24 lg:w-1/2 lg:flex lg:items-center">
          <div className="mt-6 lg:mt-0">
            <h2
              className="font-tenor text-3xl lg:text-5xl xl:text-6xl text-white"
              style={{ lineHeight: 1.5 }}
            >
              Dołącz do specjalistek z branży manicure i pedicure
            </h2>
            <p className="text-xl text-white font-tenor mt-3 lg:mt-6">
              Chcesz zacząć zarabiać na swoich umiejętnościach i pasji?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
