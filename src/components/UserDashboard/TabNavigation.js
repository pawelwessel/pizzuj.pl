"use client";
import { FaUser, FaPizzaSlice, FaCrown, FaComments, FaBullhorn, FaCog, FaGraduationCap } from "react-icons/fa";

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="relative border-b border-orange-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "profile"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaUser className="inline mr-2" />
          Profil
        </button>
        <button
          onClick={() => setActiveTab("pizzerias")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "pizzerias"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaPizzaSlice className="inline mr-2" />
          Moje Pizzerie
        </button>
        <button
          onClick={() => setActiveTab("opinions")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "opinions"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaComments className="inline mr-2" />
          Opinie
        </button>
        <button
          onClick={() => setActiveTab("marketing")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "marketing"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaBullhorn className="inline mr-2" />
          Marketing
        </button>
        <button
          onClick={() => setActiveTab("onboarding")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "onboarding"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaGraduationCap className="inline mr-2" />
          Onboarding
        </button>
        <button
          onClick={() => setActiveTab("subscription")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "subscription"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaCrown className="inline mr-2" />
          Premium
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-300 ${
            activeTab === "settings"
              ? "border-orange-500 text-orange-600 bg-orange-50 shadow-lg"
              : "border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-25"
          }`}
        >
          <FaCog className="inline mr-2" />
          Ustawienia
        </button>
      </nav>
    </div>
  );
} 