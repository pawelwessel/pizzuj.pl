/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDocuments } from "@/firebase";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;
const LINKS_PER_SITEMAP = 50000; // Google's limit

// Function to generate links for a specific range
function generateLinks(pages: any, start: number, end: number) {
  const links: { url: string; lastModified: string }[] = [];

  for (let i = start; i < end && i < pages.length; i++) {
    links.push({
      url: `${BASE_URL}/?search=${pages[i].id}/`,
      lastModified: pages[i].createdAt,
    });
  }
  return links;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const sitemapId = parseInt(id, 10);

  if (isNaN(sitemapId)) {
    return NextResponse.json({ error: "Invalid sitemap ID" }, { status: 400 });
  }

  const pages = await getDocuments("pages");

  const totalLinks = pages.length;
  const start = sitemapId * LINKS_PER_SITEMAP;
  const end = Math.min(start + LINKS_PER_SITEMAP, totalLinks);

  if (start >= totalLinks) {
    return NextResponse.json({ error: "Sitemap not found" }, { status: 404 });
  }

  const links = generateLinks(pages, start, end);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${links
        .map(
          (link) => `
        <url>
          <loc>${link.url}</loc>
          <lastmod>${link.lastModified}</lastmod>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
