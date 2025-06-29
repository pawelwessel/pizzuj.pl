"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdLocationPin } from "react-icons/md";

export default function WarsawSection({ placesData }) {
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
        <h2 className="font-cocosharp-bold-italic !text-black text-base lg:text-xl font-semibold">
          Popularne pizzerie w Warszawie
        </h2>
        <p className="text-black font-cocosharp text-lg lg:text-xl max-w-2xl mx-auto">
          Odkryj najlepsze miejsca polecane przez naszą społeczność
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-200 to-white rounded-full mx-auto mt-6"></div>
        <Slider {...settings}>
          {placesData?.map((place, index) => (
            <div
              key={index}
              className={`${!place.photos[0] ? "hidden" : ""} px-3 lg:px-4`}
            >
              <Link
                href={`/pizza/${createLinkFromText(
                  place.city
                )}/${createLinkFromText(place.name)}`}
                className="block group"
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
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Bottom section with CTA */}
      <div className="relative z-10 text-center mt-12 lg:mt-16">
        <Link
          href="/pizza"
          className="inline-flex items-center gap-3 px-8 lg:px-10 py-4 lg:py-5 bg-white text-primary-600 hover:text-primary-700 font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-large hover:shadow-xl group"
        >
          <span>Zobacz wszystkie pizzerie</span>
          <FaLocationArrow className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
