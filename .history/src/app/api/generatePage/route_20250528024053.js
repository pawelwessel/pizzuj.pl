import { NextResponse } from "next/server";
import { createChat } from "completions";

export async function GET(req) {
  const topic = req.nextUrl.searchParams.get("topic");
  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4",
  });
  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Generate POLISH content for pizza theme ranking page. Details: ${slug}`,
    {
      expect: {
        examples: [],
        properties: {
          response: {
            title: "string",
            shortDesc: "string",
            text1Title: "string",
            text1Desc: "string",
            text2Title: "string",
            text2Desc: "string",
            text3Title: "string",
            text3Desc: "string",
            text4Title: "string",
            text4Desc: "string",
            text5Title: "string",
            text5Desc: "string",
            text6Title: "string",
            text6Desc: "string",
            text7Title: "string",
            text7Desc: "string",
            googleTitle: "string",
            googleDescription: "string",
            googleKeywords: "string",
            url: "string",
            urlLabel: "string",

            category: "string",
            tags: "string",
          },
        },
        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: {
              type: "object",
            },
          },
          required: [
            "title",
            "shortDesc",
            "text1Title",
            "text1Desc",
            "text2Title",
            "text2Desc",
            "text3Title",
            "text3Desc",
            "text4Title",
            "text4Desc",
            "text5Title",
            "text5Desc",
            "text6Title",
            "text6Desc",
            "text7Title",
            "text7Desc",
            "googleTitle",
            "googleDescription",
            "googleKeywords",
            "url",
            "urlLabel",
            "category",
            "tags",
          ],
        },
      },
    }
  );

  return NextResponse.json(response.content);
}
