import Link from "next/link";
export default function ProductsMobile({
  productsOpen,
  setProductsOpen,
  setMenuShow,

  menuShow,
  setHovered,
  secondMenuItems,
}) {
  function resetHeader() {
    setMenuShow(false);
    setProductsOpen(false);
    setHovered("");
  }
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
        <h2 className="text-[#ffa920] text-2xl font-bold mb-3">Linki</h2>
        <div className="flex flex-col gap-3">
          <Link href="/" className="text-white text-base hover:text-yellow-500">
            Strona główna
          </Link>
          <Link href="/" className="text-white text-base hover:text-yellow-500">
            Cennik
          </Link>
          <Link href="/" className="text-white text-base hover:text-yellow-500">
            Regulamin
          </Link>
          <Link href="/" className="text-white text-base hover:text-yellow-500">
            Blog
          </Link>
          <h2 className="text-[#ffa920] text-2xl font-bold mb-3 mt-6">
            Więcej linków
          </h2>
          <Link href="/" className="text-white text-base hover:text-yellow-500">
            Polityka prywatności
          </Link>
          <Link
            href="https://www.facebook.com/pizzuj"
            className="text-white text-base hover:text-yellow-500"
          >
            Facebook
          </Link>

          <Link
            href="/about"
            className="text-white text-base hover:text-yellow-500"
          >
            O nas
          </Link>
        </div>
      </div>
    </div>
  );
}
