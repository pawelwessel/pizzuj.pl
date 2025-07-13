import { getDocuments } from "../../../db/firebase";

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

  // Generate blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `/blog/${post.slug || post.id}`,
    lastmod: post.updatedAt || post.createdAt || date,
    changefreq: "monthly",
    priority: "0.7",
  }));

  // Generate sitemap XML for blog posts
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogPages
  .map(
    (page) => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
