"use client";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../lib/useWidth";
import dynamic from "next/dynamic";
const ProductsWide = dynamic(() => import("./ProductsWide"), { ssr: false });
const ProductsMobile = dynamic(() => import("./ProductsMobile"), {
  ssr: false,
});
const HeaderComponent = dynamic(() => import("./HeaderComponent"), {
  ssr: false,
});
import { AiFillThunderbolt, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineDesignServices } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaStore } from "react-icons/fa6";
import { usePathname } from "next/navigation";
export default function Header() {
  const { width } = useWindowDimensions();
  const [hovered, setHovered] = useState("");
  const [productsOpen, setProductsOpen] = useState(false);
  const handleMouseEnter = (target) => {
    setHovered(target);
  };
  const handleMouseLeave = () => {
    setHovered("");
  };

  const [menuShow, setMenuShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const scrollListener = () => {
      const currentScrollPosition = window.scrollY;
      const isScrolledDown = previousScrollPosition < currentScrollPosition;
      previousScrollPosition = currentScrollPosition;

      setShowHeader(
        isScrolledDown && currentScrollPosition > 100 ? false : true
      );
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  const pathname = usePathname();
  return (
    <div className={`${pathname.includes("user") && "hidden"}`}>
      <ProductsWide
        width={width}
        setProductsOpen={setProductsOpen}
        hovered={hovered}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        secondMenuItems={secondMenuItems}
      />
      {/* PRODUCTS TAB OPENED MOBILE */}
      <ProductsMobile
        menuShow={menuShow}
        setProductsOpen={setProductsOpen}
        setMenuShow={setMenuShow}
        productsOpen={productsOpen}
        setHovered={setHovered}
        secondMenuItems={secondMenuItems}
      />
      {/* HEADER */}
      <HeaderComponent
        showHeader={showHeader}
        menuShow={menuShow}
        hovered={hovered}
        productsOpen={productsOpen}
        setProductsOpen={setProductsOpen}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        width={width}
        setMenuShow={setMenuShow}
        setHovered={setHovered}
      />
    </div>
  );
}
const secondMenuItems = [
  {
    urlLabel: "Rejestracja",
    url: "/register",
    color: "#14A800",
    icon: AiOutlineLogin,
  },
  {
    urlLabel: "Freelancerzy",
    url: "/praca-zdalna",
    color: "blue",
    icon: FiUsers,
  },
  {
    urlLabel: "Praca zdalna",
    url: "/praca-zdalna",
    color: "#F59BBB",
    icon: AiFillThunderbolt,
  },
  {
    urlLabel: "Marketplace",
    url: "/marketplace",
    color: "#468CA9",
    icon: FaStore,
  },
  {
    urlLabel: "Kreator Portfolio",
    url: "/register",
    color: "blue",
    icon: MdOutlineDesignServices,
  },
];
