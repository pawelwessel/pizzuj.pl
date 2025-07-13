import { getDocuments } from "../db/firebase";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;
const LINKS_PER_SITEMAP = 50000;

const date = new Date().toISOString();

const pages = await getDocuments("pages");

// Generate links for services with cities and additional /paznokcie/{city.id} URLs
const links = [
  pages.map((page: any) => ({
    url: `${BASE_URL}/?search=${page.id}/`,
    lastModified: date,
  })),
];

export async function GET() {
  const totalLinks = links.length;
  const totalSitemaps = Math.ceil(totalLinks / LINKS_PER_SITEMAP);

  // Generate sitemap index
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Array.from(
        { length: totalSitemaps },
        (_, i) => `
        <sitemap>
          <loc>${BASE_URL}/sitemaps/${i}</loc>
          <lastmod>${date}</lastmod>
        </sitemap>`
      ).join("")}
    </sitemapindex>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
