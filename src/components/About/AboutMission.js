import Image from "next/image";
import { FaLightbulb, FaHeart, FaRocket } from "react-icons/fa";
import missionAccent from "../../../public/assets/asset8.png";

export default function AboutMission() {
  return (
    <div className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <Image
        src={missionAccent}
        alt="Pizza decoration"
        className="absolute h-32 lg:h-48 xl:h-56 w-auto opacity-5 right-6 lg:right-16 bottom-12 z-0"
        width={300}
        height={300}
      />
      <div className="relative z-10 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Misja <span className="text-[#ffa920]">Pizzuj.pl</span>
          </h2>
          <div className="h-1 w-24 bg-[#ffa920] rounded-full mx-auto mb-6" />
          <p className="text-gray-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Połączenie dwóch światów – technologii i gastronomii w jednym miejscu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-[#ffa920] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaLightbulb className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Innowacja</h3>
            <p className="text-gray-600 leading-relaxed">
              Łączę nowoczesną technologię z tradycyjną sztuką tworzenia pizzy
            </p>
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-[#ec7308] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaHeart className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pasja</h3>
            <p className="text-gray-600 leading-relaxed">
              Każdy element projektu powstaje z miłości do pizzy i kuchni włoskiej
            </p>
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-[#ffa920] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaRocket className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Przyszłość</h3>
            <p className="text-gray-600 leading-relaxed">
              Buduję platformę, która zmieni sposób odkrywania najlepszych pizzerii
            </p>
          </div>
        </div>

        <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Projekt <strong className="text-[#ffa920]">pizzuj.pl</strong> to moje połączenie dwóch światów – 
              technologii i gastronomii. Tworzę to miejsce, by dzielić się wiedzą, 
              obserwacjami i tworzyć przyszłość.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Jeśli kochasz pizzę, chcesz poznać kulisy pracy w gastro albo szukasz 
              inspiracji do własnych kulinarnych eksperymentów – 
              <span className="text-[#ec7308] font-semibold"> jesteś w dobrym miejscu</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}