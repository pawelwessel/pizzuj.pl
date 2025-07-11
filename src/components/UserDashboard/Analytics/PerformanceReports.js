import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument
} from '../../../db/firebase';

const PerformanceReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'comprehensive',
    dateRange: '30',
    metrics: [],
    schedule: 'manual',
    recipients: []
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const reportsData = await getDocuments('performance_reports');
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async () => {
    setLoading(true);
    try {
      const reportData = {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending',
        userId: 'current_user_id', // Replace with actual user ID
        lastGenerated: null,
        nextScheduled: formData.schedule !== 'manual' ? calculateNextSchedule(formData.schedule) : null
      };

      await addDocument('performance_reports', reportData);
      setShowForm(false);
      setFormData({
        name: '',
        type: 'comprehensive',
        dateRange: '30',
        metrics: [],
        schedule: 'manual',
        recipients: []
      });
      loadReports();
    } catch (error) {
      console.error('Error creating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (reportId) => {
    setLoading(true);
    try {
      // Simulate report generation
      const reportData = await generateReportData(reportId);
      
      await updateDocument('performance_reports', reportId, {
        status: 'completed',
        lastGenerated: new Date().toISOString(),
        data: reportData
      });

      loadReports();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setLoading(true);
      try {
        await deleteDocument('performance_reports', reportId);
        loadReports();
      } catch (error) {
        console.error('Error deleting report:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const generateReportData = async (reportId) => {
    // Simulate generating comprehensive report data
    const analyticsData = await getDocuments('analytics');
    
    return {
      summary: {
        totalVisits: analyticsData.reduce((sum, item) => sum + (item.visits || 0), 0),
        uniqueVisitors: analyticsData.reduce((sum, item) => sum + (item.uniqueVisitors || 0), 0),
        pageViews: analyticsData.reduce((sum, item) => sum + (item.pageViews || 0), 0),
        avgSessionDuration: calculateAvgSessionDuration(analyticsData),
        bounceRate: calculateBounceRate(analyticsData),
        conversionRate: calculateConversionRate(analyticsData)
      },
      trends: generateTrends(analyticsData),
      topPages: generateTopPages(analyticsData),
      trafficSources: generateTrafficSources(analyticsData),
      geographicData: generateGeographicData(analyticsData),
      deviceData: generateDeviceData(analyticsData),
      recommendations: generateRecommendations(analyticsData)
    };
  };

  const calculateAvgSessionDuration = (data) => {
    const totalDuration = data.reduce((sum, item) => sum + (item.sessionDuration || 0), 0);
    const totalSessions = data.reduce((sum, item) => sum + (item.visits || 0), 0);
    return totalSessions > 0 ? totalDuration / totalSessions : 0;
  };

  const calculateBounceRate = (data) => {
    const totalBounces = data.reduce((sum, item) => sum + (item.bounces || 0), 0);
    const totalVisits = data.reduce((sum, item) => sum + (item.visits || 0), 0);
    return totalVisits > 0 ? (totalBounces / totalVisits) * 100 : 0;
  };

  const calculateConversionRate = (data) => {
    const totalConversions = data.reduce((sum, item) => sum + (item.conversions || 0), 0);
    const totalVisits = data.reduce((sum, item) => sum + (item.visits || 0), 0);
    return totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;
  };

  const generateTrends = (data) => {
    // Generate trend data for the last 30 days
    const trends = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = data.filter(item => 
        item.date && item.date.startsWith(dateStr)
      );
      
      trends.push({
        date: dateStr,
        visits: dayData.reduce((sum, item) => sum + (item.visits || 0), 0),
        pageViews: dayData.reduce((sum, item) => sum + (item.pageViews || 0), 0),
        conversions: dayData.reduce((sum, item) => sum + (item.conversions || 0), 0)
      });
    }
    
    return trends;
  };

  const generateTopPages = (data) => {
    const pageViews = data
      .filter(item => item.page && item.pageViews)
      .reduce((acc, item) => {
        const page = item.page;
        acc[page] = (acc[page] || 0) + item.pageViews;
        return acc;
      }, {});

    return Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  };

  const generateTrafficSources = (data) => {
    const sources = data
      .filter(item => item.source)
      .reduce((acc, item) => {
        const source = item.source;
        acc[source] = (acc[source] || 0) + (item.visits || 0);
        return acc;
      }, {});

    return Object.entries(sources)
      .map(([source, visits]) => ({ source, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
  };

  const generateGeographicData = (data) => {
    const countries = data
      .filter(item => item.country)
      .reduce((acc, item) => {
        const country = item.country;
        acc[country] = (acc[country] || 0) + (item.visits || 0);
        return acc;
      }, {});

    return Object.entries(countries)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
  };

  const generateDeviceData = (data) => {
    const devices = data
      .filter(item => item.deviceType)
      .reduce((acc, item) => {
        const device = item.deviceType;
        acc[device] = (acc[device] || 0) + (item.visits || 0);
        return acc;
      }, {});

    return Object.entries(devices)
      .map(([device, visits]) => ({ device, visits }))
      .sort((a, b) => b.visits - a.visits);
  };

  const generateRecommendations = (data) => {
    const recommendations = [];
    
    // Analyze bounce rate
    const bounceRate = calculateBounceRate(data);
    if (bounceRate > 70) {
      recommendations.push({
        type: 'warning',
        title: 'High Bounce Rate',
        description: 'Consider improving page content and user experience to reduce bounce rate.',
        priority: 'high'
      });
    }

    // Analyze page load times
    const slowPages = data.filter(item => item.loadTime && item.loadTime > 3);
    if (slowPages.length > 0) {
      recommendations.push({
        type: 'info',
        title: 'Slow Loading Pages',
        description: `${slowPages.length} pages are loading slowly. Consider optimizing images and code.`,
        priority: 'medium'
      });
    }

    // Analyze conversion rate
    const conversionRate = calculateConversionRate(data);
    if (conversionRate < 2) {
      recommendations.push({
        type: 'warning',
        title: 'Low Conversion Rate',
        description: 'Consider improving call-to-action buttons and user flow to increase conversions.',
        priority: 'high'
      });
    }

    return recommendations;
  };

  const calculateNextSchedule = (schedule) => {
    const now = new Date();
    switch (schedule) {
      case 'daily':
        return new Date(now.setDate(now.getDate() + 1)).toISOString();
      case 'weekly':
        return new Date(now.setDate(now.getDate() + 7)).toISOString();
      case 'monthly':
        return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'comprehensive': return '📊';
      case 'traffic': return '👥';
      case 'conversion': return '💰';
      case 'engagement': return '📈';
      case 'technical': return '⚙️';
      default: return '📋';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Performance Reports</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Report
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Reports List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getReportTypeIcon(report.type)}</span>
                    <h3 className="text-lg font-semibold">{report.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>Type: {report.type}</p>
                  <p>Date Range: {report.dateRange} days</p>
                  <p>Schedule: {report.schedule}</p>
                  {report.lastGenerated && (
                    <p>Last Generated: {formatDate(report.lastGenerated)}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {report.status === 'pending' && (
                    <button
                      onClick={() => handleGenerateReport(report.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Generate
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Create Report Form */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Create New Report</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Report Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter report name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Report Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="comprehensive">Comprehensive</option>
                      <option value="traffic">Traffic Analysis</option>
                      <option value="conversion">Conversion Analysis</option>
                      <option value="engagement">Engagement Analysis</option>
                      <option value="technical">Technical Performance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <select
                      value={formData.dateRange}
                      onChange={(e) => setFormData({...formData, dateRange: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="7">Last 7 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 90 days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule
                    </label>
                    <select
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="manual">Manual</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleCreateReport}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Report
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Report Details Modal */}
          {selectedReport && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{selectedReport.name}</h3>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {selectedReport.data ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800">Total Visits</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedReport.data.summary.totalVisits.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-green-800">Page Views</h4>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedReport.data.summary.pageViews.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-purple-800">Conversion Rate</h4>
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedReport.data.summary.conversionRate.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    {selectedReport.data.recommendations.length > 0 && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-3">Recommendations</h4>
                        <div className="space-y-2">
                          {selectedReport.data.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-yellow-600">⚠️</span>
                              <div>
                                <p className="font-medium">{rec.title}</p>
                                <p className="text-sm text-gray-600">{rec.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Top Pages */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-3">Top Pages</h4>
                      <div className="space-y-2">
                        {selectedReport.data.topPages.map((page, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{page.page}</span>
                            <span className="text-sm font-medium">{page.views.toLocaleString()} views</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No report data available</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerformanceReports; 