import Image from "next/image";
import Link from "next/link";
import pizzuj from "../../public/assets/pizzuj2.png";
import { createLinkFromText } from "../lib/createLinkFromText";

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
    <footer className="relative mt-10 bg-gradient-to-br from-[#2a2a2a] via-[#313131] to-[#1f1f1f] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#ffa920] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#ec7308] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#ffa920] blur-3xl opacity-30"></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 px-6 md:px-12 py-16">
        {/* Top decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ffa920] to-transparent mb-12"></div>
        
        <div className="flex flex-wrap gap-8 justify-between items-start">
          {/* Company info section */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Image
                src={pizzuj}
                alt="Pizzuj.pl Logo"
                width={150}
                height={50}
                className="w-[200px] drop-shadow-lg"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-[#ffa920] rounded-full group-hover:animate-pulse"></div>
                <p className="text-white font-light text-sm hover:text-[#ffa920] transition-colors duration-300">
                  +48 721 417 154
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-[#ffa920] rounded-full group-hover:animate-pulse"></div>
                <p className="text-white font-light text-sm hover:text-[#ffa920] transition-colors duration-300">
                  wesiudev@gmail.com
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-black/20 rounded-lg border border-[#ffa920]/20 backdrop-blur-sm">
              <p className="uppercase text-white text-sm font-medium">
                &copy; 2025 Pizzuj.pl
              </p>
              <p className="text-gray-300 text-xs mt-1">
                Wszelkie prawa zastrzeżone
              </p>
            </div>
          </div>

          {/* Links sections */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            {/* First links column */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <h3 className="text-[#ffa920] text-2xl font-bold relative">
                Linki
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#ffa920] to-[#ec7308] rounded-full"></div>
              </h3>
              <nav className="space-y-2 mt-4">
                {links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex items-center text-white font-light font-sans py-2 px-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#ffa920]/10 hover:text-[#ffa920] hover:pl-6"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Second links column */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <h3 className="text-[#ffa920] text-2xl font-bold relative">
                Więcej linków
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#ffa920] to-[#ec7308] rounded-full"></div>
              </h3>
              <nav className="space-y-2 mt-4">
                {links2.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex items-center text-white font-light font-sans py-2 px-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#ffa920]/10 hover:text-[#ffa920] hover:pl-6"
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    {link.title}
                    {link.href.startsWith('http') && (
                      <span className="ml-2 text-xs opacity-50">↗</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-[#ffa920]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Najlepsza pizza w Twojej okolicy
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ffa920] rounded-full animate-pulse"></div>
              <p className="text-gray-400 text-sm">
                Stworzone z ❤️ dla miłośników pizzy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#ec7308] via-[#ffa920] to-[#ec7308]"></div>
    </footer>
  );
};
