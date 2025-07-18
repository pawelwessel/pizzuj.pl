"use client";
import { motion } from "framer-motion";

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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pizzerias.slice(0, 6).map((pizzeria, index) => (
                <motion.div
                  key={pizzeria.place_id || index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-lg">{pizzeria.name}</h3>
                    </div>
                    {(pizzeria.rating ||
                      (pizzeria.details && pizzeria.details.rating)) && (
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-semibold">
                          {pizzeria.rating || pizzeria.details.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {(pizzeria.vicinity || pizzeria.address) && (
                    <p className="text-gray-600 text-sm mb-3">
                      📍 {pizzeria.vicinity || pizzeria.address}
                    </p>
                  )}

                  {(pizzeria.opening_hours ||
                    (pizzeria.details && pizzeria.details.opening_hours)) && (
                    <p className="text-sm mb-3">
                      {(
                        pizzeria.opening_hours || pizzeria.details.opening_hours
                      ).open_now ? (
                        <span className="text-green-600 font-semibold">
                          🟢 Otwarte
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          🔴 Zamknięte
                        </span>
                      )}
                    </p>
                  )}

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors text-sm">
                      🍕 Zamów
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      📞 Zadzwoń
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {pizzerias.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors shadow-lg">
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
