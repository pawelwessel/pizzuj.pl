"use client";
import { FaUser, FaEnvelope, FaSave, FaTimes } from "react-icons/fa";

export default function ProfileForm({ 
  isEditingProfile, 
  profileData, 
  handleInputChange, 
  handleProfileUpdate, 
  setIsEditingProfile, 
  userData,
  setProfileData
}) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
      
      <div className="relative flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Informacje o koncie
        </h2>
        {!isEditingProfile && (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaUser /> Edytuj profil
          </button>
        )}
      </div>

      {isEditingProfile ? (
        <form onSubmit={handleProfileUpdate} className="space-y-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaUser className="text-orange-500" />
                Imię i nazwisko
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaEnvelope className="text-orange-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaSave /> Zapisz zmiany
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditingProfile(false);
                setProfileData({
                  name: userData.name || "",
                  email: userData.email || "",
                });
              }}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaTimes /> Anuluj
            </button>
          </div>
        </form>
      ) : (
        <ProfileInfo userData={userData} />
      )}
    </div>
  );
}

function ProfileInfo({ userData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <FaUser className="text-orange-500 text-xl" />
          <p className="text-gray-600 text-sm font-medium">Imię i nazwisko</p>
        </div>
        <p className="font-bold text-xl text-gray-800">{userData.name}</p>
      </div>
      
      <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <FaEnvelope className="text-blue-500 text-xl" />
          <p className="text-gray-600 text-sm font-medium">Email</p>
        </div>
        <p className="font-bold text-xl text-gray-800">{userData.email}</p>
      </div>
      
      <div className="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <FaUser className="text-green-500 text-xl" />
          <p className="text-gray-600 text-sm font-medium">Dołączył</p>
        </div>
        <p className="font-bold text-xl text-gray-800">
          {new Date(userData.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>
      
      <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <FaUser className="text-purple-500 text-xl" />
          <p className="text-gray-600 text-sm font-medium">Typ konta</p>
        </div>
        <p className="font-bold text-xl text-gray-800">
          {userData.isPremium ? "Premium" : "Standard"}
        </p>
      </div>
      
      <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <FaUser className="text-yellow-500 text-xl" />
          <p className="text-gray-600 text-sm font-medium">Status weryfikacji</p>
        </div>
        <p className="font-bold text-xl text-gray-800">
          {userData.emailVerified ? "Zweryfikowany" : "Nie zweryfikowany"}
        </p>
      </div>
      
      <div className="group bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <FaUser className="text-red-500 text-xl" />
          <p className="text-gray-600 text-sm font-medium">Osiągnięcia</p>
        </div>
        <p className="font-bold text-xl text-gray-800">
          {userData.achievements?.length || 0}
        </p>
      </div>
    </div>
  );
} 