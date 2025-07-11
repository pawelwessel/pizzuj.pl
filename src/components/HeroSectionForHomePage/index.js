"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Form from "../Form";
import accent from "../../../public/assets/asset6.png";
import accent1 from "../../../public/assets/asset7.png";
import { loadingTexts } from "../../db/data/loadingTexts";
import pizzuj2 from "../../../public/assets/1234.png";
import WarsawSection from "../WarsawSection";
import PizzaPlacePopup from "../WarsawSection/PizzaPlacePopup";
import { getDocument } from "../../db/firebase";
import { ptSans } from "../../app/layout";

export default function HeroSectionForHomePage() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [warsawData, setWarsawData] = useState({ results: [] });

  const handleCardClick = (place) => {
    setSelectedPlace(place);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlace(null);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchWarsawData = async () => {
      try {
        const warsaw = await fetch(
          `${process.env.NEXT_PUBLIC_LINK}/api/getTextPlaces/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: "warszawa" }),
          }
        );
        const data = await warsaw.json();
        setWarsawData(data);
      } catch (error) {
        console.error("Error fetching Warsaw data:", error);
      }
    };

    fetchWarsawData();
  }, []);

  const popularCities = [
    { name: "Warszawa", slug: "warszawa" },
    { name: "Grudziądz", slug: "grudziadz" },
    { name: "Bydgoszcz", slug: "bydgoszcz" },
    { name: "Poznań", slug: "poznan" },
    { name: "Gniezno", slug: "gniezno" },
    { name: "Kraków", slug: "krakow" },
    { name: "Toruń", slug: "torun" },
    { name: "Białystok", slug: "bialystok" },
  ];

  return (
    <section className="relative min-h-[50vh] lg:min-h-[60vh] w-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Enhanced floating pizza images with better positioning */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={accent}
          alt="Pizza decoration"
          className="absolute h-32 sm:h-40 lg:h-48 xl:h-64 2xl:h-80 w-auto opacity-20 lg:opacity-25 left-4 lg:left-16 xl:left-32 top-16 lg:top-1/4 xl:top-1/3 transform -translate-y-1/2 animate-bounce-gentle rounded-2xl"
          width={300}
          height={300}
          style={{ animationDelay: "0s" }}
        />
        <Image
          src={accent1}
          alt="Pizza decoration"
          className="absolute h-24 sm:h-32 lg:h-40 xl:h-56 2xl:h-72 w-auto opacity-25 lg:opacity-30 right-4 lg:right-16 xl:right-32 bottom-8 lg:bottom-1/4 xl:bottom-1/3 animate-bounce-gentle rounded-2xl"
          width={300}
          height={300}
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main content with enhanced glass morphism */}
      <div className="relative z-50 mx-auto w-screen">
        <div className="relative bg-green-500 glass backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl border border-white/30 shadow-large">
          {/* Enhanced hero heading */}
          <div className="text-center mb-8 lg:mb-12 flex flex-col items-center justify-center">
            {/* <Image
              src={pizzuj2}
              alt="Pizzuj.pl"
              className="mb-8 w-42 h-42 rounded-xl"
              width={240}
              height={240}
            /> */}
            <h1 className="font-cocosharp-bold-italic !text-gray-700 text-2xl sm:text-3xl font-extrabold lg:text-4xl xl:text-5xl leading-tight drop-shadow-lg">
              Najlepsze pizzerie w <br />
              <span className="text-[#ffa920] font-cocosharp-bold-italic">
                Twoim mieście
              </span>
            </h1>
            <p className={`!text-gray-500/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed ${ptSans.className}`}>
              Wybierz najlepszą restaurację i{" "}
              <Link
                href="/reklama-dla-pizzerii"
                className="group inline-flex items-center"
              >
                <span className="hover:decoration-white transition-colors duration-200 animate-pulse group-hover:animate-none text-green-500">
                  zamów online
                </span>
              </Link>
            </p>
          </div>
          {/* Enhanced search form */}
          <div className="flex flex-col items-center mb-10 lg:mb-12">
            <div className="w-full max-w-sm">
              <Form loadingTexts={loadingTexts} />
            </div>
          </div>

          {/* Enhanced popular cities section */}
          <div className="text-center my-24">
            {/* Enhanced city links grid */}
            <div className="flex flex-row flex-wrap justify-center gap-3 lg:gap-4 w-full max-w-2xl mx-auto">
              {popularCities.map((city, index) => (
                <Link
                  key={city.slug}
                  href={`pizza/${city.slug}`}
                  className="group relative p-3 lg:p-4 rounded-xl bg-green-500/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-golden card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="!uppercase text-green-800 text-sm lg:text-base font-medium group-hover:text-green-600  transition-colors duration-200 block">
                    {city.name}
                  </span>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* City card shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pizza places section */}
          <WarsawSection 
            placesData={warsawData.results} 
            onCardClick={handleCardClick}
          />
        </div>
      </div>

      {/* Popup managed at hero level - fixed to viewport */}
      {selectedPlace && (
        <PizzaPlacePopup
          place={selectedPlace}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </section>
  );
}
