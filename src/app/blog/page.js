import Image from "next/image";
import Link from "next/link";
import pizza from "../../../public/assets/pizza.png";
export default function Page() {
  return (
    <div className="overflow-hidden">
      <div className="golden container !text-white mt-12 p-6 w-max mx-auto">
        <div className="  flex flex-col breadcrumbs">
          <ul className="flex items-center flex-wrap">
            <Image
              src={pizza}
              alt="Forum pizzy reklama lokali i pizzerii w miastach Polski"
              width={124}
              height={124}
              className="w-12 h-12 mr-2"
            />
            <li className="">
              <Link href={`/`} title="praca zdalna">
                pizza world!
              </Link>
            </li>

            <Image
              src={pizza}
              alt="Forum pizzy reklama lokali i pizzerii w miastach Polski"
              width={124}
              height={124}
              className="w-12 h-12 ml-2"
              style={{ transform: "scaleX(-1)" }}
            />
          </ul>
        </div>
      </div>{" "}
      <div className="">
        <h1 className="mt-24 text-xl lg:text-3xl font-bold text-center text-zinc-800 drop-shadow-xl shadow-black w-max max-w-[90%] lg:max-w-[77%] mx-auto">
          Forum pizzy i gastronomii, promowanie pizzerii w rankingach na mapie
          Polski to cel pizzuj.pl
        </h1>
        {/* <BlogPostList posts={posts} /> */}
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 mt-12 pb-6">
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold !text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title:
    "Blog o pizzy | Dołącz od sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
  description:
    "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl",
    title:
      "Blog o pizzy | Dołącz od sieci! Pizzuj.pl – najlepsze pizzerie w Polsce",
    description:
      "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
    siteName: "Pizzuj",
  },
  authors: [{ name: "pizzuj.pl", url: "https://pizzuj.pl" }],
  publisher: "wesiu.dev",
  keywords: "pizza, pizza warszawa najlepsza pizza w miescie",
  icons: [
    {
      url: "../../public/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "../../public/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "../../public/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "../../public/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};
