import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, 
  FaTimes, 
  FaStore, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe,
  FaClock,
  FaEdit,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const PizzeriaEdit = ({ pizzeria, onUpdate, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    name: pizzeria?.name || '',
    description: pizzeria?.description || '',
    phone: pizzeria?.phone || '',
    email: pizzeria?.email || '',
    address: pizzeria?.address || '',
    city: pizzeria?.city || '',
    postalCode: pizzeria?.postalCode || '',
    website: pizzeria?.website || '',
    logo: pizzeria?.logo || ''
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData({
      name: pizzeria?.name || '',
      description: pizzeria?.description || '',
      phone: pizzeria?.phone || '',
      email: pizzeria?.email || '',
      address: pizzeria?.address || '',
      city: pizzeria?.city || '',
      postalCode: pizzeria?.postalCode || '',
      website: pizzeria?.website || '',
      logo: pizzeria?.logo || ''
    });
  }, [pizzeria]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nazwa pizzerii jest wymagana';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^[\+]?[0-9\s\-\(\)]{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Nieprawidłowy format numeru telefonu';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres jest wymagany';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Miasto jest wymagane';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Proszę poprawić błędy w formularzu');
      return;
    }

    try {
      await onSave();
      setHasChanges(false);
      onUpdate(formData);
      toast.success('Dane pizzerii zostały zaktualizowane!');
    } catch (error) {
      toast.error('Błąd podczas zapisywania danych');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: pizzeria?.name || '',
      description: pizzeria?.description || '',
      phone: pizzeria?.phone || '',
      email: pizzeria?.email || '',
      address: pizzeria?.address || '',
      city: pizzeria?.city || '',
      postalCode: pizzeria?.postalCode || '',
      website: pizzeria?.website || '',
      logo: pizzeria?.logo || ''
    });
    setErrors({});
    setHasChanges(false);
  };

  const renderInput = (field, label, type = 'text', placeholder = '', icon = null) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
            icon ? 'pl-10' : ''
          } ${
            errors[field] 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        />
      </div>
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center"
        >
          <FaExclamationTriangle className="mr-1" />
          {errors[field]}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Edycja danych pizzerii</h2>
          <p className="text-gray-600">Zaktualizuj informacje o swojej pizzerii</p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          >
            <FaTimes className="mr-2" />
            Anuluj
          </button>
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

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaStore className="mr-2 text-orange-500" />
            Podstawowe informacje
          </h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('name', 'Nazwa pizzerii', 'text', 'Wprowadź nazwę pizzerii', FaStore)}
            {renderInput('phone', 'Numer telefonu', 'tel', '+48 123 456 789', FaPhone)}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('email', 'Email (opcjonalnie)', 'email', 'kontakt@pizzeria.pl')}
            {renderInput('website', 'Strona internetowa (opcjonalnie)', 'url', 'https://www.pizzeria.pl', FaGlobe)}
          </div>
          
          {renderInput('description', 'Opis pizzerii', 'textarea', 'Opisz swoją pizzerię...')}
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-orange-500" />
            Adres
          </h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('address', 'Ulica i numer', 'text', 'ul. Przykładowa 123', FaMapMarkerAlt)}
            {renderInput('city', 'Miasto', 'text', 'Warszawa')}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('postalCode', 'Kod pocztowy', 'text', '00-000')}
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaEdit className="mr-2 text-orange-500" />
            Logo pizzerii
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL logo (opcjonalnie)
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => handleInputChange('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-400 transition-colors"
              />
            </div>
            
            {formData.logo && (
              <div className="flex items-center space-x-4">
                <img 
                  src={formData.logo} 
                  alt="Logo preview" 
                  className="w-16 h-16 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div>
                  <p className="text-sm text-gray-600">Podgląd logo</p>
                  <p className="text-xs text-gray-500">Logo będzie wyświetlane w aplikacji</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <h4 className="text-red-800 font-medium">Błędy w formularzu</h4>
          </div>
          <ul className="mt-2 text-sm text-red-700">
            {Object.values(errors).map((error, index) => (
              <li key={index} className="flex items-center">
                <FaCheck className="mr-2 text-red-500" />
                {error}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Save Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Anuluj
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading || !hasChanges}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
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
  );
};

export default PizzeriaEdit; 