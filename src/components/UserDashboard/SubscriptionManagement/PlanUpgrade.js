"use client";
import { useState } from 'react';
import { FaCrown, FaGem, FaStar, FaCheck, FaChevronRight, FaFire, FaUsers, FaChartLine, FaBullhorn } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PlanUpgrade = ({ currentPlan, onUpgrade, onCancel }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'premium',
      name: 'Premium',
      icon: FaCrown,
      price: billingCycle === 'monthly' ? '999 zł' : '9990 zł',
      period: billingCycle === 'monthly' ? 'miesięcznie' : 'rocznie',
      isPopular: true,
      features: [
        { text: 'Wszystko z planu Starter +', icon: FaCheck },
        { text: 'Promowanie w wynikach wyszukiwania', icon: FaCheck },
        { text: 'Znaczek "Polecane" przy pizzerii', icon: FaFire, iconColor: 'text-red-500' },
        { text: 'Nieograniczone zdjęcia', icon: FaCheck },
        { text: 'Pełne menu z kategoriami i opisami', icon: FaCheck },
        { text: 'Promocje i oferty specjalne', icon: FaCheck },
        { text: 'Statystyki odwiedzin i zainteresowania', icon: FaUsers, iconColor: 'text-blue-500' },
        { text: 'Priorytetowe wsparcie klienta', icon: FaGem, iconColor: 'text-purple-500' }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: FaGem,
      price: billingCycle === 'monthly' ? '1499 zł' : '14990 zł',
      period: billingCycle === 'monthly' ? 'miesięcznie' : 'rocznie',
      isEnterprise: true,
      features: [
        { text: 'Wszystko z planu Premium +', icon: FaCheck },
        { text: 'Reklamy bannerowe na stronie głównej', icon: FaBullhorn, iconColor: 'text-orange-500' },
        { text: 'Pierwszeństwo w wynikach wyszukiwania', icon: FaStar, iconColor: 'text-yellow-500' },
        { text: 'Zaawansowane analytics i raporty', icon: FaChartLine, iconColor: 'text-green-600' },
        { text: 'Newsletter do klientów (500/miesiąc)', icon: FaCheck },
        { text: 'Dedykowany opiekun klienta', icon: FaCheck },
        { text: 'Możliwość rezerwacji stolików online', icon: FaCheck },
        { text: 'Integracja z mediami społecznościowymi', icon: FaCheck },
        { text: 'Ekskluzywne funkcje VIP', icon: FaGem, iconColor: 'text-pink-500' },
        { text: 'Własne kampanie marketingowe', icon: FaCheck }
      ]
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      toast.error('Wybierz plan do aktualizacji');
      return;
    }

    try {
      // Here you would integrate with Stripe
      toast.info('Przekierowywanie do płatności...');
      onUpgrade && onUpgrade(selectedPlan, billingCycle);
    } catch (error) {
      toast.error('Błąd podczas aktualizacji planu');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Wybierz plan</h2>
        <p className="text-gray-600">Przejdź na wyższy plan, aby odblokować więcej funkcji</p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Miesięcznie
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Rocznie (2 miesiące gratis!)
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`group relative flex flex-col p-8 rounded-3xl border transition-all duration-700 transform hover:-translate-y-2 cursor-pointer ${
                isSelected
                  ? plan.isPopular
                    ? 'bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-400 scale-105 shadow-golden-lg'
                    : plan.isEnterprise
                    ? 'bg-gradient-to-br from-white via-purple-50 to-purple-100 border-purple-400 scale-105 shadow-purple-lg'
                    : 'bg-gradient-to-br from-white via-blue-50 to-blue-100 border-blue-400 scale-105 shadow-lg'
                  : 'bg-white/90 backdrop-blur-sm border-gray-200/50 hover:border-primary-300 hover:shadow-large'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    <FaStar className="mr-2" />
                    NAJPOPULARNIEJSZY
                  </div>
                </div>
              )}

              {/* Enterprise Badge */}
              {plan.isEnterprise && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    <FaGem className="mr-2" />
                    PREMIUM ENTERPRISE
                  </div>
                </div>
              )}

              <div className={`text-center mb-8 ${plan.isPopular || plan.isEnterprise ? 'mt-6' : ''}`}>
                <div className="relative inline-block mb-6">
                  <div className={`p-4 rounded-full ${
                    plan.isPopular
                      ? 'bg-gradient-to-br from-orange-100 to-orange-200'
                      : plan.isEnterprise
                      ? 'bg-gradient-to-br from-purple-100 to-purple-200'
                      : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`${
                      plan.isPopular
                        ? 'text-orange-600'
                        : plan.isEnterprise
                        ? 'text-purple-600'
                        : 'text-gray-600'
                    } text-5xl transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="relative">
                  <div className={`text-5xl font-bold mb-2 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent'
                      : plan.isEnterprise
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent'
                      : 'text-gray-800'
                  }`}>
                    {plan.price}
                  </div>
                  <p className="text-gray-600">{plan.period}</p>
                </div>
              </div>

              <ul className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <li key={index} className="flex items-start">
                      <div className="min-w-6 h-6 mt-1">
                        <FeatureIcon className={`${feature.iconColor || 'text-green-500'} w-5 h-5`} />
                      </div>
                      <span className="ml-4 text-gray-700">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    plan.isPopular
                      ? 'bg-orange-500'
                      : plan.isEnterprise
                      ? 'bg-purple-500'
                      : 'bg-blue-500'
                  }`}>
                    <FaCheck className="text-white text-sm" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
          onClick={handleUpgrade}
          disabled={!selectedPlan}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedPlan
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FaChevronRight className="inline mr-2" />
          Przejdź na wybrany plan
        </button>
      </div>
    </div>
  );
};

export default PlanUpgrade; 