"use client";
import { getDocument } from "../../db/firebase";
import { createLinkFromText } from "../../lib/createLinkFromText";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  async function generatePage() {
    setIsLoading(true);
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
