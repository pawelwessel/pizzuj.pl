import { notFound } from "next/navigation";
import ArrayWithPlaces from "../../../components/ArrayWithPlaces";
import AdvertiseYourself from "../../../components/AdvertiseYourself";
import CtaButton from "../../../components/CtaButton";
import { createLinkFromText } from "../../../lib/createLinkFromText";
import { getCityInfo } from "../../../utils/cityInflect";
import {
  HeroSection,
  RankingSection,
  PromotionSection,
  StatsSection,
  CTASection,
} from "../../../components/CityPizzeriaPage";

export const dynamic = "force-dynamic";

async function fetchPizzerias(citySlug) {
  const baseUrl = process.env.NEXT_PUBLIC_LINK || "http://localhost:3001";
  const response = await fetch(`${baseUrl}/api/pizzeria/${citySlug}`);
  if (!response.ok) return null;
  return response.json();
}

// JSON data for all text content
function getPageContent(city) {
  return {
    hero: {
      title: `Najlepsze pizzerie na dowóz – ${
        city.charAt(0).toUpperCase() + city.slice(1)
      }`,
      subtitle: `Odkryj ranking najlepszych pizzerii z dowozem w mieście ${city}. Sprawdź opinie, promocje i zamów pizzę online z dostawą prosto do domu!`,
      ctaPrimary: "🍕 Sprawdź ranking",
      ctaSecondary: "📍 Zarejestruj się",
    },
    stats: {
      title: `Statystyki pizzerii w ${city}`,
      subtitle: "Sprawdź najważniejsze informacje o pizzeriach w Twoim mieście",
      stats: [
        {
          icon: "🍕",
          value: "dynamic", // Will be replaced with actual count
          label: "Pizzerii w rankingu",
          color: "from-yellow-400 to-orange-500",
        },
        {
          icon: "⭐",
          value: "4.8",
          label: "Średnia ocena",
          color: "from-yellow-400 to-yellow-600",
        },
        {
          icon: "🚚",
          value: "15-30",
          label: "Min. czas dostawy",
          color: "from-green-400 to-green-600",
        },
        {
          icon: "💰",
          value: "20-50",
          label: "Zł. średnia cena",
          color: "from-blue-400 to-blue-600",
        },
      ],
      features: [
        {
          icon: "🎯",
          title: "Sprawdzone pizzerie",
          description:
            "Wszystkie pizzerie w naszym rankingu są weryfikowane i sprawdzone",
        },
        {
          icon: "⚡",
          title: "Szybka dostawa",
          description: "Średni czas dostawy to 15-30 minut w większości miast",
        },
        {
          icon: "💳",
          title: "Bezpieczne płatności",
          description:
            "Płać online lub gotówką przy odbiorze - wybór należy do Ciebie",
        },
        {
          icon: "📱",
          title: "Łatwe zamawianie",
          description:
            "Intuicyjna aplikacja i strona internetowa do zamawiania",
        },
      ],
    },
    ranking: {
      title: `Ranking pizzerii na dowóz w ${city}`,
      subtitle:
        "Zobacz listę najlepszych pizzerii oferujących dowóz w Twoim mieście. Zamów pizzę online i ciesz się smakiem bez wychodzenia z domu!",
      emptyState: {
        title: "Brak danych o pizzeriach w tym mieście...",
        subtitle:
          "Sprawdź inne miasta lub dodaj swoją pizzerię do naszego rankingu!",
      },
      showAllButton: "Zobacz wszystkie pizzerie",
    },
    promotion: {
      title: `Promocja Twojej pizzerii w ${city}`,
      subtitle: `Jesteś właścicielem pizzerii w ${city}? Dodaj swoją restaurację do rankingu i zwiększ widoczność wśród lokalnych klientów!`,
      features: [
        {
          icon: "🎯",
          title: "Lokalne SEO",
          description:
            "Twoja pizzeria będzie widoczna w wynikach wyszukiwania dla lokalnych klientów",
        },
        {
          icon: "📱",
          title: "Aplikacja mobilna",
          description:
            "Klienci mogą zamawiać przez naszą aplikację z Twoją pizzerią",
        },
        {
          icon: "💳",
          title: "System płatności",
          description:
            "Bezpieczne płatności online z automatycznym rozliczeniem",
        },
        {
          icon: "📊",
          title: "Analityka biznesowa",
          description: "Szczegółowe raporty sprzedaży i zachowań klientów",
        },
      ],
      specialOffer: {
        title: `🎁 Specjalna oferta dla ${city}`,
        benefits: [
          "Darmowe dodanie do rankingu",
          "Promocja przez 30 dni",
          "Wsparcie techniczne 24/7",
        ],
      },
      ctaPrimary: "🍕 Dodaj swoją pizzerię",
      ctaSecondary: "📞 Skontaktuj się z nami",
    },
    cta: {
      title: `Gotowy na najlepszą pizzę w ${city}?`,
      subtitle:
        "Dołącz do tysięcy zadowolonych klientów, którzy już odkryli najlepsze pizzerie w swoim mieście. Zamów teraz i ciesz się smakiem bez wychodzenia z domu!",
      ctaPrimary: "🍕 Zamów teraz",
      ctaSecondary: "📱 Pobierz aplikację",
      stats: [
        { value: "10k+", label: "Zadowolonych klientów" },
        { value: "500+", label: "Pizzerii w rankingu" },
        { value: "4.8⭐", label: "Średnia ocena" },
      ],
      features: [
        {
          icon: "⚡",
          title: "Szybka dostawa",
          description: "Średnio 15-30 minut",
        },
        {
          icon: "💳",
          title: "Bezpieczne płatności",
          description: "Online lub gotówką",
        },
        {
          icon: "📱",
          title: "Łatwe zamawianie",
          description: "Przez aplikację lub stronę",
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { city } = await params;
  const citySlug = createLinkFromText(city);
  const pizzerias = await fetchPizzerias(citySlug);
  if (!pizzerias || pizzerias.error) return notFound();

  // Get page content with dynamic data
  const pageContent = getPageContent(city);

  // Update stats with actual data
  if (pageContent.stats.stats[0].value === "dynamic") {
    pageContent.stats.stats[0].value = pizzerias?.length || 0;
  }

  console.log(citySlug);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection city={city} content={pageContent.hero} />

      {/* Stats Section */}
      <StatsSection
        city={city}
        pizzerias={pizzerias}
        content={pageContent.stats}
      />

      {/* Ranking Section */}
      <RankingSection
        city={city}
        pizzerias={pizzerias}
        content={pageContent.ranking}
      />

      {/* Promotion Section */}
      <PromotionSection city={city} content={pageContent.promotion} />

      {/* CTA Section */}
      <CTASection city={city} content={pageContent.cta} />

      {/* Legacy components for backward compatibility */}
      {pizzerias && pizzerias.length > 0 && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <ArrayWithPlaces placesData={pizzerias} />
          </div>
        </div>
      )}

      <AdvertiseYourself />
      <CtaButton />
    </div>
  );
}
