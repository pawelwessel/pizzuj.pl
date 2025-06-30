import { FaMoneyBillWave, FaChartLine, FaHeadset, FaClock, FaGift, FaShield } from "react-icons/fa";
import { ptSans } from "../../app/layout";

export default function AffiliateBenefits() {
  const benefits = [
    {
      icon: FaMoneyBillWave,
      title: "Wysokie prowizje",
      description: "Zarabiaj do 15% z każdego zamówienia - jedna z najwyższych stawek na rynku",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: FaChartLine,
      title: "Transparentne rozliczenia",
      description: "Panel partnerski z dokładnymi statystykami i możliwością śledzenia każdego kliknięcia",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: FaHeadset,
      title: "Wsparcie 24/7",
      description: "Dedykowany zespół wsparcia zawsze gotowy do pomocy i odpowiedzi na pytania",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: FaClock,
      title: "Szybkie wypłaty",
      description: "Regularne wypłaty co 2 tygodnie, bez minimalnych progów ani ukrytych opłat",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: FaGift,
      title: "Bonusy i nagrody",
      description: "Dodatkowe premie za najlepszych partnerów oraz specjalne promocje sezonowe",
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      icon: FaShield,
      title: "Sprawdzona platforma",
      description: "Działamy od lat z tysiącami zadowolonych partnerów i stale rosnącą bazą klientów",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-white to-gray-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-5 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-32 right-16 w-28 h-28 opacity-8 rotate-45 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
            animationDelay: "1.5s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-3 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
            animationDelay: "3s",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] max-w-6xl">
        
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-gray-800 leading-tight mb-6">
            Dlaczego wybrać <span className="text-[#ffa920]">nas</span>?
          </h2>
          <p className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${ptSans.className}`}>
            Nasze korzyści sprawiają, że współpraca z nami to nie tylko zarabianie, ale budowanie długoterminowego partnerstwa.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 glass rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-large group-hover:shadow-golden-lg transition-all duration-300 group-hover:scale-105"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon container */}
                <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`${benefit.color} text-2xl`} />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className={`text-gray-600 leading-relaxed ${ptSans.className}`}>
                  {benefit.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#ffa920] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-50 animate-bounce-gentle"></div>
              <div 
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full opacity-30 animate-bounce-gentle"
                style={{ animationDelay: "0.7s" }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="glass bg-gradient-to-r from-[#ffa920]/10 to-[#ec7308]/10 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-[#ffa920]/20 shadow-large">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Gotowy na start?
            </h3>
            <p className={`text-lg text-gray-600 mb-6 ${ptSans.className}`}>
              Dołącz do grona naszych partnerów i rozpocznij zarabianie już dziś!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-sm text-gray-500">
                ✓ Rejestracja w 2 minuty  ✓ Bez opłat  ✓ Pierwsze prowizje już po tygodniu
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}