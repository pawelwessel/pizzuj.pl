import Link from "next/link";
import MinimalBreadcrumb from "../../../components/MinimalBreadcrumb";
import { notFound } from "next/navigation";
import {
  HeroSection,
  TextSection,
  ImageSection,
  QuoteSection,
  RankingSection,
  GallerySection,
  VideoSection,
  CTASection,
  InfoBoxSection,
  StepByStepSection,
  ComparisonTableSection,
  FAQSection,
  TestimonialSection,
  CardSection,
  TimelineSection,
  StatsSection
} from "../../../components/BlogSections";

// Sample blog data - in real app this would come from CMS or database
const blogPosts = {
  "historia-pizzy-w-polsce": {
    title: "Historia pizzy w Polsce - Od włoskiej tradycji do polskiego smaku",
    excerpt: "Poznaj fascynującą historię jak pizza podbiła serca Polaków i stała się jednym z najpopularniejszych dań w naszym kraju.",
    content: [
      {
        type: "hero",
        title: "Historia pizzy w Polsce",
        subtitle: "Od włoskiej tradycji do polskiego smaku",
        image: "/assets/pizza.png" // Placeholder for hero image
      },
      {
        type: "text",
        content: "Pizza w Polsce ma bogatą i fascynującą historię, która sięga lat 80. ubiegłego wieku. Choć początkowo była postrzegana jako egzotyczne danie, dziś jest jednym z najpopularniejszych posiłków w naszym kraju."
      },
      {
        type: "image",
        src: "/assets/pizza.png",
        alt: "Tradycyjna włoska pizza",
        caption: "Tradycyjna włoska pizza - źródło inspiracji dla polskich wersji"
      },
      {
        type: "text",
        content: "Pierwsze pizzerie w Polsce pojawiły się w latach 80., głównie w większych miastach jak Warszawa, Kraków czy Gdańsk. W tamtych czasach pizza była postrzegana jako luksusowe danie, dostępne tylko w najlepszych restauracjach."
      },
      {
        type: "quote",
        quote: "Pizza to nie tylko jedzenie, to sposób na życie. W Polsce nauczyliśmy się ją kochać i dostosować do naszych smaków.",
        author: "Marek Kowalski, szef kuchni"
      },
      {
        type: "text",
        content: "Z biegiem lat pizza stała się bardziej dostępna i popularna. Polscy kucharze zaczęli eksperymentować z lokalnymi składnikami, tworząc unikalne wersje tego dania. Dziś możemy znaleźć pizze z polskimi kiełbasami, oscypkami czy nawet bigosem."
      },
      {
        type: "image",
        src: "/assets/pizza.png",
        alt: "Polska pizza z lokalnymi składnikami",
        caption: "Polska pizza z lokalnymi składnikami - przykład kreatywności naszych kucharzy"
      },
      {
        type: "text",
        content: "Obecnie Polska może pochwalić się setkami doskonałych pizzerii, które serwują zarówno tradycyjne włoskie pizze, jak i kreatywne wersje z lokalnymi akcentami. Od małych rodzinnych lokali po nowoczesne sieci - każdy znajdzie coś dla siebie."
      }
    ],
    author: "Zespół Pizzuj.pl",
    publishedAt: "2024-01-15",
    readTime: "5 min",
    category: "Historia",
    tags: ["historia", "pizza", "polska", "tradycja"]
  },
  "najlepsze-pizzerie-warszawy": {
    title: "Top 10 najlepszych pizzerii w Warszawie - Ranking 2024",
    excerpt: "Sprawdź nasz ranking najlepszych pizzerii w stolicy. Od tradycyjnych włoskich po nowoczesne koncepty - znajdziesz tu coś dla siebie.",
    content: [
      {
        type: "hero",
        title: "Najlepsze pizzerie w Warszawie",
        subtitle: "Ranking 2024",
        image: "/assets/pizza.png"
      },
      {
        type: "text",
        content: "Warszawa to prawdziwy raj dla miłośników pizzy. W stolicy znajdziesz setki pizzerii, od małych rodzinnych lokali po nowoczesne sieci. Przygotowaliśmy dla Ciebie ranking 10 najlepszych miejsc, które warto odwiedzić."
      },
      {
        type: "infobox",
        title: "Jak ocenialiśmy?",
        content: "Nasz ranking opiera się na opiniach klientów, jakości składników, atmosferze lokalu oraz cenie. Każda pizzeria została odwiedzona przez nasz zespół.",
        infoType: "info"
      },
      {
        type: "ranking",
        items: [
          {
            position: 1,
            name: "Pizzeria Da Grasso",
            description: "Tradycyjna włoska pizza w sercu Warszawy",
            rating: 4.8,
            address: "ul. Marszałkowska 123"
          },
          {
            position: 2,
            name: "Pizza Hut Premium",
            description: "Nowoczesne podejście do klasycznej pizzy",
            rating: 4.7,
            address: "ul. Nowy Świat 45"
          },
          {
            position: 3,
            name: "Domino's Pizza",
            description: "Szybka dostawa i smaczna pizza",
            rating: 4.6,
            address: "ul. Krakowska 78"
          }
        ]
      },
      {
        type: "cta",
        title: "Sprawdź więcej pizzerii",
        description: "Odkryj setki innych pizzerii w Warszawie i całej Polsce",
        buttonText: "Przeglądaj pizzerie",
        buttonLink: "/pizza/warszawa"
      }
    ],
    author: "Zespół Pizzuj.pl",
    publishedAt: "2024-01-10",
    readTime: "8 min",
    category: "Rankingi",
    tags: ["warszawa", "ranking", "pizzerie", "top10"]
  },
  "jak-przygotowac-domowa-pizze": {
    title: "Jak przygotować domową pizzę - Kompletny przewodnik krok po kroku",
    excerpt: "Poznaj sekrety przygotowania pysznej pizzy w domu. Od ciasta po pieczenie - wszystko co musisz wiedzieć.",
    content: [
      {
        type: "hero",
        title: "Domowa pizza",
        subtitle: "Kompletny przewodnik krok po kroku",
        image: "/assets/pizza.png",
        titleFont: "cocosharp-bold",
        subtitleFont: "ptSans-normal"
      },
      {
        type: "text",
        content: "Przygotowanie pizzy w domu to świetny sposób na spędzenie czasu z rodziną i przyjaciółmi. W tym przewodniku pokażemy Ci jak zrobić pyszną pizzę od podstaw.",
        fontType: "ptSans-normal",
        textSize: "text-lg",
        textColor: "text-gray-700"
      },
      {
        type: "stats",
        title: "Kluczowe statystyki",
        titleFont: "cocosharp-bold",
        layout: "horizontal",
        stats: [
          { value: "2-3h", label: "Czas przygotowania", description: "Od startu do gotowego dania" },
          { value: "4-6", label: "Porcje", description: "Z jednego przepisu" },
          { value: "15min", label: "Czas pieczenia", description: "W piekarniku" },
          { value: "5", label: "Poziom trudności", description: "W skali 1-5" }
        ]
      },
      {
        type: "stepbystep",
        title: "Przygotowanie ciasta",
        steps: [
          {
            title: "Przygotuj składniki",
            description: "Potrzebujesz: 500g mąki, 7g drożdży, 300ml ciepłej wody, 1 łyżeczka soli, 1 łyżka oliwy"
          },
          {
            title: "Wyrabiaj ciasto",
            description: "Połącz wszystkie składniki i wyrabiaj przez 10-15 minut, aż ciasto będzie elastyczne"
          },
          {
            title: "Odstaw do wyrośnięcia",
            description: "Przykryj ciasto i odstaw w ciepłe miejsce na 1-2 godziny"
          }
        ]
      },
      {
        type: "image",
        src: "/assets/pizza.png",
        alt: "Domowe ciasto do pizzy",
        caption: "Świeżo wyrobione ciasto do pizzy"
      },
      {
        type: "card",
        title: "Różne style pizzy",
        titleFont: "cocosharp-bold",
        layout: "horizontal",
        cardStyle: "gradient",
        cards: [
          {
            title: "Pizza Neapolitańska",
            content: "Tradycyjna włoska pizza z cienkim ciastem i wysokimi brzegami",
            icon: "🍕"
          },
          {
            title: "Pizza Rzymska",
            content: "Cienkie, chrupiące ciasto z minimalną ilością dodatków",
            icon: "🍕"
          },
          {
            title: "Pizza Amerykańska",
            content: "Grube ciasto z obfitymi dodatkami i serem",
            icon: "🍕"
          }
        ]
      },
      {
        type: "timeline",
        title: "Historia pizzy",
        titleFont: "cocosharp-bold",
        events: [
          {
            title: "Początki w Neapolu",
            date: "1889",
            description: "Pierwsza pizza Margherita została stworzona przez Raffaele Esposito"
          },
          {
            title: "Rozwój w USA",
            date: "1905",
            description: "Pierwsza pizzeria w Nowym Jorku otwarta przez Gennaro Lombardi"
          },
          {
            title: "Globalna popularność",
            date: "1950-1960",
            description: "Pizza staje się popularna na całym świecie"
          }
        ]
      },
      {
        type: "comparison",
        title: "Porównanie metod pieczenia",
        headers: ["Metoda", "Czas", "Temperatura", "Wynik"],
        rows: [
          ["Piekarnik", "15-20 min", "250°C", "Dobry"],
          ["Kamień do pizzy", "8-12 min", "300°C", "Doskonały"],
          ["Grill", "5-8 min", "400°C", "Świetny"]
        ]
      },
      {
        type: "quote",
        quote: "Pizza to nie tylko jedzenie, to sztuka. Każda pizza opowiada historię.",
        author: "Marco Rossi, włoski szef kuchni",
        quoteFont: "cocosharp-normal",
        authorFont: "ptSans-normal",
        backgroundColor: "bg-gradient-to-r from-primary-50 to-yellow-50",
        borderColor: "border-primary-500"
      },
      {
        type: "faq",
        title: "Często zadawane pytania",
        questions: [
          {
            question: "Czy mogę użyć mąki pszennej?",
            answer: "Tak, ale najlepsze rezultaty osiągniesz używając mąki typu 00 lub chlebowej."
          },
          {
            question: "Jak długo trwa przygotowanie?",
            answer: "Cały proces zajmuje około 2-3 godzin, wliczając czas wyrastania ciasta."
          },
          {
            question: "Czy mogę zamrozić ciasto?",
            answer: "Tak, możesz zamrozić ciasto na maksymalnie 3 miesiące."
          }
        ]
      },
      {
        type: "testimonial",
        title: "Opinie naszych czytelników",
        titleFont: "cocosharp-bold",
        layout: "grid",
        showAvatar: true,
        showRating: true,
        testimonials: [
          {
            author: "Anna Kowalska",
            position: "Domowy kucharz",
            quote: "Ten przepis zmienił moje podejście do pizzy. Teraz robię ją co tydzień!",
            rating: 5
          },
          {
            author: "Piotr Nowak",
            position: "Miłośnik gotowania",
            quote: "Doskonały przewodnik. Pizza wychodzi lepsza niż w niektórych pizzeriach.",
            rating: 5
          }
        ]
      }
    ],
    author: "Zespół Pizzuj.pl",
    publishedAt: "2024-01-05",
    readTime: "12 min",
    category: "Przepisy",
    tags: ["domowa pizza", "przepis", "gotowanie", "ciasto"]
  }
};

