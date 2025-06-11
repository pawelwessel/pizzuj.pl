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
    <div className="h-screen bg-black flex items-center justify-center fixed left-0 top-0 w-full z-50">
      <div className="text-white text-4xl font-bold">Pizza</div>
    </div>
  );
}
