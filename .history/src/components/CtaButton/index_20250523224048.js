"use client";
import React from "react";
export default function CtaButton() {
  const [inputOpen, setInputOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  return (
    <div
      className={`flex flex-col items-center justify-center w-max max-w-full mx-auto px-8 rounded-md pt-3 pb-12 ${
        inputOpen && "golden scale-105 duration-300"
      }`}
    >
      <button
        onClick={() => setInputOpen(!inputOpen)}
        title="Poproś o wycenę promowania restauracji"
        aria-label="Poproś o wycenę promowania restauracji"
        type="button"
        className={`mx-auto block p-3 px-6 rounded-md font-bold ${
          inputOpen ? "bg-white text-[#ffa920]" : "bg-[#ec7308] text-white"
        }`}
      >
        Zapytaj o wycenę
      </button>
      {inputOpen && (
        <div className="flex flex-col items-center justify-center mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="np. Pizzeria XYZ"
            className="w-full text-black border-2 border-white p-2 rounded-md"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+48 000 000 000"
            className="w-full text-black border-2 border-white p-2 rounded-md mt-2"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="pizzeria@example.com"
            className="w-full text-black border-2 border-white p-2 rounded-md mt-2"
          />
          <p className="text-xs text-white mt-2">
            Wypełniając formularz, wyrażasz zgodę na przetwarzanie swoich danych
            osobowych w celu kontaktu z Tobą. Więcej informacji znajdziesz w{" "}
            <Link
              href="/polityka-prywatnosci"
              className="text-[#ec7308] underline"
            >
              polityce prywatności
            </Link>
            .
          </p>
          <button
            onClick={() => {
              setInputOpen(false);
              setName("");
              setPhone("");
            }}
            className="mt-2 p-2 px-12 bg-[#ec7308] text-white rounded-md"
          >
            Wyślij
          </button>
        </div>
      )}
    </div>
  );
}
