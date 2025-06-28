import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPizzaSlice, FaUserPlus } from "react-icons/fa";
import ctaAccent from "../../../public/assets/asset10.png";

export default function AboutCallToAction() {
  return (
    <div className="relative py-16 lg:py-20 golden overflow-hidden">
      <Image
        src={ctaAccent}
        alt="Pizza decoration"
        className="absolute h-40 lg:h-56 xl:h-64 w-auto opacity-10 left-6 lg:left-16 top-1/2 -translate-y-1/2 z-0"
        width={300}
        height={300}
      />
      <div className="relative z-10 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="bg-black/80 p-8 lg:p-12 xl:p-16 rounded-2xl text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold !text-white mb-6">
            Dołącz do społeczności{" "}
            <span className="text-[#ffa920]">Pizzuj.pl</span>
          </h2>
          <div className="h-1 w-32 bg-[#ffa920] rounded-full mx-auto mb-8" />
          <p className="!text-white/90 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Rozpocznij swoją przygodę z najlepszymi pizzeriami w Polsce.
            Odkrywaj, oceniaj i dziel się swoimi doświadczeniami kulinarnymi.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/pizza/warszawa"
              className="group bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg"
            >
              <FaPizzaSlice className="text-[#ffa920] text-xl" />
              Znajdź pizzerie
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="group bg-[#ffa920] hover:bg-[#ec7308] !text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg"
            >
              <FaUserPlus className="text-xl" />
              Zarejestruj się
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl mb-3">🍕</div>
              <h3 className="!text-white font-bold text-lg mb-2">Odkrywaj</h3>
              <p className="!text-white/80 text-sm">
                Znajdź najlepsze pizzerie w swojej okolicy
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="!text-white font-bold text-lg mb-2">Oceniaj</h3>
              <p className="!text-white/80 text-sm">
                Dziel się swoimi opiniami i doświadczeniami
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="!text-white font-bold text-lg mb-2">
                Społeczność
              </h3>
              <p className="!text-white/80 text-sm">
                Połącz się z innymi miłośnikami pizzy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
