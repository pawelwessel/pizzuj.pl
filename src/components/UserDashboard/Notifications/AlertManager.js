import React, { useState, useEffect } from 'react';
import { getDocuments, getDocument, updateDocument, addDocument } from '../../../db/firebase';

const AlertManager = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, resolved, critical
  const [newAlert, setNewAlert] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    category: '',
    expiresAt: ''
  });

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const alertsData = await getDocuments('alerts');
      const userAlerts = await getDocument('user_alerts', 'current_user_id');
      
      const allAlerts = [
        ...alertsData,
        ...(userAlerts?.alerts || [])
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAlerts(allAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async () => {
    if (!newAlert.title || !newAlert.message) return;

    try {
      const alertData = {
        ...newAlert,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'active',
        createdBy: 'current_user_id',
        read: false
      };

      await addDocument('alerts', alertData);
      
      setAlerts(prev => [alertData, ...prev]);
      setNewAlert({
        title: '',
        message: '',
        type: 'info',
        priority: 'medium',
        category: '',
        expiresAt: ''
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  const updateAlertStatus = async (alertId, status) => {
    try {
      await updateDocument('alerts', alertId, { status });
      
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, status }
            : alert
        )
      );
    } catch (error) {
      console.error('Error updating alert status:', error);
    }
  };

  const deleteAlert = async (alertId) => {
    try {
      await updateDocument('alerts', alertId, { deleted: true });
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      case 'critical': return '🚨';
      default: return '📢';
    }
  };

  const getAlertColor = (type, priority) => {
    if (priority === 'critical') return 'border-red-300 bg-red-50';
    if (priority === 'high') return 'border-orange-300 bg-orange-50';
    
    switch (type) {
      case 'success': return 'border-green-300 bg-green-50';
      case 'warning': return 'border-yellow-300 bg-yellow-50';
      case 'error': return 'border-red-300 bg-red-50';
      case 'info': return 'border-blue-300 bg-blue-50';
      case 'critical': return 'border-red-300 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'active': return alert.status === 'active';
      case 'resolved': return alert.status === 'resolved';
      case 'critical': return alert.priority === 'critical';
      default: return true;
    }
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Alert Manager</h2>
          <p className="text-gray-600">Manage system alerts and notifications</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Alert
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All', count: alerts.length },
          { key: 'active', label: 'Active', count: alerts.filter(a => a.status === 'active').length },
          { key: 'resolved', label: 'Resolved', count: alerts.filter(a => a.status === 'resolved').length },
          { key: 'critical', label: 'Critical', count: alerts.filter(a => a.priority === 'critical').length }
        ].map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Create New Alert</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={newAlert.title}
                onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Alert title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newAlert.type}
                onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newAlert.priority}
                onChange={(e) => setNewAlert(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={newAlert.category}
                onChange={(e) => setNewAlert(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="System, User, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expires At
              </label>
              <input
                type="datetime-local"
                value={newAlert.expiresAt}
                onChange={(e) => setNewAlert(prev => ({ ...prev, expiresAt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                value={newAlert.message}
                onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Alert message"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={createAlert}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Alert
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading alerts...</p>
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No alerts</h3>
          <p className="text-gray-600">All systems are running smoothly!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type, alert.priority)} ${
                isExpired(alert.expiresAt) ? 'opacity-60' : ''
              } transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                      {alert.status === 'active' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Active
                        </span>
                      )}
                      {alert.status === 'resolved' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          Resolved
                        </span>
                      )}
                      {isExpired(alert.expiresAt) && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Expired
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Created: {formatTimestamp(alert.createdAt)}</span>
                      {alert.category && (
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {alert.category}
                        </span>
                      )}
                      {alert.expiresAt && (
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          Expires: {formatTimestamp(alert.expiresAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {alert.status === 'active' && (
                    <button
                      onClick={() => updateAlertStatus(alert.id, 'resolved')}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Mark as resolved"
                    >
                      ✓
                    </button>
                  )}
                  {alert.status === 'resolved' && (
                    <button
                      onClick={() => updateAlertStatus(alert.id, 'active')}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Reactivate"
                    >
                      ↻
                    </button>
                  )}
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete alert"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alert Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Alert Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{alerts.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {alerts.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === 'critical').length}
            </div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => isExpired(a.expiresAt)).length}
            </div>
            <div className="text-sm text-gray-600">Expired</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertManager; 