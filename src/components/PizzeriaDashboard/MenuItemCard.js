import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaUtensils,
  FaTag,
  FaDollarSign,
  FaBox,
  FaTimes
} from 'react-icons/fa';

const MenuItemCard = ({ 
  item, 
  categories, 
  onEdit, 
  onDelete, 
  onToggleAvailability 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Item Image */}
      <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUtensils className="text-4xl text-orange-500" />
        )}
      </div>

      {/* Item Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-orange-600 font-bold">{item.price.toFixed(2)} zł</span>
            <button
              onClick={() => onToggleAvailability(item.id, item.isAvailable)}
              className={`p-1 rounded-full ${
                item.isAvailable 
                  ? 'text-green-500 hover:text-green-700' 
                  : 'text-red-500 hover:text-red-700'
              }`}
            >
              {item.isAvailable ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

        {/* Item Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <FaTag className="mr-1" />
            {categories.find(c => c.id === item.category)?.label}
          </div>
          {item.preparationTime && (
            <div className="flex items-center text-xs text-gray-500">
              <FaBox className="mr-1" />
              {item.preparationTime} min
            </div>
          )}
          {item.calories > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <FaDollarSign className="mr-1" />
              {item.calories} kcal
            </div>
          )}
          {item.allergens.length > 0 && (
            <div className="flex items-center text-xs text-red-500">
              <FaTimes className="mr-1" />
              Alergeny: {item.allergens.join(', ')}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="text-blue-500 hover:text-blue-700 p-1"
              title="Edytuj"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-500 hover:text-red-700 p-1"
              title="Usuń"
            >
              <FaTrash />
            </button>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {item.isAvailable ? 'Dostępne' : 'Niedostępne'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard; 