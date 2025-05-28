import { createChat } from "completions";
import { NextResponse } from "next/server";
export async function POST(params, req) {
  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4",
  });
  console.log(
    "Received request to generate page with params:",
    params,
    req.body
  );
  return NextResponse.json({ page: response });
}
