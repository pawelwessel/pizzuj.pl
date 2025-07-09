"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { getDocument } from "../../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaPizzaSlice, FaChartLine, FaCog, FaShield } from "react-icons/fa";

export default function AdminPage() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdminAccess() {
      if (loading) return;
      
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const data = await getDocument("users", user.uid);
        setUserData(data);
        
        // Check if user has admin or owner role
        const userRole = data?.role?.toLowerCase();
        const hasAdminAccess = userRole === "admin" || userRole === "owner";
        
        if (hasAdminAccess) {
          setIsAuthorized(true);
        } else {
          // Redirect non-admin users to their regular dashboard
          router.push("/user");
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        router.push("/user");
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAdminAccess();
  }, [user, loading, router]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Sprawdzanie uprawnień...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaShield className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Brak uprawnień</h2>
          <p className="text-gray-600">Przekierowywanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FaShield className="text-orange-500 text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Panel Administratora</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Witaj, {userData?.name || user?.displayName || user?.email}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {userData?.role || "Admin"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaUsers className="text-blue-500 text-3xl mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Użytkownicy</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaPizzaSlice className="text-orange-500 text-3xl mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Pizzerie</p>
                <p className="text-2xl font-bold text-gray-900">567</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaChartLine className="text-green-500 text-3xl mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Odwiedziny</p>
                <p className="text-2xl font-bold text-gray-900">12,345</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaCog className="text-purple-500 text-3xl mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-500">Aktywne</p>
                <p className="text-2xl font-bold text-gray-900">89%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Zarządzanie użytkownikami</h3>
            <p className="text-gray-600 mb-4">Przeglądaj, edytuj i zarządzaj kontami użytkowników</p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Zarządzaj użytkownikami
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pizzerie</h3>
            <p className="text-gray-600 mb-4">Moderuj i zarządzaj pizzeriami w systemie</p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Zarządzaj pizzeriami
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analityka</h3>
            <p className="text-gray-600 mb-4">Przeglądaj raporty i statystyki platformy</p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Zobacz analitykę
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ostatnia aktywność</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUsers className="text-blue-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Nowy użytkownik się zarejestrował</p>
                  <p className="text-xs text-gray-500">2 minuty temu</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaPizzaSlice className="text-orange-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Nowa pizzeria została dodana</p>
                  <p className="text-xs text-gray-500">15 minut temu</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-green-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Raport miesięczny został wygenerowany</p>
                  <p className="text-xs text-gray-500">1 godzinę temu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}