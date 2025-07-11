import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const MenuItemForm = ({ 
  isOpen, 
  isEdit, 
  item, 
  setItem, 
  onSubmit, 
  onCancel, 
  saving 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edytuj danie' : 'Dodaj nowe danie'}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwa dania *
              </label>
              <input
                type="text"
                required
                value={item.name}
                onChange={(e) => setItem({...item, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategoria *
              </label>
              <select
                value={item.category}
                onChange={(e) => setItem({...item, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="pizza">Pizza</option>
                <option value="pasta">Makaron</option>
                <option value="salad">Sałatki</option>
                <option value="drinks">Napoje</option>
                <option value="desserts">Desery</option>
                <option value="sides">Dodatki</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis *
            </label>
            <textarea
              required
              value={item.description}
              onChange={(e) => setItem({...item, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cena (zł) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={item.price}
                onChange={(e) => setItem({...item, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Czas przygotowania (min)
              </label>
              <input
                type="number"
                min="1"
                value={item.preparationTime || ''}
                onChange={(e) => setItem({...item, preparationTime: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kalorie
              </label>
              <input
                type="number"
                min="0"
                value={item.calories || ''}
                onChange={(e) => setItem({...item, calories: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Składniki (oddzielone przecinkami)
              </label>
              <input
                type="text"
                value={item.ingredients.join(', ')}
                onChange={(e) => setItem({...item, ingredients: e.target.value.split(',').map(i => i.trim()).filter(i => i)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alergeny (oddzielone przecinkami)
              </label>
              <input
                type="text"
                value={item.allergens.join(', ')}
                onChange={(e) => setItem({...item, allergens: e.target.value.split(',').map(a => a.trim()).filter(a => a)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAvailable"
              checked={item.isAvailable}
              onChange={(e) => setItem({...item, isAvailable: e.target.checked})}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="isAvailable" className="text-sm text-gray-700">
              Dostępne w menu
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={saving}
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving && <FaSpinner className="animate-spin mr-2" />}
              {isEdit ? 'Zapisz zmiany' : 'Dodaj danie'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MenuItemForm; 