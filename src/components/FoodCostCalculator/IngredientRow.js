import { FaTrash } from "react-icons/fa";
import { UNIT_OPTIONS } from "./constants";

export default function IngredientRow({ ingredient, updateIngredient, removeIngredient, canRemove }) {
  return (
    <div className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50/70 rounded-xl border border-gray-200/50">
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
          {UNIT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
          disabled={!canRemove}
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
} 