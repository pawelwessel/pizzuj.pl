import Opinions from "../components/Opinions";
import { Footer } from "../components/Footer";
import Image from "next/image";
import pizza from "../../public/assets/pizza.png";
import accent2 from "../../public/assets/asset4.png";
import accent3 from "../../public/assets/asset5.png";
import CtaButton from "../components/CtaButton";
import { FaCheckCircle } from "react-icons/fa";
import { getDocument } from "../db/firebase";
import HeroSectionForHomePage from "../components/HeroSectionForHomePage";
import WarsawSection from "../components/WarsawSection";

export default async function Page() {
  const warsaw = await getDocument("pages", "warszawa");
  return (
    <div>
      <HeroSectionForHomePage />
      <div className="relative w-full pb-12">
        <Image
          src={accent3}
          alt="Promuj swój lokal z pizzą"
          className="w-24 lg:w-40 top-3 h-auto absolute z-0 right-24 opacity-50"
          width={250}
          height={250}
        />
        <h2 className="z-50 relative rounded-b-xl golden text-white border-x border-yellow-500 mb-12 block w-max max-w-full mx-auto text-2xl font-bold pt-6 pb-6 px-12 text-center">
          Dołącz do pizzuj
        </h2>
        <p className="p-6 border-x border-yellow-500 block w-max max-w-full mx-auto text-center text-sm lg:text-base font-sans">
          Dołącz do naszej sieci i zyskaj nowych klientów. Wspólnie <br />{" "}
          zbudujemy najlepszą sieć pizz w Polsce.
        </p>
        <p className="text-gray-500 block w-max max-w-full mx-auto text-center text-xs lg:text-base font-sans font-light mt-6">
          Przykładowe lokale z{" "}
          <span
            className="font-bold text-yellow-500"
            title="Pozyskujemy adresy i nazwy lokali z tego samego miejsca co Google"
          >
            Mapy Google
          </span>
          :
        </p>
      </div>

      <WarsawSection placesData={warsaw.places} />
      <Opinions />
      <div className="relative px-6 lg:px-12 pb-12 flex flex-col items-center">
        <Image
          src={pizza}
          alt="Promuj swój lokal z pizzą"
          className="w-12 lg:w-32 xl:w-36 2xl:w-40 lg:top-12 xl:top-24 h-auto absolute z-0 left-4 top-12"
        />
        <span className="block px-8 rounded-b-md py-4 golden text-white w-max">
          Zareklamuj się
        </span>
        <h2 className="relative z-10 text-3xl font-bold text-black mt-12">
          Zwiększ ruch w swoim lokalu
        </h2>
        <p className="max-w-[90%] lg:max-w-[70%] font-sans text-left mt-4 text-black border-l-2 border-[#ffa920] p-4 bg-gray-200">
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
