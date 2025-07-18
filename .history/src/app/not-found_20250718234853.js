import GoBack from "../components/GoBack";
import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* 404 Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-4xl font-bold font-gotham">
              404
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-gotham">
            Strona nie została znaleziona
          </h1>
          <p className="text-gray-600 mb-6 !font-gotham">
            Przepraszamy, ale strona której szukasz nie istnieje lub została
            przeniesiona.
          </p>
        </div>

        {/* Popular Links */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Popularne strony:
          </h3>
          <div className="space-y-2">
            <Link
              href="/najlepsze-pizzerie-na-dowoz/warszawa"
              className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
            >
              <span className="text-orange-700 font-gotham">
                Pizza Warszawa
              </span>
            </Link>
            <Link
              href="/najlepsze-pizzerie-na-dowoz/krakow"
              className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
            >
              <span className="text-orange-700 font-gotham">Pizza Kraków</span>
            </Link>
            <Link
              href="/najlepsze-pizzerie-na-dowoz/poznan"
              className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
            >
              <span className="text-orange-700 font-gotham">Pizza Poznań</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 font-gotham"
          >
            <FaHome className="text-sm" />
            Wróć do strony głównej
          </Link>
          <GoBack />
        </div>

        {/* Search Suggestion */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2 font-gotham">
            Szukasz pizzerii w swoim mieście?
          </p>
          <Link
            href="/"
            className="font-gotham text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1"
          >
            <FaSearch className="text-xs " />
            Wyszukaj pizzerię
          </Link>
        </div>
      </div>
    </div>
  );
}
