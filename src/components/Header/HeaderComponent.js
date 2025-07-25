"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/pizzuj.png";
export default function HeaderComponent({
  showHeader,
  menuShow,
  hovered,
  productsOpen,
  setProductsOpen,
  handleMouseEnter,
  handleMouseLeave,
  width,
  setMenuShow,
  setHovered,
}) {
  return (
    <>
      <div className="w-full h-[70px] lg:h-[90px]"></div>
      <header
        className={`fixed left-0 top-0 z-[10000] px-4 lg:px-8 bg-white flex flex-row items-center justify-center w-full border-b border-gray-200 shadow-medium ${
          showHeader || menuShow || hovered === "cat" || productsOpen
            ? "-translate-y-0"
            : "-translate-y-[100%]"
        } transition-transform duration-500 ease-out`}
      >
        {/* Header Content */}
        <div className="flex w-full items-center justify-between py-3">
          {/* Mobile Menu & Logo Section */}
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="min-w-42 h-auto"
            />
          </Link>
          <div className="lg:hidden w-full flex items-center gap-2">
            {/* Enhanced Mobile Menu Button */}
            <div className={`lg:hidden`}>
              <button
                onClick={() => {
                  if (!menuShow) {
                    if (productsOpen) {
                      setProductsOpen(false);
                    } else {
                      setProductsOpen(true);
                    }
                  } else {
                    setProductsOpen(false);
                    setMenuShow(false);
                  }
                }}
                title="Menu nawigacji"
                className={`${
                  (menuShow || productsOpen) && "opened"
                } flex items-center justify-center h-12 w-12 rounded-xl hover:bg-primary-50 transition-all duration-200 cursor-pointer group`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 100 100"
                  className="group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="font-gotham w-full text-nowrap text-lg lg:flex flex-wrap items-center justify-center gap-8 hidden pr-12">
            <Link
              href="/reklama-dla-pizzerii"
              className="relative px-4 py-2 rounded-xl font-medium text-black hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group w-max !not-italic"
            >
              <span className="relative z-10">Reklama pizzerii</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/food-cost-calculator"
              className="relative px-4 py-2 rounded-xl font-medium text-black hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group w-max !not-italic"
            >
              <span className="relative z-10">Kalkulator kosztów</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/affiliate"
              className="relative px-4 py-2 rounded-xl font-medium text-black hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group w-max !not-italic"
            >
              <span className="relative z-10">System zaproszeń</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/about"
              className="relative px-4 py-2 rounded-xl font-medium text-black hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group w-max !not-italic"
            >
              <span className="relative z-10">O nas</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/blog"
              className="relative px-4 py-2 rounded-xl font-medium text-black hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group w-max !not-italic"
            >
              <span className="relative z-10">Blog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </Link>
          </nav>

          {/* Enhanced CTA Button */}
          <Link
            href="/login"
            className={`w-max group relative inline-flex items-center justify-center text-nowrap py-3 px-6 lg:px-8 text-base lg:text-lg font-cocosharp text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-700 hover:to-green-700 !text-white rounded-xl transition-all duration-300 ease-out transform hover:scale-105 shadow-golden hover:shadow-golden-lg`}
          >
            <span className="relative z-10 drop-shadow-sm">ZALOGUJ</span>
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></div>
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl pointer-events-none"></div>
          </Link>
        </div>
      </header>
    </>
  );
}
