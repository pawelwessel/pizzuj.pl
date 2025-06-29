import { FaCrown } from "react-icons/fa";

export default function PioneerBadge() {
  return (
    <div className="mx-auto text-center sm:text-left flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 rounded-full shadow-lg">
      <FaCrown className="text-white" />
      <span className="text-sm sm:text-base text-white">Pionier Pizzuj.pl</span>
      <span className="text-sm sm:text-base font-sans text-green-800">
        Pierwsze 100 Członków
      </span>
    </div>
  );
}
