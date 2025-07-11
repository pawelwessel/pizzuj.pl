import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  getDocument 
} from '../../../db/firebase';

const InterestMetrics = () => {
  const [interestData, setInterestData] = useState({
    engagementRates: [],
    timeOnPage: [],
    clickThroughRates: [],
    scrollDepth: [],
    userInteractions: [],
    contentEngagement: [],
    searchTerms: [],
    exitPages: [],
    returnVisitors: [],
    userJourney: []
  });
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  useEffect(() => {
    loadInterestMetrics();
  }, [dateRange, selectedMetric]);

  const loadInterestMetrics = async () => {
    setLoading(true);
    try {
      const analyticsData = await getDocuments('analytics');
      const userInteractions = await getDocuments('user_interactions');
      const processedData = processInterestData(analyticsData, userInteractions);
      setInterestData(processedData);
    } catch (error) {
      console.error('Error loading interest metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processInterestData = (analyticsData, userInteractions) => {
    // Process engagement rates
    const engagementRates = analyticsData
      .filter(item => item.engagementRate !== undefined)
      .map(item => ({
        page: item.page || 'Unknown',
        rate: item.engagementRate || 0,
        timestamp: item.timestamp
      }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 10);

    // Process time on page
    const timeOnPage = analyticsData
      .filter(item => item.timeOnPage)
      .map(item => ({
        page: item.page || 'Unknown',
        time: item.timeOnPage || 0,
        visits: item.visits || 1
      }))
      .reduce((acc, item) => {
        const existing = acc.find(p => p.page === item.page);
        if (existing) {
          existing.time += item.time;
          existing.visits += item.visits;
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
      .map(item => ({
        ...item,
        avgTime: item.visits > 0 ? item.time / item.visits : 0
      }))
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 10);

    // Process click-through rates
    const clickThroughRates = analyticsData
      .filter(item => item.clicks && item.impressions)
      .map(item => ({
        element: item.element || 'Unknown',
        clicks: item.clicks || 0,
        impressions: item.impressions || 0,
        ctr: item.impressions > 0 ? (item.clicks / item.impressions) * 100 : 0
      }))
      .sort((a, b) => b.ctr - a.ctr)
      .slice(0, 10);

    // Process scroll depth
    const scrollDepth = analyticsData
      .filter(item => item.scrollDepth)
      .map(item => ({
        page: item.page || 'Unknown',
        depth: item.scrollDepth || 0,
        sessions: item.sessions || 1
      }))
      .reduce((acc, item) => {
        const existing = acc.find(p => p.page === item.page);
        if (existing) {
          existing.depth += item.depth;
          existing.sessions += item.sessions;
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
      .map(item => ({
        ...item,
        avgDepth: item.sessions > 0 ? item.depth / item.sessions : 0
      }))
      .sort((a, b) => b.avgDepth - a.avgDepth)
      .slice(0, 10);

    // Process user interactions
    const userInteractionsData = userInteractions
      .map(item => ({
        type: item.type || 'click',
        element: item.element || 'Unknown',
        page: item.page || 'Unknown',
        timestamp: item.timestamp
      }))
      .reduce((acc, item) => {
        const key = `${item.type}-${item.element}`;
        if (acc[key]) {
          acc[key].count++;
        } else {
          acc[key] = {
            type: item.type,
            element: item.element,
            page: item.page,
            count: 1
          };
        }
        return acc;
      }, {});

    const userInteractionsArray = Object.values(userInteractionsData)
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Process content engagement
    const contentEngagement = analyticsData
      .filter(item => item.contentType)
      .map(item => ({
        contentType: item.contentType || 'Unknown',
        views: item.views || 0,
        shares: item.shares || 0,
        comments: item.comments || 0,
        likes: item.likes || 0
      }))
      .reduce((acc, item) => {
        const existing = acc.find(c => c.contentType === item.contentType);
        if (existing) {
          existing.views += item.views;
          existing.shares += item.shares;
          existing.comments += item.comments;
          existing.likes += item.likes;
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
      .map(item => ({
        ...item,
        engagement: item.views > 0 ? ((item.shares + item.comments + item.likes) / item.views) * 100 : 0
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10);

    // Process search terms
    const searchTerms = analyticsData
      .filter(item => item.searchTerm)
      .map(item => ({
        term: item.searchTerm || 'Unknown',
        searches: item.searches || 1,
        results: item.results || 0
      }))
      .reduce((acc, item) => {
        const existing = acc.find(s => s.term === item.term);
        if (existing) {
          existing.searches += item.searches;
          existing.results += item.results;
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
      .sort((a, b) => b.searches - a.searches)
      .slice(0, 10);

    // Process exit pages
    const exitPages = analyticsData
      .filter(item => item.exits)
      .map(item => ({
        page: item.page || 'Unknown',
        exits: item.exits || 0,
        visits: item.visits || 1
      }))
      .reduce((acc, item) => {
        const existing = acc.find(p => p.page === item.page);
        if (existing) {
          existing.exits += item.exits;
          existing.visits += item.visits;
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
      .map(item => ({
        ...item,
        exitRate: item.visits > 0 ? (item.exits / item.visits) * 100 : 0
      }))
      .sort((a, b) => b.exitRate - a.exitRate)
      .slice(0, 10);

    // Process return visitors
    const returnVisitors = analyticsData
      .filter(item => item.returnVisitors !== undefined)
      .map(item => ({
        date: item.date || new Date().toISOString(),
        returnVisitors: item.returnVisitors || 0,
        totalVisitors: item.totalVisitors || 1
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 30);

    // Process user journey
    const userJourney = analyticsData
      .filter(item => item.userJourney)
      .map(item => ({
        step: item.step || 1,
        page: item.page || 'Unknown',
        users: item.users || 0,
        dropoff: item.dropoff || 0
      }))
      .sort((a, b) => a.step - b.step)
      .slice(0, 10);

    return {
      engagementRates,
      timeOnPage,
      clickThroughRates,
      scrollDepth,
      userInteractions: userInteractionsArray,
      contentEngagement,
      searchTerms,
      exitPages,
      returnVisitors,
      userJourney
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'engagement': return '📈';
      case 'time': return '⏱️';
      case 'clicks': return '🖱️';
      case 'scroll': return '📜';
      case 'interactions': return '👆';
      case 'content': return '📝';
      case 'search': return '🔍';
      case 'exits': return '🚪';
      case 'returns': return '🔄';
      case 'journey': return '🛤️';
      default: return '📊';
    }
  };

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'engagement':
        return { data: interestData.engagementRates, label: 'Engagement Rates' };
      case 'time':
        return { data: interestData.timeOnPage, label: 'Time on Page' };
      case 'clicks':
        return { data: interestData.clickThroughRates, label: 'Click-Through Rates' };
      case 'scroll':
        return { data: interestData.scrollDepth, label: 'Scroll Depth' };
      case 'interactions':
        return { data: interestData.userInteractions, label: 'User Interactions' };
      case 'content':
        return { data: interestData.contentEngagement, label: 'Content Engagement' };
      case 'search':
        return { data: interestData.searchTerms, label: 'Search Terms' };
      case 'exits':
        return { data: interestData.exitPages, label: 'Exit Pages' };
      case 'returns':
        return { data: interestData.returnVisitors, label: 'Return Visitors' };
      case 'journey':
        return { data: interestData.userJourney, label: 'User Journey' };
      default:
        return { data: interestData.engagementRates, label: 'Engagement Rates' };
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interest Metrics</h2>
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
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="engagement">Engagement</option>
            <option value="time">Time on Page</option>
            <option value="clicks">Click-Through</option>
            <option value="scroll">Scroll Depth</option>
            <option value="interactions">Interactions</option>
            <option value="content">Content</option>
            <option value="search">Search</option>
            <option value="exits">Exits</option>
            <option value="returns">Returns</option>
            <option value="journey">Journey</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interest metrics...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Selected Metric Chart */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>{getMetricIcon(selectedMetric)}</span>
              {getMetricData().label}
            </h3>
            {getMetricData().data.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data available for this metric</p>
            ) : (
              <div className="space-y-3">
                {getMetricData().data.map((item, index) => {
                  let value, label, percentage;
                  
                  switch (selectedMetric) {
                    case 'engagement':
                      value = formatPercentage(item.rate);
                      label = item.page;
                      break;
                    case 'time':
                      value = formatTime(item.avgTime);
                      label = item.page;
                      break;
                    case 'clicks':
                      value = formatPercentage(item.ctr);
                      label = item.element;
                      break;
                    case 'scroll':
                      value = formatPercentage(item.avgDepth);
                      label = item.page;
                      break;
                    case 'interactions':
                      value = item.count;
                      label = `${item.type}: ${item.element}`;
                      break;
                    case 'content':
                      value = formatPercentage(item.engagement);
                      label = item.contentType;
                      break;
                    case 'search':
                      value = item.searches;
                      label = item.term;
                      break;
                    case 'exits':
                      value = formatPercentage(item.exitRate);
                      label = item.page;
                      break;
                    case 'returns':
                      value = formatPercentage((item.returnVisitors / item.totalVisitors) * 100);
                      label = new Date(item.date).toLocaleDateString();
                      break;
                    case 'journey':
                      value = `${item.users} users`;
                      label = `Step ${item.step}: ${item.page}`;
                      break;
                    default:
                      value = 'N/A';
                      label = 'Unknown';
                  }

                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900 w-6">{index + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{label}</p>
                          {selectedMetric === 'interactions' && (
                            <p className="text-xs text-gray-600">{item.page}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Avg Engagement</h4>
              <p className="text-2xl font-bold text-blue-600">
                {interestData.engagementRates.length > 0 
                  ? formatPercentage(interestData.engagementRates.reduce((sum, item) => sum + item.rate, 0) / interestData.engagementRates.length)
                  : '0%'
                }
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Avg Time on Page</h4>
              <p className="text-2xl font-bold text-green-600">
                {interestData.timeOnPage.length > 0 
                  ? formatTime(interestData.timeOnPage.reduce((sum, item) => sum + item.avgTime, 0) / interestData.timeOnPage.length)
                  : '0:00'
                }
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800">Avg CTR</h4>
              <p className="text-2xl font-bold text-purple-600">
                {interestData.clickThroughRates.length > 0 
                  ? formatPercentage(interestData.clickThroughRates.reduce((sum, item) => sum + item.ctr, 0) / interestData.clickThroughRates.length)
                  : '0%'
                }
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-orange-800">Total Interactions</h4>
              <p className="text-2xl font-bold text-orange-600">
                {interestData.userInteractions.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Engaging Content */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Most Engaging Content</h3>
              {interestData.contentEngagement.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No content engagement data</p>
              ) : (
                <div className="space-y-3">
                  {interestData.contentEngagement.slice(0, 5).map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{content.contentType}</p>
                        <p className="text-xs text-gray-600">{content.views} views</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatPercentage(content.engagement)}</p>
                        <p className="text-xs text-gray-600">{content.shares} shares</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Search Terms */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Search Terms</h3>
              {interestData.searchTerms.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No search data available</p>
              ) : (
                <div className="space-y-3">
                  {interestData.searchTerms.slice(0, 5).map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{search.term}</p>
                        <p className="text-xs text-gray-600">{search.results} results</p>
                      </div>
                      <span className="text-sm font-medium">{search.searches} searches</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestMetrics; 