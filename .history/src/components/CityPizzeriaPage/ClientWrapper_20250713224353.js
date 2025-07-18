"use client";
import { useState, useEffect } from "react";
import {
  HeroSection,
  RankingSection,
  PromotionSection,
  StatsSection,
  CTASection,
  CityQASection,
} from "./index";

export default function ClientWrapper({
  city,
  pizzerias,
  pageContent,
  cityInfo,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a loading state or skeleton while on server
    return (
      <div className="min-h-screen">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="py-16 bg-gray-100">
            <div className="container mx-auto px-6">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-8"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Q&A Section */}
      <CityQASection cityInfo={cityInfo} content={pageContent.qa} />
    </div>
  );
}
