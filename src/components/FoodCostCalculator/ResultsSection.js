"use client"
import { FaCopy, FaSave, FaDownload } from "react-icons/fa";
import { useWindow } from "../../hooks/getWindow";
export default function ResultsSection({ 
  currentMeal,
  totalCost, 
  totalSuggestedPrice,
  mealsCount,
  copyToClipboard,
  onSaveAllCalculations,
  onGeneratePDF
}) {
  const isWindowDefined = useWindow();
  return (
    <div className="lg:col-span-1">
      <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium sticky top-8">
        <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-6 text-center">
          Wyniki kalkulacji
        </h3>

        <div className="space-y-6">
          {/* Current Meal Results */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-3 text-center">
              {currentMeal.dishName}
            </h4>
            
            {/* Current Meal Total Cost */}
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 mb-3">
              <div className="text-xs text-blue-600 font-medium mb-1">
                Koszt składników
              </div>
              <div className="text-lg font-bold text-blue-800">
                {currentMeal.totalCost.toFixed(2)} zł
              </div>
            </div>

            {/* Current Meal Cost per serving */}
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50 mb-3">
              <div className="text-xs text-green-600 font-medium mb-1">
                Koszt na porcję
              </div>
              <div className="text-lg font-bold text-green-800">
                {currentMeal.costPerServing.toFixed(2)} zł
              </div>
            </div>

            {/* Current Meal Suggested price */}
            <div className="text-center p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200/50">
              <div className="text-xs text-primary-600 font-medium mb-1">
                Sugerowana cena
              </div>
              <div className="text-lg font-bold text-primary-800">
                {currentMeal.suggestedPrice.toFixed(2)} zł
              </div>
              <div className="text-xs text-primary-600 mt-1">
                (marża {currentMeal.targetMargin}%)
              </div>
            </div>
          </div>

          {/* Total Results for All Meals */}
          {mealsCount > 1 && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-600 mb-3 text-center">
                Wszystkie potrawy ({mealsCount})
              </h4>
              
              {/* Total Cost */}
              <div className="text-center p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200/50 mb-3">
                <div className="text-xs text-indigo-600 font-medium mb-1">
                  Całkowity koszt
                </div>
                <div className="text-lg font-bold text-indigo-800">
                  {totalCost.toFixed(2)} zł
                </div>
              </div>

              {/* Total Suggested Price */}
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                <div className="text-xs text-purple-600 font-medium mb-1">
                  Całkowita cena
                </div>
                <div className="text-lg font-bold text-purple-800">
                  {totalSuggestedPrice.toFixed(2)} zł
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <button
              onClick={() => copyToClipboard(`${currentMeal.dishName}\nKoszt na porcję: ${currentMeal.costPerServing.toFixed(2)} zł\nSugerowana cena: ${currentMeal.suggestedPrice.toFixed(2)} zł`)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm"
            >
              <FaCopy className="text-xs" />
              Kopiuj wyniki
            </button>
            
            <button
              onClick={onSaveAllCalculations}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-sm"
            >
              <FaSave className="text-xs" />
              Zapisz wszystkie {isWindowDefined && mealsCount}
            </button>
            
            <button
              onClick={onGeneratePDF}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm"
            >
              <FaDownload className="text-xs" />
              Pobierz dokument
            </button>
            
            {mealsCount > 1 && (
              <button
                onClick={() => copyToClipboard(`Wszystkie potrawy (${mealsCount})\nCałkowity koszt: ${totalCost.toFixed(2)} zł\nCałkowita cena: ${totalSuggestedPrice.toFixed(2)} zł`)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all text-sm"
              >
                <FaCopy className="text-xs" />
                Kopiuj wszystko
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 