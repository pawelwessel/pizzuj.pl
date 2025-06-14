import Login from "./Login";

export default async function Page() {
  return <Login />;
}

export const metadata = {
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
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
  title: "Pizzuj.pl | Zaloguj się",
  description: "Pizzuj.pl | Zaloguj się",

  authors: [
    {
      name: "pizzuj",
      url: "https://pizzuj.pl",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
};
