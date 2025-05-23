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
        <Header />
        {children}
      </body>
    </html>
  );
}
