import Link from "next/link";
import Opinions from "../components/Opinions";
import { Footer } from "../components/Footer";
import Image from "next/image";
import pizza from "../../public/assets/pizza.png";
import accent from "../../public/assets/asset6.png";
import accent1 from "../../public/assets/asset7.png";
import { FaCheck, FaMagnifyingGlass } from "react-icons/fa6";
import CtaButton from "../components/CtaButton";
import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  return (
    <div>
      <div className="relative min-h-[35vh] w-full golden pt-24">
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
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-white drop-shadow-lg shadow-black text-2xl lg:text-3xl">
              Oceń pizzerię w Twoim mieście
            </h1>
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
        <div className="mt-24 relative flex overflow-x-auto lg:justify-center items-center w-full gap-4 lg:gap-12 !text-sm z-50">
          <Link
            href="/opinie-o-pizzy-warszawa"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Warszawa
            </p>
          </Link>
          <Link
            href="/poznaj-najlepsze-opinie-o-pizzy-w-grudziadzu"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Grudziądz
            </p>
          </Link>
          <Link
            href="/pizzerie-bydgoszcz-opinie"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Bydgoszcz
            </p>
          </Link>
          <Link
            href="/pizzerie-bydgoszcz-opinie"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Poznań
            </p>
          </Link>
          <Link
            href="/pizzerie-gniezno-opinie"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Gniezno
            </p>
          </Link>
          <Link
            href="/pizzerie-krakow-opinie"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Kraków
            </p>
          </Link>
          <Link
            href="/opinie-pizza-torun"
            className="group text-white bg-[#333] px-6 py-3 uppercase rounded-t-lg z-10 duration-300 text-center w-max items-center flex"
          >
            <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
              Toruń
            </p>
          </Link>
        </div>
      </div>

      <Opinions />
      <div className="relative px-6 lg:px-12 pb-12 flex flex-col items-center justify-center">
        <Image
          src={pizza}
          alt="Promuj swój lokal z pizzą"
          className="w-20 lg:w-32 xl:w-36 2xl:w-40 lg:top-12 xl:top-24  h-auto absolute z-0 left-4 top-4"
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
        <p className="text-left mt-6 text-3xl">Nasza oferta</p>
        <div className="h-px w-24 golden mt-2" />
        <div className="flex items-center flex-wrap mt-4">
          <FaCheckCircle className="text-[#ffa920] w-9 h-9" />
          <p className="font-light text-left text-black ml-2">
            Wyróżnienie Twojej pizzerii w Pizzuj.pl
          </p>
        </div>
      </div>

      <CtaButton />
      <Footer />
    </div>
  );
}
