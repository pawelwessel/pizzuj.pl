"use client";
import { useState, useEffect } from 'react';
import { FaCreditCard, FaPlus, FaEdit, FaTrash, FaLock, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PaymentIntegration = ({ userData, onPaymentMethodUpdate }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    // Simulate fetching payment methods
    const mockPaymentMethods = [
      {
        id: 'pm_1',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2025,
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'card',
        brand: 'mastercard',
        last4: '5555',
        expMonth: 8,
        expYear: 2026,
        isDefault: false
      }
    ];
    setPaymentMethods(mockPaymentMethods);
  }, []);

  const getCardIcon = (brand) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    };
    return icons[brand] || '💳';
  };

  const getCardBrandName = (brand) => {
    const brands = {
      visa: 'Visa',
      mastercard: 'Mastercard',
      amex: 'American Express',
      discover: 'Discover'
    };
    return brands[brand] || brand;
  };

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    try {
      // Here you would integrate with Stripe to add a payment method
      toast.info('Przekierowywanie do dodawania karty...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Karta została dodana pomyślnie!');
      setShowAddCard(false);
    } catch (error) {
      toast.error('Błąd podczas dodawania karty');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (paymentMethodId) => {
    try {
      // Here you would integrate with Stripe to set default payment method
      setPaymentMethods(prev => 
        prev.map(pm => ({
          ...pm,
          isDefault: pm.id === paymentMethodId
        }))
      );
      toast.success('Domyślna metoda płatności została zaktualizowana');
    } catch (error) {
      toast.error('Błąd podczas aktualizacji domyślnej metody płatności');
    }
  };

  const handleRemovePaymentMethod = async (paymentMethodId) => {
    try {
      // Here you would integrate with Stripe to remove payment method
      setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
      toast.success('Metoda płatności została usunięta');
    } catch (error) {
      toast.error('Błąd podczas usuwania metody płatności');
    }
  };

  const handleManageBilling = () => {
    // Redirect to Stripe billing portal
    toast.info('Przekierowywanie do panelu płatności...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Zarządzanie płatnościami</h2>
        <p className="text-gray-600">Zarządzaj metodami płatności i historią rozliczeń</p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <FaShieldAlt className="text-blue-600 text-xl mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Bezpieczne płatności</h3>
            <p className="text-blue-700 text-sm">
              Wszystkie płatności są przetwarzane przez Stripe, światowego lidera w bezpiecznych płatnościach online. 
              Twoje dane karty są szyfrowane i nigdy nie są przechowywane na naszych serwerach.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Metody płatności</h3>
          <button
            onClick={() => setShowAddCard(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            <FaPlus className="text-sm" />
            Dodaj kartę
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{getCardIcon(method.brand)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {getCardBrandName(method.brand)} •••• {method.last4}
                    </span>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Domyślna
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Wygasa {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-all duration-300"
                  >
                    Ustaw jako domyślną
                  </button>
                )}
                <button
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Usuń kartę"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {paymentMethods.length === 0 && (
            <div className="text-center py-8">
              <FaCreditCard className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">Nie dodano jeszcze żadnej metody płatności</p>
            </div>
          )}
        </div>
      </div>

      {/* Billing Portal */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Panel rozliczeń</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaCreditCard className="text-gray-600" />
              <div>
                <h4 className="font-semibold text-gray-800">Historia płatności</h4>
                <p className="text-gray-600 text-sm">Zobacz wszystkie transakcje i faktury</p>
              </div>
            </div>
            <button
              onClick={handleManageBilling}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              Otwórz panel
            </button>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCreditCard className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Dodaj kartę</h3>
              <p className="text-gray-600 mb-6">
                Przekierujemy Cię do bezpiecznego formularza Stripe, aby dodać nową kartę płatniczą.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleAddPaymentMethod}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  {isLoading ? 'Przetwarzanie...' : 'Dodaj kartę'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentIntegration; 