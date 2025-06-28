import Image from "next/image";
import accent from "../../../public/assets/asset2.png";

export default function AboutHero() {
  return (
    <div className="relative min-h-[40vh] w-full golden pt-20 pb-12 lg:pt-24 lg:pb-16">
      <Image
        src={accent}
        alt="Pizza decoration"
        className="absolute h-32 lg:h-[40%] xl:h-[60%] w-auto opacity-10 right-6 lg:right-16 xl:right-24 top-12 lg:top-1/2 lg:-translate-y-1/2 z-0"
        width={300}
        height={300}
      />
      <div className="relative z-50 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="flex flex-col items-center justify-center bg-black/70 p-8 lg:p-12 rounded-2xl">
          <h1 className="text-center !text-white drop-shadow-lg shadow-black text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            O mnie
          </h1>
          <div className="h-1 w-24 golden rounded-full mb-8" />
          <p className="!text-white text-lg lg:text-xl text-center max-w-3xl leading-relaxed">
            Połączenie technologii i pasji do pizzy - poznaj historię Pizzuj.pl
          </p>
        </div>
      </div>
    </div>
  );
}
