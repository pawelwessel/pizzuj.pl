"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import cities from "../../data/cities.json";
import {
  FaMagnifyingGlass,
  FaMagnifyingGlassArrowRight,
} from "react-icons/fa6";

function CitySuggestion({ city, onSelect, isHighlighted }) {
  return (
    <button
      onClick={() => onSelect(city)}
      className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors ${
        isHighlighted ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex items-center">
        <FaMapMarkerAlt className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
        <div>
          <div className="font-medium text-gray-900">{city.name}</div>
          <div className="text-sm text-gray-500">
            Najlepsze pizzerie w {city.locative}
          </div>
        </div>
      </div>
    </button>
  );
}

function FormClient({ loadingTexts }) {
  const [state, setState] = useState({
    searchTerm: "",
    suggestions: [],
    showSuggestions: false,
    highlightedIndex: -1,
    isLoading: false,
    error: null,
  });

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter cities based on search term
  const filterCities = useCallback((searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];

    const normalizedSearch = searchTerm
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return cities
      .filter((city) => {
        const normalizedName = city.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedName.includes(normalizedSearch);
      })
      .slice(0, 5); // Limit to 5 suggestions
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      const suggestions = filterCities(value);

      setState((prev) => ({
        ...prev,
        searchTerm: value,
        suggestions,
        showSuggestions: suggestions.length > 0 && value.length >= 2,
        highlightedIndex: -1,
        error: null,
      }));
    },
    [filterCities]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (
          state.highlightedIndex >= 0 &&
          state.suggestions[state.highlightedIndex]
        ) {
          handleCitySelect(state.suggestions[state.highlightedIndex]);
        } else if (state.suggestions.length === 1) {
          handleCitySelect(state.suggestions[0]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setState((prev) => ({
          ...prev,
          highlightedIndex: Math.min(
            prev.highlightedIndex + 1,
            prev.suggestions.length - 1
          ),
        }));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setState((prev) => ({
          ...prev,
          highlightedIndex: Math.max(prev.highlightedIndex - 1, -1),
        }));
      } else if (e.key === "Escape") {
        setState((prev) => ({
          ...prev,
          showSuggestions: false,
          highlightedIndex: -1,
        }));
      }
    },
    [state.highlightedIndex, state.suggestions]
  );

  const handleCitySelect = useCallback((city) => {
    setState((prev) => ({
      ...prev,
      searchTerm: city.name,
      showSuggestions: false,
      highlightedIndex: -1,
      isLoading: true,
    }));

    // Redirect to the city page
    window.location.href = `/najlepsze-pizzerie-na-dowoz/${city.slug}`;
  }, []);

  const handleSearch = useCallback(() => {
    if (!state.searchTerm || state.searchTerm.trim() === "") {
      setState((prev) => ({ ...prev, error: "Proszę wpisać miasto." }));
      return;
    }

    // Find exact match
    const exactMatch = cities.find(
      (city) => city.name.toLowerCase() === state.searchTerm.toLowerCase()
    );

    if (exactMatch) {
      handleCitySelect(exactMatch);
    } else {
      setState((prev) => ({
        ...prev,
        error: "Nie znaleziono tego miasta. Wybierz z listy poniżej.",
      }));
    }
  }, [state.searchTerm, handleCitySelect]);

  const handleInputFocus = useCallback(() => {
    if (state.searchTerm.length >= 2) {
      setState((prev) => ({
        ...prev,
        showSuggestions: prev.suggestions.length > 0,
      }));
    }
  }, [state.searchTerm, state.suggestions.length]);

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setState((prev) => ({ ...prev, showSuggestions: false }));
    }, 200);
  }, []);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setState((prev) => ({ ...prev, showSuggestions: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
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
          ref={inputRef}
          onChange={handleInputChange}
          value={state.searchTerm}
          type="text"
          name="search"
          className="border border-zinc-800 border-r-0 rounded-l-xl font-sans placeholder:text-black/50 text-lg py-4 h-12 pl-4 bg-white/50 text-black w-full mx-auto"
          placeholder="Wpisz miasto"
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-label="Wyszukaj pizzerię w mieście"
          aria-describedby="search-help"
          autoComplete="off"
        />
        <button
          onClick={handleSearch}
          aria-label="Wyszukaj pizzerię"
          className="!text-white text-sm h-12 goldenShadow py-4 rounded-r-lg flex w-max mx-auto max-w-full items-center px-3"
        >
          <FaMagnifyingGlass className="w-6 h-6 mr-1" />
        </button>
      </div>

      {/* City Suggestions */}
      {state.showSuggestions && state.suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {state.suggestions.map((city, index) => (
            <CitySuggestion
              key={index}
              city={city}
              onSelect={handleCitySelect}
              isHighlighted={index === state.highlightedIndex}
            />
          ))}
        </div>
      )}

      {/* Loading overlay */}
      {state.isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="text-sm text-gray-600">Przekierowywanie...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Form({ loadingTexts }) {
  // Only render on client to avoid SSR errors
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Always return a valid JSX element
  if (!isClient) {
    // Render a disabled input/button to avoid SSR error
    return (
      <div className="flex-col mb-10 lg:mb-12 max-w-xs relative flex items-center">
        <input
          type="text"
          name="search"
          className="rounded-l-xl font-sans placeholder:text-zinc-500 text-lg py-4 h-12 pl-4 bg-white text-zinc-800 w-full mx-auto shadow-sm backdrop-blur-sm transition-all duration-200"
          placeholder="Wpisz miasto"
          disabled
        />
        <button
          className="!text-white text-sm h-12 goldenShadow py-4 rounded-r-lg flex w-max mx-auto max-w-full items-center px-3"
          disabled
        >
          <FaMagnifyingGlassArrowRight className="w-6 h-6 mr-1" />
        </button>
      </div>
    );
  }

  return <FormClient loadingTexts={loadingTexts} />;
}
