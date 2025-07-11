import { ptSans } from "../../app/layout";
import { FaRocket, FaStar, FaCrown } from "react-icons/fa6";

export default function AdvertisingHero() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center pt-16 pb-20 relative">
      {/* Floating icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaRocket className="absolute top-20 left-10 text-green-200/30 text-4xl animate-bounce-gentle" />
        <FaStar className="absolute top-32 right-16 text-orange-200/40 text-3xl animate-bounce-gentle" style={{ animationDelay: "1s" }} />
        <FaCrown className="absolute bottom-40 left-20 text-green-300/25 text-5xl animate-bounce-gentle" style={{ animationDelay: "2s" }} />
        <FaRocket className="absolute bottom-20 right-10 text-orange-300/35 text-3xl animate-bounce-gentle" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="glass rounded-3xl p-10 md:p-16 border-2 border-white/40 shadow-golden-xl backdrop-blur-sm relative overflow-hidden group">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
          
          {/* Sparkle effects */}
          <div className="absolute top-6 right-8 w-2 h-2 bg-[#ffa920] rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
          <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-[#ffa920] rounded-full animate-pulse delay-300 opacity-0 group-hover:opacity-100"></div>
          <div className="absolute top-1/2 left-8 w-1 h-1 bg-[#ffa920] rounded-full animate-bounce delay-500 opacity-0 group-hover:opacity-100"></div>
          
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-zinc-800 px-6 py-3 text-sm mb-6">
                <FaStar className="animate-pulse" />
                <span>Nasze pakiety reklamowe</span>
              </div>
            
            <h1 className="font-cocosharp !text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl 2xl:!text-6xl font-bold text-zinc-800 mb-8">
              Wypromuj swoją
              <span className="!text-[#ffa920] block mt-3 bg-gradient-to-r from-[#ffa920] to-[#ff8c00] bg-clip-text text-transparent">
                pizzerię z Pizzuj.pl!
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 ${ptSans.className}`}>
              Wybierz pakiet dla Twojego biznesu i zacznij przyciągać
              więcej klientów już dziś
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Bezpłatny start</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <span>Natychmiastowe efekty</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                <span>Wsparcie 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 