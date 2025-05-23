"use client";
import React from "react";
export default function CtaButton() {
  const [inputOpen, setInputOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="">
      <button
        onClick={() => setInputOpen(true)}
        className="mx-auto block p-3 px-6 rounded-md bg-green-500 text-white font-bold"
      >
        Poproś o wycenę
      </button>
      {inputOpen && (
        <div className="flex flex-col items-center justify-center mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Wpisz swoje imię"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              alert(`Dziękujemy ${inputValue}, skontaktujemy się z Tobą!`);
              setInputOpen(false);
            }}
            className="mt-2 p-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Wyślij
          </button>
        </div>
      )}
    </div>
  );
}
