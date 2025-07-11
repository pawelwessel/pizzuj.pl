import React from 'react';
import { 
  FaEye, 
  FaUtensils, 
  FaChartBar, 
  FaBullhorn, 
  FaCog 
} from 'react-icons/fa';

const PizzeriaTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: FaEye },
    { id: 'menu', label: 'Menu', icon: FaUtensils },
    { id: 'analytics', label: 'Analizy', icon: FaChartBar },
    { id: 'promotions', label: 'Promocje', icon: FaBullhorn },
    { id: 'settings', label: 'Ustawienia', icon: FaCog },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="inline mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PizzeriaTabs; 