import Link from "next/link";
export default function ProductsMobile({
  productsOpen,
  setProductsOpen,
  setMenuShow,
  menuShow,
  setHovered,
  secondMenuItems,
  closeMobileMenu,
}) {
  return (
    <div
      className={`h-screen bg-black/90 backdrop-blur-sm fixed left-0 top-0 w-full z-[101] transition-all duration-500 ease-in-out ${
        productsOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full"
      }`}
    >
      <div
        className={`flex flex-col px-12 justify-center h-full transition-all duration-700 ${
          productsOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
        }`}
      >
        <h2 className="text-[#ffa920] text-2xl font-bold mb-3">
          Szybkie Linki
        </h2>
        <div className="font-cocosharp flex flex-col gap-3">
          <Link
            onClick={closeMobileMenu}
            href="/"
            className="!text-white text-base hover:text-yellow-500"
          >
            Strona główna
          </Link>
          <Link
            onClick={closeMobileMenu}
            href="/advertise"
            className="!text-white text-base hover:text-yellow-500"
          >
            Pakiety premium
          </Link>
          <Link
            onClick={closeMobileMenu}
            href="/terms"
            className="!text-white text-base hover:text-yellow-500"
          >
            Regulamin
          </Link>
          <Link
            onClick={closeMobileMenu}
            href="/blog"
            className="!text-white text-base hover:text-yellow-500"
          >
            Blog
          </Link>
          <Link
            onClick={closeMobileMenu}
            href="/food-cost-calculator"
            className="!text-white text-base hover:text-yellow-500"
          >
            Kalkulator kosztów
          </Link>
          <h2 className="text-[#ffa920] text-2xl font-bold mb-3 mt-12">
            Informacje
          </h2>
          <Link
            onClick={closeMobileMenu}
            href="/privacy"
            className="!text-white text-base hover:text-yellow-500"
          >
            Polityka prywatności
          </Link>
          <Link
            onClick={closeMobileMenu}
            href="https://www.facebook.com/pizzuj"
            target="_blank"
            className="!text-white text-base hover:text-yellow-500"
          >
            Facebook
          </Link>
          <Link
            onClick={closeMobileMenu}
            href="/about"
            className="!text-white text-base hover:text-yellow-500"
          >
            O nas
          </Link>
        </div>
      </div>
    </div>
  );
}
