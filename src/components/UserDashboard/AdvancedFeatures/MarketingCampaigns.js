import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  addDocument, 
  updateDoc, 
  deleteDoc, 
  doc 
} from '../../../db/firebase';

const MarketingCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'email', // email, sms, social, banner, push
    targetAudience: 'all', // all, premium, enterprise, specific
    budget: 0,
    startDate: '',
    endDate: '',
    status: 'draft', // draft, active, paused, completed
    channels: [],
    message: '',
    goals: '',
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0
    }
  });

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const campaignsData = await getDocuments('marketing_campaigns');
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const campaignId = selectedCampaign ? selectedCampaign.id : `campaign_${Date.now()}`;
      const campaignData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('marketing_campaigns', campaignId, campaignData);
      
      setFormData({
        name: '',
        description: '',
        type: 'email',
        targetAudience: 'all',
        budget: 0,
        startDate: '',
        endDate: '',
        status: 'draft',
        channels: [],
        message: '',
        goals: '',
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: 0
        }
      });
      setSelectedCampaign(null);
      loadCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign.name || '',
      description: campaign.description || '',
      type: campaign.type || 'email',
      targetAudience: campaign.targetAudience || 'all',
      budget: campaign.budget || 0,
      startDate: campaign.startDate || '',
      endDate: campaign.endDate || '',
      status: campaign.status || 'draft',
      channels: campaign.channels || [],
      message: campaign.message || '',
      goals: campaign.goals || '',
      metrics: campaign.metrics || {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0
      }
    });
  };

  const handleDelete = async (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'marketing_campaigns', campaignId));
        loadCampaigns();
      } catch (error) {
        console.error('Error deleting campaign:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateCampaignStatus = async (campaignId, newStatus) => {
    try {
      await updateDoc(doc(db, 'marketing_campaigns', campaignId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      loadCampaigns();
    } catch (error) {
      console.error('Error updating campaign status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return '📧';
      case 'sms': return '📱';
      case 'social': return '📘';
      case 'banner': return '🖼️';
      case 'push': return '🔔';
      default: return '📢';
    }
  };

  const campaignTypes = [
    { value: 'email', label: 'Email Campaign' },
    { value: 'sms', label: 'SMS Campaign' },
    { value: 'social', label: 'Social Media' },
    { value: 'banner', label: 'Banner Ads' },
    { value: 'push', label: 'Push Notifications' }
  ];

  const channels = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'website', label: 'Website' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Marketing Campaigns</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Campaigns</h3>
          <p className="text-2xl font-bold text-blue-600">{campaigns.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Active</h3>
          <p className="text-2xl font-bold text-green-600">{campaigns.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">Draft</h3>
          <p className="text-2xl font-bold text-yellow-600">{campaigns.filter(c => c.status === 'draft').length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Completed</h3>
          <p className="text-2xl font-bold text-purple-600">{campaigns.filter(c => c.status === 'completed').length}</p>
        </div>
      </div>
      
      {/* Campaign Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {selectedCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              {campaignTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="all">All Users</option>
              <option value="premium">Premium Users</option>
              <option value="enterprise">Enterprise Users</option>
              <option value="specific">Specific Segment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Budget</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Goals</label>
            <input
              type="text"
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g., Increase sales by 20%"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Channels</label>
          <div className="flex flex-wrap gap-2">
            {channels.map(channel => (
              <label key={channel.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.channels.includes(channel.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData, 
                        channels: [...formData.channels, channel.value]
                      });
                    } else {
                      setFormData({
                        ...formData, 
                        channels: formData.channels.filter(c => c !== channel.value)
                      });
                    }
                  }}
                  className="mr-1"
                />
                <span className="text-sm">{channel.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Campaign description..."
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Message Content</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Campaign message content..."
            required
          />
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (selectedCampaign ? 'Update Campaign' : 'Create Campaign')}
          </button>
          
          {selectedCampaign && (
            <button
              type="button"
              onClick={() => {
                setSelectedCampaign(null);
                setFormData({
                  name: '',
                  description: '',
                  type: 'email',
                  targetAudience: 'all',
                  budget: 0,
                  startDate: '',
                  endDate: '',
                  status: 'draft',
                  channels: [],
                  message: '',
                  goals: '',
                  metrics: {
                    impressions: 0,
                    clicks: 0,
                    conversions: 0,
                    revenue: 0
                  }
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Campaigns List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Campaigns</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No campaigns created yet</div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getTypeIcon(campaign.type)}</span>
                    <div>
                      <h4 className="font-semibold text-lg">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm text-gray-600">{campaign.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Budget</p>
                    <p className="text-sm text-gray-600">${campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-gray-600">
                      {campaign.startDate} - {campaign.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Target</p>
                    <p className="text-sm text-gray-600">{campaign.targetAudience}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium">Channels</p>
                  <p className="text-sm text-gray-600">{campaign.channels.join(', ')}</p>
                </div>
                
                {campaign.goals && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Goals</p>
                    <p className="text-sm text-gray-600">{campaign.goals}</p>
                  </div>
                )}
                
                <div className="mb-3">
                  <p className="text-sm font-medium">Message Preview</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {campaign.message.substring(0, 100)}...
                  </p>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 bg-gray-50 p-3 rounded">
                  <div>
                    <p className="text-sm font-medium">Impressions</p>
                    <p className="text-sm text-gray-600">{campaign.metrics?.impressions || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Clicks</p>
                    <p className="text-sm text-gray-600">{campaign.metrics?.clicks || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Conversions</p>
                    <p className="text-sm text-gray-600">{campaign.metrics?.conversions || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Revenue</p>
                    <p className="text-sm text-gray-600">${campaign.metrics?.revenue || 0}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => updateCampaignStatus(campaign.id, 'active')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Activate
                    </button>
                  )}
                  {campaign.status === 'active' && (
                    <button
                      onClick={() => updateCampaignStatus(campaign.id, 'paused')}
                      className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                    >
                      Pause
                    </button>
                  )}
                  {campaign.status === 'paused' && (
                    <button
                      onClick={() => updateCampaignStatus(campaign.id, 'active')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Resume
                    </button>
                  )}
                  <button
                    onClick={() => updateCampaignStatus(campaign.id, 'completed')}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingCampaigns; 