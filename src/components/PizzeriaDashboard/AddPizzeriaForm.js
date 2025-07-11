"use client";
import { FaPlus } from "react-icons/fa";
import LocationSearchInput from "./LocationSearchInput";

export default function AddPizzeriaForm({ 
  showForm, 
  newPizzeria, 
  setNewPizzeria, 
  onSubmit, 
  onCancel 
}) {
  if (!showForm) return null;

  const handleLocationSelect = (locationData) => {
    setNewPizzeria({
      ...newPizzeria,
      address: locationData.address,
      lat: locationData.lat,
      lng: locationData.lng,
      exactAddress: locationData.exactAddress,
      city: locationData.city
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Dodaj nową pizzerię</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwa pizzerii</label>
            <input
              type="text"
              value={newPizzeria.name}
              onChange={(e) => setNewPizzeria({...newPizzeria, name: e.target.value})}
              className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
            <input
              type="tel"
              value={newPizzeria.phone}
              onChange={(e) => setNewPizzeria({...newPizzeria, phone: e.target.value})}
              className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Adres</label>
          <LocationSearchInput
            value={newPizzeria.address}
            onChange={(value) => setNewPizzeria({...newPizzeria, address: value})}
            onLocationSelect={handleLocationSelect}
            placeholder="Wyszukaj adres pizzerii..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Miasto</label>
            <input
              type="text"
              value={newPizzeria.city || ""}
              onChange={(e) => setNewPizzeria({...newPizzeria, city: e.target.value})}
              className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Miasto zostanie automatycznie wypełnione"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Strona internetowa</label>
            <input
              type="url"
              value={newPizzeria.website}
              onChange={(e) => setNewPizzeria({...newPizzeria, website: e.target.value})}
              className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Hidden fields for coordinates */}
        <input type="hidden" value={newPizzeria.lat || ""} />
        <input type="hidden" value={newPizzeria.lng || ""} />
        <input type="hidden" value={newPizzeria.exactAddress || ""} />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Opis</label>
          <textarea
            value={newPizzeria.description}
            onChange={(e) => setNewPizzeria({...newPizzeria, description: e.target.value})}
            className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            rows="3"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
          >
            <FaPlus /> Dodaj
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
} 