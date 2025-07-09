"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getDocument, logUserActivity } from "../../db/firebase";
import Settings from "./Settings";
import { toast } from "react-toastify";
import { 
  FaUser, 
  FaCog, 
  FaPizzaSlice, 
  FaChartLine, 
  FaBell,
  FaSignOutAlt
} from "react-icons/fa";

export default function UserDashboard({ 
  children, 
  activeTab = "profile", 
  onTabChange,
  user 
}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (user?.uid) {
        try {
          const data = await getDocument("users", user.uid);
          setUserData(data);
          
          // Log user activity
          await logUserActivity(user.uid, {
            action: "dashboard_visit",
            tab: activeTab,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error("Error loading user data:", error);
          toast.error("Błąd podczas ładowania danych użytkownika");
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadUserData();
  }, [user, activeTab]);

  const handleTabChange = (newTab) => {
    if (onTabChange) {
      onTabChange(newTab);
    }
    
    // Log tab change activity
    if (user?.uid) {
      logUserActivity(user.uid, {
        action: "tab_change",
        from_tab: activeTab,
        to_tab: newTab
      });
    }
  };

  const tabs = [
    { 
      id: "profile", 
      label: "Profil", 
      icon: FaUser,
      description: "Podstawowe informacje o koncie"
    },
    { 
      id: "pizzerias", 
      label: "Moje Pizzerie", 
      icon: FaPizzaSlice,
      description: "Zarządzaj swoimi pizzeriami"
    },
    { 
      id: "analytics", 
      label: "Analityka", 
      icon: FaChartLine,
      description: "Statystyki i raporty"
    },
    { 
      id: "notifications", 
      label: "Powiadomienia", 
      icon: FaBell,
      description: "Centrum powiadomień"
    },
    { 
      id: "settings", 
      label: "Ustawienia", 
      icon: FaCog,
      description: "Ustawienia konta i preferencje"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Ładowanie dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img
                src={userData?.photoURL || "/assets/user-placeholder.png"}
                alt={userData?.name || "User"}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {userData?.name || "Użytkownik"}
                </h1>
                <p className="text-sm text-gray-500">
                  {userData?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                userData?.isPremium 
                  ? "bg-yellow-100 text-yellow-800" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                {userData?.isPremium ? "Premium" : "Standard"}
              </span>
              <button
                onClick={() => auth.signOut()}
                className="text-gray-500 hover:text-red-600 transition-colors"
                title="Wyloguj się"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                title={tab.description}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}