import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBullhorn, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaCalendarAlt,
  FaPercent,
  FaTruck,
  FaGift,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaClock,
  FaUsers,
  FaDollarSign
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const PizzeriaPromotions = ({ data, onUpdate }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    type: 'discount',
    value: 0,
    description: '',
    startDate: '',
    endDate: '',
    maxUsage: 100,
    conditions: []
  });

  const promotionTypes = [
    { id: 'discount', label: 'Zniżka procentowa', icon: FaPercent },
    { id: 'free_delivery', label: 'Darmowa dostawa', icon: FaTruck },
    { id: 'free_item', label: 'Darmowy produkt', icon: FaGift },
    { id: 'fixed_discount', label: 'Zniżka kwotowa', icon: FaDollarSign }
  ];

  const handleCreatePromotion = () => {
    if (!newPromotion.name || !newPromotion.startDate || !newPromotion.endDate) {
      toast.error('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    const promotion = {
      id: Date.now(),
      ...newPromotion,
      status: 'active',
      usage: 0,
      createdAt: new Date().toISOString()
    };

    onUpdate(promotion);
    setShowCreateModal(false);
    setNewPromotion({
      name: '',
      type: 'discount',
      value: 0,
      description: '',
      startDate: '',
      endDate: '',
      maxUsage: 100,
      conditions: []
    });
    toast.success('Promocja została utworzona!');
  };

  const handleEditPromotion = (promotion) => {
    setSelectedPromotion(promotion);
    setShowEditModal(true);
  };

  const handleDeletePromotion = (promotionId) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę promocję?')) {
      // Remove from active promotions
      const updatedActive = data.active.filter(p => p.id !== promotionId);
      const updatedScheduled = data.scheduled.filter(p => p.id !== promotionId);
      
      onUpdate({
        active: updatedActive,
        scheduled: updatedScheduled
      });
      toast.success('Promocja została usunięta!');
    }
  };

  const handleUpdatePromotion = (updatedPromotion) => {
    const updatedActive = data.active.map(p => 
      p.id === updatedPromotion.id ? updatedPromotion : p
    );
    const updatedScheduled = data.scheduled.map(p => 
      p.id === updatedPromotion.id ? updatedPromotion : p
    );
    
    onUpdate({
      active: updatedActive,
      scheduled: updatedScheduled
    });
    setShowEditModal(false);
    setSelectedPromotion(null);
    toast.success('Promocja została zaktualizowana!');
  };

  const renderPromotionCard = (promotion) => (
    <motion.div
      key={promotion.id}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{promotion.name}</h3>
          <p className="text-gray-600 mb-3">{promotion.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1" />
              <span>{new Date(promotion.startDate).toLocaleDateString('pl-PL')} - {new Date(promotion.endDate).toLocaleDateString('pl-PL')}</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="mr-1" />
              <span>{promotion.usage}/{promotion.maxUsage} użyć</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            promotion.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {promotion.status === 'active' ? 'Aktywna' : 'Zaplanowana'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {promotion.type === 'discount' && (
            <div className="flex items-center text-green-600 font-semibold">
              <FaPercent className="mr-1" />
              {promotion.value}% zniżki
            </div>
          )}
          {promotion.type === 'free_delivery' && (
            <div className="flex items-center text-blue-600 font-semibold">
              <FaTruck className="mr-1" />
              Darmowa dostawa
            </div>
          )}
          {promotion.type === 'free_item' && (
            <div className="flex items-center text-purple-600 font-semibold">
              <FaGift className="mr-1" />
              Darmowy produkt
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditPromotion(promotion)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeletePromotion(promotion.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderCreateModal = () => (
    <AnimatePresence>
      {showCreateModal && (
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
              <h3 className="text-xl font-bold text-gray-800">Utwórz promocję</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nazwa promocji
                </label>
                <input
                  type="text"
                  value={newPromotion.name}
                  onChange={(e) => setNewPromotion({...newPromotion, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="np. Happy Hours"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ promocji
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {promotionTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setNewPromotion({...newPromotion, type: type.id})}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                        newPromotion.type === type.id 
                          ? 'border-orange-500 bg-orange-50 text-orange-600' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className="text-xl mb-1" />
                      <span className="text-xs">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {newPromotion.type === 'discount' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wartość zniżki (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newPromotion.value}
                    onChange={(e) => setNewPromotion({...newPromotion, value: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opis
                </label>
                <textarea
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="3"
                  placeholder="Opisz promocję..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data rozpoczęcia
                  </label>
                  <input
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data zakończenia
                  </label>
                  <input
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksymalna liczba użyć
                </label>
                <input
                  type="number"
                  min="1"
                  value={newPromotion.maxUsage}
                  onChange={(e) => setNewPromotion({...newPromotion, maxUsage: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={handleCreatePromotion}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
              >
                <FaCheck className="mr-2" />
                Utwórz promocję
              </button>
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
          <h2 className="text-2xl font-bold text-gray-800">Promocje</h2>
          <p className="text-gray-600">Zarządzaj promocjami i ofertami specjalnymi</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
        >
          <FaPlus className="mr-2" />
          Utwórz promocję
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === 'active'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaBullhorn />
              <span>Aktywne ({data.active.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === 'scheduled'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaClock />
              <span>Zaplanowane ({data.scheduled.length})</span>
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeTab === 'active' && data.active.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.active.map(renderPromotionCard)}
                </div>
              )}
              
              {activeTab === 'scheduled' && data.scheduled.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.scheduled.map(renderPromotionCard)}
                </div>
              )}
              
              {(activeTab === 'active' && data.active.length === 0) || 
               (activeTab === 'scheduled' && data.scheduled.length === 0) && (
                <div className="text-center py-12">
                  <FaBullhorn className="text-4xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Brak promocji
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'active' 
                      ? 'Nie masz jeszcze żadnych aktywnych promocji.' 
                      : 'Nie masz jeszcze żadnych zaplanowanych promocji.'
                    }
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Utwórz pierwszą promocję
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktywne promocje</p>
              <p className="text-2xl font-bold text-gray-900">{data.active.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaBullhorn className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Zaplanowane promocje</p>
              <p className="text-2xl font-bold text-gray-900">{data.scheduled.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Łączne użycia</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.active.reduce((sum, p) => sum + p.usage, 0) + 
                 data.scheduled.reduce((sum, p) => sum + p.usage, 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {renderCreateModal()}
    </div>
  );
};

export default PizzeriaPromotions; 