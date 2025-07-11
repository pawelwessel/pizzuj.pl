import React, { useState, useEffect } from 'react';
import { getDocument, updateDocument } from '../../../db/firebase';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      frequency: 'immediate', // immediate, daily, weekly
      types: {
        system: true,
        alerts: true,
        messages: true,
        feedback: true,
        marketing: false
      }
    },
    push: {
      enabled: true,
      types: {
        system: true,
        alerts: true,
        messages: true,
        feedback: false,
        marketing: false
      }
    },
    inApp: {
      enabled: true,
      types: {
        system: true,
        alerts: true,
        messages: true,
        feedback: true,
        marketing: false
      },
      sound: true,
      vibration: true
    },
    sms: {
      enabled: false,
      types: {
        system: false,
        alerts: true,
        messages: false,
        feedback: false,
        marketing: false
      }
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const userSettings = await getDocument('user_notification_settings', 'current_user_id');
      if (userSettings) {
        setSettings(userSettings);
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await updateDocument('user_notification_settings', 'current_user_id', settings);
      // Show success message
    } catch (error) {
      console.error('Error saving notification settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateChannelSetting = (channel, key, value) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [key]: value
      }
    }));
  };

  const updateTypeSetting = (channel, type, enabled) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        types: {
          ...prev[channel].types,
          [type]: enabled
        }
      }
    }));
  };

  const toggleChannel = (channel) => {
    updateChannelSetting(channel, 'enabled', !settings[channel].enabled);
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return '📧';
      case 'push': return '🔔';
      case 'inApp': return '💻';
      case 'sms': return '📱';
      default: return '⚙️';
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'email': return 'bg-blue-50 border-blue-200';
      case 'push': return 'bg-green-50 border-green-200';
      case 'inApp': return 'bg-purple-50 border-purple-200';
      case 'sms': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const notificationTypes = [
    { key: 'system', label: 'System Notifications', description: 'Important system updates and maintenance' },
    { key: 'alerts', label: 'Alerts', description: 'Critical alerts and warnings' },
    { key: 'messages', label: 'Messages', description: 'Direct messages and conversations' },
    { key: 'feedback', label: 'Feedback', description: 'Feedback responses and updates' },
    { key: 'marketing', label: 'Marketing', description: 'Promotional content and offers' }
  ];

  const channels = [
    { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
    { key: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
    { key: 'inApp', label: 'In-App Notifications', description: 'Notifications within the application' },
    { key: 'sms', label: 'SMS Notifications', description: 'Text message notifications' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notification Settings</h2>
          <p className="text-gray-600">Customize your notification preferences</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { key: 'general', label: 'General' },
            { key: 'channels', label: 'Channels' },
            { key: 'types', label: 'Notification Types' },
            { key: 'schedule', label: 'Schedule' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">General Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Enable All Notifications</h4>
                      <p className="text-sm text-gray-600">Master switch for all notification types</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Object.values(settings).every(channel => channel.enabled)}
                        onChange={() => {
                          const allEnabled = Object.values(settings).every(channel => channel.enabled);
                          Object.keys(settings).forEach(channel => {
                            updateChannelSetting(channel, 'enabled', !allEnabled);
                          });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Quiet Hours</h4>
                      <p className="text-sm text-gray-600">Pause notifications during specific hours</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Channel Settings */}
          {activeTab === 'channels' && (
            <div className="space-y-6">
              {channels.map(channel => (
                <div key={channel.key} className={`p-6 rounded-lg border ${getChannelColor(channel.key)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getChannelIcon(channel.key)}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{channel.label}</h3>
                        <p className="text-sm text-gray-600">{channel.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[channel.key].enabled}
                        onChange={() => toggleChannel(channel.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {settings[channel.key].enabled && (
                    <div className="space-y-3">
                      {notificationTypes.map(type => (
                        <div key={type.key} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{type.label}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings[channel.key].types[type.key]}
                              onChange={(e) => updateTypeSetting(channel.key, type.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}

                      {/* Channel-specific settings */}
                      {channel.key === 'email' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Frequency
                          </label>
                          <select
                            value={settings.email.frequency}
                            onChange={(e) => updateChannelSetting('email', 'frequency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="immediate">Immediate</option>
                            <option value="daily">Daily Digest</option>
                            <option value="weekly">Weekly Digest</option>
                          </select>
                        </div>
                      )}

                      {channel.key === 'inApp' && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">Sound</h4>
                              <p className="text-sm text-gray-600">Play notification sounds</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.inApp.sound}
                                onChange={(e) => updateChannelSetting('inApp', 'sound', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">Vibration</h4>
                              <p className="text-sm text-gray-600">Vibrate on notifications</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.inApp.vibration}
                                onChange={(e) => updateChannelSetting('inApp', 'vibration', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Notification Types */}
          {activeTab === 'types' && (
            <div className="space-y-6">
              {notificationTypes.map(type => (
                <div key={type.key} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {channels.map(channel => (
                      <div key={channel.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getChannelIcon(channel.key)}</span>
                          <span className="text-sm text-gray-700">{channel.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[channel.key].enabled && settings[channel.key].types[type.key]}
                            onChange={(e) => updateTypeSetting(channel.key, type.key, e.target.checked)}
                            disabled={!settings[channel.key].enabled}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Schedule Settings */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Quiet Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Allow urgent notifications during quiet hours</span>
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Notification Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Weekdays</h4>
                      <p className="text-sm text-gray-600">Monday to Friday</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Weekends</h4>
                      <p className="text-sm text-gray-600">Saturday and Sunday</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Settings Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Settings Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Object.values(settings).filter(channel => channel.enabled).length}
            </div>
            <div className="text-sm text-gray-600">Active Channels</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(settings).reduce((total, channel) => 
                total + Object.values(channel.types).filter(Boolean).length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">Enabled Types</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {settings.email.frequency}
            </div>
            <div className="text-sm text-gray-600">Email Frequency</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {settings.inApp.sound ? 'On' : 'Off'}
            </div>
            <div className="text-sm text-gray-600">Sound</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 