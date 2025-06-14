import { FaCrown } from "react-icons/fa";

export default function PioneerBadge() {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-full shadow-lg">
      <FaCrown className="text-green-200" />
      <span className="font-medium">Pionier Pizzuj.pl</span>
      <span className="text-sm opacity-80 font-light font-sans">
        Pierwsze 100 Członków
      </span>
    </div>
  );
}
