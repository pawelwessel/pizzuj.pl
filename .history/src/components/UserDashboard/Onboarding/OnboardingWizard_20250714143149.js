import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPizzaSlice,
  FaChartBar,
  FaCog,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import FeatureTour from "./FeatureTour";

const OnboardingWizard = ({
  userData = null,
  onComplete,
  onSkip,
  isVisible = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeatureTour, setShowFeatureTour] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      id: "welcome",
      title: "Witaj w Pizzuj!",
      description:
        "Pozwól nam pokazać Ci, jak w pełni wykorzystać swój panel użytkownika.",
      icon: FaUser,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Witaj, {userData?.name || "Użytkowniku"}!
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Twój panel użytkownika to centrum zarządzania Twoimi pizzeriami i
            promocją. Przejdźmy przez najważniejsze funkcje krok po kroku.
          </p>
        </motion.div>
      ),
    },
    {
      id: "profile",
      title: "Twój Profil",
      description: "Zarządzaj swoimi danymi osobowymi i ustawieniami konta.",
      icon: FaUser,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Co możesz zrobić w sekcji Profil:
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Edytować swoje dane osobowe
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Zmienić hasło do konta
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Zarządzać ustawieniami powiadomień
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Pobierać raporty i analizy
              </li>
            </ul>
          </div>
        </motion.div>
      ),
    },
    {
      id: "pizzerias",
      title: "Moje Pizzerie",
      description: "Dodawaj i zarządzaj swoimi pizzeriami.",
      icon: FaPizzaSlice,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Funkcje zarządzania pizzeriami:
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Dodawanie nowych pizzerii
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Edycja informacji o lokalach
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Zarządzanie menu i cenami
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Promocja pizzerii w wyszukiwarce
              </li>
            </ul>
          </div>
        </motion.div>
      ),
    },
    {
      id: "analytics",
      title: "Analizy i Statystyki",
      description: "Śledź wyniki swoich pizzerii i optymalizuj strategię.",
      icon: FaChartBar,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Dostępne analizy:
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Statystyki odwiedzin pizzerii
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Raporty sprzedaży
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Analiza konkurencji
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-3" />
                Eksport danych do PDF
              </li>
            </ul>
          </div>
        </motion.div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (onComplete) onComplete();
    toast.success(
      "Onboarding zakończony! Teraz możesz w pełni korzystać ze swojego panelu."
    );
  };

  const handleSkip = () => {
    if (onSkip) onSkip();
    toast.info("Onboarding pominięty. Możesz go wznowić w dowolnym momencie.");
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (showFeatureTour) {
    return (
      <FeatureTour
        isVisible={true}
        onComplete={() => {
          setShowFeatureTour(false);
          handleComplete();
        }}
        onSkip={() => {
          setShowFeatureTour(false);
          handleSkip();
        }}
        userData={userData}
      />
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Onboarding</h1>
                <button
                  onClick={handleSkip}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  Pomiń
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Postęp</span>
                  <span className="text-sm font-medium">
                    {currentStep + 1} / {steps.length}
                  </span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <motion.div
                    className="bg-white h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-4">
                    {React.createElement(steps[currentStep].icon, {
                      className: "text-white text-xl",
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-gray-600">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>

                {steps[currentStep].content}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 p-6 flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <FaArrowLeft className="mr-2" />
                Wstecz
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Zakończ
                    <FaCheck className="ml-2" />
                  </>
                ) : (
                  <>
                    Dalej
                    <FaArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingWizard;
