import React from 'react';
import { 
  FaEdit, 
  FaTrash, 
  FaStar,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const PizzeriaOverview = ({ pizzeria, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{pizzeria.name}</h3>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                {pizzeria.address}
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-1" />
                {pizzeria.phone}
              </div>
              {pizzeria.website && (
                <div className="flex items-center">
                  <FaGlobe className="mr-1" />
                  {pizzeria.website}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              <FaStar className="mr-1" />
              {pizzeria.rating}
            </div>
            {pizzeria.isPremium && (
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Premium
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{pizzeria.description}</p>
        
        <div className="flex space-x-4">
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaEdit className="mr-2" />
            Edytuj
          </button>
          <button
            onClick={onDelete}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrash className="mr-2" />
            Usuń
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dzisiejsze zamówienia</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCalendarAlt className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Przychód dzisiaj</p>
              <p className="text-2xl font-bold text-gray-800">1,240 zł</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMoneyBillWave className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Średni czas dostawy</p>
              <p className="text-2xl font-bold text-gray-800">28 min</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <FaTruck className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nowi klienci</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Ostatnia aktywność</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Zamówienie #1234 zrealizowane</p>
                <p className="text-sm text-gray-600">2 minuty temu</p>
              </div>
            </div>
            <span className="text-green-600 font-medium">+45 zł</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <FaUsers className="text-blue-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Nowy klient zarejestrowany</p>
                <p className="text-sm text-gray-600">15 minut temu</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-yellow-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Długi czas oczekiwania</p>
                <p className="text-sm text-gray-600">32 minuty temu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzeriaOverview; 