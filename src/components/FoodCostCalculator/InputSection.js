"use client"
import DishInfoSection from "./DishInfoSection";
import IngredientsSection from "./IngredientsSection";
import { FaPlus, FaHistory, FaUndo } from "react-icons/fa";
import { useWindow } from "../../hooks/getWindow";

export default function InputSection({
  currentMeal,
  updateCurrentMeal,
  addIngredient,
  removeIngredient,
  updateIngredient,
  onAddMeal,
  onShowHistory,
  onResetAllMeals,
  calculationHistory,
  showHistory
}) {
  const isWindowDefined = useWindow();

  return (
    <div className="lg:col-span-2">
      <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium">
        <DishInfoSection
          dishName={currentMeal.dishName}
          setDishName={(value) => updateCurrentMeal('dishName', value)}
          servings={currentMeal.servings}
          setServings={(value) => updateCurrentMeal('servings', value)}
          targetMargin={currentMeal.targetMargin}
          setTargetMargin={(value) => updateCurrentMeal('targetMargin', value)}
        />
        
        <IngredientsSection
          ingredients={currentMeal.ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          updateIngredient={updateIngredient}
        />
      </div>
      
      {/* Sticky Bottom Action Buttons */}
      <div className="sticky bottom-4 mt-6">
        <div className="glass bg-white/90 border border-gray-200/50 rounded-xl p-4 backdrop-blur-sm shadow-medium">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={onAddMeal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaPlus className="text-sm" />
              Dodaj potrawę
            </button>
            
            <button
              onClick={onShowHistory}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaHistory className="text-sm" />
              Historia {isWindowDefined && calculationHistory.length}
            </button>
            
            <button
              onClick={onResetAllMeals}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaUndo className="text-sm" />
              Resetuj wszystko
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 