import Header from "../components/Header";
import "./globals.css";
import logo from "../../public/assets/pizzuj.png";
import localFont from "next/font/local";
import Image from "next/image";

export const metadata = {
  title: "Pizzuj.pl",
  description: "Pizzuj.pl - Twoja ulubiona pizzeria",
};

const gothic = localFont({
  src: "../../public/gothic.ttf",
  variable: "--font-gothic",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gothic.variable} antialiased`}>
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/70 text-white font-bold text-4xl lg:text-5xl flex flex-col items-center text-center px-12 justify-center z-[500]">
          <Image
            src={logo}
            alt="Pizzuj.pl"
            width={1000}
            height={1000}
            className="w-[25vw] rounded-lg"
          />
          <div className="">
            Pizzuj.pl - zapraszamy już{" "}
            <span className="text-yellow-500">wkrótce!</span>
          </div>
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
