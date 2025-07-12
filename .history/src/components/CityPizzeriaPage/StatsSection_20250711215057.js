import { motion } from "framer-motion";
import Image from "next/image";

export default function StatsSection({ city, pizzerias }) {
  const stats = [
    {
      icon: "🍕",
      value: pizzerias?.length || 0,
      label: "Pizzerii w rankingu",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: "⭐",
      value: "4.8",
      label: "Średnia ocena",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: "🚚",
      value: "15-30",
      label: "Min. czas dostawy",
      color: "from-green-400 to-green-600",
    },
    {
      icon: "💰",
      value: "20-50",
      label: "Zł. średnia cena",
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full -translate-y-24 translate-x-24"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full translate-y-16 -translate-x-16"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
          >
            Statystyki pizzerii w {city}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Sprawdź najważniejsze informacje o pizzeriach w Twoim mieście
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pizza-themed image section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/newAssets/5.jpg"
                alt="Pizza being prepared"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Floating info card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Świeże składniki</p>
                  <p className="text-sm text-gray-600">Codziennie</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Dlaczego warto zamawiać przez nas?
            </h3>

            {[
              {
                icon: "🎯",
                title: "Sprawdzone pizzerie",
                description:
                  "Wszystkie pizzerie w naszym rankingu są weryfikowane i sprawdzone",
              },
              {
                icon: "⚡",
                title: "Szybka dostawa",
                description:
                  "Średni czas dostawy to 15-30 minut w większości miast",
              },
              {
                icon: "💳",
                title: "Bezpieczne płatności",
                description:
                  "Płać online lub gotówką przy odbiorze - wybór należy do Ciebie",
              },
              {
                icon: "📱",
                title: "Łatwe zamawianie",
                description:
                  "Intuicyjna aplikacja i strona internetowa do zamawiania",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-xl">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
