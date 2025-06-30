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
import { loadingTexts } from "../../../db/data/loadingTexts";
import AdvertiseYourself from "../../../components/AdvertiseYourself";
export const dynamic = "force-dynamic";
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
          className="absolute h-36 lg:h-[30%] xl:h-[55%] 2xl:h-[70%] w-auto opacity-15 lg:opacity-15 left-3 lg:left-16 xl:left-36 top-12 lg:top-1/3 xl:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <Image
          src={accent1}
          alt="Pizza"
          className="absolute h-24 lg:h-[30%] xl:h-[55%] 2xl:h-[70%] w-auto opacity-20 lg:opacity-15 right-6 lg:right-16 xl:right-36 bottom-6 xl:bottom-auto lg:bottom-1/4 xl:top-1/2 xl:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <div className="relative z-50 mx-auto w-[90%] lg:w-2/3 xl:w-1/2">
          <div className="flex flex-col items-center justify-center text-center bg-black/50 rounded-xl p-3 sm:p-6">
            <h1 className="!text-white text-lg lg:text-3xl drop-shadow-lg shadow-black font-bold">
              {page?.page?.h2}
            </h1>

            <p className="mt-3 lg:mt-6 w-[90%] mx-auto !text-white drop-shadow-lg font-sans text-sm sm:text-base">
              {page?.page?.introduction}
            </p>
            <div className="flex flex-col mt-4 lg:mt-8 mx-auto w-max max-w-full">
              <Form loadingTexts={loadingTexts} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-[#ffa920] p-6 relative">
        <p className="w-max p-4 rounded-xl absolute top-0 -translate-y-[10%] left-1/2 -translate-x-1/2 bg-white text-black border-[#ffa920] border-2 z-0">
          {page?.page?.businessName}
        </p>
        <div className="p-6 pt-16 text-center bg-white rounded-xl shadow-lg">
          <h2 className="font-sans font-bold text-xl lg:text-3xl">
            {page?.page?.h1}
          </h2>
          <p className="text-black mt-3 text-center font-sans">
            {page?.page?.rankingSection}
          </p>
          <ArrayWithPlaces placesData={page?.places} />
          <div className="mt-6">
            <h3 className="text-xl lg:text-3xl bg-[#ffa920] block p-3 !text-white rounded-md w-max max-w-full">
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
      <AdvertiseYourself />
      <CtaButton />
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
