import { Footer } from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { PT_Sans } from "next/font/google";

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
          

          <Footer />
        </div>
      </body>
    </html>
  );
}
