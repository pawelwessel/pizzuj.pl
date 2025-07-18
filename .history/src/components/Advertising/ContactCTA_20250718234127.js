import { ptSans } from "../../app/layout";
import { FaPhone, FaEnvelope, FaRocket } from "react-icons/fa6";

export default function ContactCTA() {
  return (
    <div className="text-center mt-24 mb-12">
      <div className="glass rounded-3xl p-12 md:p-16 text-gray-800 max-w-5xl mx-auto border-2 border-white/30 shadow-golden-xl relative overflow-hidden group">
        {/* Enhanced animated background shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffa920]/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>

        {/* Enhanced sparkle effects */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-[#ffa920] rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
        <div className="absolute top-8 right-10 w-1 h-1 bg-[#ffa920] rounded-full animate-pulse delay-200 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#ffa920] rounded-full animate-bounce delay-500 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute top-1/2 left-4 w-1 h-1 bg-[#ffa920] rounded-full animate-ping delay-300 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute top-1/3 right-6 w-0.5 h-0.5 bg-[#ffa920] rounded-full animate-pulse delay-700 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute top-1/4 left-8 w-1 h-1 bg-[#ffa920] rounded-full animate-ping delay-900 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute bottom-1/3 right-8 w-0.5 h-0.5 bg-[#ffa920] rounded-full animate-bounce delay-1100 opacity-0 group-hover:opacity-100"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <FaRocket className="animate-pulse" />
              <span>Pomoc</span>
            </div>
          </div>

          <h3 className="text-zinc-800 font-cocosharp text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
            Nie jesteś pewien, który pakiet wybrać?
          </h3>

          <p
            className={`font-gotham text-xl lg:text-2xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto`}
          >
            Skontaktuj się z nami, a pomożemy Ci wybrać najlepsze rozwiązanie
            dla Twojej pizzerii.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Darmowa konsultacja</span>
            </div>
            <div className="flex items-center gap-3 text-blue-600 font-semibold">
              <div
                className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="text-sm">Spersonalizowane rozwiązania</span>
            </div>
            <div className="flex items-center gap-3 text-purple-600 font-semibold">
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="text-sm">Wsparcie techniczne</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="font-cocosharp bg-gradient-to-r from-[#ffa920] to-[#ff8c00] text-white font-bold px-12 py-5 rounded-2xl transition-all duration-300 shadow-golden hover:shadow-golden-xl transform hover:scale-105 relative overflow-hidden group/btn">
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              <span className="text-nowrap">Bezpłatna konsultacja</span>
            </button>

            <button className="font-cocosharp border-2 border-primary-500 hover:border-primary-600 text-primary-700 hover:text-primary-800 font-bold px-12 py-5 rounded-2xl hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group/btn2">
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffa920]/20 to-transparent skew-x-12 -translate-x-full group-hover/btn2:translate-x-full transition-transform duration-700"></div>
              <span className="text-center">Zobacz demo</span>
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p className={`font-gotham`}>Lub skontaktuj się bezpośrednio:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <span className="flex items-center gap-2 justify-center">
                <FaPhone className="text-orange-500" />
                +48 721 417 154
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
