"use client";
import { useState } from 'react';
import { FaCrown, FaGem, FaStar, FaCheck, FaExclamationTriangle, FaTimes, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PlanDowngrade = ({ currentPlan, onDowngrade, onCancel }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      icon: FaStar,
      price: '0 zł',
      period: 'miesięcznie',
      features: [
        'Dodaj swoją pizzerię do bazy',
        'Podstawowe informacje o lokalu',
        'Do 3 zdjęć pizzerii',
        'Podstawowe menu (do 10 pozycji)',
        'Opinie i oceny klientów'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: FaCrown,
      price: '999 zł',
      period: 'miesięcznie',
      features: [
        'Wszystko z planu Starter +',
        'Promowanie w wynikach wyszukiwania',
        'Znaczek "Polecane" przy pizzerii',
        'Nieograniczone zdjęcia',
        'Pełne menu z kategoriami i opisami',
        'Promocje i oferty specjalne',
        'Statystyki odwiedzin i zainteresowania',
        'Priorytetowe wsparcie klienta'
      ]
    }
  ];

  const getCurrentPlanDetails = () => {
    if (currentPlan === 'enterprise') {
      return {
        name: 'Enterprise',
        icon: FaGem,
        price: '1499 zł',
        features: [
          'Wszystko z planu Premium +',
          'Reklamy bannerowe na stronie głównej',
          'Pierwszeństwo w wynikach wyszukiwania',
          'Zaawansowane analytics i raporty',
          'Newsletter do klientów (500/miesiąc)',
          'Dedykowany opiekun klienta',
          'Możliwość rezerwacji stolików online',
          'Integracja z mediami społecznościowymi',
          'Ekskluzywne funkcje VIP',
          'Własne kampanie marketingowe'
        ]
      };
    }
    return plans.find(p => p.id === currentPlan) || plans[0];
  };

  const currentPlanDetails = getCurrentPlanDetails();
  const availablePlans = plans.filter(p => p.id !== currentPlan);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleDowngrade = async () => {
    if (!selectedPlan) {
      toast.error('Wybierz plan do przejścia');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmDowngrade = async () => {
    try {
      // Here you would integrate with Stripe
      toast.info('Przetwarzanie zmiany planu...');
      onDowngrade && onDowngrade(selectedPlan);
      setShowConfirmation(false);
    } catch (error) {
      toast.error('Błąd podczas zmiany planu');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Zmień plan</h2>
        <p className="text-gray-600">Przejdź na niższy plan lub anuluj subskrypcję</p>
      </div>

      {/* Current Plan Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-600 text-xl mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Uwaga: Zmiana planu</h3>
            <p className="text-yellow-700 text-sm">
              Przejście na niższy plan może spowodować utratę dostępu do niektórych funkcji. 
              Upewnij się, że chcesz kontynuować.
            </p>
          </div>
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Twój obecny plan</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-purple-100">
            <currentPlanDetails.icon className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{currentPlanDetails.name}</h4>
            <p className="text-gray-600">{currentPlanDetails.price} / {currentPlanDetails.period}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentPlanDetails.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Plans */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Dostępne plany</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePlans.map((plan) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-400 scale-105 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.id === 'premium' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`${
                        plan.id === 'premium' ? 'text-orange-600' : 'text-gray-600'
                      } text-3xl`} />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{plan.name}</h4>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{plan.price}</div>
                  <p className="text-gray-600 text-sm">/{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0 w-4 h-4" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
        >
          Anuluj
        </button>
        <button
          onClick={handleDowngrade}
          disabled={!selectedPlan}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedPlan
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FaChevronRight className="inline mr-2" />
          Przejdź na wybrany plan
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Potwierdź zmianę planu</h3>
              <p className="text-gray-600 mb-6">
                Czy na pewno chcesz przejść z planu <strong>{currentPlanDetails.name}</strong> na plan{' '}
                <strong>{plans.find(p => p.id === selectedPlan)?.name}</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Anuluj
                </button>
                <button
                  onClick={confirmDowngrade}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Potwierdź
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDowngrade; 