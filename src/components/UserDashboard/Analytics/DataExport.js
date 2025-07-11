
import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  getDocument 
} from '../../../db/firebase';

const DataExport = () => {
  const [exportData, setExportData] = useState({
    analytics: [],
    userInteractions: [],
    performanceData: [],
    customData: []
  });
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: '30',
    dataTypes: ['visits', 'pageviews', 'conversions'],
    includeMetadata: true,
    compression: false
  });
  const [exportHistory, setExportHistory] = useState([]);
  const [selectedExport, setSelectedExport] = useState(null);

  useEffect(() => {
    loadExportData();
    loadExportHistory();
  }, [exportConfig.dateRange]);

  const loadExportData = async () => {
    setLoading(true);
    try {
      const analyticsData = await getDocuments('analytics');
      const userInteractions = await getDocuments('user_interactions');
      const performanceData = await getDocuments('performance_reports');
      
      setExportData({
        analytics: analyticsData,
        userInteractions,
        performanceData,
        customData: []
      });
    } catch (error) {
      console.error('Error loading export data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadExportHistory = async () => {
    try {
      const history = await getDocuments('export_history');
      setExportHistory(history);
    } catch (error) {
      console.error('Error loading export history:', error);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const data = await prepareExportData();
      const fileName = generateFileName();
      
      switch (exportConfig.format) {
        case 'csv':
          exportToCSV(data, fileName);
          break;
        case 'json':
          exportToJSON(data, fileName);
          break;
        case 'xlsx':
          exportToXLSX(data, fileName);
          break;
        case 'pdf':
          exportToPDF(data, fileName);
          break;
        default:
          exportToCSV(data, fileName);
      }

      // Save export history
      await saveExportHistory(fileName, exportConfig);
      loadExportHistory();
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setExporting(false);
    }
  };

  const prepareExportData = async () => {
    const data = {
      metadata: {
        exportDate: new Date().toISOString(),
        dateRange: exportConfig.dateRange,
        dataTypes: exportConfig.dataTypes,
        totalRecords: 0
      },
      analytics: [],
      userInteractions: [],
      performanceData: []
    };

    // Filter and process analytics data
    if (exportConfig.dataTypes.includes('visits')) {
      data.analytics = exportData.analytics
        .filter(item => item.visits)
        .map(item => ({
          date: item.date,
          visits: item.visits,
          uniqueVisitors: item.uniqueVisitors,
          pageViews: item.pageViews,
          source: item.source,
          country: item.country,
          deviceType: item.deviceType
        }));
    }

    if (exportConfig.dataTypes.includes('pageviews')) {
      const pageViews = exportData.analytics
        .filter(item => item.pageViews)
        .map(item => ({
          page: item.page,
          views: item.pageViews,
          timeOnPage: item.timeOnPage,
          bounceRate: item.bounceRate
        }));
      data.analytics.push(...pageViews);
    }

    if (exportConfig.dataTypes.includes('conversions')) {
      const conversions = exportData.analytics
        .filter(item => item.conversions)
        .map(item => ({
          date: item.date,
          conversions: item.conversions,
          conversionRate: item.conversionRate,
          revenue: item.revenue
        }));
      data.analytics.push(...conversions);
    }

    // Add user interactions if selected
    if (exportConfig.dataTypes.includes('interactions')) {
      data.userInteractions = exportData.userInteractions.map(item => ({
        type: item.type,
        element: item.element,
        page: item.page,
        timestamp: item.timestamp,
        userId: item.userId
      }));
    }

    // Add performance data if selected
    if (exportConfig.dataTypes.includes('performance')) {
      data.performanceData = exportData.performanceData.map(item => ({
        name: item.name,
        type: item.type,
        status: item.status,
        createdAt: item.createdAt,
        lastGenerated: item.lastGenerated
      }));
    }

    data.metadata.totalRecords = data.analytics.length + data.userInteractions.length + data.performanceData.length;
    return data;
  };

  const generateFileName = () => {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    return `analytics-export-${date}-${time}`;
  };

  const exportToCSV = (data, fileName) => {
    const csvContent = convertToCSV(data);
    downloadFile(csvContent, `${fileName}.csv`, 'text/csv');
  };

  const exportToJSON = (data, fileName) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${fileName}.json`, 'application/json');
  };

  const exportToXLSX = (data, fileName) => {
    // Simulate XLSX export (in real implementation, use a library like xlsx)
    const csvContent = convertToCSV(data);
    downloadFile(csvContent, `${fileName}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  };

  const exportToPDF = (data, fileName) => {
    // Simulate PDF export (in real implementation, use a library like jsPDF)
    const pdfContent = convertToPDF(data);
    downloadFile(pdfContent, `${fileName}.pdf`, 'application/pdf');
  };

  const convertToCSV = (data) => {
    let csv = '';
    
    // Add metadata if enabled
    if (exportConfig.includeMetadata) {
      csv += 'Metadata\n';
      csv += `Export Date,${data.metadata.exportDate}\n`;
      csv += `Date Range,${data.metadata.dateRange} days\n`;
      csv += `Data Types,${data.metadata.dataTypes.join(', ')}\n`;
      csv += `Total Records,${data.metadata.totalRecords}\n\n`;
    }

    // Add analytics data
    if (data.analytics.length > 0) {
      csv += 'Analytics Data\n';
      const headers = Object.keys(data.analytics[0]).join(',');
      csv += headers + '\n';
      
      data.analytics.forEach(row => {
        const values = Object.values(row).map(value => 
          typeof value === 'string' ? `"${value}"` : value
        ).join(',');
        csv += values + '\n';
      });
      csv += '\n';
    }

    // Add user interactions
    if (data.userInteractions.length > 0) {
      csv += 'User Interactions\n';
      const headers = Object.keys(data.userInteractions[0]).join(',');
      csv += headers + '\n';
      
      data.userInteractions.forEach(row => {
        const values = Object.values(row).map(value => 
          typeof value === 'string' ? `"${value}"` : value
        ).join(',');
        csv += values + '\n';
      });
      csv += '\n';
    }

    // Add performance data
    if (data.performanceData.length > 0) {
      csv += 'Performance Data\n';
      const headers = Object.keys(data.performanceData[0]).join(',');
      csv += headers + '\n';
      
      data.performanceData.forEach(row => {
        const values = Object.values(row).map(value => 
          typeof value === 'string' ? `"${value}"` : value
        ).join(',');
        csv += values + '\n';
      });
    }

    return csv;
  };

  const convertToPDF = (data) => {
    // Simple PDF content simulation
    let pdfContent = 'PDF Export\n\n';
    pdfContent += `Export Date: ${data.metadata.exportDate}\n`;
    pdfContent += `Date Range: ${data.metadata.dateRange} days\n`;
    pdfContent += `Total Records: ${data.metadata.totalRecords}\n\n`;
    
    if (data.analytics.length > 0) {
      pdfContent += 'Analytics Data:\n';
      data.analytics.slice(0, 10).forEach(item => {
        pdfContent += `- ${JSON.stringify(item)}\n`;
      });
    }
    
    return pdfContent;
  };

  const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const saveExportHistory = async (fileName, config) => {
    try {
      const historyEntry = {
        fileName,
        format: config.format,
        dateRange: config.dateRange,
        dataTypes: config.dataTypes,
        exportedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };
      
      // In a real implementation, save to Firebase
      console.log('Export history saved:', historyEntry);
    } catch (error) {
      console.error('Error saving export history:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'csv': return '📊';
      case 'json': return '📄';
      case 'xlsx': return '📈';
      case 'pdf': return '📋';
      default: return '📁';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Export</h2>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {exporting ? 'Exporting...' : 'Export Data'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading export data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Export Configuration */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Export Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select
                  value={exportConfig.format}
                  onChange={(e) => setExportConfig({...exportConfig, format: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={exportConfig.dateRange}
                  onChange={(e) => setExportConfig({...exportConfig, dateRange: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
              </div>

              {/* Data Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Types
                </label>
                <div className="space-y-2">
                  {['visits', 'pageviews', 'conversions', 'interactions', 'performance'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportConfig.dataTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setExportConfig({
                              ...exportConfig,
                              dataTypes: [...exportConfig.dataTypes, type]
                            });
                          } else {
                            setExportConfig({
                              ...exportConfig,
                              dataTypes: exportConfig.dataTypes.filter(t => t !== type)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportConfig.includeMetadata}
                      onChange={(e) => setExportConfig({...exportConfig, includeMetadata: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">Include Metadata</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportConfig.compression}
                      onChange={(e) => setExportConfig({...exportConfig, compression: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">Compress File</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Data Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Analytics Data</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {exportData.analytics.length.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">records available</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">User Interactions</h4>
                <p className="text-2xl font-bold text-green-600">
                  {exportData.userInteractions.length.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">records available</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Performance Data</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {exportData.performanceData.length.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">records available</p>
              </div>
            </div>
          </div>

          {/* Export History */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Export History</h3>
            
            {exportHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No export history available</p>
            ) : (
              <div className="space-y-3">
                {exportHistory.slice(0, 10).map((exportItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getFormatIcon(exportItem.format)}</span>
                      <div>
                        <p className="text-sm font-medium">{exportItem.fileName}</p>
                        <p className="text-xs text-gray-600">
                          {exportItem.dataTypes.join(', ')} • {exportItem.dateRange} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(exportItem.exportedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(exportItem.exportedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Total Exports</h4>
              <p className="text-2xl font-bold text-blue-600">
                {exportHistory.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">This Month</h4>
              <p className="text-2xl font-bold text-green-600">
                {exportHistory.filter(item => {
                  const exportDate = new Date(item.exportedAt);
                  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                  return exportDate >= monthStart;
                }).length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800">Most Used Format</h4>
              <p className="text-2xl font-bold text-purple-600">
                {(() => {
                  const formatCounts = exportHistory.reduce((acc, item) => {
                    acc[item.format] = (acc[item.format] || 0) + 1;
                    return acc;
                  }, {});
                  const mostUsed = Object.entries(formatCounts).sort((a, b) => b[1] - a[1])[0];
                  return mostUsed ? mostUsed[0].toUpperCase() : 'N/A';
                })()}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-orange-800">Last Export</h4>
              <p className="text-2xl font-bold text-orange-600">
                {exportHistory.length > 0 
                  ? new Date(exportHistory[0].exportedAt).toLocaleDateString()
                  : 'Never'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataExport; 