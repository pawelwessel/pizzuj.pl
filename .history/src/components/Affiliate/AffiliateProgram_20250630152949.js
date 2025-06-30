import { FaPizzaSlice, FaUsers, FaCity, FaPercent } from "react-icons/fa";
import { ptSans } from "../../app/layout";

export default function AffiliateProgram() {
  const stats = [
    {
      icon: FaPizzaSlice,
      number: "500+",
      label: "Pizzerii w bazie",
      color: "text-orange-500",
    },
    {
      icon: FaCity,
      number: "50+",
      label: "Miast w Polsce",
      color: "text-blue-500",
    },
    {
      icon: FaUsers,
      number: "1000+",
      label: "Aktywnych partnerów",
      color: "text-green-500",
    },
    {
      icon: FaPercent,
      number: "15%",
      label: "Maksymalna prowizja",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-5 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 opacity-8 rotate-45 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-gray-800 leading-tight mb-6">
            Dlaczego <span className="text-[#ffa920]">Pizzuj.pl</span>?
          </h2>
          <p
            className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${ptSans.className}`}
          >
            Jesteśmy największą platformą łączącą miłośników pizzy z najlepszymi
            pizzeriami w Polsce. Nasz program partnerski to sprawdzona droga do
            stabilnych przychodów.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 glass rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-large group-hover:shadow-golden-lg transition-all duration-300 group-hover:scale-105"></div>

              {/* Content */}
              <div className="relative z-10">
                <stat.icon
                  className={`${stat.color} text-3xl lg:text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                />
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p
                  className={`!text-white text-sm lg:text-base font-medium ${ptSans.className}`}
                >
                  {stat.label}
                </p>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-60 animate-bounce-gentle"></div>
              <div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full opacity-40 animate-bounce-gentle"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          ))}
        </div>

        {/* Program description */}
        <div className="relative">
          {/* Glass container */}
          <div className="glass bg-white/30 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/50 shadow-large">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text content */}
              <div>
                <h3 className="font-cocosharp-italic text-2xl lg:text-3xl text-gray-800 mb-6">
                  Jak działa nasz program?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#ffa920] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                      1
                    </div>
                    <p className={`text-gray-700 ${ptSans.className}`}>
                      <span className="font-semibold">Zarejestruj się</span> w
                      naszym programie partnerskim - to zajmuje tylko 2 minuty
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#ff8f00] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                      2
                    </div>
                    <p className={`text-gray-700 ${ptSans.className}`}>
                      <span className="font-semibold">
                        Otrzymaj unikalne linki
                      </span>{" "}
                      do pizzerii i rozpocznij promocję
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#ec7308] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                      3
                    </div>
                    <p className={`text-gray-700 ${ptSans.className}`}>
                      <span className="font-semibold">Zarabiaj prowizję</span> z
                      każdego zamówienia złożonego przez Twoich poleceń
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual element */}
              <div className="relative">
                <div className="glass bg-gradient-to-br from-[#ffa920]/20 to-[#ec7308]/20 p-8 rounded-2xl text-center">
                  <FaPizzaSlice className="text-6xl lg:text-7xl text-[#ffa920] mx-auto mb-4 animate-bounce-gentle" />
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    Rozpocznij już dziś!
                  </h4>
                  <p className={`text-gray-600 ${ptSans.className}`}>
                    Bez opłat rejestracyjnych, bez ukrytych kosztów
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
