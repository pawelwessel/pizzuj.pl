import { Footer } from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import localFont from "next/font/local";

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

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title:
    "Hexon Group | Dofinansowanie na termomodernizacje budynków | Czyste Powietrze",
  description:
    "Kompleksowa termomodernizacja budynków. Fotowoltaika, pompy ciepła. Specjaliści od dofinansowań. Zyskaj do 136200zł dofinansowania",
  openGraph: {
    type: "website",
    url: "https://hexon.work",
    title:
      "Hexon Group | Dofinansowanie na termomodernizacje budynków | Czyste Powietrze",
    description:
      "Kompleksowa termomodernizacja budynków. Fotowoltaika, pompy ciepła. Specjaliści od dofinansowań. Zyskaj do 136200zł dofinansowania",
    siteName: "Hexon",
  },
  authors: [{ name: "wesiu.dev", url: "https://wesiudev.netlify.app" }],
  publisher: "wesiu.dev",
  keywords:
    "dotacje, finansowanie, termomodernizacja, remont, modernizacja energetyczna, oszczędność energii, efektywność energetyczna, wsparcie finansowe, programy rządowe, fundusze unijne, poprawa izolacji, renowacja budynków, energooszczędność, zrównoważony rozwój, dotacje unijne",
  icons: [
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};
