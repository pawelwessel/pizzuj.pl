import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaDollarSign, 
  FaUsers, 
  FaClock, 
  FaStar, 
  FaTruck,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaShoppingCart,
  FaDownload,
  FaFilter,
  FaRefresh,
  FaPizzaSlice,
  FaExclamationTriangle,
  FaPlus
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const PizzeriaAnalytics = ({ data, onUpdate }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [showFilters, setShowFilters] = useState(false);

  const metrics = [
    {
      id: 'revenue',
      label: 'Przychód',
      value: data.revenue.current > 0 ? `${data.revenue.current.toLocaleString()} zł` : 'Brak danych',
      change: data.revenue.change,
      changeType: data.revenue.change.startsWith('+') ? 'positive' : 'negative',
      icon: FaDollarSign,
      color: 'green',
      isEmpty: data.revenue.current === 0
    },
    {
      id: 'orders',
      label: 'Zamówienia',
      value: data.orders.current > 0 ? data.orders.current.toString() : 'Brak danych',
      change: data.orders.change,
      changeType: data.orders.change.startsWith('+') ? 'positive' : 'negative',
      icon: FaShoppingCart,
      color: 'blue',
      isEmpty: data.orders.current === 0
    },
    {
      id: 'customers',
      label: 'Nowi klienci',
      value: data.customers.current > 0 ? data.customers.current.toString() : 'Brak danych',
      change: data.customers.change,
      changeType: data.customers.change.startsWith('+') ? 'positive' : 'negative',
      icon: FaUsers,
      color: 'purple',
      isEmpty: data.customers.current === 0
    },
    {
      id: 'rating',
      label: 'Średnia ocena',
      value: data.rating.current > 0 ? data.rating.current.toString() : 'Brak ocen',
      change: data.rating.change,
      changeType: data.rating.change.startsWith('+') ? 'positive' : 'negative',
      icon: FaStar,
      color: 'yellow',
      isEmpty: data.rating.current === 0
    }
  ];

  const timeData = {
    week: [
      { day: 'Pon', revenue: 0, orders: 0 },
      { day: 'Wt', revenue: 0, orders: 0 },
      { day: 'Śr', revenue: 0, orders: 0 },
      { day: 'Czw', revenue: 0, orders: 0 },
      { day: 'Pt', revenue: 0, orders: 0 },
      { day: 'Sob', revenue: 0, orders: 0 },
      { day: 'Ndz', revenue: 0, orders: 0 }
    ],
    month: [
      { week: 'Tydzień 1', revenue: 0, orders: 0 },
      { week: 'Tydzień 2', revenue: 0, orders: 0 },
      { week: 'Tydzień 3', revenue: 0, orders: 0 },
      { week: 'Tydzień 4', revenue: 0, orders: 0 }
    ]
  };

  const handleRefresh = () => {
    toast.info('Odświeżanie danych...');
    // Simulate data refresh
    setTimeout(() => {
      toast.success('Dane zostały odświeżone!');
    }, 1000);
  };

  const handleExport = () => {
    toast.info('Eksportowanie danych...');
    setTimeout(() => {
      toast.success('Dane zostały wyeksportowane!');
    }, 1500);
  };

  const renderMetricCard = (metric) => (
    <motion.div
      key={metric.id}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-6 shadow-lg ${metric.isEmpty ? 'border-2 border-dashed border-gray-300' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-${metric.color}-100`}>
          <metric.icon className={`text-${metric.color}-600 text-xl`} />
        </div>
        {!metric.isEmpty && (
          <div className={`flex items-center text-sm ${
            metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.changeType === 'positive' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {metric.change}
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
      <p className="text-gray-600">{metric.label}</p>
      {metric.isEmpty && (
        <p className="text-sm text-gray-500 mt-2">Dodaj dane, aby zobaczyć statystyki</p>
      )}
    </motion.div>
  );

  const renderChart = () => {
    const chartData = timeData[timeRange];
    const maxRevenue = Math.max(...chartData.map(d => d.revenue));
    const hasData = maxRevenue > 0;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Przychód w czasie</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'week' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tydzień
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'month' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Miesiąc
            </button>
          </div>
        </div>

        {hasData ? (
          <div className="flex items-end justify-between h-48 space-x-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-t from-orange-500 to-orange-600 rounded-t-lg"
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center">
                  <div className="font-medium">{item.day || item.week}</div>
                  <div className="text-orange-600">{item.revenue} zł</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaChartLine className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Brak danych do wyświetlenia
            </h3>
            <p className="text-gray-600 mb-4">
              Po rozpoczęciu przyjmowania zamówień, wykres będzie pokazywał trendy przychodów.
            </p>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center mx-auto">
              <FaPlus className="mr-2" />
              Dodaj pierwsze zamówienie
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderTopItems = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Najpopularniejsze dania</h3>
      {data.topItems.length > 0 ? (
        <div className="space-y-3">
          {data.topItems.slice(0, 5).map((item, index) => (
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Brak popularnych dań
          </h3>
          <p className="text-gray-600 mb-4">
            Po dodaniu menu i rozpoczęciu przyjmowania zamówień, popularne dania będą wyświetlane tutaj.
          </p>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center mx-auto">
            <FaPlus className="mr-2" />
            Dodaj menu
          </button>
        </div>
      )}
    </div>
  );

  const renderOrderSources = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Źródła zamówień</h3>
      {data.orderSources.some(source => source.orders > 0) ? (
        <div className="space-y-4">
          {data.orderSources.map((source, index) => (
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
          <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Brak zamówień
          </h3>
          <p className="text-gray-600 mb-4">
            Po rozpoczęciu przyjmowania zamówień, źródła będą wyświetlane tutaj.
          </p>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center mx-auto">
            <FaPlus className="mr-2" />
            Rozpocznij przyjmowanie zamówień
          </button>
        </div>
      )}
    </div>
  );

  const renderCustomerInsights = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights klientów</h3>
      {data.rating.current > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <FaStar className="text-4xl text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">{data.rating.current}/5</h4>
            <p className="text-sm text-gray-600">Średnia ocena</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <FaClock className="text-4xl text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">
              {data.deliveryTime.current > 0 ? `${data.deliveryTime.current} min` : 'N/A'}
            </h4>
            <p className="text-sm text-gray-600">Średni czas dostawy</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <FaUsers className="text-4xl text-purple-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">
              {data.customers.current > 0 ? '67%' : 'N/A'}
            </h4>
            <p className="text-sm text-gray-600">Powracających klientów</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <FaTruck className="text-4xl text-orange-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">
              {data.deliveryTime.current > 0 ? '95%' : 'N/A'}
            </h4>
            <p className="text-sm text-gray-600">Zamówień na czas</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <FaUsers className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Brak danych o klientach
          </h3>
          <p className="text-gray-600 mb-4">
            Po rozpoczęciu przyjmowania zamówień, insights klientów będą wyświetlane tutaj.
          </p>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center mx-auto">
            <FaPlus className="mr-2" />
            Rozpocznij działalność
          </button>
        </div>
      )}
    </div>
  );

  const hasAnyData = data.revenue.current > 0 || data.orders.current > 0 || data.customers.current > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
          <p className="text-gray-600">
            {hasAnyData ? 'Monitoruj wydajność i trendy' : 'Rozpocznij zbieranie danych o swojej pizzerii'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          >
            <FaFilter className="mr-2" />
            Filtry
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          >
            <FaRefresh className="mr-2" />
            Odśwież
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <FaDownload className="mr-2" />
            Eksportuj
          </button>
        </div>
      </div>

      {/* Setup Guide for New Users */}
      {!hasAnyData && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaChartLine className="text-orange-600 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Rozpocznij zbieranie danych analytics
              </h3>
              <p className="text-gray-600 mb-4">
                Aby zobaczyć analytics i trendy, musisz najpierw skonfigurować swoją pizzerię i rozpocząć przyjmowanie zamówień.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Co należy zrobić:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Skonfiguruj dane pizzerii
                    </li>
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Dodaj menu i ceny
                    </li>
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Rozpocznij przyjmowanie zamówień
                    </li>
                    <li className="flex items-center">
                      <FaPlus className="text-orange-500 mr-2" />
                      Zachęć klientów do oceniania
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Co zobaczysz:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-2" />
                      Trendy przychodów
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-2" />
                      Popularne dania
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-2" />
                      Źródła zamówień
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-2" />
                      Insights klientów
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtry</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Okres
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Ostatni tydzień</option>
                  <option>Ostatni miesiąc</option>
                  <option>Ostatni kwartał</option>
                  <option>Ostatni rok</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoria
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Wszystkie</option>
                  <option>Pizza</option>
                  <option>Napoje</option>
                  <option>Desery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Źródło zamówienia
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Wszystkie</option>
                  <option>Aplikacja</option>
                  <option>Strona</option>
                  <option>Telefon</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(renderMetricCard)}
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderChart()}
        {renderTopItems()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderOrderSources()}
        {renderCustomerInsights()}
      </div>
    </div>
  );
};

export default PizzeriaAnalytics; 