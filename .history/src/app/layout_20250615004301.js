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
        <Header />
        {children}
        <div className="flex flex-col items-center justify-center gap-4 text-black px-4 py-24 rounded-full">
          <div className="mb-4 scale-150 flex flex-row items-center">
            <FaCrown className="text-yellow-400 text-2xl" />
            <FaCrown className="text-yellow-400 text-4xl" />
            <FaCrown className="text-yellow-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold">Dołącz teraz i zdobądź odznakę</h2>
          <AchievmentsList achievements={["Pionier"]} />

          <Link
            href="/login"
            className="text-black hover:text-blue-700 transition-colors flex items-center"
          >
            Zaloguj się
            <FaArrowRight className="text-2xl text-black ml-3 animate-pulse" />
          </Link>
        </div>
        <Footer />
      </body>
    </html>
  );
}
