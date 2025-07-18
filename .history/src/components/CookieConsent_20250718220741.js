"use client";
import { useState, useEffect } from "react";
import { FaCookieBite, FaTimes, FaCheck } from "react-icons/fa";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    } else {
      setAccepted(consent === "accepted");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setAccepted(true);
    setShowConsent(false);

    // Enable analytics here if needed
    // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setAccepted(false);
    setShowConsent(false);

    // Disable analytics here if needed
    // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Cookie Icon and Text */}
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaCookieBite className="text-orange-600 text-xl" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Używamy plików cookie
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-cocosharp">
                Używamy plików cookie, aby poprawić funkcjonalność strony,
                analizować ruch i personalizować treści. Klikając "Akceptuję",
                wyrażasz zgodę na używanie wszystkich plików cookie.{" "}
                <a
                  href="/privacy"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Dowiedz się więcej
                </a>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FaTimes className="text-sm" />
              Odrzuć
            </button>

            <button
              onClick={handleAccept}
              className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <FaCheck className="text-sm" />
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
