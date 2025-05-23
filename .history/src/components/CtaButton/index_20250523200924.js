"use client";
import React from "react";
export default function CtaButton() {
  const [inputOpen, setInputOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="np. Pizzeria XYZ"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+48 000 000 000"
            className="p-2 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="pizzeria@example.com"
            className="p-2 border border-gray-300 rounded-md mt-2"
          />
          <button
            onClick={() => {
              alert(
                `Dziękujemy ${name}, skontaktujemy się z Tobą pod numerem ${phone}!`
              );
              setInputOpen(false);
              setName("");
              setPhone("");
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
