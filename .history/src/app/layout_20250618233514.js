import { Footer } from "../components/Footer";
import AchievmentsList from "../components/Achievements/AchievementsList";
import Header from "../components/Header";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import { FaArrowRight, FaCrown } from "react-icons/fa";

const gothic = localFont({
  src: "../../public/gothic.ttf",
  variable: "--font-gothic",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <body
        className={`${gothic.variable} antialiased overflow-x-hidden w-full`}
      >
        {/* Enhanced geometric background shapes */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Animated floating shapes */}
          <div
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-10 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
              animationDelay: "0s",
            }}
          ></div>

          <div
            className="absolute top-8 right-8 w-32 h-32 opacity-8 rotate-45 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
              animationDelay: "1s",
            }}
          ></div>

          <div
            className="absolute top-1/4 -right-20 w-40 h-40 rounded-full opacity-12 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
              animationDelay: "0.5s",
            }}
          ></div>

          <div
            className="absolute top-1/2 -left-12 w-24 h-24 opacity-15 rotate-12 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffa920 0%, #ffca28 100%)",
              animationDelay: "1.5s",
            }}
          ></div>

          <div
            className="absolute -bottom-16 -left-16 w-44 h-44 opacity-10 rotate-45 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ff6f00 0%, #ffa920 100%)",
              animationDelay: "2s",
            }}
          ></div>

          <div
            className="absolute bottom-16 right-16 w-36 h-36 rounded-full opacity-12 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffca28 0%, #ff8f00 100%)",
              animationDelay: "0.75s",
            }}
          ></div>

          <div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full opacity-8 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffa920 0%, #ec7308 100%)",
              animationDelay: "1.25s",
            }}
          ></div>

          {/* Additional subtle shapes for depth */}
          <div
            className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-full opacity-5 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ff8f00 0%, #ffa920 100%)",
              animationDelay: "3s",
            }}
          ></div>
        </div>

        {/* Main content with enhanced z-index */}
        <div className="relative z-10">
          <Header />
          {children}

          {/* Enhanced Call-to-Action section with glassmorphism */}
          <section className="relative px-4 sm:px-8 lg:px-16 py-16 lg:py-24 mx-4 lg:mx-8 my-16 lg:my-24">
            {/* Enhanced glass background with better gradients */}
            <div className="absolute inset-0 glass rounded-3xl lg:rounded-5xl shadow-large border border-primary-200/40 backdrop-blur-xl bg-gradient-to-br from-white/20 via-primary-50/30 to-primary-100/20"></div>

            {/* Enhanced floating decorative elements */}
            <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full opacity-20 animate-bounce-gentle shadow-golden"></div>
            <div
              className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-25 animate-bounce-gentle shadow-golden"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-12 right-12 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full opacity-30 animate-bounce-gentle"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-12 left-12 w-10 h-10 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full opacity-20 animate-bounce-gentle"
              style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Main content container */}
            <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-12 text-center max-w-4xl mx-auto">
              {/* Enhanced crown section with sparkles */}
              <div className="relative">
                <div className="flex items-center justify-center gap-2 scale-125 lg:scale-150 filter drop-shadow-xl">
                  <FaCrown
                    className="text-primary-500 text-2xl lg:text-3xl animate-bounce-gentle"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <FaCrown
                    className="text-primary-400 text-4xl lg:text-5xl animate-bounce-gentle drop-shadow-lg"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <FaCrown
                    className="text-primary-500 text-2xl lg:text-3xl animate-bounce-gentle"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>

                {/* Enhanced sparkle effects */}
                <div className="absolute -top-3 -left-3 w-3 h-3 bg-primary-300 rounded-full animate-ping opacity-60"></div>
                <div
                  className="absolute -top-2 right-2 w-2 h-2 bg-primary-400 rounded-full animate-ping opacity-70"
                  style={{ animationDelay: "0.7s" }}
                ></div>
                <div
                  className="absolute top-6 -right-4 w-2.5 h-2.5 bg-primary-500 rounded-full animate-ping opacity-80"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute -bottom-2 left-4 w-1.5 h-1.5 bg-primary-300 rounded-full animate-ping opacity-60"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>

              {/* Enhanced heading with better typography */}
              <div className="space-y-4">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
                  Dołącz teraz i zdobądź odznakę
                </h2>
                <div className="w-32 lg:w-40 h-1.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full mx-auto shadow-golden"></div>
                <p className="font-body text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
                  Stań się częścią społeczności miłośników pizzy i otrzymaj
                  ekskluzywną odznakę Pioneer
                </p>
              </div>

              {/* Enhanced achievements container */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/60 rounded-3xl blur-sm shadow-medium"></div>
                <div className="relative bg-white/80 rounded-3xl p-6 lg:p-8 shadow-large border border-primary-200/60 backdrop-blur-sm">
                  <AchievmentsList achievements={["Pioneer"]} />
                </div>
              </div>

              {/* Enhanced login button with better interactions */}
              <div className="group relative">
                <Link
                  href="/login"
                  className="relative inline-flex items-center gap-4 px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 hover:from-primary-500 hover:via-primary-600 hover:to-primary-700 text-white font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-golden-lg shadow-golden"
                >
                  <span className="relative z-10">Zaloguj się</span>
                  <FaArrowRight className="text-lg lg:text-xl transition-transform duration-300 group-hover:translate-x-1" />

                  {/* Enhanced button effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none"></div>
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </body>
    </html>
  );
}
