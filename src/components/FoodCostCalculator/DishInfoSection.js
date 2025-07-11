export default function DishInfoSection({ dishName, setDishName, servings, setServings, targetMargin, setTargetMargin }) {
  return (
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
            step="1"
            value={servings}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 1;
              setServings(Math.max(1, value));
            }}
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
            step="1"
            value={targetMargin}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setTargetMargin(Math.max(0, Math.min(100, value)));
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );
} 