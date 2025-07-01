"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdLocationPin } from "react-icons/md";

async function fetchPlacesData(searchTerm) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/getTextPlaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: searchTerm }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const places = await response.json();
    return places.results;
  } catch (error) {
    console.error("Error fetching places data:", error);
    return [];
  }
}

export default function WarsawSection() {
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Fetch pizza places data for Warsaw
  useEffect(() => {
    const fetchWarsawPizzaPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchPlacesData("warszawa");
        setPlacesData(response);
      } catch (err) {
        console.error("Error fetching Warsaw pizza places:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWarsawPizzaPlaces();
  }, []);

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

  // Show loading state
  if (loading) {
    return (
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="font-cocosharp-bold-italic !text-black text-xl font-semibold">
            Popularne pizzerie w Warszawie
          </h2>
          <p className="text-black font-cocosharp text-base lg:text-xl max-w-2xl mx-auto">
            Odkryj najlepsze miejsca polecane przez naszą społeczność
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-200 to-white rounded-full mx-auto mt-6"></div>

          {/* Loading skeleton */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-large animate-pulse"
              >
                <div className="h-48 lg:h-56 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="font-cocosharp-bold-italic !text-black text-xl font-semibold">
            Popularne pizzerie w Warszawie
          </h2>
          <p className="text-black font-cocosharp text-base lg:text-xl max-w-2xl mx-auto mt-4">
            Przepraszamy, wystąpił błąd podczas ładowania danych: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      </section>
    );
  }

  // Show empty state if no places found
  if (!placesData || placesData.length === 0) {
    return (
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="font-cocosharp-bold-italic !text-black text-xl font-semibold">
            Popularne pizzerie w Warszawie
          </h2>
          <p className="text-black font-cocosharp text-base lg:text-xl max-w-2xl mx-auto mt-4">
            Nie znaleziono pizzerii w Warszawie.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-8 left-8 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="font-cocosharp-bold-italic !text-black text-xl font-semibold">
          Popularne pizzerie w Warszawie
        </h2>
        <p className="text-black font-cocosharp text-base lg:text-xl max-w-2xl mx-auto">
          Odkryj najlepsze miejsca polecane przez naszą społeczność
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-200 to-white rounded-full mx-auto mt-6"></div>
        <Slider {...settings}>
          {placesData.map((place, index) => (
            <div key={index} className="px-3 lg:px-4">
              <button
                onClick={() => setSelectedPlace(place)}
                className="block w-full group"
              >
                <div className="card-hover bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-large hover:shadow-golden-lg border border-white/20 transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY}`}
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
                          {place.rating} ({place.user_ratings_total})
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

                      {/* Business status and opening hours */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {place.business_status === 'OPERATIONAL' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Czynne
                          </span>
                        )}
                        {place.opening_hours?.open_now !== undefined && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            place.opening_hours.open_now 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {place.opening_hours.open_now ? 'Otwarte' : 'Zamknięte'}
                          </span>
                        )}
                      </div>

                      {/* Restaurant types */}
                      {place.types && place.types.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {place.types.slice(0, 3).map((type, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md font-medium">
                              {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          ))}
                          {place.types.length > 3 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                              +{place.types.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Location */}
                      <div className="flex items-center gap-3 text-gray-600">
                        <MdLocationPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="font-body text-sm lg:text-base line-clamp-2">
                          {place.formatted_address}
                        </span>
                      </div>

                      {/* Additional details row */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {/* Phone number if available */}
                        {place.details?.formatted_phone_number && (
                          <div className="font-body text-gray-600">
                            📞 {place.details.formatted_phone_number}
                          </div>
                        )}

                        {/* Website if available */}
                        {place.details?.website && (
                          <div className="font-body text-gray-600">
                            🌐 <span className="text-primary-600">Strona www</span>
                          </div>
                        )}
                      </div>

                      {/* Price level indicator */}
                      {place.price_level && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm">Cena:</span>
                          <span className="text-primary-600 font-medium">
                            {"$".repeat(place.price_level)} 
                            <span className="text-gray-400">{"$".repeat(4 - place.price_level)}</span>
                          </span>
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

      {/* Enhanced Popup Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
            <div className="relative">
              <Image
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${selectedPlace.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY}`}
                alt={`${selectedPlace.name} - pizzeria`}
                width={1200}
                height={600}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2.5 transition-all duration-300 hover:scale-110"
                aria-label="Zamknij"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Rating badge */}
              {selectedPlace.rating && (
                <div className="absolute top-4 left-4 bg-white/90 rounded-full px-4 py-2 flex items-center gap-2">
                  <FaStar className="text-yellow-500 w-5 h-5" />
                  <span className="font-semibold">{selectedPlace.rating}</span>
                  <span className="text-sm text-gray-600">
                    ({selectedPlace.user_ratings_total} opinii)
                  </span>
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedPlace.name}
                  </h2>

                  {/* Status badges */}
                  <div className="flex items-center gap-3 mb-4">
                    {selectedPlace.business_status === 'OPERATIONAL' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Czynne
                      </span>
                    )}
                    {selectedPlace.opening_hours?.open_now !== undefined && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedPlace.opening_hours.open_now 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedPlace.opening_hours.open_now ? '🕒 Otwarte teraz' : '🕒 Zamknięte'}
                      </span>
                    )}
                  </div>

                  {/* Restaurant categories */}
                  {selectedPlace.types && selectedPlace.types.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Kategorie:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.types.map((type, idx) => (
                          <span key={idx} className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-lg font-medium">
                            {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MdLocationPin className="text-primary-500 w-5 h-5" />
                      <span className="text-lg">{selectedPlace.city}</span>
                    </div>
                    {selectedPlace.address && (
                      <span className="text-gray-500">
                        • {selectedPlace.address}
                      </span>
                    )}
                  </div>

                  {selectedPlace.description && (
                    <div className="prose prose-lg max-w-none mb-6">
                      <p className="text-gray-600">
                        {selectedPlace.description}
                      </p>
                    </div>
                  )}

                  {/* Enhanced details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Opening hours */}
                    {selectedPlace.details?.opening_hours && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-primary-500">⏰</span> Godziny otwarcia
                        </h3>
                        {selectedPlace.details.opening_hours.weekday_text ? (
                          <div className="space-y-1 text-sm">
                            {selectedPlace.details.opening_hours.weekday_text.slice(0, 3).map((day, idx) => (
                              <p key={idx} className="text-gray-600">{day}</p>
                            ))}
                            {selectedPlace.details.opening_hours.weekday_text.length > 3 && (
                              <p className="text-primary-600 font-medium">
                                +{selectedPlace.details.opening_hours.weekday_text.length - 3} więcej
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-600">
                            {selectedPlace.opening_hours?.open_now ? "Otwarte" : "Zamknięte"}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Contact info */}
                    {(selectedPlace.details?.formatted_phone_number || selectedPlace.details?.website) && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-primary-500">📞</span> Kontakt
                        </h3>
                        <div className="space-y-2">
                          {selectedPlace.details?.formatted_phone_number && (
                            <p className="text-gray-600">
                              <span className="font-medium">Tel:</span> {selectedPlace.details.formatted_phone_number}
                            </p>
                          )}
                          {selectedPlace.details?.website && (
                            <p className="text-gray-600">
                              <span className="font-medium">Strona:</span>{' '}
                              <a 
                                href={selectedPlace.details.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-700 underline"
                              >
                                Odwiedź
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Price level */}
                    {selectedPlace.price_level && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-primary-500">💰</span> Poziom cen
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl text-primary-600">
                            {"$".repeat(selectedPlace.price_level)}
                          </span>
                          <span className="text-2xl text-gray-300">
                            {"$".repeat(4 - selectedPlace.price_level)}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({selectedPlace.price_level === 1 && "Niedrogie"}
                            {selectedPlace.price_level === 2 && "Umiarkowane"}
                            {selectedPlace.price_level === 3 && "Drogie"}
                            {selectedPlace.price_level === 4 && "Bardzo drogie"})
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Reviews summary */}
                    {selectedPlace.details?.reviews && selectedPlace.details.reviews.length > 0 && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-primary-500">⭐</span> Ostatnie opinie
                        </h3>
                        <div className="space-y-2">
                          {selectedPlace.details.reviews.slice(0, 2).map((review, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{review.author_name}</span>
                                <div className="flex items-center">
                                  <FaStar className="text-yellow-500 w-3 h-3" />
                                  <span className="text-gray-600 ml-1">{review.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 line-clamp-2">{review.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Link
                  href={`/pizza/${createLinkFromText(
                    selectedPlace.city
                  )}/${createLinkFromText(selectedPlace.name)}`}
                  className="flex-1 text-center bg-primary-600 text-white py-4 px-6 rounded-xl hover:bg-primary-700 transition-colors duration-300 font-semibold text-lg"
                >
                  Zobacz szczegóły
                </Link>
                {selectedPlace.details?.website && (
                  <a
                    href={selectedPlace.details.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border-2 border-primary-600 text-primary-600 py-4 px-6 rounded-xl hover:bg-primary-50 transition-colors duration-300 font-semibold text-lg"
                  >
                    Odwiedź stronę
                  </a>
                )}
                {selectedPlace.details?.formatted_phone_number && (
                  <a
                    href={`tel:${selectedPlace.details.formatted_phone_number}`}
                    className="flex-1 text-center border-2 border-green-600 text-green-600 py-4 px-6 rounded-xl hover:bg-green-50 transition-colors duration-300 font-semibold text-lg"
                  >
                    Zadzwoń
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
