import React, { useState, useEffect } from 'react';
import { FaPalette, FaEye, FaFont, FaMobile, FaMoon, FaSun, FaCog, FaSave, FaBell, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DarkModeToggle from '../UI/DarkModeToggle';
import AccessibilitySettings from '../UI/AccessibilitySettings';
import ThemeManager from '../UI/ThemeManager';
import ResponsiveDesign from '../UI/ResponsiveDesign';
import ColorScheme from '../UI/ColorScheme';
import FontSettings from '../UI/FontSettings';

const Settings = ({ userData }) => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('appearance');
  const [settings, setSettings] = useState({
    darkMode: false,
    fontSize: 'medium',
    colorScheme: 'default',
    accessibility: {
      highContrast: false,
      reduceMotion: false,
      screenReader: false,
      largeText: false,
      boldText: false
    },
    notifications: {
      email: true,
      push: true,
      marketing: false,
      orderUpdates: true,
      promotions: false,
      newsletter: true
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      analytics: true,
      locationSharing: false,
      searchHistory: true
    }
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Apply settings to the document
  useEffect(() => {
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    const fontSizeMap = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };
    
    // Remove all font size classes
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    // Add current font size class
    document.documentElement.classList.add(fontSizeMap[settings.fontSize]);

    // Apply color scheme
    const colorSchemeMap = {
      default: 'theme-default',
      warm: 'theme-warm',
      cool: 'theme-cool'
    };
    
    // Remove all theme classes
    document.documentElement.classList.remove('theme-default', 'theme-warm', 'theme-cool');
    // Add current theme class
    document.documentElement.classList.add(colorSchemeMap[settings.colorScheme]);

    // Apply accessibility settings
    if (settings.accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (settings.accessibility.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

  }, [settings]);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleDirectSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Here you would save settings to the database
      console.log('Saving settings:', settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasUnsavedChanges(false);
      toast.success('Ustawienia zostały zapisane pomyślnie!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Błąd podczas zapisywania ustawień', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      darkMode: false,
      fontSize: 'medium',
      colorScheme: 'default',
      accessibility: {
        highContrast: false,
        reduceMotion: false,
        screenReader: false,
        largeText: false,
        boldText: false
      },
      notifications: {
        email: true,
        push: true,
        marketing: false,
        orderUpdates: true,
        promotions: false,
        newsletter: true
      },
      privacy: {
        profileVisibility: 'public',
        dataSharing: false,
        analytics: true,
        locationSharing: false,
        searchHistory: true
      }
    };
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
    toast.info('Ustawienia zostały zresetowane do domyślnych', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const settingsTabs = [
    { id: 'appearance', label: 'Wygląd', icon: FaPalette },
    { id: 'accessibility', label: 'Dostępność', icon: FaEye },
    { id: 'notifications', label: 'Powiadomienia', icon: FaBell },
    { id: 'privacy', label: 'Prywatność', icon: FaShieldAlt }
  ];

  const renderSettingsContent = () => {
    switch (activeSettingsTab) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaMoon className="mr-2 text-orange-500" />
                Tryb ciemny
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Włącz tryb ciemny</p>
                  <p className="text-sm text-gray-500">Zmniejsz zmęczenie oczu w ciemnych pomieszczeniach</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleDirectSettingChange('darkMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaFont className="mr-2 text-orange-500" />
                Rozmiar czcionki
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'small', label: 'Mały', description: 'Kompaktowy widok' },
                  { value: 'medium', label: 'Średni', description: 'Standardowy rozmiar' },
                  { value: 'large', label: 'Duży', description: 'Zwiększona czytelność' }
                ].map((size) => (
                  <label key={size.value} className="flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="fontSize"
                      value={size.value}
                      checked={settings.fontSize === size.value}
                      onChange={(e) => handleDirectSettingChange('fontSize', e.target.value)}
                      className="mr-3 text-orange-600"
                    />
                    <div>
                      <span className="font-medium capitalize">{size.label}</span>
                      <p className="text-sm text-gray-500">{size.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaPalette className="mr-2 text-orange-500" />
                Schemat kolorów
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'default', label: 'Domyślny', color: 'bg-orange-500' },
                  { value: 'warm', label: 'Ciepły', color: 'bg-red-500' },
                  { value: 'cool', label: 'Chłodny', color: 'bg-blue-500' }
                ].map((scheme) => (
                  <button
                    key={scheme.value}
                    onClick={() => handleDirectSettingChange('colorScheme', scheme.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      settings.colorScheme === scheme.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${scheme.color}`}></div>
                      <span className="text-sm font-medium">{scheme.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaEye className="mr-2 text-orange-500" />
                Opcje dostępności
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Wysoki kontrast</p>
                    <p className="text-sm text-gray-500">Zwiększ kontrast dla lepszej czytelności</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.accessibility.highContrast}
                      onChange={(e) => handleSettingChange('accessibility', 'highContrast', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Zmniejsz animacje</p>
                    <p className="text-sm text-gray-500">Wyłącz animacje dla lepszej dostępności</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.accessibility.reduceMotion}
                      onChange={(e) => handleSettingChange('accessibility', 'reduceMotion', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Obsługa czytnika ekranu</p>
                    <p className="text-sm text-gray-500">Optymalizuj dla czytników ekranu</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.accessibility.screenReader}
                      onChange={(e) => handleSettingChange('accessibility', 'screenReader', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Duży tekst</p>
                    <p className="text-sm text-gray-500">Zwiększ rozmiar tekstu w całej aplikacji</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.accessibility.largeText}
                      onChange={(e) => handleSettingChange('accessibility', 'largeText', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Pogrubiony tekst</p>
                    <p className="text-sm text-gray-500">Zwiększ grubość czcionki</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.accessibility.boldText}
                      onChange={(e) => handleSettingChange('accessibility', 'boldText', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaBell className="mr-2 text-orange-500" />
                Powiadomienia
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Powiadomienia email</p>
                    <p className="text-sm text-gray-500">Otrzymuj powiadomienia na email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Powiadomienia push</p>
                    <p className="text-sm text-gray-500">Otrzymuj powiadomienia w przeglądarce</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Aktualizacje zamówień</p>
                    <p className="text-sm text-gray-500">Powiadomienia o statusie zamówień</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.orderUpdates}
                      onChange={(e) => handleSettingChange('notifications', 'orderUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Promocje</p>
                    <p className="text-sm text-gray-500">Otrzymuj informacje o promocjach</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.promotions}
                      onChange={(e) => handleSettingChange('notifications', 'promotions', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Newsletter</p>
                    <p className="text-sm text-gray-500">Otrzymuj newsletter z najnowszymi informacjami</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.newsletter}
                      onChange={(e) => handleSettingChange('notifications', 'newsletter', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaShieldAlt className="mr-2 text-orange-500" />
                Prywatność
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widoczność profilu
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="public">Publiczny</option>
                    <option value="private">Prywatny</option>
                    <option value="friends">Tylko znajomi</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Udostępnianie danych</p>
                    <p className="text-sm text-gray-500">Zezwalaj na udostępnianie danych z partnerami</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataSharing}
                      onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Analityka</p>
                    <p className="text-sm text-gray-500">Zezwalaj na zbieranie danych analitycznych</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.analytics}
                      onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Udostępnianie lokalizacji</p>
                    <p className="text-sm text-gray-500">Zezwalaj na dostęp do lokalizacji</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.locationSharing}
                      onChange={(e) => handleSettingChange('privacy', 'locationSharing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">Historia wyszukiwania</p>
                    <p className="text-sm text-gray-500">Zapisz historię wyszukiwania</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.searchHistory}
                      onChange={(e) => handleSettingChange('privacy', 'searchHistory', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ustawienia</h2>
        <p className="text-gray-600">Dostosuj swoje doświadczenie w aplikacji</p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingsTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeSettingsTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300'
                  }`}
                >
                  <Icon className="inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="p-6">
          {renderSettingsContent()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={resetSettings}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
        >
          Resetuj ustawienia
        </button>
        
        <div className="flex items-center space-x-4">
          {hasUnsavedChanges && (
            <span className="text-sm text-orange-600 flex items-center">
              <FaCheck className="mr-1" />
              Masz niezapisane zmiany
            </span>
          )}
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
              isSaving
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Zapisywanie...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Zapisz ustawienia
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 