"use client";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPhone, FaGlobe, FaStar, FaCrown, FaEye } from "react-icons/fa";

export default function PizzeriaCard({ pizzeria, onDelete, onView, onEdit }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-800">{pizzeria.name}</h3>
              {pizzeria.isPremium && (
                <FaCrown className="text-yellow-500 animate-pulse" />
              )}
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="text-gray-700 font-medium">{pizzeria.rating}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onView && onView()}
              className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
              title="Zarządzaj pizzeria"
            >
              <FaEye />
            </button>
            <button 
              onClick={() => onEdit && onEdit()}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edytuj pizzeria"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(pizzeria.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Usuń pizzeria"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-orange-500" />
            <span className="text-gray-700">{pizzeria.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-orange-500" />
            <span className="text-gray-700">{pizzeria.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaGlobe className="text-orange-500" />
            <span className="text-gray-700">{pizzeria.website}</span>
          </div>
        </div>

        {/* Description */}
        {pizzeria.description && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">{pizzeria.description}</p>
          </div>
        )}
      </div>
    </div>
  );
} 