import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  addDocument, 
  updateDoc, 
  deleteDoc, 
  doc 
} from '../../../db/firebase';

const SocialMediaIntegration = () => {
  const [connections, setConnections] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [formData, setFormData] = useState({
    platform: 'facebook',
    accountName: '',
    accessToken: '',
    isActive: false,
    autoPost: false,
    postFrequency: 'daily'
  });

  const [postFormData, setPostFormData] = useState({
    content: '',
    imageUrl: '',
    platforms: [],
    scheduledDate: '',
    isPublished: false
  });

  useEffect(() => {
    loadConnections();
    loadPosts();
  }, []);

  const loadConnections = async () => {
    setLoading(true);
    try {
      const connectionsData = await getDocuments('social_media_connections');
      setConnections(connectionsData);
    } catch (error) {
      console.error('Error loading connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const postsData = await getDocuments('social_media_posts');
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const connectionId = selectedConnection ? selectedConnection.id : `connection_${Date.now()}`;
      const connectionData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('social_media_connections', connectionId, connectionData);
      
      setFormData({
        platform: 'facebook',
        accountName: '',
        accessToken: '',
        isActive: false,
        autoPost: false,
        postFrequency: 'daily'
      });
      setSelectedConnection(null);
      loadConnections();
    } catch (error) {
      console.error('Error saving connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const postId = `post_${Date.now()}`;
      const postData = {
        ...postFormData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('social_media_posts', postId, postData);
      
      setPostFormData({
        content: '',
        imageUrl: '',
        platforms: [],
        scheduledDate: '',
        isPublished: false
      });
      loadPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (connection) => {
    setSelectedConnection(connection);
    setFormData({
      platform: connection.platform || 'facebook',
      accountName: connection.accountName || '',
      accessToken: connection.accessToken || '',
      isActive: connection.isActive || false,
      autoPost: connection.autoPost || false,
      postFrequency: connection.postFrequency || 'daily'
    });
  };

  const handleDelete = async (connectionId) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'social_media_connections', connectionId));
        loadConnections();
      } catch (error) {
        console.error('Error deleting connection:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleConnectionStatus = async (connectionId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'social_media_connections', connectionId), {
        isActive: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      loadConnections();
    } catch (error) {
      console.error('Error updating connection status:', error);
    }
  };

  const publishPost = async (postId) => {
    try {
      await updateDoc(doc(db, 'social_media_posts', postId), {
        isPublished: true,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      loadPosts();
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'linkedin': return '💼';
      default: return '🌐';
    }
  };

  const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'linkedin', label: 'LinkedIn' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Social Media Integration</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Connected Accounts</h3>
          <p className="text-2xl font-bold text-blue-600">{connections.filter(c => c.isActive).length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Total Posts</h3>
          <p className="text-2xl font-bold text-green-600">{posts.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Published Posts</h3>
          <p className="text-2xl font-bold text-purple-600">{posts.filter(p => p.isPublished).length}</p>
        </div>
      </div>
      
      {/* Connection Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {selectedConnection ? 'Edit Connection' : 'Add Social Media Account'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              {platforms.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Account Name</label>
            <input
              type="text"
              value={formData.accountName}
              onChange={(e) => setFormData({...formData, accountName: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Access Token</label>
            <input
              type="password"
              value={formData.accessToken}
              onChange={(e) => setFormData({...formData, accessToken: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Post Frequency</label>
            <select
              value={formData.postFrequency}
              onChange={(e) => setFormData({...formData, postFrequency: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="mr-2"
            />
            <label className="text-sm font-medium">Active Connection</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.autoPost}
              onChange={(e) => setFormData({...formData, autoPost: e.target.checked})}
              className="mr-2"
            />
            <label className="text-sm font-medium">Auto Post</label>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (selectedConnection ? 'Update Connection' : 'Add Connection')}
          </button>
          
          {selectedConnection && (
            <button
              type="button"
              onClick={() => {
                setSelectedConnection(null);
                setFormData({
                  platform: 'facebook',
                  accountName: '',
                  accessToken: '',
                  isActive: false,
                  autoPost: false,
                  postFrequency: 'daily'
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Connections List */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading connections...</div>
        ) : connections.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No social media accounts connected yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((connection) => (
              <div key={connection.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{getPlatformIcon(connection.platform)}</span>
                    <div>
                      <h4 className="font-semibold">{connection.accountName}</h4>
                      <p className="text-sm text-gray-600">{connection.platform}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    connection.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {connection.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600">Post Frequency: {connection.postFrequency}</p>
                  <p className="text-sm text-gray-600">Auto Post: {connection.autoPost ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(connection)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleConnectionStatus(connection.id, connection.isActive)}
                    className={`px-3 py-1 text-sm rounded ${
                      connection.isActive 
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {connection.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(connection.id)}
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

      {/* Post Creation */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Create Social Media Post</h3>
        
        <form onSubmit={handlePostSubmit} className="p-4 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image URL (Optional)</label>
              <input
                type="url"
                value={postFormData.imageUrl}
                onChange={(e) => setPostFormData({...postFormData, imageUrl: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Scheduled Date (Optional)</label>
              <input
                type="datetime-local"
                value={postFormData.scheduledDate}
                onChange={(e) => setPostFormData({...postFormData, scheduledDate: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <label key={platform.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={postFormData.platforms.includes(platform.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPostFormData({
                          ...postFormData, 
                          platforms: [...postFormData.platforms, platform.value]
                        });
                      } else {
                        setPostFormData({
                          ...postFormData, 
                          platforms: postFormData.platforms.filter(p => p !== platform.value)
                        });
                      }
                    }}
                    className="mr-1"
                  />
                  <span className="text-sm">{platform.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={postFormData.content}
              onChange={(e) => setPostFormData({...postFormData, content: e.target.value})}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your social media post content..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Create Post'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Posts</h3>
        
        {posts.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No posts created yet</div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">Post Content</h4>
                    <p className="text-sm text-gray-600">{post.content}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt="Post image"
                    className="w-32 h-32 object-cover rounded mb-3"
                  />
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Platforms</p>
                    <p className="text-sm text-gray-600">{post.platforms.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Scheduled</p>
                    <p className="text-sm text-gray-600">
                      {post.scheduledDate ? new Date(post.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Published</p>
                    <p className="text-sm text-gray-600">
                      {post.isPublished ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!post.isPublished && (
                    <button
                      onClick={() => publishPost(post.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Publish Now
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
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
    </div>
  );
};

export default SocialMediaIntegration; 