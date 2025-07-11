import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  addDocument, 
  updateDoc, 
  deleteDoc, 
  doc 
} from '../../../db/firebase';

const MultiLocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    manager: '',
    type: 'franchise', // franchise, corporate, partner
    status: 'active', // active, inactive, pending
    openingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '22:00', closed: false }
    },
    coordinates: {
      latitude: '',
      longitude: ''
    },
    features: [],
    notes: ''
  });

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const locationsData = await getDocuments('locations');
      setLocations(locationsData);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const locationId = selectedLocation ? selectedLocation.id : `location_${Date.now()}`;
      const locationData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('locations', locationId, locationData);
      
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        email: '',
        manager: '',
        type: 'franchise',
        status: 'active',
        openingHours: {
          monday: { open: '09:00', close: '22:00', closed: false },
          tuesday: { open: '09:00', close: '22:00', closed: false },
          wednesday: { open: '09:00', close: '22:00', closed: false },
          thursday: { open: '09:00', close: '22:00', closed: false },
          friday: { open: '09:00', close: '23:00', closed: false },
          saturday: { open: '10:00', close: '23:00', closed: false },
          sunday: { open: '10:00', close: '22:00', closed: false }
        },
        coordinates: {
          latitude: '',
          longitude: ''
        },
        features: [],
        notes: ''
      });
      setSelectedLocation(null);
      loadLocations();
    } catch (error) {
      console.error('Error saving location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setFormData({
      name: location.name || '',
      address: location.address || '',
      city: location.city || '',
      state: location.state || '',
      zipCode: location.zipCode || '',
      country: location.country || '',
      phone: location.phone || '',
      email: location.email || '',
      manager: location.manager || '',
      type: location.type || 'franchise',
      status: location.status || 'active',
      openingHours: location.openingHours || {
        monday: { open: '09:00', close: '22:00', closed: false },
        tuesday: { open: '09:00', close: '22:00', closed: false },
        wednesday: { open: '09:00', close: '22:00', closed: false },
        thursday: { open: '09:00', close: '22:00', closed: false },
        friday: { open: '09:00', close: '23:00', closed: false },
        saturday: { open: '10:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '22:00', closed: false }
      },
      coordinates: location.coordinates || { latitude: '', longitude: '' },
      features: location.features || [],
      notes: location.notes || ''
    });
  };

  const handleDelete = async (locationId) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'locations', locationId));
        loadLocations();
      } catch (error) {
        console.error('Error deleting location:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateLocationStatus = async (locationId, newStatus) => {
    try {
      await updateDoc(doc(db, 'locations', locationId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      loadLocations();
    } catch (error) {
      console.error('Error updating location status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'franchise': return '🏪';
      case 'corporate': return '🏢';
      case 'partner': return '🤝';
      default: return '📍';
    }
  };

  const features = [
    { value: 'delivery', label: 'Delivery' },
    { value: 'takeout', label: 'Takeout' },
    { value: 'dine_in', label: 'Dine-in' },
    { value: 'drive_thru', label: 'Drive-thru' },
    { value: 'outdoor_seating', label: 'Outdoor Seating' },
    { value: 'parking', label: 'Parking' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'wheelchair_accessible', label: 'Wheelchair Accessible' }
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Multi-Location Manager</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Locations</h3>
          <p className="text-2xl font-bold text-blue-600">{locations.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Active</h3>
          <p className="text-2xl font-bold text-green-600">{locations.filter(l => l.status === 'active').length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">Franchises</h3>
          <p className="text-2xl font-bold text-yellow-600">{locations.filter(l => l.type === 'franchise').length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Corporate</h3>
          <p className="text-2xl font-bold text-purple-600">{locations.filter(l => l.type === 'corporate').length}</p>
        </div>
      </div>
      
      {/* Location Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {selectedLocation ? 'Edit Location' : 'Add New Location'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="franchise">Franchise</option>
              <option value="corporate">Corporate</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">State/Province</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({...formData, manager: e.target.value})}
              className="w-full p-2 border rounded"
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Latitude</label>
            <input
              type="number"
              step="any"
              value={formData.coordinates.latitude}
              onChange={(e) => setFormData({
                ...formData, 
                coordinates: {...formData.coordinates, latitude: e.target.value}
              })}
              className="w-full p-2 border rounded"
              placeholder="e.g., 40.7128"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Longitude</label>
            <input
              type="number"
              step="any"
              value={formData.coordinates.longitude}
              onChange={(e) => setFormData({
                ...formData, 
                coordinates: {...formData.coordinates, longitude: e.target.value}
              })}
              className="w-full p-2 border rounded"
              placeholder="e.g., -74.0060"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Features</label>
          <div className="flex flex-wrap gap-2">
            {features.map(feature => (
              <label key={feature.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData, 
                        features: [...formData.features, feature.value]
                      });
                    } else {
                      setFormData({
                        ...formData, 
                        features: formData.features.filter(f => f !== feature.value)
                      });
                    }
                  }}
                  className="mr-1"
                />
                <span className="text-sm">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Additional notes about this location..."
          />
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (selectedLocation ? 'Update Location' : 'Add Location')}
          </button>
          
          {selectedLocation && (
            <button
              type="button"
              onClick={() => {
                setSelectedLocation(null);
                setFormData({
                  name: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  country: '',
                  phone: '',
                  email: '',
                  manager: '',
                  type: 'franchise',
                  status: 'active',
                  openingHours: {
                    monday: { open: '09:00', close: '22:00', closed: false },
                    tuesday: { open: '09:00', close: '22:00', closed: false },
                    wednesday: { open: '09:00', close: '22:00', closed: false },
                    thursday: { open: '09:00', close: '22:00', closed: false },
                    friday: { open: '09:00', close: '23:00', closed: false },
                    saturday: { open: '10:00', close: '23:00', closed: false },
                    sunday: { open: '10:00', close: '22:00', closed: false }
                  },
                  coordinates: { latitude: '', longitude: '' },
                  features: [],
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Locations List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Locations</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading locations...</div>
        ) : locations.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No locations added yet</div>
        ) : (
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getTypeIcon(location.type)}</span>
                    <div>
                      <h4 className="font-semibold text-lg">{location.name}</h4>
                      <p className="text-sm text-gray-600">{location.address}</p>
                      <p className="text-sm text-gray-600">{location.city}, {location.state} {location.zipCode}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(location.status)}`}>
                      {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">{location.type}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-600">{location.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600">{location.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Manager</p>
                    <p className="text-sm text-gray-600">{location.manager || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-gray-600">{new Date(location.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {location.features.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Features</p>
                    <div className="flex flex-wrap gap-1">
                      {location.features.map(feature => (
                        <span key={feature} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {features.find(f => f.value === feature)?.label || feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {location.coordinates.latitude && location.coordinates.longitude && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Coordinates</p>
                    <p className="text-sm text-gray-600">
                      {location.coordinates.latitude}, {location.coordinates.longitude}
                    </p>
                  </div>
                )}
                
                {location.notes && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Notes</p>
                    <p className="text-sm text-gray-600">{location.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(location)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => updateLocationStatus(location.id, location.status === 'active' ? 'inactive' : 'active')}
                    className={`px-3 py-1 text-sm rounded ${
                      location.status === 'active' 
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {location.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
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

export default MultiLocationManager; 