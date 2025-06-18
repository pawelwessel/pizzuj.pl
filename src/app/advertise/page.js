import { FaCheckCircle, FaStar, FaCrown, FaRocket, FaHeart, FaFireFlameCurved, FaTrendingUp, FaUsers, FaChartLine, FaBullhorn, FaQuoteLeft, FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="relative px-6 sm:px-12 lg:px-24 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffa920]/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-[#ffa920]/10 text-[#ffa920] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaStar className="mr-2" />
                Zaufana przez ponad 500+ pizzerii w Polsce
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Wypromuj swoją
                <span className="text-[#ffa920]"> pizzerię </span>
                w całej Polsce
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dołącz do największej bazy pizzerii w Polsce i przyciągnij tysiące nowych klientów. 
                Pizzuj.pl to miejsce, gdzie miłośnicy pizzy szukają najlepszych smaków.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#ffa920] hover:bg-[#ec7308] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Rozpocznij za darmo
                  <FaArrowRight className="ml-2" />
                </button>
                <button className="border-2 border-[#ffa920] text-[#ffa920] hover:bg-[#ffa920] hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300">
                  Zobacz demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#ffa920] rounded-full flex items-center justify-center">
                    <FaStar className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Pizza Da Mario</h3>
                    <p className="text-gray-600">Warszawa</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#ffa920] mb-2">+250%</div>
                <p className="text-gray-700">wzrost zamówień w pierwszym miesiącu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="px-6 sm:px-12 lg:px-24 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#ffa920] mb-2">500+</div>
              <p className="text-gray-600">Pizzerii w bazie</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#ffa920] mb-2">50k+</div>
              <p className="text-gray-600">Użytkowników miesięcznie</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#ffa920] mb-2">1M+</div>
              <p className="text-gray-600">Wyświetleń rocznie</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#ffa920] mb-2">95%</div>
              <p className="text-gray-600">Zadowolonych właścicieli</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-6 sm:px-12 lg:px-24 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dlaczego warto wybrać Pizzuj.pl?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nie jesteśmy tylko kolejną platformą. Jesteśmy społecznością miłośników pizzy, 
              która pomaga lokalnym pizzeriom rosnąć i odnosić sukcesy.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#ffa920]/10 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-[#ffa920] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Targetowana publiczność</h3>
              <p className="text-gray-600 leading-relaxed">
                Naši użytkownicy to prawdziwi miłośnicy pizzy, którzy aktywnie szukają nowych smaków 
                i chętnie odwiedzają polecane miejsca.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#ffa920]/10 rounded-full flex items-center justify-center mb-6">
                <FaChartLine className="text-[#ffa920] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mierzalne rezultaty</h3>
              <p className="text-gray-600 leading-relaxed">
                Śledź wzrost zamówień, liczbę wyświetleń i zaangażowanie klientów dzięki 
                naszym zaawansowanym narzędziom analitycznym.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#ffa920]/10 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="text-[#ffa920] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wsparcie lokalnych biznesów</h3>
              <p className="text-gray-600 leading-relaxed">
                Naszą misją jest promowanie lokalnych pizzerii i pomaganie im w konkurowaniu 
                z dużymi sieciami restauracji.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="px-6 sm:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Wybierz plan idealny dla Ciebie
            </h2>
            <p className="text-xl text-gray-600">
              Każdy plan został zaprojektowany z myślą o różnych potrzebach biznesowych
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-[#ffa920] transition-all duration-300 transform hover:-translate-y-2 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#ffa920]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-[#ffa920] text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-[#ffa920] mb-2">0 zł</div>
                <p className="text-gray-600">Idealny na start</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Profil pizzerii w bazie danych</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Podstawowe informacje kontaktowe</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Do 3 zdjęć lokalu</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Podstawowe menu (10 pozycji)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">System ocen i opinii</span>
                </li>
              </ul>
              
              <button className="w-full bg-gray-100 hover:bg-[#ffa920] hover:text-white text-gray-800 font-semibold py-4 rounded-xl transition-all duration-300">
                Rozpocznij za darmo
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#ffa920] transform hover:-translate-y-2 transition-all duration-300 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#ffa920] text-white px-6 py-2 rounded-full text-sm font-bold">
                  NAJPOPULARNIEJSZY
                </div>
              </div>
              
              <div className="text-center mb-8 mt-4">
                <div className="w-16 h-16 bg-[#ffa920] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCrown className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="text-4xl font-bold text-[#ffa920] mb-2">49 zł</div>
                <p className="text-gray-600">miesięcznie</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Wszystko z planu Starter +</strong></span>
                </li>
                <li className="flex items-start">
                  <FaTrendingUp className="text-[#ffa920] w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Wyższe pozycje w wynikach</span>
                </li>
                <li className="flex items-start">
                  <FaFireFlameCurved className="text-red-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Znaczek "Polecane"</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Nieograniczone zdjęcia</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Pełne menu z opisami</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Promocje i oferty specjalne</span>
                </li>
                <li className="flex items-start">
                  <FaUsers className="text-blue-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Statystyki i analytics</span>
                </li>
              </ul>
              
              <button className="w-full bg-[#ffa920] hover:bg-[#ec7308] text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                Wybierz Premium
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-500 hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-2 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">149 zł</div>
                <p className="text-gray-600">miesięcznie</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Wszystko z planu Premium +</strong></span>
                </li>
                <li className="flex items-start">
                  <FaBullhorn className="text-purple-600 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Reklamy na stronie głównej</span>
                </li>
                <li className="flex items-start">
                  <FaStar className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Pierwszeństwo w wynikach</span>
                </li>
                <li className="flex items-start">
                  <FaChartLine className="text-green-600 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Zaawansowane raporty</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Newsletter (500/miesiąc)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Dedykowany opiekun</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Rezerwacje online</span>
                </li>
              </ul>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                Skontaktuj się z nami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="px-6 sm:px-12 lg:px-24 py-20 bg-gradient-to-br from-[#ffa920]/5 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Co mówią nasi klienci?
            </h2>
            <p className="text-xl text-gray-600">
              Historie sukcesu pizzerii, które już z nami współpracują
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <FaQuoteLeft className="text-[#ffa920] text-2xl mr-4" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "W ciągu pierwszego miesiąca nasze zamówienia wzrosły o 250%. 
                Pizzuj.pl przyciągnął dokładnie tych klientów, których szukaliśmy."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ffa920] rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Mario Rossi</div>
                  <div className="text-gray-600">Pizza Da Mario, Warszawa</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <FaQuoteLeft className="text-[#ffa920] text-2xl mr-4" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Najlepsza inwestycja w promocję naszej pizzerii. 
                Analytics pokazują jasno wzrost sprzedaży i rozpoznawalności marki."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ffa920] rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Anna Kowalska</div>
                  <div className="text-gray-600">Pizzeria Mama Mia, Kraków</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <FaQuoteLeft className="text-[#ffa920] text-2xl mr-4" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Obsługa klienta na najwyższym poziomie. 
                Każda wątpliwość została wyjaśniona, a rezultaty przeszły nasze oczekiwania."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ffa920] rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Piotr Nowak</div>
                  <div className="text-gray-600">Pizza Corner, Gdańsk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 sm:px-12 lg:px-24 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Często zadawane pytania
            </h2>
            <p className="text-xl text-gray-600">
              Znajdź odpowiedzi na najczęściej zadawane pytania
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                Jak szybko zobaczę pierwsze rezultaty?
              </h3>
              <p className="text-gray-700">
                Większość naszych klientów obserwuje wzrost ruchu już w pierwszym tygodniu. 
                Pełne rezultaty są widoczne po 2-4 tygodniach od uruchomienia profilu.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                Czy mogę anulować subskrypcję w każdej chwili?
              </h3>
              <p className="text-gray-700">
                Tak, możesz anulować subskrypcję w każdej chwili bez dodatkowych opłat. 
                Twój profil pozostanie aktywny do końca opłaconego okresu.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                Czy otrzymam pomoc w konfiguracji profilu?
              </h3>
              <p className="text-gray-700">
                Oczywiście! Nasz zespół pomoże Ci skonfigurować profil i wgra wszystkie 
                niezbędne informacje. Klienci Premium i Enterprise otrzymują dedykowane wsparcie.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                Jakie formy płatności akceptujecie?
              </h3>
              <p className="text-gray-700">
                Akceptujemy płatności kartą, przelewem bankowym oraz BLIK. 
                Wszystkie płatności są bezpieczne i szyfrowane.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 sm:px-12 lg:px-24 py-20 bg-gradient-to-r from-[#ffa920] to-[#ec7308]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Gotowy, żeby rozpocząć swoją przygodę z Pizzuj.pl?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Dołącz do setek zadowolonych właścicieli pizzerii już dziś
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-[#ffa920] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
              Rozpocznij za darmo
              <FaArrowRight className="ml-2" />
            </button>
            <button className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-[#ffa920] transition-all duration-300">
              Bezpłatna konsultacja
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm opacity-90">
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              +48 123 456 789
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              kontakt@pizzuj.pl
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Warszawa, Polska
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
