"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { createLinkFromText } from "../../lib/createLinkFromText";
import { FaMagnifyingGlass } from "react-icons/fa6";
import loading1 from "../../../public/assets/loading1.png";
import loading2 from "../../../public/assets/loading2.png";
import dynamic from "next/dynamic";

// Dynamically import Image and useRouter to avoid SSR issues
const Image = dynamic(() => import("next/image"), { ssr: false });
const useRouter =
  typeof window !== "undefined"
    ? require("next/navigation").useRouter
    : () => null;

import { getDocument } from "../../db/firebase";

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

function FormClient({ loadingTexts }) {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    searchTerm: "",
    loadingText: "Wyszukiwanie...",
    loadingStarted: false,
    loadingTimer: 0,
  });

  // Only initialize router on client
  const [router, setRouter] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined" && useRouter) {
      try {
        setRouter(useRouter());
      } catch (error) {
        setRouter(null);
      }
    }
  }, []);

  // Memoize the current loading text to avoid unnecessary re-renders
  const currentLoadingText = useMemo(() => {
    if (state.isLoading) {
      const seconds = Math.floor(state.loadingTimer / 1000);
      const milliseconds = (state.loadingTimer % 1000)
        .toString()
        .padStart(3, "0");
      return `${
        loadingTexts[
          Math.floor(state.loadingTimer / 2000) % loadingTexts.length
        ]
      } (${seconds},${milliseconds}s)`;
    }
    return state.loadingText;
  }, [state.isLoading, state.loadingTimer, state.loadingText, loadingTexts]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (state.loadingStarted) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          loadingTimer: prev.loadingTimer + 100,
        }));
      }, 100);
    } else {
      setState((prev) => ({ ...prev, loadingTimer: 0 }));
    }
    return () => clearInterval(interval);
  }, [state.loadingStarted]);

  // Loading text rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        loadingText:
          loadingTexts[Math.floor(Math.random() * loadingTexts.length)],
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [loadingTexts]);

  const handleInputChange = useCallback((e) => {
    setState((prev) => ({ ...prev, searchTerm: e.target.value }));
  }, []);

  const resetLoadingState = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      loadingTimer: 0,
      loadingStarted: false,
      error: null,
    }));
  }, []);

  const handleSearch = useCallback(async () => {
    if (!state.searchTerm || state.searchTerm.trim() === "") {
      setState((prev) => ({ ...prev, error: "Proszę wpisać miasto." }));
      return;
    }
    if (state.searchTerm.length < 3) {
      setState((prev) => ({
        ...prev,
        error: "Miasto musi mieć co najmniej 3 znaki.",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      loadingStarted: true,
      error: null,
    }));

    try {
      const isExistingPage = await getDocument(
        "pages",
        createLinkFromText(state.searchTerm)
      );

      if (isExistingPage) {
        if (router && typeof router.push === "function") {
          router.push(`/pizza/${createLinkFromText(state.searchTerm)}`);
        } else if (typeof window !== "undefined") {
          window.location.href = `/pizza/${createLinkFromText(
            state.searchTerm
          )}`;
        }
        resetLoadingState();
        return;
      }

      const page = await generatePage(createLinkFromText(state.searchTerm));
      if (page) {
        if (router && typeof router.push === "function") {
          router.push(`/pizza/${createLinkFromText(state.searchTerm)}`);
        } else if (typeof window !== "undefined") {
          window.location.href = `/pizza/${createLinkFromText(
            state.searchTerm
          )}`;
        }
        resetLoadingState();
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Wystąpił błąd podczas wyszukiwania.",
      }));
      resetLoadingState();
    }
  }, [state.searchTerm, router, resetLoadingState]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <>
      {state.loadingStarted && (
        <div className="z-[150] rounded-xl lg:max-w-[500px] w-[90%] sm:w-[80%] py-4 h-max -mt-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-black/60 !text-white text-lg items-center justify-center text-center flex flex-col">
          <div className="w-full relative rounded-md overflow-hidden mb-4">
            {typeof window !== "undefined" && Image && (
              <>
                <Image
                  src={loading1}
                  alt="Animacja ładowania - wczytywanie najlepszej pizzy"
                  aria-hidden="true"
                />
                <Image
                  src={loading2}
                  alt="Animacja ładowania - pizza"
                  style={{ transform: "scaleX(-1)" }}
                  className="absolute left-0 top-0 w-full"
                  aria-hidden="true"
                />
              </>
            )}
          </div>
          <span className="text-sm lg:text-2xl font-bold">
            {currentLoadingText}
          </span>
          <div className="block">
            {state.loadingTimer}
            <span className="text-green-500">ms</span>
          </div>
        </div>
      )}
      <div
        className={`${
          state.isLoading ? "opacity-50 pointer-events-none" : ""
        } relative`}
      >
        {state.error && (
          <div className="text-red-500 text-center mb-4">
            <p>{state.error}</p>
          </div>
        )}
        <div className="max-w-full relative flex items-center">
          <div id="search-help" className="sr-only">
            Wpisz nazwę miasta, aby znaleźć najlepsze pizzerie w okolicy
          </div>
          <input
            onChange={handleInputChange}
            value={state.searchTerm}
            type="text"
            name="search"
            className="border border-zinc-800 border-r-0 rounded-l-xl font-sans placeholder:text-black/50 text-lg py-4 h-12 pl-4 bg-white/50 text-black w-full mx-auto"
            placeholder="Wpisz miasto"
            onKeyDown={handleKeyDown}
            aria-label="Wyszukaj pizzerię w mieście"
            aria-describedby="search-help"
          />
          <button
            onClick={handleSearch}
            aria-label="Wyszukaj pizzerię"
            className="!text-white text-sm h-12 goldenShadow py-4 rounded-r-lg flex w-max mx-auto max-w-full items-center px-3"
          >
            <FaMagnifyingGlass className="w-6 h-6 mr-1" />
          </button>
        </div>
      </div>
    </>
  );
}

export default function Form({ loadingTexts }) {
  // Only render on client to avoid SSR errors
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    // Render a disabled input/button to avoid SSR error
    return (
      <div className="max-w-full relative flex items-center">
        <input
          type="text"
          name="search"
          className="border border-zinc-800 border-r-0 rounded-l-xl font-sans placeholder:text-black/50 text-lg py-4 h-12 pl-4 bg-white/50 text-black w-full mx-auto"
          placeholder="Wpisz miasto"
          disabled
        />
        <button
          className="!text-white text-sm h-12 goldenShadow py-4 rounded-r-lg flex w-max mx-auto max-w-full items-center px-3"
          disabled
        >
          <FaMagnifyingGlass className="w-6 h-6 mr-1" />
        </button>
      </div>
    );
  }

  return <FormClient loadingTexts={loadingTexts} />;
}
