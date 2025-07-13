"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ptSans } from "../../app/layout";

export default function AboutHero() {
  return (
    <div className="overflow-hidden relative min-h-[60vh] w-full golden pt-12 lg:pt-24 pb-12">
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
            alt="Ludzie cieszący się pizzą"
            fill
            className="object-cover rounded-full"
            aria-hidden="true"
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
            alt="Pyszna pizza serwowana"
            fill
            className="object-cover rounded-full"
            aria-hidden="true"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-48 lg:h-48 opacity-15"
        >
          <Image
            src="/newAssets/3.jpg"
            alt="Przygotowanie pizzy"
            fill
            className="object-cover rounded-full"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-60 z-10"
        aria-hidden="true"
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
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-60 z-10"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-40 z-10"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-50 mx-auto w-[90%] lg:w-2/3 xl:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center bg-black/70 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-yellow-400/20 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 transform hover:scale-[1.02]"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="!text-white text-2xl lg:text-4xl xl:text-5xl drop-shadow-lg shadow-black font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            O Pizzuj.pl
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-24 golden rounded-full mb-6 animate-pulse"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`mt-4 lg:mt-6 w-[90%] mx-auto !text-white drop-shadow-lg font-sans text-base sm:text-lg lg:text-xl italic font-light ${ptSans.className}`}
          >
            Połączenie technologii i pasji do pizzy - poznaj historię{" "}
            <Link
              href="/about"
              className="text-yellow-400 hover:text-yellow-300 underline"
              aria-label="Dowiedz się więcej o Pizzuj.pl"
            >
              Pizzuj.pl
            </Link>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-4 mx-auto w-max max-w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-yellow-400 font-cocosharp text-zinc-800 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
              onClick={() => {
                const profileSection = document.getElementById("about-profile");
                if (profileSection) {
                  profileSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              aria-label="Przejdź do sekcji o nas"
            >
              🍕 Poznaj naszą historię
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 font-cocosharp border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors"
              aria-label="Skontaktuj się z nami"
            >
              📞 Skontaktuj się
            </motion.button>
          </motion.div>

          {/* Subtle scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-col items-center"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2" />
            </motion.div>
            <span className="text-yellow-400/70 text-sm mt-2">Scroll</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
