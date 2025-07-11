export const DEFAULT_INGREDIENTS = [
  { id: 1, name: "Ciasto", quantity: 250, unit: "g", costPer100g: 0.008 },
  {
    id: 2,
    name: "Sos pomidorowy",
    quantity: 80,
    unit: "g",
    costPer100g: 0.025,
  },
  { id: 3, name: "Mozzarella", quantity: 120, unit: "g", costPer100g: 0.18 },
  { id: 4, name: "Basilico", quantity: 10, unit: "g", costPer100g: 0.25 },
];

export const UNIT_OPTIONS = [
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
  { value: "szt", label: "szt" },
];

export const DEFAULT_VALUES = {
  dishName: "Pizza Margherita",
  servings: 1,
  targetMargin: 65,
}; 