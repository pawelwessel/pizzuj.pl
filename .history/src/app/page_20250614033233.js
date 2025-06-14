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
import AdvertiseYourself from "../components/AdvertiseYourself";

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
      <AdvertiseYourself />
    </div>
  );
}
