import React, { useState, useEffect } from 'react';
import { getDocuments, getDocument, updateDocument, addDocument } from '../../../db/firebase';

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, sent, received
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [newConversation, setNewConversation] = useState({
    recipient: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const messagesData = await getDocuments('messages');
      const userMessages = await getDocument('user_messages', 'current_user_id');
      
      const allMessages = [
        ...messagesData,
        ...(userMessages?.messages || [])
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMessages(allMessages);
      
      // Group messages into conversations
      const conversationMap = {};
      allMessages.forEach(message => {
        const conversationId = message.conversationId || message.id;
        if (!conversationMap[conversationId]) {
          conversationMap[conversationId] = {
            id: conversationId,
            participants: message.participants || [message.sender, message.recipient],
            subject: message.subject || 'No Subject',
            lastMessage: message,
            unreadCount: 0,
            messages: []
          };
        }
        conversationMap[conversationId].messages.push(message);
        if (!message.read && message.recipient === 'current_user_id') {
          conversationMap[conversationId].unreadCount++;
        }
      });
      
      setConversations(Object.values(conversationMap));
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const messageData = {
        id: Date.now().toString(),
        conversationId: selectedConversation.id,
        sender: 'current_user_id',
        recipient: selectedConversation.participants.find(p => p !== 'current_user_id'),
        message: newMessage,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'text'
      };

      await addDocument('messages', messageData);
      
      setMessages(prev => [messageData, ...prev]);
      setNewMessage('');
      
      // Update conversation
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { 
                ...conv, 
                lastMessage: messageData,
                messages: [...conv.messages, messageData]
              }
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createConversation = async () => {
    if (!newConversation.recipient || !newConversation.message) return;

    try {
      const conversationId = Date.now().toString();
      const messageData = {
        id: conversationId,
        conversationId,
        sender: 'current_user_id',
        recipient: newConversation.recipient,
        subject: newConversation.subject,
        message: newConversation.message,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'text',
        participants: ['current_user_id', newConversation.recipient]
      };

      await addDocument('messages', messageData);
      
      setMessages(prev => [messageData, ...prev]);
      setNewConversation({
        recipient: '',
        subject: '',
        message: ''
      });
      setShowNewConversation(false);
      
      // Add to conversations
      const newConv = {
        id: conversationId,
        participants: ['current_user_id', newConversation.recipient],
        subject: newConversation.subject,
        lastMessage: messageData,
        unreadCount: 0,
        messages: [messageData]
      };
      
      setConversations(prev => [newConv, ...prev]);
      setSelectedConversation(newConv);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await updateDocument('messages', messageId, { read: true });
      
      setMessages(prev => 
        prev.map(message => 
          message.id === messageId 
            ? { ...message, read: true }
            : message
        )
      );
      
      // Update conversation unread count
      setConversations(prev => 
        prev.map(conv => ({
          ...conv,
          unreadCount: conv.messages.filter(m => !m.read && m.recipient === 'current_user_id').length
        }))
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await updateDocument('messages', messageId, { deleted: true });
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'text': return '💬';
      case 'image': return '🖼️';
      case 'file': return '📎';
      case 'system': return '🔧';
      default: return '📝';
    }
  };

  const getMessageColor = (read, sender) => {
    if (sender === 'current_user_id') {
      return 'bg-blue-50 border-blue-200';
    }
    return read ? 'bg-gray-50 border-gray-200' : 'bg-yellow-50 border-yellow-200';
  };

  const filteredConversations = conversations.filter(conversation => {
    switch (filter) {
      case 'unread': return conversation.unreadCount > 0;
      case 'sent': return conversation.lastMessage.sender === 'current_user_id';
      case 'received': return conversation.lastMessage.recipient === 'current_user_id';
      default: return true;
    }
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const currentConversationMessages = selectedConversation 
    ? messages.filter(m => m.conversationId === selectedConversation.id)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Message Center</h2>
          <p className="text-gray-600">Manage your conversations and messages</p>
        </div>
        <button
          onClick={() => setShowNewConversation(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Conversation
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All', count: conversations.length },
          { key: 'unread', label: 'Unread', count: conversations.filter(c => c.unreadCount > 0).length },
          { key: 'sent', label: 'Sent', count: conversations.filter(c => c.lastMessage.sender === 'current_user_id').length },
          { key: 'received', label: 'Received', count: conversations.filter(c => c.lastMessage.recipient === 'current_user_id').length }
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

      {/* New Conversation Form */}
      {showNewConversation && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">New Conversation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient *
              </label>
              <input
                type="text"
                value={newConversation.recipient}
                onChange={(e) => setNewConversation(prev => ({ ...prev, recipient: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="User ID or email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={newConversation.subject}
                onChange={(e) => setNewConversation(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Message subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                value={newConversation.message}
                onChange={(e) => setNewConversation(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message..."
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={createConversation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
            <button
              onClick={() => setShowNewConversation(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Conversations</h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-gray-600">No conversations</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-800">
                          {conversation.subject}
                        </h4>
                        {conversation.unreadCount > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{formatTimestamp(conversation.lastMessage.timestamp)}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {conversation.participants.length} participants
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <div className="bg-white rounded-lg border">
              {/* Conversation Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {selectedConversation.subject}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation.participants.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedConversation.unreadCount > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        {selectedConversation.unreadCount} unread
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {currentConversationMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-gray-600">No messages yet</p>
                  </div>
                ) : (
                  currentConversationMessages.map(message => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg border ${getMessageColor(message.read, message.sender)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1">
                          <div className="text-lg">
                            {getMessageIcon(message.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {message.sender === 'current_user_id' ? 'You' : message.sender}
                              </span>
                              {!message.read && message.recipient === 'current_user_id' && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-gray-800">{message.message}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <span>{formatTimestamp(message.timestamp)}</span>
                              {message.type !== 'text' && (
                                <span className="px-2 py-1 bg-gray-100 rounded">
                                  {message.type}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {!message.read && message.recipient === 'current_user_id' && (
                            <button
                              onClick={() => markAsRead(message.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Mark as read"
                            >
                              ✓
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete message"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Message Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{conversations.length}</div>
            <div className="text-sm text-gray-600">Conversations</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {messages.filter(m => !m.read && m.recipient === 'current_user_id').length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {messages.filter(m => m.sender === 'current_user_id').length}
            </div>
            <div className="text-sm text-gray-600">Sent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter; 