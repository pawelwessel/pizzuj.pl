import { FaCrown } from "react-icons/fa";

export default function PioneerBadge() {
  return (
    <div className="text-center sm:text-left flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-full shadow-lg">
      <FaCrown className="text-green-200" />
      <span className="text-sm sm:text-base">Pionier Pizzuj.pl</span>
      <span className="text-sm sm:text-base opacity-80 font-sans">
        Pierwsze 100 Członków
      </span>
    </div>
  );
}
