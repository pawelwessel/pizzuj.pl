"use client";
import React from "react";
import {
  createUser,
  getDocument,
  provider,
  getDocuments,
} from "../../db/firebase";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { errorCatcher } from "../../lib/errorCatcher";
import { toast } from "react-toastify";

async function sendVerificationEmail(email, verificationCode) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/sendVerificationEmail?email=${email}&verificationCode=${verificationCode}`
  );
  return data;
}

export default function GoogleAuthButton() {
  const router = useRouter();
  
  async function googleHandler() {
    const auth = getAuth();
    const loadingToast = toast.loading("Loguję z Google...", {
      position: "top-right",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const existingUser = await getDocument("users", user?.uid);

      const displayName =
        user?.displayName || user?.email?.split("@")[0] || "User";

      if (!existingUser) {
        // Get total user count
        const users = await getDocuments("users");
        const isPioneer = users.length < 100;

        await createUser({
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          isPremium: false,
          emailVerified: false,
          achievements: isPioneer ? ["pioneer"] : [],
          joinDate: new Date().toISOString(),
        });
        await sendVerificationEmail(user?.email, user?.uid);

        toast.update(loadingToast, {
          render: `Witaj ${displayName}! Konto utworzone pomyślnie!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(loadingToast, {
          render: `Witaj ${displayName}! Zalogowano pomyślnie!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      router.push(`${process.env.NEXT_PUBLIC_URL}/user`);
    } catch (error) {
      toast.update(loadingToast, {
        render: errorCatcher(error),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }
  
  return (
    <button
      onClick={googleHandler}
      type="button"
      className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 48 48"
        >
          <defs>
            <path
              id="a"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            />
          </defs>
          <clipPath id="b">
            <use href="#a" overflow="visible" />
          </clipPath>
          <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
          <path
            clipPath="url(#b)"
            fill="#EA4335"
            d="M0 11l17 13 7-6.1L48 14V0H0z"
          />
          <path
            clipPath="url(#b)"
            fill="#34A853"
            d="M0 37l30-23 7.9 1L48 0v48H0z"
          />
          <path
            clipPath="url(#b)"
            fill="#4285F4"
            d="M48 48L17 24l-4-3 35-10z"
          />
        </svg>
        <span className="ml-3">Kontynuuj z Google</span>
      </div>
    </button>
  );
}
