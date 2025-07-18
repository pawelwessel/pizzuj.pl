"use client";
import loginImage from "../../../public/assets/1.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../db/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorCatcher } from "../../lib/errorCatcher";
import Link from "next/link";
import GoogleAuthButton from "../../components/Auth/GoogleButton";
import { FaKey, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isThinking, setThinking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user]);

  function signIn() {
    if (!userData.email || !userData.password) {
      toast.error("Proszę wypełnić wszystkie pola");
      return;
    }

    setThinking(true);
    const id = toast.loading("Loguję...", {
      position: "top-right",
      isLoading: true,
    });

    (async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        const displayName =
          userCredential.user.displayName ||
          userCredential.user.email.split("@")[0] ||
          "User";

        toast.update(id, {
          render: `Witaj ${displayName}! Zalogowano pomyślnie!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setThinking(false);
        router.push("/user");
      } catch (err) {
        const errorMsg = errorCatcher(err);
        toast.update(id, {
          render: errorMsg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setThinking(false);
      }
    })();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      signIn();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={loginImage}
              alt="Pizzuj Login"
              width={600}
              height={800}
              className="w-full h-[600px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Witaj w Pizzuj!</h1>
              <p className="text-lg opacity-90 !text-white">Odkryj najlepsze pizzerie w Polsce</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 max-w-md mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaKey className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Zaloguj się
            </h2>
            <p className="text-gray-600">
              Wróć do swojego konta Pizzuj
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); signIn(); }} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adres email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="twoj@email.com"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Hasło
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Wprowadź hasło"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isThinking}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isThinking ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logowanie...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaKey className="mr-2" />
                  Zaloguj się
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">lub</span>
            </div>
          </div>

          {/* Google Auth */}
          <div className="mb-6">
            <GoogleAuthButton />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Nie masz jeszcze konta?{" "}
              <Link
                href="/register"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                Zarejestruj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
