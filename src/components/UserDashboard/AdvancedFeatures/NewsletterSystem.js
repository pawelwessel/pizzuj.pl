import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  addDocument, 
  updateDoc, 
  deleteDoc, 
  doc 
} from '../../../db/firebase';

const NewsletterSystem = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: '',
    template: 'default',
    scheduledDate: '',
    isSent: false,
    targetAudience: 'all', // all, premium, enterprise
    sendLimit: 500,
    sentCount: 0
  });

  useEffect(() => {
    loadNewsletters();
    loadSubscribers();
  }, []);

  const loadNewsletters = async () => {
    setLoading(true);
    try {
      const newslettersData = await getDocuments('newsletters');
      setNewsletters(newslettersData);
    } catch (error) {
      console.error('Error loading newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubscribers = async () => {
    try {
      const subscribersData = await getDocuments('newsletter_subscribers');
      setSubscribers(subscribersData);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newsletterId = selectedNewsletter ? selectedNewsletter.id : `newsletter_${Date.now()}`;
      const newsletterData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('newsletters', newsletterId, newsletterData);
      
      setFormData({
        title: '',
        subject: '',
        content: '',
        template: 'default',
        scheduledDate: '',
        isSent: false,
        targetAudience: 'all',
        sendLimit: 500,
        sentCount: 0
      });
      setSelectedNewsletter(null);
      loadNewsletters();
    } catch (error) {
      console.error('Error saving newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setFormData({
      title: newsletter.title || '',
      subject: newsletter.subject || '',
      content: newsletter.content || '',
      template: newsletter.template || 'default',
      scheduledDate: newsletter.scheduledDate || '',
      isSent: newsletter.isSent || false,
      targetAudience: newsletter.targetAudience || 'all',
      sendLimit: newsletter.sendLimit || 500,
      sentCount: newsletter.sentCount || 0
    });
  };

  const handleDelete = async (newsletterId) => {
    if (window.confirm('Are you sure you want to delete this newsletter?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'newsletters', newsletterId));
        loadNewsletters();
      } catch (error) {
        console.error('Error deleting newsletter:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const sendNewsletter = async (newsletterId) => {
    if (window.confirm('Are you sure you want to send this newsletter?')) {
      setLoading(true);
      try {
        await updateDoc(doc(db, 'newsletters', newsletterId), {
          isSent: true,
          sentAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        loadNewsletters();
      } catch (error) {
        console.error('Error sending newsletter:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSubscriberCount = () => {
    return subscribers.length;
  };

  const getRemainingSends = () => {
    const sentThisMonth = newsletters.filter(n => n.isSent && 
      new Date(n.sentAt).getMonth() === new Date().getMonth()).length;
    return Math.max(0, 500 - sentThisMonth);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Newsletter System</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Subscribers</h3>
          <p className="text-2xl font-bold text-blue-600">{getSubscriberCount()}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Remaining Sends</h3>
          <p className="text-2xl font-bold text-green-600">{getRemainingSends()}/500</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Newsletters Created</h3>
          <p className="text-2xl font-bold text-purple-600">{newsletters.length}</p>
        </div>
      </div>
      
      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {selectedNewsletter ? 'Edit Newsletter' : 'Create New Newsletter'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Subject Line</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Template</label>
            <select
              value={formData.template}
              onChange={(e) => setFormData({...formData, template: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="default">Default Template</option>
              <option value="promotional">Promotional</option>
              <option value="news">News Update</option>
              <option value="event">Event Announcement</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Subscribers</option>
              <option value="premium">Premium Users</option>
              <option value="enterprise">Enterprise Users</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Scheduled Date</label>
            <input
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Send Limit</label>
            <input
              type="number"
              value={formData.sendLimit}
              onChange={(e) => setFormData({...formData, sendLimit: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              min="1"
              max="500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full p-2 border rounded"
            rows="8"
            placeholder="Write your newsletter content here..."
            required
          />
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (selectedNewsletter ? 'Update Newsletter' : 'Create Newsletter')}
          </button>
          
          {selectedNewsletter && (
            <button
              type="button"
              onClick={() => {
                setSelectedNewsletter(null);
                setFormData({
                  title: '',
                  subject: '',
                  content: '',
                  template: 'default',
                  scheduledDate: '',
                  isSent: false,
                  targetAudience: 'all',
                  sendLimit: 500,
                  sentCount: 0
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Newsletters List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Newsletters</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading newsletters...</div>
        ) : newsletters.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No newsletters created yet</div>
        ) : (
          <div className="space-y-4">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{newsletter.title}</h4>
                    <p className="text-sm text-gray-600">Subject: {newsletter.subject}</p>
                    <p className="text-sm text-gray-600">Template: {newsletter.template}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      newsletter.isSent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {newsletter.isSent ? 'Sent' : 'Draft'}
                    </span>
                    {newsletter.isSent && (
                      <span className="text-xs text-gray-500 mt-1">
                        Sent: {new Date(newsletter.sentAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Target Audience</p>
                    <p className="text-sm text-gray-600">{newsletter.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Send Limit</p>
                    <p className="text-sm text-gray-600">{newsletter.sendLimit}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sent Count</p>
                    <p className="text-sm text-gray-600">{newsletter.sentCount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-gray-600">{new Date(newsletter.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium">Content Preview</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {newsletter.content.substring(0, 150)}...
                  </p>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(newsletter)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  {!newsletter.isSent && (
                    <button
                      onClick={() => sendNewsletter(newsletter.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Send Now
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(newsletter.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscribers List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
        
        {subscribers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No subscribers yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Subscription Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-900">{subscriber.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{subscriber.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        subscriber.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSystem; 