"use client";
import { FaArrowLeft } from "react-icons/fa";

export default function GoBack() {
  return (
    <button
      onClick={() => window.history.back()}
      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
    >
      <FaArrowLeft className="text-sm" />
      Wróć do poprzedniej strony
    </button>
  );
}
