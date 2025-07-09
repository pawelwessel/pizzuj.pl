"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { getDocument } from "../../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUsers, FaPizzaSlice, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";

export default function AdminPanel() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    async function checkAdminAccess() {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const data = await getDocument("users", user.uid);
        if (!data || data.role !== "admin") {
          toast.error("Brak uprawnień dostępu do panelu administracyjnego");
          router.push("/user");
          return;
        }
        setUserData(data);
      } catch (error) {
        toast.error("Błąd podczas sprawdzania uprawnień");
        router.push("/user");
      } finally {
        setLoading(false);
      }
    }

    checkAdminAccess();
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
      toast.success("Wylogowano pomyślnie");
    } catch (error) {
      toast.error("Błąd podczas wylogowywania");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-700">Ładowanie panelu administracyjnego...</h1>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FaCog className="h-8 w-8 text-orange-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Panel Administracyjny</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Zalogowany jako: {userData.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 !text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaSignOutAlt /> Wyloguj
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaChartBar className="inline mr-2" />
              Przegląd
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaUsers className="inline mr-2" />
              Użytkownicy
            </button>
            <button
              onClick={() => setActiveTab("pizzerias")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "pizzerias"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaPizzaSlice className="inline mr-2" />
              Pizzerie
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg">
          {activeTab === "overview" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Przegląd systemu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <FaUsers className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Użytkownicy</p>
                      <p className="text-2xl font-bold text-blue-600">-</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <FaPizzaSlice className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Pizzerie</p>
                      <p className="text-2xl font-bold text-green-600">-</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <FaChartBar className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Aktywni dzisiaj</p>
                      <p className="text-2xl font-bold text-yellow-600">-</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <FaCog className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">System</p>
                      <p className="text-2xl font-bold text-purple-600">OK</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Zarządzanie użytkownikami</h2>
              <div className="text-center py-12">
                <FaUsers className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-600">Funkcja zarządzania użytkownikami będzie dostępna wkrótce.</p>
              </div>
            </div>
          )}

          {activeTab === "pizzerias" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Zarządzanie pizzeriami</h2>
              <div className="text-center py-12">
                <FaPizzaSlice className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-600">Funkcja zarządzania pizzeriami będzie dostępna wkrótce.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}