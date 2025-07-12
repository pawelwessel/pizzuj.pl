/* eslint-disable @typescript-eslint/no-explicit-any */
import { Viewport } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata = {
  title: "Manicure Blisko Ciebie | Paznokcie w Twoim stylu | Salony Manicure",
  description:
    "Zarejestruj swoje konto i utwórz profil manicure z usługami w Twoim mieście. Zacznij zarabiać na swojej pasji i doświadczeniu.",
  publisher: "wesiudev.com",
  url: `https://manikuracja.pl`,
  authors: [
    {
      name: "Manikuracja",
      url: "https://manikuracja.pl",
    },
  ],
  icons: [
    {
      url: "/fav.png",
      sizes: "192x192",
      type: "image/png",
    },
  ],
  openGraph: {
    type: "website",
    url: `https://manikuracja.pl`,
    title: "Manicure Blisko Ciebie | Paznokcie | Salony Manicure",
    description:
      "Zarejestruj swoje konto i utwórz profil manicure z usługami w Twoim mieście. Zacznij zarabiać na swojej pasji i doświadczeniu.",
    siteName: "Manikuracja",
  },
  twitter: {
    cardType: "summary_large_image",
    site: "@Manikuracja",
    title: "Manicure Blisko Ciebie | Paznokcie | Salony Manicure",
    description:
      "Zarejestruj swoje konto i utwórz profil manicure z usługami w Twoim mieście. Zacznij zarabiać na swojej pasji i doświadczeniu.",
  },
  meta: [
    {
      name: "theme-color",
      content: "#ec4899",
    },
  ],
};

export default async function Home() {
  return <LandingPage />;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ec4899",
};
