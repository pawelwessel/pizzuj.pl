import { notFound } from "next/navigation";
import { createLinkFromText } from "../../../lib/createLinkFromText";
import { getCityInfo } from "../../../utils/cityInflect";
import ClientWrapper from "../../../components/CityPizzeriaPage/ClientWrapper";
import LegacyWrapper from "../../../components/CityPizzeriaPage/LegacyWrapper";

export const dynamic = "force-dynamic";

async function fetchPizzerias(citySlug) {
  const baseUrl = process.env.NEXT_PUBLIC_LINK || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/pizzeria/${citySlug}`);
  if (!response.ok) return null;
  return response.json();
}

// New function to fetch pizzerias from getTextPlaces API
async function fetchTextPlaces(cityName) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/getTextPlaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: cityName }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching text places:", error);
    return null;
  }
}

// JSON data for all text content
function getPageContent(cityInfo) {
  return {
    hero: {
      title: `Najlepsze pizzerie na dowóz – ${cityInfo.nominative}`,
      subtitle: `Odkryj ranking najlepszych pizzerii z dowozem w mieście ${cityInfo.locative}. Sprawdź opinie, promocje i zamów pizzę online z dostawą prosto do domu!`,
      ctaPrimary: "🍕 Sprawdź ranking",
      ctaSecondary: "📍 Zarejestruj się",
    },
    stats: {
      title: `Statystyki pizzerii w ${cityInfo.locative}`,
      subtitle: "Sprawdź najważniejsze informacje o pizzeriach w Twoim mieście",
      stats: [
        {
          icon: "🍕",
          value: "20+",
          label: "Pizzerii w mieście",
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
      title: `Ranking pizzerii na dowóz w ${cityInfo.locative}`,
      subtitle:
        "Zobacz listę najlepszych pizzerii oferujących dowóz w Twoim mieście. Zamów pizzę online i ciesz się smakiem bez wychodzenia z domu!",
      showAllButton: "Zobacz wszystkie pizzerie",
    },
    promotion: {
      title: `Promocja Twojej pizzerii w ${cityInfo.locative}`,
      subtitle: `Jesteś właścicielem pizzerii w ${cityInfo.locative}? Dodaj swoją restaurację do rankingu i zwiększ widoczność wśród lokalnych klientów!`,
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
        title: `🎁 Specjalna oferta dla ${cityInfo.genitive}`,
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
      title: `Gotowy na najlepszą pizzę w ${cityInfo.locative}?`,
      subtitle:
        "Dołącz do tysięcy zadowolonych klientów, którzy już odkryli najlepsze pizzerie w swoim mieście. Zamów teraz i ciesz się smakiem bez wychodzenia z domu!",
      ctaPrimary: "🍕 Zamów teraz",
      ctaSecondary: "📱 Pobierz aplikację",
      stats: [
        { value: "10k+", label: "Zadowolonych klientów" },
        { value: "10k+", label: "Pizzerii w Polsce" },
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
    qa: {
      title: `Najczęstsze pytania o pizzę na dowóz w ${cityInfo.locative}`,
      subtitle:
        "Odpowiedzi na najważniejsze pytania dotyczące zamawiania pizzy w Twoim mieście",
      questions: [
        {
          question: `Czy w ${cityInfo.locative} można zamówić pizzę na dowóz?`,
          answer: `Tak, w ${cityInfo.locative} działa wiele pizzerii oferujących dowóz. Wszystkie pizzerie w naszym rankingu zapewniają szybką dostawę prosto do Twojego domu.`,
        },
        {
          question: `Jakie są najlepsze pizzerie w ${cityInfo.locative}?`,
          answer: `Ranking najlepszych pizzerii w ${cityInfo.locative} znajdziesz powyżej. Wszystkie pizzerie są weryfikowane i sprawdzone przez naszych użytkowników.`,
        },
        {
          question: `Ile kosztuje dostawa pizzy w ${cityInfo.locative}?`,
          answer: `Koszt dostawy w ${cityInfo.locative} wynosi zazwyczaj 5-15 złotych, w zależności od pizzerii i odległości. Wiele pizzerii oferuje darmową dostawę przy zamówieniach powyżej określonej kwoty.`,
        },
        {
          question: `Jak długo czeka się na pizzę w ${cityInfo.locative}?`,
          answer: `Średni czas dostawy pizzy w ${cityInfo.locative} to 15-45 minut. Czas może się różnić w zależności od pizzerii, odległości i pory dnia.`,
        },
        {
          question: `Czy mogę zapłacić kartą przy dostawie pizzy w ${cityInfo.locative}?`,
          answer: `Większość pizzerii w ${cityInfo.locative} akceptuje płatności kartą przy dostawie. Możesz też zapłacić online podczas zamawiania lub gotówką.`,
        },
        {
          question: `Jakie są godziny dostawy pizzy w ${cityInfo.locative}?`,
          answer: `Większość pizzerii w ${cityInfo.locative} dostarcza pizzę od rana do późnych godzin wieczornych. Niektóre pizzerie oferują dostawę 24/7.`,
        },
      ],
      additionalInfo: {
        title: `Nie znalazłeś odpowiedzi na swoje pytanie o pizzę w ${cityInfo.locative}?`,
        description: `Skontaktuj się z nami, a pomożemy Ci znaleźć najlepszą pizzerię w Twojej okolicy lub odpowiedzieć na inne pytania dotyczące zamawiania pizzy.`,
        cta: "📞 Skontaktuj się z nami",
      },
    },
  };
}

export default async function Page({ params }) {
  const { city } = await params;
  const citySlug = createLinkFromText(city);
  let pizzerias = await fetchPizzerias(citySlug);

  // If no pizzerias found, try to get from getTextPlaces API
  if (!pizzerias || pizzerias.error || pizzerias.length === 0) {
    const textPlaces = await fetchTextPlaces(city);
    if (textPlaces && textPlaces.length > 0) {
      // Transform getTextPlaces data to match expected structure
      pizzerias = textPlaces.slice(0, 3).map((place) => ({
        name: place.name,
        address: place.address || place.formatted_address,
        city: place.city,
        phone: place.details?.formatted_phone_number,
        photos: place.details?.photos
          ? place.details.photos.map(
              (photo) =>
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY}`
            )
          : [],
        rating: place.details?.rating,
        opening_hours: place.details?.opening_hours,
        place_id: place.place_id,
      }));
    } else {
      return notFound();
    }
  }

  // Get city info with proper inflection
  const cityInfo = getCityInfo(citySlug);

  // Get page content with dynamic data
  const pageContent = getPageContent(cityInfo);

  return (
    <div className="min-h-screen">
      {/* Client-side rendered components */}
      <ClientWrapper
        city={city}
        pizzerias={pizzerias}
        pageContent={pageContent}
        cityInfo={cityInfo}
      />

      {/* Legacy components for backward compatibility */}
      <LegacyWrapper pizzerias={pizzerias} />
    </div>
  );
}
