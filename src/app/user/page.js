"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { getDocument } from "../../db/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import AchievementsList from "../../components/Achievements/AchievementsList";

export default function UserProfile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const data = await getDocument("users", user.uid);
        setUserData(data);
      }
    }
    fetchUserData();
  }, [user]);

  const getUserDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "User";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Hello, {getUserDisplayName()}! 👋
          </h1>
          <p className="text-xl text-center text-gray-600">
            Welcome to your Pizzuj dashboard
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {userData ? (
            <>
              <div className="flex items-center gap-6 mb-8">
                <Image
                  src={userData.photoURL || "/assets/user-placeholder.png"}
                  alt={userData.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">{userData.name || getUserDisplayName()}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-4">
                    <AchievementsList achievements={userData.achievements} />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Member Since</p>
                    <p className="font-medium">
                      {new Date(userData.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Account Type</p>
                    <p className="font-medium">
                      {userData.isPremium ? "Premium" : "Standard"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="flex items-center gap-6 mb-8">
                <Image
                  src={user.photoURL || "/assets/user-placeholder.png"}
                  alt={getUserDisplayName()}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h2 className="text-2xl font-bold">{getUserDisplayName()}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <p className="text-gray-600">Setting up your profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
