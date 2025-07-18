import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestion, FaPlay, FaTimes } from "react-icons/fa";

const HelpFloatingButton = ({
  onStartTour,
  onStartOnboarding,
  isOnboardingCompleted,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleExpanded}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        <FaQuestion className="text-xl" />
      </motion.button>

      {/* Expanded menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-64"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Pomoc</h3>
              <button
                onClick={toggleExpanded}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3">
              {!isOnboardingCompleted && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onStartOnboarding();
                    setIsExpanded(false);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                >
                  <span className="text-gray-700 font-medium">
                    Pełny Onboarding
                  </span>
                  <FaPlay className="text-blue-600" />
                </motion.button>
              )}

              <div className="border-t border-gray-200 pt-3">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Szybkie podpowiedzi:
                </h4>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Kliknij "Profil" aby edytować dane</li>
                  <li>• Przejdź do "Moje Pizzerie" aby dodać lokal</li>
                  <li>• Użyj wyszukiwarki aby znaleźć pizzerie</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpFloatingButton;
