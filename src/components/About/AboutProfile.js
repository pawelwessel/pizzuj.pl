"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCode, FaPizzaSlice, FaMapMarkerAlt } from "react-icons/fa";
import profileAccent from "../../../public/assets/asset4.png";
import { ptSans } from "../../app/layout";

export default function AboutProfile() {
  return (
    <div
      id="about-profile"
      className="py-16 lg:py-20 bg-white relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={profileAccent}
          alt="Dekoracyjny obrazek pizzy"
          className="absolute h-24 lg:h-32 xl:h-40 w-auto opacity-5 left-6 lg:left-16 top-1/2 -translate-y-1/2 z-0"
          width={200}
          height={200}
          aria-hidden="true"
        />
      </motion.div>
      <div className="relative z-10 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 font-gothic"
              >
                Cześć, jestem twórcą
                <span className="text-[#ffa920]"> Pizzuj.pl</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`text-gray-700 text-lg leading-relaxed mb-6 ${ptSans.className}`}
              >
                Jestem programistą z kilkuletnim doświadczeniem, ale moją
                prawdziwą pasją jest również pizza.
              </motion.p>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 aspect-square bg-[#ec7308] rounded-full flex items-center justify-center"
                  >
                    <FaCode className="!text-white text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-gothic">
                      Programista
                    </h3>
                    <p className="text-gray-700 text-sm font-cocosharp font-light">
                      Kilkuletnie doświadczenie w technologii
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 aspect-square bg-[#ec7308] rounded-full flex items-center justify-center"
                  >
                    <FaPizzaSlice className="!text-white text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-gothic">
                      Pasjonat pizzy
                    </h3>
                    <p className="text-gray-700 text-sm font-cocosharp font-light">
                      Specjalista ds. mięs i ciasta
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 aspect-square bg-[#ec7308] rounded-full flex items-center justify-center"
                  >
                    <FaMapMarkerAlt className="!text-white text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-gothic">
                      Tutti Santi, Grudziądz
                    </h3>
                    <p className="text-gray-700 text-sm font-cocosharp font-light">
                      Tam pogłębiłem zamiłowanie do sztuki pizzy
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-[#ec7308] to-[#d65d00] rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="w-56 h-56 lg:w-72 lg:h-72 bg-white rounded-full flex items-center justify-center">
                  <div
                    className="text-6xl lg:text-8xl"
                    aria-label="Programista"
                  >
                    👨‍💻
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#d65d00] rounded-full flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <FaPizzaSlice className="!text-white text-2xl" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
