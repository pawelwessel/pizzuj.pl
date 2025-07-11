"use client";
import Image from "next/image";
import { FaCrown, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../db/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UserHeader({ userData }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Wylogowano pomyślnie!");
      router.push("/");
    } catch (error) {
      toast.error("Błąd podczas wylogowywania");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-white via-orange-50 to-white rounded-2xl shadow-2xl p-8 mb-8 overflow-hidden">
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shine"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Image
              src={userData.photoURL || "/assets/123.png"}
              alt={userData.name}
              width={120}
              height={120}
              className="relative rounded-full border-4 border-white shadow-xl"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-2">
              {userData.name}
            </h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <FaEnvelope className="text-orange-500" />
              {userData.email}
            </p>
            {userData.isPremium && (
              <div className="flex items-center gap-2 mt-2">
                <FaCrown className="text-yellow-500 animate-pulse" />
                <span className="text-yellow-600 font-semibold">Konto Premium</span>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            <FaSignOutAlt />
            Wyloguj się
          </button>
          <p className="text-xs text-gray-500 text-center">
            Kliknij aby się wylogować
          </p>
        </div>
      </div>
    </div>
  );
} 