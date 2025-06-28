"use client";
import Link from "next/link";
import { FaFacebook, FaTiktok } from "react-icons/fa6";

export default function ProductsWide({
  width,
  hovered,
  handleMouseEnter,
  handleMouseLeave,
  secondMenuItems,
  setProductsOpen,
}) {
  function resetHeader() {
    handleMouseLeave();
  }
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("cat");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[9999] fixed w-full max-h-[80vh] overflow-y-scroll top-0 left-0 bg-white shadow-black ${
        hovered === "cat"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:grid shadow-sm`}
    >
      <div className="relative mt-12">
        <div className={` flex flex-col font-extrabold`}>
          <Link
            href={`/praca-zdalna`}
            title={`Praca Zdalna `}
            className={`border-2 border-white text-center rounded-lg flex flex-col bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd hover:scale-105 duration-100`}
            onClick={resetHeader}
          >
            <span
              style={{ textShadow: "2px 2px 5px gray" }}
              className="!text-white text-xl p-2"
            >
              asdb
            </span>
          </Link>
        </div>
        <div className="py-12 mt-12 relative flex flex-col px-12 ">
          <div className="flex items-center flex-wrap gap-4">
            <Link
              title="Zobacz TikTok Quixy - Biznes, Pomysły, Rady"
              target="_blank"
              href="https://www.tiktok.com/@biznespomysly"
              className="flex items-center"
            >
              <FaTiktok className="text-2xl !text-white" />
            </Link>
            <Link
              title="Zobacz Facebook Quixy - Biznes, Pomysły, Rady"
              href="https://www.facebook.com/profile.php?id=61561855721397"
              target="_blank"
              className="flex items-center"
            >
              <FaFacebook className="text-2xl !text-white" />
            </Link>
            <Link
              title="Zobacz Zakładkę Praca Zdalna"
              href="/praca-zdalna"
              target="_blank"
              className="ml-3 !text-white text-lg"
            >
              /praca-zdalna
            </Link>
          </div>
          <div className="mt-6 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-max">
            {secondMenuItems.map((item, i) => (
              <article key={i} className="w-full justify-between">
                {item && (
                  <Link
                    title={`Wypróbuj ${item.urlLabel}`}
                    aria-label={item.urlLabel}
                    href={item.url}
                    className={`hover:underline border-2 border-white py-4 !text-white rounded-lg bg-gradient-to-b from-primaryStart to-primaryEnd hover:from-accentStart hover:to-accentEnd group w-full font-bold relative overflow-hidden flex items-center justify-center gap-3`}
                  >
                    <div className="flex relative z-[201]">
                      <item.icon className="drop-shadow-sm shadow-black text-4xl" />
                    </div>
                    <h4 className="font-extrabold drop-shadow-xl shadow-black z-[202] text-base xl:text-lg 2xl:text-xl">
                      {item.urlLabel}
                    </h4>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
