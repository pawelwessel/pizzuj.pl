import { FaPlus, FaTrash } from "react-icons/fa";

export default function IngredientsSection({ 
  ingredients, 
  addIngredient, 
  removeIngredient, 
  updateIngredient 
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-cocosharp text-xl font-semibold text-gray-800">
          Składniki
        </h3>
        <button
          onClick={addIngredient}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffa920] hover:bg-[#ffa920] text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-golden"
        >
          <FaPlus className="text-sm" />
          Dodaj składnik
        </button>
      </div>

      {/* Ingredients List */}
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="bg-gray-50/70 rounded-xl border border-gray-200/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Składnik {index + 1}
              </span>
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-all"
                  title="Usuń składnik"
                >
                  <FaTrash className="text-sm" />
                </button>
              )}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 lg:flex-[2]">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nazwa składnika
                </label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateIngredient(
                      ingredient.id,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  placeholder="np. Mąka, mięso, warzywa..."
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Ilość
                </label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    step="0.1"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      updateIngredient(
                        ingredient.id,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) =>
                      updateIngredient(
                        ingredient.id,
                        "unit",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded-lg px-2 py-2 text-sm text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="szt">szt</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Koszt {" "}
                  {ingredient.unit === "g" && (
                    <span className="text-xs text-gray-500">
                      (zł/g)
                    </span>
                  )}
                  {ingredient.unit === "kg" && (
                    <span className="text-xs text-gray-500">
                      (zł/kg)
                    </span>
                  )}
                  {ingredient.unit === "ml" && (
                    <span className="text-xs text-gray-500">
                      (zł/ml)
                    </span>
                  )}
                  {ingredient.unit === "l" && (
                    <span className="text-xs text-gray-500">
                      (zł/l)
                    </span>
                  )}
                  {ingredient.unit === "szt" && (
                    <span className="text-xs text-gray-500">
                      (zł/szt)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={ingredient.costPer100g}
                  onChange={(e) =>
                    updateIngredient(
                      ingredient.id,
                      "costPer100g",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            {/* Cost Preview */}
            {ingredient.quantity > 0 && ingredient.costPer100g > 0 && (
              <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-600">
                  Koszt tego składnika: <span className="font-semibold">
                    {(ingredient.quantity * ingredient.costPer100g).toFixed(2)} zł
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Add Ingredient Prompt */}
      {ingredients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FaPlus className="text-3xl mx-auto mb-3 text-gray-300" />
          <p className="text-sm">Kliknij "Dodaj składnik" aby rozpocząć</p>
        </div>
      )}
    </div>
  );
} 