export default function Page() {
  return (
    <section>
      <div>
        <h1>O mnie</h1>
        <p>
          Nazywam się <strong>Paweł</strong>, jestem programistą z kilkuletnim
          doświadczeniem, ale moją pasją jest również pizza.
        </p>
        <p>
          Na co dzień pracuję w restauracji{" "}
          <strong>Tutti Santi w Grudziądzu</strong> jako specjalista ds. mięs i
          ciasta. To właśnie tam pogłębiłem swoje zamiłowanie do{" "}
          <em>sztuki pizzy</em> i szeroko pojętej kuchni włoskiej.
        </p>
        <p>
          Projekt <strong>pizzuj.pl</strong> to moje połączenie dwóch światów –
          technologii i gastronomii. Tworzę to miejsce, by dzielić się wiedzą,
          obserwacjami i tworzyć przyszłość.
        </p>
        <p>
          Jeśli kochasz pizzę, chcesz poznać kulisy pracy w gastro albo szukasz
          inspiracji do własnych kulinarnych eksperymentów – jesteś w dobrym
          miejscu.
        </p>
      </div>
    </section>
  );
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title:
    "O nas Pizzuj.pl | Wypróbuj bazę pizzerii Pizzuj.pl – najlepsze pizzerie w Polsce",
  description:
    "To nie są ćwiczenia – jeśli kochasz pizzę, musisz poznać Pizzuj.pl. Pizzerie w Polsce – szybko, smacznie, bez kompromisów.",
  openGraph: {
    type: "website",
    url: "https://pizzuj.pl",
    title:
      "O nas Pizzuj.pl | Wypróbuj bazę pizzerii Pizzuj.pl – najlepsze pizzerie w Polsce",
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
