import Opinions from "../components/Opinions";
import Image from "next/image";
import accent3 from "../../public/assets/asset5.png";
import { getDocument } from "../db/firebase";
import HeroSectionForHomePage from "../components/HeroSectionForHomePage";
import AdvertiseYourself from "../components/AdvertiseYourself";
import FoodCostInvite from "../components/FoodCostInvite";
import { ptSans } from "./layout";

export default async function Page() {
  return (
    <main className="min-h-screen">
      <HeroSectionForHomePage />

      {/* Enhanced CTA Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden">
        {/* Decorative background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={accent3}
            alt="Pizza decoration"
            className="absolute w-24 sm:w-32 lg:w-40 xl:w-48 h-auto top-8 right-8 lg:right-24 opacity-20 lg:opacity-30 animate-bounce-gentle"
            width={250}
            height={250}
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center space-y-8 lg:space-y-12">
            {/* Enhanced main heading */}
            <div className="space-y-6">
              <h2 className="font-cocosharp-bold-italic text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                Zostań częścią{" "}
                <span className="text-[#ffa920] font-cocosharp-bold-italic">
                  naszej sieci
                </span>
              </h2>
            </div>

            {/* Enhanced description */}
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="font-cocosharp text-lg lg:text-xl text-gray-600 leading-relaxed">
                Dołącz do naszej sieci i zyskaj nowych klientów. Wspólnie
                zbudujemy najlepszą sieć pizz w Polsce.
              </p>

              <div className="glass bg-white/60 border border-primary-200/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8 backdrop-blur-sm shadow-medium">
                {/* Benefits list */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-300/30 rounded-xl border border-gray-400/50">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 text-2xl font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="font-cocosharp text-gray-700">
                      Zwiększ widoczność
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-300/30 rounded-xl border border-gray-400/50">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 text-2xl font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="font-cocosharp text-gray-700">
                      Zyskaj klientów
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-300/30 rounded-xl border border-gray-400/50">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 text-2xl font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="font-cocosharp text-gray-700">
                      Rozwijaj biznes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Cost Calculator Invitation */}
      <FoodCostInvite />

      {/* Reviews section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-cocosharp-bold-italic text-3xl lg:text-4xl xl:text-5xl text-gray-800 mb-4">
              Co znajdziesz w naszej ofercie?
            </h2>
            <p
              className={`text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto ${ptSans.className}`}
            >
              Przejrzyj listę korzyści płynących ze współpracy z nami
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mt-6"></div>
          </div>
          <Opinions />
        </div>
      </section>

      {/* Business CTA section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <AdvertiseYourself />
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffa920",
  manifest: "/manifest.json",
  title:
    "Kochasz pizzę? Dołącz do sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
  description:
    "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl",
    title:
      "Kochasz pizzę? Dołącz do sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
    description:
      "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
    siteName: "Pizzuj",
    images: [
      {
        url: "https://pizzuj.pl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pizzuj.pl - najlepsze pizzerie w Polsce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pizzujpl",
    creator: "@pizzujpl",
    title:
      "Kochasz pizzę? Dołącz do sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
    description:
      "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
    images: ["https://pizzuj.pl/og-image.jpg"],
  },
  authors: [{ name: "pizzuj.pl", url: "https://pizzuj.pl" }],
  publisher: "wesiu.dev",
  keywords: [
    "pizza",
    "pizzerie w Polsce",
    "najlepsza pizza",
    "pizza warszawa",
    "sieć pizzerii",
    "ranking pizzerii",
    "gdzie zjeść pizzę",
    "pizza dostawa",
    "pizzerie online",
  ],
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
};
