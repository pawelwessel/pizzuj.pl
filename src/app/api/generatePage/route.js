import { createChat } from "completions";
import { addDocument } from "../../../db/firebase";
import { NextResponse } from "next/server";
import { rateLimiter } from "../../../lib/rateLimiter";

export const maxDuration = 300;

export async function POST(req) {
  // Rate limiting
  const limiter = rateLimiter(5, 60000); // 5 requests per minute
  const rateLimitResult = limiter(req);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }

  const { searchTerm } = await req.json();
  if (!searchTerm || searchTerm.trim() === "") {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }
  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4",
  });
  const response = await chat.sendMessage(
    `Generate POLISH content for pizza theme ranking page. Details: ${searchTerm}`,
    {
      expect: {
        examples: [
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
            opinion2:
              "Duży wybór, szybka obsługa – polecam każdemu w Warszawie.",
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
        ],
        properties: {
          response: {
            googleTitle: "string",
          },
        },
        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: { type: "object" },
          },
          required: ["googleTitle"],
        },
      },
    }
  );
  const places = await fetch(
    `${process.env.NEXT_PUBLIC_LINK}/api/getTextPlaces/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: `Pizza ${searchTerm}` }), // Extract search term from URL
    }
  ).then((res) => res.json());

  await addDocument("pages", searchTerm, {
    id: searchTerm,
    page: response.content,
    createdAt: Date.now(),
    places: places,
  });
  return NextResponse.json({ success: true });
}
