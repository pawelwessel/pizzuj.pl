import React, { useState, useEffect } from 'react';
import { getDocuments, getDocument } from '../../../db/firebase';

const PerformanceCharts = () => {
  const [chartData, setChartData] = useState({
    visitsOverTime: [],
    revenueData: [],
    trafficSources: [],
    deviceTypes: [],
    pageViews: [],
    conversionRates: []
  });
  const [loading, setLoading] = useState(false);
  const [selectedChart, setSelectedChart] = useState('visits');
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    loadChartData();
  }, [dateRange]);

  const loadChartData = async () => {
    setLoading(true);
    try {
      const analyticsData = await getDocuments('analytics');
      const userAnalytics = await getDocument('user_analytics', 'current_user_id');
      
      const processedData = processChartData(analyticsData, userAnalytics);
      setChartData(processedData);
    } catch (error) {
      console.error('Error loading chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (analyticsData, userAnalytics) => {
    // Process visits over time
    const visitsOverTime = analyticsData
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map((item, index) => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        visits: item.visits || 0,
        uniqueVisitors: item.uniqueVisitors || 0
      }));

    // Process revenue data
    const revenueData = analyticsData
      .filter(item => item.revenue)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(item => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        revenue: item.revenue || 0
      }));

    // Process traffic sources for pie chart
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
        percentage: (visits / Object.values(trafficSources).reduce((a, b) => a + b, 0)) * 100
      }))
      .sort((a, b) => b.visits - a.visits);

    // Process device types
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
        percentage: (visits / Object.values(deviceTypes).reduce((a, b) => a + b, 0)) * 100
      }))
      .sort((a, b) => b.visits - a.visits);

    // Process page views
    const pageViews = analyticsData
      .filter(item => item.pageViews)
      .sort((a, b) => (b.pageViews || 0) - (a.pageViews || 0))
      .slice(0, 8)
      .map(item => ({
        page: item.page || 'Unknown',
        views: item.pageViews || 0
      }));

    // Process conversion rates
    const conversionRates = analyticsData
      .filter(item => item.conversions !== undefined)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(item => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        rate: item.conversions && item.visits ? (item.conversions / item.visits) * 100 : 0
      }));

    return {
      visitsOverTime,
      revenueData,
      trafficSources: trafficSourcesArray,
      deviceTypes: deviceTypesArray,
      pageViews,
      conversionRates
    };
  };

  // Chart components
  const LineChart = ({ data, title, color = '#3B82F6', height = 200 }) => {
    if (!data || data.length === 0) return <div className="text-center text-gray-500 py-8">No data available</div>;

    const maxValue = Math.max(...data.map(d => d.visits || d.revenue || d.rate));
    const minValue = Math.min(...data.map(d => d.visits || d.revenue || d.rate));
    const range = maxValue - minValue;

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = range > 0 ? 100 - ((point.visits || point.revenue || point.rate) - minValue) / range * 100 : 50;
      return `${x}%,${y}%`;
    }).join(' ');

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="relative" style={{ height }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="2"
              points={points}
            />
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = range > 0 ? 100 - ((point.visits || point.revenue || point.rate) - minValue) / range * 100 : 50;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill={color}
                />
              );
            })}
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            {data.map((point, index) => (
              <span key={index} className="transform -rotate-45 origin-left">
                {point.date}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const BarChart = ({ data, title, color = '#10B981', height = 200 }) => {
    if (!data || data.length === 0) return <div className="text-center text-gray-500 py-8">No data available</div>;

    const maxValue = Math.max(...data.map(d => d.views || d.visits));
    const barWidth = 100 / data.length;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="relative" style={{ height }}>
          <div className="flex items-end h-full space-x-1">
            {data.map((item, index) => {
              const height = maxValue > 0 ? (item.views || item.visits) / maxValue * 100 : 0;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${height}%`,
                      backgroundColor: color,
                      minHeight: '4px'
                    }}
                  />
                  <div className="text-xs text-gray-600 mt-1 text-center transform -rotate-45 origin-center">
                    {item.page || item.source || item.device}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const PieChart = ({ data, title, height = 200 }) => {
    if (!data || data.length === 0) return <div className="text-center text-gray-500 py-8">No data available</div>;

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
    const total = data.reduce((sum, item) => sum + item.visits, 0);
    
    let currentAngle = 0;
    const segments = data.map((item, index) => {
      const percentage = total > 0 ? item.visits / total : 0;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      const x1 = 50 + 40 * Math.cos(startAngle * Math.PI / 180);
      const y1 = 50 + 40 * Math.sin(startAngle * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos((startAngle + angle) * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin((startAngle + angle) * Math.PI / 180);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      return {
        path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
        color: colors[index % colors.length],
        label: item.source || item.device,
        percentage: Math.round(percentage * 100)
      };
    });

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex items-center">
          <div className="relative" style={{ width: height, height }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={segment.path}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
          <div className="ml-6 flex-1">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-center mb-2">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-gray-700">{segment.label}</span>
                <span className="text-sm text-gray-500 ml-auto">{segment.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AreaChart = ({ data, title, color = '#8B5CF6', height = 200 }) => {
    if (!data || data.length === 0) return <div className="text-center text-gray-500 py-8">No data available</div>;

    const maxValue = Math.max(...data.map(d => d.visits || d.revenue || d.rate));
    const minValue = Math.min(...data.map(d => d.visits || d.revenue || d.rate));
    const range = maxValue - minValue;

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = range > 0 ? 100 - ((point.visits || point.revenue || point.rate) - minValue) / range * 100 : 50;
      return `${x},${y}`;
    });

    const areaPath = `M 0,100 ${points.map(p => `L ${p}`).join(' ')} L 100,100 Z`;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="relative" style={{ height }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d={areaPath}
              fill="url(#areaGradient)"
            />
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="2"
              points={points.join(' ')}
            />
          </svg>
        </div>
      </div>
    );
  };

  const chartTypes = [
    { key: 'visits', label: 'Visits Over Time', component: LineChart, data: chartData.visitsOverTime, color: '#3B82F6' },
    { key: 'revenue', label: 'Revenue Trends', component: AreaChart, data: chartData.revenueData, color: '#10B981' },
    { key: 'traffic', label: 'Traffic Sources', component: PieChart, data: chartData.trafficSources },
    { key: 'devices', label: 'Device Types', component: PieChart, data: chartData.deviceTypes },
    { key: 'pages', label: 'Page Views', component: BarChart, data: chartData.pageViews, color: '#F59E0B' },
    { key: 'conversion', label: 'Conversion Rates', component: LineChart, data: chartData.conversionRates, color: '#8B5CF6' }
  ];

  const selectedChartType = chartTypes.find(chart => chart.key === selectedChart);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Performance Charts</h2>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {chartTypes.map(chart => (
              <option key={chart.key} value={chart.key}>{chart.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading charts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            {selectedChartType && (
              <selectedChartType.component
                data={selectedChartType.data}
                title={selectedChartType.label}
                color={selectedChartType.color}
                height={300}
              />
            )}
          </div>

          {/* Mini Charts */}
          {chartTypes.map(chart => (
            <div key={chart.key} className="cursor-pointer" onClick={() => setSelectedChart(chart.key)}>
              <chart.component
                data={chart.data}
                title={chart.label}
                color={chart.color}
                height={200}
              />
            </div>
          ))}
        </div>
      )}

      {/* Chart Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Chart Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartTypes.map(chart => {
            const data = chart.data;
            if (!data || data.length === 0) return null;
            
            let summary = '';
            if (chart.key === 'visits') {
              const total = data.reduce((sum, item) => sum + item.visits, 0);
              summary = `Total: ${total.toLocaleString()}`;
            } else if (chart.key === 'revenue') {
              const total = data.reduce((sum, item) => sum + item.revenue, 0);
              summary = `Total: $${total.toLocaleString()}`;
            } else if (chart.key === 'pages') {
              const total = data.reduce((sum, item) => sum + item.views, 0);
              summary = `Total: ${total.toLocaleString()} views`;
            } else if (chart.key === 'conversion') {
              const avg = data.reduce((sum, item) => sum + item.rate, 0) / data.length;
              summary = `Avg: ${avg.toFixed(1)}%`;
            } else {
              const total = data.reduce((sum, item) => sum + item.visits, 0);
              summary = `Total: ${total.toLocaleString()}`;
            }

            return (
              <div key={chart.key} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600">{chart.label}</div>
                <div className="text-lg font-bold text-gray-800">{summary}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts; 