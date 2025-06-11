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
        className={`flex items-center justify-center h-full transition-all duration-700 ${
          productsOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
        }`}
      >
        <div className="text-white text-4xl font-bold animate-pulse">
          Pizzuj.pl
        </div>
      </div>
    </div>
  );
}
