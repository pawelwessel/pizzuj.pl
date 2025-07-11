import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  getDocument 
} from '../../../db/firebase';

const VisitStatistics = () => {
  const [visitData, setVisitData] = useState({
    dailyVisits: [],
    hourlyVisits: [],
    weeklyVisits: [],
    monthlyVisits: [],
    topReferrers: [],
    geographicData: [],
    pageViews: [],
    sessionData: []
  });
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  const [selectedView, setSelectedView] = useState('daily');

  useEffect(() => {
    loadVisitStatistics();
  }, [dateRange, selectedView]);

  const loadVisitStatistics = async () => {
    setLoading(true);
    try {
      const analyticsData = await getDocuments('analytics');
      const processedData = processVisitData(analyticsData);
      setVisitData(processedData);
    } catch (error) {
      console.error('Error loading visit statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processVisitData = (analyticsData) => {
    // Process daily visits
    const dailyVisits = analyticsData
      .filter(item => item.date)
      .reduce((acc, item) => {
        const date = new Date(item.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const dailyVisitsArray = Object.entries(dailyVisits)
      .map(([date, visits]) => ({ date, visits }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-parseInt(dateRange));

    // Process hourly visits
    const hourlyVisits = analyticsData
      .filter(item => item.hour !== undefined)
      .reduce((acc, item) => {
        acc[item.hour] = (acc[item.hour] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const hourlyVisitsArray = Array.from({ length: 24 }, (_, hour) => ({
      hour: hour.toString().padStart(2, '0'),
      visits: hourlyVisits[hour] || 0
    }));

    // Process weekly visits
    const weeklyVisits = analyticsData
      .filter(item => item.date)
      .reduce((acc, item) => {
        const date = new Date(item.date);
        const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
        const weekKey = weekStart.toLocaleDateString();
        acc[weekKey] = (acc[weekKey] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const weeklyVisitsArray = Object.entries(weeklyVisits)
      .map(([week, visits]) => ({ week, visits }))
      .sort((a, b) => new Date(a.week) - new Date(b.week))
      .slice(-8);

    // Process monthly visits
    const monthlyVisits = analyticsData
      .filter(item => item.date)
      .reduce((acc, item) => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        acc[monthKey] = (acc[monthKey] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const monthlyVisitsArray = Object.entries(monthlyVisits)
      .map(([month, visits]) => ({ month, visits }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12);

    // Process top referrers
    const referrers = analyticsData
      .filter(item => item.referrer)
      .reduce((acc, item) => {
        const referrer = item.referrer || 'Direct';
        acc[referrer] = (acc[referrer] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const topReferrersArray = Object.entries(referrers)
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Process geographic data
    const geographicData = analyticsData
      .filter(item => item.country)
      .reduce((acc, item) => {
        const country = item.country || 'Unknown';
        acc[country] = (acc[country] || 0) + (item.visits || 0);
        return acc;
      }, {});

    const geographicDataArray = Object.entries(geographicData)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    // Process page views
    const pageViews = analyticsData
      .filter(item => item.page && item.pageViews)
      .reduce((acc, item) => {
        const page = item.page || 'Unknown';
        acc[page] = (acc[page] || 0) + (item.pageViews || 0);
        return acc;
      }, {});

    const pageViewsArray = Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);

    // Process session data
    const sessionData = analyticsData
      .filter(item => item.sessionDuration)
      .map(item => ({
        duration: item.sessionDuration || 0,
        pages: item.pagesViewed || 1,
        timestamp: item.timestamp
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 50);

    return {
      dailyVisits: dailyVisitsArray,
      hourlyVisits: hourlyVisitsArray,
      weeklyVisits: weeklyVisitsArray,
      monthlyVisits: monthlyVisitsArray,
      topReferrers: topReferrersArray,
      geographicData: geographicDataArray,
      pageViews: pageViewsArray,
      sessionData
    };
  };

  const getMaxValue = (data, key) => {
    return Math.max(...data.map(item => item[key]));
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getBarWidth = (value, maxValue) => {
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
  };

  const getViewData = () => {
    switch (selectedView) {
      case 'daily':
        return visitData.dailyVisits;
      case 'hourly':
        return visitData.hourlyVisits;
      case 'weekly':
        return visitData.weeklyVisits;
      case 'monthly':
        return visitData.monthlyVisits;
      default:
        return visitData.dailyVisits;
    }
  };

  const getViewLabel = () => {
    switch (selectedView) {
      case 'daily':
        return 'Daily Visits';
      case 'hourly':
        return 'Hourly Visits';
      case 'weekly':
        return 'Weekly Visits';
      case 'monthly':
        return 'Monthly Visits';
      default:
        return 'Daily Visits';
    }
  };

  const getViewKey = () => {
    switch (selectedView) {
      case 'daily':
        return 'date';
      case 'hourly':
        return 'hour';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return 'date';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Visit Statistics</h2>
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
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading visit statistics...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Visit Chart */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{getViewLabel()}</h3>
            {getViewData().length === 0 ? (
              <p className="text-gray-500 text-center py-8">No visit data available</p>
            ) : (
              <div className="space-y-3">
                {getViewData().map((item, index) => {
                  const maxValue = getMaxValue(getViewData(), 'visits');
                  const barWidth = getBarWidth(item.visits, maxValue);
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium text-gray-600">
                        {item[getViewKey()]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                              style={{ width: `${barWidth}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-16 text-right">
                            {formatNumber(item.visits)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Referrers */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
              {visitData.topReferrers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No referrer data available</p>
              ) : (
                <div className="space-y-3">
                  {visitData.topReferrers.map((referrer, index) => {
                    const maxVisits = getMaxValue(visitData.topReferrers, 'visits');
                    const barWidth = getBarWidth(referrer.visits, maxVisits);
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900 w-6">{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16 text-right">
                              {formatNumber(referrer.visits)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{referrer.referrer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Geographic Data */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
              {visitData.geographicData.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No geographic data available</p>
              ) : (
                <div className="space-y-3">
                  {visitData.geographicData.map((country, index) => {
                    const maxVisits = getMaxValue(visitData.geographicData, 'visits');
                    const barWidth = getBarWidth(country.visits, maxVisits);
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900 w-6">{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16 text-right">
                              {formatNumber(country.visits)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{country.country}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Page Views */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
              {visitData.pageViews.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No page view data available</p>
              ) : (
                <div className="space-y-3">
                  {visitData.pageViews.map((page, index) => {
                    const maxViews = getMaxValue(visitData.pageViews, 'views');
                    const barWidth = getBarWidth(page.views, maxViews);
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900 w-6">{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-orange-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16 text-right">
                              {formatNumber(page.views)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{page.page}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Session Data */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
              {visitData.sessionData.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No session data available</p>
              ) : (
                <div className="space-y-3">
                  {visitData.sessionData.slice(0, 10).map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="text-sm font-medium">
                          {Math.floor(session.duration / 60)}:{(session.duration % 60).toString().padStart(2, '0')}
                        </p>
                        <p className="text-xs text-gray-600">{session.pages} pages</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(session.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Total Visits</h4>
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(getViewData().reduce((sum, item) => sum + item.visits, 0))}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Avg Daily</h4>
              <p className="text-2xl font-bold text-green-600">
                {formatNumber(Math.round(getViewData().reduce((sum, item) => sum + item.visits, 0) / getViewData().length))}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800">Peak Hour</h4>
              <p className="text-2xl font-bold text-purple-600">
                {visitData.hourlyVisits.length > 0 
                  ? visitData.hourlyVisits.reduce((max, item) => 
                      item.visits > max.visits ? item : max
                    ).hour + ':00'
                  : 'N/A'
                }
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-orange-800">Top Country</h4>
              <p className="text-2xl font-bold text-orange-600">
                {visitData.geographicData.length > 0 
                  ? visitData.geographicData[0].country
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitStatistics; 