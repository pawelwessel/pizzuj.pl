"use client";
import React, { useState, useEffect } from 'react';
import { generateAffiliateLink, getAffiliateStats } from '../../lib/affiliateUtils';
import { FaCopy, FaShare, FaLink, FaQrcode, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AffiliateLinkGenerator = ({ userData }) => {
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [selectedSource, setSelectedSource] = useState('general');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [customCampaign, setCustomCampaign] = useState('');
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Set base URL
    setBaseUrl(`${window.location.origin}/register`);
    
    // Initialize with default links
    const defaultLinks = [
      {
        id: 'general',
        name: 'Ogólny link partnerski',
        url: generateAffiliateLink(`${window.location.origin}/register`, userData?.uid),
        source: 'general',
        campaign: 'general',
        clicks: 0,
        conversions: 0,
      }
    ];
    setGeneratedLinks(defaultLinks);
  }, [userData?.uid]);

  const sources = [
    { value: 'general', label: 'Ogólny' },
    { value: 'email', label: 'Email' },
    { value: 'social', label: 'Social Media' },
    { value: 'website', label: 'Strona internetowa' },
    { value: 'blog', label: 'Blog' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

  const campaigns = [
    { value: 'general', label: 'Ogólna kampania' },
    { value: 'summer2024', label: 'Lato 2024' },
    { value: 'pizzaweek', label: 'Tydzień Pizzy' },
    { value: 'newpartners', label: 'Nowi Partnerzy' },
    { value: 'custom', label: 'Własna kampania' },
  ];

  const generateNewLink = () => {
    const campaign = selectedCampaign === 'custom' ? customCampaign : selectedCampaign;
    
    if (selectedCampaign === 'custom' && !customCampaign.trim()) {
      toast.error('Wprowadź nazwę kampanii');
      return;
    }

    const newLink = {
      id: `${selectedSource}_${campaign}_${Date.now()}`,
      name: `Link ${sources.find(s => s.value === selectedSource)?.label} - ${campaigns.find(c => c.value === selectedCampaign)?.label || campaign}`,
      url: generateAffiliateLink(baseUrl, userData?.uid, selectedSource, campaign),
      source: selectedSource,
      campaign: campaign,
      clicks: 0,
      conversions: 0,
      createdAt: new Date(),
    };

    setGeneratedLinks(prev => [...prev, newLink]);
    toast.success('Nowy link partnerski został wygenerowany!');
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link skopiowany do schowka!');
    } catch (err) {
      toast.error('Nie udało się skopiować linku');
    }
  };

  const shareLink = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Dołącz do programu partnerskiego Pizzuj.pl',
          text: 'Zarabiaj promując najlepsze pizzerie w Polsce!',
          url: link.url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard(link.url);
    }
  };

  const generateQRCode = (url) => {
    // This would integrate with a QR code generation service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    window.open(qrUrl, '_blank');
  };

  const downloadLinks = () => {
    const csvContent = [
      ['Nazwa', 'Link', 'Źródło', 'Kampania', 'Kliknięcia', 'Konwersje'],
      ...generatedLinks.map(link => [
        link.name,
        link.url,
        link.source,
        link.campaign,
        link.clicks,
        link.conversions
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'affiliate-links.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const affiliateStats = getAffiliateStats(userData);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <h3 className="text-orange-800 font-semibold">Twój Tier</h3>
          <p className="text-2xl font-bold text-orange-600">{affiliateStats.tier}</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <h3 className="text-green-800 font-semibold">Zarobki</h3>
          <p className="text-2xl font-bold text-green-600">{affiliateStats.earnings.toLocaleString()} zł</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <h3 className="text-blue-800 font-semibold">Restauracje</h3>
          <p className="text-2xl font-bold text-blue-600">{affiliateStats.restaurants}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <h3 className="text-purple-800 font-semibold">Linki</h3>
          <p className="text-2xl font-bold text-purple-600">{generatedLinks.length}</p>
        </div>
      </div>

      {/* Link Generator */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Generuj nowy link partnerski</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Źródło
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {sources.map(source => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kampania
            </label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {campaigns.map(campaign => (
                <option key={campaign.value} value={campaign.value}>
                  {campaign.label}
                </option>
              ))}
            </select>
          </div>

          {selectedCampaign === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwa kampanii
              </label>
              <input
                type="text"
                value={customCampaign}
                onChange={(e) => setCustomCampaign(e.target.value)}
                placeholder="Wprowadź nazwę kampanii"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          )}
        </div>

        <button
          onClick={generateNewLink}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <FaLink /> Generuj link
        </button>
      </div>

      {/* Generated Links */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Twoje linki partnerskie</h2>
          <button
            onClick={downloadLinks}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
          >
            <FaDownload /> Pobierz CSV
          </button>
        </div>

        <div className="space-y-4">
          {generatedLinks.map((link) => (
            <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{link.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(link.url)}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Kopiuj link"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => shareLink(link)}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Udostępnij"
                  >
                    <FaShare />
                  </button>
                  <button
                    onClick={() => generateQRCode(link.url)}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Generuj QR kod"
                  >
                    <FaQrcode />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-600 break-all">{link.url}</p>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>Źródło: {sources.find(s => s.value === link.source)?.label}</span>
                <span>Kampania: {link.campaign}</span>
                <span>Kliknięcia: {link.clicks}</span>
                <span>Konwersje: {link.conversions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Wskazówki dotyczące linków partnerskich</h3>
        <ul className="text-blue-700 space-y-2 text-sm">
          <li>• Używaj różnych linków dla różnych źródeł ruchu</li>
          <li>• Twórz kampanie tematyczne (np. "Lato 2024", "Tydzień Pizzy")</li>
          <li>• Śledź skuteczność każdego linku osobno</li>
          <li>• Udostępniaj linki na różnych platformach społecznościowych</li>
          <li>• Używaj QR kodów na materiałach drukowanych</li>
        </ul>
      </div>
    </div>
  );
};

export default AffiliateLinkGenerator; 