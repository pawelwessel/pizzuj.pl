import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="golden px-6 sm:px-12 lg:px-24 pb-12">
      <div className="text-white h-[40vh] items-center flex justify-center text-center">
        <h1 className="bg-white text-[#ffa920] p-6 max-w-[90%] text-xl lg:text-3xl drop-shadow-lg shadow-black">
          Hej, a może... Pizzuj.pl!
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-12 golden">
        <div className="bg-white flex flex-col px-6 py-6 drop-shadow-2xl shadow-black">
          <h2 className="text-xl lg:text-3xl text-black text-center">
            Za darmo
          </h2>
          <ul>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Dodaj swoją pizzerię do naszej bazy danych
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Wyświetlaj swoje menu w pizzuj.pl</span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Umieść zdjęcia i informacje o swojej pizzerii
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Otrzymuj opinie i oceny od klientów</span>
            </li>
          </ul>
          <div className="golden text-white p-4 w-full text-center mt-6">
            Zarejestruj się
          </div>
        </div>
        <div className="bg-white flex flex-col px-6 py-6 drop-shadow-2xl shadow-black">
          <h2 className="text-xl lg:text-3xl text-black text-center">
            Za darmo
          </h2>
          <ul>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Dodaj swoją pizzerię do naszej bazy danych
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Wyświetlaj swoje menu w pizzuj.pl</span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Umieść zdjęcia i informacje o swojej pizzerii
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Otrzymuj opinie i oceny od klientów</span>
            </li>
          </ul>
          <div className="golden text-white p-4 w-full text-center mt-6">
            Zarejestruj się
          </div>
        </div>
        <div className="bg-white flex flex-col px-6 py-6 drop-shadow-2xl shadow-black">
          <h2 className="text-xl lg:text-3xl text-black text-center">
            Za darmo
          </h2>
          <ul>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Dodaj swoją pizzerię do naszej bazy danych
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Wyświetlaj swoje menu w pizzuj.pl</span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Umieść zdjęcia i informacje o swojej pizzerii
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Otrzymuj opinie i oceny od klientów</span>
            </li>
          </ul>
          <div className="golden text-white p-4 w-full text-center mt-6">
            Zarejestruj się
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
    "Pakiety reklamowe | Wypróbuj bazę pizzerii! Pizzuj.pl – najlepsze pizzerie w Polsce",
  description:
    "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl",
    title:
      "Pakiety reklamowe | Wypróbuj bazę pizzerii! Pizzuj.pl – najlepsze pizzerie w Polsce",
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
