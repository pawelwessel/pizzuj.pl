import { FaChevronCircleRight, FaChevronRight } from "react-icons/fa";
import {
  FaStar,
  FaCrown,
  FaRocket,
  FaHeart,
  FaFire,
  FaUsers,
  FaChartLine,
  FaBullhorn,
} from "react-icons/fa6";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-accent-200/30 to-accent-300/20 rounded-full blur-lg animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-primary-300/20 to-primary-400/15 rounded-full blur-2xl animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 px-6 sm:px-8 lg:px-12 xl:px-24 pb-24">
        {/* Enhanced Hero Section */}
        <div className="min-h-[60vh] flex items-center justify-center text-center pt-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 border-2 border-white/30 shadow-golden-lg backdrop-blur-sm">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-6 leading-tight">
                Wypromuj swoją 
                <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent block mt-2">
                  pizzerię z Pizzuj.pl!
                </span>
              </h1>
              <p className="font-body text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Wybierz pakiet idealny dla Twojego biznesu i zacznij przyciągać
                więcej klientów już dziś
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 -mt-8 relative">
          {/* Enhanced Free Plan */}
          <div className="group bg-white/80 backdrop-blur-sm flex flex-col p-8 xl:p-10 rounded-3xl border-2 border-gray-200/50 hover:border-primary-300 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-large card-hover">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <FaHeart className="text-primary-500 text-5xl mx-auto transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary-200/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl text-gray-900 font-bold mb-4">
                Starter
              </h2>
              <div className="relative">
                <div className="text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2">
                  199 zł
                </div>
                <p className="font-body text-lg text-gray-600">Idealny na start</p>
              </div>
            </div>

            <ul className="flex-grow space-y-5 mb-8">
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Dodaj swoją pizzerię do bazy
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Podstawowe informacje o lokalu
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Do 3 zdjęć pizzerii
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Podstawowe menu (do 10 pozycji)
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Opinie i oceny klientów
                </span>
              </li>
            </ul>

            <button className="font-heading bg-gradient-to-r from-gray-100 to-gray-200 hover:from-primary-500 hover:to-primary-600 hover:text-white text-gray-800 font-semibold py-4 px-6 w-full rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary-500 hover:shadow-golden transform hover:scale-105">
              Rozpocznij za 199 zł
            </button>
          </div>

          {/* Enhanced Premium Plan */}
          <div className="group bg-white/90 backdrop-blur-sm flex flex-col p-8 xl:p-10 rounded-3xl border-2 border-primary-400 hover:border-primary-600 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-golden-lg relative scale-105">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3 rounded-full text-sm font-bold flex items-center shadow-golden font-heading">
                <FaStar className="mr-2 animate-pulse" />
                NAJPOPULARNIEJSZY
              </div>
            </div>

            <div className="text-center mb-8 mt-6">
              <div className="relative inline-block mb-6">
                <FaCrown className="text-primary-500 text-5xl mx-auto transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary-300/40 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl text-gray-900 font-bold mb-4">
                Premium
              </h2>
              <div className="relative">
                <div className="text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2">
                  999 zł
                </div>
                <p className="font-body text-lg text-gray-600">miesięcznie</p>
              </div>
            </div>

            <ul className="flex-grow space-y-5 mb-8">
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  <strong className="text-primary-800">Wszystko z planu Starter +</strong>
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-primary-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Promowanie w wynikach wyszukiwania
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaFire className="text-red-500 w-5 h-5 transition-transform duration-200 group-hover/item:scale-110" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Znaczek "Polecane" przy pizzerii
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Nieograniczone zdjęcia
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Pełne menu z kategoriami i opisami
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Promocje i oferty specjalne
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaUsers className="text-blue-500 w-5 h-5 transition-transform duration-200 group-hover/item:scale-110" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Statystyki odwiedzin i zainteresowania
                </span>
              </li>
            </ul>

            <button className="font-heading bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold py-4 px-6 w-full rounded-2xl transition-all duration-300 shadow-golden hover:shadow-golden-lg transform hover:scale-105">
              Wybierz Premium
            </button>
          </div>

          {/* Enhanced Enterprise Plan */}
          <div className="group bg-white/80 backdrop-blur-sm flex flex-col p-8 xl:p-10 rounded-3xl border-2 border-accent-400/50 hover:border-accent-500 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-large card-hover">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <FaRocket className="text-accent-600 text-5xl mx-auto transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent-200/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl text-gray-900 font-bold mb-4">
                Enterprise
              </h2>
              <div className="relative">
                <div className="text-5xl xl:text-6xl font-bold bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent mb-2">
                  1499 zł
                </div>
                <p className="font-body text-lg text-gray-600">miesięcznie</p>
              </div>
            </div>

            <ul className="flex-grow space-y-5 mb-8">
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  <strong className="text-accent-800">Wszystko z planu Premium +</strong>
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaBullhorn className="text-accent-600 w-5 h-5 transition-transform duration-200 group-hover/item:scale-110" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Reklamy bannerowe na stronie głównej
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaStar className="text-yellow-500 w-5 h-5 transition-transform duration-200 group-hover/item:scale-110" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Pierwszeństwo w wynikach wyszukiwania
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChartLine className="text-green-600 w-5 h-5 transition-transform duration-200 group-hover/item:scale-110" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Zaawansowane analytics i raporty
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Newsletter do klientów (500/miesiąc)
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Dedykowany opiekun klienta
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Możliwość rezerwacji stolików online
                </span>
              </li>
              <li className="flex items-start group/item">
                <div className="min-w-6 h-6 mt-1.5">
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                </div>
                <span className="ml-4 font-body text-gray-700 leading-relaxed">
                  Integracja z mediami społecznościowymi
                </span>
              </li>
            </ul>

            <button className="font-heading bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white font-bold py-4 px-6 w-full rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large">
              Skontaktuj się z nami
            </button>
          </div>
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className="text-center mt-24 mb-12">
          <div className="glass rounded-3xl p-12 md:p-16 text-gray-800 max-w-4xl mx-auto border-2 border-white/30 shadow-golden-lg">
            <h3 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Nie jesteś pewien, który pakiet wybrać?
            </h3>
            <p className="font-body text-xl lg:text-2xl mb-10 text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Skontaktuj się z nami, a pomożemy Ci wybrać najlepsze rozwiązanie dla
              Twojej pizzerii
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="font-heading bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-golden hover:shadow-golden-lg transform hover:scale-105">
                Bezpłatna konsultacja
              </button>
              <button className="font-heading border-2 border-primary-500 hover:border-primary-600 text-primary-700 hover:text-primary-800 font-bold px-10 py-4 rounded-2xl hover:bg-primary-50 transition-all duration-300 transform hover:scale-105">
                Zobacz demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title:
    "Pakiety reklamowe | Wypróbuj bazę pizzerii Pizzuj.pl – najlepsze pizzerie w Polsce",
  description:
    "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl",
    title:
      "Pakiety reklamowe | Wypróbuj bazę pizzerii Pizzuj.pl – najlepsze pizzerie w Polsce",
    description:
      "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
    siteName: "Pizzuj",
  },
  authors: [{ name: "pizzuj.pl", url: "https://pizzuj.pl" }],
  publisher: "wesiu.dev",
  keywords: "pizza, pizza warszawa najlepsza pizza w miescie",
  icons: [
    {
      url: "../../public/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "../../public/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "../../public/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};
