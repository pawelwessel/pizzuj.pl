import Image from "next/image";
import Link from "next/link";
import Form from "../Form";
import accent from "../../../public/assets/asset6.png";
import accent1 from "../../../public/assets/asset7.png";
import accent2 from "../../../public/assets/asset4.png";

export default function HeroSectionForHomePage() {
  return (
    <div className="relative min-h-[35vh] w-full golden pt-12 pb-12">
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
        <div className="flex flex-col items-center justify-center bg-black/60 p-6 rounded-xl pt-12 pb-6">
          <h1 className="text-center text-white drop-shadow-lg shadow-black text-2xl lg:text-3xl lg:px-12">
            Najlepsze pizzerie w Twoim mieście
          </h1>
          <p className="text-white font-sans mt-4 text-center text-sm">
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
          <h2 className="text-white font-sans mt-8 text-center">
            Często wyszukiwane
          </h2>
          <div className="h-px w-24 golden mt-2" />
          <div className="relative flex justify-center items-center gap-4 lg:gap-12 !text-sm z-50 flex-wrap mt-6 w-full">
            <Link
              href="pizza/warszawa"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Warszawa
              </p>
            </Link>
            <Link
              href="pizza/grudziadz"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Grudziądz
              </p>
            </Link>
            <Link
              href="pizza/bydgoszcz"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Bydgoszcz
              </p>
            </Link>
            <Link
              href="pizza/poznan"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Poznań
              </p>
            </Link>
            <Link
              href="pizza/gniezno"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Gniezno
              </p>
            </Link>
            <Link
              href="pizza/krakow"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Kraków
              </p>
            </Link>
            <Link
              href="pizza/torun"
              className="group text-white  z-10 duration-300 text-center w-max items-center flex"
            >
              <p className="group-hover:animate-bounce drop-shadow-lg shadow-black">
                Toruń
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
