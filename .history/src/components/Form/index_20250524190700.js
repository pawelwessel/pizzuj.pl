"use client";

import Link from "next/link";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Form() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="">
      <input
        onChange={handleInputChange}
        value={searchTerm}
        type="text"
        name="search"
        className="p-3 lg:p-6 rounded-md bg-white/50 text-black max-w-[450px]"
        placeholder="Wpisz miasto"
      />
      <Link
        href={`/${searchTerm}`}
        className="text-white goldenShadow p-3 rounded-b-md flex w-max mx-auto max-w-full items-center"
      >
        <FaMagnifyingGlass className="w-7 h-7 mr-2" />
        Wyświetl propozycje
      </Link>
    </div>
  );
}
