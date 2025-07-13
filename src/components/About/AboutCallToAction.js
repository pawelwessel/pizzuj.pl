"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaPizzaSlice, FaUserPlus } from "react-icons/fa";
import ctaAccent from "../../../public/assets/asset10.png";
import { ptSans } from "../../app/layout";

export default function AboutCallToAction() {
  return (
    <div className="relative py-16 lg:py-20 golden overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={ctaAccent}
          alt="Dekoracyjny obrazek pizzy"
          className="absolute h-40 lg:h-56 xl:h-64 w-auto opacity-10 left-6 lg:left-16 top-1/2 -translate-y-1/2 z-0"
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
          className="bg-black/80 p-8 lg:p-12 xl:p-16 rounded-2xl text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold !text-white mb-6"
          >
            Dołącz do społeczności{" "}
            <span className="text-[#ffa920]">Pizzuj.pl</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-32 bg-[#ffa920] rounded-full mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`!text-white/90 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-10 ${ptSans.className}`}
          >
            Rozpocznij swoją przygodę z najlepszymi pizzeriami w Polsce.
            Odkrywaj, oceniaj i dziel się swoimi doświadczeniami kulinarnymi.
            <Link
              href="/register"
              className="text-yellow-400 hover:text-yellow-300 underline ml-1"
              aria-label="Dołącz do społeczności Pizzuj.pl"
            >
              Dołącz teraz
            </Link>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/pizza/warszawa"
                className="group bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg"
                aria-label="Znajdź najlepsze pizzerie w Warszawie"
              >
                <FaPizzaSlice className="text-[#ffa920] text-xl" />
                Znajdź pizzerie
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                className="group bg-[#ffa920] hover:bg-[#ec7308] !text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg"
                aria-label="Zarejestruj się w Pizzuj.pl"
              >
                <FaUserPlus className="text-xl" />
                Zarejestruj się
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-3xl mb-3"
                aria-label="Pizza"
              >
                🍕
              </motion.div>
              <h3 className="!text-white font-bold text-lg mb-2">Odkrywaj</h3>
              <p className="!text-white/80 text-sm uppercase font-cocosharp">
                Znajdź najlepsze pizzerie w swojej okolicy
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-3xl mb-3"
                aria-label="Gwiazdka"
              >
                ⭐
              </motion.div>
              <h3 className="!text-white font-bold text-lg mb-2">Oceniaj</h3>
              <p className="!text-white/80 text-sm uppercase font-cocosharp">
                Dziel się swoimi opiniami i doświadczeniami
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-3xl mb-3"
                aria-label="Ludzie"
              >
                👥
              </motion.div>
              <h3 className="!text-white font-bold text-lg mb-2">
                Społeczność
              </h3>
              <p className="!text-white/80 text-sm uppercase font-cocosharp">
                Połącz się z innymi miłośnikami pizzy
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
