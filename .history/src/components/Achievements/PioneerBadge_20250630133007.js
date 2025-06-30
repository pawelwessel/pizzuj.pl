import { FaCrown } from "react-icons/fa";

export default function PioneerBadge() {
  return (
    <div className="mx-auto text-center sm:text-left flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 rounded-full shadow-lg">
      <FaCrown className="text-black z-50 font-bold" />
      <span className="text-sm sm:text-base text-black z-50 font-bold">
        Pionier Pizzuj.pl
      </span>
      <span className="text-sm sm:text-base font-sans text-black z-50 font-bold">
        Pierwsze 100 Członków
      </span>
    </div>
  );
}
