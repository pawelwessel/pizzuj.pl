import Image from "next/image";
import Link from "next/link";
import pizzuj from "../../public/assets/pizzuj2.png";
import { createLinkFromText } from "../lib/createLinkFromText";
import { ShinyAffiliateInvite } from "./ShinyAffiliateInvite";

export const Footer = () => {
  const links = [
    {
      title: "Pakiety premium",
      href: "/advertise",
    },
    {
      title: "Regulamin",
      href: "/terms",
    },
    { title: "Blog", href: "/blog" },
  ];

  const links2 = [
    {
      title: "Polityka prywatności",
      href: "/privacy",
    },
    {
      title: "Facebook",
      href: "https://www.facebook.com/pizzuj",
    },
    { title: "O nas", href: "/about" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 !text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-8 left-8 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-primary-400 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary-600 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
            {/* Company info section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="group">
                <Image
                  src={pizzuj}
                  alt="Pizzuj.pl Logo"
                  width={150}
                  height={50}
                  className="w-[200px] lg:w-[250px] transition-all duration-300 group-hover:brightness-110"
                />
              </div>

              <p className="font-body !text-gray-300 text-base lg:text-lg leading-relaxed max-w-md">
                Najlepsza platforma do znajdowania i oceniania pizzerii w
                Polsce. Dołącz do społeczności miłośników pizzy!
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+48721417154"
                  className="group flex items-center gap-3 !text-gray-300 hover:text-primary-300 transition-colors duration-200"
                >
                  <span className="text-primary-400 group-hover:text-primary-300">
                    📞
                  </span>
                  <span className="font-body">+48 721 417 154</span>
                </a>
                <a
                  href="mailto:wesiudev@gmail.com"
                  className="group flex items-center gap-3 !text-gray-300 hover:text-primary-300 transition-colors duration-200"
                >
                  <span className="text-primary-400 group-hover:text-primary-300">
                    ✉️
                  </span>
                  <span className="font-body">wesiudev@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="font-heading text-primary-400 text-xl lg:text-2xl font-semibold">
                Szybkie linki
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group relative inline-block font-body !text-gray-300 hover:!text-white transition-all duration-300"
                    >
                      <span className="relative z-10">{link.title}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-500 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links */}
            <div className="space-y-6">
              <h3 className="font-heading text-primary-400 text-xl lg:text-2xl font-semibold">
                Informacje
              </h3>
              <ul className="space-y-3">
                {links2.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group relative inline-block font-body !text-gray-300 hover:!text-white transition-all duration-300"
                      {...(link.href.startsWith("http") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      <span className="relative z-10">{link.title}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-500 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom section */}
          <div className="pt-8 border-t border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-body !text-gray-400 text-sm lg:text-base">
                  &copy; 2025 Pizzuj.pl - Wszelkie prawa zastrzeżone
                </p>
                <p className="font-body !text-gray-500 text-xs lg:text-sm mt-1">
                  Stworzone z ❤️ dla miłośników pizzy
                </p>
              </div>

              {/* Social links or additional info */}
              <div className="flex items-center gap-4">
                <div className="text-gray-500 text-xs lg:text-sm font-body">
                  Śledź nas:
                </div>
                <Link
                  href="https://www.facebook.com/pizzuj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <span className="!text-gray-300 group-hover:!text-white text-lg">
                    f
                  </span>
                </Link>
                <Link
                  href="https://www.tiktok.com/@pizzuj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <span className="!text-gray-300 group-hover:!text-white text-lg">
                    t
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ShinyAffiliateInvite />
      </div>
    </footer>
  );
};
