import Header from "../components/Header";
import "./globals.css";
import localFont from "next/font/local";
// Font files can be colocated inside of `pages`
const gothic = localFont({ src: "../../public/gothic.ttf" });
export const metadata = {
  title: "Pizzuj.pl",
  description: "Pizzuj.pl - Twoja ulubiona pizzeria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gothic.variable} antialiased`}>
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/70 text-white font-bold text-4xl lg:text-5xl">
          Pizzuj.pl - zapraszamy już wkrótce
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
