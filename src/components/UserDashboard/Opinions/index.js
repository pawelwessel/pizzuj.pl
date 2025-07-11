"use client";
import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaReply, FaFilter, FaDownload, FaShare, FaFlag } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Opinions = ({ userData }) => {
  const [opinions, setOpinions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);
  const [selectedOpinion, setSelectedOpinion] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockOpinions = [
      {
        id: 1,
        customerName: 'Anna Kowalska',
        rating: 5,
        date: '2024-01-15',
        text: 'Świetna pizza! Szybka dostawa i pyszne jedzenie. Polecam!',
        pizzeriaName: 'Pizzeria Bella',
        status: 'positive',
        hasReply: false,
        reply: null,
        helpful: 12,
        notHelpful: 2
      },
      {
        id: 2,
        customerName: 'Jan Nowak',
        rating: 4,
        date: '2024-01-14',
        text: 'Dobra pizza, ale mogłaby być cieplejsza. Ogólnie polecam.',
        pizzeriaName: 'Pizzeria Bella',
        status: 'neutral',
        hasReply: true,
        reply: 'Dziękujemy za opinię! Pracujemy nad poprawą temperatury dostawy.',
        helpful: 8,
        notHelpful: 1
      },
      {
        id: 3,
        customerName: 'Maria Wiśniewska',
        rating: 2,
        date: '2024-01-13',
        text: 'Pizza była zimna i sucha. Nie polecam.',
        pizzeriaName: 'Pizzeria Bella',
        status: 'negative',
        hasReply: false,
        reply: null,
        helpful: 5,
        notHelpful: 8
      },
      {
        id: 4,
        customerName: 'Piotr Zieliński',
        rating: 5,
        date: '2024-01-12',
        text: 'Najlepsza pizza w mieście! Świeże składniki i szybka obsługa.',
        pizzeriaName: 'Pizzeria Roma',
        status: 'positive',
        hasReply: false,
        reply: null,
        helpful: 15,
        notHelpful: 0
      }
    ];
    
    setOpinions(mockOpinions);
    setLoading(false);
  }, []);

  const handleReply = async (opinionId) => {
    if (!replyText.trim()) {
      toast.error('Wprowadź treść odpowiedzi');
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOpinions(prev => prev.map(opinion => 
        opinion.id === opinionId 
          ? { ...opinion, hasReply: true, reply: replyText }
          : opinion
      ));
      
      setReplyText('');
      setSelectedOpinion(null);
      toast.success('Odpowiedź została dodana!');
    } catch (error) {
      toast.error('Błąd podczas dodawania odpowiedzi');
    }
  };

  const handleFlagOpinion = async (opinionId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Opinia została zgłoszona do moderacji');
    } catch (error) {
      toast.error('Błąd podczas zgłaszania opinii');
    }
  };

  const handleHelpful = async (opinionId, isHelpful) => {
    try {
      setOpinions(prev => prev.map(opinion => 
        opinion.id === opinionId 
          ? { 
              ...opinion, 
              helpful: isHelpful ? opinion.helpful + 1 : opinion.helpful,
              notHelpful: !isHelpful ? opinion.notHelpful + 1 : opinion.notHelpful
            }
          : opinion
      ));
    } catch (error) {
      toast.error('Błąd podczas oceniania opinii');
    }
  };

  const filteredOpinions = opinions.filter(opinion => {
    if (filter === 'all') return true;
    if (filter === 'positive') return opinion.rating >= 4;
    if (filter === 'negative') return opinion.rating <= 2;
    if (filter === 'neutral') return opinion.rating === 3;
    if (filter === 'unreplied') return !opinion.hasReply;
    return true;
  });

  const sortedOpinions = [...filteredOpinions].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Opinie klientów</h2>
          <p className="text-gray-600">Zarządzaj opiniami i odpowiadaj klientom</p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <FaDownload />
            Eksportuj
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <FaShare />
            Udostępnij
          </button>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <h3 className="text-green-800 font-semibold">Pozytywne</h3>
          <p className="text-2xl font-bold text-green-600">
            {opinions.filter(o => o.rating >= 4).length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
          <h3 className="text-yellow-800 font-semibold">Neutralne</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {opinions.filter(o => o.rating === 3).length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <h3 className="text-red-800 font-semibold">Negatywne</h3>
          <p className="text-2xl font-bold text-red-600">
            {opinions.filter(o => o.rating <= 2).length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <h3 className="text-blue-800 font-semibold">Bez odpowiedzi</h3>
          <p className="text-2xl font-bold text-blue-600">
            {opinions.filter(o => !o.hasReply).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Wszystkie opinie</option>
            <option value="positive">Pozytywne (4-5 gwiazdek)</option>
            <option value="neutral">Neutralne (3 gwiazdki)</option>
            <option value="negative">Negatywne (1-2 gwiazdki)</option>
            <option value="unreplied">Bez odpowiedzi</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sortuj:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="date">Data</option>
            <option value="rating">Ocena</option>
            <option value="helpful">Pomocne</option>
          </select>
        </div>
      </div>

      {/* Opinions List */}
      <div className="space-y-4">
        {sortedOpinions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Brak opinii do wyświetlenia</p>
          </div>
        ) : (
          sortedOpinions.map((opinion) => (
            <div key={opinion.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{opinion.customerName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opinion.status)}`}>
                      {opinion.pizzeriaName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {getRatingStars(opinion.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(opinion.date).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{opinion.text}</p>
                  
                  {opinion.hasReply && (
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Twoja odpowiedź:</strong> {opinion.reply}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {!opinion.hasReply && (
                    <button
                      onClick={() => setSelectedOpinion(opinion.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      <FaReply />
                      Odpowiedz
                    </button>
                  )}
                  <button
                    onClick={() => handleFlagOpinion(opinion.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                  >
                    <FaFlag />
                    Zgłoś
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleHelpful(opinion.id, true)}
                    className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FaThumbsUp />
                    <span className="text-sm">{opinion.helpful}</span>
                  </button>
                  <button
                    onClick={() => handleHelpful(opinion.id, false)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FaThumbsDown />
                    <span className="text-sm">{opinion.notHelpful}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {selectedOpinion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Odpowiedz na opinię</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Napisz swoją odpowiedź..."
              className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleReply(selectedOpinion)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Wyślij odpowiedź
              </button>
              <button
                onClick={() => {
                  setSelectedOpinion(null);
                  setReplyText('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opinions; 