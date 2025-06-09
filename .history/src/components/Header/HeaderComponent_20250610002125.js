"use client";
import pizzuj from "../../../public/assets/pizzuj.png";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
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
      <div className="w-full h-[65px] lg:h-[84px]"></div>
      <div
        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className={`fixed left-0 top-0 z-[10000] px-4 bg-white flex flex-row items-center justify-center w-full ${
          showHeader || menuShow || hovered === "cat" || productsOpen
            ? "-translate-y-0"
            : "-translate-y-[100%]"
        } duration-300 `}
      >
        {/* Header Content */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className={`mr-1 w-max group lg:hidden`}>
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
                title="Menu z Pracą Zdalną"
                className={`${
                  (menuShow || productsOpen) && "opened"
                } flex items-center h-full w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-pointer font-bold`}
              >
                <svg width="65" height="65" viewBox="0 0 100 100">
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
            <Link
              title="Platforma internetowa pracy zdalnej Quixy"
              href="/"
              className="flex flex-col font-light"
            >
              <Image
                src={pizzuj}
                alt="Pizzuj opinie o pizzeriach Logo PNG"
                width={420}
                height={420}
                className="w-auto p-3 max-h-[100px] lg:max-h-[120px] lg:w-max"
              />
            </Link>
          </div>
          <div className="lg:flex items-center justify-center w-full hidden">
            <Link
              href="/blog"
              className="rounded-md group text-base drop-shadow-sm shadow-black text-black px-2 py-1 hover:text-yellow-500 relative"
            >
              Blog
            </Link>
            <Link
              href="/advertise"
              className="rounded-md text-base drop-shadow-sm shadow-black text-black px-2 py-1 hover:text-yellow-500 "
            >
              Reklama
            </Link>

            <Link
              href="/about"
              className="rounded-md text-base drop-shadow-sm shadow-black text-black px-2 py-1 hover:text-yellow-500 "
            >
              O Pizzuj
            </Link>
          </div>
          <Link
            href="/register"
            className={`text-nowrap py-3 px-6 text-lg text-center golden hover:scale-105 duration-200 rounded-md text-white cursor-pointer `}
          >
            <span className="drop-shadow-lg shadow-black">Zarejestruj się</span>
          </Link>
        </div>
      </div>
    </>
  );
}
