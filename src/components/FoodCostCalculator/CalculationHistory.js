import { FaHistory, FaTrash, FaCopy } from "react-icons/fa";

export default function CalculationHistory({ 
  showHistory, 
  calculationHistory, 
  deleteCalculation, 
  loadCalculation, 
  copyToClipboard 
}) {
  if (!showHistory) return null;

  return (
    <div className="mt-12">
      {calculationHistory.length > 0 ? (
        <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium">
          <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-6">
            Historia kalkulacji
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculationHistory.map((calculation) => (
              <div
                key={calculation.id}
                className="bg-gray-50/70 rounded-xl p-4 border border-gray-200/50 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {calculation.totalMeals > 1 
                      ? `${calculation.totalMeals} potraw` 
                      : calculation.meals[0]?.dishName || 'Kalkulacja'
                    }
                  </h4>
                  <button
                    onClick={() => deleteCalculation(calculation.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  {calculation.totalMeals > 1 ? (
                    <>
                      <div>Liczba potraw: {calculation.totalMeals}</div>
                      <div>Całkowity koszt: {calculation.totalCost.toFixed(2)} zł</div>
                      <div className="font-semibold text-primary-600">
                        Całkowita cena: {calculation.totalSuggestedPrice.toFixed(2)} zł
                      </div>
                    </>
                  ) : (
                    <>
                      <div>Porcje: {calculation.meals[0]?.servings}</div>
                      <div>Marża: {calculation.meals[0]?.targetMargin}%</div>
                      <div>Koszt: {calculation.meals[0]?.costPerServing.toFixed(2)} zł</div>
                      <div className="font-semibold text-primary-600">
                        Cena: {calculation.meals[0]?.suggestedPrice.toFixed(2)} zł
                      </div>
                    </>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 mb-3">
                  {calculation.timestamp}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => loadCalculation(calculation)}
                    className="flex-1 px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm transition-all"
                  >
                    Wczytaj
                  </button>
                  <button
                    onClick={() => {
                      if (calculation.totalMeals > 1) {
                        copyToClipboard(`${calculation.totalMeals} potraw - ${calculation.totalSuggestedPrice.toFixed(2)} zł`);
                      } else {
                        copyToClipboard(`${calculation.meals[0]?.dishName} - ${calculation.meals[0]?.suggestedPrice.toFixed(2)} zł`);
                      }
                    }}
                    className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-all"
                  >
                    <FaCopy className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium text-center">
          <div className="text-gray-500 mb-4">
            <FaHistory className="text-4xl mx-auto mb-2" />
            <p>Brak zapisanych kalkulacji</p>
            <p className="text-sm">Zapisz swoje kalkulacje, aby zobaczyć je tutaj</p>
          </div>
        </div>
      )}
    </div>
  );
} 