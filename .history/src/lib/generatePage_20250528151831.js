"use server";
export async function generatePage(searchTerm) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LINK}/api/generatePage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm }),
    }
  );
  return response;
}
