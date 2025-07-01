"use client";
import Image from "next/image";
import { useState } from "react";
import { FaLocationArrow, FaStar, FaTimes } from "react-icons/fa6";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdLocationPin } from "react-icons/md";

export default function WarsawSection({ placesData }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlace(null);
  };

  return (
    <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-8 left-8 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      {/* Section header */}
      {/* <div className="relative z-10 text-center mb-12 lg:mb-16">
        <h2 className="font-heading text-zinc-800 text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Popularne pizzerie
        </h2>
        <p className="text-black font-cocosharp text-lg lg:text-xl max-w-2xl mx-auto">
          Odkryj najlepsze miejsca polecane przez naszą społeczność
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-200 to-white rounded-full mx-auto mt-6"></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="font-cocosharp-bold-italic !text-black text-xl font-semibold">
          Popularne pizzerie w Warszawie
        </h2>
        <p className="text-black font-cocosharp text-base lg:text-xl max-w-2xl mx-auto">
          Odkryj najlepsze miejsca polecane przez naszą społeczność
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-200 to-white rounded-full mx-auto mt-6"></div>
        <Slider {...settings}>
          {placesData?.map((place, index) => (
            <div
              key={index}
              className={`${!place.photos[0] ? "hidden" : ""} px-3 lg:px-4`}
            >
              <div
                onClick={() => handlePlaceClick(place)}
                className="block group cursor-pointer"
              >
                <div className="card-hover bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-large hover:shadow-golden-lg border border-white/20 transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={place.photos[0] || "/assets/pizza.png"}
                      alt={`${place.name} - pizzeria`}
                      width={400}
                      height={300}
                      className="w-full h-48 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Rating badge (if available) */}
                    {place.rating && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-medium">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="font-heading text-sm font-semibold text-gray-800">
                          {place.rating}
                        </span>
                      </div>
                    )}
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
                        <span className="font-body text-base lg:text-lg">
                          {place.city}
                        </span>
                      </div>

                      {/* Additional info if available */}
                      {place.description && (
                        <p className="font-body text-gray-600 text-sm lg:text-base line-clamp-2">
                          {place.description}
                        </p>
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
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Bottom section with CTA */}
      <div className="relative z-10 text-center mt-12 lg:mt-16">
        <div
          onClick={() => {/* Handle "Zobacz wszystkie pizzerie" click */}}
          className="inline-flex items-center gap-3 px-8 lg:px-10 py-4 lg:py-5 bg-white text-primary-600 hover:text-primary-700 font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-large hover:shadow-xl group cursor-pointer"
        >
          <span>Zobacz wszystkie pizzerie</span>
          <FaLocationArrow className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200 z-10"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal content */}
            <div className="p-0">
              {/* Image */}
              <div className="relative">
                <Image
                  src={selectedPlace.photos[0] || "/assets/pizza.png"}
                  alt={`${selectedPlace.name} - pizzeria`}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover rounded-t-3xl"
                />
                {selectedPlace.rating && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                    <FaStar className="text-yellow-500 text-lg" />
                    <span className="font-heading text-lg font-semibold text-gray-800">
                      {selectedPlace.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Restaurant name */}
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-800">
                    {selectedPlace.name}
                  </h2>

                  {/* Location */}
                  <div className="flex items-center gap-3 text-gray-600">
                    <MdLocationPin className="w-6 h-6 text-primary-500 flex-shrink-0" />
                    <span className="font-body text-lg lg:text-xl">
                      {selectedPlace.city}
                    </span>
                  </div>

                  {/* Address if available */}
                  {selectedPlace.address && (
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-semibold text-gray-800">
                        Adres
                      </h3>
                      <p className="font-body text-gray-600 text-base">
                        {selectedPlace.address}
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  {selectedPlace.description && (
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-semibold text-gray-800">
                        Opis
                      </h3>
                      <p className="font-body text-gray-600 text-base leading-relaxed">
                        {selectedPlace.description}
                      </p>
                    </div>
                  )}

                  {/* Additional details if available */}
                  {selectedPlace.phone && (
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-semibold text-gray-800">
                        Telefon
                      </h3>
                      <p className="font-body text-gray-600 text-base">
                        {selectedPlace.phone}
                      </p>
                    </div>
                  )}

                  {selectedPlace.website && (
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-semibold text-gray-800">
                        Strona internetowa
                      </h3>
                      <a
                        href={selectedPlace.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-primary-600 hover:text-primary-700 text-base underline"
                      >
                        {selectedPlace.website}
                      </a>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={closePopup}
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-heading font-semibold rounded-full transition-colors duration-200"
                    >
                      Zamknij
                    </button>
                    <button
                      onClick={() => {
                        window.open(`/pizza/${createLinkFromText(selectedPlace.city)}/${createLinkFromText(selectedPlace.name)}`, '_blank');
                      }}
                      className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-heading font-semibold rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <span>Zobacz pełną stronę</span>
                      <FaLocationArrow className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
