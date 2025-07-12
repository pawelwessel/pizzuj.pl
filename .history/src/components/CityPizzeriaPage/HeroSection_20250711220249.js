"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ptSans } from "../../app/layout";

export default function HeroSection({ city, content }) {
  return (
    <div className="overflow-hidden relative min-h-[50vh] w-full golden pt-12 lg:pt-24 pb-12">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 opacity-20"
        >
          <Image
            src="/newAssets/1.jpg"
            alt="Pizza lovers enjoying food"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-48 h-48 lg:w-64 lg:h-64 opacity-20"
        >
          <Image
            src="/newAssets/2.jpg"
            alt="Delicious pizza being served"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-60 z-10"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-40 right-20 w-6 h-6 bg-red-400 rounded-full opacity-60 z-10"
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-60 z-10"
      />

      {/* Main Content */}
      <div className="relative z-50 mx-auto w-[90%] lg:w-2/3 xl:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center bg-black/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="!text-white text-2xl lg:text-4xl xl:text-5xl drop-shadow-lg shadow-black font-bold mb-4"
          >
            {content.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`mt-4 lg:mt-6 w-[90%] mx-auto !text-white drop-shadow-lg font-sans text-base sm:text-lg lg:text-xl ${ptSans.className}`}
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-8 mx-auto w-max max-w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
            >
              {content.ctaPrimary}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors"
            >
              {content.ctaSecondary}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
