import { Footer } from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import localFont from "next/font/local";

export const metadata = {
  title: "Pizzuj.pl",
  description: "Pizzuj.pl - Twoja ulubiona pizzeria",
};

const gothic = localFont({
  src: "../../public/gothic.ttf",
  variable: "--font-gothic",
});
const cocosharp = localFont({
  src: "../../public/gothic.ttf",
  variable: "--font-gothic",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${gothic.variable} antialiased overflow-x-hidden w-full`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
