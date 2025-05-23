"use client";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";

export default function ProductsWide({
  width,
  setHovered,
  hovered,
  handleMouseEnter,
  handleMouseLeave,
  secondMenuItems,
}) {
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("talent");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[210] fixed grid-cols-2 w-full max-h-[80vh] overflow-y-scroll top-0 left-0 bg-white xl:space-x-3 font-semibold shadow-black ${
        hovered === "talent"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:grid pl-4 md:pl-8 lg:pl-12 xl:pl-20 2xl:pl-32 border-y border-gray-300 shadow-sm`}
    >
      <div className="flex flex-col relative z-[500]">
        <h2 className="text-black drop-shadow-xl shadow-black font-bold text-xl xl:text-2xl text-left pt-8">
          z Quixy znajdziesz pracę
        </h2>
        <div className="-ml-3 flex flex-wrap pb-8 pt-4">
          <div className="mt-3 ml-3 w-[300px] flex flex-col">
            <Link
              href={`/praca-zdalna/`}
              title={`Pracuj zdalnie w `}
              style={{ boxShadow: "0px 0px 4px black" }}
              className={`text-lg mt-3 font-bold p-1 px-3  text-white bg-[#126b91] w-max`}
              key={i}
              onClick={() => setHovered(false)}
            >
              <h2>asdb</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 2xl:grid-cols-3 h-max gap-3 2xl:gap-4 mt-3 2xl:mt-4">
          {secondMenuItems.map((item, i) => (
            <article key={i} className="w-full">
              {item && (
                <Link
                  title={`Wypróbuj Quixy Talent™: ${item.urlLabel}`}
                  aria-label={`Link to ${item.urlLabel}`}
                  href={item.url}
                  className={`aspect-square  group w-full h-max text-white font-bold text-sm sm:text-lg text-center relative overflow-hidden flex flex-col items-center justify-center`}
                  style={{
                    backgroundColor: item.color,
                    boxShadow: "0px 0px 3px rgb(0, 0, 0)",
                  }}
                >
                  <div className="bg-black bg-opacity-50 duration-500 absolute top-0 left-0 w-full h-full z-[200]"></div>
                  <div className="absolute w-full h-full left-0 top-0 z-[50] opacity-100 hover:opacity-0 duration-300" />
                  <div className="mx-auto my-auto h-full w-full flex items-center justify-center relative z-[201]">
                    <div
                      className="group-hover:scale-90 duration-300 flex items-center justify-center w-[40%] p-[10%] rounded-full bg-opacity-50"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: "0px 0px 5px black",
                      }}
                    >
                      <item.icon className="text-white drop-shadow-sm shadow-black w-full h-auto" />
                    </div>
                  </div>
                  <h4 className="bg-black bg-opacity-50 font-gotham text-white font-bold sticky bottom-0 left-0 w-full drop-shadow-xl shadow-black z-[202] text-xs sm:text-sm 2xl:text-base py-2">
                    {item.urlLabel}
                  </h4>
                </Link>
              )}
            </article>
          ))}
        </div>
        {/* <div className="flex flex-col py-4">
          <h3 className="text-2xl text-black ">Sprawdź nasze Social Media</h3>
          <div className="flex items-center flex-wrap -ml-3 mt-3">
            <Link
              title="Zobacz TikTok Quixy - Biznes, Pomysły, Rady"
              href="#tiktok"
              className="flex items-center mt-3 ml-3"
            >
              <div
                style={{ boxShadow: "2px 2px 3px black" }}
                className="p-3 rounded-full bg-[#126b91]"
              >
                <FaTiktok className="text-xl text-white" />
              </div>
              <p className="text-xl ml-1 text-black">TikTok</p>
            </Link>
            <Link
              title="Zobacz Facebook Quixy - Biznes, Pomysły, Rady"
              href="#facebook"
              className="flex items-center mt-3 ml-3"
            >
              <div
                style={{ boxShadow: "2px 2px 3px black" }}
                className="p-3 rounded-full bg-[#126b91]"
              >
                <FaFacebook className="text-xl text-white" />
              </div>
              <p className="text-xl ml-1 text-black">Facebook</p>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
