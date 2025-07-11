import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaStar, 
  FaUsers, 
  FaDollarSign,
  FaChartLine,
  FaEdit,
  FaEye,
  FaCalendarAlt,
  FaTruck,
  FaBullhorn,
  FaCog,
  FaPlus,
  FaPizzaSlice,
  FaExclamationTriangle
} from 'react-icons/fa';

const PizzeriaOverview = ({ pizzeria, analytics, onUpdate }) => {
  const [quickActions] = useState([
    {
      id: 'edit',
      label: 'Edytuj dane',
      icon: FaEdit,
      color: 'blue',
      action: () => onUpdate({ action: 'edit' })
    },
    {
      id: 'analytics',
      label: 'Zobacz analytics',
      icon: FaChartLine,
      color: 'green',
      action: () => onUpdate({ action: 'analytics' })
    },
    {
      id: 'promotions',
      label: 'Zarządzaj promocjami',
      icon: FaBullhorn,
      color: 'purple',
      action: () => onUpdate({ action: 'promotions' })
    },
    {
      id: 'settings',
      label: 'Ustawienia',
      icon: FaCog,
      color: 'gray',
      action: () => onUpdate({ action: 'settings' })
    }
  ]);

  const renderMetricCard = (title, value, change, icon, color, isEmpty = false) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-6 shadow-lg ${isEmpty ? 'border-2 border-dashed border-gray-300' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <icon className={`text-${color}-600 text-xl`} />
        </div>
        {!isEmpty && (
          <div className={`flex items-center text-sm ${
            change.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {change.startsWith('+') ? <FaChartLine className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
            {change}
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-1">
        {isEmpty ? 'Brak danych' : value}
      </h3>
      <p className="text-gray-600">{title}</p>
      {isEmpty && (
        <p className="text-sm text-gray-500 mt-2">Dodaj dane, aby zobaczyć statystyki</p>
      )}
    </motion.div>
  );

  const renderQuickAction = (action) => (
    <motion.button
      key={action.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={action.action}
      className={`flex flex-col items-center p-4 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors`}
    >
      <action.icon className={`text-${action.color}-600 text-2xl mb-2`} />
      <span className="text-sm font-medium text-gray-700">{action.label}</span>
    </motion.button>
  );

  const hasData = analytics.orders.current > 0 || analytics.revenue.current > 0;

  return (
    <div className="space-y-6">
      {/* Pizzeria Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {pizzeria.name || 'Moja Pizzeria'}
            </h2>
            <p className="text-gray-600 mb-4">
              {pizzeria.description || 'Opisz swoją pizzerię, aby przyciągnąć klientów...'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" />
                <span className="text-gray-700">
                  {pizzeria.phone || 'Dodaj numer telefonu'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-700">
                  {pizzeria.address ? `${pizzeria.address}, ${pizzeria.city}` : 'Dodaj adres pizzerii'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-gray-400" />
                <span className="text-gray-700">
                  {pizzeria.hours ? 'Godziny otwarcia skonfigurowane' : 'Skonfiguruj godziny otwarcia'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaStar className="text-gray-400" />
                <span className="text-gray-700">
                  {analytics.rating.current > 0 ? `${analytics.rating.current}/5` : 'Brak ocen'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <FaEdit />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <FaEye />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderMetricCard(
          'Przychód',
          `${analytics.revenue.current.toLocaleString()} zł`,
          analytics.revenue.change,
          FaDollarSign,
          'green',
          analytics.revenue.current === 0
        )}
        {renderMetricCard(
          'Zamówienia',
          analytics.orders.current.toString(),
          analytics.orders.change,
          FaUsers,
          'blue',
          analytics.orders.current === 0
        )}
        {renderMetricCard(
          'Nowi klienci',
          analytics.customers.current.toString(),
          analytics.customers.change,
          FaUsers,
          'purple',
          analytics.customers.current === 0
        )}
        {renderMetricCard(
          'Średnia ocena',
          analytics.rating.current > 0 ? analytics.rating.current.toString() : 'Brak',
          analytics.rating.change,
          FaStar,
          'yellow',
          analytics.rating.current === 0
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Szybkie akcje</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(renderQuickAction)}
        </div>
      </div>

      {/* Setup Guide */}
      {!hasData && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaPizzaSlice className="text-orange-600 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Rozpocznij zarządzanie swoją pizzerią
              </h3>
              <p className="text-gray-600 mb-4">
                Aby w pełni wykorzystać możliwości systemu, skonfiguruj podstawowe informacje o swojej pizzerii.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Co należy skonfigurować:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      Dane kontaktowe i adres
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      Godziny otwarcia
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      Ustawienia dostawy
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      Menu i ceny
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Następne kroki:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Dodaj pierwsze promocje
                    </li>
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Skonfiguruj powiadomienia
                    </li>
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Dodaj zdjęcia pizzerii
                    </li>
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Ustaw metody płatności
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ostatnie zamówienia</h3>
            {analytics.topItems.length > 0 ? (
              <div className="space-y-3">
                {analytics.topItems.slice(0, 3).map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.orders} zamówień</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{item.revenue} zł</p>
                      <p className="text-sm text-green-600">{item.growth}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaPizzaSlice className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Brak zamówień</p>
                <p className="text-sm text-gray-500">Dodaj menu, aby rozpocząć przyjmowanie zamówień</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Źródła zamówień</h3>
            {analytics.orderSources.some(source => source.orders > 0) ? (
              <div className="space-y-4">
                {analytics.orderSources.map((source, index) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{source.source}</span>
                      </div>
                      <span className="text-gray-600">{source.orders} zamówień</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${source.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaTruck className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Brak zamówień</p>
                <p className="text-sm text-gray-500">Zamówienia będą wyświetlane tutaj</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Status dostawy</h3>
            <FaTruck className="text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Średni czas</span>
              <span className="font-semibold">
                {analytics.deliveryTime.current > 0 ? `${analytics.deliveryTime.current} min` : 'Nie skonfigurowano'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Na czas</span>
              <span className="font-semibold text-green-600">
                {analytics.deliveryTime.current > 0 ? '95%' : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Aktywne promocje</h3>
            <FaBullhorn className="text-purple-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Aktywne</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Zaplanowane</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Godziny pracy</h3>
            <FaClock className="text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Dzisiaj</span>
              <span className="font-semibold text-green-600">
                {pizzeria.hours ? 'Otwarte' : 'Nie skonfigurowano'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Godziny</span>
              <span className="font-semibold">
                {pizzeria.hours ? '10:00-22:00' : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzeriaOverview; 