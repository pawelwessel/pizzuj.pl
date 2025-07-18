import BackgroundDecorations from "./BackgroundDecorations";
import WarsawSectionHeader from "./WarsawSectionHeader";
import WarsawSectionSlider from "./WarsawSectionSlider";

export default function WarsawSection({ placesData, onCardClick }) {
  return (
    <section className="py-12 w-full">
      <BackgroundDecorations />
      <WarsawSectionHeader />
      <WarsawSectionSlider placesData={placesData} onCardClick={onCardClick} />
    </section>
  );
}
