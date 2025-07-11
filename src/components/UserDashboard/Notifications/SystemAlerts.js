import React, { useState, useEffect } from 'react';
import { getDocuments, getDocument, updateDocument } from '../../../db/firebase';

const SystemAlerts = () => {
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, resolved, critical
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadSystemAlerts();
  }, []);

  const loadSystemAlerts = async () => {
    setLoading(true);
    try {
      const alertsData = await getDocuments('system_alerts');
      const userAlerts = await getDocument('user_system_alerts', 'current_user_id');
      
      const allAlerts = [
        ...alertsData,
        ...(userAlerts?.alerts || [])
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setSystemAlerts(allAlerts);
    } catch (error) {
      console.error('Error loading system alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeAlert = async (alertId) => {
    try {
      await updateDocument('system_alerts', alertId, { 
        acknowledged: true,
        acknowledgedAt: new Date().toISOString(),
        acknowledgedBy: 'current_user_id'
      });
      
      setSystemAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { 
                ...alert, 
                acknowledged: true,
                acknowledgedAt: new Date().toISOString(),
                acknowledgedBy: 'current_user_id'
              }
            : alert
        )
      );
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'maintenance': return '🔧';
      case 'security': return '🔒';
      case 'performance': return '⚡';
      case 'outage': return '🚨';
      case 'update': return '🔄';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getAlertColor = (type, severity) => {
    if (severity === 'critical') return 'border-red-400 bg-red-50';
    if (severity === 'high') return 'border-orange-400 bg-orange-50';
    
    switch (type) {
      case 'maintenance': return 'border-blue-400 bg-blue-50';
      case 'security': return 'border-red-400 bg-red-50';
      case 'performance': return 'border-yellow-400 bg-yellow-50';
      case 'outage': return 'border-red-500 bg-red-100';
      case 'update': return 'border-green-400 bg-green-50';
      case 'warning': return 'border-orange-400 bg-orange-50';
      case 'info': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = systemAlerts.filter(alert => {
    switch (filter) {
      case 'active': return alert.status === 'active';
      case 'resolved': return alert.status === 'resolved';
      case 'critical': return alert.severity === 'critical';
      default: return true;
    }
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'Ongoing';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInHours = (end - start) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours`;
    } else {
      return `${Math.floor(diffInHours / 24)} days`;
    }
  };

  const isActive = (alert) => {
    if (alert.status === 'resolved') return false;
    if (!alert.startTime) return true;
    
    const now = new Date();
    const start = new Date(alert.startTime);
    const end = alert.endTime ? new Date(alert.endTime) : null;
    
    return now >= start && (!end || now <= end);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
          <p className="text-gray-600">Monitor system status and maintenance updates</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All', count: systemAlerts.length },
          { key: 'active', label: 'Active', count: systemAlerts.filter(a => a.status === 'active').length },
          { key: 'resolved', label: 'Resolved', count: systemAlerts.filter(a => a.status === 'resolved').length },
          { key: 'critical', label: 'Critical', count: systemAlerts.filter(a => a.severity === 'critical').length }
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

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading system alerts...</p>
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No system alerts</h3>
          <p className="text-gray-600">All systems are running smoothly!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type, alert.severity)} transition-all hover:shadow-md ${
                isActive(alert) ? 'ring-2 ring-red-200' : ''
              }`}
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
                      <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      {isActive(alert) && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Active
                        </span>
                      )}
                      {alert.acknowledged && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Acknowledged
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>Created: {formatTimestamp(alert.createdAt)}</span>
                      {alert.startTime && (
                        <span>Start: {formatTimestamp(alert.startTime)}</span>
                      )}
                      {alert.endTime && (
                        <span>End: {formatTimestamp(alert.endTime)}</span>
                      )}
                      {alert.startTime && alert.endTime && (
                        <span>Duration: {formatDuration(alert.startTime, alert.endTime)}</span>
                      )}
                    </div>
                    
                    {/* Affected Services */}
                    {alert.affectedServices && alert.affectedServices.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Affected Services:</h4>
                        <div className="flex flex-wrap gap-1">
                          {alert.affectedServices.map(service => (
                            <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Updates */}
                    {alert.updates && alert.updates.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Updates:</h4>
                        {alert.updates.map((update, index) => (
                          <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-500">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(update.timestamp)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {update.author}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{update.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Acknowledge alert"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedAlert(alert);
                      setShowDetails(true);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View details"
                  >
                    👁️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alert Details Modal */}
      {showDetails && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Alert Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">{selectedAlert.title}</h4>
                <p className="text-gray-600">{selectedAlert.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Severity:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedAlert.status)}`}>
                    {selectedAlert.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-sm text-gray-600">{selectedAlert.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Created:</span>
                  <span className="ml-2 text-sm text-gray-600">{formatTimestamp(selectedAlert.createdAt)}</span>
                </div>
              </div>
              
              {selectedAlert.affectedServices && selectedAlert.affectedServices.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Affected Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedServices.map(service => (
                      <span key={service} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedAlert.updates && selectedAlert.updates.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Updates</h4>
                  <div className="space-y-3">
                    {selectedAlert.updates.map((update, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">{formatTimestamp(update.timestamp)}</span>
                          <span className="text-xs text-gray-500">by {update.author}</span>
                        </div>
                        <p className="text-sm text-gray-700">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* System Status Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">System Status Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{systemAlerts.length}</div>
            <div className="text-sm text-gray-600">Total Alerts</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {systemAlerts.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {systemAlerts.filter(a => a.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {systemAlerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts; 