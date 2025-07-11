"use client";
import { useState } from 'react';
import { FaCrown, FaStar, FaCheck, FaTimes, FaChevronRight, FaFire, FaUsers, FaChartLine, FaBullhorn, FaGem } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PlanComparison = ({ currentPlan, onPlanSelect }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      icon: FaStar,
      price: '0 zł',
      period: 'miesięcznie',
      color: 'gray',
      features: {
        'Dodawanie pizzerii': true,
        'Podstawowe informacje': true,
        'Do 3 zdjęć': true,
        'Menu (do 10 pozycji)': true,
        'Opinie klientów': true,
        'Promowanie w wynikach': false,
        'Znaczek "Polecane"': false,
        'Nieograniczone zdjęcia': false,
        'Pełne menu z kategoriami': false,
        'Promocje i oferty': false,
        'Statystyki odwiedzin': false,
        'Priorytetowe wsparcie': false,
        'Reklamy bannerowe': false,
        'Pierwszeństwo w wynikach': false,
        'Zaawansowane analytics': false,
        'Newsletter (500/miesiąc)': false,
        'Dedykowany opiekun': false,
        'Rezerwacja stolików': false,
        'Integracja social media': false,
        'Funkcje VIP': false,
        'Własne kampanie': false
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: FaCrown,
      price: billingCycle === 'monthly' ? '999 zł' : '9990 zł',
      period: billingCycle === 'monthly' ? 'miesięcznie' : 'rocznie',
      color: 'orange',
      isPopular: true,
      features: {
        'Dodawanie pizzerii': true,
        'Podstawowe informacje': true,
        'Do 3 zdjęć': true,
        'Menu (do 10 pozycji)': true,
        'Opinie klientów': true,
        'Promowanie w wynikach': true,
        'Znaczek "Polecane"': true,
        'Nieograniczone zdjęcia': true,
        'Pełne menu z kategoriami': true,
        'Promocje i oferty': true,
        'Statystyki odwiedzin': true,
        'Priorytetowe wsparcie': true,
        'Reklamy bannerowe': false,
        'Pierwszeństwo w wynikach': false,
        'Zaawansowane analytics': false,
        'Newsletter (500/miesiąc)': false,
        'Dedykowany opiekun': false,
        'Rezerwacja stolików': false,
        'Integracja social media': false,
        'Funkcje VIP': false,
        'Własne kampanie': false
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: FaGem,
      price: billingCycle === 'monthly' ? '1499 zł' : '14990 zł',
      period: billingCycle === 'monthly' ? 'miesięcznie' : 'rocznie',
      color: 'purple',
      isEnterprise: true,
      features: {
        'Dodawanie pizzerii': true,
        'Podstawowe informacje': true,
        'Do 3 zdjęć': true,
        'Menu (do 10 pozycji)': true,
        'Opinie klientów': true,
        'Promowanie w wynikach': true,
        'Znaczek "Polecane"': true,
        'Nieograniczone zdjęcia': true,
        'Pełne menu z kategoriami': true,
        'Promocje i oferty': true,
        'Statystyki odwiedzin': true,
        'Priorytetowe wsparcie': true,
        'Reklamy bannerowe': true,
        'Pierwszeństwo w wynikach': true,
        'Zaawansowane analytics': true,
        'Newsletter (500/miesiąc)': true,
        'Dedykowany opiekun': true,
        'Rezerwacja stolików': true,
        'Integracja social media': true,
        'Funkcje VIP': true,
        'Własne kampanie': true
      }
    }
  ];

  const featureCategories = [
    {
      title: 'Podstawowe funkcje',
      features: [
        'Dodawanie pizzerii',
        'Podstawowe informacje',
        'Do 3 zdjęć',
        'Menu (do 10 pozycji)',
        'Opinie klientów'
      ]
    },
    {
      title: 'Funkcje Premium',
      features: [
        'Promowanie w wynikach',
        'Znaczek "Polecane"',
        'Nieograniczone zdjęcia',
        'Pełne menu z kategoriami',
        'Promocje i oferty',
        'Statystyki odwiedzin',
        'Priorytetowe wsparcie'
      ]
    },
    {
      title: 'Funkcje Enterprise',
      features: [
        'Reklamy bannerowe',
        'Pierwszeństwo w wynikach',
        'Zaawansowane analytics',
        'Newsletter (500/miesiąc)',
        'Dedykowany opiekun',
        'Rezerwacja stolików',
        'Integracja social media',
        'Funkcje VIP',
        'Własne kampanie'
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      gray: 'text-gray-600 bg-gray-100',
      orange: 'text-orange-600 bg-orange-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color] || colors.gray;
  };

  const getGradientClasses = (color) => {
    const gradients = {
      gray: 'from-gray-500 to-gray-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return gradients[color] || gradients.gray;
  };

  const handlePlanSelect = (planId) => {
    if (planId === currentPlan) {
      toast.info('To jest Twój obecny plan');
      return;
    }
    onPlanSelect && onPlanSelect(planId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Porównanie planów</h2>
        <p className="text-gray-600">Zobacz szczegółowe porównanie wszystkich dostępnych planów</p>
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

      {/* Plans Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-4 gap-0">
          {/* Header Row */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Funkcje</h3>
          </div>
          {plans.map((plan) => (
            <div key={plan.id} className="p-6 bg-gray-50 border-b border-gray-200 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-full ${getColorClasses(plan.color)}`}>
                  <plan.icon className="text-2xl" />
                </div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{plan.name}</h4>
              <div className="text-2xl font-bold text-gray-800 mb-1">{plan.price}</div>
              <p className="text-sm text-gray-600 mb-4">/{plan.period}</p>
              {plan.isPopular && (
                <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium mb-4">
                  NAJPOPULARNIEJSZY
                </span>
              )}
              {plan.isEnterprise && (
                <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium mb-4">
                  PREMIUM ENTERPRISE
                </span>
              )}
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  plan.id === currentPlan
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${getGradientClasses(plan.color)} text-white hover:shadow-lg`
                }`}
                disabled={plan.id === currentPlan}
              >
                {plan.id === currentPlan ? 'Obecny plan' : 'Wybierz plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        {featureCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {/* Category Header */}
            <div className="bg-gray-100 border-b border-gray-200">
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">{category.title}</h4>
              </div>
            </div>

            {/* Features */}
            {category.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-4 gap-0 border-b border-gray-200">
                <div className="p-4 border-r border-gray-200">
                  <span className="text-gray-700">{feature}</span>
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                    {plan.features[feature] ? (
                      <FaCheck className="text-green-500 text-xl mx-auto" />
                    ) : (
                      <FaTimes className="text-gray-300 text-xl mx-auto" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="text-gray-600 text-2xl" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Free Starter</h4>
            <p className="text-gray-600 text-sm">
              Idealny do rozpoczęcia. Dodaj swoją pizzerię i poznaj podstawowe funkcje platformy.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCrown className="text-orange-600 text-2xl" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Premium</h4>
            <p className="text-gray-600 text-sm">
              Najpopularniejszy wybór. Otrzymaj więcej widoczności i zaawansowane narzędzia marketingowe.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGem className="text-purple-600 text-2xl" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Enterprise</h4>
            <p className="text-gray-600 text-sm">
              Dla największych pizzerii. Ekskluzywne funkcje i dedykowane wsparcie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanComparison; 