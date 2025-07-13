import cities from "../../../data/cities.json";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://pizzuj.pl";

export async function GET() {
  const date = new Date().toISOString();

  // Generate city pages
  const cityPages = cities.map(
    (city) => `/najlepsze-pizzerie-na-dowoz/${city.slug}`
  );

  // Generate sitemap XML for cities
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cityPages
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
