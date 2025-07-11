import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const MenuEmptyState = ({ activeCategory, categories, onAddItem }) => {
  return (
    <div className="text-center py-12">
      <FaUtensils className="text-6xl text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        {activeCategory === 'all' ? 'Brak dań w menu' : `Brak dań w kategorii ${categories.find(c => c.id === activeCategory)?.label}`}
      </h3>
      <p className="text-gray-500 mb-4">
        Dodaj pierwsze danie do menu, aby rozpocząć
      </p>
      <button
        onClick={onAddItem}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
      >
        Dodaj pierwsze danie
      </button>
    </div>
  );
};

export default MenuEmptyState; 