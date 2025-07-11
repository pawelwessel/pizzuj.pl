import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MenuManagement from './MenuManagement';
import PizzeriaOverview from './PizzeriaOverview';
import PizzeriaAnalytics from './PizzeriaAnalytics';
import PizzeriaPromotions from './PizzeriaPromotions';
import PizzeriaSettings from './PizzeriaSettings';
import PizzeriaEditModal from './PizzeriaEditModal';
import PizzeriaDeleteModal from './PizzeriaDeleteModal';
import PizzeriaTabs from './PizzeriaTabs';

const PizzeriaManagement = ({ pizzeria, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(pizzeria);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
    toast.success('Pizzeria została zaktualizowana!');
  };

  const handleDelete = () => {
    onDelete(pizzeria.id);
    setShowDeleteConfirm(false);
    toast.success('Pizzeria została usunięta!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <PizzeriaOverview 
            pizzeria={pizzeria}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        );
      case 'menu':
        return <MenuManagement pizzeriaId={pizzeria.id} />;
      case 'analytics':
        return <PizzeriaAnalytics />;
      case 'promotions':
        return <PizzeriaPromotions pizzeriaId={pizzeria.id} />;
      case 'settings':
        return <PizzeriaSettings onEdit={() => setIsEditing(true)} />;
      default:
        return (
          <PizzeriaOverview 
            pizzeria={pizzeria}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Edit Modal */}
      <AnimatePresence>
        <PizzeriaEditModal
          isOpen={isEditing}
          pizzeria={pizzeria}
          editData={editData}
          setEditData={setEditData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        <PizzeriaDeleteModal
          isOpen={showDeleteConfirm}
          pizzeria={pizzeria}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </AnimatePresence>

      {/* Tabs */}
      <PizzeriaTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default PizzeriaManagement; 