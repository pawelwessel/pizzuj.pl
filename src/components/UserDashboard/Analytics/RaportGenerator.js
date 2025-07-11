import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument
} from '../../../db/firebase';

const RaportGenerator = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'comprehensive',
    schedule: 'manual',
    frequency: 'daily',
    recipients: [],
    dataSources: ['analytics', 'user_interactions'],
    metrics: ['visits', 'conversions', 'engagement'],
    format: 'pdf',
    autoGenerate: false,
    emailNotification: false
  });
  const [templates, setTemplates] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    loadReports();
    loadTemplates();
    loadAnalyticsData();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const reportsData = await getDocuments('raport_reports');
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const templatesData = await getDocuments('report_templates');
      setTemplates(templatesData);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const loadAnalyticsData = async () => {
    try {
      const analytics = await getDocuments('analytics');
      const userInteractions = await getDocuments('user_interactions');
      const performanceData = await getDocuments('performance_reports');
      
      setAnalyticsData({
        analytics,
        userInteractions,
        performanceData
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
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
        nextScheduled: formData.schedule !== 'manual' ? calculateNextSchedule(formData.frequency) : null,
        generatedReports: [],
        template: formData.template || 'default'
      };

      await addDocument('raport_reports', reportData);
      setShowForm(false);
      setFormData({
        name: '',
        type: 'comprehensive',
        schedule: 'manual',
        frequency: 'daily',
        recipients: [],
        dataSources: ['analytics', 'user_interactions'],
        metrics: ['visits', 'conversions', 'engagement'],
        format: 'pdf',
        autoGenerate: false,
        emailNotification: false
      });
      loadReports();
    } catch (error) {
      console.error('Error creating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (reportId) => {
    setGenerating(true);
    try {
      const report = reports.find(r => r.id === reportId);
      if (!report) return;

      const reportContent = await generateReportContent(report);
      const fileName = generateFileName(report.name);
      
      // Save generated report
      const generatedReport = {
        reportId,
        fileName,
        content: reportContent,
        generatedAt: new Date().toISOString(),
        format: report.format,
        size: JSON.stringify(reportContent).length
      };

      await addDocument('generated_reports', generatedReport);

      // Update report status
      await updateDocument('raport_reports', reportId, {
        status: 'completed',
        lastGenerated: new Date().toISOString(),
        nextScheduled: report.schedule !== 'manual' ? calculateNextSchedule(report.frequency) : null
      });

      // Send email notification if enabled
      if (report.emailNotification && report.recipients.length > 0) {
        await sendEmailNotification(report, generatedReport);
      }

      loadReports();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setLoading(true);
      try {
        await deleteDocument('raport_reports', reportId);
        loadReports();
      } catch (error) {
        console.error('Error deleting report:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const generateReportContent = async (report) => {
    const content = {
      metadata: {
        reportName: report.name,
        generatedAt: new Date().toISOString(),
        dataSources: report.dataSources,
        metrics: report.metrics,
        schedule: report.schedule,
        frequency: report.frequency
      },
      summary: await generateSummary(report),
      detailedData: await generateDetailedData(report),
      charts: await generateCharts(report),
      insights: await generateInsights(report),
      recommendations: await generateRecommendations(report)
    };

    return content;
  };

  const generateSummary = async (report) => {
    const { analytics } = analyticsData;
    
    const totalVisits = analytics.reduce((sum, item) => sum + (item.visits || 0), 0);
    const uniqueVisitors = analytics.reduce((sum, item) => sum + (item.uniqueVisitors || 0), 0);
    const pageViews = analytics.reduce((sum, item) => sum + (item.pageViews || 0), 0);
    const conversions = analytics.reduce((sum, item) => sum + (item.conversions || 0), 0);
    
    const avgSessionDuration = analytics.reduce((sum, item) => sum + (item.sessionDuration || 0), 0) / analytics.length;
    const bounceRate = analytics.reduce((sum, item) => sum + (item.bounces || 0), 0) / totalVisits * 100;
    const conversionRate = totalVisits > 0 ? (conversions / totalVisits) * 100 : 0;

    return {
      totalVisits,
      uniqueVisitors,
      pageViews,
      conversions,
      avgSessionDuration: Math.round(avgSessionDuration),
      bounceRate: Math.round(bounceRate * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
      period: report.frequency
    };
  };

  const generateDetailedData = async (report) => {
    const { analytics, userInteractions } = analyticsData;
    
    const detailedData = {
      topPages: [],
      trafficSources: [],
      geographicData: [],
      deviceData: [],
      userInteractions: []
    };

    // Top pages
    const pageViews = analytics
      .filter(item => item.pageViews)
      .reduce((acc, item) => {
        acc[item.page] = (acc[item.page] || 0) + item.pageViews;
        return acc;
      }, {});

    detailedData.topPages = Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Traffic sources
    const sources = analytics
      .filter(item => item.source)
      .reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + (item.visits || 0);
        return acc;
      }, {});

    detailedData.trafficSources = Object.entries(sources)
      .map(([source, visits]) => ({ source, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Geographic data
    const countries = analytics
      .filter(item => item.country)
      .reduce((acc, item) => {
        acc[item.country] = (acc[item.country] || 0) + (item.visits || 0);
        return acc;
      }, {});

    detailedData.geographicData = Object.entries(countries)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Device data
    const devices = analytics
      .filter(item => item.deviceType)
      .reduce((acc, item) => {
        acc[item.deviceType] = (acc[item.deviceType] || 0) + (item.visits || 0);
        return acc;
      }, {});

    detailedData.deviceData = Object.entries(devices)
      .map(([device, visits]) => ({ device, visits }))
      .sort((a, b) => b.visits - a.visits);

    // User interactions
    if (report.dataSources.includes('user_interactions')) {
      detailedData.userInteractions = userInteractions
        .map(item => ({
          type: item.type,
          element: item.element,
          page: item.page,
          timestamp: item.timestamp
        }))
        .slice(0, 50);
    }

    return detailedData;
  };

  const generateCharts = async (report) => {
    const { analytics } = analyticsData;
    
    // Daily trends for the last 30 days
    const dailyTrends = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = analytics.filter(item => 
        item.date && item.date.startsWith(dateStr)
      );
      
      dailyTrends.push({
        date: dateStr,
        visits: dayData.reduce((sum, item) => sum + (item.visits || 0), 0),
        pageViews: dayData.reduce((sum, item) => sum + (item.pageViews || 0), 0),
        conversions: dayData.reduce((sum, item) => sum + (item.conversions || 0), 0)
      });
    }

    // Hourly distribution
    const hourlyData = Array.from({ length: 24 }, (_, hour) => {
      const hourData = analytics.filter(item => item.hour === hour);
      return {
        hour: hour.toString().padStart(2, '0'),
        visits: hourData.reduce((sum, item) => sum + (item.visits || 0), 0)
      };
    });

    return {
      dailyTrends,
      hourlyData,
      topPages: await generateDetailedData(report).then(data => data.topPages),
      trafficSources: await generateDetailedData(report).then(data => data.trafficSources)
    };
  };

  const generateInsights = async (report) => {
    const { analytics } = analyticsData;
    const insights = [];

    // Calculate key metrics
    const totalVisits = analytics.reduce((sum, item) => sum + (item.visits || 0), 0);
    const totalConversions = analytics.reduce((sum, item) => sum + (item.conversions || 0), 0);
    const avgSessionDuration = analytics.reduce((sum, item) => sum + (item.sessionDuration || 0), 0) / analytics.length;
    const bounceRate = analytics.reduce((sum, item) => sum + (item.bounces || 0), 0) / totalVisits * 100;

    // Generate insights based on data
    if (bounceRate > 70) {
      insights.push({
        type: 'warning',
        title: 'High Bounce Rate',
        description: `Your bounce rate is ${bounceRate.toFixed(1)}%, which is above the recommended 50%. Consider improving page content and user experience.`,
        priority: 'high'
      });
    }

    if (avgSessionDuration < 60) {
      insights.push({
        type: 'info',
        title: 'Low Session Duration',
        description: `Average session duration is ${Math.round(avgSessionDuration)} seconds. Consider adding more engaging content.`,
        priority: 'medium'
      });
    }

    const conversionRate = totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;
    if (conversionRate < 2) {
      insights.push({
        type: 'warning',
        title: 'Low Conversion Rate',
        description: `Conversion rate is ${conversionRate.toFixed(2)}%. Consider optimizing call-to-action buttons and user flow.`,
        priority: 'high'
      });
    }

    // Traffic source insights
    const sources = analytics
      .filter(item => item.source)
      .reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const topSource = Object.entries(sources).sort((a, b) => b[1] - a[1])[0];
    if (topSource) {
      insights.push({
        type: 'success',
        title: 'Top Traffic Source',
        description: `${topSource[0]} is your top traffic source with ${topSource[1]} visits.`,
        priority: 'low'
      });
    }

    return insights;
  };

  const generateRecommendations = async (report) => {
    const recommendations = [];

    // Performance recommendations
    recommendations.push({
      category: 'Performance',
      title: 'Optimize Page Load Speed',
      description: 'Consider compressing images and optimizing code to improve page load times.',
      impact: 'high',
      effort: 'medium'
    });

    recommendations.push({
      category: 'Content',
      title: 'Add More Engaging Content',
      description: 'Create more interactive content to increase user engagement and session duration.',
      impact: 'medium',
      effort: 'high'
    });

    recommendations.push({
      category: 'Conversion',
      title: 'Improve Call-to-Action Buttons',
      description: 'Make CTA buttons more prominent and compelling to increase conversion rates.',
      impact: 'high',
      effort: 'low'
    });

    recommendations.push({
      category: 'SEO',
      title: 'Optimize for Search Engines',
      description: 'Improve meta tags, headings, and content structure for better search visibility.',
      impact: 'medium',
      effort: 'medium'
    });

    return recommendations;
  };

  const calculateNextSchedule = (frequency) => {
    const now = new Date();
    switch (frequency) {
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

  const generateFileName = (reportName) => {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    return `${reportName.toLowerCase().replace(/\s+/g, '-')}-${date}-${time}`;
  };

  const sendEmailNotification = async (report, generatedReport) => {
    // Simulate email sending
    console.log('Sending email notification:', {
      recipients: report.recipients,
      reportName: report.name,
      fileName: generatedReport.fileName,
      generatedAt: generatedReport.generatedAt
    });
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Raport Generator</h2>
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
                  <p>Schedule: {report.schedule}</p>
                  {report.schedule !== 'manual' && <p>Frequency: {report.frequency}</p>}
                  <p>Format: {report.format}</p>
                  {report.lastGenerated && (
                    <p>Last Generated: {formatDate(report.lastGenerated)}</p>
                  )}
                  {report.nextScheduled && (
                    <p>Next Scheduled: {formatDate(report.nextScheduled)}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {report.status === 'pending' && (
                    <button
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={generating}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {generating ? 'Generating...' : 'Generate'}
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
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Create New Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Schedule
                    </label>
                    <select
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="manual">Manual</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  {formData.schedule === 'scheduled' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Format
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({...formData, format: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="pdf">PDF</option>
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                      <option value="xlsx">Excel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Sources
                    </label>
                    <div className="space-y-1">
                      {['analytics', 'user_interactions', 'performance_reports'].map(source => (
                        <label key={source} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.dataSources.includes(source)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  dataSources: [...formData.dataSources, source]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  dataSources: formData.dataSources.filter(s => s !== source)
                                });
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm capitalize">{source.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Metrics
                    </label>
                    <div className="space-y-1">
                      {['visits', 'conversions', 'engagement', 'performance', 'technical'].map(metric => (
                        <label key={metric} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.metrics.includes(metric)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  metrics: [...formData.metrics, metric]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  metrics: formData.metrics.filter(m => m !== metric)
                                });
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm capitalize">{metric}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.autoGenerate}
                      onChange={(e) => setFormData({...formData, autoGenerate: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">Auto-generate on schedule</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotification}
                      onChange={(e) => setFormData({...formData, emailNotification: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">Send email notification</span>
                  </label>
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

                <div className="space-y-6">
                  {/* Report Configuration */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Report Configuration</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {selectedReport.type}
                      </div>
                      <div>
                        <span className="font-medium">Schedule:</span> {selectedReport.schedule}
                      </div>
                      <div>
                        <span className="font-medium">Format:</span> {selectedReport.format}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> {selectedReport.status}
                      </div>
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Data Sources</h4>
                    <div className="flex gap-2">
                      {selectedReport.dataSources.map(source => (
                        <span key={source} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {source.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Metrics</h4>
                    <div className="flex gap-2">
                      {selectedReport.metrics.map(metric => (
                        <span key={metric} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Generated Reports */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Generated Reports</h4>
                    {selectedReport.generatedReports && selectedReport.generatedReports.length > 0 ? (
                      <div className="space-y-2">
                        {selectedReport.generatedReports.map((report, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                            <span className="text-sm">{report.fileName}</span>
                            <span className="text-xs text-gray-500">
                              {formatDate(report.generatedAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No reports generated yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaportGenerator; 