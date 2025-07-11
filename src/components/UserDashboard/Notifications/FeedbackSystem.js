import React, { useState, useEffect } from 'react';
import { getDocuments, getDocument, updateDocument, addDocument } from '../../../db/firebase';

const FeedbackSystem = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, resolved, my-feedback
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    message: '',
    category: 'general',
    priority: 'medium',
    type: 'suggestion'
  });

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    setLoading(true);
    try {
      const feedbackData = await getDocuments('feedback');
      const userFeedback = await getDocument('user_feedback', 'current_user_id');
      
      const allFeedback = [
        ...feedbackData,
        ...(userFeedback?.feedback || [])
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setFeedback(allFeedback);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!newFeedback.title || !newFeedback.message) return;

    try {
      const feedbackData = {
        ...newFeedback,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'pending',
        createdBy: 'current_user_id',
        userId: 'current_user_id',
        responses: [],
        upvotes: 0,
        downvotes: 0
      };

      await addDocument('feedback', feedbackData);
      
      setFeedback(prev => [feedbackData, ...prev]);
      setNewFeedback({
        title: '',
        message: '',
        category: 'general',
        priority: 'medium',
        type: 'suggestion'
      });
      setShowSubmitForm(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const updateFeedbackStatus = async (feedbackId, status) => {
    try {
      await updateDocument('feedback', feedbackId, { status });
      
      setFeedback(prev => 
        prev.map(item => 
          item.id === feedbackId 
            ? { ...item, status }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  const addResponse = async (feedbackId, response) => {
    try {
      const responseData = {
        id: Date.now().toString(),
        message: response,
        createdAt: new Date().toISOString(),
        createdBy: 'current_user_id',
        isAdmin: true
      };

      await updateDocument('feedback', feedbackId, {
        responses: [...(feedback.find(f => f.id === feedbackId)?.responses || []), responseData],
        status: 'responded'
      });
      
      setFeedback(prev => 
        prev.map(item => 
          item.id === feedbackId 
            ? { 
                ...item, 
                responses: [...(item.responses || []), responseData],
                status: 'responded'
              }
            : item
        )
      );
    } catch (error) {
      console.error('Error adding response:', error);
    }
  };

  const voteFeedback = async (feedbackId, voteType) => {
    try {
      const currentFeedback = feedback.find(f => f.id === feedbackId);
      const newUpvotes = voteType === 'up' ? (currentFeedback.upvotes || 0) + 1 : (currentFeedback.upvotes || 0);
      const newDownvotes = voteType === 'down' ? (currentFeedback.downvotes || 0) + 1 : (currentFeedback.downvotes || 0);

      await updateDocument('feedback', feedbackId, {
        upvotes: newUpvotes,
        downvotes: newDownvotes
      });
      
      setFeedback(prev => 
        prev.map(item => 
          item.id === feedbackId 
            ? { ...item, upvotes: newUpvotes, downvotes: newDownvotes }
            : item
        )
      );
    } catch (error) {
      console.error('Error voting on feedback:', error);
    }
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'bug': return '🐛';
      case 'feature': return '✨';
      case 'suggestion': return '💡';
      case 'complaint': return '😞';
      case 'praise': return '👍';
      default: return '📝';
    }
  };

  const getFeedbackColor = (type, priority) => {
    if (priority === 'high') return 'border-red-300 bg-red-50';
    if (priority === 'critical') return 'border-red-400 bg-red-100';
    
    switch (type) {
      case 'bug': return 'border-red-300 bg-red-50';
      case 'feature': return 'border-blue-300 bg-blue-50';
      case 'suggestion': return 'border-green-300 bg-green-50';
      case 'complaint': return 'border-orange-300 bg-orange-50';
      case 'praise': return 'border-purple-300 bg-purple-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'responded': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFeedback = feedback.filter(item => {
    switch (filter) {
      case 'pending': return item.status === 'pending';
      case 'resolved': return item.status === 'resolved';
      case 'my-feedback': return item.userId === 'current_user_id';
      default: return true;
    }
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Feedback System</h2>
          <p className="text-gray-600">Share your thoughts and help us improve</p>
        </div>
        <button
          onClick={() => setShowSubmitForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Feedback
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All', count: feedback.length },
          { key: 'pending', label: 'Pending', count: feedback.filter(f => f.status === 'pending').length },
          { key: 'resolved', label: 'Resolved', count: feedback.filter(f => f.status === 'resolved').length },
          { key: 'my-feedback', label: 'My Feedback', count: feedback.filter(f => f.userId === 'current_user_id').length }
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

      {/* Submit Feedback Form */}
      {showSubmitForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Submit New Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={newFeedback.title}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of your feedback"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newFeedback.type}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="suggestion">Suggestion</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="complaint">Complaint</option>
                <option value="praise">Praise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newFeedback.category}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">General</option>
                <option value="ui">User Interface</option>
                <option value="performance">Performance</option>
                <option value="security">Security</option>
                <option value="accessibility">Accessibility</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newFeedback.priority}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                value={newFeedback.message}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide detailed feedback..."
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={submitFeedback}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Feedback
            </button>
            <button
              onClick={() => setShowSubmitForm(false)}
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
          <p className="mt-4 text-gray-600">Loading feedback...</p>
        </div>
      ) : filteredFeedback.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No feedback</h3>
          <p className="text-gray-600">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedback.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border ${getFeedbackColor(item.type, item.priority)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">
                    {getFeedbackIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {item.priority}
                      </span>
                      {item.userId === 'current_user_id' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Mine
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>Created: {formatTimestamp(item.createdAt)}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {item.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {item.type}
                      </span>
                    </div>
                    
                    {/* Responses */}
                    {item.responses && item.responses.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Responses:</h4>
                        {item.responses.map(response => (
                          <div key={response.id} className="bg-white p-3 rounded border-l-4 border-blue-500">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-500">
                                {response.isAdmin ? 'Admin' : 'User'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(response.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{response.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Voting */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => voteFeedback(item.id, 'up')}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        👍 {item.upvotes || 0}
                      </button>
                      <button
                        onClick={() => voteFeedback(item.id, 'down')}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                      >
                        👎 {item.downvotes || 0}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {item.status === 'pending' && (
                    <button
                      onClick={() => updateFeedbackStatus(item.id, 'in-progress')}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Mark as in progress"
                    >
                      ⏳
                    </button>
                  )}
                  {item.status === 'in-progress' && (
                    <button
                      onClick={() => updateFeedbackStatus(item.id, 'resolved')}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Mark as resolved"
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Feedback Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{feedback.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {feedback.filter(f => f.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {feedback.filter(f => f.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {feedback.filter(f => f.type === 'suggestion').length}
            </div>
            <div className="text-sm text-gray-600">Suggestions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSystem; 