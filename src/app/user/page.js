"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { getDocument, updateUserProfile } from "../../db/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import PizzeriaDashboard from "../../components/PizzeriaDashboard";
import Settings from "../../components/UserDashboard/Settings";
import { toast } from "react-toastify";
import { FaEdit, FaSave, FaTimes, FaUser, FaPizzaSlice, FaCog } from "react-icons/fa";

export default function UserProfile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const data = await getDocument("users", user.uid);
        setUserData(data);
        setProfileData({
          name: data?.name || "",
          email: data?.email || "",
        });
      }
    }
    fetchUserData();
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user.uid, profileData);
      setUserData((prev) => ({ ...prev, ...profileData }));
      setIsEditingProfile(false);
      toast.success("Profil został zaktualizowany!");
    } catch (error) {
      toast.error("Błąd podczas aktualizacji profilu");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <Image
              src={userData.photoURL || "/assets/user-placeholder.png"}
              alt={userData.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaUser className="inline mr-2" />
                Profil
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
                Moje Pizzerie
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "settings"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaCog className="inline mr-2" />
                Ustawienia
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Informacje o koncie</h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-blue-500 hover:bg-blue-600 !text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaEdit /> Edytuj profil
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 !text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                    className="bg-gray-500 hover:bg-gray-600 !text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaTimes /> Anuluj
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Imię i nazwisko</p>
                  <p className="font-medium text-lg">{userData.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium text-lg">{userData.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Dołączył</p>
                  <p className="font-medium text-lg">
                    {new Date(userData.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Typ konta</p>
                  <p className="font-medium text-lg">
                    {userData.isPremium ? "Premium" : "Standard"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Status weryfikacji</p>
                  <p className="font-medium text-lg">
                    {userData.emailVerified
                      ? "Zweryfikowany"
                      : "Nie zweryfikowany"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Osiągnięcia</p>
                  <p className="font-medium text-lg">
                    {userData.achievements?.length || 0}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "pizzerias" && <PizzeriaDashboard user={user} />}
        
        {activeTab === "settings" && <Settings user={user} />}
      </div>
    </div>
  );
}
