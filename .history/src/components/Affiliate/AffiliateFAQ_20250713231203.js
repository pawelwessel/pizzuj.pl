"use client";
import { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ptSans } from "../../app/layout";

export default function AffiliateFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Jak szybko mogę zacząć zarabiać?",
      answer:
        "Po rejestracji i zatwierdzeniu konta (do 24h) możesz natychmiast zacząć zdobywać pizzerie. Pierwsze prowizje otrzymasz po pierwszej pomyślnie zaproszonej restauracji, która kupiła Pakiet Premium lub Pakiet Enterprise.",
    },
    {
      question: "Czy są jakieś opłaty za udział w programie?",
      answer:
        "Nie, udział w programie partnerskim jest całkowicie darmowy. Nie ma opłat rejestracyjnych, miesięcznych ani żadnych ukrytych kosztów.",
    },
    {
      question: "Jak są naliczane prowizje?",
      answer:
        "Prowizje dzielimy na 4 poziomy: Starter (10%) dla 0-15 restauracji, Silver (12%) dla 16-30 restauracji, Gold (15%) dla 31-100 restauracji i VIP (20%) dla 101+ restauracji. Im więcej restauracji zdobędziesz, tym wyższa prowizja.",
    },
    {
      question: "Ile restauracji potrzebuję, żeby zarabiać X złotych?",
      answer:
        "Użyj naszego kalkulatora na stronie, aby sprawdzić dokładne obliczenia. Przykład: aby zarabiać 5000 zł miesięcznie, potrzebujesz około 42 restauracji na poziomie Gold (15% prowizji). Każda restauracja generuje 1000 zł.",
    },
    {
      question: "Kiedy otrzymam wypłatę prowizji?",
      answer:
        "Wypłaty realizujemy co 2 tygodnie na podane przez Ciebie konto bankowe. Nie ma minimalnych progów - wypłacamy każdą naliczoną prowizję.",
    },
    {
      question: "Czy mogę odwiedzać wszystkie pizzerie?",
      answer:
        "Tak, jako nasz partner możesz werbować restauracje do naszej platformy odwiedzając je w rzeczywistości. W zamian za to otrzymujesz prowizję.",
    },
    {
      question: "Jak długo są ważne moje linki partnerskie?",
      answer:
        "Linki partnerskie nie tracą ważności. Jeśli restauracja zakupi pakiet w tym okresie, otrzymasz prowizję.",
    },
    {
      question: "Czy mogę awansować na wyższy poziom?",
      answer:
        "Tak! Po osiągnięciu odpowiedniej liczby restauracji automatycznie awansujesz na wyższy poziom z lepszymi prowizjami. Starter → Silver (16 restauracji), Silver → Gold (31 restauracji), Gold → VIP (101 restauracji).",
    },
    {
      question: "Co się dzieje z moimi prowizjami po awansie?",
      answer:
        "Po awansie na wyższy poziom wszystkie Twoje restauracje automatycznie otrzymują nową, wyższą prowizję. Nie tracisz żadnych wcześniejszych zarobków.",
    },
    {
      question: "Jakie są limity zarobków?",
      answer:
        "Nie ma górnych limitów zarobków! Możesz zarabiać od 2000 zł do 320 000 zł miesięcznie, w zależności od liczby zdobytych restauracji i poziomu partnerskiego.",
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-100 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 left-12 w-32 h-32 rounded-full opacity-5 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-16 w-24 h-24 opacity-8 rotate-45 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
            animationDelay: "1.5s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-3 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
            animationDelay: "3s",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaQuestionCircle className="text-[#ffa920] text-3xl lg:text-4xl animate-bounce-gentle" />
            <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-gray-800 leading-tight">
              Często zadawane <span className="text-[#ffa920]">pytania</span>
            </h2>
          </div>
          <p
            className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${ptSans.className}`}
          >
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące programu
            partnerskiego.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 lg:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 glass rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-large group-hover:shadow-golden-lg transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full p-6 lg:p-8 text-left flex items-center justify-between gap-4 transition-all duration-300"
                >
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <FaChevronUp className="text-[#ffa920] text-xl transition-transform duration-300" />
                    ) : (
                      <FaChevronDown className="text-[#ffa920] text-xl transition-transform duration-300" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#ffa920]/30 to-transparent mb-4"></div>
                    <p
                      className={`text-gray-700 leading-relaxed ${ptSans.className}`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              <div
                className={`absolute top-4 right-4 w-2 h-2 bg-[#ffa920] rounded-full transition-opacity duration-300 ${
                  openIndex === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-50"
                }`}
              ></div>

              {/* Floating decorative elements */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-40 animate-bounce-gentle"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="font-gotham glass bg-gradient-to-r from-[#ffa920]/10 to-[#ec7308]/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-[#ffa920]/20 shadow-large">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Nie znalazłeś odpowiedzi?
            </h3>
            <p className={`text-lg text-gray-600 mb-6 ${ptSans.className}`}>
              Nasz zespół wsparcia jest dostępny 24/7, aby odpowiedzieć na
              wszystkie Twoje pytania.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:wesiudev@gmail.com"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#ffa920] hover:bg-[#ff8f00] !text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-golden-lg shadow-golden"
              >
                <span>Napisz do nas</span>
              </a>
              <span className="text-sm text-gray-500">
                lub zadzwoń: +48 721 417 154
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
