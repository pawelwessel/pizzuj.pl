import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaTimes,
  FaChevronRight,
  FaChevronLeft,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";

const CustomTour = ({
  isVisible = false,
  onComplete,
  onSkip,
  userData = null,
  activeTab = "profile",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetElement, setTargetElement] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipPlacement, setTooltipPlacement] = useState("bottom");

  const overlayRef = useRef(null);
  const tooltipRef = useRef(null);

  // Tour steps configuration - memoized to prevent infinite re-renders
  const steps = useMemo(
    () => [
      {
        target: ".user-header",
        content: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              👋 Witaj w Pizzuj!
            </h3>
            <p className="text-gray-700">
              To jest Twój panel użytkownika. Pozwól mi pokazać Ci najważniejsze
              funkcje.
            </p>
          </motion.div>
        ),
        placement: "bottom",
      },
      {
        target: ".tab-navigation",
        content: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              📋 Nawigacja
            </h3>
            <p className="text-gray-700">
              Tutaj możesz przełączać się między różnymi sekcjami: Profil i Moje
              Pizzerie.
            </p>
          </motion.div>
        ),
        placement: "bottom",
      },
      {
        target: ".profile-section",
        content: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              👤 Twój Profil
            </h3>
            <p className="text-gray-700">
              Tutaj możesz edytować swoje dane osobowe i zarządzać ustawieniami
              konta.
            </p>
          </motion.div>
        ),
        placement: "right",
      },
      {
        target: ".pizzerias-section",
        content: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              🍕 Moje Pizzerie
            </h3>
            <p className="text-gray-700">
              Dodawaj i zarządzaj swoimi pizzeriami. To miejsce, gdzie możesz
              promować swoje lokale.
            </p>
          </motion.div>
        ),
        placement: "left",
      },
      {
        target: ".dashboard-content",
        content: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              🎉 Gotowe!
            </h3>
            <p className="text-gray-700">
              Teraz znasz podstawy swojego panelu. Możesz wrócić do tej
              wycieczki w dowolnym momencie.
            </p>
          </motion.div>
        ),
        placement: "top",
      },
    ],
    []
  );

  // Calculate tooltip position based on target element
  const calculateTooltipPosition = useCallback((target, placement) => {
    if (!target) return { x: 0, y: 0 };

    const rect = target.getBoundingClientRect();
    const tooltipWidth = 320; // Approximate tooltip width
    const tooltipHeight = 200; // Approximate tooltip height
    const offset = 20;

    let x = 0;
    let y = 0;

    switch (placement) {
      case "top":
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
        y = rect.top - tooltipHeight - offset;
        break;
      case "bottom":
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
        y = rect.bottom + offset;
        break;
      case "left":
        x = rect.left - tooltipWidth - offset;
        y = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case "right":
        x = rect.right + offset;
        y = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      default:
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
        y = rect.bottom + offset;
    }

    // Ensure tooltip stays within viewport
    x = Math.max(20, Math.min(x, window.innerWidth - tooltipWidth - 20));
    y = Math.max(20, Math.min(y, window.innerHeight - tooltipHeight - 20));

    return { x, y };
  }, []);

  // Update tooltip position when step changes
  useEffect(() => {
    if (!isVisible) return;

    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    const target = document.querySelector(currentStepData.target);
    if (target) {
      setTargetElement(target);
      setTooltipPlacement(currentStepData.placement);

      const position = calculateTooltipPosition(
        target,
        currentStepData.placement
      );
      setTooltipPosition(position);

      // Scroll target into view
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [currentStep, isVisible, steps]);

  // Start tour when component mounts if visible
  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isVisible]);

  // Update progress
  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, steps.length]);

  // Pause/resume tour
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Go to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  // Go to previous step
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Complete tour
  const handleComplete = () => {
    if (onComplete) onComplete();
    toast.success("Wycieczka zakończona! Teraz znasz swój panel.");
  };

  // Skip tour
  const handleSkip = () => {
    if (onSkip) onSkip();
    toast.info(
      "Wycieczka została pominięta. Możesz ją wznowić w dowolnym momencie."
    );
  };

  // Restart tour
  const restartTour = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPaused(false);
  };

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleSkip();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isVisible) return;

      switch (e.key) {
        case "Escape":
          handleSkip();
          break;
        case "ArrowRight":
        case " ":
          e.preventDefault();
          nextStep();
          break;
        case "ArrowLeft":
          e.preventDefault();
          previousStep();
          break;
        default:
          break;
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible, currentStep]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Empty div to maintain component structure */}
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleOverlayClick}
      />

      {/* Spotlight on target element */}
      {targetElement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute z-10"
          style={{
            left: targetElement.offsetLeft - 10,
            top: targetElement.offsetTop - 10,
            width: targetElement.offsetWidth + 20,
            height: targetElement.offsetHeight + 20,
          }}
        >
          <div className="relative w-full h-full">
            {/* Spotlight effect */}
            <div className="absolute inset-0 rounded-lg bg-white shadow-2xl border-2 border-orange-500 animate-onboarding-pulse" />

            {/* Arrow pointing to tooltip */}
            <div
              className="absolute w-0 h-0 border-8 border-transparent"
              style={{
                ...(tooltipPlacement === "top" && {
                  bottom: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderTopColor: "white",
                }),
                ...(tooltipPlacement === "bottom" && {
                  top: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderBottomColor: "white",
                }),
                ...(tooltipPlacement === "left" && {
                  right: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderLeftColor: "white",
                }),
                ...(tooltipPlacement === "right" && {
                  left: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderRightColor: "white",
                }),
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {currentStepData && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute z-20 bg-white rounded-2xl shadow-2xl p-6 max-w-sm"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Postęp</span>
                <span className="text-sm font-medium text-orange-600">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">{currentStepData.content}</div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                    onClick={previousStep}
                  >
                    <FaChevronLeft />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                  onClick={togglePause}
                >
                  {isPaused ? <FaPlay /> : <FaPause />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                  onClick={restartTour}
                >
                  <FaRedo />
                </motion.button>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={handleSkip}
                >
                  Pomiń
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
                  onClick={nextStep}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Zakończ
                      <FaCheck className="ml-2" />
                    </>
                  ) : (
                    <>
                      Dalej
                      <FaChevronRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button to restart tour */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={restartTour}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <FaPlay className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomTour;
