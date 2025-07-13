import { getDocuments } from "../../../db/firebase";
import cities from "../../../data/cities.json";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://pizzuj.pl";

export async function GET() {
  const date = new Date().toISOString();

  // Get blog posts from database
  let blogPosts = [];
  try {
    blogPosts = (await getDocuments("blog_posts")) || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/blog",
    "/login",
    "/register",
    "/privacy",
    "/terms",
    "/affiliate",
    "/reklama-dla-pizzerii",
    "/food-cost-calculator",
    "/website-status",
    "/admin-login",
  ];

  // Generate city pages
  const cityPages = cities.map(
    (city) => `/najlepsze-pizzerie-na-dowoz/${city.slug}`
  );

  // Generate blog post pages
  const blogPages = blogPosts.map((post) => `/blog/${post.slug || post.id}`);

  // Generate pizza pages (if you have pizza types)
  const pizzaTypes = [
    "margherita",
    "pepperoni",
    "hawajska",
    "quattro-stagioni",
    "diavola",
    "capricciosa",
    "marinara",
    "napoletana",
  ];
  const pizzaPages = pizzaTypes.map((type) => `/pizza/${type}`);

  // Combine all URLs
  const allUrls = [...staticPages, ...cityPages, ...blogPages, ...pizzaPages];

  // Generate sitemap XML
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${
      url === "" ? "daily" : url.includes("/blog/") ? "weekly" : "monthly"
    }</changefreq>
    <priority>${
      url === "" ? "1.0" : url.includes("/blog/") ? "0.8" : "0.6"
    }</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
