import { FaMagnifyingGlass } from "react-icons/fa6";
import accent from "../../../public/assets/asset6.png";
import accent1 from "../../../public/assets/asset7.png";
import Image from "next/image";

const pages = [
  {
    address: "Warszawa",
    googleTitle: "Pizza Warszawa – Ranking Najlepszych Pizzerii",
    googleDescription:
      "Zobacz ranking top pizzerii w Warszawie. Gdzie zjeść najlepszą pizzę w stolicy? Sprawdź opinie!",
    businessName: "Pizzerie Warszawskie",
    introduction:
      "Odkryj najlepsze pizzerie w Warszawie – klasyka i nowoczesne interpretacje smaków.",
    rankingSection:
      "Ranking oparty na ocenach mieszkańców Warszawy i jakości składników.",
    testimonialSection: "Opinie klientów o pizzy w Warszawie",
    faqSection:
      "Najczęściej zadawane pytania o pizzerie w Warszawie – ceny, rodzaje ciasta, dostawa.",
    h1: "Najlepsze Pizzerie w Warszawie",
    h2: "Pizza w Warszawie – Ranking, Opinie, Rekomendacje",
    opinion1: "Pizza w Warszawie to prawdziwa uczta dla smakoszy!",
    opinion2: "Duży wybór, szybka obsługa – polecam każdemu w Warszawie.",
    opinion3: "Stolica wie, jak robić pizzę – jestem pod wrażeniem.",
    opinion4: "Cienkie ciasto, świeże dodatki – Warszawa na plus!",
  },
  {
    address: "Grudziądz",
    googleTitle: "Pizza Grudziądz – Najlepsze Lokale w Mieście",
    googleDescription:
      "Poznaj ranking najlepszych pizzerii w Grudziądzu. Gdzie zjeść pyszną pizzę? Zobacz opinie!",
    businessName: "Pizzerie Grudziądzkie",
    introduction:
      "Grudziądz oferuje ciekawe smaki pizzy – sprawdź naszą selekcję najlepszych miejsc.",
    rankingSection:
      "Ranking pizzerii w Grudziądzu tworzony na podstawie opinii klientów.",
    testimonialSection: "Opinie o pizzy w Grudziądzu",
    faqSection:
      "Częste pytania o pizzerie w Grudziądzu – lokalizacja, godziny otwarcia, menu.",
    h1: "Najlepsze Pizzerie w Grudziądzu",
    h2: "Ranking Pizzerii Grudziądzkich – Opinie i Polecenia",
    opinion1: "Świetna pizza! Grudziądz mnie pozytywnie zaskoczył.",
    opinion2: "Znakomite ciasto i aromatyczny sos – warto spróbować.",
    opinion3: "Pizza w Grudziądzu na naprawdę wysokim poziomie.",
    opinion4: "Polecam lokal z włoską pizzą – smak nie do podrobienia!",
  },
  {
    address: "Bydgoszcz",
    googleTitle: "Pizza Bydgoszcz – Ranking Pizzerii",
    googleDescription:
      "Gdzie zjeść najlepszą pizzę w Bydgoszczy? Poznaj ranking i opinie klientów.",
    businessName: "Bydgoskie Pizzerie",
    introduction:
      "Pizzeria w Bydgoszczy – klasyczna włoska pizza, ciekawe wariacje i lokalny klimat.",
    rankingSection:
      "Ranking pizzerii w Bydgoszczy oparty na ocenach klientów i jakości wypieku.",
    testimonialSection: "Co klienci sądzą o pizzy w Bydgoszczy?",
    faqSection: "FAQ o pizzeriach w Bydgoszczy – ceny, dostawy, rezerwacje.",
    h1: "Najlepsze Pizzerie w Bydgoszczy",
    h2: "Pizza w Bydgoszczy – Ranking Lokali",
    opinion1: "Najlepsza pizza w Bydgoszczy – cienkie ciasto i dużo sera!",
    opinion2: "Dobre składniki, przystępne ceny – wrócę na pewno.",
    opinion3: "Pizza jak z pieca opalanego drewnem – rewelacja.",
    opinion4: "Fajny lokal i bardzo miła obsługa.",
  },
  {
    address: "Poznań",
    googleTitle: "Pizza Poznań – Ranking Najlepszych Pizzerii",
    googleDescription:
      "Sprawdź najlepsze pizzerie w Poznaniu – aktualny ranking, opinie klientów i menu.",
    businessName: "Pizzerie Poznańskie",
    introduction:
      "Poznań to miasto pełne smaków – poznaj top pizzerie wybrane przez mieszkańców.",
    rankingSection:
      "Ranking pizzerii w Poznaniu na podstawie ocen i recenzji użytkowników.",
    testimonialSection: "Opinie klientów o pizzy w Poznaniu",
    faqSection:
      "Pytania o poznańskie pizzerie – godziny otwarcia, rodzaje pizzy, opcje wege.",
    h1: "Najlepsze Pizzerie w Poznaniu",
    h2: "Pizza w Poznaniu – Gdzie Warto Zjeść?",
    opinion1: "Pizza z Poznania to smak, do którego chce się wracać.",
    opinion2: "Mój ulubiony lokal w Poznaniu – polecam!",
    opinion3: "Pyszne dodatki i cienkie ciasto – klasa.",
    opinion4: "Pizza zawsze na czas i gorąca – szacunek.",
  },
  {
    address: "Gniezno",
    googleTitle: "Pizza Gniezno – Najlepsze Pizzerie w Mieście",
    googleDescription:
      "Zobacz, gdzie zjeść najlepszą pizzę w Gnieźnie – ranking, recenzje i polecenia.",
    businessName: "Pizzerie Gnieźnieńskie",
    introduction:
      "Gniezno to nie tylko historia – to również świetne pizzerie warte odwiedzenia.",
    rankingSection: "Ranking pizzerii w Gnieźnie na podstawie opinii klientów.",
    testimonialSection: "Opinie o pizzy w Gnieźnie",
    faqSection:
      "Częste pytania o pizzerie w Gnieźnie – dostawa, menu, dostępność stolików.",
    h1: "Najlepsze Pizzerie w Gnieźnie",
    h2: "Ranking Pizzerii w Gnieźnie – Gdzie Warto Zjeść?",
    opinion1: "Świetna pizza w samym sercu Gniezna!",
    opinion2: "Miła obsługa, dobre ceny – polecam każdemu.",
    opinion3: "Gniezno zaskakuje kulinarnie – pizza była pyszna.",
    opinion4: "Smaki Włoch w Gnieźnie – coś wspaniałego.",
  },
  {
    address: "Kraków",
    googleTitle: "Pizza Kraków – Top Pizzerie w Mieście Królów",
    googleDescription:
      "Poznaj najlepsze pizzerie w Krakowie – klasyczne i nowoczesne smaki, opinie klientów.",
    businessName: "Pizzerie Krakowskie",
    introduction:
      "Kraków to idealne miejsce dla fanów pizzy – od klasyki po oryginalne kompozycje.",
    rankingSection:
      "Ranking krakowskich pizzerii na podstawie jakości i opinii smakoszy.",
    testimonialSection: "Co mówią klienci o pizzy w Krakowie?",
    faqSection:
      "FAQ o pizzeriach w Krakowie – rodzaje pieca, składniki, dostawa.",
    h1: "Najlepsze Pizzerie w Krakowie",
    h2: "Pizza w Krakowie – Ranking i Opinie",
    opinion1: "W Krakowie zjadłem najlepszą pizzę w życiu!",
    opinion2: "Szybka obsługa, dobre ceny, pyszna pizza.",
    opinion3: "Miejsce z duszą i wyśmienitym smakiem.",
    opinion4: "Pizza w Krakowie to obowiązkowy punkt każdej wizyty.",
  },
  {
    address: "Toruń",
    googleTitle: "Pizza Toruń – Gdzie zjeść najlepiej?",
    googleDescription:
      "Ranking top pizzerii w Toruniu – smaki, opinie klientów, klimatyczne miejsca.",
    businessName: "Pizzerie Toruńskie",
    introduction:
      "Toruń zachwyca nie tylko piernikami – poznaj najlepsze pizzerie w mieście!",
    rankingSection:
      "Ranking pizzerii w Toruniu oparty na autentycznych opiniach klientów.",
    testimonialSection: "Opinie o pizzy w Toruniu",
    faqSection:
      "Najczęściej zadawane pytania o toruńskie pizzerie – opcje wegańskie, ceny, rezerwacje.",
    h1: "Najlepsze Pizzerie w Toruniu",
    h2: "Pizza w Toruniu – Ranking i Polecenia",
    opinion1: "Zdecydowanie najlepsza pizza w Toruniu!",
    opinion2: "Polecam wszystkim turystom i mieszkańcom.",
    opinion3: "Pyszna pizza i świetna lokalizacja w centrum Torunia.",
    opinion4: "Dobra obsługa i klimat – Toruń wie, co to dobra pizza.",
  },
];

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.address.toLowerCase().replace(/ /g, "-"),
  }));
}

