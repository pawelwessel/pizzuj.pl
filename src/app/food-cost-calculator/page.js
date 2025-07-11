import Image from "next/image";
import accent3 from "../../../public/assets/asset5.png";
import FoodCostCalculator from "../../components/FoodCostCalculator";
import { ptSans } from "../layout";
// in /food-cost-calculator allow to have more than 1 item, allow to clear all and start with 1 empty input, display a list of current items below the component
export default function FoodCostPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden">
        {/* Decorative background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={accent3}
            alt="Pizza decoration"
            className="absolute w-24 sm:w-32 lg:w-40 xl:w-48 h-auto top-8 right-8 lg:right-24 opacity-20 lg:opacity-30 animate-bounce-gentle"
            width={250}
            height={250}
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center space-y-8 lg:space-y-12">
            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="font-cocosharp-bold-italic text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                Kalkulator{" "}
                <span className="text-[#ffa920] font-cocosharp-bold-italic">
                  kosztów żywności
                </span>
              </h1>
              <p className="font-cocosharp text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Oblicz dokładne koszty potraw w Twojej pizzerii. Profesjonalne
                narzędzie do zarządzania rentownością menu.
              </p>
            </div>

            {/* Benefits */}
            <div className="glass bg-white/60 border border-primary-200/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8 backdrop-blur-sm shadow-medium">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-center gap-3 p-4 bg-gray-300/30 rounded-xl border border-gray-400/50">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 text-2xl font-bold">✓</span>
                  </div>
                  <span className="font-cocosharp text-gray-700">
                    Precyzyjne kalkulacje
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-300/30 rounded-xl border border-gray-400/50">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 text-2xl font-bold">✓</span>
                  </div>
                  <span className="font-cocosharp text-gray-700">
                    Optymalizacja marży
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-300/30 rounded-xl border border-gray-400/50">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 text-2xl font-bold">✓</span>
                  </div>
                  <span className="font-cocosharp text-gray-700">
                    Kontrola rentowności
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <FoodCostCalculator />
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#ffa920] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#ffa920] rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ffa920] rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 to-primary-200 px-6 py-3 rounded-full mb-6">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Kluczowe korzyści</span>
            </div>
            <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Dlaczego obliczanie kosztów jest kluczowe?
            </h2>
            <p className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${ptSans.className}`}>
              Poznaj najważniejsze korzyści z dokładnego kalkulowania kosztów żywności i zoptymalizuj rentowność swojej pizzerii
            </p>
            <div className="flex justify-center items-center gap-2 mt-8">
              <div className="w-8 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
              <div className="w-4 h-1 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Enhanced Benefit Cards */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass bg-white/90 border border-white/50 rounded-3xl p-8 backdrop-blur-sm shadow-medium hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-t-4 border-t-primary-400">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-2xl font-bold">💰</span>
                </div>
                <h3 className="font-cocosharp text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  Zwiększ rentowność
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Dokładne obliczenia pomagają ustalić optymalne ceny, które zapewniają odpowiednią marżę zysku i maksymalizują przychody.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center text-sm text-primary-600 font-semibold">
                    <span>Dowiedz się więcej</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass bg-white/90 border border-white/50 rounded-3xl p-8 backdrop-blur-sm shadow-medium hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-t-4 border-t-blue-400">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-2xl font-bold">📊</span>
                </div>
                <h3 className="font-cocosharp text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Kontroluj koszty
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Monitoruj wydatki na składniki i optymalizuj receptury, aby zmniejszyć straty i zwiększyć efektywność operacyjną.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center text-sm text-blue-600 font-semibold">
                    <span>Dowiedz się więcej</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass bg-white/90 border border-white/50 rounded-3xl p-8 backdrop-blur-sm shadow-medium hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-t-4 border-t-purple-400">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="font-cocosharp text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Planuj strategicznie
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Podejmuj świadome decyzje dotyczące menu i cennik na podstawie realnych danych i analiz rynkowych.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center text-sm text-purple-600 font-semibold">
                    <span>Dowiedz się więcej</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Kalkulator kosztów żywności - Pizzuj.pl | Oblicz rentowność potraw",
  description:
    "Profesjonalny kalkulator kosztów żywności dla pizzerii. Oblicz dokładne koszty składników, marżę zysku i optymalizuj ceny w menu. Zwiększ rentowność swojej restauracji.",
  openGraph: {
    title: "Kalkulator kosztów żywności - Pizzuj.pl",
    description:
      "Oblicz dokładne koszty potraw i optymalizuj rentowność swojej pizzerii z naszym profesjonalnym kalkulatorem.",
    type: "website",
    url: "https://pizzuj.pl/food-cost-calculator",
  },
  keywords:
    "kalkulator kosztów żywności, rentowność pizzeria, koszty składników, marża zysku, menu pricing, food cost calculator",
};
