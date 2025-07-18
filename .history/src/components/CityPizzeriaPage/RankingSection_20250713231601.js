"use client";
import { motion } from "framer-motion";
import ArrayWithPlaces from "../ArrayWithPlaces";

export default function RankingSection({ city, pizzerias, content }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      id="ranking-section"
      className="flex flex-col gap-6 bg-gradient-to-br from-yellow-400 to-orange-500 p-6 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-50"
      >
        <div className="w-max p-4 rounded-xl absolute top-0 -translate-y-[10%] left-1/2 -translate-x-1/2 bg-white text-black border-4 border-yellow-400 shadow-lg">
          <span className="text-lg font-bold">🏆 Ranking pizzerii</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="p-8 pt-20 text-center bg-white rounded-xl shadow-2xl relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-sans font-bold text-2xl lg:text-4xl mb-4"
        >
          {content.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-gotham !text-gray-700 mt-4 text-center font-sans text-lg"
        >
          {content.subtitle}
        </motion.p>

        {/* Pizza-themed decorative image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-32 h-32 mx-auto mt-6 mb-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
        >
          <span className="text-6xl">🍕</span>
        </motion.div>

        {/* Content based on data availability */}
        {pizzerias && pizzerias.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8"
          >
            <ArrayWithPlaces placesData={pizzerias} />

            {pizzerias.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <button className="font-cocosharp font-light uppercase bg-yellow-400 text-black py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors shadow-lg">
                  {content.showAllButton} ({pizzerias.length})
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
