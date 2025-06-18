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
          <div className="flex flex-col items-center justify-center gap-4 text-black px-4 pb-12 rounded-full mt-12">
            <div className="mb-4 scale-150 flex flex-row items-center">
              <FaCrown className="text-yellow-400 text-2xl" />
              <FaCrown className="text-yellow-400 text-4xl" />
              <FaCrown className="text-yellow-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-center">
              Dołącz teraz i zdobądź odznakę
            </h2>
            <AchievmentsList achievements={["Pioneer"]} />

            <Link
              href="/login"
              className="text-black hover:text-blue-700 transition-colors flex items-center"
            >
              Zaloguj się
              <FaArrowRight className="text-2xl text-black ml-3 animate-pulse" />
            </Link>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
