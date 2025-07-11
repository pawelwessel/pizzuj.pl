import { FaCalculator, FaTrash } from "react-icons/fa";

export default function CalculatorHeader({ 
  meals,
  currentMealIndex,
  setCurrentMealIndex,
  onDeleteMeal
}) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <FaCalculator className="text-blue-500 text-2xl" />
        </div>
        <h2 className="font-cocosharp-bold-italic text-2xl lg:text-3xl text-gray-800">
          Kalkulator kosztów
        </h2>
      </div>
      
      {/* Meal Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap pl-6 gap-2 mb-4">
          {meals.map((meal, index) => (
            <div key={meal.id} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMealIndex(index)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  index === currentMealIndex
                    ? 'bg-[#ffa920] text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {meal.dishName}
              </button>
              {meals.length > 1 && (
                <button
                  onClick={() => onDeleteMeal(meal.id, meal.dishName)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                  title="Usuń potrawę"
                >
                  <FaTrash className="text-sm" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 