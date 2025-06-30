"use client";
import Image from "next/image";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Link from "next/link";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import moment from "moment";
import { useState } from "react";
import Navigation from "../Navigation";

const isOpenNow = (weekdayText) => {
  if (!weekdayText || !Array.isArray(weekdayText)) return false;

  const dayMap = {
    monday: "poniedziałek",
    tuesday: "wtorek",
    wednesday: "środa",
    thursday: "czwartek",
    friday: "piątek",
    saturday: "sobota",
    sunday: "niedziela",
  };

  const currentDay = dayMap[moment().format("dddd").toLowerCase()];
  const currentTime = moment();

  // Find today's schedule
  const todaySchedule = weekdayText.find((schedule) =>
    schedule?.toLowerCase()?.includes(currentDay)
  );

  if (!todaySchedule) return false;

  try {
    // Extract hours from format "dzień: HH:MM–HH:MM"
    const timeRange = todaySchedule.split(": ")[1]; // 10:00–22:00
    const [start, end] = timeRange.split("–"); // 10:00, 22:00

    let openTime = moment(start, "HH:mm"); // 10:00
    let closeTime = moment(end, "HH:mm"); // 22:00

    // Handle cases where closing time is after midnight
    if (end?.startsWith("01:")) {
      closeTime.add(1, "day");
    }

    return currentTime.isBetween(openTime, closeTime, "minute", "[]");
  } catch (error) {
    console.error("Error parsing opening hours:", error);
    return false;
  }
};

export default function ArrayWithPlaces({ placesData }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Handle cases where placesData is undefined, null, or empty
  if (!placesData || placesData.length === 0) {
    return (
      <div className="w-full mt-12 p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-lg">
          Obecnie nie mamy danych o pizzeriach w tym mieście.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Spróbuj ponownie za chwilę lub wybierz inne miasto.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 mx-auto mt-12">
        {placesData?.map((place, index) => {
          const isOpen = isOpenNow(place.opening_hours?.weekday_text);
          return (
            <li
              key={index}
              className={`${
                place.name ? "" : "hidden"
              } rounded-2xl relative w-full p-3 group hover:border-yellow-500 border-transparent border-2 duration-300`}
            >
              <div className="flex flex-col xl:flex-row w-full">
                <div className="w-full lg:min-w-60">
                  <Link
                    href={`/pizza/${createLinkFromText(
                      place.city
                    )}/${createLinkFromText(place.name)}`}
                    className="text-left block font-sans text-lg font-bold"
                  >
                    {place.photos && place.photos.length > 0 ? (
                      <Image
                        src={place.photos[0]}
                        alt={place.name}
                        width={400}
                        height={400}
                        className="group-hover:scale-[1.02] duration-300 rounded-xl w-full h-60 sm:h-[400px] xl:h-60 object-cover"
                      />
                    ) : (
                      <div className="group-hover:scale-[1.02] duration-300 rounded-xl w-full h-60 sm:h-[400px] xl:h-60 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          Brak zdjęcia
                        </span>
                      </div>
                    )}
                  </Link>
                </div>
                <div className="pt-3 w-full lg:px-3">
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/pizza/${createLinkFromText(
                        place.city
                      )}/${createLinkFromText(place.name)}`}
                      className="text-left block font-sans text-lg font-bold"
                    >
                      <span className="text-left block font-sans text-lg font-bold pr-1">
                        {place.name}
                      </span>
                    </Link>
                    <span
                      className={`text-sm px-3 py-1 border rounded-full ${
                        isOpen
                          ? "bg-white text-green-800 border-green-200"
                          : "bg-white border-red-200 text-red-800"
                      }`}
                    >
                      {isOpen ? "Otwarte" : "Zamknięte"}
                    </span>
                  </div>
                  {place.phone && (
                    <div className="w-max text-xs rounded-xl golden !text-white flex items-center golden p-1.5 px-3 mt-1.5 gap-2">
                      <FaPhone />
                      <Link href={`tel:${place.phone}`}>{place.phone}</Link>
                    </div>
                  )}
                  <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-3 mt-2"></div>
                  <div className="flex">
                    <button
                      onClick={() => setSelectedPlace(place)}
                      className="cursor-pointer block text-nowrap !w-max mt-1 golden h-full p-2 rounded-tl-xl rounded-br-xl !text-white text-sm px-3 hover:bg-[#ec7308] transition-colors"
                    >
                      Idź do
                    </button>
                    <div className="pl-3 text-left">
                      <p className="flex items-center gap-2">{place.city}</p>
                      <p className="flex items-center gap-2 font-sans font-light text-sm mb-6">
                        {place.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {selectedPlace && (
        <Navigation
          address={`${selectedPlace.address}, ${selectedPlace.city}`}
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