export default async function Page({ params }) {
  const page = pages.find(
    (p) => p.address.toLowerCase().replace(/ /g, "-") === params.slug
  );

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <div className="relative min-h-[35vh] w-full golden pt-24">
        <Image
          src={accent}
          alt="Pizza"
          className="absolute h-36 lg:h-[120%] w-auto opacity-15 lg:opacity-5 left-3 lg:left-16 xl:left-36 top-12 lg:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <Image
          src={accent1}
          alt="Pizza"
          className="absolute h-24 lg:h-[120%] w-auto opacity-20 lg:opacity-5 right-6 lg:right-16 xl:right-36 bottom-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <div className="relative z-50 mx-auto w-[90%] lg:w-1/2">
          <div className="flex flex-col items-center justify-center">
            <h1>{page.h1}</h1>

            <p>{page.introduction}</p>
            <div className="flex flex-col mt-6 mx-auto w-max max-w-full">
              <input
                type="text"
                className="p-3 lg:p-6 rounded-md bg-white/50 text-black max-w-[450px]"
                placeholder="Wpisz miasto"
              />
              <button className="text-white goldenShadow p-3 rounded-b-md flex w-max mx-auto max-w-full items-center">
                <FaMagnifyingGlass className="w-7 h-7 mr-2" />
                Znajdź lokal
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>{page.h2}</h2>
      <p>{page.rankingSection}</p>
      <p>{page.testimonialSection}</p>
      <p>{page.faqSection}</p>
      <div>
        <h3>Opinie:</h3>
        <ul>
          <li>{page.opinion1}</li>
          <li>{page.opinion2}</li>
          <li>{page.opinion3}</li>
          <li>{page.opinion4}</li>
        </ul>
      </div>
    </div>
  );
}
