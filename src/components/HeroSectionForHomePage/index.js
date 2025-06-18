import Image from "next/image";
import Link from "next/link";
import Form from "../Form";
import accent from "../../../public/assets/asset6.png";
import accent1 from "../../../public/assets/asset7.png";
import { loadingTexts } from "../../db/data/loadingTexts";

export default function HeroSectionForHomePage() {
  const popularCities = [
    { name: "Warszawa", slug: "warszawa" },
    { name: "Grudziądz", slug: "grudziadz" },
    { name: "Bydgoszcz", slug: "bydgoszcz" },
    { name: "Poznań", slug: "poznan" },
    { name: "Gniezno", slug: "gniezno" },
    { name: "Kraków", slug: "krakow" },
    { name: "Toruń", slug: "torun" },
  ];

  return (
    <section className="relative min-h-[50vh] lg:min-h-[60vh] w-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Enhanced floating pizza images with better positioning */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={accent}
          alt="Pizza decoration"
          className="absolute h-32 sm:h-40 lg:h-48 xl:h-64 2xl:h-80 w-auto opacity-10 lg:opacity-15 left-4 lg:left-16 xl:left-32 top-16 lg:top-1/4 xl:top-1/3 transform -translate-y-1/2 animate-bounce-gentle"
          width={300}
          height={300}
          style={{ animationDelay: '0s' }}
        />
        <Image
          src={accent1}
          alt="Pizza decoration"
          className="absolute h-24 sm:h-32 lg:h-40 xl:h-56 2xl:h-72 w-auto opacity-15 lg:opacity-20 right-4 lg:right-16 xl:right-32 bottom-8 lg:bottom-1/4 xl:bottom-1/3 animate-bounce-gentle"
          width={300}
          height={300}
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Main content with enhanced glass morphism */}
      <div className="relative z-50 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] xl:w-[70%] max-w-4xl">
        <div className="glass bg-black/40 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl border border-white/20 shadow-large">
          {/* Enhanced hero heading */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="font-heading text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 lg:mb-6">
              Najlepsze pizzerie w{" "}
              <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                Twoim mieście
              </span>
            </h1>
            <p className="font-body text-white/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Wybierz najlepszą dla siebie restaurację i{" "}
              <Link href="/advertise" className="group inline-flex items-center">
                <span className="text-primary-200 underline decoration-primary-300 hover:decoration-primary-100 transition-colors duration-200 animate-pulse group-hover:animate-none">
                  zamów online
                </span>
              </Link>
            </p>
          </div>

          {/* Enhanced search form */}
          <div className="flex flex-col items-center mb-10 lg:mb-12">
            <div className="w-full max-w-2xl">
              <Form loadingTexts={loadingTexts} />
            </div>
          </div>

          {/* Enhanced popular cities section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <h2 className="font-heading text-white text-lg lg:text-xl font-semibold">
                Często wyszukiwane
              </h2>
              <div className="h-px w-16 lg:w-24 bg-gradient-to-r from-primary-300 to-primary-200 rounded-full"></div>
            </div>
            
            {/* Enhanced city links grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 lg:gap-4 w-full max-w-5xl mx-auto">
              {popularCities.map((city, index) => (
                <Link
                  key={city.slug}
                  href={`pizza/${city.slug}`}
                  className="group relative p-3 lg:p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-golden card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="font-heading text-white text-sm lg:text-base font-medium group-hover:text-primary-100 transition-colors duration-200 block">
                    {city.name}
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* City card shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
