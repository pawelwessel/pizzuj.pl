import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export default function PopupHeader({ place, onClose }) {
  const photoUrl = place.photos?.[0]?.photo_reference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY}`
    : "/assets/pizza.png";

  return (
    <div className="relative h-72 lg:h-80 overflow-hidden">
      <h2 id="popup-title" className="sr-only">
        {place.name}
      </h2>
      <Image
        src={photoUrl}
        alt={`${place.name} - pizzeria w ${place.vicinity || "okolicy"}`}
        fill
        className="object-cover"
        aria-describedby="popup-title"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Zamknij popup"
        className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
      >
        <FaTimes className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
