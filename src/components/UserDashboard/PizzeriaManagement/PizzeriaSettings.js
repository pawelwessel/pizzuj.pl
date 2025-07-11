import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCog, 
  FaStore, 
  FaClock, 
  FaTruck, 
  FaBell, 
  FaSave,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaCreditCard,
  FaShieldAlt,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const PizzeriaSettings = ({ data, onUpdate }) => {
  const [activeSection, setActiveSection] = useState('business');
  const [hasChanges, setHasChanges] = useState(false);
  const [settings, setSettings] = useState(data);

  const sections = [
    { id: 'business', label: 'Dane biznesowe', icon: FaStore },
    { id: 'hours', label: 'Godziny pracy', icon: FaClock },
    { id: 'delivery', label: 'Dostawa', icon: FaTruck },
    { id: 'notifications', label: 'Powiadomienia', icon: FaBell }
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Poniedziałek' },
    { key: 'tuesday', label: 'Wtorek' },
    { key: 'wednesday', label: 'Środa' },
    { key: 'thursday', label: 'Czwartek' },
    { key: 'friday', label: 'Piątek' },
    { key: 'saturday', label: 'Sobota' },
    { key: 'sunday', label: 'Niedziela' }
  ];

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      onUpdate(settings);
      setHasChanges(false);
      toast.success('Ustawienia zostały zapisane!');
    } catch (error) {
      toast.error('Błąd podczas zapisywania ustawień');
    }
  };

  const handleCancel = () => {
    setSettings(data);
    setHasChanges(false);
  };

  const renderBusinessSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nazwa pizzerii
          </label>
          <input
            type="text"
            value={settings.business.name}
            onChange={(e) => handleSettingChange('business', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numer telefonu
          </label>
          <input
            type="tel"
            value={settings.business.phone}
            onChange={(e) => handleSettingChange('business', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.business.email}
            onChange={(e) => handleSettingChange('business', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strona internetowa
          </label>
          <input
            type="url"
            value={settings.business.website}
            onChange={(e) => handleSettingChange('business', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opis pizzerii
        </label>
        <textarea
          value={settings.business.description}
          onChange={(e) => handleSettingChange('business', 'description', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ulica i numer
          </label>
          <input
            type="text"
            value={settings.business.address}
            onChange={(e) => handleSettingChange('business', 'address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miasto
          </label>
          <input
            type="text"
            value={settings.business.city}
            onChange={(e) => handleSettingChange('business', 'city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kod pocztowy
          </label>
          <input
            type="text"
            value={settings.business.postalCode}
            onChange={(e) => handleSettingChange('business', 'postalCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderHoursSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Godziny pracy</h4>
        <p className="text-sm text-gray-600">
          Ustaw godziny otwarcia dla każdego dnia tygodnia. Zaznacz "Zamknięte" jeśli pizzeria nie działa w danym dniu.
        </p>
      </div>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day.key} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
            <div className="w-24">
              <span className="text-sm font-medium text-gray-700">{day.label}</span>
            </div>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!settings.hours[day.key].closed}
                onChange={(e) => handleSettingChange('hours', day.key, {
                  ...settings.hours[day.key],
                  closed: !e.target.checked
                })}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Otwarte</span>
            </label>
            
            {!settings.hours[day.key].closed && (
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  value={settings.hours[day.key].open}
                  onChange={(e) => handleSettingChange('hours', day.key, {
                    ...settings.hours[day.key],
                    open: e.target.value
                  })}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="time"
                  value={settings.hours[day.key].close}
                  onChange={(e) => handleSettingChange('hours', day.key, {
                    ...settings.hours[day.key],
                    close: e.target.value
                  })}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            )}
            
            {settings.hours[day.key].closed && (
              <span className="text-sm text-gray-500">Zamknięte</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDeliverySection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Ustawienia dostawy</h4>
        <p className="text-sm text-gray-600">
          Skonfiguruj opcje dostawy, strefy dostawy i opłaty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={settings.delivery.enabled}
              onChange={(e) => handleSettingChange('delivery', 'enabled', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Włącz dostawę</span>
          </label>
        </div>
      </div>

      {settings.delivery.enabled && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promień dostawy (km)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={settings.delivery.radius}
                onChange={(e) => handleSettingChange('delivery', 'radius', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimalna wartość zamówienia (zł)
              </label>
              <input
                type="number"
                min="0"
                value={settings.delivery.minOrder}
                onChange={(e) => handleSettingChange('delivery', 'minOrder', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opłata za dostawę (zł)
              </label>
              <input
                type="number"
                min="0"
                value={settings.delivery.deliveryFee}
                onChange={(e) => handleSettingChange('delivery', 'deliveryFee', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Darmowa dostawa od (zł)
              </label>
              <input
                type="number"
                min="0"
                value={settings.delivery.freeDeliveryThreshold}
                onChange={(e) => handleSettingChange('delivery', 'freeDeliveryThreshold', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Czas przygotowania (minuty)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.delivery.preparationTime?.min || 20}
                  onChange={(e) => handleSettingChange('delivery', 'preparationTime', {
                    ...settings.delivery.preparationTime,
                    min: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.delivery.preparationTime?.max || 30}
                  onChange={(e) => handleSettingChange('delivery', 'preparationTime', {
                    ...settings.delivery.preparationTime,
                    max: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              {/* Empty div for grid alignment */}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Powiadomienia</h4>
        <p className="text-sm text-gray-600">
          Wybierz, które powiadomienia chcesz otrzymywać.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              <FaBell className="text-orange-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">
                  {key === 'newOrders' && 'Nowe zamówienia'}
                  {key === 'orderUpdates' && 'Aktualizacje zamówień'}
                  {key === 'customerReviews' && 'Recenzje klientów'}
                  {key === 'lowInventory' && 'Niski stan magazynowy'}
                  {key === 'dailyReports' && 'Codzienne raporty'}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'newOrders' && 'Powiadomienia o nowych zamówieniach'}
                  {key === 'orderUpdates' && 'Aktualizacje statusu zamówień'}
                  {key === 'customerReviews' && 'Nowe recenzje i oceny'}
                  {key === 'lowInventory' && 'Alerty o niskim stanie produktów'}
                  {key === 'dailyReports' && 'Codzienne podsumowania sprzedaży'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'business':
        return renderBusinessSection();
      case 'hours':
        return renderHoursSection();
      case 'delivery':
        return renderDeliverySection();
      case 'notifications':
        return renderNotificationsSection();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Ustawienia</h2>
          <p className="text-gray-600">Skonfiguruj ustawienia swojej pizzerii</p>
        </div>
        
        <div className="flex space-x-4">
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
            onClick={handleCancel}
            disabled={!hasChanges}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
          >
            <FaSave className="mr-2" />
            Zapisz ustawienia
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeSection === section.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <section.icon />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PizzeriaSettings; 