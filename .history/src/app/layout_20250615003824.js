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
        <div className="flex flex-col items-center justify-center gap-4 text-black px-4 py-2 rounded-full">
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

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title:
    "Kochasz pizzę? Dołącz od sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
  description:
    "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl",
    title:
      "Kochasz pizzę? Dołącz od sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
    description:
      "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
    siteName: "Pizzuj",
  },
  authors: [{ name: "pizzuj.pl", url: "https://pizzuj.pl" }],
  publisher: "wesiu.dev",
  keywords: "pizza, pizza warszawa najlepsza pizza w miescie",
  icons: [
    {
      url: "../../public/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "../../public/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "../../public/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};
