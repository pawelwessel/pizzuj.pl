import React from 'react';
import { motion } from 'framer-motion';

const PizzeriaDeleteModal = ({ isOpen, pizzeria, onConfirm, onCancel }) => {
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
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Potwierdź usunięcie</h3>
        <p className="text-gray-600 mb-6">
          Czy na pewno chcesz usunąć pizzeria "{pizzeria.name}"? Tej operacji nie można cofnąć.
        </p>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Usuń
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PizzeriaDeleteModal; 