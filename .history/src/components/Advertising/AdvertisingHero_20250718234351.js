import { ptSans } from "../../app/layout";
import { FaRocket, FaStar, FaCrown } from "react-icons/fa6";
import Image from "next/image";

export default function AdvertisingHero() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center pt-16 pb-20 relative overflow-hidden">
      {/* Background Images - similar to AboutHero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 opacity-30">
          <Image
            src="/newAssets/1.jpg"
            alt="Ludzie cieszacy sie pizza"
            fill
            className="object-cover rounded-full"
            aria-hidden="true"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-64 lg:h-64 opacity-30">
          <Image
            src="/newAssets/2.jpg"
            alt="Pyszna pizza serwowana"
            fill
            className="object-cover rounded-full"
            aria-hidden="true"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-48 lg:h-48 opacity-15">
          <Image
            src="/newAssets/3.jpg"
            alt="Przygotowanie pizzy"
            fill
            className="object-cover rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Floating Elements - similar to AboutHero */}
      <div
        className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-60 z-10 animate-bounce-slow"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-red-400 rounded-full opacity-60 z-10 animate-bounce-slow2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-60 z-10 animate-spin-slow"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-40 z-10 animate-pulse"
        aria-hidden="true"
      />

      {/* Existing Floating icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaRocket className="absolute top-20 left-10 text-green-200/30 text-4xl animate-bounce-gentle" />
        <FaStar
          className="absolute top-32 right-16 text-orange-200/40 text-3xl animate-bounce-gentle"
          style={{ animationDelay: "1s" }}
        />
        <FaCrown
          className="absolute bottom-40 left-20 text-green-300/25 text-5xl animate-bounce-gentle"
          style={{ animationDelay: "2s" }}
        />
        <FaRocket
          className="absolute bottom-20 right-10 text-orange-300/35 text-3xl animate-bounce-gentle"
          style={{ animationDelay: "0.5s" }}
        />
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
            <h1 className="font-cocosharp-bold !text-2xl md:!text-4xl xl:!text-5xl 2xl:!text-6xl font-bold text-zinc-800 mb-8">
              Wypromuj swoją pizzerię z Pizzuj.pl
            </h1>

            <p
              className={`text-base md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8 font-gotham`}
            >
              Wybierz pakiet dla Twojego biznesu i rozszerz obecność w
              internecie już dziś
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Bezpłatny start</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span>Natychmiastowe efekty</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span>Wsparcie 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
