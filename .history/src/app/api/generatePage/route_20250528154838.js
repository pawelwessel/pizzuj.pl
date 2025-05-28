import { createChat } from "completions";
import { addDocument } from "../../../db/firebase";
export const dynamic = "force-dynamic"; // Force dynamic rendering for this route
export const maxDuration = 5; // 5 seconds
export async function POST(req) {
  const { searchTerm } = await req.json();
  if (!searchTerm || searchTerm.trim() === "") {
    return Response.json({ error: "Search term is required" }, { status: 400 });
  }
  const chat = createChat({
    apiKey:
      "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",
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
  await addDocument("pages", searchTerm, {
    id: searchTerm,
    page: response.content,
    createdAt: Date.now(),
  });
  return Response.json({ success: true });
}
