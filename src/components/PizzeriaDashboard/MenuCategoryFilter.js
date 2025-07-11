import React from 'react';

const MenuCategoryFilter = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <category.icon className="mr-2" />
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryFilter; 