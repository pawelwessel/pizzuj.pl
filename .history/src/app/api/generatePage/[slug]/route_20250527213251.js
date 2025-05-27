import { createChat } from "completions";
import { addDocument, getDocuments } from "../../../../db/firebase";
// import { db } from "@/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export async function GET(params, req) {
  const { slug } = await req.params;
  const pages = await getDocuments("pages");
  const page = pages?.find((p) => p?.page.address.includes(slug));
  if (!page) {
    try {
      const chat = createChat({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4",
      });
      await chat.sendMessage("Ping");
      const response = await chat.sendMessage(
        `Generate PL content for pizza theme ranking page. Details: ${slug}`,
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
                opinion3:
                  "Stolica wie, jak robić pizzę – jestem pod wrażeniem.",
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
                opinion2:
                  "Znakomite ciasto i aromatyczny sos – warto spróbować.",
                opinion3: "Pizza w Grudziądzu na naprawdę wysokim poziomie.",
                opinion4:
                  "Polecam lokal z włoską pizzą – smak nie do podrobienia!",
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
      if (response) {
        await addDocument("pages", slug, {
          id: slug,
          page: response.content,
          place: slug,
        });
        return NextResponse.json({
          success: true,
        });
      } else {
        return NextResponse.json({
          error: "Failed to generate content",
        });
      }
    } catch (error) {
      console.error("Error generating page content:", error);
      return NextResponse.json(
        { error: "Failed to generate page content" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({
    success: true,
  });
}
