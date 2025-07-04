import { FaCrown } from "react-icons/fa";

export default function PioneerBadge() {
  return (
    <div className="mx-auto text-center sm:text-left flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 rounded-full">
      <div className="min-w-12 aspect-square bg-white rounded-full flex items-center justify-center">
        <FaCrown className="text-[#ffa920] z-50 text-3xl" />
      </div>
      <span className="text-sm sm:text-base text-white z-50 font-bold font-cocosharp-italic">
        Pionier Pizzuj.pl
      </span>
      <span className="text-sm sm:text-base text-gray-300 z-50 font-cocosharp-italic">
        (Pierwszych 100 Członków)
      </span>
    </div>
  );
}
