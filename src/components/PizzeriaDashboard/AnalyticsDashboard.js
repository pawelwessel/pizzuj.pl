import React, { useState, useEffect } from 'react';
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
  FaPhone,
  FaGlobe,
  FaDownload,
  FaChartArea,
  FaTimes,
  FaFilePdf,
  FaFileExcel,
  FaFileCsv,
  FaCheck,
  FaEdit
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AnalyticsDashboard = ({ pizzeriaId }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [goals, setGoals] = useState({
    revenue: 15000,
    orders: 200,
    customers: 30,
    rating: 4.8
  });

  const metrics = [
    {
      id: 'revenue',
      label: 'Przychód',
      value: '12,450 zł',
      change: '+15.3%',
      changeType: 'positive',
      icon: FaDollarSign,
      color: 'green'
    },
    {
      id: 'orders',
      label: 'Zamówienia',
      value: '156',
      change: '+8.7%',
      changeType: 'positive',
      icon: FaShoppingCart,
      color: 'blue'
    },
    {
      id: 'customers',
      label: 'Nowi klienci',
      value: '23',
      change: '+12.1%',
      changeType: 'positive',
      icon: FaUsers,
      color: 'purple'
    },
    {
      id: 'avgOrder',
      label: 'Średnie zamówienie',
      value: '79.8 zł',
      change: '+5.2%',
      changeType: 'positive',
      icon: FaChartBar,
      color: 'orange'
    }
  ];

  const topItems = [
    { name: 'Margherita', orders: 45, revenue: 1125, growth: '+12%' },
    { name: 'Pepperoni', orders: 38, revenue: 1064, growth: '+8%' },
    { name: 'Hawaii', orders: 32, revenue: 896, growth: '+15%' },
    { name: 'Quattro Stagioni', orders: 28, revenue: 784, growth: '+5%' },
    { name: 'Diavola', orders: 25, revenue: 700, growth: '+18%' }
  ];

  const orderSources = [
    { source: 'Aplikacja mobilna', orders: 45, percentage: 45 },
    { source: 'Strona internetowa', orders: 35, percentage: 35 },
    { source: 'Telefon', orders: 15, percentage: 15 },
    { source: 'Inne', orders: 5, percentage: 5 }
  ];

  const timeData = {
    week: [
      { day: 'Pon', revenue: 1200, orders: 15 },
      { day: 'Wt', revenue: 1350, orders: 18 },
      { day: 'Śr', revenue: 1100, orders: 14 },
      { day: 'Czw', revenue: 1600, orders: 22 },
      { day: 'Pt', revenue: 1800, orders: 25 },
      { day: 'Sob', revenue: 2100, orders: 30 },
      { day: 'Ndz', revenue: 1900, orders: 27 }
    ],
    month: [
      { week: 'Tydzień 1', revenue: 8500, orders: 120 },
      { week: 'Tydzień 2', revenue: 9200, orders: 135 },
      { week: 'Tydzień 3', revenue: 8800, orders: 125 },
      { week: 'Tydzień 4', revenue: 9500, orders: 140 }
    ]
  };

  const handleExportReport = () => {
    setShowExportModal(true);
  };

  const handleSetGoals = () => {
    setShowGoalsModal(true);
  };

  const handleDetailedAnalytics = () => {
    setShowDetailedAnalytics(true);
  };

  const executeExport = (format) => {
    // Simulate export process
    toast.info(`Eksportowanie raportu w formacie ${format.toUpperCase()}...`);
    
    setTimeout(() => {
      toast.success(`Raport został wyeksportowany w formacie ${format.toUpperCase()}!`);
      setShowExportModal(false);
    }, 2000);
  };

  const saveGoals = () => {
    toast.success('Cele zostały zapisane!');
    setShowGoalsModal(false);
  };

  const renderMetricCard = (metric) => (
    <motion.div
      key={metric.id}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-${metric.color}-100`}>
          <metric.icon className={`text-${metric.color}-600 text-xl`} />
        </div>
        <div className={`flex items-center text-sm ${
          metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {metric.changeType === 'positive' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          {metric.change}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
      <p className="text-gray-600">{metric.label}</p>
    </motion.div>
  );

  const renderChart = () => {
    const data = timeData[timeRange];
    const maxRevenue = Math.max(...data.map(d => d.revenue));
    
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

        <div className="flex items-end justify-between h-48 space-x-2">
          {data.map((item, index) => (
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
      </div>
    );
  };

  const renderTopItems = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Najpopularniejsze dania</h3>
      <div className="space-y-3">
        {topItems.map((item, index) => (
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
    </div>
  );

  const renderOrderSources = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Źródła zamówień</h3>
      <div className="space-y-4">
        {orderSources.map((source, index) => (
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
    </div>
  );

  const renderCustomerInsights = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights klientów</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <FaStar className="text-4xl text-blue-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-800">4.8/5</h4>
          <p className="text-sm text-gray-600">Średnia ocena</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <FaClock className="text-4xl text-green-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-800">28 min</h4>
          <p className="text-sm text-gray-600">Średni czas dostawy</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <FaUsers className="text-4xl text-purple-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-800">67%</h4>
          <p className="text-sm text-gray-600">Powracających klientów</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <FaTruck className="text-4xl text-orange-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-800">95%</h4>
          <p className="text-sm text-gray-600">Zamówień na czas</p>
        </div>
      </div>
    </div>
  );

  const renderExportModal = () => (
    <AnimatePresence>
      {showExportModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Eksportuj raport</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format eksportu
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setExportFormat('pdf')}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                      exportFormat === 'pdf' 
                        ? 'border-orange-500 bg-orange-50 text-orange-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaFilePdf className="text-2xl mb-2" />
                    <span className="text-sm font-medium">PDF</span>
                  </button>
                  <button
                    onClick={() => setExportFormat('excel')}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                      exportFormat === 'excel' 
                        ? 'border-orange-500 bg-orange-50 text-orange-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaFileExcel className="text-2xl mb-2" />
                    <span className="text-sm font-medium">Excel</span>
                  </button>
                  <button
                    onClick={() => setExportFormat('csv')}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                      exportFormat === 'csv' 
                        ? 'border-orange-500 bg-orange-50 text-orange-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaFileCsv className="text-2xl mb-2" />
                    <span className="text-sm font-medium">CSV</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Włącz wykresy i grafiki</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Dodaj podsumowanie</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Eksportuj dane surowe</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={() => executeExport(exportFormat)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
              >
                <FaDownload className="mr-2" />
                Eksportuj
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderGoalsModal = () => (
    <AnimatePresence>
      {showGoalsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Ustaw cele</h3>
              <button
                onClick={() => setShowGoalsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cel przychodu (zł)
                </label>
                <input
                  type="number"
                  value={goals.revenue}
                  onChange={(e) => setGoals({...goals, revenue: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cel zamówień
                </label>
                <input
                  type="number"
                  value={goals.orders}
                  onChange={(e) => setGoals({...goals, orders: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cel nowych klientów
                </label>
                <input
                  type="number"
                  value={goals.customers}
                  onChange={(e) => setGoals({...goals, customers: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cel oceny
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={goals.rating}
                  onChange={(e) => setGoals({...goals, rating: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowGoalsModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={saveGoals}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
              >
                <FaCheck className="mr-2" />
                Zapisz cele
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderDetailedAnalytics = () => (
    <AnimatePresence>
      {showDetailedAnalytics && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Szczegółowe analizy</h3>
              <button
                onClick={() => setShowDetailedAnalytics(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Demographics */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Demografia klientów</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wiek 18-25</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wiek 26-35</span>
                    <span className="font-semibold">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wiek 36-45</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wiek 45+</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </div>

              {/* Peak Hours */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Godziny szczytu</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">12:00 - 14:00</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">18:00 - 20:00</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">20:00 - 22:00</span>
                    <span className="font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Inne godziny</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </div>

              {/* Delivery Performance */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Wydajność dostawy</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Średni czas dostawy</span>
                    <span className="font-semibold">28 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Najszybsza dostawa</span>
                    <span className="font-semibold">15 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Najwolniejsza dostawa</span>
                    <span className="font-semibold">45 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Dostawy na czas</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Satysfakcja klientów</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ocena 5 gwiazdek</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ocena 4 gwiazdki</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ocena 3 gwiazdki</span>
                    <span className="font-semibold">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ocena 1-2 gwiazdki</span>
                    <span className="font-semibold">2%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitoruj wydajność i trendy swojej pizzerii</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={activeMetric}
            onChange={(e) => setActiveMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="revenue">Przychód</option>
            <option value="orders">Zamówienia</option>
            <option value="customers">Klienci</option>
            <option value="avgOrder">Średnie zamówienie</option>
          </select>
        </div>
      </div>

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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Szybkie akcje</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={handleExportReport}
            className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaDownload className="text-blue-500 mr-3" />
            <span className="text-gray-700">Eksportuj raport</span>
          </button>
          <button 
            onClick={handleSetGoals}
            className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FaClock className="text-green-500 mr-3" />
            <span className="text-gray-700">Ustaw cele</span>
          </button>
          <button 
            onClick={handleDetailedAnalytics}
            className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FaChartArea className="text-purple-500 mr-3" />
            <span className="text-gray-700">Szczegółowe analizy</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {renderExportModal()}
      {renderGoalsModal()}
      {renderDetailedAnalytics()}
    </div>
  );
};

export default AnalyticsDashboard; 