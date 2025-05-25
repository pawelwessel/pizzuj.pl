import { FaMagnifyingGlass, FaMessage } from "react-icons/fa6";
import accent from "../../../public/assets/asset6.png";
import accent1 from "../../../public/assets/asset7.png";
import accent2 from "../../../public/assets/asset4.png";
import Image from "next/image";
import ArrayWithPlaces from "../../components/ArrayWithPlaces";
import { createLinkFromText } from "../../lib/createLinkFromText";
import { getDocument, getDocuments } from "../../db/firebase";
import { Footer } from "../../components/Footer";
import CtaButton from "../../components/CtaButton";
import pizza from "../../../public/assets/pizza.png";
import { FaCheckCircle } from "react-icons/fa";

const pages = await getDocuments("pages");
export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: createLinkFromText(page.page.address),
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { page } = await getDocument("pages", slug);

  if (!page) {
    return <div>Page not found</div>;
  }

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
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-white text-3xl drop-shadow-lg shadow-black font-bold">
              {page.h1}
            </h1>

            <p className="mt-6 w-[90%] mx-auto text-white drop-shadow-lg">
              {page.introduction}
            </p>
            <div className="flex flex-col mt-6 mx-auto w-max max-w-full">
              <input
                type="text"
                className="p-3 lg:p-6 rounded-md bg-white/50 text-black max-w-[450px]"
                placeholder="Wpisz miasto"
              />
              <button className="text-white goldenShadow p-3 rounded-b-md flex w-max mx-auto max-w-full items-center">
                <FaMagnifyingGlass className="w-7 h-7 mr-2" />
                Znajdź lokal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-[#ffa920] p-6">
        <div className="p-6 bg-white rounded-md shadow-lg">
          <h2 className="font-sans font-bold text-3xl">{page.h2}</h2>
          <ArrayWithPlaces command={page.h1} />
          <div className="mt-6">
            <h3 className="text-3xl bg-[#ffa920] block p-3 text-white rounded-md w-max max-w-full">
              {page.testimonialSection}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 w-[90%] lg:w-[66%] mt-4 gap-4">
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page.opinion1}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page.opinion2}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page.opinion3}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page.opinion4}&quot;</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <p>{page.faqSection}</p> */}
      <div className="relative px-6 lg:px-12 pb-12 flex flex-col items-center justify-center">
        <Image
          src={pizza}
          alt="Promuj swój lokal z pizzą"
          className="w-20 lg:w-32 xl:w-36 2xl:w-40 lg:top-12 xl:top-24 h-auto absolute z-0 left-4 top-4"
        />
        <span className="block px-8 rounded-b-md py-4 golden text-white w-max">
          Zareklamuj się
        </span>
        <h2 className="relative z-10 text-3xl font-bold text-black mt-12">
          Zwiększ ruch w swoim lokalu
        </h2>
        <p className="font-light max-w-[90%] lg:max-w-[66%] text-left mt-4 text-black border-l-2 border-[#ffa920] p-4 bg-gray-200">
          Dzięki współpracy z nami rozszerzysz obecność swojej restauracji w
          internecie. Wyróżnimy Twoją pizzerię w Pizzuj.pl oraz w wyszukiwarce
          Google. Zyskasz więcej opinii, nowych klientów i zwiększysz ilość
          zamówień przez internet.
        </p>
        <div className="relative mt-12 mb-6">
          <Image
            src={accent2}
            alt="Promuj swój lokal z pizzą"
            className="w-20 lg:w-32 xl:w-36 2xl:w-40 lg:-top-8 xl:top-0 h-auto absolute z-0 -right-12 lg:-right-60 xl:-right-96 top-16 opacity-20"
            width={250}
            height={250}
          />
          <p className="text-left mt-6 text-3xl">O naszej ofercie...</p>
        </div>
        <div className="h-px w-24 golden mt-2" />
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-12 mt-6">
          <div className="flex w-full mt-4 items-center lg:justify-center lg:flex-col">
            <FaCheckCircle className="text-[#ffa920] w-9 h-9 lg:w-24 lg:h-24" />
            <p className="font-light text-left text-black ml-2 w-[80%] lg:text-center mt-4">
              Wyróżnienie Twojej restauracji w Pizzuj.pl
            </p>
          </div>
          <div className="flex w-full mt-4 items-center lg:justify-center lg:flex-col">
            <FaCheckCircle className="text-[#ffa920] w-9 h-9 lg:w-24 lg:h-24" />

            <p className="font-light text-left text-black ml-2 w-[80%] lg:text-center mt-4">
              Reklama w Google i innych wyszukiwarkach
            </p>
          </div>
          <div className="flex w-full mt-4 items-center lg:justify-center lg:flex-col">
            <FaCheckCircle className="text-[#ffa920] w-9 h-9 lg:w-24 lg:h-24" />

            <p className="font-light text-left text-black ml-2 w-[80%] lg:text-center mt-4">
              Polecenia poprzez kanały social media
            </p>
          </div>
          <div className="flex w-full mt-4 items-center lg:justify-center lg:flex-col">
            <FaCheckCircle className="text-[#ffa920] w-9 h-9 lg:w-24 lg:h-24" />

            <p className="font-light text-left text-black ml-2 w-[80%] lg:text-center mt-4">
              Promowany wpis na blogu Pizzuj.pl
            </p>
          </div>
        </div>
      </div>

      <CtaButton />
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }, parent) {
  // read route params
  const { slug } = await params;

  // fetch data
  const page = await getDocument("pages", slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page.page.googleTitle,
    description: page.page.googleDescription,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}
