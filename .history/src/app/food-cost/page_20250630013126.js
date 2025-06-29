import Image from "next/image";
import accent3 from "../../../public/assets/asset5.png";
import FoodCostCalculator from "../../components/FoodCostCalculator";
import { ptSans } from "../layout";

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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-gray-800 mb-4">
              Dlaczego obliczanie kosztów jest kluczowe?
            </h2>
            <p
              className={`text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto ${ptSans.className}`}
            >
              Poznaj najważniejsze korzyści z dokładnego kalkulowania kosztów
              żywności
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Cards */}
            <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">💰</span>
              </div>
              <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-3">
                Zwiększ rentowność
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dokładne obliczenia pomagają ustalić optymalne ceny, które
                zapewniają odpowiednią marżę zysku.
              </p>
            </div>

            <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
              <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-3">
                Kontroluj koszty
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monitoruj wydatki na składniki i optymalizuj receptury, aby
                zmniejszyć straty.
              </p>
            </div>

            <div className="glass bg-white/80 border border-gray-200/50 rounded-2xl p-6 backdrop-blur-sm shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">🎯</span>
              </div>
              <h3 className="font-cocosharp text-xl font-semibold text-gray-800 mb-3">
                Planuj strategicznie
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Podejmuj świadome decyzje dotyczące menu i cennik na podstawie
                realnych danych.
              </p>
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
    url: "https://pizzuj.pl/food-cost",
  },
  keywords:
    "kalkulator kosztów żywności, rentowność pizzeria, koszty składników, marża zysku, menu pricing, food cost calculator",
};
