import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  getDocument 
} from '../../../db/firebase';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    conversionRate: 0,
    revenue: 0,
    topPages: [],
    trafficSources: [],
    deviceTypes: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30'); // 7, 30, 90 days
  const [selectedMetric, setSelectedMetric] = useState('visits');

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Load analytics data from Firebase
      const analyticsData = await getDocuments('analytics');
      const userAnalytics = await getDocument('user_analytics', 'current_user_id');
      
      // Process and calculate analytics
      const processedData = processAnalyticsData(analyticsData, userAnalytics);
      setAnalytics(processedData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (analyticsData, userAnalytics) => {
    // Calculate total visits
    const totalVisits = analyticsData.reduce((sum, item) => sum + (item.visits || 0), 0);
    
    // Calculate unique visitors
    const uniqueVisitors = analyticsData.reduce((sum, item) => sum + (item.uniqueVisitors || 0), 0);
    
    // Calculate page views
    const pageViews = analyticsData.reduce((sum, item) => sum + (item.pageViews || 0), 0);
    
    // Calculate bounce rate
    const totalBounces = analyticsData.reduce((sum, item) => sum + (item.bounces || 0), 0);
    const bounceRate = totalVisits > 0 ? (totalBounces / totalVisits) * 100 : 0;
    
    // Calculate average session duration
    const totalDuration = analyticsData.reduce((sum, item) => sum + (item.sessionDuration || 0), 0);
    const avgSessionDuration = totalVisits > 0 ? totalDuration / totalVisits : 0;
    
    // Calculate conversion rate
    const totalConversions = analyticsData.reduce((sum, item) => sum + (item.conversions || 0), 0);
    const conversionRate = totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;
    
    // Calculate revenue
    const revenue = analyticsData.reduce((sum, item) => sum + (item.revenue || 0), 0);
    
    // Get top pages
    const topPages = analyticsData
      .filter(item => item.pageViews)
      .sort((a, b) => (b.pageViews || 0) - (a.pageViews || 0))
      .slice(0, 5)
      .map(item => ({
        page: item.page || 'Unknown',
        views: item.pageViews || 0,
        percentage: ((item.pageViews || 0) / pageViews) * 100
      }));
    
    // Get traffic sources
    const trafficSources = analyticsData
      .filter(item => item.source)
      .reduce((acc, item) => {
        const source = item.source || 'Unknown';
        acc[source] = (acc[source] || 0) + (item.visits || 0);
        return acc;
      }, {});
    
    const trafficSourcesArray = Object.entries(trafficSources)
      .map(([source, visits]) => ({
        source,
        visits,
        percentage: (visits / totalVisits) * 100
      }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);
    
    // Get device types
    const deviceTypes = analyticsData
      .filter(item => item.deviceType)
      .reduce((acc, item) => {
        const device = item.deviceType || 'Unknown';
        acc[device] = (acc[device] || 0) + (item.visits || 0);
        return acc;
      }, {});
    
    const deviceTypesArray = Object.entries(deviceTypes)
      .map(([device, visits]) => ({
        device,
        visits,
        percentage: (visits / totalVisits) * 100
      }))
      .sort((a, b) => b.visits - a.visits);
    
    // Get recent activity
    const recentActivity = analyticsData
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
      .map(item => ({
        action: item.action || 'Visit',
        page: item.page || 'Unknown',
        timestamp: item.timestamp,
        user: item.user || 'Anonymous'
      }));

    return {
      totalVisits,
      uniqueVisitors,
      pageViews,
      bounceRate: Math.round(bounceRate * 100) / 100,
      avgSessionDuration: Math.round(avgSessionDuration),
      conversionRate: Math.round(conversionRate * 100) / 100,
      revenue: Math.round(revenue * 100) / 100,
      topPages,
      trafficSources: trafficSourcesArray,
      deviceTypes: deviceTypesArray,
      recentActivity
    };
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'visits': return '👥';
      case 'pageviews': return '📄';
      case 'bounce': return '↩️';
      case 'duration': return '⏱️';
      case 'conversion': return '💰';
      case 'revenue': return '💵';
      default: return '📊';
    }
  };

  const metrics = [
    { key: 'visits', label: 'Total Visits', value: analytics.totalVisits, color: 'blue' },
    { key: 'pageviews', label: 'Page Views', value: analytics.pageViews, color: 'green' },
    { key: 'bounce', label: 'Bounce Rate', value: `${analytics.bounceRate}%`, color: 'yellow' },
    { key: 'duration', label: 'Avg Session', value: formatDuration(analytics.avgSessionDuration), color: 'purple' },
    { key: 'conversion', label: 'Conversion Rate', value: `${analytics.conversionRate}%`, color: 'indigo' },
    { key: 'revenue', label: 'Revenue', value: formatCurrency(analytics.revenue), color: 'emerald' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric) => (
              <div key={metric.key} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <span className="text-3xl">{getMetricIcon(metric.key)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Pages */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
              {analytics.topPages.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No page data available</p>
              ) : (
                <div className="space-y-3">
                  {analytics.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 w-8">{index + 1}</span>
                        <span className="text-sm text-gray-600 truncate">{page.page}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{page.views}</span>
                        <span className="text-xs text-gray-500">({page.percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Traffic Sources */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
              {analytics.trafficSources.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No traffic source data available</p>
              ) : (
                <div className="space-y-3">
                  {analytics.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 w-8">{index + 1}</span>
                        <span className="text-sm text-gray-600 capitalize">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{source.visits}</span>
                        <span className="text-xs text-gray-500">({source.percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Device Types */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Device Types</h3>
              {analytics.deviceTypes.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No device data available</p>
              ) : (
                <div className="space-y-3">
                  {analytics.deviceTypes.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 w-8">{index + 1}</span>
                        <span className="text-sm text-gray-600 capitalize">{device.device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{device.visits}</span>
                        <span className="text-xs text-gray-500">({device.percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              {analytics.recentActivity.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{activity.action}</span>
                        <span className="text-xs text-gray-500">on</span>
                        <span className="text-sm font-medium text-gray-900">{activity.page}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Export Report
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Generate Insights
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Set Alerts
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard; 