"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaCalculator, FaTrash } from "react-icons/fa";

export default function FoodCostCalculator() {
  const [dishName, setDishName] = useState("Pizza Margherita");
  const [servings, setServings] = useState(1);
  const [targetMargin, setTargetMargin] = useState(65);
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Ciasto", quantity: 250, unit: "g", costPer100g: 0.8 },
    {
      id: 2,
      name: "Sos pomidorowy",
      quantity: 80,
      unit: "g",
      costPer100g: 2.5,
    },
    { id: 3, name: "Mozzarella", quantity: 120, unit: "g", costPer100g: 18.0 },
    { id: 4, name: "Basilico", quantity: 10, unit: "g", costPer100g: 25.0 },
  ]);

  const [totalCost, setTotalCost] = useState(0);
  const [costPerServing, setCostPerServing] = useState(0);
  const [suggestedPrice, setSuggestedPrice] = useState(0);

  // Calculate costs whenever ingredients, servings, or target margin change
  useEffect(() => {
    const total = ingredients.reduce((sum, ingredient) => {
      const ingredientCost =
        (ingredient.quantity / 100) * ingredient.costPer100g;
      return sum + ingredientCost;
    }, 0);

    const perServing = total / servings;
    const suggested = perServing / (1 - targetMargin / 100);

    setTotalCost(total);
    setCostPerServing(perServing);
    setSuggestedPrice(suggested);
  }, [ingredients, servings, targetMargin]);

  const addIngredient = () => {
    const newId = Math.max(...ingredients.map((i) => i.id), 0) + 1;
    setIngredients([
      ...ingredients,
      {
        id: newId,
        name: "",
        quantity: 0,
        unit: "g",
        costPer100g: 0,
      },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? {
              ...ingredient,
              [field]:
                field === "quantity" || field === "costPer100g"
                  ? parseFloat(value) || 0
                  : value,
            }
          : ingredient
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Calculator Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
            <FaCalculator className="text-white text-xl" />
          </div>
          <h2 className="font-cocosharp-bold-italic text-2xl lg:text-3xl text-gray-800">
            Kalkulator kosztów
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium">
            {/* Dish Info */}
            <div className="mb-8">
              <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-4">
                Informacje o potrawie
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nazwa potrawy
                  </label>
                  <input
                    type="text"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                    placeholder="np. Pizza Margherita"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Liczba porcji
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Docelowa marża (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={targetMargin}
                    onChange={(e) =>
                      setTargetMargin(parseInt(e.target.value) || 0)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cocosharp text-xl font-semibold text-gray-800">
                  Składniki
                </h3>
                <button
                  onClick={addIngredient}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-golden"
                >
                  <FaPlus className="text-sm" />
                  Dodaj składnik
                </button>
              </div>

              <div className="space-y-4">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50/70 rounded-xl border border-gray-200/50"
                  >
                    <div className="col-span-12 md:col-span-4">
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
                        placeholder="Nazwa składnika"
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2">
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        placeholder="Ilość"
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <select
                        value={ingredient.unit}
                        onChange={(e) =>
                          updateIngredient(
                            ingredient.id,
                            "unit",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="szt">szt</option>
                      </select>
                    </div>
                    <div className="col-span-10 md:col-span-3">
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
                        placeholder="Koszt/100g (zł)"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <button
                        onClick={() => removeIngredient(ingredient.id)}
                        className="w-full flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        disabled={ingredients.length <= 1}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium sticky top-8">
            <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-6 text-center">
              Wyniki kalkulacji
            </h3>

            <div className="space-y-6">
              {/* Total Cost */}
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                <div className="text-sm text-blue-600 font-medium mb-1">
                  Całkowity koszt składników
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {totalCost.toFixed(2)} zł
                </div>
              </div>

              {/* Cost per serving */}
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                <div className="text-sm text-green-600 font-medium mb-1">
                  Koszt na porcję
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {costPerServing.toFixed(2)} zł
                </div>
              </div>

              {/* Suggested price */}
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200/50">
                <div className="text-sm text-primary-600 font-medium mb-1">
                  Sugerowana cena sprzedaży
                </div>
                <div className="text-2xl font-bold text-primary-800">
                  {suggestedPrice.toFixed(2)} zł
                </div>
                <div className="text-xs text-primary-600 mt-1">
                  (marża {targetMargin}%)
                </div>
              </div>

              {/* Margin breakdown */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Koszt składników:</span>
                    <span className="font-medium">
                      {costPerServing.toFixed(2)} zł
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marża:</span>
                    <span className="font-medium text-primary-600">
                      {(suggestedPrice - costPerServing).toFixed(2)} zł
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                    <span>Cena końcowa:</span>
                    <span>{suggestedPrice.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
