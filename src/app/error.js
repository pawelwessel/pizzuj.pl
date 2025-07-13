"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FaHome, FaExclamationTriangle, FaRedo } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Coś poszło nie tak
          </h1>
          <p className="text-gray-600 mb-6">
            Przepraszamy za niedogodności. Wystąpił nieoczekiwany błąd w
            aplikacji.
          </p>
        </div>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Szczegóły błędu (tylko dla deweloperów)
            </summary>
            <div className="bg-gray-100 p-4 rounded-lg text-xs font-mono text-gray-800 overflow-auto max-h-40">
              <pre className="whitespace-pre-wrap">{error.message}</pre>
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaRedo className="text-sm" />
            Spróbuj ponownie
          </button>

          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaHome className="text-sm" />
            Wróć do strony głównej
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Problem nadal występuje?</p>
          <a
            href="mailto:wesiudev@gmail.com"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Skontaktuj się z nami
          </a>
        </div>
      </div>
    </div>
  );
}
