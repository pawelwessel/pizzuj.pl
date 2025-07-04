import { Footer } from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { PT_Sans } from "next/font/google";
import Link from "next/link";
import { FaArrowRight, FaCrown } from "react-icons/fa";
import JoinUs from "../components/JoinUs";

export const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <body
        className={`antialiased overflow-x-hidden w-full ${ptSans.className}`}
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
              <JoinUs />
            </div>
          </section>

          <Footer />
        </div>
      </body>
    </html>
  );
}
