"use client";
import { useEffect } from "react";
import { createLinkFromText } from "../../lib/createLinkFromText";
import { useState } from "react";
import {
  FaChevronRight,
  FaLocationArrow,
  FaLocationPin,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import loading1 from "../../../public/assets/loading1.png";
import loading2 from "../../../public/assets/loading2.png";
import Image from "next/image";
import { getDocument } from "../../db/firebase";
import { useRouter } from "next/navigation";
async function generatePage(searchTerm) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LINK}/api/generatePage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm }),
    }
  );
  return response;
}
export default function Form(loadingTexts) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingText, setLoadingText] = useState("Wyszukiwanie...");
  const [loadingStarted, setLoadingStarted] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState(0);
  const router = useRouter();
  useEffect(() => {
    let interval;
    if (loadingStarted) {
      interval = setInterval(() => {
        setLoadingTimer((prev) => prev + 100); // increment by 100ms
      }, 100);
    } else {
      setLoadingTimer(0);
    }
    return () => clearInterval(interval);
  }, [loadingStarted]);
  useEffect(() => {
    //change the loading text every 3 seconds
    const interval = setInterval(() => {
      setLoadingText(
        loadingTexts[Math.floor(Math.random() * loadingTexts.length)]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  // Format loadingTimer as "seconds,milliseconds"
  useEffect(() => {
    if (isLoading) {
      const seconds = Math.floor(loadingTimer / 1000);
      const milliseconds = (loadingTimer % 1000).toString().padStart(3, "0");
      setLoadingText(
        `${
          loadingTexts[Math.floor(loadingTimer / 2000) % loadingTexts.length]
        } (${seconds},${milliseconds}s)`
      );
    }
  }, [loadingTimer, isLoading]);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = async () => {
    if (!searchTerm || searchTerm.trim() === "") {
      setError("Proszę wpisać miasto.");
      return;
    }
    if (searchTerm.length < 3) {
      setError("Miasto musi mieć co najmniej 3 znaki.");
      return;
    }
    setIsLoading(true);
    setLoadingStarted(true);
    setError(null);

    const isExistingPage = await getDocument(
      "pages",
      createLinkFromText(searchTerm)
    );
    if (isExistingPage) {
      router.push(`/pizza/${createLinkFromText(searchTerm)}`);
      setIsLoading(false);
      setLoadingTimer(0);
      setLoadingStarted(false);
      setError(null);
      return;
    }
    const page = await generatePage(createLinkFromText(searchTerm));
    if (page) {
      router.push(`/pizza/${createLinkFromText(searchTerm)}`);
      setIsLoading(false);
      setLoadingTimer(0);
      setLoadingStarted(false);
      setError(null);
    }
  };

  return (
    <>
      {loadingStarted && (
        <div className="z-[150] rounded-xl lg:max-w-[500px] w-[90%] sm:w-[80%] py-4 h-max -mt-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-black/60 !text-white text-lg items-center justify-center text-center flex flex-col">
          <div className="w-full relative rounded-md overflow-hidden mb-4">
            <Image
              src={loading1}
              alt="Wczytywanie najlepszej pizzy w twoim mieście w-full"
            />
            <Image
              src={loading2}
              alt="Pizza Warszawa"
              style={{ transform: "scaleX(-1)" }}
              className="absolute left-0 top-0 w-full"
            />
          </div>
          <span className="text-sm lg:text-2xl font-bold">{loadingText}</span>
          <div className="block">
            {loadingTimer}
            <span className="text-green-500">ms</span>
          </div>
        </div>
      )}
      <div
        className={`${
          isLoading ? "opacity-50 pointer-events-none" : ""
        } relative`}
      >
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}
        <div className="max-w-full relative flex items-center">
          <input
            onChange={handleInputChange}
            value={searchTerm}
            type="text"
            name="search"
            className="border border-zinc-800 border-r-0 rounded-l-xl font-sans placeholder:text-black/50 text-lg py-4 h-12 pl-4 bg-white/50 text-black w-full mx-auto"
            placeholder="Wpisz miasto"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={async () => await handleSearch()}
            className="!text-white text-sm h-12 goldenShadow py-4 rounded-r-lg flex w-max mx-auto max-w-full items-center px-3"
          >
            <FaMagnifyingGlass className="w-6 h-6 mr-1" />
          </button>
        </div>
      </div>
    </>
  );
}
