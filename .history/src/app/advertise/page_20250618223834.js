import { FaCheckCircle } from "react-icons/fa";
import {
  FaStar,
  FaCrown,
  FaRocket,
  FaHeart,
  FaFireFlameCurved,
  FaTrendingUp,
  FaUsers,
  FaChartLine,
  FaBullhorn,
} from "react-icons/fa6";

export default function Page() {
  return (
    <div className="golden min-h-screen px-6 sm:px-12 lg:px-24 pb-12">
      {/* Hero Section */}
      <div className="text-white h-[50vh] items-center flex justify-center text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="bg-white text-[#ffa920] p-8 max-w-[95%] text-2xl lg:text-4xl font-bold drop-shadow-2xl shadow-black rounded-lg">
            Wypromuj swoją pizzerię z Pizzuj.pl!
          </h1>
          <p className="text-white text-lg lg:text-xl mt-6 max-w-2xl mx-auto font-light">
            Wybierz pakiet idealny dla Twojego biznesu i zacznij przyciągać
            więcej klientów już dziś
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 -mt-20 relative z-20">
        {/* Free Plan */}
        <div className="bg-white flex flex-col px-8 py-8 drop-shadow-2xl shadow-black rounded-2xl border-4 border-gray-200 hover:border-[#ffa920] transition-all duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-6">
            <FaHeart className="text-[#ffa920] text-4xl mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl text-black font-bold mb-2">
              Starter
            </h2>
            <div className="text-4xl font-bold text-[#ffa920] mb-2">0 zł</div>
            <p className="text-gray-600">Idealny na start</p>
          </div>

          <ul className="flex-grow space-y-4">
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Dodaj swoją pizzerię do bazy
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Podstawowe informacje o lokalu
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">Do 3 zdjęć pizzerii</span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Podstawowe menu (do 10 pozycji)
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Opinie i oceny klientów
              </span>
            </li>
          </ul>

          <button className="bg-gray-100 hover:bg-[#ffa920] hover:text-white text-gray-800 font-semibold p-4 w-full text-center mt-8 rounded-lg transition-all duration-300 border-2 border-gray-200 hover:border-[#ffa920]">
            Rozpocznij za darmo
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white flex flex-col px-8 py-8 drop-shadow-2xl shadow-black rounded-2xl border-4 border-[#ffa920] hover:border-[#ec7308] transition-all duration-300 transform hover:-translate-y-2 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-[#ffa920] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
              <FaStar className="mr-2" />
              NAJPOPULARNIEJSZY
            </div>
          </div>

          <div className="text-center mb-6 mt-4">
            <FaCrown className="text-[#ffa920] text-4xl mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl text-black font-bold mb-2">
              Premium
            </h2>
            <div className="text-4xl font-bold text-[#ffa920] mb-2">49 zł</div>
            <p className="text-gray-600">miesięcznie</p>
          </div>

          <ul className="flex-grow space-y-4">
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                <strong>Wszystko z planu Starter +</strong>
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaTrendingUp className="text-[#ffa920] w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Promowanie w wynikach wyszukiwania
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaFireFlameCurved className="text-red-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Znaczek "Polecane" przy pizzerii
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">Nieograniczone zdjęcia</span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Pełne menu z kategoriami i opisami
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Promocje i oferty specjalne
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaUsers className="text-blue-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Statystyki odwiedzin i zainteresowania
              </span>
            </li>
          </ul>

          <button className="golden text-white font-bold p-4 w-full text-center mt-8 rounded-lg transition-all duration-300 hover:bg-[#ec7308] transform hover:scale-105">
            Wybierz Premium
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white flex flex-col px-8 py-8 drop-shadow-2xl shadow-black rounded-2xl border-4 border-purple-500 hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-6">
            <FaRocket className="text-purple-600 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl text-black font-bold mb-2">
              Enterprise
            </h2>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              149 zł
            </div>
            <p className="text-gray-600">miesięcznie</p>
          </div>

          <ul className="flex-grow space-y-4">
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                <strong>Wszystko z planu Premium +</strong>
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaBullhorn className="text-purple-600 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Reklamy bannerowe na stronie głównej
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaStar className="text-yellow-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Pierwszeństwo w wynikach wyszukiwania
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaChartLine className="text-green-600 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Zaawansowane analytics i raporty
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Newsletter do klientów (500/miesiąc)
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Dedykowany opiekun klienta
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Możliwość rezerwacji stolików online
              </span>
            </li>
            <li className="flex items-start">
              <div className="min-w-6 h-6 mt-1">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
              </div>
              <span className="ml-3 text-gray-700">
                Integracja z mediami społecznościowymi
              </span>
            </li>
          </ul>

          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-4 w-full text-center mt-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Skontaktuj się z nami
          </button>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
          Nie jesteś pewien, który pakiet wybrać?
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Skontaktuj się z nami, a pomożemy Ci wybrać najlepsze rozwiązanie dla
          Twojej pizzerii
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#ffa920] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
            Bezpłatna konsultacja
          </button>
          <button className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-[#ffa920] transition-all duration-300">
            Zobacz demo
          </button>
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
