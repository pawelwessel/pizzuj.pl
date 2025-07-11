 import Link from "next/link";
import MinimalBreadcrumb from "../../components/MinimalBreadcrumb";

// Sample blog data - in real app this would come from CMS or database
const blogPosts = {
  "historia-pizzy-w-polsce": {
    title: "Historia pizzy w Polsce - Od włoskiej tradycji do polskiego smaku",
    excerpt: "Poznaj fascynującą historię jak pizza podbiła serca Polaków i stała się jednym z najpopularniejszych dań w naszym kraju.",
    author: "Zespół Pizzuj.pl",
    publishedAt: "2024-01-15",
    readTime: "5 min",
    category: "Historia",
    tags: ["historia", "pizza", "polska", "tradycja"]
  },
  "najlepsze-pizzerie-warszawy": {
    title: "Top 10 najlepszych pizzerii w Warszawie - Ranking 2024",
    excerpt: "Sprawdź nasz ranking najlepszych pizzerii w stolicy. Od tradycyjnych włoskich po nowoczesne koncepty - znajdziesz tu coś dla siebie.",
    author: "Zespół Pizzuj.pl",
    publishedAt: "2024-01-10",
    readTime: "8 min",
    category: "Rankingi",
    tags: ["warszawa", "ranking", "pizzerie", "top10"]
  },
  "jak-przygotowac-domowa-pizze": {
    title: "Jak przygotować domową pizzę - Kompletny przewodnik krok po kroku",
    excerpt: "Poznaj sekrety przygotowania pysznej pizzy w domu. Od ciasta po pieczenie - wszystko co musisz wiedzieć.",
    author: "Zespół Pizzuj.pl",
    publishedAt: "2024-01-05",
    readTime: "12 min",
    category: "Przepisy",
    tags: ["domowa pizza", "przepis", "gotowanie", "ciasto"]
  }
};
export default function Page() {
  const breadcrumbItems = [
    { label: "Strona główna", href: "/" },
    { label: "Blog" }
  ];

  return (
    <div className="overflow-hidden">
      <MinimalBreadcrumb items={breadcrumbItems} />
      <div className="">
        <h1 className="mt-24 text-xl lg:text-3xl font-bold text-center text-zinc-800 drop-shadow-xl shadow-black w-max max-w-[90%] lg:max-w-[77%] mx-auto">
          Forum pizzy i gastronomii, promowanie pizzerii w rankingach na mapie
          Polski to cel pizzuj.pl
        </h1>
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-12 pb-6">
          {Object.entries(blogPosts).map(([slug, post]) => (
            <Link key={slug} href={`/blog/${slug}`} className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Placeholder for blog post image */}
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500">
                    {/* <Image src={post.featuredImage || "/assets/pizza.png"} alt={post.title} width={400} height={200} className="w-full h-full object-cover" /> */}
                    <p>Blog Post Image</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('pl-PL')}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
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
