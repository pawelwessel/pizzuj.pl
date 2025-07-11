import React from 'react';
import { FaEdit } from 'react-icons/fa';

const PizzeriaSettings = ({ onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Ustawienia Pizzerii</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Godziny otwarcia</h4>
              <p className="text-sm text-gray-600">10:00 - 22:00 (codziennie)</p>
            </div>
            <button 
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <FaEdit />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Obszar dostawy</h4>
              <p className="text-sm text-gray-600">5 km od lokalu</p>
            </div>
            <button 
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <FaEdit />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Minimalne zamówienie</h4>
              <p className="text-sm text-gray-600">25 zł</p>
            </div>
            <button 
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <FaEdit />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Czas przygotowania</h4>
              <p className="text-sm text-gray-600">20-30 minut</p>
            </div>
            <button 
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzeriaSettings; 