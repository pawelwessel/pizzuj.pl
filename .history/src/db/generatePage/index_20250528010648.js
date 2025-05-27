("use server");
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

  if (!response.success) {
    return { success: false, error: "Failed to generate page" };
  }
}
