"use client";
import { useState, useEffect } from 'react';
import { FaDownload, FaEye, FaReceipt, FaCreditCard, FaCalendarAlt, FaEuroSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BillingHistory = ({ userData }) => {
  const [billingHistory, setBillingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate fetching billing history
    const mockBillingHistory = [
      {
        id: 'inv_1',
        date: '2024-01-15',
        amount: 999,
        currency: 'PLN',
        status: 'paid',
        description: 'Premium Plan - Styczeń 2024',
        invoiceNumber: 'INV-2024-001',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: 'inv_2',
        date: '2024-01-01',
        amount: 999,
        currency: 'PLN',
        status: 'paid',
        description: 'Premium Plan - Grudzień 2023',
        invoiceNumber: 'INV-2023-012',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: 'inv_3',
        date: '2023-12-01',
        amount: 999,
        currency: 'PLN',
        status: 'paid',
        description: 'Premium Plan - Listopad 2023',
        invoiceNumber: 'INV-2023-011',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: 'inv_4',
        date: '2023-11-01',
        amount: 999,
        currency: 'PLN',
        status: 'paid',
        description: 'Premium Plan - Październik 2023',
        invoiceNumber: 'INV-2023-010',
        paymentMethod: 'Visa •••• 4242'
      }
    ];
    setBillingHistory(mockBillingHistory);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      paid: 'Opłacone',
      pending: 'Oczekujące',
      failed: 'Nieudane',
      refunded: 'Zwrócone'
    };
    return texts[status] || status;
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Here you would integrate with Stripe to download invoice
    toast.info('Pobieranie faktury...');
  };

  const handleViewInvoice = (invoiceId) => {
    // Here you would integrate with Stripe to view invoice
    toast.info('Otwieranie faktury...');
  };

  const filteredHistory = billingHistory.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Historia rozliczeń</h2>
        <p className="text-gray-600">Przeglądaj wszystkie faktury i transakcje</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FaReceipt className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Łączna suma</p>
              <p className="text-2xl font-bold text-gray-800">
                {billingHistory.reduce((sum, item) => sum + item.amount, 0)} PLN
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaCreditCard className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Liczba faktur</p>
              <p className="text-2xl font-bold text-gray-800">{billingHistory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaCalendarAlt className="text-orange-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Ostatnia płatność</p>
              <p className="text-2xl font-bold text-gray-800">
                {billingHistory[0]?.date ? new Date(billingHistory[0].date).toLocaleDateString('pl-PL') : 'Brak'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Faktury</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Wszystkie
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'paid'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Opłacone
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Oczekujące
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <FaReceipt className="text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{invoice.description}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      {new Date(invoice.date).toLocaleDateString('pl-PL')}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCreditCard className="text-xs" />
                      {invoice.paymentMethod}
                    </span>
                    <span>#{invoice.invoiceNumber}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {invoice.amount} {invoice.currency}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewInvoice(invoice.id)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Zobacz fakturę"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                    title="Pobierz fakturę"
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <FaReceipt className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">Brak faktur do wyświetlenia</p>
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Eksport danych</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
            <FaDownload className="text-sm" />
            Eksportuj do CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300">
            <FaReceipt className="text-sm" />
            Eksportuj faktury
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory; 