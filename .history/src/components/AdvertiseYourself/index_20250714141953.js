import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
// Assets
import pizza from "../../../public/assets/pizza.png";
import accent2 from "../../../public/assets/asset4.png";
import i1 from "../../../public/assets/1.webp";
import i2 from "../../../public/assets/2.webp";
import i3 from "../../../public/assets/3.webp";
import { ptSans } from "../../app/layout";
import Link from "next/link";

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
    price: "",
    title: "Za darmo",
    description: "Stwórz profil swojej restauracji.",
    featured: false,
  },
  {
    image: i2,
    price: "od 199zł/msc",
    title: "Pakiety premium",
    description: "Twórz wizerunek restauracji.",
    featured: true,
  },
  {
    image: i3,
    price: "powyżej 2000zł/msc",
    title: "Wycena indywidualna",
    description: "Dla dużych lokali.",
    featured: false,
    showCta: true,
  },
];

const FeatureItem = ({ title }) => (
  <div className="flex w-full items-center lg:justify-center lg:flex-col gap-3 p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
    <FaCheckCircle className="text-[#ffa920] w-12 h-12 lg:w-28 lg:h-28 group-hover:scale-110 transition-transform duration-300" />
    <p className="font-cocosharp font-medium text-left text-black w-[80%] lg:text-center mt-6 text-lg">
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
    className={`flex flex-col items-center justify-center text-center min-w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-xl shadow-lg hover:shadow-xl hover:border-[#ffa920] transition-all duration-300 group relative`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0 rounded-xl overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
    </div>
    {featured && (
      <div className="absolute -top-4 right-4 bg-[#ffa920] !text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
        Polecane
      </div>
    )}
    <div className="relative flex flex-col flex-1 items-end justify-end w-full h-full">
      <div className="flex flex-col items-center justify-center bg-black/50 p-3 sm:p-4 w-full rounded-b-xl">
        {price && (
          <div className="mb-2 !text-sm 2xl:text-2xl font-light !text-white font-cocosharp italic">
            {price}
          </div>
        )}
        <h2
          className={`mb-2 !text-lg w-max sm:text-3xl font-bold text-[#ffa920] transition-colors duration-300 ${ptSans.className}`}
        >
          {title}
        </h2>
        <p className="text-center text-sm sm:text-base !text-white font-cocosharp">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default function AdvertiseYourself() {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 left-12 w-32 h-32 rounded-full opacity-5 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-16 w-24 h-24 opacity-8 rotate-45 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
            animationDelay: "1.5s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-3 animate-bounce-gentle"
          style={{
            background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
            animationDelay: "3s",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto w-[95%] sm:w-[90%] lg:w-[80%] max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="relative inline-block mb-8">
            <Image
              src={pizza}
              alt="Promuj swój lokal z pizzą"
              className="w-32 xl:w-36 2xl:w-40 h-auto animate-bounce-gentle"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffa920]/20 to-[#ec7308]/20 rounded-full blur-2xl scale-150 opacity-50 animate-pulse"></div>
          </div>

          <h1 className="font-cocosharp-bold-italic text-4xl lg:text-5xl xl:text-6xl text-gray-800 leading-tight mb-6">
            Zareklamuj <span className="text-[#ffa920]">się</span>
          </h1>

          {/* Modern description card */}
          <div className="glass bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-[#ffa920]/20 shadow-large max-w-4xl mx-auto group hover:border-[#ffa920]/40 transition-all duration-300">
            <p
              className={`text-lg lg:text-xl text-gray-700 leading-relaxed ${ptSans.className}`}
            >
              Dzięki współpracy z nami rozszerzysz obecność swojej restauracji w
              internecie. Wyróżnimy Twoją pizzerię w Pizzuj.pl oraz w
              wyszukiwarce Google. Zyskasz więcej opinii, nowych klientów i
              zwiększysz ilość zamówień przez internet.
            </p>

            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffa920] to-[#ec7308] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* About our offer section */}
        <div className="relative mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#ffa920]"></div>
            <h3 className="font-cocosharp-bold-italic text-3xl lg:text-4xl text-gray-800">
              O naszej <span className="text-[#ffa920]">ofercie</span>...
            </h3>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ffa920]"></div>
          </div>

          {/* Floating accent image */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-10 animate-float">
            <Image
              src={accent2}
              alt="Decorative accent"
              className="w-32 lg:w-40 xl:w-48 h-auto"
              width={250}
              height={250}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 0.2}s` }}
              className="animate-fade-in-up"
            >
              <FeatureItem {...feature} />
            </div>
          ))}
        </div>

        <Link
          href="/register?free=true"
          className="mx-auto flex w-max max-w-full font-cocosharp text-center bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-500 hover:to-black hover:text-white text-gray-800 font-semibold py-4 px-6 w-full rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary-500 hover:shadow-golden transform hover:scale-105 relative overflow-hidden group"
        >
          {/* Animated background shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Sparkle effects */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-pulse delay-200 opacity-0 group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full animate-bounce delay-500 opacity-0 group-hover:opacity-100"></div>

          <span className="relative z-10">Rozpocznij za darmo</span>
        </Link>

        {/* Pricing Cards */}
        {/* <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in-up"
            >
              <PricingCard {...plan} />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
