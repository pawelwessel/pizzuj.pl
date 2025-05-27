"use client";
import { useEffect } from "react";
import { getDocument } from "../../db/firebase";
import { createLinkFromText } from "../../lib/createLinkFromText";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
const loadingTexts = [
  "Szukamy poleceń...",
  "Pytamy właścicieli jakie mają opinie...",
  "Kręcimy placka na blacie...",
  "Kroimy pomidory i cebulę...",
  "Przygotowujemy przystawkę...",
  "Kroimy twoją szynkę...",
  "Przygotowujemy ciasto...",
  "Dodajemy składniki...",
  "Przygotowujemy sos pomidorowy...",
  "Dodajemy przyprawy...",
  "Trzemy ser...",
  "Rozgrzewamy piec...",
  "Wkładamy pizzę do pieca...",
  "Czekamy aż się upiecze...",
  "Pizza się piecze...",
  "Sprawdzamy czy pizza jest gotowa...",
  "Wyciągamy pizzę z pieca...",
  "Kroimy pizzę na kawałki...",
  "Pakujemy pizzę do pudełka...",
  "Przygotowujemy sos czosnkowy...",
  "Przygotowujemy sos pomidorowy...",
  "Przygotowujemy sos BBQ...",
  "Przygotowujemy sos chili...",
  "Przygotowujemy sos serowy...",
  "Przygotowujemy napój...",
  "Przygotowujemy sałatkę...",
  "Pakujemy zamówienie...",
  "Przygotowujemy do wysyłki...",
  "Przygotowujemy do odbioru...",
  "Przygotowujemy do dostawy...",
  "Przygotowujemy do odbioru osobistego...",
  "Przygotowujemy do zamówienia online...",
  "Przygotowujemy do zamówienia telefonicznego...",
  "Przygotowujemy do zamówienia przez aplikację mobilną...",
  "Przygotowujemy do zamówienia przez stronę internetową...",
  "Przygotowujemy do zamówienia przez Facebooka...",
  "Przygotowujemy do zamówienia przez Instagrama...",
  "Przygotowujemy do zamówienia przez WhatsAppa...",
  "Przygotowujemy do zamówienia przez Messengera...",
  "Przygotowujemy do zamówienia przez e-mail...",
  "Przygotowujemy do zamówienia przez SMS-a...",
  "Przygotowujemy do zamówienia przez telefon...",
  "Przygotowujemy do zamówienia przez stronę www...",
  "Pytamy restauratorów od ich zdanie...",
  "Dzwonimy do właścicieli pizzerii...",
  "Zaraz będziesz mógł zobaczyć swoją stronę...",
];

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingText, setLoadingText] = useState("Wyszukiwanie...");
  const [loadingStarted, setLoadingStarted] = useState(false);
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * loadingTexts.length);
        setLoadingText(loadingTexts[randomIndex]);
      }, 4000); // Change text every 4 seconds

      return () => clearInterval(interval); // Clear interval on unmount
    } else {
      setLoadingText("Wyszukiwanie...");
    }
  }, [isLoading]);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  async function generatePage() {
    setIsLoading(true);
    setLoadingStarted(true);
    setError(null);
    const existingPage = await getDocument(
      "pages",
      createLinkFromText(searchTerm)
    );
    if (existingPage) {
      setIsLoading(false);
      setSearchTerm("");
      setError(null);
      // Redirect to the existing page
      window.location.href = `/${createLinkFromText(searchTerm)}`;
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LINK}/api/generatePage/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          place: createLinkFromText(searchTerm),
          id: createLinkFromText(searchTerm),
        }), // Extract search term from URL
      }
    ).then((res) => res.json());
    setIsLoading(false);
    setLoadingTimer(0);
    setLoadingStarted(false);
    if (response.success) {
      setSearchTerm("");
      setError(null);
      // Redirect to the generated page
      window.location.href = `/${createLinkFromText(searchTerm)}`;
      return;
    }
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    return response;
  }

  return (
    <div
      className={`${
        isLoading ? "opacity-50 pointer-events-none" : ""
      } relative`}
    >
      <div className="py-12 w-full h-[120%] -mt-3 absolute left-0 top-0 bg-black/50 text-white text-lg items-center justify-center text-center flex">
        {loadingText}
      </div>
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>Wystąpił błąd</p>
        </div>
      )}
      <input
        onChange={handleInputChange}
        value={searchTerm}
        type="text"
        name="search"
        className="p-3 lg:p-6 rounded-md bg-white/50 text-black w-[550px] max-w-[80%] mx-auto block"
        placeholder="Wpisz miasto"
      />
      <button
        onClick={() => {
          setSearchTerm("");
          generatePage();
        }}
        className="text-white text-sm goldenShadow p-3 rounded-b-md flex w-max mx-auto max-w-full items-center"
      >
        <FaLocationArrow className="w-7 h-7 mr-2" />
        Rozpocznij wyszukiwanie
      </button>
    </div>
  );
}
