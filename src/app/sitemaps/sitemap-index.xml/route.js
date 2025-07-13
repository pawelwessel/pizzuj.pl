import { getDocuments } from "../../../db/firebase";
import cities from "../../../data/cities.json";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://pizzuj.pl";

export async function GET() {
  const date = new Date().toISOString();

  // Get blog posts count from database
  let blogPostsCount = 0;
  try {
    const blogPosts = (await getDocuments("blog_posts")) || [];
    blogPostsCount = blogPosts.length;
  } catch (error) {
    console.error("Error fetching blog posts count:", error);
  }

  // Calculate if we need separate sitemaps
  const LINKS_PER_SITEMAP = 50000; // Google's limit
  const totalLinks = cities.length + blogPostsCount + 20; // 20 for static pages
  const totalSitemaps = Math.ceil(totalLinks / LINKS_PER_SITEMAP);

  // Generate sitemap index
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-cities.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-pizza.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
