"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLightbulb, FaHeart, FaRocket } from "react-icons/fa";
import missionAccent from "../../../public/assets/asset8.png";
import { ptSans } from "../../app/layout";

export default function AboutMission() {
  return (
    <div className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={missionAccent}
          alt="Dekoracyjny obrazek pizzy"
          className="absolute h-32 lg:h-48 xl:h-56 w-auto opacity-5 right-6 lg:right-16 bottom-12 z-0"
          width={300}
          height={300}
          aria-hidden="true"
        />
      </motion.div>
      <div className="relative z-10 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
          >
            Misja <span className="text-[#ffa920]">Pizzuj.pl</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-24 bg-[#ffa920] rounded-full mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-gray-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${ptSans.className}`}
          >
            Połączenie dwóch światów – technologii i gastronomii w jednym
            miejscu
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-[#ffa920] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <FaLightbulb className="!text-white text-2xl" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Innowacja</h3>
            <p className="text-gray-600 leading-relaxed font-cocosharp">
              Łączę nowoczesną technologię z tradycyjną sztuką tworzenia pizzy
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-[#ec7308] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <FaHeart className="!text-white text-2xl" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pasja</h3>
            <p className="text-gray-600 leading-relaxed font-cocosharp">
              Każdy element projektu powstaje z miłości do pizzy i kuchni
              włoskiej
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-[#ffa920] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <FaRocket className="!text-white text-2xl" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Przyszłość</h3>
            <p className="text-gray-600 leading-relaxed font-cocosharp">
              Buduję platformę, która zmieni sposób odkrywania najlepszych
              pizzerii
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg"
        >
          <div className="max-w-4xl mx-auto text-center uppercase font-light">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-gray-700 text-lg leading-relaxed mb-6 font-cocosharp"
            >
              Projekt <strong className="text-[#ffa920]">pizzuj.pl</strong> to
              moje połączenie dwóch światów – technologii i gastronomii. Tworzę
              to miejsce, by dzielić się wiedzą, obserwacjami i tworzyć
              przyszłość.{" "}
              <Link
                href="/about"
                className="text-orange-600 hover:text-orange-700 underline"
                aria-label="Dowiedz się więcej o projekcie"
              >
                Dowiedz się więcej
              </Link>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-gray-700 text-lg leading-relaxed font-cocosharp"
            >
              Jeśli kochasz pizzę, chcesz poznać kulisy pracy w gastro albo
              szukasz inspiracji do własnych kulinarnych eksperymentów –
              <span className="text-[#ec7308] font-semibold">
                {" "}
                jesteś w dobrym miejscu
              </span>
              .
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
