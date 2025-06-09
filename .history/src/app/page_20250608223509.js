import Link from "next/link";
import Opinions from "../components/Opinions";
import { Footer } from "../components/Footer";
import Image from "next/image";
import pizza from "../../public/assets/pizza.png";
import accent from "../../public/assets/asset6.png";
import accent1 from "../../public/assets/asset7.png";
import accent2 from "../../public/assets/asset4.png";
import CtaButton from "../components/CtaButton";
import { FaCheckCircle } from "react-icons/fa";
import Form from "../components/Form";

export default function Page() {
  return (
    <div>
      <div className="relative min-h-[35vh] w-full golden pt-24">
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
        <div className="relative z-50 mx-auto w-[90%] lg:w-1/2">
          <div className="flex flex-col items-center justify-center bg-black/60 p-6 rounded-xl py-12">
            <h1 className="text-center text-white drop-shadow-lg shadow-black text-2xl lg:text-3xl px-12">
              Najlepsze pizzerie w Twoim mieście
            </h1>
            <p className="text-white font-sans mt-4 text-center max-w-[80%] lg:max-w-[66%]">
              Wybierz najlepszą dla siebie restaurację i{" "}
              <Link href="/advertise">
                <span className="text-yellow-500 underline animate-pulse">
                  zamów online
                </span>
              </Link>
            </p>
            <div className="flex flex-col mt-8 mx-auto w-max max-w-full">
              <Form />
            </div>
            <div className="relative flex lg:justify-center items-center gap-4 lg:gap-12 !text-sm z-50 flex-wrap mt-12">
              <Link
                href="pizza/warszawa"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Warszawa
                </p>
              </Link>
              <Link
                href="pizza/grudziadz"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Grudziądz
                </p>
              </Link>
              <Link
                href="pizza/bydgoszcz"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Bydgoszcz
                </p>
              </Link>
              <Link
                href="pizza/poznan"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Poznań
                </p>
              </Link>
              <Link
                href="pizza/gniezno"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Gniezno
                </p>
              </Link>
              <Link
                href="pizza/krakow"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Kraków
                </p>
              </Link>
              <Link
                href="pizza/torun"
                className="group text-white px-6 py-3 z-10 duration-300 text-center w-max items-center flex"
              >
                <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                  Toruń
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Opinions />
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
