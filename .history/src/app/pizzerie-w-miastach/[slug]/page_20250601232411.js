import { FaMessage } from "react-icons/fa6";
import accent from "../../../../public/assets/asset6.png";
import accent1 from "../../../../public/assets/asset7.png";
import accent2 from "../../../../public/assets/asset4.png";
import Image from "next/image";
import ArrayWithPlaces from "../../../components/ArrayWithPlaces";
import { getDocument, getDocuments } from "../../../db/firebase";
import { Footer } from "../../../components/Footer";
import CtaButton from "../../../components/CtaButton";
import pizza from "../../../../public/assets/pizza.png";
import { FaCheckCircle } from "react-icons/fa";
import Form from "../../../components/Form";
export const revalidate = 60;
const pages = await getDocuments("pages");
export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page?.id,
  }));
}
export default async function Page({ params }) {
  const { slug } = await params;
  const page = await getDocument("pages", slug);

  if (!page) {
    return <div>Page not found</div>;
  }
  return (
    <div>
      <div className="overflow-hidden relative min-h-[35vh] w-full golden pt-12 lg:pt-24 pb-12">
        <Image
          src={accent}
          alt="Pizza"
          className="absolute h-36 lg:h-[80%] w-auto opacity-15 lg:opacity-5 left-3 lg:left-16 xl:left-36 top-12 lg:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <Image
          src={accent1}
          alt="Pizza"
          className="absolute h-24 lg:h-[80%] w-auto opacity-20 lg:opacity-5 right-6 lg:right-16 xl:right-36 bottom-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <div className="relative z-50 mx-auto w-[90%] lg:w-2/3 xl:w-1/2">
          <div className="flex flex-col items-center justify-center text-center bg-black/50 rounded-xl p-6 py-12">
            <h1 className="text-white text-xl lg:text-3xl drop-shadow-lg shadow-black font-bold">
              {page?.page?.h1}
            </h1>

            <p className="mt-6 w-[90%] mx-auto text-white drop-shadow-lg">
              {page?.page?.introduction}
            </p>
            <div className="flex flex-col mt-8 mx-auto w-max max-w-full">
              <Form />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-[#ffa920] p-6 relative">
        <div className="w-max p-4 rounded-xl absolute top-0 -translate-y-[10%] left-1/2 -translate-x-1/2 bg-white text-black border-[#ffa920] border-2 z-0">
          {page?.page?.businessName}
        </div>
        <div className="p-6 pt-12 text-center bg-white rounded-xl shadow-lg">
          <h2 className="font-sans font-bold text-xl lg:text-3xl">
            {page?.page?.h2}
          </h2>
          <ArrayWithPlaces placesData={page?.places} />
          <div className="mt-6">
            <h3 className="text-xl lg:text-3xl bg-[#ffa920] block p-3 text-white rounded-md w-max max-w-full">
              {page?.page?.testimonialSection}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 w-[90%] lg:w-[66%] mt-4 gap-4">
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion1}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion2}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion3}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion4}&quot;</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <p>{page?.page?.faqSection}</p> */}
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
        <div className="relative mt-12 mb-6">
          <Image
            src={accent2}
            alt="Promuj swój lokal z pizzą"
            className="w-20 lg:w-32 xl:w-36 2xl:w-40 lg:-top-8 xl:top-0 h-auto absolute z-0 -right-12 lg:-right-60 xl:-right-96 top-16 opacity-20"
            width={250}
            height={250}
          />
          <p className="text-left mt-6 text-xl lg:text-3xl">
            O naszej ofercie...
          </p>
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

  return {
    title: page?.page?.googleTitle,
    description: page?.page?.googleDescription,
  };
}
