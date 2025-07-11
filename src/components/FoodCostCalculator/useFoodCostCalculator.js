import { useState, useEffect } from "react";
import { DEFAULT_INGREDIENTS, DEFAULT_VALUES } from "./constants";

export const useFoodCostCalculator = () => {
  const [dishName, setDishName] = useState(DEFAULT_VALUES.dishName);
  const [servings, setServings] = useState(DEFAULT_VALUES.servings);
  const [targetMargin, setTargetMargin] = useState(DEFAULT_VALUES.targetMargin);
  const [ingredients, setIngredients] = useState(DEFAULT_INGREDIENTS);

  const [totalCost, setTotalCost] = useState(0);
  const [costPerServing, setCostPerServing] = useState(0);
  const [suggestedPrice, setSuggestedPrice] = useState(0);

  // Calculate costs whenever ingredients, servings, or target margin change
  useEffect(() => {
    const total = ingredients.reduce((sum, ingredient) => {
      const ingredientCost = ingredient.quantity * ingredient.costPer100g;
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

  return {
    // State
    dishName,
    setDishName,
    servings,
    setServings,
    targetMargin,
    setTargetMargin,
    ingredients,
    totalCost,
    costPerServing,
    suggestedPrice,
    
    // Actions
    addIngredient,
    removeIngredient,
    updateIngredient,
  };
}; 