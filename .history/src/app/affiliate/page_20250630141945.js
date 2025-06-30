import {
  AffiliateHero,
  AffiliateProgram,
  AffiliateBenefits,
  AffiliateHowItWorks,
  AffiliateCommission,
  AffiliateFAQ,
  AffiliateCallToAction,
} from "../../components/Affiliate";

export default function AffiliatePage() {
  return (
    <>
      <AffiliateHero />
      <AffiliateProgram />
      <AffiliateBenefits />
      <AffiliateHowItWorks />
      <AffiliateCommission />
      <AffiliateFAQ />
      <AffiliateCallToAction />
    </>
  );
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffa920",
  manifest: "/manifest.json",
  title:
    "Program Partnerski Pizzuj.pl | Zarabiaj z najlepszymi pizzeriami w Polsce",
  description:
    "Dołącz do programu partnerskiego Pizzuj.pl i zarabiaj prowizje polecając najlepsze pizzerie. Wysokie prowizje, łatwa rejestracja, transparentne rozliczenia.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl/affiliate",
    title:
      "Program Partnerski Pizzuj.pl | Zarabiaj z najlepszymi pizzeriami w Polsce",
    description:
      "Dołącz do programu partnerskiego Pizzuj.pl i zarabiaj prowizje polecając najlepsze pizzerie. Wysokie prowizje, łatwa rejestracja, transparentne rozliczenia.",
    siteName: "Pizzuj",
    images: [
      {
        url: "https://pizzuj.pl/assets/pizza.png",
        width: 1200,
        height: 630,
        alt: "Program Partnerski Pizzuj.pl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Program Partnerski Pizzuj.pl | Zarabiaj z najlepszymi pizzeriami w Polsce",
    description:
      "Dołącz do programu partnerskiego Pizzuj.pl i zarabiaj prowizje polecając najlepsze pizzerie. Wysokie prowizje, łatwa rejestracja, transparentne rozliczenia.",
    images: ["https://pizzuj.pl/assets/pizza.png"],
  },
  authors: [{ name: "pizzuj.pl", url: "https://pizzuj.pl" }],
  publisher: "wesiu.dev",
  keywords:
    "program partnerski, affiliate, pizzuj, pizzerie, prowizje, zarabianie online, partnerstwo, marketing afiliacyjny, polecanie pizzerii",
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
      url: "../../public/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
  alternates: {
    canonical: "https://pizzuj.pl/affiliate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
