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
import WarsawSectionSkeleton from "../WarsawSection/WarsawSectionSkeleton";
import PizzaPlacePopup from "../WarsawSection/PizzaPlacePopup";
import { getDocument } from "../../db/firebase";
import { ptSans } from "../../app/layout";

export default function HeroSectionForHomePage() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [warsawData, setWarsawData] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchWarsawData();
  }, []);

  return (
    <section className="relative min-h-[50vh] lg:min-h-[60vh] w-full pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Enhanced floating pizza images with better positioning */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={accent}
          alt="Dekoracyjny obrazek pizzy"
          className="absolute h-32 sm:h-40 lg:h-48 xl:h-64 2xl:h-80 w-auto opacity-20 lg:opacity-25 left-4 lg:left-16 xl:left-32 top-16 lg:top-1/4 xl:top-1/3 transform -translate-y-1/2 animate-bounce-gentle rounded-2xl"
          width={300}
          height={300}
          style={{ animationDelay: "0s" }}
          aria-hidden="true"
        />
        <Image
          src={accent1}
          alt="Dekoracyjny obrazek pizzy"
          className="absolute h-24 sm:h-32 lg:h-40 xl:h-56 2xl:h-72 w-auto opacity-25 lg:opacity-30 right-4 lg:right-16 xl:right-32 bottom-8 lg:bottom-1/4 xl:bottom-1/3 animate-bounce-gentle rounded-2xl"
          width={300}
          height={300}
          style={{ animationDelay: "1s" }}
          aria-hidden="true"
        />
      </div>

      {/* Main content with enhanced glass morphism */}
      <div className="relative z-50 mx-auto w-screen">
        <div className="relative">
          {/* Enhanced hero heading */}
          <div className="text-center mb-6 flex flex-col items-center justify-center">
            <h1 className="font-cocosharp !text-zinc-800 text-2xl sm:text-3xl font-extrabold lg:text-4xl xl:text-5xl leading-tight drop-shadow-lg">
              Najlepsze pizzerie w <br />
              <span className="text-[#ffa920] font-cocosharp-bold">
                Twoim mieście
              </span>
            </h1>
            <p
              className={`!text-zinc-800 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-gotham my-3`}
            >
              Wybierz najlepszą restaurację i zamów online
            </p>
          </div>
          {/* Enhanced search form */}
          <div className="max-w-xs mx-auto mb-10 lg:mb-12">
            <Form loadingTexts={loadingTexts} />
          </div>

          {/* Pizza places section */}
          {isLoading ? (
            <WarsawSectionSkeleton />
          ) : (
            <WarsawSection
              placesData={warsawData.results}
              onCardClick={handleCardClick}
            />
          )}
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
