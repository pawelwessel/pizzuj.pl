import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  addDocument, 
  updateDoc, 
  deleteDoc, 
  doc 
} from '../../../db/firebase';

const BannerAdManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    linkUrl: '',
    startDate: '',
    endDate: '',
    isActive: false,
    targetAudience: '',
    budget: 0
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const bannersData = await getDocuments('banner_ads');
      setBanners(bannersData);
    } catch (error) {
      console.error('Error loading banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const bannerId = selectedBanner ? selectedBanner.id : `banner_${Date.now()}`;
      const bannerData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('banner_ads', bannerId, bannerData);
      
      setFormData({
        title: '',
        imageUrl: '',
        linkUrl: '',
        startDate: '',
        endDate: '',
        isActive: false,
        targetAudience: '',
        budget: 0
      });
      setSelectedBanner(null);
      loadBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setFormData({
      title: banner.title || '',
      imageUrl: banner.imageUrl || '',
      linkUrl: banner.linkUrl || '',
      startDate: banner.startDate || '',
      endDate: banner.endDate || '',
      isActive: banner.isActive || false,
      targetAudience: banner.targetAudience || '',
      budget: banner.budget || 0
    });
  };

  const handleDelete = async (bannerId) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'banner_ads', bannerId));
        loadBanners();
      } catch (error) {
        console.error('Error deleting banner:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleBannerStatus = async (bannerId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'banner_ads', bannerId), {
        isActive: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      loadBanners();
    } catch (error) {
      console.error('Error updating banner status:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Banner Ad Management</h2>
      
      {/* Banner Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {selectedBanner ? 'Edit Banner' : 'Create New Banner'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Link URL</label>
            <input
              type="url"
              value={formData.linkUrl}
              onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
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
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g., Pizza lovers, Local customers"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="mr-2"
            />
            <label className="text-sm font-medium">Active</label>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (selectedBanner ? 'Update Banner' : 'Create Banner')}
          </button>
          
          {selectedBanner && (
            <button
              type="button"
              onClick={() => {
                setSelectedBanner(null);
                setFormData({
                  title: '',
                  imageUrl: '',
                  linkUrl: '',
                  startDate: '',
                  endDate: '',
                  isActive: false,
                  targetAudience: '',
                  budget: 0
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Banners List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Banners</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading banners...</div>
        ) : banners.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No banners created yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{banner.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                {banner.imageUrl && (
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                
                <p className="text-sm text-gray-600 mb-2">Budget: ${banner.budget}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {banner.startDate} - {banner.endDate}
                </p>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleBannerStatus(banner.id, banner.isActive)}
                    className={`px-3 py-1 text-sm rounded ${
                      banner.isActive 
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {banner.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
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

export default BannerAdManager; 