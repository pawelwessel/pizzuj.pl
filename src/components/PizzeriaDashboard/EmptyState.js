"use client";
import { FaPlus } from "react-icons/fa";

export default function EmptyState({ onAddClick }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl text-gray-300 mb-4">🍕</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">Brak pizzerii</h3>
      <p className="text-gray-500 mb-6">Dodaj swoją pierwszą pizzerię, aby rozpocząć</p>
      <button
        onClick={onAddClick}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto"
      >
        <FaPlus /> Dodaj Pizzerię
      </button>
    </div>
  );
} 