"use client";
import BackgroundDecorations from "./BackgroundDecorations";
import WarsawSectionHeader from "./WarsawSectionHeader";
import WarsawSectionSlider from "./WarsawSectionSlider";
import WarsawSectionCTA from "./WarsawSectionCTA";

export default function WarsawSection({ placesData }) {
  return (
    <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full relative overflow-hidden">
      <BackgroundDecorations />
      <WarsawSectionHeader />
      <WarsawSectionSlider placesData={placesData} />
      <WarsawSectionCTA />
    </section>
  );
}
