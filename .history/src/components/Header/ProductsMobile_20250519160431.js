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
    <div className="">
      <div
        className={`fixed w-screen h-full overflow-y-scroll left-0 bg-white xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          productsOpen ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        } scrollbar lg:hidden`}
      >
        <div className="bg-white px-3 mt-3 gap-1.5 grid grid-cols-2 mx-auto">
          <Link
            onClick={resetHeader}
            href="/praca-zdalna"
            className="bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white p-2 text-center text-sm rounded"
          >
            Home
          </Link>
          <Link
            onClick={resetHeader}
            href="/marketplace"
            className="bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white p-2 text-center text-sm rounded"
          >
            Marketplace
          </Link>
          <Link
            onClick={resetHeader}
            href="/contact"
            className="bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white p-2 text-center text-sm rounded"
          >
            Kontakt
          </Link>
          <Link
            onClick={resetHeader}
            href="/praca-zdalna"
            className="bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white p-2 text-center text-sm rounded"
          >
            Praca Zdalna
          </Link>
          <Link
            onClick={resetHeader}
            href="/news"
            className="bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white p-2 text-center text-sm rounded"
          >
            Newsy
          </Link>
          <Link
            onClick={resetHeader}
            href="/about"
            className="bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white p-2 text-center text-sm rounded"
          >
            O nas
          </Link>
        </div>
        <div className="bg-white px-3 my-6">
          <h2 className="text-xl font-extrabold text-black pb-3">
            Chcesz wyświetlać swoje usługi w naszej aplikacji?
          </h2>
          <p className="text-black pb-3">
            Skonfiguruj konto aby rozpocząć poszukiwanie zleceń.
          </p>
          <div className="flex items-center">
            <Link
              onClick={resetHeader}
              href="/register"
              className=" text-white px-3 py-2 text-sm  from-ctaStart to-ctaEnd rounded-md"
            >
              Skonfiguruj konto
            </Link>
          </div>
        </div>
        <div className="w-full py-4 px-3 sm:px-5 flex items-center justify-between z-[200] sticky top-0 left-0 bg-gradient-to-b from-primaryHoverStart to-primaryEnd drop-shadow-lg shadow-zinc-800">
          <div className="flex flex-col">
            <p className="font-extralight text-white">
              Szukasz freelancera, firmy, pracy lub zleceń?
            </p>
            <h2 className="text-white sm:text-lg font-extrabold">
              Przeglądaj tablice ofert
            </h2>
          </div>
          <button
            onClick={() => {
              setMenuShow(true);
              setProductsOpen(false);
            }}
            className="rounded-md text-white px-4 py-2 bg-gradient-to-b from-ctaStart to-ctaEnd text-sm"
          >
            WIĘCEJ
          </button>
        </div>
        <div className="grid grid-cols-1 w-full">
          <div className="relative px-3">
            <div className={`flex items-center justify-between w-full text-xl`}>
              <Link
                href={`/praca-zdalna/`}
                onClick={resetHeader}
                title={`Przejdź do ofert pracy `}
              >
                <h4
                  title={`Pracuj zdalnie w`}
                  className={`mx-auto font-extrabold text-gray-800 rounded-md w-max`}
                >
                  fwqfqwfqw
                </h4>
              </Link>
            </div>

            {/* Hover dropdown */}
          </div>
        </div>
      </div>
      <div
        className={`fixed w-screen h-screen overflow-y-scroll top-[0px] left-0 bg-white xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          menuShow ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        }  pb-7 scrollbar xl:hidden`}
      >
        <div className="w-full sticky top-0 left-0 py-4 px-3 sm:px-5 flex items-center justify-between z-[203]  from-primaryStart to-primaryEnd">
          <div className="flex flex-col">
            <p className="font-extralight text-white">
              Chcesz wypróbować Quixy?
            </p>
            <h2 className="text-white font-extrabold pr-12">
              Opublikuj ogłoszenie lub nową usługę na rynku
            </h2>
          </div>
          <button
            onClick={() => {
              setMenuShow(false);
              setProductsOpen(false);
            }}
            className="text-black px-4 py-2 rounded-md bg-white"
          >
            WYJŚCIE
          </button>
        </div>
        <div className="relative flex flex-col justify-center">
          <div className="grid gap-1.5 h-max p-3">
            {secondMenuItems.map((item, i) => (
              <article key={i} className="w-full justify-between">
                {item && (
                  <Link
                    title={`Wypróbuj Quixy Talent™: ${item.urlLabel}`}
                    aria-label={`Link to ${item.urlLabel}`}
                    href={item.url}
                    className={`p-4 rounded-lg  from-primaryStart to-primaryEnd min-h-[100px] group w-full font-bold text-sm sm:text-lg relative overflow-hidden flex items-center justify-center`}
                  >
                    <div className="flex relative z-[201]">
                      <item.icon className="text-white group-hover:text-white drop-shadow-sm shadow-black text-4xl" />
                    </div>
                    <h4 className="text-white bg-opacity-50 px-2 font-extrabold drop-shadow-xl shadow-black z-[202] py-2 text-lg sm:text-xl">
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
