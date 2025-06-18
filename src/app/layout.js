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
        {/* Fixed geometric shapes */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Large circle - top left */}
          <div 
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-20"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
          
          {/* Square - top right */}
          <div 
            className="absolute top-10 right-10 w-24 h-24 opacity-15"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
          
          {/* Medium circle - right side */}
          <div 
            className="absolute top-1/3 -right-16 w-32 h-32 rounded-full opacity-25"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
          
          {/* Small square - left middle */}
          <div 
            className="absolute top-1/2 -left-8 w-16 h-16 opacity-20"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
          
          {/* Large square - bottom left */}
          <div 
            className="absolute -bottom-12 -left-12 w-36 h-36 opacity-15"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
          
          {/* Circle - bottom right */}
          <div 
            className="absolute bottom-20 right-20 w-28 h-28 rounded-full opacity-20"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
          
          {/* Small circle - top center */}
          <div 
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full opacity-25"
            style={{ backgroundColor: '#ffa920' }}
          ></div>
        </div>

        {/* Main content with higher z-index */}
        <div className="relative z-10">
          <Header />
          {children}
          <div className="flex flex-col items-center justify-center gap-6 text-black px-8 pb-16 pt-12 mx-4 my-16 relative">
            {/* Background with gradient and glass effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 via-orange-50/60 to-yellow-100/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-200/30"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-25 animate-bounce delay-500"></div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Enhanced crown section */}
              <div className="relative">
                <div className="mb-6 scale-150 flex flex-row items-center gap-1 filter drop-shadow-lg">
                  <FaCrown className="text-yellow-500 text-2xl animate-pulse delay-100" />
                  <FaCrown className="text-yellow-400 text-4xl animate-pulse delay-300 drop-shadow-md" />
                  <FaCrown className="text-yellow-500 text-2xl animate-pulse delay-500" />
                </div>
                {/* Sparkle effects around crowns */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute -top-1 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-700"></div>
                <div className="absolute top-4 -right-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping delay-1000"></div>
              </div>

              {/* Enhanced heading */}
              <div className="text-center relative">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
                  Dołącz teraz i zdobądź odznakę
                </h2>
                <div className="mt-2 w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>
              </div>

              {/* Achievements with enhanced container */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/50 rounded-2xl blur-sm"></div>
                <div className="relative bg-white/70 rounded-2xl p-4 shadow-lg border border-yellow-200/50">
                  <AchievmentsList achievements={["Pioneer"]} />
                </div>
              </div>

              {/* Enhanced login link */}
              <div className="group relative">
                <Link
                  href="/login"
                  className="relative px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:via-orange-500 hover:to-yellow-600 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex items-center gap-3 shadow-lg"
                >
                  <span className="relative z-10">Zaloguj się</span>
                  <FaArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                </Link>
                
                {/* Button reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none"></div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
