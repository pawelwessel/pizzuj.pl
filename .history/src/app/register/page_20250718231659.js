"use client";
import loginImage from "../../../public/assets/1.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../db/firebase";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { errorCatcher } from "../../lib/errorCatcher";
import {
  parseAffiliateParams,
  trackAffiliateRegistration,
  validateAffiliateParams,
} from "../../lib/affiliateUtils";
import Link from "next/link";
import GoogleAuthButton from "../../components/Auth/GoogleButton";
import {
  FaUserPlus,
  FaHandshake,
  FaGift,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { addDocument } from "../../db/firebase";

export default function Register() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isThinking, setThinking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  // Parse affiliate parameters
  const affiliateParams = parseAffiliateParams(searchParams);
  const isAffiliateRegistration = affiliateParams.affiliate;
  const hasSourceParams = Object.values(affiliateParams).some((param) => param);

  useEffect(() => {
    // Redirect if user is already logged in
    if (user && !loading) {
      router.push("/user");
    }

    // Validate affiliate parameters
    if (hasSourceParams && !validateAffiliateParams(affiliateParams)) {
      console.warn("Invalid affiliate parameters detected");
    }
  }, [user, loading, router, hasSourceParams, affiliateParams]);

  function register() {
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.passwordRepeat
    ) {
      toast.error("Proszę wypełnić wszystkie pola");
      return;
    }

    if (userData.password !== userData.passwordRepeat) {
      toast.error("Hasła nie są identyczne!");
      return;
    }

    if (userData.password.length < 6) {
      toast.error("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    setThinking(true);
    const id = toast.loading("Rejestruję...", {
      position: "top-right",
      isLoading: true,
    });

    (async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        // Update the user's display name
        await updateProfile(userCredential.user, {
          displayName: userData.name,
        });

        // Prepare user data with affiliate information
        const userDocumentData = {
          uid: userCredential.user.uid,
          name: userData.name,
          email: userData.email,
          createdAt: new Date(),
          role: "user",
          // Add affiliate tracking data
          registrationSource: {
            affiliate: isAffiliateRegistration,
            affiliateId: affiliateParams.affiliateId,
            source: affiliateParams.source,
            campaign: affiliateParams.campaign,
            referrer: affiliateParams.referrer,
            registrationDate: new Date(),
          },
          // Initialize affiliate data if coming from affiliate link
          ...(isAffiliateRegistration && {
            affiliateStatus: "pending",
            affiliateTier: "Starter",
            affiliateEarnings: 0,
            affiliateRestaurants: 0,
            affiliateJoinedDate: new Date(),
          }),
        };

        // Add user document to Firestore
        await addDocument("users", userCredential.user.uid, userDocumentData);

        // Track affiliate registration if applicable
        if (hasSourceParams) {
          await trackAffiliateRegistration(
            userDocumentData,
            affiliateParams,
            addDocument
          );
        }

        // Show appropriate success message
        const successMessage = isAffiliateRegistration
          ? `Witaj ${userData.name}! Zarejestrowano pomyślnie w programie partnerskim!`
          : `Witaj ${userData.name}! Zarejestrowano pomyślnie!`;

        toast.update(id, {
          render: successMessage,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setThinking(false);
        router.push(`${process.env.NEXT_PUBLIC_LINK}/user`);
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
    if (e.key === "Enter") {
      register();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="py-12 max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={loginImage}
              alt="Pizzuj Register"
              width={600}
              height={800}
              className="w-full h-[600px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Dołącz do Pizzuj!</h1>
              <p className="text-lg opacity-90 !text-white">
                Odkryj najlepsze pizzerie w Polsce
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 max-w-md mx-auto w-full">
          {/* Affiliate Banner */}
          {isAffiliateRegistration && (
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl">
              <div className="flex items-center gap-3">
                <FaHandshake className="text-orange-600 text-xl" />
                <div>
                  <h3 className="font-semibold text-orange-800 text-lg">
                    Dołączasz do Programu Partnerskiego!
                  </h3>
                  <p className="text-orange-700 text-sm">
                    Zacznij zarabiać promując najlepsze pizzerie w Polsce
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Special Offer Banner */}
          {hasSourceParams && !isAffiliateRegistration && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <FaGift className="text-green-600 text-xl" />
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">
                    Specjalna oferta!
                  </h3>
                  <p className="text-green-700 text-sm">
                    Otrzymałeś specjalny dostęp do naszej platformy
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUserPlus className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isAffiliateRegistration
                ? "Zarejestruj się jako Partner"
                : "Zarejestruj się"}
            </h2>
            <p className="text-gray-600">Utwórz swoje konto Pizzuj</p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
            className="space-y-6"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Imię i nazwisko
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  type="text"
                  id="name"
                  placeholder="Jan Kowalski"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                  placeholder="jan@example.com"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
                  placeholder="Minimum 6 znaków"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
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

            {/* Password Repeat Field */}
            <div className="space-y-2">
              <label
                htmlFor="passwordRepeat"
                className="block text-sm font-medium text-gray-700"
              >
                Powtórz hasło
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  type={showPasswordRepeat ? "text" : "password"}
                  id="passwordRepeat"
                  placeholder="Powtórz hasło"
                  value={userData.passwordRepeat}
                  onChange={(e) =>
                    setUserData({ ...userData, passwordRepeat: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 ${
                    userData.passwordRepeat &&
                    userData.password === userData.passwordRepeat
                      ? "border-green-300 bg-green-50"
                      : userData.passwordRepeat
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswordRepeat ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {userData.passwordRepeat && (
                  <div className="absolute inset-y-0 right-0 pr-12 flex items-center">
                    {userData.password === userData.passwordRepeat ? (
                      <FaCheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-red-300"></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Affiliate Benefits */}
            {isAffiliateRegistration && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <FaHandshake className="mr-2" />
                  Korzyści z programu partnerskiego:
                </h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    Zarabiaj do 15% prowizji
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    Transparentne rozliczenia
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    Własne linki partnerskie
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    Panel statystyk w czasie rzeczywistym
                  </li>
                </ul>
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isThinking}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isThinking ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Rejestracja...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaUserPlus className="mr-2" />
                  {isAffiliateRegistration
                    ? "Zarejestruj się jako Partner"
                    : "Zarejestruj się"}
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Masz już konto?{" "}
              <Link
                href="/login"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                Zaloguj się
              </Link>
            </p>
          </div>

          {/* Debug info removed for production */}
        </div>
      </div>
    </div>
  );
}
