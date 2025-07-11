"use client";
import { useState, useEffect } from "react";
import CalculatorHeader from "./CalculatorHeader";
import InputSection from "./InputSection";
import ResultsSection from "./ResultsSection";
import CalculationHistory from "./CalculationHistory";
import ConfirmationDialog from "./ConfirmationDialog";
import { showSuccessMessage, copyToClipboard, generatePDF, saveToLocalStorage, loadFromLocalStorage } from "./utils";
import { useWindow } from "../../hooks/getWindow";  

export default function FoodCostCalculator() {
  const isWindowDefined = useWindow();  
  const defaultMeals = [
    {
      id: 1,
      dishName: "Pizza Margherita",
      servings: 1,
      targetMargin: 65,
      ingredients: [
        { id: 1, name: "Ciasto", quantity: 250, unit: "g", costPer100g: 0.8 },
        { id: 2, name: "Sos pomidorowy", quantity: 80, unit: "g", costPer100g: 2.5 },
        { id: 3, name: "Mozzarella", quantity: 120, unit: "g", costPer100g: 18.0 },
        { id: 4, name: "Basilico", quantity: 10, unit: "g", costPer100g: 25.0 },
      ],
      totalCost: 0,
      costPerServing: 0,
      suggestedPrice: 0,
    }
  ];

  const [meals, setMeals] = useState(() => {
    // Load meals from localStorage on component mount
    return loadFromLocalStorage('foodCostCalculator_meals', defaultMeals);
  });

  const [currentMealIndex, setCurrentMealIndex] = useState(() => {
    // Load current meal index from localStorage
    return loadFromLocalStorage('foodCostCalculator_currentMealIndex', 0);
  });

  const [calculationHistory, setCalculationHistory] = useState(() => {
    // Load calculation history from localStorage
    return loadFromLocalStorage('foodCostCalculator_history', []);
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);

  const currentMeal = meals[currentMealIndex];

  // Save meals to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage('foodCostCalculator_meals', meals);
  }, [meals]);

  // Save current meal index to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('foodCostCalculator_currentMealIndex', currentMealIndex);
  }, [currentMealIndex]);

  // Save calculation history to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('foodCostCalculator_history', calculationHistory);
  }, [calculationHistory]);

  // Calculate costs for current meal whenever ingredients, servings, or target margin change
  useEffect(() => {
    const total = currentMeal.ingredients.reduce((sum, ingredient) => {
      const ingredientCost = (ingredient.quantity / 100) * ingredient.costPer100g;
      return sum + ingredientCost;
    }, 0);

    const perServing = total / currentMeal.servings;
    const suggested = perServing / (1 - currentMeal.targetMargin / 100);

    const updatedMeals = [...meals];
    updatedMeals[currentMealIndex] = {
      ...currentMeal,
      totalCost: total,
      costPerServing: perServing,
      suggestedPrice: suggested,
    };
    setMeals(updatedMeals);
  }, [currentMeal.ingredients, currentMeal.servings, currentMeal.targetMargin, currentMealIndex]);

  const addMeal = () => {
    const newMealId = Math.max(...meals.map(m => m.id), 0) + 1;
    const newMeal = {
      id: newMealId,
      dishName: `Potrawa ${newMealId}`,
      servings: 1,
      targetMargin: 65,
      ingredients: [
        { id: 1, name: "Składnik 1", quantity: 0, unit: "g", costPer100g: 0 },
      ],
      totalCost: 0,
      costPerServing: 0,
      suggestedPrice: 0,
    };
    
    setMeals([...meals, newMeal]);
    setCurrentMealIndex(meals.length);
    showSuccessMessage('Dodano nową potrawę!');
  };

  const deleteMeal = (mealId, mealName) => {
    setMealToDelete({ id: mealId, name: mealName });
    setShowDeleteDialog(true);
  };

  const confirmDeleteMeal = () => {
    if (!mealToDelete) return;
    
    const updatedMeals = meals.filter(meal => meal.id !== mealToDelete.id);
    setMeals(updatedMeals);
    
    // Adjust current index if needed
    if (currentMealIndex >= updatedMeals.length) {
      setCurrentMealIndex(updatedMeals.length - 1);
    }
    
    showSuccessMessage(`Potrawa "${mealToDelete.name}" została usunięta!`);
    setMealToDelete(null);
  };

  const updateCurrentMeal = (field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[currentMealIndex] = {
      ...updatedMeals[currentMealIndex],
      [field]: value,
    };
    setMeals(updatedMeals);
  };

  const addIngredient = () => {
    const newId = Math.max(...currentMeal.ingredients.map((i) => i.id), 0) + 1;
    const updatedIngredients = [
      ...currentMeal.ingredients,
      {
        id: newId,
        name: "",
        quantity: 0,
        unit: "g",
        costPer100g: 0,
      },
    ];
    
    updateCurrentMeal('ingredients', updatedIngredients);
  };

  const removeIngredient = (id) => {
    if (currentMeal.ingredients.length <= 1) {
      showSuccessMessage('Nie można usunąć ostatniego składnika!');
      return;
    }
    
    const updatedIngredients = currentMeal.ingredients.filter((ingredient) => ingredient.id !== id);
    updateCurrentMeal('ingredients', updatedIngredients);
  };

  const updateIngredient = (id, field, value) => {
    const updatedIngredients = currentMeal.ingredients.map((ingredient) =>
      ingredient.id === id
        ? {
            ...ingredient,
            [field]:
              field === "quantity" || field === "costPer100g"
                ? parseFloat(value) || 0
                : value,
          }
        : ingredient
    );
    
    updateCurrentMeal('ingredients', updatedIngredients);
  };

  const saveAllCalculations = () => {
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('pl-PL'),
      meals: [...meals],
      totalMeals: meals.length,
      totalCost: meals.reduce((sum, meal) => sum + meal.totalCost, 0),
      totalSuggestedPrice: meals.reduce((sum, meal) => sum + meal.suggestedPrice, 0),
    };
    
    setCalculationHistory([calculation, ...calculationHistory]);
    showSuccessMessage('Wszystkie kalkulacje zostały zapisane!');
  };

  const loadCalculation = (calculation) => {
    setMeals(calculation.meals);
    setCurrentMealIndex(0);
  };

  const deleteCalculation = (id) => {
    setCalculationHistory(calculationHistory.filter(calc => calc.id !== id));
  };

  const handleGeneratePDF = async () => {
    await generatePDF(meals, calculationHistory);
  };

  const resetAllMeals = () => {
    setMeals(defaultMeals);
    setCurrentMealIndex(0);
    showSuccessMessage('Wszystkie potrawy zostały zresetowane!');
  };

  const getTotalCost = () => meals.reduce((sum, meal) => sum + meal.totalCost, 0);
  const getTotalSuggestedPrice = () => meals.reduce((sum, meal) => sum + meal.suggestedPrice, 0);

  return (
    <div className="max-w-6xl mx-auto">
      {isWindowDefined && (
        <>
          <CalculatorHeader
            meals={meals}
            currentMealIndex={currentMealIndex}
            setCurrentMealIndex={setCurrentMealIndex}
            onDeleteMeal={deleteMeal}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <InputSection
              currentMeal={currentMeal}
              updateCurrentMeal={updateCurrentMeal}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              updateIngredient={updateIngredient}
              onAddMeal={addMeal}
              onShowHistory={() => setShowHistory(!showHistory)}
              onResetAllMeals={resetAllMeals}
              calculationHistory={calculationHistory}
              showHistory={showHistory}
            />

            <ResultsSection
              currentMeal={currentMeal}
              totalCost={getTotalCost()}
              totalSuggestedPrice={getTotalSuggestedPrice()}
              mealsCount={meals.length}
              copyToClipboard={copyToClipboard}
              onSaveAllCalculations={saveAllCalculations}
              onGeneratePDF={handleGeneratePDF}
            />
          </div>

          <CalculationHistory
            showHistory={showHistory}
            calculationHistory={calculationHistory}
            deleteCalculation={deleteCalculation}
            loadCalculation={loadCalculation}
            copyToClipboard={copyToClipboard}
          />

          <ConfirmationDialog
            isOpen={showDeleteDialog}
            onClose={() => {
              setShowDeleteDialog(false);
              setMealToDelete(null);
            }}
            onConfirm={confirmDeleteMeal}
            title="Usuń potrawę"
            message={`Czy na pewno chcesz usunąć potrawę "${mealToDelete?.name}"? Tej operacji nie można cofnąć.`}
            confirmText="Usuń potrawę"
            cancelText="Anuluj"
          />
        </>
      )}
    </div>
  );
}
