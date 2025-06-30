import {
  FaUserPlus,
  FaLink,
  FaShare,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import { ptSans } from "../../app/layout";

export default function AffiliateHowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FaUserPlus,
      title: "Rejestracja",
      description:
        "Załóż darmowe konto partnerskie. Proces trwa tylko 2 minuty i nie wymaga żadnych opłat.",
      details: [
        "Wypełnij prosty formularz",
        "Potwierdź adres email",
        "Zaloguj się do panelu",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: FaLink,
      title: "Otrzymaj linki",
      description:
        "Dostaniesz unikalne linki partnerskie do wszystkich pizzerii w naszej bazie.",
      details: [
        "Indywidualne linki do pizzerii",
        "Kody promocyjne",
        "Materiały marketingowe",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      number: "03",
      icon: FaShare,
      title: "Promuj pizzerie",
      description:
        "Udostępniaj linki w social mediach, na blogu, stronie internetowej lub znajomym.",
      details: [
        "Social media",
        "Blog/strona www",
        "Email marketing",
        "Polecanie znajomym",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "04",
      icon: FaMoneyBillWave,
      title: "Zarabiaj prowizje",
      description:
        "Otrzymuj prowizję z każdego zamówienia złożonego przez osoby, które kliknęły Twój link.",
      details: [
        "Do 15% prowizji",
        "Wypłaty co 2 tygodnie",
        "Bez minimalnych progów",
      ],
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section
      id="jak-to-dziala"
      className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 right-12 w-32 h-32 rounded-full opacity-10 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-24 left-16 w-24 h-24 opacity-15 rotate-45 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full opacity-8 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-6">
            Jak to <span className="text-[#ffa920]">działa</span>?
          </h2>
          <p
            className={`text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${ptSans.className}`}
          >
            Prosty proces w 4 krokach, który pozwoli Ci zacząć zarabiać w ciągu
            kilku minut.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffa920]/30 to-transparent transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step container */}
                <div className="relative">
                  {/* Glass background */}
                  <div className="glass bg-white/10 backdrop-blur-xl p-6 lg:p-8 rounded-2xl border border-white/20 hover:border-[#ffa920]/50 transition-all duration-300 group-hover:scale-105 card-hover">
                    {/* Step number */}
                    <div
                      className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-r from-[#ffa920]/20 to-[#ec7308]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="text-[#ffa920] text-2xl" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`!text-white z-50 leading-relaxed mb-6 ${ptSans.className}`}
                    >
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center gap-3 text-sm text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-[#ffa920] rounded-full flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ffa920]/5 to-[#ec7308]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Arrow connector (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                      <FaArrowRight
                        className="text-[#ffa920] text-xl animate-bounce-gentle"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      />
                    </div>
                  )}
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#ffa920] to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="glass bg-gradient-to-r from-[#ffa920]/20 to-[#ec7308]/20 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-[#ffa920]/30 shadow-large">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Brzmi prosto? Bo tak właśnie jest!
            </h3>
            <p className={`text-lg text-gray-300 mb-6 ${ptSans.className}`}>
              Tysiące naszych partnerów już zarabia. Dołącz do nich już dziś.
            </p>
            <button className="group relative inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-[#ffa920] hover:bg-[#ff8f00] !text-white font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-golden-lg shadow-golden">
              <span className="relative z-10">Zacznij zarabiać</span>
              <FaArrowRight className="text-lg lg:text-xl transition-transform duration-300 group-hover:translate-x-1" />

              {/* Button effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
