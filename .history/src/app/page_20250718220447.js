import Opinions from "../components/Opinions";
import Image from "next/image";
import accent3 from "../../public/assets/asset5.png";
import { getDocument } from "../db/firebase";
import HeroSectionForHomePage from "../components/HeroSectionForHomePage";
import AdvertiseYourself from "../components/AdvertiseYourself";
import FoodCostInvite from "../components/FoodCostInvite";
import { ptSans } from "./layout";
import Script from "next/script";
import Link from "next/link";
import cities from "../data/cities.json";

export default async function Page() {
  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Pizzuj.pl",
            description:
              "Najlepsze pizzerie w Polsce - znajdź i zamów pizzę online",
            url: "https://pizzuj.pl",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://pizzuj.pl/pizza/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
            sameAs: [
              "https://www.facebook.com/pizzuj",
              "https://www.instagram.com/pizzuj_pl/",
              "https://www.tiktok.com/@pizzuj",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+48-721-417-154",
              contactType: "customer service",
              email: "wesiudev@gmail.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Pizzuj.pl",
              url: "https://pizzuj.pl",
            },
          }),
        }}
      />

      <main className="min-h-screen">
        <HeroSectionForHomePage />

        {/* Enhanced CTA Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden">
          {/* Decorative background image */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={accent3}
              alt="Dekoracyjny obrazek pizzy"
              className="absolute w-24 sm:w-32 lg:w-40 xl:w-48 h-auto top-8 right-8 lg:right-24 opacity-20 lg:opacity-30 animate-bounce-gentle"
              width={250}
              height={250}
              style={{ animationDelay: "0.5s" }}
              loading="lazy"
              priority={false}
              aria-hidden="true"
            />
          </div>

          <div className="z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center space-y-8 lg:space-y-12">
              {/* Enhanced main heading */}
              <div className="space-y-6">
                <h2 className="font-cocosharp-bold-italic text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                  Zostań częścią{" "}
                  <span className="text-[#ffa920] font-cocosharp-bold-italic">
                    naszej strony
                  </span>
                </h2>
              </div>

              {/* Enhanced description */}
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="font-cocosharp text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Dołącz do naszej strony i zyskaj nowych klientów. Wspólnie
                  zbudujemy najlepszą platformę z pizzą!
                </p>

                <div className="rounded-2xl lg:rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
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

                  {/* CTA Button */}
                  <div className="mt-8 lg:mt-12 text-center">
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ffa920] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ffa920] text-white font-cocosharp-bold-italic text-lg lg:text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40"
                    >
                      <span>Zostań pizzownikiem Pizzuj</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
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
            <Opinions />
          </div>
        </section>

        {/* Business CTA section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <AdvertiseYourself />
          </div>
        </section>
        <div>
          {/* Enhanced popular cities section */}
          <div className="text-center mt-24">
            {/* Enhanced city links grid */}
            <div className="flex flex-row gap-3 lg:gap-4 w-screen overflow-x-scroll mx-auto">
              {cities.map((city, index) => (
                <Link
                  key={index}
                  href={`/najlepsze-pizzerie-na-dowoz/${city.slug}`}
                  aria-label={`Znajdź najlepsze pizzerie w ${city.name}`}
                  className="text-nowrap group relative p-3 lg:p-4 rounded-xl bg-green-500/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-golden card-hover"
                >
                  <span className="text-green-800 text-sm lg:text-base font-medium group-hover:text-green-600  transition-colors duration-200 block">
                    Najlepsza pizza na dowóz w {city.locative}
                  </span>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* City card shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
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
      url: "/favicons/android-chrome-192x192.png",
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
