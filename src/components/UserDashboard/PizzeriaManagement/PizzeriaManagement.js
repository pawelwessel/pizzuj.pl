import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStore, 
  FaEdit, 
  FaChartLine, 
  FaBullhorn, 
  FaCog, 
  FaPlus,
  FaTimes,
  FaSave,
  FaTrash,
  FaEye,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
  FaChartBar,
  FaChartPie,
  FaTruck,
  FaCheck,
  FaExclamationTriangle,
  FaPizzaSlice
} from 'react-icons/fa';
import { toast } from 'react-toastify';

// Import sub-components
import PizzeriaOverview from './PizzeriaOverview';
import PizzeriaEdit from './PizzeriaEdit';
import PizzeriaAnalytics from './PizzeriaAnalytics';
import PizzeriaPromotions from './PizzeriaPromotions';
import PizzeriaSettings from './PizzeriaSettings';

const PizzeriaManagement = ({ pizzeria, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [pizzeriaData, setPizzeriaData] = useState(pizzeria || {});
  const [hasChanges, setHasChanges] = useState(false);

  // Real data based on user's pizzeria configuration
  const [analyticsData, setAnalyticsData] = useState({
    revenue: { current: 0, previous: 0, change: '0%' },
    orders: { current: 0, previous: 0, change: '0%' },
    customers: { current: 0, previous: 0, change: '0%' },
    rating: { current: 0, previous: 0, change: '0' },
    deliveryTime: { current: 0, previous: 0, change: '0 min' },
    topItems: [],
    orderSources: [
      { source: 'Aplikacja mobilna', orders: 0, percentage: 0 },
      { source: 'Strona internetowa', orders: 0, percentage: 0 },
      { source: 'Telefon', orders: 0, percentage: 0 },
      { source: 'Inne', orders: 0, percentage: 0 }
    ]
  });

  const [promotionsData, setPromotionsData] = useState({
    active: [],
    scheduled: []
  });

  const [settingsData, setSettingsData] = useState({
    business: {
      name: pizzeria?.name || 'Moja Pizzeria',
      description: pizzeria?.description || 'Opisz swoją pizzerię...',
      phone: pizzeria?.phone || '',
      email: pizzeria?.email || '',
      address: pizzeria?.address || '',
      city: pizzeria?.city || '',
      postalCode: pizzeria?.postalCode || '',
      website: pizzeria?.website || ''
    },
    hours: {
      monday: { open: '10:00', close: '22:00', closed: false },
      tuesday: { open: '10:00', close: '22:00', closed: false },
      wednesday: { open: '10:00', close: '22:00', closed: false },
      thursday: { open: '10:00', close: '22:00', closed: false },
      friday: { open: '10:00', close: '23:00', closed: false },
      saturday: { open: '11:00', close: '23:00', closed: false },
      sunday: { open: '12:00', close: '21:00', closed: false }
    },
    delivery: {
      enabled: true,
      radius: 5,
      minOrder: 25,
      deliveryFee: 5,
      freeDeliveryThreshold: 50,
      preparationTime: {
        min: 20,
        max: 30
      }
    },
    notifications: {
      newOrders: true,
      orderUpdates: true,
      customerReviews: true,
      lowInventory: true,
      dailyReports: true
    }
  });

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: FaStore },
    { id: 'edit', label: 'Edycja', icon: FaEdit },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
    { id: 'promotions', label: 'Promocje', icon: FaBullhorn },
    { id: 'settings', label: 'Ustawienia', icon: FaCog }
  ];

  useEffect(() => {
    // Load real data based on pizzeria configuration
    if (pizzeria) {
      loadPizzeriaData();
    }
  }, [pizzeria]);

  const loadPizzeriaData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading real data based on pizzeria configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update analytics based on real pizzeria data
      if (pizzeria.orders) {
        setAnalyticsData(prev => ({
          ...prev,
          orders: { 
            current: pizzeria.orders.length || 0, 
            previous: 0, 
            change: pizzeria.orders.length > 0 ? '+100%' : '0%' 
          },
          revenue: { 
            current: pizzeria.orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0, 
            previous: 0, 
            change: pizzeria.orders?.length > 0 ? '+100%' : '0%' 
          },
          customers: { 
            current: pizzeria.customers?.length || 0, 
            previous: 0, 
            change: pizzeria.customers?.length > 0 ? '+100%' : '0%' 
          },
          rating: { 
            current: pizzeria.rating || 0, 
            previous: 0, 
            change: pizzeria.rating > 0 ? `+${pizzeria.rating}` : '0' 
          }
        }));
      }
      
      // Load real promotions if they exist
      if (pizzeria.promotions) {
        setPromotionsData({
          active: pizzeria.promotions.filter(p => p.status === 'active') || [],
          scheduled: pizzeria.promotions.filter(p => p.status === 'scheduled') || []
        });
      }
      
    } catch (error) {
      console.error('Error loading pizzeria data:', error);
      toast.error('Błąd podczas ładowania danych pizzerii');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleDataUpdate = (section, data) => {
    setPizzeriaData(prev => ({ ...prev, ...data }));
    setHasChanges(true);
    toast.success('Dane zostały zaktualizowane!');
  };

  const handleAnalyticsUpdate = (data) => {
    setAnalyticsData(prev => ({ ...prev, ...data }));
    toast.success('Analytics zostały zaktualizowane!');
  };

  const handlePromotionUpdate = (promotion) => {
    setPromotionsData(prev => {
      const updated = { ...prev };
      const existingIndex = updated.active.findIndex(p => p.id === promotion.id);
      
      if (existingIndex >= 0) {
        updated.active[existingIndex] = promotion;
      } else {
        updated.active.push(promotion);
      }
      
      return updated;
    });
    toast.success('Promocja została zaktualizowana!');
  };

  const handleSettingsUpdate = (section, data) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    toast.success('Ustawienia zostały zapisane!');
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save real data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onUpdate) {
        onUpdate(pizzeriaData);
      }
      
      setHasChanges(false);
      toast.success('Wszystkie zmiany zostały zapisane!');
    } catch (error) {
      toast.error('Błąd podczas zapisywania zmian!');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <PizzeriaOverview 
            pizzeria={pizzeriaData}
            analytics={analyticsData}
            onUpdate={handleDataUpdate}
          />
        );
      case 'edit':
        return (
          <PizzeriaEdit 
            pizzeria={pizzeriaData}
            onUpdate={handleDataUpdate}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      case 'analytics':
        return (
          <PizzeriaAnalytics 
            data={analyticsData}
            onUpdate={handleAnalyticsUpdate}
          />
        );
      case 'promotions':
        return (
          <PizzeriaPromotions 
            data={promotionsData}
            onUpdate={handlePromotionUpdate}
          />
        );
      case 'settings':
        return (
          <PizzeriaSettings 
            data={settingsData}
            onUpdate={handleSettingsUpdate}
          />
        );
      default:
        return null;
    }
  };

  // Show empty state if no pizzeria is selected
  if (!pizzeria) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaPizzaSlice className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Wybierz pizzerię</h2>
          <p className="text-gray-600 mb-6">Wybierz pizzerię z listy, aby rozpocząć zarządzanie</p>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Przejdź do listy pizzerii
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaStore className="text-orange-600 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {pizzeriaData.name || 'Moja Pizzeria'}
                </h1>
                <p className="text-gray-600">Zarządzaj swoją pizzerią i monitoruj wydajność</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center text-orange-600"
                >
                  <FaExclamationTriangle className="mr-2" />
                  <span className="text-sm font-medium">Niezapisane zmiany</span>
                </motion.div>
              )}
              
              <button
                onClick={handleSave}
                disabled={isLoading || !hasChanges}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                Zapisz zmiany
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PizzeriaManagement; 