export default function BlogPost({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Strona główna", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title }
  ];

  return (
    <div className="overflow-hidden">
      <MinimalBreadcrumb items={breadcrumbItems} />

      {/* Blog Post Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center space-x-4">
                <span>Autor: {post.author}</span>
                <span>•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('pl-PL')}</span>
                <span>•</span>
                <span>{post.readTime} czytania</span>
              </div>
              <div className="flex space-x-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {post.content.map((section, index) => (
            <BlogSection key={index} section={section} />
          ))}
        </article>

        {/* Related Posts */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Powiązane artykuły</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(blogPosts)
              .filter(([slug]) => slug !== params.slug)
              .slice(0, 2)
              .map(([slug, post]) => (
                <Link key={slug} href={`/blog/${slug}`} className="group">
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Blog Section Component
function BlogSection({ section }) {
  switch (section.type) {
    case "hero":
      return (
        <HeroSection
          title={section.title}
          subtitle={section.subtitle}
          image={section.image}
          imageAlt={section.title}
          titleFont={section.titleFont}
          subtitleFont={section.subtitleFont}
        />
      );

    case "text":
      return (
        <TextSection 
          content={section.content}
          fontType={section.fontType}
          textSize={section.textSize}
          textColor={section.textColor}
        />
      );

    case "image":
      return (
        <ImageSection
          src={section.src}
          alt={section.alt}
          caption={section.caption}
        />
      );

    case "quote":
      return (
        <QuoteSection
          quote={section.quote}
          author={section.author}
          quoteFont={section.quoteFont}
          authorFont={section.authorFont}
          backgroundColor={section.backgroundColor}
          borderColor={section.borderColor}
        />
      );

    case "ranking":
      return (
        <RankingSection
          title={section.title || "Ranking"}
          items={section.items}
          titleFont={section.titleFont}
          itemFont={section.itemFont}
          showRating={section.showRating}
          showPosition={section.showPosition}
          layout={section.layout}
        />
      );

    case "gallery":
      return (
        <GallerySection
          title={section.title}
          images={section.images}
        />
      );

    case "video":
      return (
        <VideoSection
          videoUrl={section.videoUrl}
          title={section.title}
          description={section.description}
        />
      );

    case "cta":
      return (
        <CTASection
          title={section.title}
          description={section.description}
          buttonText={section.buttonText}
          buttonLink={section.buttonLink}
        />
      );

    case "infobox":
      return (
        <InfoBoxSection
          title={section.title}
          content={section.content}
          type={section.infoType}
        />
      );

    case "stepbystep":
      return (
        <StepByStepSection
          title={section.title}
          steps={section.steps}
        />
      );

    case "comparison":
      return (
        <ComparisonTableSection
          title={section.title}
          headers={section.headers}
          rows={section.rows}
        />
      );

    case "faq":
      return (
        <FAQSection
          title={section.title}
          questions={section.questions}
        />
      );

    case "testimonial":
      return (
        <TestimonialSection
          title={section.title}
          testimonials={section.testimonials}
          titleFont={section.titleFont}
          layout={section.layout}
          showAvatar={section.showAvatar}
          showRating={section.showRating}
        />
      );

    case "card":
      return (
        <CardSection
          title={section.title}
          cards={section.cards}
          titleFont={section.titleFont}
          layout={section.layout}
          cardStyle={section.cardStyle}
        />
      );

    case "timeline":
      return (
        <TimelineSection
          title={section.title}
          events={section.events}
          titleFont={section.titleFont}
        />
      );

    case "stats":
      return (
        <StatsSection
          title={section.title}
          stats={section.stats}
          titleFont={section.titleFont}
          layout={section.layout}
        />
      );

    default:
      return null;
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}

export const metadata = {
  title: "Blog o pizzy | Pizzuj.pl",
  description: "Artykuły o pizzy, pizzerie w Polsce, rankingi i recenzje",
}; 