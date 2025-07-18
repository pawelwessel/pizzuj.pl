"use client";
import Image from "next/image";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Link from "next/link";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import PizzaPlacePopup from "../WarsawSection/PizzaPlacePopup";

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

  const handleCardClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="w-full">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mx-auto mt-12">
        {placesData?.map((place, index) => {
          const isOpen = isOpenNow(place.opening_hours?.weekday_text);
          const photoUrl =
            place.photos && place.photos.length > 0 && place.photos[0]
              ? place.photos[0]
              : "/assets/pizza.png";

          return (
            <li
              key={index}
              className={`${!place.name ? "hidden" : ""} px-3 lg:px-4`}
            >
              <button
                onClick={() => handleCardClick(place)}
                className="block group w-full text-left"
              >
                <div className="card-hover bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-large hover:shadow-golden-lg border border-white/20 transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={photoUrl}
                      alt={`${place.name} - pizzeria`}
                      width={400}
                      height={300}
                      className="w-full h-48 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.error("Failed to load image:", photoUrl);
                        e.target.src = "/assets/pizza.png";
                      }}
                    />

                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Rating badge (if available) */}
                    {place.rating && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-medium">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="font-heading text-sm font-semibold text-gray-800">
                          {place.rating}{" "}
                          {place.user_ratings_total &&
                            `(${place.user_ratings_total})`}
                        </span>
                      </div>
                    )}

                    {/* Open/Closed status */}
                    <div className="absolute top-4 left-4">
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
                  </div>

                  {/* Content container */}
                  <div className="p-6 lg:p-8">
                    <div className="space-y-4">
                      {/* Restaurant name */}
                      <h3 className="font-heading text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                        {place.name}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-3 text-gray-600">
                        <MdLocationPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="uppercase font-cocosharp font-light text-base lg:text-lg">
                          {place.city}
                        </span>
                      </div>

                      {/* Address */}
                      {place.address && (
                        <p className="font-body text-gray-600 text-sm lg:text-base line-clamp-2">
                          {place.address}
                        </p>
                      )}

                      {/* Phone number */}
                      {place.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-sm">{place.phone}</span>
                        </div>
                      )}

                      {/* CTA indicator */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-body text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-300">
                          Zobacz szczegóły
                        </span>
                        <FaLocationArrow className="w-4 h-4 text-primary-500 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Popup */}
      {selectedPlace && (
        <PizzaPlacePopup
          place={selectedPlace}
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
