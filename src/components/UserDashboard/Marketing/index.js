"use client";
import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaChartLine, FaUsers, FaCalendar, FaEdit, FaEye, FaTrash, FaPlus, FaShare, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Marketing = ({ userData }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'social',
    budget: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        name: 'Kampania Lato 2024',
        type: 'social',
        status: 'active',
        budget: 5000,
        spent: 3200,
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        impressions: 45000,
        clicks: 1200,
        conversions: 89,
        ctr: 2.67,
        cpc: 2.67,
        roi: 156
      },
      {
        id: 2,
        name: 'Promocja Pizza Week',
        type: 'google_ads',
        status: 'paused',
        budget: 3000,
        spent: 1800,
        startDate: '2024-05-15',
        endDate: '2024-05-22',
        impressions: 28000,
        clicks: 950,
        conversions: 67,
        ctr: 3.39,
        cpc: 1.89,
        roi: 223
      },
      {
        id: 3,
        name: 'Facebook Ads - Nowe Menu',
        type: 'facebook',
        status: 'completed',
        budget: 2000,
        spent: 2000,
        startDate: '2024-04-01',
        endDate: '2024-04-30',
        impressions: 35000,
        clicks: 1100,
        conversions: 78,
        ctr: 3.14,
        cpc: 1.82,
        roi: 195
      }
    ];
    
    setCampaigns(mockCampaigns);
    setLoading(false);
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    
    if (!newCampaign.name || !newCampaign.budget || !newCampaign.startDate) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campaign = {
        id: Date.now(),
        ...newCampaign,
        status: 'draft',
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        roi: 0
      };
      
      setCampaigns(prev => [campaign, ...prev]);
      setNewCampaign({
        name: '',
        type: 'social',
        budget: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      setShowCreateModal(false);
      toast.success('Kampania została utworzona!');
    } catch (error) {
      toast.error('Błąd podczas tworzenia kampanii');
    }
  };

  const handleCampaignAction = async (campaignId, action) => {
    try {
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: action }
          : campaign
      ));
      
      toast.success(`Kampania została ${action === 'active' ? 'aktywowana' : action === 'paused' ? 'wstrzymana' : 'zakończona'}!`);
    } catch (error) {
      toast.error('Błąd podczas aktualizacji kampanii');
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!confirm('Czy na pewno chcesz usunąć tę kampanię?')) return;
    
    try {
      setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
      toast.success('Kampania została usunięta!');
    } catch (error) {
      toast.error('Błąd podczas usuwania kampanii');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'social': return '📱';
      case 'google_ads': return '🔍';
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'email': return '📧';
      default: return '📢';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'social': return 'Social Media';
      case 'google_ads': return 'Google Ads';
      case 'facebook': return 'Facebook Ads';
      case 'instagram': return 'Instagram Ads';
      case 'email': return 'Email Marketing';
      default: return 'Inne';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Marketing i Reklama</h2>
          <p className="text-gray-600">Zarządzaj kampaniami marketingowymi i analizuj wyniki</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaPlus />
          Nowa Kampania
        </button>
      </div>

      {/* Overview Stats */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <h3 className="text-blue-800 font-semibold">Aktywne Kampanie</h3>
            <p className="text-2xl font-bold text-blue-600">
              {campaigns.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <h3 className="text-green-800 font-semibold">Całkowity Budżet</h3>
            <p className="text-2xl font-bold text-green-600">
              {campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()} zł
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <h3 className="text-purple-800 font-semibold">Konwersje</h3>
            <p className="text-2xl font-bold text-purple-600">
              {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
            <h3 className="text-orange-800 font-semibold">Średni ROI</h3>
            <p className="text-2xl font-bold text-orange-600">
              {Math.round(campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)}%
            </p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-4 border-b-2 font-medium transition-colors ${
            activeTab === 'overview'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaChartLine className="inline mr-2" />
          Przegląd
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`py-2 px-4 border-b-2 font-medium transition-colors ${
            activeTab === 'campaigns'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaBullhorn className="inline mr-2" />
          Kampanie
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 px-4 border-b-2 font-medium transition-colors ${
            activeTab === 'analytics'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaUsers className="inline mr-2" />
          Analityka
        </button>
      </div>

      {/* Campaigns List */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Brak kampanii marketingowych</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Utwórz pierwszą kampanię
              </button>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(campaign.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status === 'active' ? 'Aktywna' : 
                         campaign.status === 'paused' ? 'Wstrzymana' : 
                         campaign.status === 'completed' ? 'Zakończona' : 'Szkic'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{getTypeLabel(campaign.type)}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Budżet:</span>
                        <p className="font-semibold">{campaign.budget.toLocaleString()} zł</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Wydane:</span>
                        <p className="font-semibold">{campaign.spent.toLocaleString()} zł</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Konwersje:</span>
                        <p className="font-semibold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">ROI:</span>
                        <p className="font-semibold">{campaign.roi}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      <FaEye />
                      Szczegóły
                    </button>
                    <button
                      onClick={() => handleCampaignAction(campaign.id, campaign.status === 'active' ? 'paused' : 'active')}
                      className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors ${
                        campaign.status === 'active'
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {campaign.status === 'active' ? 'Wstrzymaj' : 'Aktywuj'}
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Wydajność Kampanii</h3>
              <div className="space-y-3">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{campaign.name}</span>
                    <span className="text-sm font-semibold">{campaign.roi}% ROI</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Najlepsze Kanały</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Facebook Ads</span>
                  <span className="text-sm font-semibold">195% ROI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Google Ads</span>
                  <span className="text-sm font-semibold">223% ROI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Social Media</span>
                  <span className="text-sm font-semibold">156% ROI</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Statystyki</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Całkowite Impresje</span>
                  <span className="text-sm font-semibold">108,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kliknięcia</span>
                  <span className="text-sm font-semibold">3,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Konwersje</span>
                  <span className="text-sm font-semibold">234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Nowa Kampania Marketingowa</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nazwa kampanii
                </label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="np. Kampania Lato 2024"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ kampanii
                </label>
                <select
                  value={newCampaign.type}
                  onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="social">Social Media</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="facebook">Facebook Ads</option>
                  <option value="instagram">Instagram Ads</option>
                  <option value="email">Email Marketing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budżet (zł)
                </label>
                <input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="5000"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data rozpoczęcia
                  </label>
                  <input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data zakończenia
                  </label>
                  <input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opis
                </label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                  placeholder="Opisz cel i strategię kampanii..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Utwórz kampanię
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing; 