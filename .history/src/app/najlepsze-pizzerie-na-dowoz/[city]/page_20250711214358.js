import { notFound } from "next/navigation";
import ArrayWithPlaces from "../../../components/ArrayWithPlaces";
import AdvertiseYourself from "../../../components/AdvertiseYourself";
import CtaButton from "../../../components/CtaButton";
import { createLinkFromText } from "../../../lib/createLinkFromText";

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
    <div>
      <div className="overflow-hidden relative min-h-[35vh] w-full golden pt-12 lg:pt-24 pb-12">
        <div className="relative z-50 mx-auto w-[90%] lg:w-2/3 xl:w-1/2">
          <div className="flex flex-col items-center justify-center text-center bg-black/50 rounded-xl p-3 sm:p-6">
            <h1 className="!text-white text-lg lg:text-3xl drop-shadow-lg shadow-black font-bold">
              Najlepsze pizzerie na dowóz –{" "}
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </h1>
            <p className="mt-3 lg:mt-6 w-[90%] mx-auto !text-white drop-shadow-lg font-sans text-sm sm:text-base">
              Odkryj ranking najlepszych pizzerii z dowozem w mieście {city}.
              Sprawdź opinie, promocje i zamów pizzę online z dostawą prosto do
              domu!
            </p>
            <div className="flex flex-col mt-4 lg:mt-8 mx-auto w-max max-w-full">
              {/* You can add a search or CTA here */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-[#ffa920] p-6 relative">
        <p className="w-max p-4 rounded-xl absolute top-0 -translate-y-[10%] left-1/2 -translate-x-1/2 bg-white text-black border-[#ffa920] border-2 z-0">
          Pizzerie z dowozem – {city}
        </p>
        <div className="p-6 pt-16 text-center bg-white rounded-xl shadow-lg">
          <h2 className="font-sans font-bold text-xl lg:text-3xl">
            Ranking pizzerii na dowóz w {city}
          </h2>
          <p className="text-black mt-3 text-center font-sans">
            Zobacz listę najlepszych pizzerii oferujących dowóz w Twoim mieście.
            Zamów pizzę online i ciesz się smakiem bez wychodzenia z domu!
          </p>
          {(!pizzerias || pizzerias.length === 0) && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <p className="text-gray-600">
                Brak danych o pizzeriach w tym mieście...
              </p>
            </div>
          )}
          {pizzerias && pizzerias.length > 0 && (
            <ArrayWithPlaces placesData={pizzerias} />
          )}
          <div className="mt-6">
            <h3 className="text-xl lg:text-3xl bg-[#ffa920] block p-3 !text-white rounded-md w-max max-w-full">
              Promocja Twojej pizzerii w {city}
            </h3>
            <p className="text-black mt-3 text-center font-sans">
              Jesteś właścicielem pizzerii w {city}? Dodaj swoją restaurację do
              rankingu i zwiększ widoczność wśród lokalnych klientów! Skorzystaj
              z naszych narzędzi marketingowych i reklamowych, aby dotrzeć do
              nowych odbiorców.
            </p>
          </div>
        </div>
      </div>
      <AdvertiseYourself />
      <CtaButton />
    </div>
  );
}
