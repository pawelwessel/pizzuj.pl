import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
// Assets
import pizza from "../../../public/assets/pizza.png";
import accent2 from "../../../public/assets/asset4.png";
import i1 from "../../../public/assets/1.webp";
import i2 from "../../../public/assets/2.webp";
import i3 from "../../../public/assets/3.webp";
import { ptSans } from "../../app/layout";

// Feature list items
const features = [
  {
    title: "Dodanie swojej pizzerii do bazy",
  },
  {
    title: "Wyświetlanie menu na pizzuj.pl",
  },
  {
    title: "Dodanie zdjęć i informacji o lokalu",
  },
  {
    title: "Odbieranie opinii i ocen klientów",
  },
];

// Pricing plans
const pricingPlans = [
  {
    image: i1,
    price: "0zł",
    title: "Za darmo",
    description: "Dołącz i stwórz profil swojej pizzerii.",
    featured: false,
  },
  {
    image: i2,
    price: "od 199zł/msc",
    title: "Pakiety premium",
    description: "Twórz wizerunek w pizzuj.pl.",
    featured: true,
  },
  {
    image: i3,
    price: "powyżej 2000zł/msc",
    title: "Wycena indywidualna",
    description: "Dla dużych lokali i firm.",
    featured: false,
    showCta: true,
  },
];

const FeatureItem = ({ title }) => (
  <div className="flex w-full items-center lg:justify-center lg:flex-col p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
    <FaCheckCircle className="text-[#ffa920] w-12 h-12 lg:w-28 lg:h-28 group-hover:scale-110 transition-transform duration-300" />
    <p className="font-medium text-left text-black ml-4 w-[80%] lg:text-center mt-6 text-lg">
      {title}
    </p>
    <div className="h-1 w-16 bg-[#ffa920] mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

const PricingCard = ({
  image,
  price,
  title,
  description,
  featured,
  showCta,
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-xl shadow-lg hover:shadow-xl hover:border-[#ffa920] transition-all duration-300 group relative`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0 rounded-xl overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
    {featured && (
      <div className="absolute -top-4 right-4 bg-[#ffa920] !text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
        Polecane
      </div>
    )}
    <div className="relative flex flex-col flex-1 p-4 sm:p-6 items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center rounded-lg bg-black/50 p-3 sm:p-4 w-[90%] sm:w-[85%] lg:w-[80%]">
        <div className="!text-sm 2xl:text-2xl font-light !text-white font-cocosharp italic">
          {price}
        </div>
        <h2
          className={`!text-lg w-max sm:text-3xl font-bold text-[#ffa920] transition-colors duration-300 ${ptSans.className}`}
        >
          {title}
        </h2>
        <div className="h-1 w-16 bg-white mt-3 sm:mt-4 mx-auto rounded-full" />
        <p className="text-center text-sm sm:text-base mt-3 !text-white font-cocosharp-italic">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default function AdvertiseYourself() {
  return (
    <div className="relative px-6 lg:px-12 pb-12 flex flex-col items-center">
      <Image
        src={pizza}
        alt="Promuj swój lokal z pizzą"
        className="w-32 xl:w-36 2xl:w-40 h-auto mb-12"
      />

      <span className="border-b-2 border-[#ffa920] pb-3 block text-[#ffa920] text-4xl mb-12 text-right w-full">
        Zareklamuj się
      </span>

      <h2 className="relative z-10 text-3xl font-bold text-black mt-12">
        Aktywny udział w rozwoju Twojej restauracji
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
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>

      <div className="flex flex-col lg:grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-12 mt-6">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
}
