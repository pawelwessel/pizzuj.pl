const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://pizzuj.pl";

export async function GET() {
  const date = new Date().toISOString();

  // Pizza types
  const pizzaTypes = [
    "margherita",
    "pepperoni",
    "hawajska",
    "quattro-stagioni",
    "diavola",
    "capricciosa",
    "marinara",
    "napoletana",
    "siciliana",
    "romana",
    "calzone",
    "focaccia",
    "pizza-bianca",
    "pizza-rossa",
  ];

  // Generate pizza pages
  const pizzaPages = pizzaTypes.map((type) => `/pizza/${type}`);

  // Generate sitemap XML for pizza types
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pizzaPages
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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
