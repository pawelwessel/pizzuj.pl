import Image from "next/image";
import { FaCode, FaPizzaSlice, FaMapMarkerAlt } from "react-icons/fa";
import profileAccent from "../../../public/assets/asset4.png";

export default function AboutProfile() {
  return (
    <div className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <Image
        src={profileAccent}
        alt="Pizza decoration"
        className="absolute h-24 lg:h-32 xl:h-40 w-auto opacity-5 left-6 lg:left-16 top-1/2 -translate-y-1/2 z-0"
        width={200}
        height={200}
      />
      <div className="relative z-10 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Cześć, jestem <span className="text-[#ffa920]">Paweł</span>!
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Jestem programistą z kilkuletnim doświadczeniem, ale moją
                prawdziwą pasją jest również pizza.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="min-w-12 h-12 bg-[#ffa920] rounded-full flex items-center justify-center">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Programista</h3>
                    <p className="text-gray-600 text-sm">
                      Kilkuletnie doświadczenie w technologii
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ec7308] rounded-full flex items-center justify-center">
                    <FaPizzaSlice className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Pasjonat pizzy
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Specjalista ds. mięs i ciasta
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ffa920] rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Tutti Santi, Grudziądz
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Tam pogłębiłem zamiłowanie do sztuki pizzy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-[#ffa920] to-[#ec7308] rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-56 h-56 lg:w-72 lg:h-72 bg-white rounded-full flex items-center justify-center">
                  <div className="text-6xl lg:text-8xl">👨‍💻</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#ec7308] rounded-full flex items-center justify-center shadow-lg">
                <FaPizzaSlice className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
