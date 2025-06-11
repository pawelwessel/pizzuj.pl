import {
  FaMessage,
  FaStar,
  FaPhone,
  FaGlobe,
  FaLocationDot,
} from "react-icons/fa6";
import accent from "../../../../../public/assets/asset6.png";
import accent1 from "../../../../../public/assets/asset7.png";
import accent2 from "../../../../../public/assets/asset4.png";
import pizza from "../../../../../public/assets/pizza.png";
import Image from "next/image";
import ArrayWithPlaces from "../../../../components/ArrayWithPlaces";
import { getDocument } from "../../../../db/firebase";
import { Footer } from "../../../../components/Footer";
import CtaButton from "../../../../components/CtaButton";
import { FaCheckCircle } from "react-icons/fa";
import Form from "../../../../components/Form";
import { loadingTexts } from "../../../../db/data/loadingTexts";
import Link from "next/link";
export const dynamic = "force-dynamic";
const pizzeriaData = await fetch(
  `${process.env.NEXT_PUBLIC_LINK}/api/pizzeria/${pizzeria}`
).then((res) => res.json());

export default async function Page({ params }) {
  const { pizzeria } = await params;

  return (
    <div>
      <div className="overflow-hidden relative min-h-[35vh] w-full golden pt-24 pb-12">
        <Image
          src={accent}
          alt="Pizza"
          className="absolute h-36 lg:h-[120%] w-auto opacity-15 lg:opacity-5 left-3 lg:left-16 xl:left-36 top-12 lg:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <Image
          src={accent1}
          alt="Pizza"
          className="absolute h-24 lg:h-[120%] w-auto opacity-20 lg:opacity-5 right-6 lg:right-16 xl:right-36 bottom-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <div className="relative z-50 mx-auto w-[90%] lg:w-1/2">
          <div className="flex flex-col items-center justify-center text-center bg-black/50 rounded-xl p-6">
            <h1 className="text-white text-xl lg:text-3xl drop-shadow-lg shadow-black font-bold">
              {pizzeriaData.name}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1">
                {Array.from({
                  length: Math.round(pizzeriaData.rating || 0),
                }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <span className="text-white">
                ({pizzeriaData.user_ratings_total} opinii)
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {pizzeriaData.phone && (
                <Link
                  href={`tel:${pizzeriaData.phone}`}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-white"
                >
                  <FaPhone />
                  {pizzeriaData.phone}
                </Link>
              )}
              {pizzeriaData.website && (
                <Link
                  href={pizzeriaData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-white"
                >
                  <FaGlobe />
                  Strona WWW
                </Link>
              )}
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white">
                <FaLocationDot />
                {pizzeriaData.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-[#ffa920] p-6">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="font-sans font-bold text-xl lg:text-3xl mb-8">
            Opinie klientów
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pizzeriaData.reviews?.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 shadow">
                <div className="flex items-start gap-4">
                  <Image
                    src={
                      review.profile_photo_url || "/assets/user-placeholder.png"
                    }
                    alt={review.author_name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">{review.author_name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{review.text}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(review.time * 1000).toLocaleDateString("pl-PL")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-6 lg:px-12 pb-12 flex flex-col items-center justify-center">
        <Image
          src={pizza}
          alt="Promuj swój lokal z pizzą"
          className="w-20 lg:w-32 xl:w-36 2xl:w-40 lg:top-12 xl:top-24 h-auto absolute z-0 left-4 top-4"
        />
        <span className="block px-8 rounded-b-md py-4 golden text-white w-max">
          Zareklamuj się
        </span>
        <h2 className="relative z-10 text-xl lg:text-3xl font-bold text-black mt-12">
          Zwiększ ruch w swoim lokalu
        </h2>
        <p className="font-light max-w-[90%] lg:max-w-[66%] text-left mt-4 text-black border-l-2 border-[#ffa920] p-4 bg-gray-200">
          Dzięki współpracy z nami rozszerzysz obecność swojej restauracji w
          internecie. Wyróżnimy Twoją pizzerię w Pizzuj.pl oraz w wyszukiwarce
          Google. Zyskasz więcej opinii, nowych klientów i zwiększysz ilość
          zamówień przez internet.
        </p>
      </div>

      <CtaButton />
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { pizzeria } = params;
  const pizzeriaData = await fetch(
    `${process.env.NEXT_PUBLIC_LINK}/api/pizzeria/${pizzeria}`
  );
  const data = await pizzeriaData.json();

  return {
    title: `${pizzeriaData?.name || "Pizzeria"} - Pizzuj.pl`,
    description: `Sprawdź opinie, menu i informacje kontaktowe ${
      pizzeriaData?.name || "pizzerii"
    }. Zamów online lub odwiedź lokal!`,
  };
}
