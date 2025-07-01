import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

export default function WarsawSectionCTA() {
  return (
    <div className="relative z-10 text-center mt-12 lg:mt-16">
      <Link
        href="/pizza"
        className="inline-flex items-center gap-3 px-8 lg:px-10 py-4 lg:py-5 bg-white text-primary-600 hover:text-primary-700 font-heading font-semibold text-lg lg:text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-large hover:shadow-xl group"
      >
        <span>Zobacz wszystkie pizzerie</span>
        <FaLocationArrow className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}