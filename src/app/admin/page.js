"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MinimalBreadcrumb from "../../components/MinimalBreadcrumb";
import AdminAuth from "../../components/AdminAuth";
import { 
  FaUsers, 
  FaPizzaSlice, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter
} from "react-icons/fa";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Strona główna", href: "/" },
    { label: "Panel Administracyjny" }
  ];

  // Sample data - in real app this would come from API
  const stats = {
    totalUsers: 1247,
    totalPizzerias: 89,
    totalOrders: 3456,
    revenue: 45678
  };

  const recentUsers = [
    { id: 1, name: "Jan Kowalski", email: "jan@example.com", joined: "2024-01-15", status: "active" },
    { id: 2, name: "Anna Nowak", email: "anna@example.com", joined: "2024-01-14", status: "active" },
    { id: 3, name: "Piotr Wiśniewski", email: "piotr@example.com", joined: "2024-01-13", status: "pending" },
  ];

  const recentPizzerias = [
    { id: 1, name: "Pizzeria Roma", city: "Warszawa", status: "active", rating: 4.5 },
    { id: 2, name: "Pizza Express", city: "Kraków", status: "active", rating: 4.2 },
    { id: 3, name: "Domino's Pizza", city: "Wrocław", status: "pending", rating: 0 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.push("/admin-login");
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaUsers className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Użytkownicy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaPizzaSlice className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pizzerie</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPizzerias}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaChartBar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Zamówienia</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FaCog className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Przychód</p>
              <p className="text-2xl font-bold text-gray-900">{stats.revenue.toLocaleString()} zł</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatni użytkownicy</h3>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnie pizzerie</h3>
          <div className="space-y-4">
            {recentPizzerias.map((pizzeria) => (
              <div key={pizzeria.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{pizzeria.name}</p>
                  <p className="text-sm text-gray-600">{pizzeria.city}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pizzeria.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pizzeria.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Zarządzanie użytkownikami</h3>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FaPlus className="w-4 h-4" />
          <span>Dodaj użytkownika</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj użytkowników..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <FaFilter className="w-4 h-4" />
          <span>Filtry</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Nazwa</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Data dołączenia</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4 text-gray-600">{user.joined}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPizzerias = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Zarządzanie pizzeriach</h3>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FaPlus className="w-4 h-4" />
          <span>Dodaj pizzeriach</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj pizzerii..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <FaFilter className="w-4 h-4" />
          <span>Filtry</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Nazwa</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Miasto</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Ocena</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {recentPizzerias.map((pizzeria) => (
              <tr key={pizzeria.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{pizzeria.name}</td>
                <td className="py-3 px-4 text-gray-600">{pizzeria.city}</td>
                <td className="py-3 px-4 text-gray-600">{pizzeria.rating}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pizzeria.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pizzeria.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Ustawienia systemu</h3>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Ogólne ustawienia</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwa strony
              </label>
              <input
                type="text"
                defaultValue="Pizzuj.pl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email kontaktowy
              </label>
              <input
                type="email"
                defaultValue="kontakt@pizzuj.pl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Ustawienia bezpieczeństwa</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Dwuetapowa weryfikacja</p>
                <p className="text-sm text-gray-600">Wymagaj 2FA dla administratorów</p>
              </div>
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
                Włącz
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Sesje użytkowników</p>
                <p className="text-sm text-gray-600">Maksymalny czas sesji</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>24 godziny</option>
                <option>7 dni</option>
                <option>30 dni</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg">
            Zapisz ustawienia
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <MinimalBreadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel Administracyjny</h1>
            <p className="text-gray-600 mt-2">Zarządzaj platformą Pizzuj.pl</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Wyloguj się</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: "overview", label: "Przegląd", icon: FaChartBar },
              { id: "users", label: "Użytkownicy", icon: FaUsers },
              { id: "pizzerias", label: "Pizzerie", icon: FaPizzaSlice },
              { id: "settings", label: "Ustawienia", icon: FaCog },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "users" && renderUsers()}
          {activeTab === "pizzerias" && renderPizzerias()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
    </div>
    </AdminAuth>
  );
}