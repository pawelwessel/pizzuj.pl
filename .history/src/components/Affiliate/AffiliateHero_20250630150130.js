import Image from "next/image";
import Link from "next/link";
import {
  FaHandshake,
  FaMoneyBillWave,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { ptSans } from "../../app/layout";
import accent from "../../../public/assets/asset6.png";
import accent1 from "../../../public/assets/asset7.png";

export default function AffiliateHero() {
  const highlights = [
    { icon: FaMoneyBillWave, text: "Do 15% prowizji", color: "text-green-500" },
    {
      icon: FaChartLine,
      text: "Transparentne rozliczenia",
      color: "text-blue-500",
    },
    { icon: FaUsers, text: "Wsparcie 24/7", color: "text-purple-500" },
    { icon: FaHandshake, text: "Łatwa rejestracja", color: "text-orange-500" },
  ];

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] w-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Floating pizza images */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={accent}
          alt="Pizza decoration"
          className="absolute h-32 sm:h-40 lg:h-48 xl:h-64 2xl:h-80 w-auto opacity-10 lg:opacity-15 left-4 lg:left-16 xl:left-32 top-16 lg:top-1/4 xl:top-1/3 transform -translate-y-1/2 animate-bounce-gentle"
          width={300}
          height={300}
          style={{ animationDelay: "0s" }}
        />
        <Image
          src={accent1}
          alt="Pizza decoration"
          className="absolute h-24 sm:h-32 lg:h-40 xl:h-56 2xl:h-72 w-auto opacity-15 lg:opacity-20 right-4 lg:right-16 xl:right-32 bottom-8 lg:bottom-1/4 xl:bottom-1/3 animate-bounce-gentle"
          width={300}
          height={300}
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-16 h-16 rounded-full opacity-20 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
            animationDelay: "0.5s",
          }}
        ></div>
        <div
          className="absolute top-32 right-20 w-12 h-12 opacity-25 rotate-45 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
            animationDelay: "1.5s",
          }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-20 h-20 rounded-full opacity-15 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-50 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] xl:w-[70%] max-w-6xl">
        <div className="glass bg-black/50 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl border border-white/30 shadow-large">
          {/* Hero heading */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaHandshake className="text-[#ffa920] text-3xl lg:text-4xl animate-bounce-gentle" />
              <h1 className="font-cocosharp-bold-italic text-zinc-800 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight drop-shadow-lg">
                Program <span className="text-[#ffa920]">Partnerski</span>
              </h1>
              <FaHandshake
                className="text-[#ffa920] text-3xl lg:text-4xl animate-bounce-gentle"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <p
              className={`!text-zinc-800/90 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${ptSans.className}`}
            >
              Zarabiaj polecając najlepsze pizzerie w Polsce!
              <span className="text-[#ffa920] font-semibold">
                {" "}
                Wysokie prowizje
              </span>
              , transparentne rozliczenia i pełne wsparcie.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group relative p-4 lg:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <highlight.icon
                    className={`${highlight.color} text-2xl lg:text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="text-white text-sm lg:text-base font-medium block">
                    {highlight.text}
                  </span>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-[#ffa920] hover:bg-[#ff8f00] !text-white font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-golden-lg shadow-golden"
              >
                <span className="relative z-10">Dołącz teraz</span>
                <FaHandshake className="text-lg lg:text-xl transition-transform duration-300 group-hover:rotate-12" />

                {/* Button effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none"></div>
              </Link>

              <Link
                href="#jak-to-dziala"
                className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-white/20 hover:bg-white/30 !text-white font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 ease-out transform hover:scale-105 backdrop-blur-sm border border-white/30 hover:border-white/50"
              >
                <span>Dowiedz się więcej</span>
                <FaChartLine className="text-lg lg:text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
