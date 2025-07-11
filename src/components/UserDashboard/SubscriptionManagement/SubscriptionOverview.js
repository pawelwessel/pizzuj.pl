"use client";
import { useState, useEffect } from 'react';
import { FaCrown, FaGem, FaStar, FaCheck, FaTimes, FaEdit, FaCreditCard } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SubscriptionOverview = ({ userData, onPlanChange }) => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [subscriptionStatus, setSubscriptionStatus] = useState('active');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [nextBillingDate, setNextBillingDate] = useState(null);

  useEffect(() => {
    // Simulate fetching subscription data
    if (userData?.subscription) {
      setCurrentPlan(userData.subscription.plan || 'free');
      setSubscriptionStatus(userData.subscription.status || 'active');
      setBillingCycle(userData.subscription.billingCycle || 'monthly');
      setNextBillingDate(userData.subscription.nextBillingDate);
    }
  }, [userData]);

  const getPlanDetails = (plan) => {
    const plans = {
      free: {
        name: 'Free Starter',
        price: '0 zł',
        icon: FaStar,
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        features: [
          'Dodaj swoją pizzerię do bazy',
          'Podstawowe informacje o lokalu',
          'Do 3 zdjęć pizzerii',
          'Podstawowe menu (do 10 pozycji)',
          'Opinie i oceny klientów'
        ]
      },
      premium: {
        name: 'Premium',
        price: '999 zł',
        icon: FaCrown,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
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
      },
      enterprise: {
        name: 'Enterprise',
        price: '1499 zł',
        icon: FaGem,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
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
      }
    };
    return plans[plan] || plans.free;
  };

  const planDetails = getPlanDetails(currentPlan);
  const IconComponent = planDetails.icon;

  const handleUpgrade = () => {
    onPlanChange && onPlanChange('upgrade');
  };

  const handleDowngrade = () => {
    onPlanChange && onPlanChange('downgrade');
  };

  const handleManageBilling = () => {
    // Integrate with Stripe billing portal
    toast.info('Przekierowywanie do panelu płatności...');
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${planDetails.bgColor}`}>
              <IconComponent className={`${planDetails.color} text-2xl`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{planDetails.name}</h2>
              <p className="text-gray-600">
                {subscriptionStatus === 'active' ? 'Aktywny plan' : 'Plan nieaktywny'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">{planDetails.price}</div>
            <div className="text-sm text-gray-500">/{billingCycle === 'monthly' ? 'miesiąc' : 'rok'}</div>
          </div>
        </div>

        {/* Plan Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              subscriptionStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">
              Status: {subscriptionStatus === 'active' ? 'Aktywny' : 'Nieaktywny'}
            </span>
          </div>
          {nextBillingDate && (
            <span className="text-sm text-gray-600">
              Następna płatność: {new Date(nextBillingDate).toLocaleDateString('pl-PL')}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {currentPlan === 'free' && (
            <button
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              <FaCrown className="inline mr-2" />
              Przejdź na Premium
            </button>
          )}
          {currentPlan === 'premium' && (
            <>
              <button
                onClick={handleUpgrade}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
              >
                <FaGem className="inline mr-2" />
                Przejdź na Enterprise
              </button>
              <button
                onClick={handleDowngrade}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Zmień plan
              </button>
            </>
          )}
          {currentPlan === 'enterprise' && (
            <button
              onClick={handleDowngrade}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Zmień plan
            </button>
          )}
          <button
            onClick={handleManageBilling}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
          >
            <FaCreditCard />
            Zarządzaj płatnościami
          </button>
        </div>
      </div>

      {/* Current Plan Features */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Funkcje Twojego planu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planDetails.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOverview; 