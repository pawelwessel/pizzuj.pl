"use client";
import React, { useState } from "react";
export default function CtaButton() {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
    </>
    <button onClick={() => setFormOpen()} className="mx-auto block p-3 px-6 rounded-md bg-green-500 text-white font-bold">
      Poproś o wycenę
    </button>
  );
}
