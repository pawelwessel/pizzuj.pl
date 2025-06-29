import { FaCrown } from "react-icons/fa";

export default function PioneerBadge() {
  return (
    <div className="mx-auto text-center sm:text-left flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 rounded-full shadow-lg">
      <FaCrown className="text-[#ffa920]" />
      <span className="text-sm sm:text-base text-[#ffa920]">
        Pionier Pizzuj.pl
      </span>
      <span className="text-sm sm:text-base opacity-80 font-sans text-gray-300">
        Pierwsze 100 Członków
      </span>
    </div>
  );
}
