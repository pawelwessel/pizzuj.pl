import { FaMessage } from "react-icons/fa6";
import accent from "../../../../public/assets/asset6.png";
import accent1 from "../../../../public/assets/asset7.png";
import accent2 from "../../../../public/assets/asset4.png";
import Image from "next/image";
import ArrayWithPlaces from "../../../components/ArrayWithPlaces";
import { getDocument, getDocuments, addDocument } from "../../../db/firebase";
import { Footer } from "../../../components/Footer";
import CtaButton from "../../../components/CtaButton";
import pizza from "../../../../public/assets/pizza.png";
import { FaCheckCircle } from "react-icons/fa";
import Form from "../../../components/Form";
import { loadingTexts } from "../../../db/data/loadingTexts";
import AdvertiseYourself from "../../../components/AdvertiseYourself";
import { createChat } from "completions";

export const dynamic = "force-dynamic";

// Function to generate page content using OpenAI
async function generatePageContent(searchTerm) {
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
  return response.content;
}

// Function to fetch places from Google API
async function fetchPlacesData(searchTerm) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LINK || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/getTextPlaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: searchTerm }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const places = await response.json();
    return places;
  } catch (error) {
    console.error("Error fetching places data:", error);
    return [];
  }
}

const pages = await getDocuments("pages");

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page?.id,
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  let page = await getDocument("pages", slug);

  // If page doesn't exist, generate it on-the-fly
  if (!page) {
    try {
      console.log(`Generating page for slug: ${slug}`);

      // Generate page content
      const pageContent = await generatePageContent(slug);

      // Fetch places data
      const placesData = await fetchPlacesData(slug);

      // Store in Firebase
      const newPageData = {
        id: slug,
        page: pageContent,
        createdAt: Date.now(),
        places: placesData,
      };

      await addDocument("pages", slug, newPageData);
      page = newPageData;

      console.log(
        `Successfully generated page for ${slug} with ${placesData.length} places`
      );
    } catch (error) {
      console.error("Error generating page:", error);
      // Return a fallback page if generation fails
      page = {
        page: {
          h2: `Pizza ${slug}`,
          introduction: `Znajdź najlepsze pizzerie w ${slug}`,
          businessName: `Pizzerie ${slug}`,
          h1: `Najlepsze Pizzerie w ${slug}`,
          rankingSection: `Ranking pizzerii w ${slug}`,
          testimonialSection: `Opinie o pizzy w ${slug}`,
          opinion1: "Świetna pizza!",
          opinion2: "Polecam każdemu!",
          opinion3: "Wysokiej jakości składniki.",
          opinion4: "Szybka obsługa i pyszne jedzenie.",
          googleTitle: `Pizza ${slug} - Najlepsze Pizzerie`,
          googleDescription: `Znajdź najlepsze pizzerie w ${slug}. Zobacz ranking i opinie!`,
        },
        places: [],
      };
    }
  }

  // If page exists but has no places data, try to fetch it
  if (page && (!page.places || page.places.length === 0)) {
    try {
      console.log(`Fetching places data for existing page: ${slug}`);
      const placesData = await fetchPlacesData(slug);

      if (placesData && placesData.length > 0) {
        page.places = placesData;
        // Update the page in Firebase with places data
        await addDocument("pages", slug, {
          ...page,
          places: placesData,
          updatedAt: Date.now(),
        });
        console.log(`Updated page ${slug} with ${placesData.length} places`);
      }
    } catch (error) {
      console.error("Error fetching places for existing page:", error);
    }
  }

  return (
    <div>
      <div className="overflow-hidden relative min-h-[35vh] w-full golden pt-12 lg:pt-24 pb-12">
        <Image
          src={accent}
          alt="Pizza"
          className="absolute h-36 lg:h-[30%] xl:h-[55%] 2xl:h-[70%] w-auto opacity-15 lg:opacity-15 left-3 lg:left-16 xl:left-36 top-12 lg:top-1/3 xl:top-1/2 lg:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <Image
          src={accent1}
          alt="Pizza"
          className="absolute h-24 lg:h-[30%] xl:h-[55%] 2xl:h-[70%] w-auto opacity-20 lg:opacity-15 right-6 lg:right-16 xl:right-36 bottom-6 xl:bottom-auto lg:bottom-1/4 xl:top-1/2 xl:-translate-y-1/2 z-0"
          width={300}
          height={300}
        />
        <div className="relative z-50 mx-auto w-[90%] lg:w-2/3 xl:w-1/2">
          <div className="flex flex-col items-center justify-center text-center bg-black/50 rounded-xl p-3 sm:p-6">
            <h1 className="!text-white text-lg lg:text-3xl drop-shadow-lg shadow-black font-bold">
              {page?.page?.h2}
            </h1>

            <p className="mt-3 lg:mt-6 w-[90%] mx-auto !text-white drop-shadow-lg font-sans text-sm sm:text-base">
              {page?.page?.introduction}
            </p>
            <div className="flex flex-col mt-4 lg:mt-8 mx-auto w-max max-w-full">
              <Form loadingTexts={loadingTexts} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-[#ffa920] p-6 relative">
        <p className="w-max p-4 rounded-xl absolute top-0 -translate-y-[10%] left-1/2 -translate-x-1/2 bg-white text-black border-[#ffa920] border-2 z-0">
          {page?.page?.businessName}
        </p>
        <div className="p-6 pt-16 text-center bg-white rounded-xl shadow-lg">
          <h2 className="font-sans font-bold text-xl lg:text-3xl">
            {page?.page?.h1}
          </h2>
          <p className="text-black mt-3 text-center font-sans">
            {page?.page?.rankingSection}
          </p>

          {/* Show loading message if places are being fetched */}
          {(!page?.places || page.places.length === 0) && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <p className="text-gray-600">Ładowanie danych o pizzeriach...</p>
            </div>
          )}

          {/* Display places data */}
          {page?.places && page.places.length > 0 && (
            <ArrayWithPlaces placesData={page.places} />
          )}

          <div className="mt-6">
            <h3 className="text-xl lg:text-3xl bg-[#ffa920] block p-3 !text-white rounded-md w-max max-w-full">
              {page?.page?.testimonialSection}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 w-[90%] lg:w-[66%] mt-4 gap-4">
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion1}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion2}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion3}&quot;</div>
              </li>
              <li className="text-black p-3 rounded-lg bg-gray-200 flex gap-2">
                <FaMessage className="opacity-20 min-w-8 min-h-8 mx-2" />
                <div>&quot;{page?.page?.opinion4}&quot;</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <p>{page?.page?.faqSection}</p> */}
      <AdvertiseYourself />
      <CtaButton />
    </div>
  );
}

export async function generateMetadata({ params }, parent) {
  const { slug } = await params;
  const page = await getDocument("pages", slug);

  return {
    title: page?.page?.googleTitle || `Pizza ${slug} - Najlepsze Pizzerie`,
    description:
      page?.page?.googleDescription ||
      `Znajdź najlepsze pizzerie w ${slug}. Zobacz ranking i opinie!`,
  };
}
