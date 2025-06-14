import Image from "next/image";
import pizza from "../../../public/assets/pizza.png";
import accent2 from "../../../public/assets/asset4.png";
import { FaCheckCircle } from "react-icons/fa";
export default function AdvertiseYourself() {
  return (
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
      <p className="w-full lg:max-w-[70%] font-sans text-left mt-12 text-black border-l-2 border-[#ffa920] p-4 bg-gray-200">
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
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 mt-12 max-w-6xl mx-auto">
        <div className="flex w-full items-center lg:justify-center lg:flex-col p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
          <FaCheckCircle className="text-[#ffa920] w-12 h-12 lg:w-28 lg:h-28 group-hover:scale-110 transition-transform duration-300" />
          <p className="font-medium text-left text-black ml-4 w-[80%] lg:text-center mt-6 text-lg">
            Dodanie swojej pizzerii do bazy
          </p>
          <div className="h-1 w-16 bg-[#ffa920] mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex w-full items-center lg:justify-center lg:flex-col p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
          <FaCheckCircle className="text-[#ffa920] w-12 h-12 lg:w-28 lg:h-28 group-hover:scale-110 transition-transform duration-300" />
          <p className="font-medium text-left text-black ml-4 w-[80%] lg:text-center mt-6 text-lg">
            Wyświetlanie menu na pizzuj.pl
          </p>
          <div className="h-1 w-16 bg-[#ffa920] mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex w-full items-center lg:justify-center lg:flex-col p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
          <FaCheckCircle className="text-[#ffa920] w-12 h-12 lg:w-28 lg:h-28 group-hover:scale-110 transition-transform duration-300" />
          <p className="font-medium text-left text-black ml-4 w-[80%] lg:text-center mt-6 text-lg">
            Dodanie zdjęć i informacji o lokalu
          </p>
          <div className="h-1 w-16 bg-[#ffa920] mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex w-full items-center lg:justify-center lg:flex-col p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
          <FaCheckCircle className="text-[#ffa920] w-12 h-12 lg:w-28 lg:h-28 group-hover:scale-110 transition-transform duration-300" />
          <p className="font-medium text-left text-black ml-4 w-[80%] lg:text-center mt-6 text-lg">
            Odbieranie opinii i ocen klientów
          </p>
          <div className="h-1 w-16 bg-[#ffa920] mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-12 mt-6">
        <div className="flex flex-col mt-12 items-center justify-center text-center w-full p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-[#ffa920] transition-all duration-300 group">
          <div className="relative flex flex-col items-center justify-center">
            <div className=""></div>
            <h2 className="text-3xl font-bold text-black mt-12 group-hover:text-[#ffa920] transition-colors duration-300">
              Całkowicie za darmo
            </h2>
            <div className="h-1 w-16 bg-[#ffa920] mt-4 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="w-full lg:max-w-[70%] font-sans text-left mt-12 text-black border-l-2 border-[#ffa920] p-4 bg-gray-100 rounded-r-xl shadow-inner">
            Dołącz i stwórz profil swojej pizzerii.
          </p>
        </div>
        <div className="flex flex-col mt-12 items-center justify-center text-center w-full p-6 rounded-xl border-2 border-[#ffa920] shadow-lg hover:shadow-xl transition-all duration-300 group relative">
          <div className="absolute -top-4 right-4 bg-[#ffa920] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
            Polecane
          </div>
          <div className="relative">
            <div className=""></div>
            <h2 className="text-3xl font-bold text-black mt-12 group-hover:text-[#ffa920] transition-colors duration-300">
              Pakiety premium
            </h2>
            <div className="h-1 w-16 bg-[#ffa920] mt-4 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="w-full lg:max-w-[70%] font-sans text-left mt-12 text-black border-l-2 border-[#ffa920] p-4 bg-gray-100 rounded-r-xl shadow-inner">
            Twórz wizerunek w pizzuj.pl.
          </p>
        </div>
        <div className="flex flex-col mt-12 items-center justify-center text-center w-full p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-[#ffa920] transition-all duration-300 group">
          <div className="relative">
            <div className=""></div>
            <h2 className="text-3xl font-bold text-black mt-12 group-hover:text-[#ffa920] transition-colors duration-300">
              Wycena indywidualna
            </h2>
            <div className="h-1 w-16 bg-[#ffa920] mt-4 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="w-full lg:max-w-[70%] font-sans text-left mt-12 text-black border-l-2 border-[#ffa920] p-4 bg-gray-100 rounded-r-xl shadow-inner">
            Dla dużych lokali i firm.
          </p>
        </div>
      </div>
    </div>
  );
}
