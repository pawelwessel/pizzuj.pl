"use server";
import { createLinkFromText } from "../../lib/createLinkFromText";
export async function generatePage(searchTerm) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LINK}/api/generatePage/${createLinkFromText(
      searchTerm
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return { success: true, page: response };
}
