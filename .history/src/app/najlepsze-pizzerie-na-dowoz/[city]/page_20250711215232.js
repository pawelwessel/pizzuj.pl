import { notFound } from "next/navigation";
import ArrayWithPlaces from "../../../components/ArrayWithPlaces";
import AdvertiseYourself from "../../../components/AdvertiseYourself";
import CtaButton from "../../../components/CtaButton";
import { createLinkFromText } from "../../../lib/createLinkFromText";
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

export default async function Page({ params }) {
  const { city } = await params;
  const citySlug = createLinkFromText(city);
  const pizzerias = await fetchPizzerias(citySlug);
  if (!pizzerias || pizzerias.error) return notFound();
  console.log(citySlug);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection city={city} />

      {/* Stats Section */}
      <StatsSection city={city} pizzerias={pizzerias} />

      {/* Ranking Section */}
      <RankingSection city={city} pizzerias={pizzerias} />

      {/* Promotion Section */}
      <PromotionSection city={city} />

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
