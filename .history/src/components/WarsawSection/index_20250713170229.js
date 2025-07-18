import BackgroundDecorations from "./BackgroundDecorations";
import WarsawSectionHeader from "./WarsawSectionHeader";
import WarsawSectionSlider from "./WarsawSectionSlider";

export default function WarsawSection({ placesData, onCardClick }) {
  return (
    <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 w-full">
      <BackgroundDecorations />
      <WarsawSectionHeader />
      <WarsawSectionSlider 
        placesData={placesData} 
        onCardClick={onCardClick}
      />
    </section>
  );
}
